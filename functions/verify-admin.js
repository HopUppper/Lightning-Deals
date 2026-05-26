const https = require('https');
const crypto = require('crypto');

// Secret keys for signing temporary and final session tokens
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'lightning_deals_super_secret_session_signing_key_2026';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'love9002';
const ADMIN_PIN = process.env.ADMIN_PIN || '9002';

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

// Log admin authentication events directly to the secure audit trail in Firebase
async function logAuthEvent(category, message) {
  const orderId = "AUTH-" + Date.now();
  const logObj = {
    id: orderId,
    timestamp: new Date().toLocaleString('en-IN'),
    category: category,
    message: message,
    operator: 'System Auth Engine',
    ip: 'Serverless Functions'
  };

  try {
    await httpsRequest({
      hostname: 'lightning-deals-d0adc-default-rtdb.asia-southeast1.firebasedatabase.app',
      port: 443,
      path: `/audit_logs/${orderId}.json`,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    }, logObj);
  } catch (e) {
    console.error('Failed to log auth event to Firebase:', e);
  }
}

// Cryptographic Token Signing Helper
function generateToken(payload) {
  const payloadStr = JSON.stringify(payload);
  const encodedPayload = Buffer.from(payloadStr).toString('base64');
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(encodedPayload)
    .digest('hex');
  return `${encodedPayload}.${signature}`;
}

// Cryptographic Token Verification Helper
function verifyToken(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;

    const encodedPayload = parts[0];
    const signature = parts[1];

    const expectedSignature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(encodedPayload)
      .digest('hex');

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }

    const payloadStr = Buffer.from(encodedPayload, 'base64').toString('utf8');
    const payload = JSON.parse(payloadStr);

    if (payload.exp && Date.now() > payload.exp) {
      return null; // Expired token
    }

    return payload;
  } catch (e) {
    return null;
  }
}

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
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
    const body = JSON.parse(event.body || '{}');
    const { action } = body;

    if (!action) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing action parameter.' })
      };
    }

    // ==========================================
    // ACTION A: VERIFY PASSWORD (STEP 1)
    // ==========================================
    if (action === 'verify_password') {
      const { password } = body;
      if (!password) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Password is required.' })
        };
      }

      // Check Password (constant time-ish check)
      const isPasswordValid = crypto.timingSafeEqual(
        Buffer.from(password),
        Buffer.from(ADMIN_PASSWORD)
      );

      if (isPasswordValid) {
        // Generate a 5-minute temporary token authorizing Step 2
        const tempTokenPayload = {
          step1_passed: true,
          exp: Date.now() + 5 * 60 * 1000 // 5 minutes validity
        };
        const tempToken = generateToken(tempTokenPayload);

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Password verified successfully. Proceed to PIN validation.',
            tempToken: tempToken
          })
        };
      } else {
        await logAuthEvent('auth', 'Failed password verification attempt (Step 1).');
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({
            success: false,
            error: 'Incorrect administrator password.'
          })
        };
      }
    }

    // ==========================================
    // ACTION B: VERIFY PIN (STEP 2)
    // ==========================================
    if (action === 'verify_pin') {
      const { pin, tempToken } = body;
      if (!pin || !tempToken) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'PIN and temporary session token are required.' })
        };
      }

      // Verify the temp token from step 1
      const tempPayload = verifyToken(tempToken);
      if (!tempPayload || !tempPayload.step1_passed) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({
            success: false,
            error: 'Invalid or expired first-stage authentication session. Please start over.'
          })
        };
      }

      // Verify the secure PIN (timing attack resilient)
      const isPinValid = crypto.timingSafeEqual(
        Buffer.from(pin),
        Buffer.from(ADMIN_PIN)
      );

      if (isPinValid) {
        // Generate a 2-hour final session token authorizing full access
        const finalTokenPayload = {
          admin_verified: true,
          exp: Date.now() + 2 * 60 * 60 * 1000 // 2 hours session validity
        };
        const sessionToken = generateToken(finalTokenPayload);

        await logAuthEvent('auth', 'Staff authenticated fully via secure 2-step verification.');

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Dashboard unlocked successfully.',
            sessionToken: sessionToken
          })
        };
      } else {
        await logAuthEvent('auth', 'Failed secure PIN verification attempt (Step 2).');
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({
            success: false,
            error: 'Incorrect security PIN.'
          })
        };
      }
    }

    // ==========================================
    // ACTION C: VERIFY LIVE SESSION
    // ==========================================
    if (action === 'verify_session') {
      const { sessionToken } = body;
      if (!sessionToken) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Session token is required.' })
        };
      }

      const payload = verifyToken(sessionToken);
      if (payload && payload.admin_verified) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            valid: true,
            message: 'Session is active and secure.'
          })
        };
      } else {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({
            success: false,
            valid: false,
            error: 'Session has expired or is invalid.'
          })
        };
      }
    }

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid auth action request.' })
    };

  } catch (error) {
    console.error('Error in verify-admin Netlify function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Secure Auth Server Failure: ' + error.message })
    };
  }
};
