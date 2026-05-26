const https = require('https');
const crypto = require('crypto');

// Cryptographic Secret for signing tokens
const CUSTOMER_JWT_SECRET = process.env.CUSTOMER_JWT_SECRET || 'lightning_deals_customer_super_secure_signing_key_2026';
const FIREBASE_RTDB_URL = 'lightning-deals-d0adc-default-rtdb.asia-southeast1.firebasedatabase.app';

// Helper to make HTTPS requests to Firebase
function httpsRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: body
        });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

// Log authentication events to secure audit trail
async function logAuditEvent(customerId, category, message, ip = 'unknown') {
  const logId = "AUDIT-" + Date.now() + "-" + crypto.randomBytes(3).toString('hex');
  const logObj = {
    id: logId,
    timestamp: new Date().toLocaleString('en-IN'),
    category: category,
    message: message,
    customerId: customerId,
    ip: ip
  };

  try {
    await httpsRequest({
      hostname: FIREBASE_RTDB_URL,
      port: 443,
      path: `/audit_logs/${logId}.json`,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    }, logObj);
  } catch (e) {
    console.error('Failed to write audit log to Firebase:', e);
  }
}

// Cryptographic Token Signing Helper
function generateToken(payload) {
  const payloadStr = JSON.stringify(payload);
  const encodedPayload = Buffer.from(payloadStr).toString('base64');
  const signature = crypto
    .createHmac('sha256', CUSTOMER_JWT_SECRET)
    .update(encodedPayload)
    .digest('hex');
  return `${encodedPayload}.${signature}`;
}

// Timing-safe password verification
function verifyPassword(password, storedHash) {
  try {
    const parts = storedHash.split(':');
    if (parts.length !== 2) return false;
    
    const salt = parts[0];
    const hash = parts[1];
    
    const checkHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    
    return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(checkHash));
  } catch (e) {
    console.error('Error during password verification:', e);
    return false;
  }
}

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed. Only POST is supported.' })
    };
  }

  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Request body is required.' })
      };
    }

    const { email, password, rememberMe } = JSON.parse(event.body);

    if (!email || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Email and password are required.' })
      };
    }

    const normalizedEmail = email.trim().toLowerCase();
    const customerId = crypto.createHash('sha256').update(normalizedEmail).digest('hex');
    const clientIp = event.headers['x-nf-client-connection-ip'] || 
                     event.headers['client-ip'] || 
                     event.headers['x-forwarded-for'] || 
                     'unknown';

    // 1. Fetch user data in O(1) query
    const userRes = await httpsRequest({
      hostname: FIREBASE_RTDB_URL,
      port: 443,
      path: `/customers/${customerId}.json`,
      method: 'GET'
    });

    const user = JSON.parse(userRes.body);

    // Generic error message to prevent username harvesting/enumeration
    const invalidCredentialsResponse = {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Invalid email address or password.' })
    };

    if (user === null) {
      return invalidCredentialsResponse;
    }

    // 2. Brute-Force Rate Limiting checks
    const LOCK_TIME_WINDOW = 15 * 60 * 1000; // 15 minutes
    const MAX_FAILED_ATTEMPTS = 5;

    if (user.status === 'locked') {
      const lockExpired = Date.now() - (user.lastAttemptTime || 0) > LOCK_TIME_WINDOW;
      
      if (!lockExpired) {
        const timeRemaining = Math.ceil((LOCK_TIME_WINDOW - (Date.now() - user.lastAttemptTime)) / 60000);
        return {
          statusCode: 403,
          headers,
          body: JSON.stringify({ 
            error: `This account is temporarily locked due to too many failed login attempts. Please try again in ${timeRemaining} minutes.` 
          })
        };
      } else {
        // Lock time window has expired, reset status to active
        user.status = 'active';
        user.loginAttempts = 0;
        
        await httpsRequest({
          hostname: FIREBASE_RTDB_URL,
          port: 443,
          path: `/customers/${customerId}/status.json`,
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' }
        }, 'active');
        
        await httpsRequest({
          hostname: FIREBASE_RTDB_URL,
          port: 443,
          path: `/customers/${customerId}/loginAttempts.json`,
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' }
        }, 0);
      }
    }

    // 3. Verify Password using timingSafeEqual PBKDF2 check
    const isPasswordCorrect = verifyPassword(password, user.passwordHash);

    if (!isPasswordCorrect) {
      const failedAttempts = (user.loginAttempts || 0) + 1;
      const isLockTriggered = failedAttempts >= MAX_FAILED_ATTEMPTS;
      
      const updateData = {
        loginAttempts: failedAttempts,
        lastAttemptTime: Date.now()
      };
      
      if (isLockTriggered) {
        updateData.status = 'locked';
        await logAuditEvent(customerId, 'security', 'Account locked due to brute-force detection (5 failed logins).', clientIp);
      } else {
        await logAuditEvent(customerId, 'auth', `Unsuccessful login attempt (${failedAttempts}/${MAX_FAILED_ATTEMPTS}).`, clientIp);
      }

      // Update login attempt counts on Firebase
      await httpsRequest({
        hostname: FIREBASE_RTDB_URL,
        port: 443,
        path: `/customers/${customerId}.json`,
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      }, updateData);

      if (isLockTriggered) {
        return {
          statusCode: 403,
          headers,
          body: JSON.stringify({ 
            error: 'Account locked. Too many failed password attempts. Account is locked for 15 minutes.' 
          })
        };
      }

      return invalidCredentialsResponse;
    }

    // 4. On Successful Authenticated Login
    // Reset login attempts
    if (user.loginAttempts > 0) {
      await httpsRequest({
        hostname: FIREBASE_RTDB_URL,
        port: 443,
        path: `/customers/${customerId}.json`,
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      }, {
        loginAttempts: 0,
        lastAttemptTime: 0,
        status: 'active'
      });
    }

    // Calculate Token Duration ("Remember Me" checkbox)
    const tokenValidity = rememberMe ? (30 * 24 * 60 * 60 * 1000) : (2 * 60 * 60 * 1000); // 30 days vs 2 hours
    const sessionId = "sess_" + Date.now() + "_" + crypto.randomBytes(4).toString('hex');
    const expTime = Date.now() + tokenValidity;

    const tokenPayload = {
      customerId: customerId,
      email: normalizedEmail,
      name: user.name,
      sessionId: sessionId,
      exp: expTime
    };

    const sessionToken = generateToken(tokenPayload);

    // Save Active Session details to Database
    const sessionObj = {
      id: sessionId,
      ip: clientIp,
      userAgent: event.headers['user-agent'] || 'unknown',
      createdAt: Date.now(),
      lastActive: Date.now()
    };

    await httpsRequest({
      hostname: FIREBASE_RTDB_URL,
      port: 443,
      path: `/customers/${customerId}/sessions/${sessionId}.json`,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    }, sessionObj);

    // Log login success
    await logAuditEvent(customerId, 'auth', 'Customer logged in successfully.', clientIp);

    // Return profile data and token
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Logged in successfully.',
        sessionToken: sessionToken,
        customer: {
          id: customerId,
          name: user.name,
          email: user.email,
          phone: user.phone,
          createdAt: user.createdAt,
          wishlist: user.wishlist || {},
          cart: user.cart || [],
          preferences: user.preferences || { marketingEmails: true, whatsappUpdates: true }
        }
      })
    };

  } catch (error) {
    console.error('Error in customer auth login:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Secure Server Error: ' + error.message })
    };
  }
};
