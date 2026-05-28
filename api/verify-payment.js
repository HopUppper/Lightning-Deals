// Vercel Serverless Wrapper for LightningDeals /api/verify-payment.js
const netlifyHandler = require('../functions/verify-payment.js').handler;
const { applyRateLimit, redis, isConfigured } = require('./_rate-limit.js');
const https = require('https');

// Helper to make HTTPS requests
function httpsRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, headers: res.headers, body: body });
      });
    });
    req.on('error', (err) => { reject(err); });
    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

// Fetch payment details directly from Razorpay API
async function fetchRazorpayPayment(paymentId) {
    const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
    const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
    
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
        throw new Error("Razorpay keys are not configured on server.");
    }
    
    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');
    const options = {
        hostname: 'api.razorpay.com',
        port: 443,
        path: `/v1/payments/${paymentId}`,
        method: 'GET',
        headers: {
            'Authorization': `Basic ${auth}`
        }
    };
    
    const res = await httpsRequest(options);
    if (res.statusCode !== 200) {
        throw new Error(`Razorpay payment fetch failed with status ${res.statusCode}`);
    }
    return JSON.parse(res.body);
}

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, client-ip, x-forwarded-for');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Apply Rate Limiting
    const rateLimitPassed = await applyRateLimit('general', req, res);
    if (!rateLimitPassed) return;

    let paymentId = null;
    let orderId = null;
    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        paymentId = body ? body.razorpay_payment_id : null;
        orderId = body ? body.razorpay_order_id : null;
    } catch(e) {}

    if (!paymentId || !orderId) {
        return res.status(400).json({ error: "Payment ID and Order ID are required." });
    }

    // 1. Idempotency Check (Redis-based)
    if (isConfigured && redis) {
        try {
            const cacheKey = `idempotency:payment:${paymentId}`;
            const exists = await redis.get(cacheKey);
            if (exists) {
                return res.status(400).json({
                    success: false,
                    error: "Duplicate transaction attempt blocked. This payment has already been verified."
                });
            }
        } catch (e) {
            console.error("Redis idempotency check failed:", e);
        }
    }

    // 2. Paid Amount Sanity Verification (querying Razorpay API directly)
    let paymentDetails = null;
    try {
        paymentDetails = await fetchRazorpayPayment(paymentId);
        
        // Ensure status is authorized or captured
        if (paymentDetails.status !== 'authorized' && paymentDetails.status !== 'captured') {
            return res.status(400).json({
                success: false,
                error: `Transaction status is invalid: ${paymentDetails.status}`
            });
        }

        const paidAmountPaise = paymentDetails.amount; // e.g. 59900 paise for ₹599
        const paidAmountRs = paidAmountPaise / 100;
        
        // Fetch original pricing / products catalog from Firebase to verify expected price
        const catalogRes = await httpsRequest({
            hostname: 'lightning-deals-d0adc-default-rtdb.asia-southeast1.firebasedatabase.app',
            port: 443,
            path: '/products.json',
            method: 'GET'
        });
        
        if (catalogRes.statusCode === 200) {
            const products = JSON.parse(catalogRes.body);
            const notes = paymentDetails.notes || {};
            const productName = notes.product_purchased || paymentDetails.description || "";
            const planLabel = notes.plan_details || "1 Month";
            
            // Find matched product in catalog
            let matchedProduct = null;
            if (products) {
                const prodList = Array.isArray(products) ? products : Object.values(products);
                matchedProduct = prodList.find(p => p && (
                    p.name.toLowerCase() === productName.toLowerCase() ||
                    productName.toLowerCase().includes(p.name.toLowerCase()) ||
                    p.id.toLowerCase() === (notes.product_id || '').toLowerCase()
                ));
            }
            
            if (matchedProduct) {
                const matchedPlan = matchedProduct.plans.find(pl => pl.label.toLowerCase() === planLabel.toLowerCase());
                if (matchedPlan) {
                    let expectedPrice = matchedPlan.price;
                    
                    // Verify if a coupon discount was applied
                    const couponCode = notes.coupon || "";
                    if (couponCode) {
                        const couponRes = await httpsRequest({
                            hostname: 'lightning-deals-d0adc-default-rtdb.asia-southeast1.firebasedatabase.app',
                            port: 443,
                            path: '/coupons.json',
                            method: 'GET'
                        });
                        
                        if (couponRes.statusCode === 200) {
                            const coupons = JSON.parse(couponRes.body);
                            const couponList = Array.isArray(coupons) ? coupons : Object.values(coupons);
                            const matchedCoupon = couponList.find(c => c && c.code.toUpperCase() === couponCode.toUpperCase() && c.active);
                            
                            if (matchedCoupon) {
                                if (matchedCoupon.type === 'percentage') {
                                    expectedPrice = expectedPrice - (expectedPrice * (matchedCoupon.value / 100));
                                } else if (matchedCoupon.type === 'flat') {
                                    expectedPrice = expectedPrice - matchedCoupon.value;
                                }
                            }
                        }
                    }
                    
                    expectedPrice = Math.max(0, Math.round(expectedPrice));
                    
                    // Verify that paidAmount matches expected price (allow 1 INR rounding tolerance)
                    if (Math.abs(paidAmountRs - expectedPrice) > 1.5) {
                        console.error(`PRICE TAMPERING DETECTED! Product: ${productName}, Expected: ₹${expectedPrice}, Paid: ₹${paidAmountRs}`);
                        return res.status(400).json({
                            success: false,
                            error: `Payment amount mismatch detected. Price verification failed. Expected: ₹${expectedPrice}, Paid: ₹${paidAmountRs}.`
                        });
                    }
                    console.log(`Payment amount sanity check passed: ₹${paidAmountRs} matches expected ₹${expectedPrice}`);
                }
            }
        }
    } catch (err) {
        console.error("Razorpay payment sanity verification failed:", err);
        return res.status(400).json({
            success: false,
            error: "Payment sanity check exception: " + err.message
        });
    }

    // Convert Vercel req parameters into Netlify event interface
    const event = {
        httpMethod: req.method,
        body: typeof req.body === 'object' ? JSON.stringify(req.body) : (req.body || ''),
        headers: req.headers,
        queryStringParameters: req.query || {}
    };

    try {
        const result = await netlifyHandler(event, {});
        
        // If payment verified successfully, cache the paymentId in Redis for 24h
        if (result.statusCode === 200 && isConfigured && redis && paymentId) {
            try {
                const bodyObj = JSON.parse(result.body);
                if (bodyObj && bodyObj.success) {
                    const cacheKey = `idempotency:payment:${paymentId}`;
                    await redis.set(cacheKey, "verified", { ex: 86400 });
                }
            } catch (e) {
                console.error("Failed to write to Redis idempotency cache:", e);
            }
        }

        // Transfer custom Netlify headers to Vercel response
        if (result.headers) {
            for (const [key, value] of Object.entries(result.headers)) {
                res.setHeader(key, value);
            }
        }
        
        res.status(result.statusCode || 200);
        
        if (typeof result.body === 'string') {
            res.send(result.body);
        } else {
            res.json(result.body);
        }
    } catch (err) {
        console.error("Vercel wrapper failed for verify-payment:", err);
        res.status(500).json({ error: "Serverless execution failed: " + err.message });
    }
};
