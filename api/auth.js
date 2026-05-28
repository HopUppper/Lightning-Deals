// Unified Client Authentication Routing Endpoint
const { applyRateLimit } = require('./_rate-limit.js');

const handlers = {
    'login': require('../functions/auth-login.js').handler,
    'signup': require('../functions/auth-signup.js').handler,
    'session': require('../functions/auth-session.js').handler,
    'reset': require('../functions/auth-reset.js').handler
};

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, client-ip, x-forwarded-for');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const action = req.query.action || req.body?.action;
    const netlifyHandler = handlers[action];
    if (!netlifyHandler) {
        return res.status(400).json({ error: `Invalid auth action: ${action}` });
    }

    // Apply Rate Limiting
    const rateLimitPassed = await applyRateLimit(action, req, res);
    if (!rateLimitPassed) return;

    // Validate Input Parameters (if schemas exist)
    const validators = require('./_validators.js');
    let validation;
    if (action === 'login' && validators.loginSchema) {
        validation = validators.loginSchema.safeParse(req.body);
    } else if (action === 'signup' && validators.signupSchema) {
        validation = validators.signupSchema.safeParse(req.body);
    } else if (action === 'session' && validators.sessionSchema) {
        validation = validators.sessionSchema.safeParse(req.body);
    } else if (action === 'reset' && validators.resetSchema) {
        validation = validators.resetSchema.safeParse(req.body);
    }

    if (validation) {
        if (!validation.success) {
            return res.status(400).json({ error: "Invalid input parameters.", details: validation.error.format() });
        }
        req.body = validation.data;
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
        console.error(`Vercel wrapper failed for auth action ${action}:`, err);
        res.status(500).json({ error: "Serverless execution failed: " + err.message });
    }
};
