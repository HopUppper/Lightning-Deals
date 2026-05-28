const crypto = require('crypto');

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'lightning_deals_super_secret_session_signing_key_2026';

function getCookie(cookieHeader, name) {
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(';');
  for (let c of cookies) {
    c = c.trim();
    if (c.startsWith(name + '=')) {
      return c.substring(name.length + 1);
    }
  }
  return null;
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

function adminAuthMiddleware(req, res) {
  const cookieHeader = req.headers.cookie;
  const sessionToken = getCookie(cookieHeader, 'ld_admin_session');
  
  if (!sessionToken) {
    res.status(401).json({ error: "Unauthorized session." });
    return null;
  }

  const payload = verifyToken(sessionToken);
  if (!payload || !payload.admin_verified) {
    res.status(401).json({ error: "Unauthorized session." });
    return null;
  }

  return payload;
}

module.exports = {
  adminAuthMiddleware,
  verifyToken,
  getCookie
};
