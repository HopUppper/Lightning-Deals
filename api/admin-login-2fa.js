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

function verifyToken(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const encodedPayload = parts[0];
    const signature = parts[1];
    const expectedSignature = crypto.createHmac('sha256', JWT_SECRET).update(encodedPayload).digest('hex');
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64').toString('utf8'));
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch (e) {
    return null;
  }
}

function generateToken(payload) {
  const payloadStr = JSON.stringify(payload);
  const encodedPayload = Buffer.from(payloadStr).toString('base64');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(encodedPayload).digest('hex');
  return `${encodedPayload}.${signature}`;
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    
    if (req.method === 'OPTIONS') return res.status(200).end();
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

        // Get 2FA secret from Firebase
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

        // Verify code
        const verified = speakeasy.totp.verify({
            secret: base32Secret,
            encoding: 'base32',
            token: code,
            window: 1
        });

        if (!verified) {
            return res.status(401).json({ error: "Incorrect 2FA verification code." });
        }

        // Generate final secure token
        const finalTokenPayload = {
            admin_verified: true,
            exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours validity
        };
        const sessionToken = generateToken(finalTokenPayload);

        // Set HttpOnly cookie
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
};
