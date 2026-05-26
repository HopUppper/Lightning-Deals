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

// Cryptographic Token Verification Helper
function verifyToken(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;

    const encodedPayload = parts[0];
    const signature = parts[1];

    const expectedSignature = crypto
      .createHmac('sha256', CUSTOMER_JWT_SECRET)
      .update(encodedPayload)
      .digest('hex');

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }

    const payloadStr = Buffer.from(encodedPayload, 'base64').toString('utf8');
    const payload = JSON.parse(payloadStr);

    if (payload.exp && Date.now() > payload.exp) {
      return null; // Session expired
    }

    return payload;
  } catch (e) {
    return null;
  }
}

// Password Hashing
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
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
      body: JSON.stringify({ error: 'Method Not Allowed.' })
    };
  }

  try {
    // 1. Authenticate Request via Bearer Token in Authorization header
    const authHeader = event.headers['authorization'];
    let token = '';

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else {
      // Fallback to checking body
      try {
        const parsedBody = JSON.parse(event.body || '{}');
        token = parsedBody.token || '';
      } catch (e) {}
    }

    if (!token) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Authentication token is required.' })
      };
    }

    const payload = verifyToken(token);
    if (!payload || !payload.customerId) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid or expired authentication session.' })
      };
    }

    const { customerId, sessionId } = payload;
    const clientIp = event.headers['x-nf-client-connection-ip'] || 
                     event.headers['client-ip'] || 
                     event.headers['x-forwarded-for'] || 
                     'unknown';

    // 2. Fetch customer status from database
    const userRes = await httpsRequest({
      hostname: FIREBASE_RTDB_URL,
      port: 443,
      path: `/customers/${customerId}.json`,
      method: 'GET'
    });

    const user = JSON.parse(userRes.body);

    if (user === null) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Customer account not found.' })
      };
    }

    if (user.status === 'locked') {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({ error: 'Account is locked. Contact staff support.' })
      };
    }

    // 3. Verify that the session is still active in database (not logged out)
    const sessionRes = await httpsRequest({
      hostname: FIREBASE_RTDB_URL,
      port: 443,
      path: `/customers/${customerId}/sessions/${sessionId}.json`,
      method: 'GET'
    });

    const activeSession = JSON.parse(sessionRes.body);
    if (activeSession === null) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Session has been invalidated. Please login again.' })
      };
    }

    // Parse requested action
    const bodyObj = JSON.parse(event.body || '{}');
    const { action } = bodyObj;

    if (!action) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Request action is required.' })
      };
    }

    // Update active session timestamp
    await httpsRequest({
      hostname: FIREBASE_RTDB_URL,
      port: 443,
      path: `/customers/${customerId}/sessions/${sessionId}/lastActive.json`,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    }, Date.now());

    // ==================================================
    // ACTION A: VERIFY SESSION & FETCH PROFILE
    // ==================================================
    if (action === 'verify') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          customer: {
            id: customerId,
            name: user.name,
            email: user.email,
            phone: user.phone,
            createdAt: user.createdAt,
            wishlist: user.wishlist || {},
            cart: user.cart || [],
            preferences: user.preferences || { marketingEmails: true, whatsappUpdates: true },
            sessions: user.sessions || {}
          }
        })
      };
    }

    // ==================================================
    // ACTION B: SYNC WISHLIST & CART STATE
    // ==================================================
    if (action === 'sync_data') {
      const { wishlist, cart } = bodyObj;
      const updates = {};
      
      if (wishlist !== undefined) {
        updates.wishlist = wishlist;
      }
      if (cart !== undefined) {
        updates.cart = cart;
      }

      await httpsRequest({
        hostname: FIREBASE_RTDB_URL,
        port: 443,
        path: `/customers/${customerId}.json`,
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      }, updates);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Wishlist and cart synced successfully.' })
      };
    }

    // ==================================================
    // ACTION C: UPDATE PROFILE DETAILS
    // ==================================================
    if (action === 'update_profile') {
      const { name, phone, preferences } = bodyObj;
      const updates = {};

      if (name && name.trim().length >= 2) {
        updates.name = name.trim();
      }
      if (phone && phone.trim().length >= 10) {
        updates.phone = phone.trim().replace(/[^0-9]/g, '');
      }
      if (preferences) {
        updates.preferences = {
          marketingEmails: !!preferences.marketingEmails,
          whatsappUpdates: !!preferences.whatsappUpdates
        };
      }

      if (Object.keys(updates).length === 0) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'No valid profile updates supplied.' })
        };
      }

      await httpsRequest({
        hostname: FIREBASE_RTDB_URL,
        port: 443,
        path: `/customers/${customerId}.json`,
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      }, updates);

      await logAuditEvent(customerId, 'profile', 'Customer modified profile options.', clientIp);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Profile details updated successfully.' })
      };
    }

    // ==================================================
    // ACTION D: CHANGE PASSWORD SECURELY
    // ==================================================
    if (action === 'change_password') {
      const { currentPassword, newPassword } = bodyObj;
      
      if (!currentPassword || !newPassword) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Current password and new password are required.' })
        };
      }

      if (newPassword.length < 6) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'New password must be at least 6 characters long.' })
        };
      }

      // Verify current password hash
      const isPasswordCorrect = verifyPassword(currentPassword, user.passwordHash);
      if (!isPasswordCorrect) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'The current password you entered is incorrect.' })
        };
      }

      // Hash and update to new password
      const newHash = hashPassword(newPassword);
      await httpsRequest({
        hostname: FIREBASE_RTDB_URL,
        port: 443,
        path: `/customers/${customerId}/passwordHash.json`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      }, newHash);

      await logAuditEvent(customerId, 'security', 'Password changed by user.', clientIp);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Password updated successfully.' })
      };
    }

    // ==================================================
    // ACTION E: TERMINATE SESSIONS (LOGOUT DEVICE)
    // ==================================================
    if (action === 'terminate_session') {
      const { targetSessionId } = bodyObj;
      if (!targetSessionId) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Target Session ID is required.' })
        };
      }

      // Delete target session from DB
      await httpsRequest({
        hostname: FIREBASE_RTDB_URL,
        port: 443,
        path: `/customers/${customerId}/sessions/${targetSessionId}.json`,
        method: 'DELETE'
      });

      const isSelf = targetSessionId === sessionId;
      await logAuditEvent(customerId, 'auth', `Session terminated (${targetSessionId}). ${isSelf ? 'Self logout.' : 'Remote logout.'}`, clientIp);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true, 
          selfTerminated: isSelf,
          message: isSelf ? 'Logged out successfully.' : 'Remote session terminated successfully.' 
        })
      };
    }

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid auth-session action.' })
    };

  } catch (error) {
    console.error('Error in customer auth session handler:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Secure Server Error: ' + error.message })
    };
  }
};
