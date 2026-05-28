const https = require('https');
const crypto = require('crypto');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

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

        // Generate secret
        const secret = speakeasy.generateSecret({ name: "lightningdeals.online" });

        // Create QR code
        const qrCodeDataUrl = await qrcode.toDataURL(secret.otpauth_url);

        // Save secret to Firebase
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
};
