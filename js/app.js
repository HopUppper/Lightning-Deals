/* ==========================================================================
   LIGHTNING DEALS - STOREFRONT CLIENT-SIDE CONTROLLER
   ========================================================================== */

// --- Default Catalog Seeding (Prices in Indian Rupees ₹) ---
const DEFAULT_PRODUCTS = [
    {
        id: "canva-pro",
        name: "Canva Pro",
        category: "design",
        description: "Access Canva's full library of 100M+ stock assets, branding kit tools, premium templates, and the one-click background remover.",
        icon: "C",
        iconColor: "grad-purple",
        tag: "Bestseller",
        bestseller: true,
        plans: [
            { label: "1 Month", price: 499, retail: 1499 },
            { label: "6 Months", price: 1999, retail: 8999 },
            { label: "12 Months (1 Year)", price: 2999, retail: 17999 }
        ],
        features: [
            "Join official admin organization",
            "100M+ premium stock photos & videos",
            "One-click Background Remover Tool",
            "Brand Kits, Logo assets & Custom Fonts",
            "Full warranty replacement cover"
        ],
        activationRequirements: "Registered Canva account email address.",
        activationProcess: "We will send an organization team invite link to your email. Click it to join our team."
    },
    {
        id: "adobe-cc",
        name: "Adobe Creative Cloud",
        category: "design",
        description: "Get full access to all 20+ creative desktop/mobile apps including Photoshop, Illustrator, Premiere Pro, and Acrobat Pro.",
        icon: "Cc",
        iconColor: "grad-red",
        tag: "90% Off",
        bestseller: true,
        plans: [
            { label: "1 Month", price: 999, retail: 8999 },
            { label: "6 Months", price: 4999, retail: 35999 },
            { label: "12 Months (1 Year)", price: 7999, retail: 65999 }
        ],
        features: [
            "Full All-Apps bundle activated",
            "Generative Fill & Firefly AI support",
            "Works on Windows, Mac, iPad, Mobile",
            "100GB cloud storage enabled",
            "Reseller renewal warranty protection"
        ],
        activationRequirements: "Registered Adobe account email address. No password required.",
        activationProcess: "We will add your email to our license team. You will receive an activation email from Adobe."
    },
    {
        id: "notion-pro",
        name: "Notion Pro",
        category: "productivity",
        description: "Enhance your team workspaces, wikis, and project databases. Get unlimited block uploads, file attachments, and version history logs.",
        icon: "N",
        iconColor: "grad-blue",
        tag: "Workspaces",
        plans: [
            { label: "1 Month", price: 299, retail: 999 },
            { label: "6 Months", price: 1499, retail: 5999 },
            { label: "12 Months (1 Year)", price: 2499, retail: 11999 }
        ],
        features: [
            "Unlimited file uploads & document blocks",
            "Full page version history (30 days)",
            "Notion AI writing assistant add-on",
            "Custom workspace page links",
            "Private teams collaborative spaces"
        ],
        activationRequirements: "Your Notion registered email account.",
        activationProcess: "We will send team invite request. Once accepted, workspace will upgrade to Pro."
    },
    {
        id: "ms-office",
        name: "Microsoft 365 Family",
        category: "productivity",
        description: "Access premium Office applications: Word, Excel, PowerPoint, Outlook. Works across 5 devices concurrently with OneDrive cloud storage.",
        icon: "O",
        iconColor: "grad-red",
        tag: "Essential",
        plans: [
            { label: "1 Month", price: 349, retail: 1299 },
            { label: "6 Months", price: 1799, retail: 7799 },
            { label: "12 Months (1 Year)", price: 2999, retail: 15499 }
        ],
        features: [
            "Premium Office suite install (5 devices)",
            "1 TB OneDrive secure cloud storage",
            "Access Skype minutes and Outlook premium",
            "Windows, Mac, iOS, Android compatibility",
            "Full reseller replacement support"
        ],
        activationRequirements: "Registered Microsoft email address.",
        activationProcess: "We will send an invitation to join our Family subscription group. Click it to activate."
    },
    {
        id: "netflix-premium",
        name: "Netflix Premium",
        category: "streaming",
        description: "Watch in 4K HDR video quality. Add custom user profile with PIN locks. Ad-free streaming with support for offline downloads.",
        icon: "Nx",
        iconColor: "grad-red",
        tag: "Ultra HD",
        bestseller: true,
        plans: [
            { label: "1 Month", price: 199, retail: 649 },
            { label: "6 Months", price: 999, retail: 3894 },
            { label: "12 Months (1 Year)", price: 1799, retail: 7788 }
        ],
        features: [
            "Shared premium account slot",
            "Ultra HD 4K video resolution",
            "Offline downloads supported",
            "Custom PIN-locked profile screen",
            "Full warranty term replacement cover"
        ],
        activationRequirements: "Name for your profile pin lock.",
        activationProcess: "We will share login credentials (email & password) and slot profile number on WhatsApp."
    },
    {
        id: "spotify-premium",
        name: "Spotify Premium",
        category: "streaming",
        description: "Listen to high fidelity music without audio ads. Download tracks offline for playback, with unlimited skips and playback control.",
        icon: "Sp",
        iconColor: "grad-green",
        tag: "No Ads",
        bestseller: true,
        plans: [
            { label: "1 Month", price: 149, retail: 179 },
            { label: "6 Months", price: 499, retail: 719 },
            { label: "12 Months (1 Year)", price: 799, retail: 1199 }
        ],
        features: [
            "Official Family plan slot invite link",
            "Ad-free offline high quality music",
            "Individual private account upgrade",
            "Millions of songs & podcast titles",
            "Zero account access sharing needed"
        ],
        activationRequirements: "Registered Spotify email account.",
        activationProcess: "We will send a family invite link with address verification credentials on WhatsApp."
    },
    {
        id: "linkedin-premium",
        name: "LinkedIn Premium",
        category: "business",
        description: "Accelerate your career search or client acquisition with LinkedIn Business. Stand out to recruiters and contact anyone.",
        icon: "In",
        iconColor: "grad-blue",
        tag: "Hot Deal",
        plans: [
            { label: "1 Month", price: 799, retail: 5999 },
            { label: "6 Months", price: 3499, retail: 29999 },
            { label: "12 Months (1 Year)", price: 4999, retail: 45000 }
        ],
        features: [
            "Official Business Premium license",
            "15 InMail credits per month",
            "Full list of who viewed your profile",
            "Unlimited search & profile views",
            "16,000+ LinkedIn Learning courses"
        ],
        activationRequirements: "Your LinkedIn account email or profile link.",
        activationProcess: "We will send a unique license upgrade link. Open it while logged in to activate Premium."
    },
    {
        id: "tradingview-premium",
        name: "TradingView Premium",
        category: "finance",
        description: "Unlock institutional trading tools, second-based charts, volume profiles, and unlimited custom technical indicators.",
        icon: "Tv",
        iconColor: "grad-yellow",
        tag: "Pro Traders",
        bestseller: true,
        plans: [
            { label: "1 Month", price: 899, retail: 5990 },
            { label: "6 Months", price: 3999, retail: 29990 },
            { label: "12 Months (1 Year)", price: 5999, retail: 59900 }
        ],
        features: [
            "Premium features tier activated",
            "Second-based intervals charts",
            "Up to 8 charts per window layout",
            "400 active alerts & volume profiles",
            "Ad-free interface workspace"
        ],
        activationRequirements: "Your TradingView Username (No password required).",
        activationProcess: "We will upgrade your username directly inside our team portal. Features will activate instantly."
    },
    {
        id: "chatgpt-plus",
        name: "ChatGPT Plus",
        category: "ai",
        description: "Get access to GPT-4o, advanced data analysis, web browsing, custom GPTs, and higher message limits with priority access.",
        icon: "Gp",
        iconColor: "grad-green",
        tag: "AI Power",
        bestseller: true,
        plans: [
            { label: "1 Month", price: 599, retail: 1999 },
            { label: "6 Months", price: 2999, retail: 11999 },
            { label: "12 Months (1 Year)", price: 4999, retail: 23999 }
        ],
        features: [
            "Official Plus subscription access",
            "Unlimited access to GPT-4o & DALL-E 3",
            "Advanced Data Analysis & File Uploads",
            "Browse Custom GPT Store & plugins",
            "Full renewal warranty replacement cover"
        ],
        activationRequirements: "Your ChatGPT account email address.",
        activationProcess: "We will send an activation link or access credentials via WhatsApp/Email to activate Plus."
    },
    {
        id: "cursor-pro",
        name: "Cursor Pro",
        category: "dev",
        description: "The AI-first code editor designed for pair programming. Get unlimited fast GPT-4o/Claude 3.5 Sonnet queries, codebase indexing, and inline edits.",
        icon: "Cr",
        iconColor: "grad-blue",
        tag: "Developer Choice",
        bestseller: true,
        plans: [
            { label: "1 Month", price: 599, retail: 1999 },
            { label: "6 Months", price: 2999, retail: 11999 },
            { label: "12 Months (1 Year)", price: 4999, retail: 23999 }
        ],
        features: [
            "Unlimited fast premium AI requests",
            "Full codebase indexing & context search",
            "Copilot++ inline code completions",
            "Claude 3.5 Sonnet & GPT-4o native access",
            "Full replacement warranty term cover"
        ],
        activationRequirements: "Your Cursor registered email address.",
        activationProcess: "We will add your email to our active team plan or provide credentials via WhatsApp/Email."
    },
    {
        id: "github-copilot",
        name: "GitHub Copilot",
        category: "dev",
        description: "Your AI pair programmer. Get real-time code suggestions directly in VS Code, JetBrains, and Neovim, based on comments and context.",
        icon: "Gh",
        iconColor: "grad-purple",
        tag: "Essential Dev",
        bestseller: true,
        plans: [
            { label: "1 Month", price: 499, retail: 1499 },
            { label: "6 Months", price: 2499, retail: 8999 },
            { label: "12 Months (1 Year)", price: 3999, retail: 17999 }
        ],
        features: [
            "Multi-language autocomplete suggestions",
            "VS Code, JetBrains, Neovim extensions support",
            "Natural language comments to code translation",
            "Quality inline code explanations & refactoring",
            "Official organization seat invite activation"
        ],
        activationRequirements: "Your GitHub username or registered email address.",
        activationProcess: "We will invite your GitHub account to join our team organization. Acceptance upgrades it immediately."
    }
];

// WhatsApp/Payment Settings
const DEFAULT_SETTINGS = {
    phone: "917695956938", // Reseller WhatsApp Phone Number (with country code, no +)
    upiId: "sidhjain9002-1@okhdfcbank", // Reseller UPI ID
    notificationMethod: "disabled",
    callmebotApiKey: "",
    discordWebhookUrl: "",
    telegramBotToken: "",
    telegramChatId: ""
};

let CONTACT_SETTINGS = { ...DEFAULT_SETTINGS };

// --- Firebase / Database Initialization ---
let database = null;
if (isFirebaseConfigured()) {
    try {
        firebase.initializeApp(FIREBASE_CONFIG);
        database = firebase.database();
        console.log("Firebase Realtime Database initialized successfully.");
    } catch (err) {
        console.error("Firebase initialization failed, running in offline mode:", err);
    }
}

// Helper to check if Firebase is connected
function isDbConnected() {
    return database !== null;
}

function loadSettings() {
    const saved = localStorage.getItem('lightning_deals_settings');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (parsed && typeof parsed === 'object') {
                CONTACT_SETTINGS = { ...DEFAULT_SETTINGS, ...parsed };
            }
        } catch (e) {
            console.error("Error parsing settings:", e);
        }
    }
}

// Synced Settings Loader
function syncSettings(callback) {
    if (database) {
        database.ref('settings').on('value', (snapshot) => {
            const val = snapshot.val();
            if (val) {
                CONTACT_SETTINGS = { ...DEFAULT_SETTINGS, ...val };
                localStorage.setItem('lightning_deals_settings', JSON.stringify(CONTACT_SETTINGS));
            } else {
                database.ref('settings').set(DEFAULT_SETTINGS);
                CONTACT_SETTINGS = { ...DEFAULT_SETTINGS };
                localStorage.setItem('lightning_deals_settings', JSON.stringify(CONTACT_SETTINGS));
            }
            if (callback) callback();
        }, (error) => {
            console.error("Firebase settings sync error, falling back to local storage:", error);
            loadSettings();
            if (callback) callback();
        });
    } else {
        loadSettings();
        if (callback) callback();
    }
}
syncSettings();

function sendOrderNotification(order) {
    loadSettings();
    const method = CONTACT_SETTINGS.notificationMethod;
    const adminPhone = CONTACT_SETTINGS.phone || "917695956938";

    let itemsText = "";
    order.items.forEach(item => {
        itemsText += `• ${item.name} (${item.planLabel}) x ${item.qty} - ₹${(item.price * item.qty).toLocaleString('en-IN')}\n`;
    });

    let messageText = `🔔 *New Order Placed!*\n\n`;
    messageText += `🆔 *Order ID:* ${order.id}\n`;
    messageText += `👤 *Customer:* ${order.name}\n`;
    messageText += `📧 *Email:* ${order.email}\n`;
    messageText += `📞 *WhatsApp:* +${order.phone}\n\n`;
    messageText += `📦 *Items:*\n${itemsText}\n`;
    messageText += `💰 *Total Paid:* ₹${order.price.toLocaleString('en-IN')}\n`;
    messageText += `🔗 *UTR:* ${order.utr}\n`;
    messageText += `📅 *Date:* ${order.date}`;

    if (method === 'callmebot' && CONTACT_SETTINGS.callmebotApiKey) {
        const encodedMsg = encodeURIComponent(messageText);
        const url = `https://api.callmebot.com/whatsapp.php?phone=${adminPhone}&text=${encodedMsg}&apikey=${CONTACT_SETTINGS.callmebotApiKey}`;
        fetch(url)
            .then(res => console.log('CallMeBot notification sent', res))
            .catch(err => console.error('CallMeBot error:', err));
    } else if (method === 'discord' && CONTACT_SETTINGS.discordWebhookUrl) {
        const discordPayload = {
            embeds: [{
                title: "🔔 New Order Placed!",
                color: 16750848, // Orange/Gold
                fields: [
                    { name: "Order ID", value: order.id, inline: true },
                    { name: "Customer", value: order.name, inline: true },
                    { name: "Email", value: order.email, inline: true },
                    { name: "Phone", value: `+${order.phone}`, inline: true },
                    { name: "Total Paid", value: `₹${order.price.toLocaleString('en-IN')}`, inline: true },
                    { name: "UTR ID", value: order.utr, inline: true },
                    { name: "Items", value: itemsText.trim().substring(0, 1024) }
                ],
                timestamp: new Date().toISOString()
            }]
        };
        fetch(CONTACT_SETTINGS.discordWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discordPayload)
        })
        .then(res => console.log('Discord notification sent', res))
        .catch(err => console.error('Discord error:', err));
    } else if (method === 'telegram' && CONTACT_SETTINGS.telegramBotToken && CONTACT_SETTINGS.telegramChatId) {
        const text = encodeURIComponent(messageText);
        const url = `https://api.telegram.com/bot${CONTACT_SETTINGS.telegramBotToken}/sendMessage?chat_id=${CONTACT_SETTINGS.telegramChatId}&text=${text}&parse_mode=Markdown`;
        fetch(url)
            .then(res => console.log('Telegram notification sent', res))
            .catch(err => console.error('Telegram error:', err));
    }
}



// --- Local Storage Helpers ---
function safeGetLocalStorage(key, defaultValue) {
    try {
        const stored = localStorage.getItem(key);
        if (stored === null || stored === undefined || stored === 'undefined' || stored === 'null') {
            return defaultValue;
        }
        const parsed = JSON.parse(stored);
        if (parsed === null || parsed === undefined) {
            return defaultValue;
        }
        if (Array.isArray(defaultValue)) {
            if (!Array.isArray(parsed)) return defaultValue;
            return parsed.filter(item => item !== null && item !== undefined);
        }
        return parsed;
    } catch (e) {
        console.error(`Error parsing localStorage key "${key}":`, e);
        return defaultValue;
    }
}

// --- Local Storage Initialization ---
function initCatalog() {
    const val = localStorage.getItem('lightning_deals_products');
    if (!val || val === 'undefined' || val === 'null') {
        localStorage.setItem('lightning_deals_products', JSON.stringify(DEFAULT_PRODUCTS));
    } else {
        try {
            const parsed = JSON.parse(val);
            if (!parsed || !Array.isArray(parsed)) {
                localStorage.setItem('lightning_deals_products', JSON.stringify(DEFAULT_PRODUCTS));
            } else {
                let updated = false;
                DEFAULT_PRODUCTS.forEach(dp => {
                    if (!parsed.some(p => p.id === dp.id)) {
                        parsed.push(dp);
                        updated = true;
                    }
                });
                if (updated) {
                    localStorage.setItem('lightning_deals_products', JSON.stringify(parsed));
                }
            }
        } catch (e) {
            localStorage.setItem('lightning_deals_products', JSON.stringify(DEFAULT_PRODUCTS));
        }
    }
}

const DEFAULT_COUPONS = [
    { code: "SAVE10", type: "percentage", value: 10, minOrder: 0, active: true },
    { code: "DEALS200", type: "flat", value: 200, minOrder: 999, active: true },
    { code: "LIFETIME50", type: "percentage", value: 15, minOrder: 1999, active: true }
];

function initCoupons() {
    const val = localStorage.getItem('lightning_deals_coupons');
    if (!val || val === 'undefined' || val === 'null') {
        localStorage.setItem('lightning_deals_coupons', JSON.stringify(DEFAULT_COUPONS));
    } else {
        const parsed = safeGetLocalStorage('lightning_deals_coupons', null);
        if (!parsed || !Array.isArray(parsed) || parsed.length === 0) {
            localStorage.setItem('lightning_deals_coupons', JSON.stringify(DEFAULT_COUPONS));
        }
    }
}

// Synced Coupons Loader
function syncCoupons(callback) {
    if (database) {
        database.ref('coupons').on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                let loadedCoupons = [];
                if (Array.isArray(data)) {
                    loadedCoupons = data.filter(c => c !== null && c !== undefined);
                } else if (typeof data === 'object') {
                    loadedCoupons = Object.values(data);
                }
                localStorage.setItem('lightning_deals_coupons', JSON.stringify(loadedCoupons));
            } else {
                database.ref('coupons').set(DEFAULT_COUPONS);
                localStorage.setItem('lightning_deals_coupons', JSON.stringify(DEFAULT_COUPONS));
            }
            if (callback) callback();
        }, (error) => {
            console.error("Firebase coupons sync error, falling back to local storage:", error);
            initCoupons();
            if (callback) callback();
        });
    } else {
        initCoupons();
        if (callback) callback();
    }
}
syncCoupons();

// --- Globals ---
let products = safeGetLocalStorage('lightning_deals_products', DEFAULT_PRODUCTS);
let cart = safeGetLocalStorage('lightning_deals_cart', []);
let appliedCoupon = null;
let currentStep = 1;

// Synced Products Loader
function syncProducts(callback) {
    if (database) {
        database.ref('products').on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                let loadedProducts = [];
                if (Array.isArray(data)) {
                    loadedProducts = data.filter(p => p !== null && p !== undefined);
                } else if (typeof data === 'object') {
                    loadedProducts = Object.keys(data).map(key => {
                        const p = data[key];
                        if (p && !p.id) p.id = key;
                        return p;
                    }).filter(p => p !== null && p !== undefined);
                }
                products = loadedProducts;
                localStorage.setItem('lightning_deals_products', JSON.stringify(products));
            } else {
                const local = localStorage.getItem('lightning_deals_products');
                if (local) {
                    try {
                        const parsed = JSON.parse(local);
                        if (Array.isArray(parsed) && parsed.length > 0) {
                            products = parsed;
                        } else {
                            products = DEFAULT_PRODUCTS;
                        }
                    } catch(e) {
                        products = DEFAULT_PRODUCTS;
                    }
                } else {
                    products = DEFAULT_PRODUCTS;
                }
                database.ref('products').set(products);
                localStorage.setItem('lightning_deals_products', JSON.stringify(products));
            }
            if (typeof applyStoreFilters === 'function') applyStoreFilters();
            if (typeof renderRecentlyViewed === 'function') renderRecentlyViewed();
            if (typeof updateWishlistUI === 'function') updateWishlistUI();
            if (callback) callback();
        }, (error) => {
            console.error("Firebase products sync error, falling back to local storage:", error);
            initCatalog();
            products = safeGetLocalStorage('lightning_deals_products', DEFAULT_PRODUCTS);
            if (typeof applyStoreFilters === 'function') applyStoreFilters();
            if (callback) callback();
        });
    } else {
        initCatalog();
        products = safeGetLocalStorage('lightning_deals_products', DEFAULT_PRODUCTS);
        if (callback) callback();
    }
}
syncProducts();

// --- DOM elements ---
document.addEventListener('DOMContentLoaded', () => {
    // Increment storefront visit tracker
    let visits = parseInt(localStorage.getItem('lightning_deals_visits')) || 0;
    visits++;
    localStorage.setItem('lightning_deals_visits', visits);

    // Icons initialization
    if (window.lucide) {
        window.lucide.createIcons();
    }

    setupHeaderScroll();
    setupMobileMenu();
    setupSearchFilters();
    applyStoreFilters();
    setupTimelineScroll();
    setupTestimonialsCarousel();
    setupFAQAccordion();
    setupFAQSearch();
    setupConfigureModal();
    setupDashboardMock();
    setupPurchaseModal();
    setupScreenshotUpload();
    updateCartBadge();
    setupContactForm();
    startLivePurchaseNotifications();
    setupScrollReveal();
    setupMobileBottomNav();
    setupWishlistModal();
    initSearchSuggestions();
    renderRecentlyViewed();
    updateWishlistUI();
});

// --- Setup Sticky Header ---
function setupHeaderScroll() {
    const header = document.getElementById('main-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Dynamic navigation active link highlighter
        highlightActiveSection();
    });
}

function highlightActiveSection() {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');
    let scrollPos = window.scrollY + 120;

    sections.forEach(section => {
        if (section.id && scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${section.id}` || (section.id === 'hero' && link.getAttribute('href') === '#')) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// --- Setup Mobile Menu Toggle ---
function setupMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const nav = document.getElementById('mobile-navigation');
    const links = document.querySelectorAll('.mobile-nav-link');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        const icon = toggle.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        if (window.lucide) window.lucide.createIcons();
    });

    // Close menu when link clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            toggle.querySelector('i').setAttribute('data-lucide', 'menu');
            if (window.lucide) window.lucide.createIcons();
        });
    });
}

// --- Unified live search & category filters ---
let currentCategory = 'bestsellers';
let searchQuery = '';

function applyStoreFilters() {
    const grid = document.getElementById('store-products-grid');
    if (!grid) return;

    // Refresh products array from local storage in case admin edits it
    products = safeGetLocalStorage('lightning_deals_products', DEFAULT_PRODUCTS);
    grid.innerHTML = '';

    const query = searchQuery.toLowerCase().trim();
    let filtered;
    if (currentCategory === 'bestsellers') {
        let bestsellers = products.filter(p => p.visible !== false && (p.bestseller === true || (p.tag && p.tag.toLowerCase().includes('bestseller'))));
        if (bestsellers.length < 5) {
            const addedIds = new Set(bestsellers.map(b => b.id));
            const extraProducts = products.filter(p => p.visible !== false && !addedIds.has(p.id));
            const fillCount = Math.min(8 - bestsellers.length, extraProducts.length);
            for (let i = 0; i < fillCount; i++) {
                bestsellers.push(extraProducts[i]);
            }
        }
        filtered = bestsellers.slice(0, 10);
        if (query) {
            filtered = filtered.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
        }
    } else {
        filtered = products.filter(p => {
            if (p.visible === false) return false;
            const matchesCategory = (currentCategory === 'all' || p.category === currentCategory);
            const matchesSearch = (!query || p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
            return matchesCategory && matchesSearch;
        });
    }

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="text-center w-100 padding-md" style="grid-column: 1/-1; padding: 4rem 1rem;">
                <i data-lucide="package-open" style="width: 48px; height: 48px; color: var(--text-muted); margin-bottom: 1rem;"></i>
                <p style="color: var(--text-secondary);">No active subscription deals found matching your filters.</p>
            </div>
        `;
        if (window.lucide) window.lucide.createIcons();
        return;
    }

    filtered.forEach(prod => {
        // Calculate starting price
        const minPrice = prod.plans && prod.plans.length > 0
            ? Math.min(...prod.plans.map(pl => pl.price))
            : 0;

        const card = document.createElement('div');
        card.className = 'glass-card product-card';
        card.setAttribute('id', `prod-card-${prod.id}`);

        // Badge tag styling dropshadow
        let badgeHTML = '';
        if (prod.tag) {
            let badgeClass = 'badge-bestseller';
            const tagLower = prod.tag.toLowerCase();
            if (tagLower.includes('best') || tagLower.includes('save') || tagLower.includes('%')) badgeClass = 'badge-bestseller';
            else if (tagLower.includes('popular') || tagLower.includes('hot')) badgeClass = 'badge-popular';
            else if (tagLower.includes('instant') || tagLower.includes('fast')) badgeClass = 'badge-instant';
            else if (tagLower.includes('limit') || tagLower.includes('limited')) badgeClass = 'badge-limited';
            else if (tagLower.includes('recommend') || tagLower.includes('pro')) badgeClass = 'badge-recommended';
            badgeHTML = `<span class="prod-badge-tag ${badgeClass}">${prod.tag}</span>`;
        }

        // Stock status dot wrapper
        let stockHTML = '';
        if (prod.stockStatus) {
            let dotClass = 'available';
            let label = 'Available';
            const status = prod.stockStatus.toLowerCase();
            if (status === 'available') { dotClass = 'available'; label = 'Available'; }
            else if (status === 'limited') { dotClass = 'limited'; label = 'Limited Slots'; }
            else if (status === 'outofstock') { dotClass = 'outofstock'; label = 'Out of Stock'; }
            else if (status === 'instant') { dotClass = 'instant'; label = 'Instant Activation'; }
            
            stockHTML = `
                <div class="stock-status-wrapper">
                    <span class="stock-dot ${dotClass}"></span>
                    <span class="stock-label">${label}</span>
                </div>
            `;
        } else {
            stockHTML = `
                <div class="stock-status-wrapper">
                    <span class="stock-dot available"></span>
                    <span class="stock-label">Available</span>
                </div>
            `;
        }

        // Build benefits list using healFeatures helper
        let benefitsHTML = '';
        const healed = healFeatures(prod.features);
        healed.slice(0, 5).forEach(feat => {
            benefitsHTML += `<li><i data-lucide="check-circle-2"></i> <span>${feat}</span></li>`;
        });

        const wishlist = safeGetLocalStorage('lightning_deals_wishlist', []);
        const isWishlisted = wishlist.includes(prod.id);

        card.innerHTML = `
            <div class="prod-header">
                <div class="prod-badge-logo ${prod.iconColor || 'grad-blue'}">${prod.icon || 'P'}</div>
                ${badgeHTML}
            </div>
            <h3 class="prod-title">${prod.name}</h3>
            ${stockHTML}
            <p class="prod-desc">${prod.description}</p>
            
            <div class="prod-price-area">
                <span class="prod-retail">Starting from</span>
                <div class="prod-offer">
                    <span class="prod-price-new">₹${minPrice.toLocaleString('en-IN')}</span>
                    <span class="prod-price-suffix">/ plan</span>
                </div>
            </div>

            <ul class="prod-benefits">
                ${benefitsHTML}
            </ul>

            <div class="card-actions-wrapper" style="display: flex; gap: 0.5rem; width: 100%; margin-top: auto;">
                <button class="btn btn-primary btn-glow cta-purchase-trigger" data-id="${prod.id}" style="flex-grow: 1;">
                    <span>Add to Cart</span>
                </button>
                <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" data-id="${prod.id}" aria-label="Toggle Wishlist" type="button">
                    <i data-lucide="heart"></i>
                </button>
            </div>
        `;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });

        grid.appendChild(card);
    });

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

function setupSearchFilters() {
    const searchInput = document.getElementById('store-search-input');
    const categorySelect = document.getElementById('store-category-select');
    const filterContainer = document.getElementById('category-filters-container');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const val = e.target.value;
            searchQuery = val;
            
            const trimmed = val.trim();
            if (trimmed !== '') {
                if (currentCategory === 'bestsellers') {
                    currentCategory = 'all';
                    if (categorySelect) categorySelect.value = 'all';
                    if (filterContainer) {
                        filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
                            btn.classList.toggle('active', btn.getAttribute('data-category') === 'all');
                        });
                    }
                }
            } else {
                if (currentCategory === 'all') {
                    currentCategory = 'bestsellers';
                    if (categorySelect) categorySelect.value = 'bestsellers';
                    if (filterContainer) {
                        filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
                            btn.classList.toggle('active', btn.getAttribute('data-category') === 'bestsellers');
                        });
                    }
                }
            }
            applyStoreFilters();
        });
    }

    if (categorySelect) {
        categorySelect.addEventListener('change', (e) => {
            currentCategory = e.target.value;
            
            // Sync with desktop buttons
            if (filterContainer) {
                filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.getAttribute('data-category') === currentCategory);
                });
            }
            applyStoreFilters();
        });
    }

    // Desktop category filters click handling
    if (filterContainer) {
        filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                currentCategory = btn.getAttribute('data-category');
                
                // Sync with mobile selector dropdown
                if (categorySelect) {
                    categorySelect.value = currentCategory;
                }
                
                // Sync active classes on buttons
                filterContainer.querySelectorAll('.filter-btn').forEach(b => {
                    b.classList.toggle('active', b === btn);
                });
                
                applyStoreFilters();
            });
        });
    }
}

// --- Heal Features utility to fix comma-splits and conjunctions ---
function healFeatures(rawFeatures) {
    if (!rawFeatures) return [];
    
    let rawArr = [];
    if (typeof rawFeatures === 'string') {
        rawArr = [rawFeatures];
    } else if (Array.isArray(rawFeatures)) {
        rawArr = [...rawFeatures];
    } else {
        return [];
    }

    let items = [];
    rawArr.forEach(elem => {
        if (typeof elem !== 'string') {
            if (elem !== null && elem !== undefined) {
                items.push(String(elem).trim());
            }
            return;
        }

        if (/[\n\r\u2022\u25cf\u25aa\u25e6\u25a0;\u2714\u00b7\u2023\u2043\u2713]/.test(elem)) {
            const parts = elem.split(/[\n\r\u2022\u25cf\u25aa\u25e6\u25a0;\u2714\u00b7\u2023\u2043\u2713]+/);
            parts.forEach(p => {
                let clean = p.trim();
                clean = clean.replace(/^[\s\u2022\u2714\u2713\-\*\+\u25cf\u25aa\u2013\u2014\u25e6\u25a0\u00b7\u2023\u2043]+/, '').trim();
                clean = clean.replace(/[\s\u2022\u2714\u2713\-\*\+\u25cf\u25aa\u2013\u2014\u25e6\u25a0\u00b7\u2023\u2043]+$/, '').trim();
                if (clean.length > 0) {
                    items.push(clean);
                }
            });
        } else {
            let clean = elem.trim();
            clean = clean.replace(/^[\s\u2022\u2714\u2713\-\*\+\u25cf\u25aa\u2013\u2014\u25e6\u25a0\u00b7\u2023\u2043]+/, '').trim();
            clean = clean.replace(/[\s\u2022\u2714\u2713\-\*\+\u25cf\u25aa\u2013\u2014\u25e6\u25a0\u00b7\u2023\u2043]+$/, '').trim();
            if (clean.length > 0) {
                items.push(clean);
            }
        }
    });

    let healed = [];
    for (let i = 0; i < items.length; i++) {
        let current = items[i];
        
        while (i + 1 < items.length) {
            let next = items[i + 1];
            const endsWithNumber = /\d+$/.test(current);
            const startsWithNumber = /^\d+/.test(next);
            const isContinuation = /^[a-z]/.test(next) || /^(and|or|with|for|to)\b/i.test(next);

            if (endsWithNumber && startsWithNumber) {
                current = current + "," + next;
                i++;
            } else if (isContinuation) {
                current = current + ", " + next;
                i++;
            } else {
                break;
            }
        }

        healed.push(current);
    }

    let finalFeatures = [];
    healed.forEach(item => {
        let clean = item.replace(/,\s*,/g, ',').replace(/\s+/g, ' ').trim();
        clean = clean.replace(/^[\s,;:\.\u2022\u2714\u2713\-\*\+\u25cf\u25aa\u2013\u2014\u25e6\u25a0\u00b7\u2023\u2043]+/, '').trim();
        clean = clean.replace(/[\s,;:\.\u2022\u2714\u2713\-\*\+\u25cf\u25aa\u2013\u2014\u25e6\u25a0\u00b7\u2023\u2043]+$/, '').trim();
        
        if (clean.length > 0) {
            clean = clean.charAt(0).toUpperCase() + clean.slice(1);
            if (!finalFeatures.includes(clean)) {
                finalFeatures.push(clean);
            }
        }
    });

    return finalFeatures;
}

// --- Render grid helper removed, now handled by applyStoreFilters ---

// --- Smooth timeline line fill animations ---
function setupTimelineScroll() {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;

    const line = document.querySelector('.timeline-line');
    const items = document.querySelectorAll('.timeline-item');

    window.addEventListener('scroll', () => {
        const rect = timeline.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        
        if (rect.top < viewHeight && rect.bottom > 0) {
            const totalHeight = rect.height;
            const scrolledPastTop = viewHeight - rect.top;
            const percent = Math.min(100, Math.max(0, (scrolledPastTop / totalHeight) * 90));
            line.style.height = `${percent}%`;

            items.forEach(item => {
                const itemRect = item.getBoundingClientRect();
                if (itemRect.top < viewHeight * 0.7) {
                    item.classList.add('active-step');
                } else {
                    item.classList.remove('active-step');
                }
            });
        }
    });
}

// --- Setup Testimonials Carousel ---
function setupTestimonialsCarousel() {
    const track = document.getElementById('testimonial-track');
    const dotsContainer = document.getElementById('carousel-dots');
    if (!track || !dotsContainer) return;

    const cards = track.querySelectorAll('.testimonial-card');
    const count = cards.length;
    let itemsPerView = window.innerWidth > 992 ? 2 : 1;
    let maxIndex = Math.ceil(count / itemsPerView) - 1;
    let currentIndex = 0;

    function buildDots() {
        dotsContainer.innerHTML = '';
        itemsPerView = window.innerWidth > 992 ? 2 : 1;
        maxIndex = Math.ceil(count / itemsPerView) - 1;
        if (currentIndex > maxIndex) currentIndex = maxIndex;

        const dotsCount = maxIndex + 1;
        for (let i = 0; i < dotsCount; i++) {
            const dot = document.createElement('button');
            dot.className = `indicator-dot ${i === currentIndex ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Go to testimonial slide ${i + 1}`);
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
            dotsContainer.appendChild(dot);
        }
    }

    function goToSlide(index) {
        currentIndex = index;
        const gap = 32; 
        const slideWidth = cards[0].offsetWidth;
        const translateDistance = index * (slideWidth * itemsPerView + gap * itemsPerView);
        track.style.transform = `translateX(-${translateDistance}px)`;
        
        dotsContainer.querySelectorAll('.indicator-dot').forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });
    }

    buildDots();

    let autoInterval = setInterval(() => {
        let nextIndex = currentIndex + 1;
        if (nextIndex > maxIndex) nextIndex = 0;
        goToSlide(nextIndex);
    }, 5000);

    const container = document.querySelector('.carousel-container');
    container.addEventListener('mouseenter', () => clearInterval(autoInterval));
    container.addEventListener('mouseleave', () => {
        autoInterval = setInterval(() => {
            let nextIndex = currentIndex + 1;
            if (nextIndex > maxIndex) nextIndex = 0;
            goToSlide(nextIndex);
        }, 5000);
    });

    window.addEventListener('resize', () => {
        const oldItemsView = itemsPerView;
        itemsPerView = window.innerWidth > 992 ? 2 : 1;
        if (oldItemsView !== itemsPerView) {
            buildDots();
            goToSlide(0);
        }
    });
}

// --- Setup FAQ Accordion ---
function setupFAQAccordion() {
    const list = document.querySelector('.faq-accordion-list');
    if (!list) return;

    list.addEventListener('click', (e) => {
        const toggle = e.target.closest('.faq-toggle');
        if (!toggle) return;

        const item = toggle.closest('.faq-item');
        const content = item.querySelector('.faq-content');
        const isActive = item.classList.contains('active');

        list.querySelectorAll('.faq-item').forEach(otherItem => {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-content').style.maxHeight = '0';
        });

        if (!isActive) {
            item.classList.add('active');
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    });
}

// --- Setup Purchase Modal Logic (UPI & 3-step Checkout) ---
function setupPurchaseModal() {
    const modal = document.getElementById('purchase-modal');
    const closeBtn = document.getElementById('close-modal-btn');
    const headerCartBtn = document.getElementById('header-cart-btn');

    // Step panels
    const panelStep1 = document.getElementById('panel-step-1');
    const panelStep2 = document.getElementById('panel-step-2');
    const panelStep3 = document.getElementById('panel-step-3');
    const panelStep4 = document.getElementById('panel-step-4');

    // Step dots
    const dot1 = document.getElementById('dot-step-1');
    const dot2 = document.getElementById('dot-step-2');
    const dot3 = document.getElementById('dot-step-3');

    // Step connection lines
    const line1 = document.getElementById('line-step-1');
    const line2 = document.getElementById('line-step-2');

    // Action buttons
    const btnNextToDetails = document.getElementById('btn-next-to-details');
    const btnBackToPlans = document.getElementById('btn-back-to-plans'); // This goes back to Step 1 (Cart)
    const btnNextToPayment = document.getElementById('btn-next-to-payment');
    const btnBackToDetails = document.getElementById('btn-back-to-details');
    const btnSubmitOrder = document.getElementById('btn-submit-order');
    const btnCopyUpiId = document.getElementById('btn-copy-upi-id');
    const btnSuccessContinue = document.getElementById('btn-success-continue');

    // Coupon inputs
    const couponInput = document.getElementById('coupon-code-input');
    const btnApplyCoupon = document.getElementById('btn-apply-coupon');
    const couponStatusMsg = document.getElementById('coupon-status-msg');

    // Inputs
    const inputName = document.getElementById('checkout-name');
    const inputEmail = document.getElementById('checkout-email');
    const inputPhone = document.getElementById('checkout-phone');
    const inputUtr = document.getElementById('checkout-utr');

    // UPI specific fields
    const imgUpiQr = document.getElementById('modal-upi-qr');
    const labelPayAmount = document.getElementById('modal-pay-amount-label');
    const qrLoadingSpinner = document.getElementById('qr-loading-spinner');
    const labelUpiIdDisplay = document.getElementById('modal-upi-id-display');

    if (!modal) return;

    // Listen to header cart click
    if (headerCartBtn) {
        headerCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    function openModal() {
        currentStep = 1;
        resetFormInputs();
        
        // Reset Coupon field
        appliedCoupon = null;
        if (couponInput) couponInput.value = '';
        if (couponStatusMsg) {
            couponStatusMsg.className = 'coupon-status-text';
            couponStatusMsg.innerText = '';
        }

        showStep(1);
        renderCartItems();

        modal.classList.add('active');
        document.body.classList.add('modal-open');
        document.body.style.overflow = 'hidden'; 
        if (window.lucide) window.lucide.createIcons();
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        document.body.style.overflow = ''; 
        // Reset to step 1 after transition
        setTimeout(() => {
            showStep(1);
        }, 300);
    }

    function resetFormInputs() {
        inputName.value = '';
        inputEmail.value = '';
        inputPhone.value = '';
        if (inputUtr) inputUtr.value = '';
        
        // Reset uploader interface & global var
        const fileInput = document.getElementById('checkout-screenshot');
        const dropzone = document.getElementById('screenshot-dropzone');
        const previewContainer = document.getElementById('screenshot-preview-container');
        const previewImg = document.getElementById('screenshot-preview-img');
        if (fileInput) fileInput.value = "";
        if (previewImg) previewImg.src = "";
        if (previewContainer) previewContainer.style.display = 'none';
        if (dropzone) dropzone.style.display = 'block';
        compressedScreenshotBase64 = "";
    }

    function renderCartItems() {
        const cartItemsList = document.getElementById('cart-items-list');
        if (!cartItemsList) return;

        if (cart.length === 0) {
            cartItemsList.innerHTML = `
                <div class="text-center" style="padding: 2.5rem 0; opacity: 0.7;">
                    <i data-lucide="shopping-cart" style="width: 36px; height: 36px; margin-bottom: 0.5rem; display: block; margin-left: auto; margin-right: auto;"></i>
                    <p style="font-size: 0.9rem;">Your cart is empty</p>
                </div>
            `;
            if (window.lucide) window.lucide.createIcons();
            btnNextToDetails.disabled = true;
            calculateTotals();
            return;
        }

        btnNextToDetails.disabled = false;
        cartItemsList.innerHTML = '';

        cart.forEach((item, index) => {
            const itemRow = document.createElement('div');
            itemRow.className = 'cart-item-row';

            itemRow.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-logo ${item.iconColor || 'grad-blue'}">${item.icon || 'P'}</div>
                    <div class="cart-item-details">
                        <span class="cart-item-title">${item.name}</span>
                        <span class="cart-item-plan">${item.planLabel}</span>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <div class="qty-selector">
                        <button type="button" class="qty-btn btn-qty-minus-cart" data-index="${index}">−</button>
                        <span class="qty-display" style="width: 24px; text-align: center; font-size: 0.8rem; font-weight: 600; color: var(--text-primary);">${item.qty}</span>
                        <button type="button" class="qty-btn btn-qty-plus-cart" data-index="${index}">+</button>
                    </div>
                    <span class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</span>
                    <button type="button" class="btn-cart-remove" data-index="${index}" title="Remove item">
                        <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
                    </button>
                </div>
            `;

            cartItemsList.appendChild(itemRow);
        });

        // Add event listeners for the list controls
        cartItemsList.querySelectorAll('.btn-qty-minus-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.currentTarget.getAttribute('data-index'));
                if (cart[idx].qty > 1) {
                    cart[idx].qty--;
                    localStorage.setItem('lightning_deals_cart', JSON.stringify(cart));
                    updateCartBadge();
                    renderCartItems();
                }
            });
        });

        cartItemsList.querySelectorAll('.btn-qty-plus-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.currentTarget.getAttribute('data-index'));
                if (cart[idx].qty < 99) {
                    cart[idx].qty++;
                    localStorage.setItem('lightning_deals_cart', JSON.stringify(cart));
                    updateCartBadge();
                    renderCartItems();
                }
            });
        });

        cartItemsList.querySelectorAll('.btn-cart-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.currentTarget.getAttribute('data-index'));
                const removedItem = cart[idx];
                cart.splice(idx, 1);
                localStorage.setItem('lightning_deals_cart', JSON.stringify(cart));
                updateCartBadge();
                renderCartItems();
                showToast(`${removedItem.name} removed from cart.`, 'success');
            });
        });

        if (window.lucide) window.lucide.createIcons();
        calculateTotals();
    }

    function calculateTotals() {
        const subtotalEl = document.getElementById('modal-subtotal-price');
        const discountRow = document.getElementById('modal-discount-row');
        const discountEl = document.getElementById('modal-discount-amount');
        const finalPriceEl = document.getElementById('modal-new-price');

        if (!subtotalEl || !finalPriceEl) return;

        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        subtotalEl.innerText = `₹${subtotal.toLocaleString('en-IN')}`;

        // Validate coupon minOrder
        if (appliedCoupon) {
            if (subtotal < appliedCoupon.minOrder) {
                const oldCouponCode = appliedCoupon.code;
                appliedCoupon = null;
                
                if (couponInput) couponInput.value = '';
                if (couponStatusMsg) {
                    couponStatusMsg.className = 'coupon-status-text error';
                    couponStatusMsg.innerText = `Coupon ${oldCouponCode} removed (min order ₹${oldCouponCode ? getCouponMinOrder(oldCouponCode) : 0} not met)`;
                }
                
                showToast(`Coupon ${oldCouponCode} removed: minimum order requirement not met.`, 'error');
            }
        }

        let discount = 0;
        if (appliedCoupon) {
            if (appliedCoupon.type === 'percentage') {
                discount = Math.round(subtotal * (appliedCoupon.value / 100));
            } else if (appliedCoupon.type === 'flat') {
                discount = appliedCoupon.value;
            }
            discount = Math.min(discount, subtotal);
        }

        const total = subtotal - discount;

        if (appliedCoupon) {
            if (discountRow) discountRow.style.display = 'flex';
            if (discountEl) discountEl.innerText = `-₹${discount.toLocaleString('en-IN')}`;
        } else {
            if (discountRow) discountRow.style.display = 'none';
        }

        finalPriceEl.innerText = `₹${total.toLocaleString('en-IN')}`;
    }

    function getCouponMinOrder(code) {
        const coupons = safeGetLocalStorage('lightning_deals_coupons', []);
        const c = coupons.find(x => x.code && x.code.toUpperCase() === code.toUpperCase());
        return c ? c.minOrder : 0;
    }

    // Coupon validation logic
    if (btnApplyCoupon && couponInput && couponStatusMsg) {
        btnApplyCoupon.addEventListener('click', () => {
            const code = couponInput.value.trim().toUpperCase();
            if (!code) {
                couponStatusMsg.className = 'coupon-status-text error';
                couponStatusMsg.innerText = 'Please enter a coupon code.';
                return;
            }

            const coupons = safeGetLocalStorage('lightning_deals_coupons', []);
            const coupon = coupons.find(c => c.code && c.code.toUpperCase() === code);

            if (!coupon) {
                couponStatusMsg.className = 'coupon-status-text error';
                couponStatusMsg.innerText = 'Invalid coupon code';
                appliedCoupon = null;
                calculateTotals();
                return;
            }

            if (!coupon.active) {
                couponStatusMsg.className = 'coupon-status-text error';
                couponStatusMsg.innerText = 'This coupon is inactive';
                appliedCoupon = null;
                calculateTotals();
                return;
            }

            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
            if (subtotal < coupon.minOrder) {
                couponStatusMsg.className = 'coupon-status-text error';
                couponStatusMsg.innerText = `Minimum order of ₹${coupon.minOrder.toLocaleString('en-IN')} required for this coupon`;
                appliedCoupon = null;
                calculateTotals();
                return;
            }

            appliedCoupon = coupon;
            couponStatusMsg.className = 'coupon-status-text success';
            
            let desc = '';
            if (coupon.type === 'percentage') {
                desc = `${coupon.value}% off`;
            } else {
                desc = `₹${coupon.value} off`;
            }
            couponStatusMsg.innerText = `Coupon applied successfully (${desc})!`;
            
            calculateTotals();
            showToast(`Coupon ${code} applied successfully!`, 'success');
        });
    }

    function showStep(stepNum) {
        currentStep = stepNum;

        // Toggle active panels
        panelStep1.classList.toggle('active', stepNum === 1);
        panelStep2.classList.toggle('active', stepNum === 2);
        if (panelStep3) panelStep3.classList.toggle('active', stepNum === 3);
        if (panelStep4) panelStep4.classList.toggle('active', stepNum === 4);

        // Update step dots
        dot1.className = `checkout-step-dot ${stepNum === 1 ? 'active' : 'completed'}`;
        dot2.className = `checkout-step-dot ${stepNum === 2 ? 'active' : (stepNum > 2 ? 'completed' : '')}`;
        if (dot3) dot3.className = `checkout-step-dot ${stepNum === 3 ? 'active' : ''}`;

        // Update indicators connecting lines
        line1.className = `checkout-step-line ${stepNum > 1 ? 'completed' : ''}`;
        if (line2) line2.className = `checkout-step-line ${stepNum > 2 ? 'completed' : ''}`;

        // Hide header and steps indicator on success screen (step 4)
        const modalHeader = document.querySelector('#purchase-modal .modal-header');
        const modalStepsIndicator = document.querySelector('#purchase-modal .modal-steps-indicator');
        const closeBtn = document.getElementById('close-modal-btn');
        if (stepNum === 4) {
            if (modalHeader) modalHeader.style.display = 'none';
            if (modalStepsIndicator) modalStepsIndicator.style.display = 'none';
            if (closeBtn) closeBtn.style.display = 'none'; // force user to click continue shopping to clear/refresh properly
        } else {
            if (modalHeader) modalHeader.style.display = '';
            if (modalStepsIndicator) modalStepsIndicator.style.display = '';
            if (closeBtn) closeBtn.style.display = '';
        }

        if (window.lucide) window.lucide.createIcons();
    }

    function setupPaymentQR() {
        loadSettings();
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        let discount = 0;
        if (appliedCoupon) {
            if (appliedCoupon.type === 'percentage') {
                discount = Math.round(subtotal * (appliedCoupon.value / 100));
            } else if (appliedCoupon.type === 'flat') {
                discount = appliedCoupon.value;
            }
            discount = Math.min(discount, subtotal);
        }
        const payAmount = subtotal - discount;
        
        if (labelPayAmount) {
            labelPayAmount.innerText = `₹${payAmount.toLocaleString('en-IN')}`;
        }
        
        if (qrLoadingSpinner) {
            qrLoadingSpinner.style.display = 'block';
        }
        if (imgUpiQr) {
            imgUpiQr.classList.add('loading');
        }
        
        const upiId = CONTACT_SETTINGS.upiId;
        const pn = encodeURIComponent("Lightning Deals");
        
        const itemsNotes = cart.map(item => item.name).join(', ').substring(0, 40);
        const tn = encodeURIComponent(`LD: ${itemsNotes}`);
        
        const upiUrl = `upi://pay?pa=${upiId}&pn=${pn}&am=${payAmount}&cu=INR&tn=${tn}`;
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiUrl)}`;
        
        if (imgUpiQr) {
            imgUpiQr.src = qrUrl;
        }
        if (labelUpiIdDisplay) {
            labelUpiIdDisplay.innerText = upiId;
        }
    }

    // Modal Step transitions
    if (btnSuccessContinue) {
        btnSuccessContinue.addEventListener('click', () => {
            closeModal();
        });
    }

    const btnSuccessWorkspace = document.getElementById('btn-success-workspace');
    if (btnSuccessWorkspace) {
        btnSuccessWorkspace.addEventListener('click', () => {
            closeModal();
            if (window.refreshWorkspace) {
                window.refreshWorkspace();
            }
            setTimeout(() => {
                const target = document.getElementById('roadmap-dashboard');
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }, 350);
        });
    }

    if (btnNextToDetails) {
        btnNextToDetails.addEventListener('click', () => {
            showStep(2);
        });
    }

    if (btnBackToPlans) {
        btnBackToPlans.addEventListener('click', () => {
            showStep(1);
        });
    }

    if (btnNextToPayment) {
        btnNextToPayment.addEventListener('click', () => {
        // Validate fields
        const nameVal = inputName.value.trim();
        const emailVal = inputEmail.value.trim();
        const phoneVal = inputPhone.value.trim();

        if (nameVal.length < 2) {
            alert('Please enter your full name (minimum 2 characters).');
            inputName.focus();
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailVal)) {
            alert('Please enter a valid email address.');
            inputEmail.focus();
            return;
        }

        // Clean and validate WhatsApp Phone
        const cleanPhone = phoneVal.replace(/[\s\-\+\(\)]/g, '');
        if (cleanPhone.length < 10) {
            alert('Please enter a valid WhatsApp phone number (minimum 10 digits).');
            inputPhone.focus();
            return;
        }

        // Setup dynamic UPI QR code
        setupPaymentQR();

        // Go to payment screen
        showStep(3);
    });
    }

    if (btnBackToDetails) {
        btnBackToDetails.addEventListener('click', () => {
            showStep(2);
        });
    }

    // Copy UPI ID
    if (btnCopyUpiId) {
        btnCopyUpiId.addEventListener('click', () => {
            const upiId = CONTACT_SETTINGS.upiId;
            navigator.clipboard.writeText(upiId).then(() => {
                const initialHTML = btnCopyUpiId.innerHTML;
                btnCopyUpiId.innerHTML = `<i data-lucide="check" style="width: 14px; height: 14px; margin-right: 4px;"></i> <span style="font-size: 0.75rem;">Copied!</span>`;
                btnCopyUpiId.classList.add('copied');
                if (window.lucide) window.lucide.createIcons();
                
                setTimeout(() => {
                    btnCopyUpiId.innerHTML = initialHTML;
                    btnCopyUpiId.classList.remove('copied');
                    if (window.lucide) window.lucide.createIcons();
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy UPI ID: ', err);
                alert(`Could not copy automatically. UPI ID is: ${upiId}`);
            });
        });
    }

    // Enforce numeric only on UTR input
    if (inputUtr) {
        inputUtr.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }

    // Submit Order with UTR
    if (btnSubmitOrder) {
        btnSubmitOrder.addEventListener('click', () => {
            const nameVal = inputName.value.trim();
            const emailVal = inputEmail.value.trim();
            const phoneVal = inputPhone.value.trim();
            const utrVal = inputUtr ? inputUtr.value.trim() : '';

            // Validate UTR (12 digits)
            if (!/^\d{12}$/.test(utrVal)) {
                alert('Please enter a valid 12-digit numeric UPI Ref No. / Transaction ID (UTR).');
                if (inputUtr) inputUtr.focus();
                return;
            }

            // Require payment receipt screenshot upload
            if (!compressedScreenshotBase64) {
                alert('Please upload your payment receipt screenshot to complete the order.');
                return;
            }

            // Format phone number
            const cleanPhone = phoneVal.replace(/[\s\-\+\(\)]/g, '');
            let formattedCustomerPhone = cleanPhone;
            if (formattedCustomerPhone.length === 10) {
                formattedCustomerPhone = '91' + formattedCustomerPhone;
            }

            // Calculate final totals
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
            let discount = 0;
            if (appliedCoupon) {
                if (appliedCoupon.type === 'percentage') {
                    discount = Math.round(subtotal * (appliedCoupon.value / 100));
                } else if (appliedCoupon.type === 'flat') {
                    discount = appliedCoupon.value;
                }
                discount = Math.min(discount, subtotal);
            }
            const finalPrice = subtotal - discount;

            // Create Order Payload
            const order = {
                id: "LD-" + Date.now() + Math.floor(Math.random() * 100),
                product: cart.map(item => `${item.name} (${item.qty}x)`).join(', '),
                plan: cart.map(item => item.planLabel).join(', '),
                price: finalPrice, 
                subtotal: subtotal,
                discount: discount,
                coupon: appliedCoupon ? appliedCoupon.code : "",
                items: cart.map(item => ({
                    productId: item.productId,
                    name: item.name,
                    planLabel: item.planLabel,
                    price: item.price,
                    retail: item.retail,
                    qty: item.qty
                })),
                name: nameVal,
                email: emailVal,
                phone: formattedCustomerPhone,
                utr: utrVal,
                screenshot: compressedScreenshotBase64,
                date: new Date().toLocaleString('en-IN'),
                status: "Pending"
            };

            // Write to Firebase if configured
            if (database) {
                database.ref('orders/' + order.id).set(order)
                    .then(() => {
                        console.log("Order saved to Firebase Realtime Database:", order.id);
                        listenToCustomerOrders();
                    })
                    .catch(err => {
                        console.error("Firebase database order write failed:", err);
                    });
            }

            // Write to local storage
            const orders = safeGetLocalStorage('lightning_deals_orders', []);
            orders.unshift(order);
            try {
                localStorage.setItem('lightning_deals_orders', JSON.stringify(orders));
            } catch (e) {
                console.error("Local Storage Write Error during checkout:", e);
                if (e.name === 'QuotaExceededError' || e.code === 22 || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                    // Try to save without the screenshot to ensure order doesn't get lost
                    order.screenshot = "error:screenshot_removed_due_to_storage_quota_limit";
                    order.screenshotRemoved = true;
                    // Try again
                    try {
                        localStorage.setItem('lightning_deals_orders', JSON.stringify(orders));
                        alert("⚠️ Your transaction screenshot is very large, and browser local storage is nearly full. We saved your order details, but the screenshot couldn't be saved locally. Please share the receipt screenshot directly with our support team on WhatsApp!");
                    } catch (e2) {
                        alert("⚠️ Browser storage is completely full! We could not save this order to local history, but your order details will be displayed next. Please capture a screenshot of the order confirmation!");
                    }
                } else {
                    alert("⚠️ Error saving order details: " + e.message);
                }
            }

            // Populate Success screen fields
            const successOrderIdEl = document.getElementById('success-order-id');
            const successOrderTotalEl = document.getElementById('success-order-total');
            const successOrderUtrEl = document.getElementById('success-order-utr');

            if (successOrderIdEl) successOrderIdEl.innerText = order.id;
            if (successOrderTotalEl) successOrderTotalEl.innerText = `₹${order.price.toLocaleString('en-IN')}`;
            if (successOrderUtrEl) successOrderUtrEl.innerText = order.utr;

            // Transition to Success Step
            showStep(4);

            // Send notification to Admin/Reseller
            try {
                sendOrderNotification(order);
            } catch (err) {
                console.error("Failed to send order notification:", err);
            }

            // Clear cart
            cart = [];
            localStorage.removeItem('lightning_deals_cart');
            updateCartBadge();
        });
    }
}

// --- Setup Contact Form Submission ---
function setupContactForm() {
    const form = document.getElementById('store-contact-form');
    const successMsg = document.getElementById('form-success-alert');
    const submitBtn = document.getElementById('contact-form-submit-btn');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simulate sending animation
        const initialText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending...</span>`;

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = initialText;

            // Show success notice
            successMsg.style.display = 'flex';
            
            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const messageInput = document.getElementById('form-msg').value.trim();
            
            const textMsg = `Hello Lightning Deals Support!\n\nI have a general inquiry:\n👤 Name: ${name}\n📧 Email: ${email}\n💬 Inquiry: ${messageInput}`;
            const encodedText = encodeURIComponent(textMsg);
            
            // Reset inputs
            form.reset();

            // Direct customer to WhatsApp to initiate chat
            setTimeout(() => {
                window.open(`https://wa.me/${CONTACT_SETTINGS.phone}?text=${encodedText}`, '_blank');
                successMsg.style.display = 'none';
            }, 2500);

        }, 1200);
    });
}

// --- Setup Configure Modal for Plan Selection & Quantity ---
let selectedConfigureProduct = null;
let selectedConfigurePlanIndex = 0;

function setupConfigureModal() {
    const modal = document.getElementById('product-configure-modal');
    const closeBtn = document.getElementById('close-config-modal-btn');
    const planGroup = document.getElementById('config-plans-group');
    const qtyInput = document.getElementById('config-qty-input');
    const btnQtyMinus = document.getElementById('btn-qty-minus');
    const btnQtyPlus = document.getElementById('btn-qty-plus');
    const btnAddToCart = document.getElementById('btn-add-to-cart');

    if (!modal) return;

    // Setup modal tab switching
    const tabBtns = modal.querySelectorAll('.modal-tab-btn');
    const tabPanels = modal.querySelectorAll('.modal-tab-content-panel');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            tabBtns.forEach(b => b.classList.toggle('active', b === btn));
            tabPanels.forEach(p => p.classList.toggle('active', p.id === `tab-${targetTab}`));
        });
    });

    // Intercept "Get Access" button clicks to configure product before checkout
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.cta-purchase-trigger');
        if (!btn) return;

        const id = btn.getAttribute('data-id');
        const prod = products.find(p => p.id === id);
        if (!prod) return;

        selectedConfigureProduct = prod;
        selectedConfigurePlanIndex = 0;
        if (qtyInput) qtyInput.value = 1;

        openConfigModal();
        trackRecentlyViewed(prod.id);
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeConfigModal);
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeConfigModal();
    });

    function openConfigModal() {
        if (!selectedConfigureProduct) return;
        
        // Reset tabs to default (Overview)
        tabBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-tab') === 'overview'));
        tabPanels.forEach(p => p.classList.toggle('active', p.id === 'tab-overview'));

        // Populate modal data
        document.getElementById('config-product-title').innerText = selectedConfigureProduct.name;
        document.getElementById('config-product-desc').innerText = selectedConfigureProduct.description;
        
        const reqsEl = document.getElementById('config-activation-reqs');
        if (reqsEl) {
            reqsEl.innerText = selectedConfigureProduct.activationRequirements || 'None';
        }
        const procEl = document.getElementById('config-activation-process');
        if (procEl) {
            procEl.innerText = selectedConfigureProduct.activationProcess || 'Auto-activation upon checkout verification.';
        }

        const badge = document.getElementById('config-product-badge');
        if (badge) {
            badge.innerText = selectedConfigureProduct.icon || 'P';
            badge.className = `modal-logo-wrapper ${selectedConfigureProduct.iconColor || 'grad-blue'}`;
        }

        // Tab 2: Best Use Cases
        const useCasesList = document.getElementById('config-use-cases-list');
        if (useCasesList && selectedConfigureProduct.features) {
            useCasesList.innerHTML = '';
            selectedConfigureProduct.features.forEach(feat => {
                const li = document.createElement('li');
                li.style.cssText = 'display: flex; align-items: flex-start; gap: 8px; margin-bottom: 0.5rem; color: var(--text-secondary); font-size: 0.85rem;';
                li.innerHTML = `
                    <i data-lucide="check" class="text-green" style="width: 16px; height: 16px; min-width: 16px; margin-top: 2px;"></i>
                    <span>${feat}</span>
                `;
                useCasesList.appendChild(li);
            });
        }

        // Tab 3: Price Comparison
        const compTbody = document.getElementById('config-comparison-tbody');
        if (compTbody && selectedConfigureProduct.plans) {
            compTbody.innerHTML = '';
            selectedConfigureProduct.plans.forEach(plan => {
                const savePercent = plan.retail > 0 ? Math.round(((plan.retail - plan.price) / plan.retail) * 100) : 0;
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${plan.label}</td>
                    <td style="text-decoration: line-through; opacity: 0.6;">₹${plan.retail.toLocaleString('en-IN')}</td>
                    <td style="font-weight: 600; color: var(--clr-cyan);">₹${plan.price.toLocaleString('en-IN')}</td>
                    <td style="font-weight: 600; color: var(--clr-green);">${savePercent}%</td>
                `;
                compTbody.appendChild(tr);
            });
        }

        // Tab 4: Activation FAQ
        const faqList = document.getElementById('config-faq-list');
        if (faqList) {
            faqList.innerHTML = `
                <div class="act-timeline-item" style="display: flex; gap: 1rem; margin-bottom: 1.25rem;">
                    <div class="act-timeline-badge" style="width: 28px; height: 28px; border-radius: 50%; background: rgba(0, 242, 254, 0.1); border: 1px solid rgba(0, 242, 254, 0.3); display: flex; align-items: center; justify-content: center; color: var(--clr-cyan); flex-shrink: 0;">
                        <i data-lucide="key" style="width: 14px; height: 14px;"></i>
                    </div>
                    <div class="act-timeline-content" style="flex: 1;">
                        <h4 class="act-timeline-title" style="font-size: 0.85rem; font-weight: 600; color: var(--text-primary); margin-bottom: 2px;">1. What is required from you?</h4>
                        <p class="act-timeline-desc" style="font-size: 0.75rem; color: var(--text-secondary); margin: 0;">${selectedConfigureProduct.activationRequirements || 'Provide your email address associated with the account.'}</p>
                    </div>
                </div>
                <div class="act-timeline-item" style="display: flex; gap: 1rem; margin-bottom: 1.25rem;">
                    <div class="act-timeline-badge" style="width: 28px; height: 28px; border-radius: 50%; background: rgba(0, 242, 254, 0.1); border: 1px solid rgba(0, 242, 254, 0.3); display: flex; align-items: center; justify-content: center; color: var(--clr-cyan); flex-shrink: 0;">
                        <i data-lucide="send" style="width: 14px; height: 14px;"></i>
                    </div>
                    <div class="act-timeline-content" style="flex: 1;">
                        <h4 class="act-timeline-title" style="font-size: 0.85rem; font-weight: 600; color: var(--text-primary); margin-bottom: 2px;">2. Activation Process</h4>
                        <p class="act-timeline-desc" style="font-size: 0.75rem; color: var(--text-secondary); margin: 0;">${selectedConfigureProduct.activationProcess || 'We will upgrade your account or send invite credentials within 1-2 hours.'}</p>
                    </div>
                </div>
                <div class="act-timeline-item" style="display: flex; gap: 1rem;">
                    <div class="act-timeline-badge" style="width: 28px; height: 28px; border-radius: 50%; background: rgba(0, 242, 254, 0.1); border: 1px solid rgba(0, 242, 254, 0.3); display: flex; align-items: center; justify-content: center; color: var(--clr-cyan); flex-shrink: 0;">
                        <i data-lucide="shield-check" style="width: 14px; height: 14px;"></i>
                    </div>
                    <div class="act-timeline-content" style="flex: 1;">
                        <h4 class="act-timeline-title" style="font-size: 0.85rem; font-weight: 600; color: var(--text-primary); margin-bottom: 2px;">3. 100% Replacement Warranty</h4>
                        <p class="act-timeline-desc" style="font-size: 0.75rem; color: var(--text-secondary); margin: 0;">Every purchase includes our comprehensive, full-term warranty. If any access issues occur, we replace or restore the account seat immediately via our WhatsApp support desk.</p>
                    </div>
                </div>
            `;
        }

        // Build plan options selection buttons
        if (planGroup) {
            planGroup.innerHTML = '';
            selectedConfigureProduct.plans.forEach((plan, index) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = `plan-btn ${index === selectedConfigurePlanIndex ? 'active' : ''}`;
                btn.innerHTML = `
                    <span class="plan-label">${plan.label}</span>
                    <span class="plan-price">₹${plan.price.toLocaleString('en-IN')}</span>
                `;
                
                btn.addEventListener('click', () => {
                    selectedConfigurePlanIndex = index;
                    updateConfigPrices();
                    planGroup.querySelectorAll('.plan-btn').forEach((b, idx) => {
                        b.classList.toggle('active', idx === index);
                    });
                });
                planGroup.appendChild(btn);
            });
        }

        updateConfigPrices();

        // Populate Related / Frequently Bought Together products
        const relatedSection = document.getElementById('config-related-products-section');
        const relatedList = document.getElementById('config-related-products-list');
        if (relatedSection && relatedList) {
            relatedList.innerHTML = '';
            // Find products in the same category or default others
            const activeProducts = safeGetLocalStorage('lightning_deals_products', DEFAULT_PRODUCTS);
            const relatedProds = activeProducts.filter(p => p.id !== selectedConfigureProduct.id && p.visible !== false).slice(0, 2);
            
            if (relatedProds.length > 0) {
                relatedSection.style.display = 'block';
                relatedProds.forEach(prod => {
                    const minPrice = prod.plans && prod.plans.length > 0
                        ? Math.min(...prod.plans.map(pl => pl.price))
                        : 0;
                        
                    const row = document.createElement('div');
                    row.className = 'related-product-row';
                    row.style.cssText = 'display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0.75rem; background: rgba(255, 255, 255, 0.015); border: 1px solid rgba(255, 255, 255, 0.03); border-radius: 8px; margin-top: 0.5rem; gap: 8px;';
                    row.innerHTML = `
                        <div style="display: flex; align-items: center; gap: 8px; min-width: 0; flex: 1;">
                            <div class="cart-item-logo ${prod.iconColor || 'grad-blue'}" style="width: 24px; height: 24px; font-size: 0.65rem; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">${prod.icon || 'P'}</div>
                            <div style="display: flex; flex-direction: column; min-width: 0; flex: 1;">
                                <span style="font-size: 0.75rem; font-weight: 600; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${prod.name}</span>
                                <span style="font-size: 0.65rem; color: var(--clr-cyan);">₹${minPrice.toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                        <button type="button" class="btn btn-secondary btn-sm btn-add-related" data-id="${prod.id}" style="padding: 0.25rem 0.6rem; font-size: 0.65rem; border-radius: 6px; flex-shrink: 0;">
                            Add
                        </button>
                    `;
                    relatedList.appendChild(row);
                });
                
                // Event listener for adding related products directly to cart
                relatedList.querySelectorAll('.btn-add-related').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const id = e.currentTarget.getAttribute('data-id');
                        const prod = activeProducts.find(p => p.id === id);
                        if (prod) {
                            // Add first plan of the product to cart
                            const firstPlan = prod.plans[0];
                            const cartItem = {
                                id: prod.id,
                                name: prod.name,
                                icon: prod.icon,
                                iconColor: prod.iconColor,
                                planLabel: firstPlan.label,
                                validity: firstPlan.validity,
                                price: firstPlan.price,
                                qty: 1
                            };
                            
                            // Check if already in cart
                            const existingIdx = cart.findIndex(item => item.id === cartItem.id && item.planLabel === cartItem.planLabel);
                            if (existingIdx > -1) {
                                cart[existingIdx].qty++;
                            } else {
                                cart.push(cartItem);
                            }
                            
                            localStorage.setItem('lightning_deals_cart', JSON.stringify(cart));
                            updateCartBadge();
                            showToast(`${prod.name} added to cart!`, 'success');
                            
                            // Disable button or update text to Added
                            e.currentTarget.disabled = true;
                            e.currentTarget.innerText = 'Added';
                        }
                    });
                });
            } else {
                relatedSection.style.display = 'none';
            }
        }

        modal.classList.add('active');
        document.body.classList.add('modal-open');
        document.body.style.overflow = 'hidden'; 
        if (window.lucide) window.lucide.createIcons();
    }

    function closeConfigModal() {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        document.body.style.overflow = ''; 
    }

    function updateConfigPrices() {
        if (!selectedConfigureProduct) return;
        const plan = selectedConfigureProduct.plans[selectedConfigurePlanIndex];
        const qty = parseInt(qtyInput ? qtyInput.value : 1) || 1;
        const retailTotal = plan.retail * qty;
        const priceTotal = plan.price * qty;
        
        const oldPriceEl = document.getElementById('config-old-price');
        const newPriceEl = document.getElementById('config-new-price');
        const savingsTagEl = document.getElementById('config-savings-tag');

        if (oldPriceEl) oldPriceEl.innerText = `₹${retailTotal.toLocaleString('en-IN')}`;
        if (newPriceEl) newPriceEl.innerText = `₹${priceTotal.toLocaleString('en-IN')}`;

        if (savingsTagEl) {
            const diff = retailTotal - priceTotal;
            const savePercent = retailTotal > 0 ? Math.round((diff / retailTotal) * 100) : 0;
            savingsTagEl.innerText = `You Save ${savePercent}%`;
        }
    }

    // Quantity modifiers handlers
    if (btnQtyMinus && qtyInput) {
        btnQtyMinus.addEventListener('click', () => {
            let val = parseInt(qtyInput.value) || 1;
            if (val > 1) {
                qtyInput.value = val - 1;
                updateConfigPrices();
            }
        });
    }

    if (btnQtyPlus && qtyInput) {
        btnQtyPlus.addEventListener('click', () => {
            let val = parseInt(qtyInput.value) || 1;
            if (val < 99) {
                qtyInput.value = val + 1;
                updateConfigPrices();
            }
        });
    }

    // Add configured item to local storage cart
    if (btnAddToCart) {
        btnAddToCart.addEventListener('click', () => {
            if (!selectedConfigureProduct) return;
            const plan = selectedConfigureProduct.plans[selectedConfigurePlanIndex];
            const qty = parseInt(qtyInput ? qtyInput.value : 1) || 1;

            const existingIdx = cart.findIndex(item => item.productId === selectedConfigureProduct.id && item.planLabel === plan.label);
            if (existingIdx > -1) {
                cart[existingIdx].qty += qty;
            } else {
                cart.push({
                    productId: selectedConfigureProduct.id,
                    name: selectedConfigureProduct.name,
                    planLabel: plan.label,
                    price: plan.price,
                    retail: plan.retail,
                    qty: qty,
                    iconColor: selectedConfigureProduct.iconColor,
                    icon: selectedConfigureProduct.icon
                });
            }

            localStorage.setItem('lightning_deals_cart', JSON.stringify(cart));
            updateCartBadge();

            showToast(`${selectedConfigureProduct.name} (${plan.label}) added to cart!`, 'success');
            closeConfigModal();
        });
    }
}

// --- Update Cart Count Badge in Header ---
function updateCartBadge() {
    const badge = document.getElementById('cart-count-badge');
    if (!badge) return;
    
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    badge.innerText = count;
    
    if (count > 0) {
        badge.classList.add('pulse');
    } else {
        badge.classList.remove('pulse');
    }

    // Sync mobile bottom nav cart badge
    const mobBadge = document.getElementById('mob-cart-badge');
    if (mobBadge) {
        mobBadge.innerText = count;
        mobBadge.style.display = count > 0 ? 'flex' : 'none';
    }
}

// --- FAQ Accordion live search filtering ---
function setupFAQSearch() {
    const faqSearchInput = document.getElementById('faq-search-input');
    if (!faqSearchInput) return;

    faqSearchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-toggle span').innerText.toLowerCase();
            const answer = item.querySelector('.faq-content-inner').innerText.toLowerCase();
            if (!query || question.includes(query) || answer.includes(query)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// --- Screenshot drag-and-drop & Canvas compression ---
let compressedScreenshotBase64 = "";

function setupScreenshotUpload() {
    const fileInput = document.getElementById('checkout-screenshot');
    const dropzone = document.getElementById('screenshot-dropzone');
    const previewContainer = document.getElementById('screenshot-preview-container');
    const previewImg = document.getElementById('screenshot-preview-img');
    const previewName = document.getElementById('screenshot-preview-name');
    const previewSize = document.getElementById('screenshot-preview-size');
    const removeBtn = document.getElementById('btn-remove-screenshot');

    if (!dropzone || !fileInput) return;

    dropzone.addEventListener('click', () => {
        fileInput.click();
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.classList.add('drag-over');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.classList.remove('drag-over');
        }, false);
    });

    dropzone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files && files.length > 0) {
            processScreenshotFile(files[0]);
        }
    }, false);

    fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
            processScreenshotFile(e.target.files[0]);
        }
    });

    if (removeBtn) {
        removeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            clearScreenshot();
        });
    }

    function processScreenshotFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('Only image files are supported (JPG, PNG, WEBP).');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                const max_size = 400;

                if (width > height) {
                    if (width > max_size) {
                        height *= max_size / width;
                        width = max_size;
                    }
                } else {
                    if (height > max_size) {
                        width *= max_size / height;
                        height = max_size;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Compress as JPEG at 0.5 quality to minimize localStorage usage
                compressedScreenshotBase64 = canvas.toDataURL('image/jpeg', 0.5);

                if (previewImg) previewImg.src = compressedScreenshotBase64;
                if (previewName) previewName.innerText = file.name;
                
                const sizeInKb = Math.round((compressedScreenshotBase64.length * 3) / 4 / 1024);
                if (previewSize) previewSize.innerText = `${sizeInKb} KB (Compressed)`;

                if (previewContainer) previewContainer.style.display = 'flex';
                if (dropzone) dropzone.style.display = 'none';
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }

    function clearScreenshot() {
        compressedScreenshotBase64 = "";
        if (fileInput) fileInput.value = "";
        if (previewImg) previewImg.src = "";
        if (previewContainer) previewContainer.style.display = 'none';
        if (dropzone) dropzone.style.display = 'block';
    }
}

// --- Live Indian Recent Purchases simulated loop ---
function startLivePurchaseNotifications() {
    const names = ["Aarav", "Vivaan", "Aditya", "Sai", "Reyansh", "Krishna", "Arjun", "Ananya", "Diya", "Ira", "Kiara", "Prisha", "Rohan", "Vikram", "Neha", "Rahul", "Preeti", "Sanjay", "Karan", "Pooja"];
    const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Pune", "Jaipur", "Lucknow", "Patna", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Vadodara", "Ghaziabad", "Ludhiana"];
    const times = ["just now", "2 mins ago", "5 mins ago", "10 mins ago", "15 mins ago", "20 mins ago", "1 min ago"];

    function showRandomNotification() {
        const activeProducts = safeGetLocalStorage('lightning_deals_products', DEFAULT_PRODUCTS);
        if (activeProducts.length === 0) return;

        const randomProd = activeProducts[Math.floor(Math.random() * activeProducts.length)];
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        const randomTime = times[Math.floor(Math.random() * times.length)];

        const toast = document.createElement('div');
        toast.className = 'live-purchase-toast';
        
        const avatarInitials = randomName.substring(0, 2).toUpperCase();

        toast.innerHTML = `
            <div class="toast-avatar">${avatarInitials}</div>
            <div class="toast-body">
                <div class="toast-text">
                    <strong>${randomName}</strong> from ${randomCity} purchased <strong>${randomProd.name}</strong>
                </div>
                <div class="toast-meta">
                    <span class="toast-dot-glow"></span>
                    <span>Verified Purchase • ${randomTime}</span>
                </div>
            </div>
            <button class="toast-close" aria-label="Close notification">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px;">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <polyline points="6 6 12 12 18 6"></polyline>
                </svg>
            </button>
        `;

        document.body.appendChild(toast);

        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        });

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            if (toast.parentNode) {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 500);
            }
        }, 5000);
    }

    function triggerNext() {
        const delay = Math.floor(Math.random() * 6000) + 12000;
        setTimeout(() => {
            showRandomNotification();
            triggerNext();
        }, delay);
    }
    
    setTimeout(() => {
        showRandomNotification();
        triggerNext();
    }, 5000);
}

// --- Scroll Reveal Animation Observer ---
function setupScrollReveal() {
    const revealSections = document.querySelectorAll('section, .section-header, .glass-card, .trust-card, .comp-card, .testimonial-card, .faq-item, .timeline-item');
    
    if (!('IntersectionObserver' in window)) {
        // Fallback: show all elements immediately
        revealSections.forEach(el => el.classList.add('revealed'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    revealSections.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// --- Mobile Bottom Navigation ---
function setupMobileBottomNav() {
    const bottomNav = document.getElementById('mobile-bottom-nav');
    if (!bottomNav) return;

    const navItems = bottomNav.querySelectorAll('.mob-nav-item[data-section]');
    const cartBtn = document.getElementById('mob-nav-cart-btn');

    // Cart button opens purchase modal
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            const headerCartBtn = document.getElementById('header-cart-btn');
            if (headerCartBtn) headerCartBtn.click();
        });
    }

    // Update active state on scroll
    const sectionIds = ['hero', 'products', 'contact'];
    
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + window.innerHeight / 3;
        let activeId = 'hero';

        sectionIds.forEach(id => {
            const section = document.getElementById(id);
            if (section && scrollPos >= section.offsetTop) {
                activeId = id;
            }
        });

        navItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('data-section') === activeId);
        });
    });

    // Smooth scroll for nav links
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = item.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Initialize icons
    if (window.lucide) window.lucide.createIcons();
}

// --- Search Suggestions & Highlighting Dropdown ---
function initSearchSuggestions() {
    const searchInput = document.getElementById('store-search-input');
    const suggestionsDropdown = document.getElementById('search-suggestions');
    if (!searchInput || !suggestionsDropdown) return;

    searchInput.addEventListener('input', () => {
        const value = searchInput.value.trim().toLowerCase();
        if (!value) {
            suggestionsDropdown.innerHTML = '';
            suggestionsDropdown.classList.remove('show');
            return;
        }

        // Refresh products list from local storage
        const activeProducts = (safeGetLocalStorage('lightning_deals_products', DEFAULT_PRODUCTS)).filter(p => p.visible !== false);
        const matches = activeProducts.filter(p => 
            p.name.toLowerCase().includes(value) || 
            (p.description && p.description.toLowerCase().includes(value))
        );

        if (matches.length === 0) {
            suggestionsDropdown.innerHTML = `
                <div style="padding: 0.8rem 1.2rem; color: var(--text-muted); font-size: 0.85rem; text-align: center;">
                    No matching deals found
                </div>
            `;
            suggestionsDropdown.classList.add('show');
            return;
        }

        suggestionsDropdown.innerHTML = '';
        matches.slice(0, 5).forEach(prod => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.innerHTML = `
                <div class="suggestion-icon-circle ${prod.iconColor || 'grad-blue'}">${prod.icon || 'P'}</div>
                <div class="suggestion-details">
                    <span class="suggestion-name">${prod.name}</span>
                    <span class="suggestion-category">${getCategoryDisplayName(prod.category)}</span>
                </div>
            `;
            item.addEventListener('click', () => {
                searchInput.value = prod.name;
                searchQuery = prod.name;
                applyStoreFilters();
                suggestionsDropdown.classList.remove('show');
                
                // Highlight and scroll to the product
                const card = document.getElementById(`prod-card-${prod.id}`);
                if (card) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    card.classList.add('glow-pulse');
                    setTimeout(() => card.classList.remove('glow-pulse'), 2000);
                }
            });
            suggestionsDropdown.appendChild(item);
        });
        suggestionsDropdown.classList.add('show');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !suggestionsDropdown.contains(e.target)) {
            suggestionsDropdown.classList.remove('show');
        }
    });

    // Show suggestions on focus if not empty
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim()) {
            suggestionsDropdown.classList.add('show');
        }
    });
}

function getCategoryDisplayName(category) {
    const map = {
        'design': 'Design & Creative',
        'ai': 'AI Tools',
        'business': 'Business & Professional',
        'finance': 'Finance & Trading',
        'productivity': 'Productivity & Office',
        'streaming': 'Streaming Services',
        'education': 'Education & Others',
        'dev': 'Developer Tools'
    };
    return map[category] || (category ? category.toUpperCase() : '');
}

// --- Toast Notification System ---
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-msg ${type}`;

    const iconName = type === 'success' ? 'check-circle' : 'alert-circle';
    toast.innerHTML = `
        <i data-lucide="${iconName}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    // Trigger animate in
    setTimeout(() => {
        toast.classList.add('show');
    }, 50);

    // Auto-remove after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 4000);
}

// --- Wishlist Management System ---
function setupWishlistModal() {
    const modal = document.getElementById('wishlist-modal');
    const openBtns = [
        document.getElementById('header-wishlist-btn'),
        document.getElementById('mob-nav-wishlist-btn')
    ];
    const closeBtns = [
        document.getElementById('close-wishlist-modal-btn'),
        document.getElementById('btn-close-wishlist')
    ];

    if (!modal) return;

    openBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
                document.body.classList.add('modal-open');
                renderWishlistItems();
            });
        }
    });

    closeBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.remove('active');
                document.body.classList.remove('modal-open');
            });
        }
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });
}

function updateWishlistUI() {
    const wishlist = safeGetLocalStorage('lightning_deals_wishlist', []);
    const count = wishlist.length;

    const countBadge = document.getElementById('wishlist-count-badge');
    const mobBadge = document.getElementById('mob-wishlist-badge');

    if (countBadge) {
        if (count > 0) {
            countBadge.innerText = count;
            countBadge.style.display = 'flex';
        } else {
            countBadge.style.display = 'none';
        }
    }

    if (mobBadge) {
        if (count > 0) {
            mobBadge.innerText = count;
            mobBadge.style.display = 'flex';
        } else {
            mobBadge.style.display = 'none';
        }
    }

    // Toggle active state on all wishlist buttons matching the page products
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        const id = btn.getAttribute('data-id');
        if (wishlist.includes(id)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function renderWishlistItems() {
    const list = document.getElementById('wishlist-items-list');
    if (!list) return;

    const wishlist = safeGetLocalStorage('lightning_deals_wishlist', []);
    if (wishlist.length === 0) {
        list.innerHTML = `
            <div class="text-center" style="padding: 2.5rem 0; opacity: 0.7;">
                <i data-lucide="heart" style="width: 36px; height: 36px; margin-bottom: 0.5rem; display: block; margin-left: auto; margin-right: auto; color: var(--text-muted);"></i>
                <p style="font-size: 0.9rem; color: var(--text-muted);">Your wishlist is empty</p>
            </div>
        `;
        if (window.lucide) window.lucide.createIcons();
        return;
    }

    list.innerHTML = '';
    const activeProducts = safeGetLocalStorage('lightning_deals_products', DEFAULT_PRODUCTS);

    wishlist.forEach((id) => {
        const prod = activeProducts.find(p => p.id === id);
        if (!prod) return;

        const itemRow = document.createElement('div');
        itemRow.className = 'cart-item-row';

        // Find min price for the product to display
        let minPrice = 0;
        if (prod.plans && prod.plans.length > 0) {
            minPrice = Math.min(...prod.plans.map(pl => parseFloat(pl.price) || 0));
        }

        itemRow.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-logo ${prod.iconColor || 'grad-blue'}">${prod.icon || 'P'}</div>
                <div class="cart-item-details">
                    <span class="cart-item-title">${prod.name}</span>
                    <span class="cart-item-plan">Starting from ₹${minPrice.toLocaleString('en-IN')}</span>
                </div>
            </div>
            <div class="cart-item-actions">
                <button type="button" class="btn btn-primary btn-wishlist-add-cart" data-id="${prod.id}" style="padding: 0.4rem 0.8rem; font-size: 0.75rem; border-radius: 6px;">
                    <i data-lucide="shopping-cart" style="width: 12px; height: 12px; margin-right: 4px;"></i> Buy
                </button>
                <button type="button" class="btn-wishlist-remove" data-id="${prod.id}" title="Remove from wishlist" style="background: none; border: none; color: var(--clr-red); cursor: pointer; padding: 4px; display: flex; align-items: center; justify-content: center;">
                    <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
                </button>
            </div>
        `;

        list.appendChild(itemRow);
    });

    if (window.lucide) window.lucide.createIcons();

    // Event listeners
    list.querySelectorAll('.btn-wishlist-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            let wishlist = safeGetLocalStorage('lightning_deals_wishlist', []);
            const idx = wishlist.indexOf(id);
            if (idx !== -1) {
                wishlist.splice(idx, 1);
                localStorage.setItem('lightning_deals_wishlist', JSON.stringify(wishlist));
                updateWishlistUI();
                renderWishlistItems();
            }
        });
    });

    list.querySelectorAll('.btn-wishlist-add-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            const modal = document.getElementById('wishlist-modal');
            if (modal) modal.classList.remove('active');

            const cardTrigger = document.querySelector(`.cta-purchase-trigger[data-id="${id}"]`);
            if (cardTrigger) {
                cardTrigger.click();
            }
        });
    });
}

// Global click event to intercept wishlist-btn clicks anywhere
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.wishlist-btn');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    const id = btn.getAttribute('data-id');
    if (!id) return;

    let wishlist = safeGetLocalStorage('lightning_deals_wishlist', []);
    const idx = wishlist.indexOf(id);

    const activeProducts = safeGetLocalStorage('lightning_deals_products', DEFAULT_PRODUCTS);
    const prod = activeProducts.find(p => p.id === id);
    const prodName = prod ? prod.name : 'Product';

    if (idx === -1) {
        wishlist.push(id);
        btn.classList.add('active');
        showToast(`${prodName} added to wishlist!`, 'success');
    } else {
        wishlist.splice(idx, 1);
        btn.classList.remove('active');
        showToast(`${prodName} removed from wishlist.`, 'success');
    }

    try {
        localStorage.setItem('lightning_deals_wishlist', JSON.stringify(wishlist));
    } catch (err) {
        showToast('Storage quota exceeded. Could not update wishlist.', 'error');
    }

    updateWishlistUI();
    renderWishlistItems();
});

// --- Recently Viewed Deals ---
function trackRecentlyViewed(productId) {
    let recentlyViewed = safeGetLocalStorage('lightning_deals_recently_viewed', []);
    recentlyViewed = recentlyViewed.filter(id => id !== productId);
    recentlyViewed.unshift(productId);
    recentlyViewed = recentlyViewed.slice(0, 4);

    try {
        localStorage.setItem('lightning_deals_recently_viewed', JSON.stringify(recentlyViewed));
    } catch (err) {
        // Ignored
    }
    renderRecentlyViewed();
}

function renderRecentlyViewed() {
    const section = document.getElementById('recently-viewed-section');
    const grid = document.getElementById('recently-viewed-grid');
    if (!grid || !section) return;

    const recentlyViewed = safeGetLocalStorage('lightning_deals_recently_viewed', []);
    if (recentlyViewed.length === 0) {
        section.style.display = 'none';
        return;
    }

    section.style.display = 'block';
    grid.innerHTML = '';

    const activeProducts = safeGetLocalStorage('lightning_deals_products', DEFAULT_PRODUCTS);

    recentlyViewed.forEach(id => {
        const prod = activeProducts.find(p => p.id === id && p.visible !== false);
        if (!prod) return;

        const card = document.createElement('div');
        card.className = 'product-card glass-card';
        card.id = `recent-prod-card-${prod.id}`;

        let minPrice = 0;
        if (prod.plans && prod.plans.length > 0) {
            minPrice = Math.min(...prod.plans.map(pl => parseFloat(pl.price) || 0));
        }

        let badgeHTML = '';
        if (prod.badge) {
            badgeHTML = `<span class="prod-badge">${prod.badge}</span>`;
        }

        let stockHTML = '';
        if (prod.stockStatus) {
            let dotClass = 'available';
            let label = 'Available';
            const status = prod.stockStatus.toLowerCase();
            if (status === 'available') { dotClass = 'available'; label = 'Available'; }
            else if (status === 'limited') { dotClass = 'limited'; label = 'Limited Slots'; }
            else if (status === 'outofstock') { dotClass = 'outofstock'; label = 'Out of Stock'; }
            else if (status === 'instant') { dotClass = 'instant'; label = 'Instant Activation'; }

            stockHTML = `
                <div class="stock-status-wrapper">
                    <span class="stock-dot ${dotClass}"></span>
                    <span class="stock-label">${label}</span>
                </div>
            `;
        } else {
            stockHTML = `
                <div class="stock-status-wrapper">
                    <span class="stock-dot available"></span>
                    <span class="stock-label">Available</span>
                </div>
            `;
        }

        const wishlist = safeGetLocalStorage('lightning_deals_wishlist', []);
        const isWishlisted = wishlist.includes(prod.id);

        card.innerHTML = `
            <div class="prod-header">
                <div class="prod-badge-logo ${prod.iconColor || 'grad-blue'}">${prod.icon || 'P'}</div>
                ${badgeHTML}
            </div>
            <h3 class="prod-title">${prod.name}</h3>
            ${stockHTML}
            <p class="prod-desc" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; height: 2.8rem;">${prod.description}</p>
            
            <div class="prod-price-area" style="margin-top: auto;">
                <span class="prod-retail">Starting from</span>
                <div class="prod-offer">
                    <span class="prod-price-new">₹${minPrice.toLocaleString('en-IN')}</span>
                    <span class="prod-price-suffix">/ plan</span>
                </div>
            </div>
            
            <div class="card-actions-wrapper" style="display: flex; gap: 0.5rem; width: 100%; margin-top: 1rem;">
                <button class="btn btn-primary cta-purchase-trigger" data-id="${prod.id}" style="flex-grow: 1;">
                    <span>Add to Cart</span>
                    <i data-lucide="arrow-right"></i>
                </button>
                <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" data-id="${prod.id}" aria-label="Toggle Wishlist" type="button">
                    <i data-lucide="heart"></i>
                </button>
            </div>
        `;
        grid.appendChild(card);
    });

    if (window.lucide) window.lucide.createIcons();
}

function getWarrantyStatus(order) {
    if (order.status === 'Cancelled') {
        return 'N/A';
    }
    if (order.status !== 'Delivered' && order.status !== 'Paid via Stripe') {
        return 'Pending Activation';
    }
    
    let actDateStr = order.activationDate;
    if (!actDateStr) {
        if (order.date) {
            const parts = order.date.split(',');
            actDateStr = parts[0].trim();
        } else {
            actDateStr = new Date().toLocaleDateString('en-IN');
        }
    }
    
    let actDate;
    if (actDateStr.includes('/')) {
        const parts = actDateStr.split('/');
        if (parts[2] && parts[2].length === 4) {
            actDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
        } else {
            actDate = new Date(actDateStr);
        }
    } else {
        actDate = new Date(actDateStr);
    }
    
    if (isNaN(actDate.getTime())) {
        actDate = new Date();
    }
    
    let termMonths = order.warrantyTerm;
    if (termMonths === undefined || termMonths === null) {
        const plan = (order.plan || '').toLowerCase();
        if (plan.includes('lifetime')) termMonths = 9999;
        else if (plan.includes('12 month') || plan.includes('1 year') || plan.includes('annual')) termMonths = 12;
        else if (plan.includes('6 month')) termMonths = 6;
        else if (plan.includes('3 month')) termMonths = 3;
        else if (plan.includes('2 month')) termMonths = 2;
        else termMonths = 1;
    }
    
    if (termMonths === 9999 || String(termMonths).toLowerCase() === 'lifetime') {
        return 'Active';
    }
    
    const expiryDate = new Date(actDate.getTime());
    expiryDate.setMonth(expiryDate.getMonth() + parseInt(termMonths));
    
    const today = new Date();
    today.setHours(0,0,0,0);
    expiryDate.setHours(0,0,0,0);
    
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
        return 'Expired';
    } else if (diffDays <= 7) {
        return 'Expiring Soon';
    } else {
        return 'Active';
    }
}

function getOrderDisplayStatus(order) {
    if (order.status === 'Cancelled') {
        return 'Cancelled';
    }
    if (order.status === 'Pending' || order.status === 'Pending Stripe Payment') {
        return 'Pending';
    }
    const warranty = getWarrantyStatus(order);
    if (warranty === 'Expired') {
        return 'Expired';
    }
    return 'Active';
}

// --- Client Orders Sync & Search Utilities ---
function syncClientOrders(searchVal, callback) {
    if (!database) {
        if (callback) callback(false, "Firebase database is not configured. Please contact the administrator.");
        return;
    }
    const cleanSearch = searchVal.trim();
    if (!cleanSearch) {
        if (callback) callback(false, "Input value cannot be empty.");
        return;
    }

    const dbRef = database.ref('orders');
    const mergeOrders = (newOrders) => {
        if (!newOrders || newOrders.length === 0) return 0;
        let localOrders = safeGetLocalStorage('lightning_deals_orders', []);
        let count = 0;
        newOrders.forEach(no => {
            if (no && no.id) {
                const index = localOrders.findIndex(lo => lo.id === no.id);
                if (index !== -1) {
                    localOrders[index] = { ...localOrders[index], ...no };
                } else {
                    localOrders.unshift(no);
                    count++;
                }
            }
        });
        localStorage.setItem('lightning_deals_orders', JSON.stringify(localOrders));
        renderWorkspace();
        return count;
    };

    if (cleanSearch.startsWith('LD-')) {
        dbRef.child(cleanSearch).once('value')
            .then(snapshot => {
                const order = snapshot.val();
                if (order) {
                    mergeOrders([order]);
                    if (callback) callback(true, `Successfully synced order ID ${order.id}.`);
                } else {
                    if (callback) callback(false, "No order found with that ID.");
                }
            })
            .catch(err => {
                console.error("Order ID lookup error:", err);
                if (callback) callback(false, "Error: " + err.message);
            });
    } else if (cleanSearch.includes('@')) {
        dbRef.orderByChild('email').equalTo(cleanSearch).once('value')
            .then(snapshot => {
                const data = snapshot.val();
                if (data) {
                    const list = Object.values(data);
                    mergeOrders(list);
                    if (callback) callback(true, `Successfully synced ${list.length} order(s).`);
                } else {
                    if (callback) callback(false, "No orders found for this email address.");
                }
            })
            .catch(err => {
                console.error("Email lookup error:", err);
                if (callback) callback(false, "Error: " + err.message);
            });
    } else {
        const cleanPhone = cleanSearch.replace(/[\s\-\+\(\)]/g, '');
        let phoneVariations = [cleanPhone];
        if (cleanPhone.length === 10) {
            phoneVariations.push('91' + cleanPhone);
        } else if (cleanPhone.length === 12 && cleanPhone.startsWith('91')) {
            phoneVariations.push(cleanPhone.substring(2));
        }

        let promises = phoneVariations.map(ph => dbRef.orderByChild('phone').equalTo(ph).once('value'));
        Promise.all(promises)
            .then(results => {
                let allSynced = [];
                results.forEach(snapshot => {
                    const val = snapshot.val();
                    if (val) {
                        allSynced = allSynced.concat(Object.values(val));
                    }
                });
                if (allSynced.length > 0) {
                    const unique = {};
                    allSynced.forEach(o => { unique[o.id] = o; });
                    const uniqueList = Object.values(unique);
                    mergeOrders(uniqueList);
                    if (callback) callback(true, `Successfully synced ${uniqueList.length} order(s).`);
                } else {
                    if (callback) callback(false, "No orders found matching this WhatsApp/phone number.");
                }
            })
            .catch(err => {
                console.error("Phone lookup error:", err);
                if (callback) callback(false, "Error: " + err.message);
            });
    }
}

let activeListeners = new Set();
function listenToCustomerOrders() {
    if (!database) return;
    const localOrders = safeGetLocalStorage('lightning_deals_orders', []);
    localOrders.forEach(o => {
        if (o && o.id && o.id.startsWith('LD-') && !activeListeners.has(o.id)) {
            activeListeners.add(o.id);
            database.ref('orders/' + o.id).on('value', (snapshot) => {
                const orderData = snapshot.val();
                if (orderData) {
                    let currentLocal = safeGetLocalStorage('lightning_deals_orders', []);
                    const idx = currentLocal.findIndex(lo => lo.id === o.id);
                    if (idx !== -1) {
                        if (JSON.stringify(currentLocal[idx]) !== JSON.stringify(orderData)) {
                            currentLocal[idx] = orderData;
                            localStorage.setItem('lightning_deals_orders', JSON.stringify(currentLocal));
                            renderWorkspace();
                        }
                    }
                }
            });
        }
    });
}

function setupDashboardMock() {
    // Navigation / Sidebar tabs
    const sidebarBtns = document.querySelectorAll('.dash-sidebar-btn');
    const mockPanels = document.querySelectorAll('.dash-mock-panel');

    // Setup order sync UI controls
    const syncForm = document.getElementById('order-sync-search-form');
    const syncInput = document.getElementById('order-sync-search-input');
    const syncBtn = document.getElementById('btn-order-sync-submit');
    const syncMsg = document.getElementById('order-sync-status-msg');

    if (syncForm && syncInput && syncMsg) {
        syncForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchVal = syncInput.value.trim();
            if (!searchVal) return;

            if (syncBtn) syncBtn.disabled = true;
            syncMsg.style.display = 'block';
            syncMsg.style.background = 'rgba(255, 255, 255, 0.03)';
            syncMsg.style.color = 'var(--text-secondary)';
            syncMsg.style.border = '1px solid rgba(255, 255, 255, 0.08)';
            syncMsg.innerText = "🔍 Connecting and syncing stacks...";

            syncClientOrders(searchVal, (success, msg) => {
                if (syncBtn) syncBtn.disabled = false;
                if (success) {
                    syncMsg.style.background = 'rgba(0, 242, 254, 0.05)';
                    syncMsg.style.color = 'var(--clr-cyan)';
                    syncMsg.style.border = '1px solid rgba(0, 242, 254, 0.15)';
                    syncMsg.innerText = `✅ ${msg}`;
                } else {
                    syncMsg.style.background = 'rgba(255, 75, 75, 0.05)';
                    syncMsg.style.color = '#ff4b4b';
                    syncMsg.style.border = '1px solid rgba(255, 75, 75, 0.15)';
                    syncMsg.innerText = `❌ ${msg}`;
                }
            });
        });
    }

    // Call order listener
    listenToCustomerOrders();

    sidebarBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const panelId = btn.getAttribute('data-dash-panel');
            if (!panelId) return;

            sidebarBtns.forEach(b => b.classList.toggle('active', b === btn));
            mockPanels.forEach(p => p.classList.toggle('active', p.id === panelId));
            
            if (window.lucide) window.lucide.createIcons();
        });
    });

    // Add smooth scroll for navbar workspace triggers
    const workspaceTriggers = document.querySelectorAll('.workspace-trigger');
    workspaceTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById('roadmap-dashboard');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Make sure the active nav link updates
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                trigger.classList.add('active');
            }
        });
    });

    // Custom overlay credentials modal logic
    const credModal = document.getElementById('credentials-modal');
    const closeCredBtn = document.getElementById('close-credentials-modal-btn');
    const btnCloseCred = document.getElementById('btn-close-credentials');
    const btnCopyCred = document.getElementById('btn-copy-credentials');
    const textCredContent = document.getElementById('credentials-text-content');

    function closeCredentialsModal() {
        if (credModal) credModal.classList.remove('active');
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
    }

    if (closeCredBtn) closeCredBtn.addEventListener('click', closeCredentialsModal);
    if (btnCloseCred) btnCloseCred.addEventListener('click', closeCredentialsModal);
    if (btnCopyCred && textCredContent) {
        btnCopyCred.addEventListener('click', () => {
            navigator.clipboard.writeText(textCredContent.value).then(() => {
                const origText = btnCopyCred.innerHTML;
                btnCopyCred.innerHTML = `<i data-lucide="check" style="width: 14px; height: 14px;"></i><span>Copied!</span>`;
                btnCopyCred.style.animation = 'copyFlash 0.6s ease';
                btnCopyCred.style.borderColor = 'rgba(34, 197, 94, 0.4)';
                if (window.lucide) window.lucide.createIcons();
                setTimeout(() => {
                    btnCopyCred.innerHTML = origText;
                    btnCopyCred.style.animation = '';
                    btnCopyCred.style.borderColor = '';
                    if (window.lucide) window.lucide.createIcons();
                }, 2000);
            });
        });
    }

    // Receipt lightbox logic
    const receiptLightbox = document.getElementById('client-receipt-lightbox');
    const closeReceiptBtn = document.getElementById('close-receipt-lightbox-btn');
    const receiptImg = document.getElementById('receipt-lightbox-img');
    const receiptDetails = document.getElementById('receipt-lightbox-details');

    function closeReceiptLightbox() {
        if (receiptLightbox) receiptLightbox.classList.remove('active');
    }
    if (closeReceiptBtn) closeReceiptBtn.addEventListener('click', closeReceiptLightbox);
    if (receiptLightbox) {
        receiptLightbox.addEventListener('click', (e) => {
            if (e.target === receiptLightbox) closeReceiptLightbox();
        });
    }

    // Main workspace renderer
    function renderWorkspace() {
        const orders = safeGetLocalStorage('lightning_deals_orders', []);
        const licensesPanel = document.getElementById('dash-panel-licenses');
        const invoicesPanel = document.getElementById('dash-panel-invoices');

        // Check if user has zero orders.
        const isPreviewMode = orders.length === 0;

        // Seed default items if in preview mode
        let displayOrders = orders;
        if (isPreviewMode) {
            displayOrders = [
                {
                    id: "LD-MOCK-1",
                    product: "ChatGPT Plus (1x)",
                    plan: "12 Months",
                    price: 4999,
                    retail: 22999,
                    name: "John Doe",
                    email: "john@example.com",
                    phone: "919999999999",
                    utr: "123456789012",
                    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleString('en-IN'),
                    status: "Delivered",
                    activationDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    warrantyTerm: 12,
                    notes: "Account Email: chatgpt-deals@lightning.com\nPassword: PremiumFounderPass1!\nActivation link: https://chatgpt.com\n\nEnjoy your 12-month access!"
                },
                {
                    id: "LD-MOCK-2",
                    product: "Cursor Pro (1x)",
                    plan: "6 Months",
                    price: 2999,
                    retail: 11999,
                    name: "John Doe",
                    email: "john@example.com",
                    phone: "919999999999",
                    utr: "234567890123",
                    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleString('en-IN'),
                    status: "Delivered",
                    activationDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    warrantyTerm: 6,
                    notes: "Use invite code: cursor-lightning-deal-key-xyz999\nRedeem on: https://cursor.sh/settings\nWarranty validity: 6 Months."
                },
                {
                    id: "LD-MOCK-3",
                    product: "Adobe Creative Cloud (1x)",
                    plan: "1 Month",
                    price: 1148,
                    retail: 4999,
                    name: "John Doe",
                    email: "john@example.com",
                    phone: "919999999999",
                    utr: "345678901234",
                    date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toLocaleString('en-IN'),
                    status: "Delivered",
                    activationDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    warrantyTerm: 1,
                    notes: "Your Adobe invite has been sent to john@example.com. Please accept it within 48 hours to activate access."
                }
            ];
        }

        // Calculate statistics
        let activeCount = 0;
        let totalSaved = 0;
        let nextRenewalDate = null;

        displayOrders.forEach(o => {
            const displayStatus = getOrderDisplayStatus(o);

            if (displayStatus === 'Active') {
                activeCount++;
                
                // Savings calculation: sum up difference between retail and deal price.
                let itemRetail = o.retail || 0;
                if (!itemRetail && o.items) {
                    o.items.forEach(item => {
                        itemRetail += (item.retail || (item.price * 3)) * (item.qty || 1);
                    });
                }
                if (!itemRetail) itemRetail = o.price * 3;
                totalSaved += Math.max(0, itemRetail - o.price);

                // Renewal date calculation
                let actDateStr = o.activationDate;
                if (!actDateStr && o.date) {
                    actDateStr = o.date.split(',')[0].trim();
                }
                
                let actDate;
                if (actDateStr) {
                    if (actDateStr.includes('/')) {
                        const parts = actDateStr.split('/');
                        if (parts[2] && parts[2].length === 4) {
                            actDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
                        } else {
                            actDate = new Date(actDateStr);
                        }
                    } else {
                        actDate = new Date(actDateStr);
                    }
                }
                
                let termMonths = o.warrantyTerm;
                if (termMonths === undefined || termMonths === null) {
                    const plan = (o.plan || '').toLowerCase();
                    if (plan.includes('lifetime')) termMonths = 9999;
                    else if (plan.includes('12 month') || plan.includes('1 year') || plan.includes('annual')) termMonths = 12;
                    else if (plan.includes('6 month')) termMonths = 6;
                    else if (plan.includes('3 month')) termMonths = 3;
                    else if (plan.includes('2 month')) termMonths = 2;
                    else termMonths = 1;
                }

                if (termMonths !== 9999 && termMonths !== 'lifetime' && actDate && !isNaN(actDate.getTime())) {
                    const exp = new Date(actDate.getTime());
                    exp.setMonth(exp.getMonth() + parseInt(termMonths));
                    if (!nextRenewalDate || exp < nextRenewalDate) {
                        nextRenewalDate = exp;
                    }
                }
            }
        });

        const nextRenewalStr = nextRenewalDate 
            ? nextRenewalDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
            : "Lifetime / N/A";

        // Render Licenses Tab
        if (licensesPanel) {
            let bannerHTML = "";
            if (isPreviewMode) {
                bannerHTML = `
                    <div class="success-info-alert" style="margin-bottom: 1.5rem; background: rgba(0, 242, 254, 0.05); border-color: rgba(0, 242, 254, 0.15);">
                        <i data-lucide="info" class="info-alert-icon" style="color: var(--clr-cyan);"></i>
                        <div class="info-alert-text" style="color: var(--text-secondary); font-size: 0.8rem;">
                            <strong>Workspace Preview Mode:</strong> You haven't made any purchases yet. Below is a preview demonstration of your workspace once a subscription stack is activated.
                        </div>
                    </div>
                `;
            }

            let rowsHTML = "";
            displayOrders.forEach((o, index) => {
                const displayStatus = getOrderDisplayStatus(o);
                
                let statusBadgeClass = "cancelled";
                if (displayStatus === 'Active') statusBadgeClass = "active";
                if (displayStatus === 'Pending') statusBadgeClass = "pending";
                
                let actionBtnHTML = "";
                if (displayStatus === 'Active') {
                    actionBtnHTML = `<button class="btn btn-secondary btn-sm btn-view-credentials" data-index="${index}" style="padding: 0.25rem 0.5rem; font-size: 0.7rem; border-radius: 6px;">Show Credentials</button>`;
                } else if (displayStatus === 'Pending') {
                    const waText = encodeURIComponent(`Hi, checking status of my order ID: ${o.id}. UTR: ${o.utr}. Please activate.`);
                    actionBtnHTML = `<a href="https://wa.me/917695956938?text=${waText}" target="_blank" class="btn btn-primary btn-sm" style="padding: 0.25rem 0.5rem; font-size: 0.7rem; color: white; display: inline-flex; align-items: center; gap: 4px; border-radius: 6px;"><i data-lucide="message-circle" style="width: 10px; height: 10px;"></i> Activate WhatsApp</a>`;
                } else {
                    actionBtnHTML = `<a href="#products" class="btn btn-primary btn-sm" style="padding: 0.25rem 0.5rem; font-size: 0.7rem; color: white; border-radius: 6px;">Renew Deal</a>`;
                }

                // Expiry / Renew Date
                let renewDateVal = "Lifetime";
                let termMonths = o.warrantyTerm;
                if (termMonths === undefined || termMonths === null) {
                    const plan = (o.plan || '').toLowerCase();
                    if (plan.includes('lifetime')) termMonths = 9999;
                    else if (plan.includes('12 month') || plan.includes('1 year') || plan.includes('annual')) termMonths = 12;
                    else if (plan.includes('6 month')) termMonths = 6;
                    else if (plan.includes('3 month')) termMonths = 3;
                    else if (plan.includes('2 month')) termMonths = 2;
                    else termMonths = 1;
                }

                if (termMonths !== 9999 && termMonths !== 'lifetime') {
                    let actDateStr = o.activationDate;
                    if (!actDateStr && o.date) {
                        actDateStr = o.date.split(',')[0].trim();
                    }
                    let actDate;
                    if (actDateStr) {
                        if (actDateStr.includes('/')) {
                            const parts = actDateStr.split('/');
                            if (parts[2] && parts[2].length === 4) {
                                actDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
                            } else {
                                actDate = new Date(actDateStr);
                            }
                        } else {
                            actDate = new Date(actDateStr);
                        }
                    }
                    if (actDate && !isNaN(actDate.getTime())) {
                        const exp = new Date(actDate.getTime());
                        exp.setMonth(exp.getMonth() + parseInt(termMonths));
                        renewDateVal = exp.toLocaleDateString('en-IN');
                    } else {
                        renewDateVal = "N/A";
                    }
                }

                const validityLabel = termMonths === 9999 ? "Lifetime" : `${termMonths} Month${termMonths > 1 ? 's' : ''}`;

                rowsHTML += `
                    <tr>
                        <td data-label="Tool Stack" style="font-weight: 600;">${escapeHTML(o.product)}</td>
                        <td data-label="Validity">${validityLabel}</td>
                        <td data-label="Renew Date">${renewDateVal}</td>
                        <td data-label="Status"><span class="dash-badge-status ${statusBadgeClass}">${displayStatus}</span></td>
                        <td data-label="Action">${actionBtnHTML}</td>
                    </tr>
                `;
            });

            licensesPanel.innerHTML = `
                <h3 class="dash-panel-title">Active Stack Subscriptions</h3>
                <p class="dash-panel-subtitle">Manage credentials and monitor renewal dates for your active workspace tools.</p>
                
                ${bannerHTML}

                <div class="dash-grid-stats">
                    <div class="dash-stat-box">
                        <span class="dash-stat-label">Active Stacks</span>
                        <span class="dash-stat-value">${activeCount} Stack${activeCount !== 1 ? 's' : ''}</span>
                    </div>
                    <div class="dash-stat-box">
                        <span class="dash-stat-label">Next Renewal</span>
                        <span class="dash-stat-value" style="color: var(--clr-cyan);">${nextRenewalStr}</span>
                    </div>
                    <div class="dash-stat-box">
                        <span class="dash-stat-label">Total Saved</span>
                        <span class="dash-stat-value" style="color: var(--clr-green);">₹${totalSaved.toLocaleString('en-IN')}</span>
                    </div>
                </div>

                <div style="overflow-x: auto;">
                    <table class="dash-table">
                        <thead>
                            <tr>
                                <th>Tool Stack</th>
                                <th>Validity</th>
                                <th>Renew Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rowsHTML}
                        </tbody>
                    </table>
                </div>
            `;

            // Attach listeners to "Show Credentials" buttons
            licensesPanel.querySelectorAll('.btn-view-credentials').forEach(btn => {
                btn.addEventListener('click', () => {
                    const idx = parseInt(btn.getAttribute('data-index'));
                    const targetOrder = displayOrders[idx];
                    if (targetOrder && textCredContent) {
                        textCredContent.value = targetOrder.notes || "Credentials are being provisioned. Please check back shortly.";
                        if (credModal) {
                            credModal.classList.add('active');
                            document.body.classList.add('modal-open');
                        }
                    }
                });
            });
        }

        // Render Invoices Tab
        if (invoicesPanel) {
            let bannerHTML = "";
            if (isPreviewMode) {
                bannerHTML = `
                    <div class="success-info-alert" style="margin-bottom: 1.5rem; background: rgba(0, 242, 254, 0.05); border-color: rgba(0, 242, 254, 0.15);">
                        <i data-lucide="info" class="info-alert-icon" style="color: var(--clr-cyan);"></i>
                        <div class="info-alert-text" style="color: var(--text-secondary); font-size: 0.8rem;">
                            <strong>Workspace Preview Mode:</strong> Showing invoice demonstrations below. Your actual purchase receipts will appear here after checkout.
                        </div>
                    </div>
                `;
            }

            let rowsHTML = "";
            displayOrders.forEach((o, index) => {
                const dateStr = o.date ? o.date.split(',')[0].trim() : "N/A";
                
                let screenshotActionHTML = "";
                if (isPreviewMode) {
                    screenshotActionHTML = `<button class="btn btn-secondary btn-sm" style="padding: 0.25rem 0.5rem; font-size: 0.7rem; border-radius: 6px;" onclick="alert('Demo invoice screenshot: Simulated receipt loading.')"><i data-lucide="eye" style="width: 10px; height: 10px; display: inline; margin-right: 4px; vertical-align: middle;"></i> View Receipt</button>`;
                } else {
                    if (o.screenshot && o.screenshot !== 'removed:manually_cleared' && !o.screenshot.startsWith('error:')) {
                        screenshotActionHTML = `<button class="btn btn-secondary btn-sm btn-view-receipt" data-index="${index}" style="padding: 0.25rem 0.5rem; font-size: 0.7rem; border-radius: 6px;"><i data-lucide="eye" style="width: 10px; height: 10px; display: inline; margin-right: 4px; vertical-align: middle;"></i> View Receipt</button>`;
                    } else {
                        screenshotActionHTML = `<span style="color: var(--text-muted); font-size: 0.7rem; font-style: italic;">No attachment</span>`;
                    }
                }

                rowsHTML += `
                    <tr>
                        <td data-label="Invoice ID" style="font-family: monospace;">${escapeHTML(o.id)}</td>
                        <td data-label="Date">${escapeHTML(dateStr)}</td>
                        <td data-label="Description">${escapeHTML(o.product)}</td>
                        <td data-label="Amount" style="color: var(--clr-green); font-weight: 600;">₹${o.price.toLocaleString('en-IN')}</td>
                        <td data-label="Action">${screenshotActionHTML}</td>
                    </tr>
                `;
            });

            invoicesPanel.innerHTML = `
                <h3 class="dash-panel-title">Invoices & Billing Statements</h3>
                <p class="dash-panel-subtitle">Review official receipts and tax statements for your account accounting records.</p>
                
                ${bannerHTML}

                <div style="overflow-x: auto;">
                    <table class="dash-table">
                        <thead>
                            <tr>
                                <th>Invoice ID</th>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rowsHTML}
                        </tbody>
                    </table>
                </div>
            `;

            // Attach listeners to "View Receipt" buttons
            invoicesPanel.querySelectorAll('.btn-view-receipt').forEach(btn => {
                btn.addEventListener('click', () => {
                    const idx = parseInt(btn.getAttribute('data-index'));
                    const targetOrder = displayOrders[idx];
                    if (targetOrder && targetOrder.screenshot && receiptImg && receiptLightbox) {
                        receiptImg.src = targetOrder.screenshot;
                        if (receiptDetails) {
                            receiptDetails.innerHTML = `Order: ${targetOrder.id} | Paid: ₹${targetOrder.price.toLocaleString('en-IN')} | Date: ${targetOrder.date}`;
                        }
                        receiptLightbox.classList.add('active');
                    }
                });
            });
        }

        if (window.lucide) window.lucide.createIcons();
    }

    // Connect real-time synchronization from admin changes.
    window.addEventListener('storage', (e) => {
        if (e.key === 'lightning_deals_orders') {
            renderWorkspace();
        }
    });

    // Run first render
    renderWorkspace();

    // Export renderer to window so it can be called externally
    window.refreshWorkspace = renderWorkspace;
}
