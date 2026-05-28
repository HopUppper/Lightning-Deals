const https = require('https');
const crypto = require('crypto');
const speakeasy = require('speakeasy');

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

const { adminAuthMiddleware } = require('./_admin-auth.js');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: "Method Not Allowed" });

    try {
        const payload = adminAuthMiddleware(req, res);
        if (!payload) return;

        const { code } = req.body;
        if (!code) return res.status(400).json({ error: "Verification code is required." });

        // Retrieve secret from Firebase
        const secretRes = await httpsRequest({
            hostname: 'lightning-deals-d0adc-default-rtdb.asia-southeast1.firebasedatabase.app',
            port: 443,
            path: '/admin_profile/totp_secret.json',
            method: 'GET'
        });
        const base32Secret = JSON.parse(secretRes.body);

        if (!base32Secret) return res.status(400).json({ error: "2FA setup has not been initiated." });

        // Verify code
        const verified = speakeasy.totp.verify({
            secret: base32Secret,
            encoding: 'base32',
            token: code,
            window: 1
        });

        if (!verified) {
            return res.status(400).json({ success: false, error: "Invalid verification code. Please try again." });
        }

        // Activate 2FA in Firebase
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
};
