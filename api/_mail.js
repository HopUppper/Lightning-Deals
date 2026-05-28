const https = require('https');

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SENDER_NAME = "Lightning Deals";
const SENDER_EMAIL = "no-reply@lightningdeals.online";

/**
 * Sends a transactional email via the Brevo API.
 * @param {object} params
 * @param {string} params.toEmail - Recipient email address
 * @param {string} params.toName - Recipient name
 * @param {string} params.subject - Email subject line
 * @param {string} params.htmlContent - High-quality HTML content of the email
 * @returns {Promise<object>} - Returns API response
 */
function sendEmail({ toEmail, toName, subject, htmlContent }) {
    return new Promise((resolve, reject) => {
        if (!BREVO_API_KEY) {
            console.warn("BREVO_API_KEY is not defined in environment variables. Skipping transactional email.");
            return resolve({ success: false, error: "BREVO_API_KEY missing" });
        }

        const postData = JSON.stringify({
            sender: {
                name: SENDER_NAME,
                email: SENDER_EMAIL
            },
            to: [
                {
                    email: toEmail,
                    name: toName || "Valued Customer"
                }
            ],
            subject: subject,
            htmlContent: htmlContent
        });

        const options = {
            hostname: 'api.brevo.com',
            port: 443,
            path: '/v3/smtp/email',
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': BREVO_API_KEY,
                'content-type': 'application/json',
                'content-length': Buffer.byteLength(postData)
            }
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => { body += chunk; });
            res.on('end', () => {
                if (res.statusCode === 200 || res.statusCode === 201) {
                    resolve({ success: true, statusCode: res.statusCode, body });
                } else {
                    console.error("Brevo API returned error status:", res.statusCode, body);
                    resolve({ success: false, statusCode: res.statusCode, body });
                }
            });
        });

        req.on('error', (err) => {
            console.error("Network error during Brevo dispatch:", err);
            reject(err);
        });

        req.write(postData);
        req.end();
    });
}

module.exports = {
    sendEmail
};
