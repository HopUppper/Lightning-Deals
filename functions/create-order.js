const https = require('https');

// Razorpay Live API Credentials loaded securely from Netlify environment variables
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

// Helper function to perform secure HTTPS requests using Node's native module
function httpsRequest(options, postData) {
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
      req.write(postData);
    }
    req.end();
  });
}

const FIREBASE_RTDB_URL = 'lightning-deals-d0adc-default-rtdb.asia-southeast1.firebasedatabase.app';

// Database-backed stateless IP rate limiter helper
async function checkRateLimit(action, clientIp, maxRequests, windowMs) {
  try {
    const sanitizedIp = clientIp.replace(/[\.\:\$\[\]\#\/]/g, '_');
    const path = `/rate_limits/${action}/${sanitizedIp}.json`;
    
    const res = await httpsRequest({
      hostname: FIREBASE_RTDB_URL,
      port: 443,
      path: path,
      method: 'GET'
    });
    
    const now = Date.now();
    let limitData = JSON.parse(res.body) || { requests: [] };
    
    let activeRequests = Array.isArray(limitData.requests) ? limitData.requests : [];
    activeRequests = activeRequests.filter(ts => now - ts < windowMs);
    
    if (activeRequests.length >= maxRequests) {
      const oldestActive = activeRequests[0];
      const timeElapsed = now - oldestActive;
      const retryAfterMs = windowMs - timeElapsed;
      const retryAfterMins = Math.ceil(retryAfterMs / 60000);
      return { allowed: false, retryAfterMins };
    }
    
    activeRequests.push(now);
    
    await httpsRequest({
      hostname: FIREBASE_RTDB_URL,
      port: 443,
      path: path,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    }, JSON.stringify({ requests: activeRequests }));
    
    return { allowed: true };
  } catch (err) {
    console.warn(`Rate limiter network exception in ${action}: ${err.message}. Failing open.`);
    return { allowed: true };
  }
}

exports.handler = async (event, context) => {
  // CORS Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle CORS preflight options request
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
    const clientIp = event.headers['x-nf-client-connection-ip'] || 
                     event.headers['client-ip'] || 
                     event.headers['x-forwarded-for'] || 
                     'unknown';

    // Enforcement 1: Stateless DB-backed IP rate limiting gate (10 orders per 10 minutes)
    const rateLimit = await checkRateLimit('checkout', clientIp, 10, 10 * 60 * 1000);
    if (!rateLimit.allowed) {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({ 
          error: `Too many order creation requests from this connection. Please try again in ${rateLimit.retryAfterMins} minutes.` 
        })
      };
    }

    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing request body.' })
      };
    }

    const input = JSON.parse(event.body);
    if (!input || !input.amount || !input.receipt) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid input parameters. Amount and receipt are required.' })
      };
    }

    const amount = parseInt(input.amount);
    const receipt = input.receipt.replace(/[^A-Za-z0-9_\-]/g, '');

    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Razorpay keys are not configured in Netlify environment variables.' })
      };
    }

    // Razorpay basic authorization token (Base64 key:secret)
    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');

    const postData = JSON.stringify({
      amount: amount,
      currency: 'INR',
      receipt: receipt,
      payment_capture: 1,
      notes: input.notes || {}
    });

    const options = {
      hostname: 'api.razorpay.com',
      port: 443,
      path: '/v1/orders',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const result = await httpsRequest(options, postData);
    const responseBody = JSON.parse(result.body);

    if (result.statusCode !== 200 && result.statusCode !== 201) {
      return {
        statusCode: result.statusCode,
        headers,
        body: JSON.stringify({
          error: 'Razorpay API rejected order creation',
          details: responseBody
        })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(responseBody)
    };
  } catch (error) {
    console.error('Error in create-order Netlify function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Server Failure: ' + error.message })
    };
  }
};
