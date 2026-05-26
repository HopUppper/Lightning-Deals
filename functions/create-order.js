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
