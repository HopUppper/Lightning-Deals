const https = require('https');
const crypto = require('crypto');

const FIREBASE_RTDB_URL = 'lightning-deals-d0adc-default-rtdb.asia-southeast1.firebasedatabase.app';

// Helper to make HTTPS requests
function httpsRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: body
        });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

// Log authentication events to secure audit trail
async function logAuditEvent(customerId, category, message, ip = 'unknown') {
  const logId = "AUDIT-" + Date.now() + "-" + crypto.randomBytes(3).toString('hex');
  const logObj = {
    id: logId,
    timestamp: new Date().toLocaleString('en-IN'),
    category: category,
    message: message,
    customerId: customerId,
    ip: ip
  };

  try {
    await httpsRequest({
      hostname: FIREBASE_RTDB_URL,
      port: 443,
      path: `/audit_logs/${logId}.json`,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    }, logObj);
  } catch (e) {
    console.error('Failed to write audit log to Firebase:', e);
  }
}

// Password Hashing
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed.' })
    };
  }

  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Request body is required.' })
      };
    }

    const bodyObj = JSON.parse(event.body);
    const { action } = bodyObj;

    if (!action) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Action parameter is required.' })
      };
    }

    const clientIp = event.headers['x-nf-client-connection-ip'] || 
                     event.headers['client-ip'] || 
                     event.headers['x-forwarded-for'] || 
                     'unknown';

    // ==========================================
    // ACTION 1: REQUEST PASSWORD RESET CODE
    // ==========================================
    if (action === 'request_reset') {
      const { email } = bodyObj;
      if (!email) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Email address is required.' })
        };
      }

      const normalizedEmail = email.trim().toLowerCase();
      const customerId = crypto.createHash('sha256').update(normalizedEmail).digest('hex');

      // 1. Check if user exists
      const userRes = await httpsRequest({
        hostname: FIREBASE_RTDB_URL,
        port: 443,
        path: `/customers/${customerId}.json`,
        method: 'GET'
      });

      const user = JSON.parse(userRes.body);

      // Return a positive confirmation anyway to block user enumeration attacks
      const successResponse = {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true, 
          message: 'If this email is registered, a 6-digit password reset code has been sent to their WhatsApp.' 
        })
      };

      if (user === null) {
        return successResponse;
      }

      if (user.status === 'locked') {
        return {
          statusCode: 403,
          headers,
          body: JSON.stringify({ error: 'Account is locked. Please contact support.' })
        };
      }

      // 2. Generate secure 6-digit OTP reset code
      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
      const expiry = Date.now() + 15 * 60 * 1000; // 15 minutes validity

      const resetObj = {
        code: resetCode,
        email: normalizedEmail,
        createdAt: Date.now(),
        attempts: 0,
        expiry: expiry
      };

      // Write OTP code under resets in database
      await httpsRequest({
        hostname: FIREBASE_RTDB_URL,
        port: 443,
        path: `/password_resets/${customerId}.json`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      }, resetObj);

      // 3. Dispatch OTP Code to admin via Discord webhook (same method as order notifications)
      // Fetch settings from Firebase (same structure as trigger-notification.js uses)
      let publicSettings = {};
      try {
        const res = await httpsRequest({
          hostname: FIREBASE_RTDB_URL,
          port: 443,
          path: '/settings.json',
          method: 'GET'
        });
        if (res.statusCode === 200) publicSettings = JSON.parse(res.body) || {};
      } catch (e) {}

      let secureSettings = {};
      try {
        const res = await httpsRequest({
          hostname: FIREBASE_RTDB_URL,
          port: 443,
          path: '/secure_settings.json',
          method: 'GET'
        });
        if (res.statusCode === 200) secureSettings = JSON.parse(res.body) || {};
      } catch (e) {}

      const settings = { ...publicSettings, ...secureSettings };
      const method = (settings.notificationMethod || 'disabled').toLowerCase();

      // ── Discord Webhook notification (primary) ──
      if (method === 'discord' && settings.discordWebhookUrl) {
        const webhookUrl = new URL(settings.discordWebhookUrl);
        const discordPayload = {
          embeds: [{
            title: '🔐 Password Reset Requested',
            color: 0xF5C842, // Lightning yellow
            fields: [
              { name: '👤 Customer', value: user.name || 'Unknown', inline: true },
              { name: '📧 Email', value: normalizedEmail, inline: true },
              { name: '📱 Phone', value: user.phone || 'N/A', inline: true },
              { name: '🔑 OTP Code', value: `\`\`\`${resetCode}\`\`\``, inline: false },
              { name: '⏰ Expires', value: 'In 15 minutes', inline: true },
              { name: '🌐 IP Address', value: clientIp, inline: true }
            ],
            footer: { text: 'Lightning Deals · Customer Auth System' },
            timestamp: new Date().toISOString()
          }]
        };

        try {
          const payloadStr = JSON.stringify(discordPayload);
          await httpsRequest({
            hostname: webhookUrl.hostname,
            port: 443,
            path: webhookUrl.pathname + webhookUrl.search,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(payloadStr)
            }
          }, payloadStr);
        } catch (err) {
          console.error('Discord OTP notification failed:', err);
        }
      }

      // ── CallMeBot WhatsApp fallback (if configured) ──
      if (method === 'callmebot' && settings.callmebotApiKey && user.phone) {
        const msgText = `⚡ Lightning Deals Password Reset\n\nYour 6-digit recovery code: *${resetCode}*\n\nExpires in 15 minutes.`;
        const encodedMsg = encodeURIComponent(msgText);
        const userPhone = user.phone.replace(/[^0-9]/g, '');
        try {
          await httpsRequest({
            hostname: 'api.callmebot.com',
            port: 443,
            path: `/whatsapp.php?phone=${userPhone}&text=${encodedMsg}&apikey=${settings.callmebotApiKey}`,
            method: 'GET'
          });
        } catch (err) {
          console.error('CallMeBot reset notification failed:', err);
        }
      }

      await logAuditEvent(customerId, 'security', 'Password recovery code requested.', clientIp);
      return successResponse;
    }

    // ==========================================
    // ACTION 2: VERIFY CODE AND SET NEW PASSWORD
    // ==========================================
    if (action === 'verify_reset') {
      const { email, code, newPassword } = bodyObj;

      if (!email || !code || !newPassword) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Email, verification code, and new password are required.' })
        };
      }

      if (newPassword.length < 6) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'New password must be at least 6 characters long.' })
        };
      }

      const normalizedEmail = email.trim().toLowerCase();
      const customerId = crypto.createHash('sha256').update(normalizedEmail).digest('hex');

      // 1. Retrieve the active reset OTP record
      const resetRes = await httpsRequest({
        hostname: FIREBASE_RTDB_URL,
        port: 443,
        path: `/password_resets/${customerId}.json`,
        method: 'GET'
      });

      const resetData = JSON.parse(resetRes.body);

      if (resetData === null) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'No active password reset request found for this email address.' })
        };
      }

      // Check OTP Expiry
      if (Date.now() > (resetData.expiry || 0)) {
        // Expiry cleanup
        await httpsRequest({
          hostname: FIREBASE_RTDB_URL,
          port: 443,
          path: `/password_resets/${customerId}.json`,
          method: 'DELETE'
        });
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'The password reset code has expired. Please request a new one.' })
        };
      }

      // Check Attempts Rate Limit
      if ((resetData.attempts || 0) >= 3) {
        await httpsRequest({
          hostname: FIREBASE_RTDB_URL,
          port: 443,
          path: `/password_resets/${customerId}.json`,
          method: 'DELETE'
        });
        return {
          statusCode: 429,
          headers,
          body: JSON.stringify({ error: 'Too many incorrect attempts. Reset code has been voided. Please request a new code.' })
        };
      }

      // Verify OTP Code
      const isCodeValid = crypto.timingSafeEqual(
        Buffer.from(code.trim()),
        Buffer.from(resetData.code.trim())
      );

      if (!isCodeValid) {
        const nextAttempts = (resetData.attempts || 0) + 1;
        await httpsRequest({
          hostname: FIREBASE_RTDB_URL,
          port: 443,
          path: `/password_resets/${customerId}/attempts.json`,
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' }
        }, nextAttempts);

        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: `Incorrect verification code. Attempts remaining: ${3 - nextAttempts}` })
        };
      }

      // 2. Hash New Password and update customer record
      const passwordHash = hashPassword(newPassword);

      await httpsRequest({
        hostname: FIREBASE_RTDB_URL,
        port: 443,
        path: `/customers/${customerId}/passwordHash.json`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      }, passwordHash);

      // Clean up reset record
      await httpsRequest({
        hostname: FIREBASE_RTDB_URL,
        port: 443,
        path: `/password_resets/${customerId}.json`,
        method: 'DELETE'
      });

      await logAuditEvent(customerId, 'security', 'Password recovered and updated successfully using WhatsApp OTP.', clientIp);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true, 
          message: 'Your password has been reset successfully. You can now log in with your new password.' 
        })
      };
    }

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid action.' })
    };

  } catch (error) {
    console.error('Error in customer password reset:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Secure Server Error: ' + error.message })
    };
  }
};
