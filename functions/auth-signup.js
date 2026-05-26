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

// Password Hashing using PBKDF2
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
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

    const { name, email, phone, password } = JSON.parse(event.body);

    // Validation
    if (!name || !email || !phone || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'All fields (name, email, phone, password) are required.' })
      };
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPhone = phone.trim().replace(/[^0-9]/g, '');

    if (normalizedEmail.length < 5 || !normalizedEmail.includes('@')) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email address format.' })
      };
    }

    if (normalizedPhone.length < 10) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid phone number. Provide at least a 10-digit number.' })
      };
    }

    if (password.length < 6) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Password must be at least 6 characters long.' })
      };
    }

    // Extract client IP address from Netlify proxy headers
    const clientIp = event.headers['x-nf-client-connection-ip'] || 
                     event.headers['client-ip'] || 
                     event.headers['x-forwarded-for'] || 
                     'unknown';

    // Generate deterministic unique Customer ID
    const customerId = crypto.createHash('sha256').update(normalizedEmail).digest('hex');

    // 1. Check if user already exists in O(1) query
    const checkRes = await httpsRequest({
      hostname: FIREBASE_RTDB_URL,
      port: 443,
      path: `/customers/${customerId}.json`,
      method: 'GET'
    });

    const existingUser = JSON.parse(checkRes.body);
    if (existingUser !== null) {
      return {
        statusCode: 409,
        headers,
        body: JSON.stringify({ error: 'An account with this email address already exists.' })
      };
    }

    // 2. Hash Password and Construct New User Node
    const passwordHash = hashPassword(password);
    const dateNowStr = new Date().toISOString();

    const newCustomer = {
      id: customerId,
      name: name.trim(),
      email: normalizedEmail,
      phone: normalizedPhone,
      passwordHash: passwordHash,
      createdAt: dateNowStr,
      status: 'active',
      loginAttempts: 0,
      lastAttemptTime: 0,
      preferences: {
        marketingEmails: true,
        whatsappUpdates: true
      }
    };

    // 3. Write new user to database
    await httpsRequest({
      hostname: FIREBASE_RTDB_URL,
      port: 443,
      path: `/customers/${customerId}.json`,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    }, newCustomer);

    // 4. Create secure user session
    const sessionId = "sess_" + Date.now() + "_" + crypto.randomBytes(4).toString('hex');
    const expTime = Date.now() + 2 * 60 * 60 * 1000; // 2 hours

    const tokenPayload = {
      customerId: customerId,
      email: normalizedEmail,
      name: newCustomer.name,
      sessionId: sessionId,
      exp: expTime
    };

    const sessionToken = generateToken(tokenPayload);

    // Register active session metadata in DB
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

    // Write activity log
    await logAuditEvent(customerId, 'auth', 'New customer account successfully registered.', clientIp);

    // Return profile data and token
    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Account registered successfully.',
        sessionToken: sessionToken,
        customer: {
          id: customerId,
          name: newCustomer.name,
          email: normalizedEmail,
          phone: normalizedPhone,
          createdAt: dateNowStr,
          preferences: newCustomer.preferences
        }
      })
    };

  } catch (error) {
    console.error('Error in customer auth signup:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Secure Server Error: ' + error.message })
    };
  }
};
