// Unified Admin Authentication and Session Cockpit Routing Endpoint
const https = require('https');
const crypto = require('crypto');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const { adminAuthMiddleware, verifyToken } = require('./_admin-auth.js');
const { applyRateLimit } = require('./_rate-limit.js');

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'lightning_deals_super_secret_session_signing_key_2026';

function httpsRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => { resolve({ statusCode: res.statusCode, headers: res.headers, body: body }); });
    });
    req.on('error', (err) => { reject(err); });
    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

function generateToken(payload) {
  const payloadStr = JSON.stringify(payload);
  const encodedPayload = Buffer.from(payloadStr).toString('base64');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(encodedPayload).digest('hex');
  return `${encodedPayload}.${signature}`;
}

const verifyAdminHandler = require('../functions/verify-admin.js').handler;

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, client-ip, x-forwarded-for');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
    
    if (req.method === 'OPTIONS') return res.status(200).end();

    const action = req.query.action || req.body?.action;
    
    // 1. Verify Admin Session Check (corresponds to verify-admin)
    if (action === 'verify-admin') {
        const rateLimitPassed = await applyRateLimit('admin', req, res);
        if (!rateLimitPassed) return;

        const event = {
            httpMethod: req.method,
            body: typeof req.body === 'object' ? JSON.stringify(req.body) : (req.body || ''),
            headers: req.headers,
            queryStringParameters: req.query || {}
        };

        try {
            const result = await verifyAdminHandler(event, {});
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
            console.error("Vercel admin-auth wrapper failed for verify-admin:", err);
            res.status(500).json({ error: "Serverless execution failed: " + err.message });
        }
        return;
    }

    // 2. Setup 2FA
    if (action === 'setup-2fa') {
        if (req.method !== 'POST') return res.status(405).json({ error: "Method Not Allowed" });
        try {
            const payload = adminAuthMiddleware(req, res);
            if (!payload) return;

            const secret = speakeasy.generateSecret({ name: "lightningdeals.online" });
            const qrCodeDataUrl = await qrcode.toDataURL(secret.otpauth_url);

            await httpsRequest({
                hostname: 'lightning-deals-d0adc-default-rtdb.asia-southeast1.firebasedatabase.app',
                port: 443,
                path: '/admin_profile/totp_secret.json',
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            }, secret.base32);

            return res.status(200).json({
                success: true,
                secret: secret.base32,
                qrCode: qrCodeDataUrl
            });
        } catch (err) {
            console.error("2FA setup failed:", err);
            return res.status(500).json({ error: "2FA Setup Server Error: " + err.message });
        }
    }

    // 3. Verify 2FA (activation)
    if (action === 'verify-2fa') {
        if (req.method !== 'POST') return res.status(405).json({ error: "Method Not Allowed" });
        try {
            const payload = adminAuthMiddleware(req, res);
            if (!payload) return;

            const { code } = req.body;
            if (!code) return res.status(400).json({ error: "Verification code is required." });

            const secretRes = await httpsRequest({
                hostname: 'lightning-deals-d0adc-default-rtdb.asia-southeast1.firebasedatabase.app',
                port: 443,
                path: '/admin_profile/totp_secret.json',
                method: 'GET'
            });
            const base32Secret = JSON.parse(secretRes.body);
            if (!base32Secret) return res.status(400).json({ error: "2FA setup has not been initiated." });

            const verified = speakeasy.totp.verify({
                secret: base32Secret,
                encoding: 'base32',
                token: code,
                window: 1
            });

            if (!verified) {
                return res.status(400).json({ success: false, error: "Invalid verification code. Please try again." });
            }

            await httpsRequest({
                hostname: 'lightning-deals-d0adc-default-rtdb.asia-southeast1.firebasedatabase.app',
                port: 443,
                path: '/admin_profile/totp_active.json',
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            }, true);

            return res.status(200).json({
                success: true,
                message: "2FA activated successfully."
            });
        } catch (err) {
            console.error("2FA verification failed:", err);
            return res.status(500).json({ error: "2FA Verification Server Error: " + err.message });
        }
    }

    // 4. Login 2FA (verification of code during login)
    if (action === 'login-2fa') {
        if (req.method !== 'POST') return res.status(405).json({ error: "Method Not Allowed" });
        try {
            const { tempToken, code } = req.body;
            if (!tempToken || !code) {
                return res.status(400).json({ error: "Temporary token and 2FA code are required." });
            }

            const payload = verifyToken(tempToken);
            if (!payload || !payload.step2_passed) {
                return res.status(401).json({ error: "Invalid or expired temporary session." });
            }

            const secretRes = await httpsRequest({
                hostname: 'lightning-deals-d0adc-default-rtdb.asia-southeast1.firebasedatabase.app',
                port: 443,
                path: '/admin_profile/totp_secret.json',
                method: 'GET'
            });
            const base32Secret = JSON.parse(secretRes.body);

            if (!base32Secret) {
                return res.status(500).json({ error: "2FA configuration error on server." });
            }

            const verified = speakeasy.totp.verify({
                secret: base32Secret,
                encoding: 'base32',
                token: code,
                window: 1
            });

            if (!verified) {
                return res.status(401).json({ error: "Incorrect 2FA verification code." });
            }

            const finalTokenPayload = {
                admin_verified: true,
                exp: Date.now() + 24 * 60 * 60 * 1000
            };
            const sessionToken = generateToken(finalTokenPayload);

            const cookieValue = `ld_admin_session=${sessionToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400`;
            res.setHeader('Set-Cookie', cookieValue);

            return res.status(200).json({
                success: true,
                message: "Dashboard unlocked successfully."
            });
        } catch (err) {
            console.error("2FA login verification failed:", err);
            return res.status(500).json({ error: "2FA verification exception: " + err.message });
        }
    }

    // 5. Logout
    if (action === 'logout') {
        res.setHeader('Set-Cookie', 'ld_admin_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0');
        res.setHeader('Location', '/admin.html');
        return res.status(302).end();
    }

    return res.status(400).json({ error: `Invalid admin-auth action: ${action}` });
};
