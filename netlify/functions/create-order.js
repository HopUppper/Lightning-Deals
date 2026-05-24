const crypto = require('crypto');

// Razorpay Live API Credentials
const RAZORPAY_KEY_ID = 'rzp_live_ShEwZq0c7pipun';
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
    if (!input || !input.amount || !input.receipt) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid input parameters. Amount and receipt are required.' })
      };
    }

    const amount = parseInt(input.amount);
    const receipt = input.receipt.replace(/[^A-Za-z0-9_\-]/g, '');

    // Razorpay basic authorization token (Base64 key:secret)
    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`
      },
      body: JSON.stringify({
        amount: amount,
        currency: 'INR',
        receipt: receipt,
        payment_capture: 1
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({
          error: 'Razorpay API rejected order creation',
          details: data
        })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
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
