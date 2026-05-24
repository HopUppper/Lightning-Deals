const crypto = require('crypto');

// Razorpay Live API Credentials
const RAZORPAY_KEY_SECRET = 'fg5k1n9Kzn2iJeP6lByW3GDT';

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
    const input = JSON.parse(event.body);
    if (!input || !input.razorpay_payment_id || !input.razorpay_order_id || !input.razorpay_signature) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid transaction details. Payment ID, Order ID, and Signature are required.' })
      };
    }

    const payment_id = input.razorpay_payment_id;
    const order_id = input.razorpay_order_id;
    const signature = input.razorpay_signature;

    const data_to_hash = order_id + '|' + payment_id;
    const generated_signature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(data_to_hash)
      .digest('hex');

    // Safe timing-attack-resistant cryptographic verification comparison
    const signatureBuffer = Buffer.from(signature);
    const generatedBuffer = Buffer.from(generated_signature);
    
    let isMatch = false;
    if (signatureBuffer.length === generatedBuffer.length) {
      isMatch = crypto.timingSafeEqual(signatureBuffer, generatedBuffer);
    }

    if (isMatch) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Payment verified successfully.'
        })
      };
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Signature verification failed. Mismatch detected.'
        })
      };
    }
  } catch (error) {
    console.error('Error in verify-payment Netlify function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Server Failure: ' + error.message })
    };
  }
};
