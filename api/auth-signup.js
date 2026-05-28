// Vercel Serverless Wrapper for LightningDeals /api/auth-signup.js
const netlifyHandler = require('../functions/auth-signup.js').handler;
const { applyRateLimit } = require('./_rate-limit.js');

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

    // Convert Vercel req parameters into Netlify event interface
    const event = {
        httpMethod: req.method,
        body: typeof req.body === 'object' ? JSON.stringify(req.body) : (req.body || ''),
        headers: req.headers,
        queryStringParameters: req.query || {}
    };

    try {
        const result = await netlifyHandler(event, {});
        
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
        console.error("Vercel wrapper failed for auth-signup:", err);
        res.status(500).json({ error: "Serverless execution failed: " + err.message });
    }
};
