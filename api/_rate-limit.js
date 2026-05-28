const { Redis } = require('@upstash/redis');
const { Ratelimit } = require('@upstash/ratelimit');

// Centralized Upstash Redis connection
let redis = null;
let isConfigured = false;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
        redis = new Redis({
            url: process.env.UPSTASH_REDIS_REST_URL,
            token: process.env.UPSTASH_REDIS_REST_TOKEN,
        });
        isConfigured = true;
    } catch (e) {
        console.warn("Failed to initialize Upstash Redis:", e.message);
    }
} else {
    console.warn("Upstash Redis environment variables are missing. Rate limiting is running in FAIL-OPEN mode.");
}

// Map profiles to Ratelimit configurations
const limiters = {};

function getLimiter(profile) {
    if (!isConfigured) return null;
    if (limiters[profile]) return limiters[profile];

    let limit, duration;
    switch (profile) {
        case 'login':
            limit = 5;
            duration = '15 m';
            break;
        case 'checkout':
            limit = 10;
            duration = '1 h';
            break;
        case 'coupon':
            limit = 20;
            duration = '10 m';
            break;
        case 'password-reset':
            limit = 3;
            duration = '15 m';
            break;
        case 'admin':
            limit = 60;
            duration = '1 m';
            break;
        case 'general':
        default:
            limit = 100;
            duration = '1 m';
            break;
    }

    limiters[profile] = new Ratelimit({
        redis: redis,
        limiter: Ratelimit.slidingWindow(limit, duration),
        analytics: true,
        prefix: `ratelimit:${profile}`,
    });

    return limiters[profile];
}

// Client IP resolver helper
function getClientIP(req) {
    // Cloudflare connecting IP
    if (req.headers['cf-connecting-ip']) {
        return req.headers['cf-connecting-ip'];
    }
    // standard x-forwarded-for
    if (req.headers['x-forwarded-for']) {
        const parts = req.headers['x-forwarded-for'].split(',');
        return parts[0].trim();
    }
    // Vercel / other fallback
    if (req.headers['x-real-ip']) {
        return req.headers['x-real-ip'];
    }
    // Socket / Connection IP
    if (req.socket && req.socket.remoteAddress) {
        return req.socket.remoteAddress;
    }
    return '127.0.0.1';
}

/**
 * Checks rate limits and applies appropriate headers/error response.
 * @param {string} profile - The window configuration profile name (e.g. 'login', 'checkout')
 * @param {object} req - Vercel API Request object
 * @param {object} res - Vercel API Response object
 * @returns {Promise<boolean>} - Resolves to true if allowed, false if blocked (and response was handled)
 */
async function applyRateLimit(profile, req, res) {
    const ip = getClientIP(req);
    const limiter = getLimiter(profile);

    if (!limiter) {
        // Fail-open strategy
        return true;
    }

    try {
        const identifier = `${profile}:${ip}`;
        const result = await limiter.limit(identifier);

        // Include appropriate standard headers
        res.setHeader('X-RateLimit-Limit', result.limit.toString());
        res.setHeader('X-RateLimit-Remaining', result.remaining.toString());
        
        const resetSeconds = Math.ceil((result.reset - Date.now()) / 1000);
        res.setHeader('Retry-After', resetSeconds > 0 ? resetSeconds.toString() : '0');

        if (!result.success) {
            res.status(429).json({
                error: "Too many requests. Please try again later.",
                retryAfter: resetSeconds > 0 ? resetSeconds : 60
            });
            return false;
        }

        return true;
    } catch (e) {
        console.warn(`Upstash Rate Limiter exception for ${profile} limit:`, e.message);
        // Fail-open strategy
        return true;
    }
}

module.exports = {
    getClientIP,
    applyRateLimit
};
