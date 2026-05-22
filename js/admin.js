/* ==========================================================================
   LIGHTNING DEALS - ADMIN CONSOLE CONTROLLER
   ========================================================================== */

// --- Default Catalog Seed (Prices in Indian Rupees ₹) ---
const DEFAULT_CATALOG = [
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
    }
];

const CORRECT_PIN = "love9002";

const DEFAULT_COUPONS = [
    { code: "SAVE10", type: "percentage", value: 10, minOrder: 0, active: true },
    { code: "DEALS200", type: "flat", value: 200, minOrder: 999, active: true },
    { code: "LIFETIME50", type: "percentage", value: 15, minOrder: 1999, active: true }
];

// --- Firebase / Database Initialization ---
let database = null;
if (isFirebaseConfigured()) {
    try {
        firebase.initializeApp(FIREBASE_CONFIG);
        database = firebase.database();
        console.log("Firebase Realtime Database initialized in admin panel.");
    } catch (err) {
        console.error("Firebase initialization failed, running in offline mode:", err);
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

// --- State Variables ---
let productsList = [];
let ordersList = [];
let couponsList = [];
let editingIndex = -1; // -1 means add mode, >=0 means edit mode
let editingCouponIndex = -1;
let orderSearchQuery = '';
let orderStatusFilter = 'all';

// --- DOM Initial Load Listener ---
document.addEventListener('DOMContentLoaded', () => {
    // Icons initialization
    if (window.lucide) {
        window.lucide.createIcons();
    }

    checkActiveSession();
    setupLoginGate();
    setupDashboardActions();
    setupProductForm();
    setupDatabaseUtilities();
    setupTabsNavigation();
    setupOrdersControls();
    setupCouponsForm();
    setupStoreSettings();
    setupTemplatesForm();
    setupBulkActions();
});

// --- Session Verification ---
function checkActiveSession() {
    const sessionActive = sessionStorage.getItem('lightning_deals_logged_in');
    if (sessionActive === 'true') {
        unlockDashboard();
    }
}

// --- Login Gate Handlers ---
function setupLoginGate() {
    const loginForm = document.getElementById('admin-login-form');
    const pinInput = document.getElementById('admin-pin');
    const errorText = document.getElementById('login-error-msg');

    if (!loginForm) return;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (pinInput.value === CORRECT_PIN) {
            errorText.style.display = 'none';
            sessionStorage.setItem('lightning_deals_logged_in', 'true');
            unlockDashboard();
        } else {
            errorText.style.display = 'block';
            pinInput.value = '';
            pinInput.focus();
        }
    });
}

function syncAdminData(callback) {
    if (!database) {
        loadProductsFromStorage();
        loadOrdersFromStorage();
        loadCoupons();
        loadTemplates();
        if (callback) callback();
        return;
    }

    let syncPromises = [];

    // Products
    syncPromises.push(
        database.ref('products').once('value').then(snapshot => {
            const data = snapshot.val();
            if (data) {
                let loaded = [];
                if (Array.isArray(data)) {
                    loaded = data.filter(p => p !== null && p !== undefined);
                } else if (typeof data === 'object') {
                    loaded = Object.keys(data).map(k => {
                        const p = data[k];
                        if (p && !p.id) p.id = k;
                        return p;
                    }).filter(p => p !== null && p !== undefined);
                }
                productsList = loaded;
            } else {
                const local = localStorage.getItem('lightning_deals_products');
                if (local) {
                    try {
                        const parsed = JSON.parse(local);
                        if (Array.isArray(parsed) && parsed.length > 0) {
                            productsList = parsed;
                        } else {
                            productsList = DEFAULT_CATALOG;
                        }
                    } catch(e) {
                        productsList = DEFAULT_CATALOG;
                    }
                } else {
                    productsList = DEFAULT_CATALOG;
                }
                database.ref('products').set(productsList);
            }
            localStorage.setItem('lightning_deals_products', JSON.stringify(productsList));
        }).catch(err => {
            console.error("Error syncing products:", err);
            loadProductsFromStorage();
        })
    );

    // Coupons
    syncPromises.push(
        database.ref('coupons').once('value').then(snapshot => {
            const data = snapshot.val();
            if (data) {
                let loaded = [];
                if (Array.isArray(data)) {
                    loaded = data.filter(c => c !== null && c !== undefined);
                } else if (typeof data === 'object') {
                    loaded = Object.values(data).filter(c => c !== null && c !== undefined);
                }
                couponsList = loaded;
            } else {
                couponsList = [...DEFAULT_COUPONS];
                database.ref('coupons').set(DEFAULT_COUPONS);
            }
            localStorage.setItem('lightning_deals_coupons', JSON.stringify(couponsList));
        }).catch(err => {
            console.error("Error syncing coupons:", err);
            loadCoupons();
        })
    );

    // Settings
    syncPromises.push(
        database.ref('settings').once('value').then(snapshot => {
            const data = snapshot.val();
            const DEFAULT_SETTINGS = {
                phone: "917695956938",
                upiId: "sidhjain9002-1@okhdfcbank",
                notificationMethod: "disabled",
                callmebotApiKey: "",
                discordWebhookUrl: "",
                telegramBotToken: "",
                telegramChatId: ""
            };
            let settings = { ...DEFAULT_SETTINGS };
            if (data) {
                settings = { ...DEFAULT_SETTINGS, ...data };
            } else {
                database.ref('settings').set(DEFAULT_SETTINGS);
            }
            localStorage.setItem('lightning_deals_settings', JSON.stringify(settings));
        }).catch(err => {
            console.error("Error syncing settings:", err);
        })
    );

    // Templates
    syncPromises.push(
        database.ref('templates').once('value').then(snapshot => {
            const data = snapshot.val();
            if (data) {
                let loaded = [];
                if (Array.isArray(data)) {
                    loaded = data.filter(t => t !== null && t !== undefined);
                } else if (typeof data === 'object') {
                    loaded = Object.values(data).filter(t => t !== null && t !== undefined);
                }
                templatesList = loaded;
            } else {
                templatesList = [...DEFAULT_TEMPLATES];
                database.ref('templates').set(DEFAULT_TEMPLATES);
            }
            localStorage.setItem('lightning_deals_templates', JSON.stringify(templatesList));
        }).catch(err => {
            console.error("Error syncing templates:", err);
            loadTemplates();
        })
    );

    // Orders
    syncPromises.push(
        database.ref('orders').once('value').then(snapshot => {
            const data = snapshot.val();
            if (data) {
                let loaded = Object.values(data);
                loaded.sort((a, b) => b.id.localeCompare(a.id));
                ordersList = loaded;
            } else {
                ordersList = [];
            }
            localStorage.setItem('lightning_deals_orders', JSON.stringify(ordersList));
            
            // Set up real-time listener for orders updates
            database.ref('orders').on('value', (snap) => {
                const updatedData = snap.val();
                if (updatedData) {
                    let loaded = Object.values(updatedData);
                    loaded.sort((a, b) => b.id.localeCompare(a.id));
                    ordersList = loaded;
                } else {
                    ordersList = [];
                }
                localStorage.setItem('lightning_deals_orders', JSON.stringify(ordersList));
                renderOrdersStats();
                renderOrdersTable();
                updatePendingBadgeCount();
            });
        }).catch(err => {
            console.error("Error syncing orders:", err);
            loadOrdersFromStorage();
        })
    );

    Promise.all(syncPromises).then(() => {
        if (callback) callback();
    });
}

function unlockDashboard() {
    const gate = document.getElementById('admin-gate');
    const app = document.getElementById('admin-app');
    if (gate) gate.style.display = 'none';
    if (app) app.style.display = 'flex';
    
    const loader = document.createElement('div');
    loader.id = 'admin-db-sync-notice';
    loader.style.position = 'fixed';
    loader.style.top = '20px';
    loader.style.right = '20px';
    loader.style.background = 'rgba(7, 8, 11, 0.95)';
    loader.style.border = '1px solid rgba(0, 242, 254, 0.2)';
    loader.style.padding = '12px 20px';
    loader.style.borderRadius = '8px';
    loader.style.zIndex = '99999';
    loader.style.color = '#fff';
    loader.style.fontSize = '0.85rem';
    loader.style.fontFamily = 'inherit';
    loader.style.display = 'flex';
    loader.style.alignItems = 'center';
    loader.style.gap = '10px';
    loader.style.boxShadow = '0 8px 32px rgba(0, 242, 254, 0.15)';
    loader.innerHTML = `
        <div style="width: 16px; height: 16px; border: 2px solid rgba(0, 242, 254, 0.2); border-top-color: var(--clr-cyan); border-radius: 50%; animation: spin 1s linear infinite;"></div>
        <span>Syncing with Firebase...</span>
    `;
    document.body.appendChild(loader);

    if (!document.getElementById('admin-spin-style')) {
        const style = document.createElement('style');
        style.id = 'admin-spin-style';
        style.innerText = `@keyframes spin { to { transform: rotate(360deg); } }`;
        document.head.appendChild(style);
    }

    syncAdminData(() => {
        if (loader) loader.remove();

        renderCatalogStats();
        renderProductsTable();
        renderOrdersStats();
        renderOrdersTable();
        renderCouponsStats();
        renderCouponsTable();
        updatePendingBadgeCount();
        
        if (window.loadStoreSettings) {
            window.loadStoreSettings();
        }
    });
}

function loadProductsFromStorage() {
    productsList = safeGetLocalStorage('lightning_deals_products', DEFAULT_CATALOG);
    if (!productsList || !Array.isArray(productsList) || productsList.length === 0) {
        productsList = DEFAULT_CATALOG;
        localStorage.setItem('lightning_deals_products', JSON.stringify(productsList));
    }
}

function loadOrdersFromStorage() {
    ordersList = safeGetLocalStorage('lightning_deals_orders', []);
}

// --- Log out Action ---
function setupDashboardActions() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('lightning_deals_logged_in');
            window.location.reload();
        });
    }
}

// --- Setup Tabs Navigation ---
function setupTabsNavigation() {
    const tabCatalog = document.getElementById('tab-btn-catalog');
    const tabOrders = document.getElementById('tab-btn-orders');
    const tabAnalytics = document.getElementById('tab-btn-analytics');
    const tabTemplates = document.getElementById('tab-btn-templates');
    const tabCoupons = document.getElementById('tab-btn-coupons');
    const tabSettings = document.getElementById('tab-btn-settings');
    
    const panelCatalog = document.getElementById('panel-catalog');
    const panelOrders = document.getElementById('panel-orders');
    const panelAnalytics = document.getElementById('panel-analytics');
    const panelTemplates = document.getElementById('panel-templates');
    const panelCoupons = document.getElementById('panel-coupons');
    const panelSettings = document.getElementById('panel-settings');

    const tabs = [];
    const panels = [];

    if (tabCatalog && panelCatalog) {
        tabs.push(tabCatalog);
        panels.push(panelCatalog);
        tabCatalog.addEventListener('click', () => {
            activateTab(tabCatalog, panelCatalog);
            loadProductsFromStorage();
            renderProductsTable();
            renderCatalogStats();
        });
    }

    if (tabOrders && panelOrders) {
        tabs.push(tabOrders);
        panels.push(panelOrders);
        tabOrders.addEventListener('click', () => {
            activateTab(tabOrders, panelOrders);
            loadOrdersFromStorage();
            renderOrdersTable();
            renderOrdersStats();
        });
    }

    if (tabAnalytics && panelAnalytics) {
        tabs.push(tabAnalytics);
        panels.push(panelAnalytics);
        tabAnalytics.addEventListener('click', () => {
            activateTab(tabAnalytics, panelAnalytics);
            loadOrdersFromStorage();
            renderAnalytics();
        });
    }

    if (tabTemplates && panelTemplates) {
        tabs.push(tabTemplates);
        panels.push(panelTemplates);
        tabTemplates.addEventListener('click', () => {
            activateTab(tabTemplates, panelTemplates);
            renderTemplates();
        });
    }

    if (tabCoupons && panelCoupons) {
        tabs.push(tabCoupons);
        panels.push(panelCoupons);
        tabCoupons.addEventListener('click', () => {
            activateTab(tabCoupons, panelCoupons);
            loadCoupons();
            renderCouponsTable();
            renderCouponsStats();
        });
    }

    if (tabSettings && panelSettings) {
        tabs.push(tabSettings);
        panels.push(panelSettings);
        tabSettings.addEventListener('click', () => {
            activateTab(tabSettings, panelSettings);
            if (typeof window.loadStoreSettings === 'function') {
                window.loadStoreSettings();
            }
        });
    }

    function activateTab(activeTab, activePanel) {
        tabs.forEach(tab => tab.classList.toggle('active', tab === activeTab));
        panels.forEach(panel => panel.classList.toggle('active', panel === activePanel));
    }
}

// --- Render Catalog Stats Cards ---
function renderCatalogStats() {
    const totalCount = productsList.length;
    const statTotalEl = document.getElementById('stat-total-products');
    if (statTotalEl) statTotalEl.innerText = totalCount;

    const categories = new Set(productsList.filter(p => p && p.category).map(p => p.category));
    const statCatEl = document.getElementById('stat-total-categories');
    if (statCatEl) statCatEl.innerText = categories.size;
}

// --- Render Products Table Rows ---
function renderProductsTable() {
    const tbody = document.getElementById('admin-products-tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (productsList.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center" style="padding: 3rem 1rem; color: var(--text-muted);">
                    <i data-lucide="package-x" style="width: 32px; height: 32px; margin-bottom: 0.5rem; display: block; margin-left: auto; margin-right: auto;"></i>
                    No products found in the database catalog. Create one using the form on the left.
                </td>
            </tr>
        `;
        if (window.lucide) window.lucide.createIcons();
        return;
    }

    productsList.forEach((prod, index) => {
        const minPrice = prod.plans && prod.plans.length > 0
            ? Math.min(...prod.plans.map(p => p.price))
            : 0;

        let stockLabel = 'Available';
        let stockClass = 'available';
        if (prod.stockStatus === 'limited') { stockLabel = 'Limited'; stockClass = 'limited'; }
        else if (prod.stockStatus === 'outofstock') { stockLabel = 'Out of Stock'; stockClass = 'outofstock'; }
        else if (prod.stockStatus === 'instant') { stockLabel = 'Instant'; stockClass = 'instant'; }
        
        let hiddenHTML = '';
        if (prod.visible === false) {
            hiddenHTML = `<span class="badge-status badge-status-cancelled" style="margin-left: 6px; font-size: 0.65rem; padding: 1px 6px; border-radius: 4px;">Hidden</span>`;
        }

        let bestsellerHTML = '';
        if (prod.bestseller === true) {
            bestsellerHTML = `<span class="badge-status" style="margin-left: 6px; font-size: 0.65rem; padding: 1px 6px; border-radius: 4px; background: rgba(0, 242, 254, 0.15); color: var(--clr-cyan); border: 1px solid rgba(0, 242, 254, 0.25);">Bestseller</span>`;
        }

        const row = document.createElement('tr');
        if (index === editingIndex) {
            row.classList.add('editing-row');
        }
        row.innerHTML = `
            <td class="checkbox-cell">
                <input type="checkbox" class="bulk-select-row" data-index="${index}">
            </td>
            <td class="edit-cell" style="text-align: center;">
                <button class="btn btn-secondary btn-xs edit-btn-trigger" data-index="${index}" aria-label="Edit product">
                    <i data-lucide="edit-3" style="width: 13px; height: 13px;"></i>
                </button>
            </td>
            <td>
                <div class="admin-table-product-cell">
                    <div class="admin-table-logo-circle ${prod.iconColor || 'grad-blue'}">${prod.icon || 'P'}</div>
                    <div>
                        <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 4px;">
                            <span class="admin-table-title">${prod.name}</span>
                            <span class="stock-tag-product stock-tag-${stockClass}">${stockLabel}</span>
                            ${hiddenHTML}
                            ${bestsellerHTML}
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <span class="table-badge-category">${getCategoryDisplayName(prod.category)}</span>
            </td>
            <td>
                <span class="text-cyan" style="font-weight: 700;">₹${minPrice.toLocaleString('en-IN')}</span>
            </td>
            <td>
                <div class="table-actions">
                    <button class="btn btn-danger btn-xs delete-btn-trigger" data-index="${index}" aria-label="Delete product">
                        <i data-lucide="trash-2" style="width: 13px; height: 13px;"></i>
                    </button>
                </div>
            </td>
        `;

        tbody.appendChild(row);
    });

    tbody.querySelectorAll('.edit-btn-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-index'));
            initiateEditProduct(idx);
        });
    });

    tbody.querySelectorAll('.delete-btn-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-index'));
            deleteProduct(idx);
        });
    });

    // Wire checkbox event listeners
    const selectAllCheckbox = document.getElementById('bulk-select-all');
    if (selectAllCheckbox) selectAllCheckbox.checked = false;
    updateBulkToolbar();

    tbody.querySelectorAll('.bulk-select-row').forEach(cb => {
        cb.addEventListener('change', () => {
            updateBulkToolbar();
            if (!cb.checked && selectAllCheckbox) {
                selectAllCheckbox.checked = false;
            }
            const allChecked = tbody.querySelectorAll('.bulk-select-row:not(:checked)').length === 0;
            if (allChecked && selectAllCheckbox && tbody.querySelectorAll('.bulk-select-row').length > 0) {
                selectAllCheckbox.checked = true;
            }
        });
    });

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// --- Edit Product Logic ---
function initiateEditProduct(index) {
    editingIndex = index;
    const prod = productsList[index];

    // Populating inputs
    document.getElementById('edit-index').value = index;
    document.getElementById('prod-name').value = prod.name;
    document.getElementById('prod-category').value = prod.category;
    document.getElementById('prod-desc').value = prod.description;
    document.getElementById('prod-icon').value = prod.icon || 'P';
    document.getElementById('prod-icon-color').value = prod.iconColor || 'grad-blue';
    
    // Clear all grid inputs first
    const tiers = ['1mo', '2mo', '3mo', '6mo', '1yr', 'lt'];
    tiers.forEach(t => {
        document.getElementById(`plan-enable-${t}`).checked = false;
        document.getElementById(`plan-price-${t}`).value = '';
        document.getElementById(`plan-retail-${t}`).value = '';
    });

    // Populate from product plans
    if (prod.plans && Array.isArray(prod.plans)) {
        prod.plans.forEach(plan => {
            let key = '';
            if (plan.label === '1 Month') key = '1mo';
            else if (plan.label === '2 Months') key = '2mo';
            else if (plan.label === '3 Months') key = '3mo';
            else if (plan.label === '6 Months') key = '6mo';
            else if (plan.label === '12 Months (1 Year)' || plan.label === 'Annual' || plan.label === '1 Year') key = '1yr';
            else if (plan.label === 'Lifetime') key = 'lt';

            if (key) {
                document.getElementById(`plan-enable-${key}`).checked = true;
                document.getElementById(`plan-price-${key}`).value = plan.price;
                document.getElementById(`plan-retail-${key}`).value = plan.retail;
            }
        });
    }

    document.getElementById('prod-features').value = healFeatures(prod.features).join(', ');

    const reqsEl = document.getElementById('prod-activation-reqs');
    if (reqsEl) reqsEl.value = prod.activationRequirements || '';
    const procEl = document.getElementById('prod-activation-process');
    if (procEl) procEl.value = prod.activationProcess || '';

    // Populate new fields
    document.getElementById('prod-stock').value = prod.stockStatus || 'available';
    document.getElementById('prod-badge').value = prod.badge || prod.tag || '';
    document.getElementById('prod-visible').checked = prod.visible !== false;
    document.getElementById('prod-bestseller').checked = prod.bestseller === true;

    // Update Form state headers
    document.getElementById('form-action-title').innerHTML = `<i data-lucide="edit" style="vertical-align: middle; margin-right: 4px;"></i> Edit Product: ${prod.name}`;
    document.getElementById('form-submit-btn').querySelector('span').innerText = "Update Product";
    document.getElementById('cancel-edit-btn').style.display = 'inline-block';

    // Add visual edit mode classes
    const formContainer = document.getElementById('form-container');
    if (formContainer) formContainer.classList.add('edit-mode-active');
    const editBadge = document.getElementById('edit-mode-badge');
    if (editBadge) editBadge.style.display = 'inline-block';

    renderProductsTable();

    document.getElementById('form-container').scrollIntoView({ behavior: 'smooth' });
    if (window.lucide) window.lucide.createIcons();
}

function cancelProductEdit() {
    editingIndex = -1;
    document.getElementById('product-form').reset();
    document.getElementById('edit-index').value = "-1";

    // Set default checkbox state
    document.getElementById('plan-enable-1mo').checked = true;
    document.getElementById('plan-enable-2mo').checked = false;
    document.getElementById('plan-enable-3mo').checked = false;
    document.getElementById('plan-enable-6mo').checked = true;
    document.getElementById('plan-enable-1yr').checked = true;
    document.getElementById('plan-enable-lt').checked = false;

    // Clear all inputs
    const tiers = ['1mo', '2mo', '3mo', '6mo', '1yr', 'lt'];
    tiers.forEach(t => {
        document.getElementById(`plan-price-${t}`).value = '';
        document.getElementById(`plan-retail-${t}`).value = '';
    });

    document.getElementById('prod-stock').value = 'available';
    document.getElementById('prod-badge').value = '';
    document.getElementById('prod-visible').checked = true;
    document.getElementById('prod-bestseller').checked = false;

    document.getElementById('form-action-title').innerHTML = `<i data-lucide="plus-circle" style="vertical-align: middle; margin-right: 4px;"></i> Add New Product`;
    document.getElementById('form-submit-btn').querySelector('span').innerText = "Save Product";
    document.getElementById('cancel-edit-btn').style.display = 'none';

    // Remove visual edit mode classes
    const formContainer = document.getElementById('form-container');
    if (formContainer) formContainer.classList.remove('edit-mode-active');
    const editBadge = document.getElementById('edit-mode-badge');
    if (editBadge) editBadge.style.display = 'none';

    renderProductsTable();

    if (window.lucide) window.lucide.createIcons();
}

// --- Delete Product Logic ---
function deleteProduct(index) {
    const prod = productsList[index];
    if (confirm(`Are you sure you want to delete ${prod.name} from the catalog?`)) {
        if (editingIndex === index) {
            cancelProductEdit();
        } else if (editingIndex > index) {
            editingIndex--;
        }
        
        productsList.splice(index, 1);
        saveCatalogToStorage();
        renderCatalogStats();
        renderProductsTable();
    }
}

// --- Save Catalog to Storage ---
function saveCatalogToStorage() {
    if (database) {
        database.ref('products').set(productsList)
            .then(() => console.log("Products synced to Firebase."))
            .catch(err => console.error("Firebase products sync failed:", err));
    }
    try {
        localStorage.setItem('lightning_deals_products', JSON.stringify(productsList));
        updateStorageIndicator();
    } catch (e) {
        console.error("Local Storage Save Error (Catalog):", e);
        if (e.name === 'QuotaExceededError' || e.code === 22 || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            // Auto-cleanup: strip large screenshot data from orders to free space
            const freed = autoFreeStorageSpace();
            if (freed) {
                try {
                    localStorage.setItem('lightning_deals_products', JSON.stringify(productsList));
                    updateStorageIndicator();
                    alert("✅ Product saved! Some old order screenshots were automatically removed to free up browser storage space.");
                    return;
                } catch (e2) {
                    // Still not enough space even after cleanup
                }
            }
            alert("⚠️ Browser storage is full! Could not save product catalog. Please go to the Orders panel and click 'Clear Order History' to delete older orders and free up space.");
        } else {
            alert("⚠️ An error occurred while saving the product catalog: " + e.message);
        }
    }
}

// --- Auto-free storage by stripping screenshots from orders ---
function autoFreeStorageSpace() {
    try {
        const ordersRaw = localStorage.getItem('lightning_deals_orders');
        if (!ordersRaw) return false;

        let orders = JSON.parse(ordersRaw);
        if (!Array.isArray(orders)) return false;

        let freed = false;
        orders.forEach(order => {
            if (order.screenshot && order.screenshot.length > 100) {
                order.screenshot = "removed:auto_cleanup_to_free_storage";
                order.screenshotRemoved = true;
                freed = true;
            }
        });

        if (freed) {
            localStorage.setItem('lightning_deals_orders', JSON.stringify(orders));
            // Also update the in-memory list if it exists
            if (typeof ordersList !== 'undefined' && Array.isArray(ordersList)) {
                ordersList = orders;
            }
        }

        // Also try to remove recently viewed items (low-priority data)
        try { localStorage.removeItem('lightning_deals_recently_viewed'); } catch(ignored) {}

        return freed;
    } catch (cleanupErr) {
        console.error("Auto-cleanup error:", cleanupErr);
        return false;
    }
}

// --- Storage Usage Indicator ---
function updateStorageIndicator() {
    const indicator = document.getElementById('storage-usage-indicator');
    if (!indicator) return;
    try {
        let totalSize = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                totalSize += (localStorage[key].length + key.length) * 2; // UTF-16 = 2 bytes per char
            }
        }
        const usedMB = (totalSize / (1024 * 1024)).toFixed(2);
        const maxMB = 5; // Standard localStorage limit
        const pct = Math.min(100, ((totalSize / (maxMB * 1024 * 1024)) * 100)).toFixed(0);
        let color = 'var(--text-muted)';
        if (pct > 80) color = '#FF6633';
        if (pct > 95) color = '#FF3366';
        indicator.style.color = color;
        indicator.innerHTML = `💾 Storage: ${usedMB} / ${maxMB} MB (${pct}%)`;
    } catch (e) {
        indicator.innerHTML = '';
    }
}

// --- Setup Form Submission CRUD ---
function setupProductForm() {
    const form = document.getElementById('product-form');
    const cancelBtn = document.getElementById('cancel-edit-btn');

    if (!form) return;

    if (cancelBtn) {
        cancelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            cancelProductEdit();
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('prod-name').value.trim();
        const category = document.getElementById('prod-category').value;
        const description = document.getElementById('prod-desc').value.trim();
        const icon = document.getElementById('prod-icon').value.trim();
        const iconColor = document.getElementById('prod-icon-color').value;
        const rawFeatures = document.getElementById('prod-features').value.trim();

        const stockStatus = document.getElementById('prod-stock').value;
        const badge = document.getElementById('prod-badge').value;
        const visible = document.getElementById('prod-visible').checked;
        const bestseller = document.getElementById('prod-bestseller') ? document.getElementById('prod-bestseller').checked : false;

        // Read and compile plans from visual grid
        let plans = [];
        const tierMapping = [
            { key: '1mo', label: '1 Month' },
            { key: '2mo', label: '2 Months' },
            { key: '3mo', label: '3 Months' },
            { key: '6mo', label: '6 Months' },
            { key: '1yr', label: '12 Months (1 Year)' },
            { key: 'lt', label: 'Lifetime' }
        ];

        let validationPassed = true;
        for (const tier of tierMapping) {
            const enabled = document.getElementById(`plan-enable-${tier.key}`).checked;
            if (enabled) {
                const priceVal = document.getElementById(`plan-price-${tier.key}`).value.trim();
                const retailVal = document.getElementById(`plan-retail-${tier.key}`).value.trim();

                if (priceVal === '') {
                    alert(`Please enter a selling price for the enabled ${tier.label} plan.`);
                    document.getElementById(`plan-price-${tier.key}`).focus();
                    validationPassed = false;
                    break;
                }

                plans.push({
                    label: tier.label,
                    price: parseFloat(priceVal) || 0,
                    retail: parseFloat(retailVal) || parseFloat(priceVal) || 0
                });
            }
        }

        if (!validationPassed) return;

        if (plans.length === 0) {
            alert("Please enable and configure at least one pricing plan tier (e.g., 1 Month, Annual, etc.).");
            return;
        }

        // Parse features using healFeatures utility helper
        let features = healFeatures(rawFeatures);

        if (features.length === 0) {
            alert("Please input at least one key feature product benefits list.");
            return;
        }

        const reqsEl = document.getElementById('prod-activation-reqs');
        const procEl = document.getElementById('prod-activation-process');
        const activationRequirements = reqsEl ? reqsEl.value.trim() : '';
        const activationProcess = procEl ? procEl.value.trim() : '';

        if (!activationRequirements) {
            alert("Please enter the customer requirements for activation.");
            if (reqsEl) reqsEl.focus();
            return;
        }

        if (!activationProcess) {
            alert("Please enter the activation process instructions.");
            if (procEl) procEl.focus();
            return;
        }

        const editIndexVal = parseInt(document.getElementById('edit-index').value);

        if (editIndexVal < 0 && productsList.length >= 200) {
            alert("Maximum product catalog capacity limit (200 subscriptions) has been reached. Please delete or disable existing products before adding new ones.");
            return;
        }

        const newProd = {
            id: editIndexVal >= 0 ? productsList[editIndexVal].id : generateId(name),
            name: name,
            category: category,
            description: description,
            icon: icon,
            iconColor: iconColor,
            tag: badge || "",
            badge: badge || "",
            stockStatus: stockStatus,
            visible: visible,
            bestseller: bestseller,
            plans: plans,
            features: features,
            activationRequirements: activationRequirements,
            activationProcess: activationProcess
        };

        if (editIndexVal >= 0) {
            productsList[editIndexVal] = newProd;
        } else {
            productsList.push(newProd);
        }

        saveCatalogToStorage();
        cancelProductEdit();
        renderCatalogStats();
        renderProductsTable();
    });
}

// --- Setup Import/Export Operations ---
function setupDatabaseUtilities() {
    const exportBtn = document.getElementById('export-db-btn');
    const importInput = document.getElementById('import-db-input');
    const resetBtn = document.getElementById('reset-db-btn');
    const feedback = document.getElementById('db-feedback-msg');

    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(productsList, null, 2));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", "lightning-deals-catalog.json");
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();

            showFeedback("Database exported successfully!", "green");
        });
    }

    if (importInput) {
        importInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(evt) {
                try {
                    const parsed = JSON.parse(evt.target.result);
                    if (!parsed || !Array.isArray(parsed)) {
                        throw new Error("Import payload must be a JSON array of products.");
                    }

                    // Robust Validation and Auto-healing
                    const healedList = [];
                    const errors = [];

                    parsed.forEach((prod, idx) => {
                        try {
                            if (!prod || typeof prod !== 'object') {
                                throw new Error(`Item at index ${idx + 1} is not a valid product object.`);
                            }
                            if (!prod.name || typeof prod.name !== 'string' || !prod.name.trim()) {
                                throw new Error(`Product at index ${idx + 1} is missing a valid 'name'.`);
                            }
                            if (!prod.category || typeof prod.category !== 'string' || !prod.category.trim()) {
                                throw new Error(`Product "${prod.name || 'Unnamed'}" (index ${idx + 1}) is missing a 'category'.`);
                            }
                            if (!prod.plans || !Array.isArray(prod.plans) || prod.plans.length === 0) {
                                throw new Error(`Product "${prod.name}" (index ${idx + 1}) must have at least one pricing plan.`);
                            }

                            // Auto-heal plans
                            const validPlans = [];
                            prod.plans.forEach((plan, planIdx) => {
                                if (plan && typeof plan === 'object') {
                                    validPlans.push({
                                        label: (plan.label || `Plan ${planIdx + 1}`).trim(),
                                        price: parseFloat(plan.price) || 0,
                                        retail: parseFloat(plan.retail) || parseFloat(plan.price) || 0
                                    });
                                }
                            });

                            if (validPlans.length === 0) {
                                throw new Error(`Product "${prod.name}" (index ${idx + 1}) has invalid pricing plans.`);
                            }

                            // Auto-heal features
                            let features = [];
                            if (Array.isArray(prod.features)) {
                                features = prod.features
                                    .map(f => typeof f === 'string' ? f.trim() : (f ? String(f).trim() : ''))
                                    .filter(f => f !== '');
                            } else if (typeof prod.features === 'string') {
                                features = healFeatures(prod.features);
                            }
                            if (features.length === 0) {
                                features = ["Full access license activation", "24/7 customer support"];
                            }

                            // Build fully healed product
                            const healedProd = {
                                id: (prod.id || generateId(prod.name)).trim(),
                                name: prod.name.trim(),
                                category: prod.category.trim().toLowerCase(),
                                description: (prod.description || '').trim(),
                                icon: (prod.icon || prod.name.charAt(0)).trim().toUpperCase(),
                                iconColor: (prod.iconColor || 'grad-blue').trim(),
                                tag: (prod.tag || prod.badge || '').trim(),
                                badge: (prod.badge || prod.tag || '').trim(),
                                stockStatus: (prod.stockStatus || 'available').trim(),
                                visible: prod.visible !== false,
                                bestseller: prod.bestseller === true,
                                plans: validPlans,
                                features: features,
                                activationRequirements: (prod.activationRequirements || "Registered account email address.").trim(),
                                activationProcess: (prod.activationProcess || "We will send instructions/credentials to your email.").trim()
                            };

                            healedList.push(healedProd);
                        } catch (prodErr) {
                            errors.push(prodErr.message);
                        }
                    });

                    if (errors.length > 0) {
                        throw new Error("Validation failed for some products:\n- " + errors.slice(0, 3).join('\n- ') + (errors.length > 3 ? `\n...and ${errors.length - 3} more errors.` : ''));
                    }

                    // Prompt user for Merge vs Replace vs Cancel options
                    showImportOptionsModal(healedList, (choice) => {
                        if (choice === 'cancel') {
                            showFeedback("Import cancelled.", "red");
                            return;
                        }

                        if (choice === 'replace') {
                            if (healedList.length > 200) {
                                showFeedback(`Import error: Replacement exceeds 200 products limit (has ${healedList.length}).`, "red");
                                return;
                            }
                            productsList = healedList;
                            saveCatalogToStorage();
                            renderCatalogStats();
                            renderProductsTable();
                            showFeedback(`Catalog replaced with ${healedList.length} products successfully!`, "green");
                        } else if (choice === 'merge') {
                            const combinedLength = productsList.length + healedList.length;
                            if (combinedLength > 200) {
                                showFeedback(`Import error: Merging would result in ${combinedLength} products, which exceeds the limit of 200.`, "red");
                                return;
                            }

                            // Keep existing IDs set to avoid duplicates
                            const existingIds = new Set(productsList.map(p => p.id));
                            let mergedCount = 0;

                            healedList.forEach(prod => {
                                let baseId = prod.id;
                                let uniqueId = baseId;
                                let suffix = 1;
                                while (existingIds.has(uniqueId)) {
                                    uniqueId = `${baseId}-${suffix}`;
                                    suffix++;
                                }
                                prod.id = uniqueId;
                                existingIds.add(uniqueId);
                                productsList.push(prod);
                                mergedCount++;
                            });

                            saveCatalogToStorage();
                            renderCatalogStats();
                            renderProductsTable();
                            showFeedback(`Merged ${mergedCount} products into your catalog successfully!`, "green");
                        }
                    });

                } catch (err) {
                    if (err.message.includes('\n')) {
                        alert(err.message);
                        showFeedback("Import validation failed. Check browser alert details.", "red");
                    } else {
                        showFeedback(`Import error: ${err.message}`, "red");
                    }
                }
            };
            reader.readAsText(file);
            importInput.value = ''; 
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm("Reset catalog database? This deletes all custom entries and restores defaults.")) {
                cancelProductEdit();
                productsList = [...DEFAULT_CATALOG];
                saveCatalogToStorage();
                renderCatalogStats();
                renderProductsTable();
                showFeedback("Defaults catalog restored!", "green");
            }
        });
    }

    function showFeedback(msg, color) {
        if (!feedback) return;
        feedback.innerHTML = msg.replace(/\n/g, '<br>');
        feedback.style.display = 'block';
        feedback.style.color = color === 'green' ? 'var(--clr-cyan)' : 'var(--clr-red)';
        setTimeout(() => {
            feedback.style.display = 'none';
        }, 5000);
    }
}

// --- Import Options Custom Glassmorphic Modal ---
function showImportOptionsModal(parsedProducts, onComplete) {
    // Create modal elements
    const overlay = document.createElement('div');
    overlay.className = 'import-modal-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0, 0, 0, 0.7)';
    overlay.style.backdropFilter = 'blur(8px)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '100000';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s ease';

    const card = document.createElement('div');
    card.className = 'glass-card';
    card.style.width = '90%';
    card.style.maxWidth = '500px';
    card.style.padding = '30px';
    card.style.borderRadius = '16px';
    card.style.border = '1px solid rgba(255, 255, 255, 0.08)';
    card.style.background = 'rgba(23, 23, 28, 0.9)';
    card.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
    card.style.color = '#ffffff';
    card.style.transform = 'scale(0.9)';
    card.style.transition = 'transform 0.3s ease';

    card.innerHTML = `
        <h3 style="margin-top: 0; margin-bottom: 12px; font-size: 1.5rem; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 10px;">
            <i data-lucide="upload-cloud" style="color: var(--clr-cyan); width: 24px; height: 24px;"></i>
            Import Catalog Options
        </h3>
        <p style="font-size: 0.95rem; line-height: 1.5; color: var(--text-secondary); margin-bottom: 24px;">
            You are importing <strong style="color: var(--clr-cyan);">${parsedProducts.length}</strong> products. How would you like to apply this import to your store?
        </p>
        <div style="display: flex; flex-direction: column; gap: 12px;">
            <button id="btn-import-merge" class="btn btn-primary" style="display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 12px; font-weight: 600;">
                <i data-lucide="merge" style="width: 18px; height: 18px;"></i>
                Merge &amp; Append Products
            </button>
            <button id="btn-import-replace" class="btn btn-danger" style="display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 12px; font-weight: 600; background: rgba(244, 63, 94, 0.15); border: 1px solid rgba(244, 63, 94, 0.3); color: #f43f5e; cursor: pointer;">
                <i data-lucide="refresh-cw" style="width: 18px; height: 18px;"></i>
                Replace Existing Catalog
            </button>
            <button id="btn-import-cancel" class="btn btn-secondary" style="display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 12px; font-weight: 600;">
                Cancel
            </button>
        </div>
    `;

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    // Fade in
    setTimeout(() => {
        overlay.style.opacity = '1';
        card.style.transform = 'scale(1)';
    }, 10);

    if (window.lucide) window.lucide.createIcons({ src: card });

    const closeModal = () => {
        overlay.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        setTimeout(() => {
            overlay.remove();
        }, 300);
    };

    card.querySelector('#btn-import-merge').addEventListener('click', () => {
        closeModal();
        onComplete('merge');
    });

    card.querySelector('#btn-import-replace').addEventListener('click', () => {
        closeModal();
        onComplete('replace');
    });

    card.querySelector('#btn-import-cancel').addEventListener('click', () => {
        closeModal();
        onComplete('cancel');
    });
}

// ==========================================================================
// CUSTOMER ORDERS DIRECTORY CONTROLS
// ==========================================================================

// --- Load and Render Orders Statistics ---
function renderOrdersStats() {
    const validOrders = ordersList.filter(o => o);
    const totalOrders = validOrders.length;
    const totalEl = document.getElementById('stat-total-orders');
    if (totalEl) totalEl.innerText = totalOrders;

    const pendingOrders = validOrders.filter(o => o.status === 'Pending' || o.status === 'Pending Stripe Payment').length;
    const pendingEl = document.getElementById('stat-pending-orders');
    if (pendingEl) pendingEl.innerText = pendingOrders;

    const completedSales = validOrders
        .filter(o => o.status === 'Delivered' || o.status === 'Paid via Stripe')
        .reduce((sum, o) => sum + (o.price || 0), 0);

    const revenueEl = document.getElementById('stat-total-revenue');
    if (revenueEl) revenueEl.innerText = `₹${completedSales.toLocaleString('en-IN')}`;
}

function updatePendingBadgeCount() {
    const pendingOrdersCount = ordersList.filter(o => o && (o.status === 'Pending' || o.status === 'Pending Stripe Payment')).length;
    const badge = document.getElementById('badge-pending-count');
    if (badge) {
        badge.innerText = pendingOrdersCount;
        badge.style.display = pendingOrdersCount > 0 ? 'inline-block' : 'none';
    }
}

// --- Render Customer Orders Table ---
function renderOrdersTable() {
    const tbody = document.getElementById('admin-orders-tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    const validOrders = ordersList.filter(o => o);
    
    // Apply filters
    const query = orderSearchQuery.toLowerCase().trim();
    const filteredOrders = validOrders.filter(order => {
        // Status filter
        const orderDisplayStatus = getOrderDisplayStatus(order);
        const matchesStatus = (orderStatusFilter === 'all' || orderDisplayStatus === orderStatusFilter);
        
        // Search query filter
        const matchesSearch = !query || 
            (order.id && order.id.toLowerCase().includes(query)) ||
            (order.name && order.name.toLowerCase().includes(query)) ||
            (order.email && order.email.toLowerCase().includes(query)) ||
            (order.phone && order.phone.toLowerCase().includes(query)) ||
            (order.utr && order.utr.toLowerCase().includes(query)) ||
            (order.product && order.product.toLowerCase().includes(query));
            
        return matchesStatus && matchesSearch;
    });

    if (filteredOrders.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center" style="padding: 4rem 1rem; color: var(--text-muted);">
                    <i data-lucide="shopping-bag" style="width: 36px; height: 36px; margin-bottom: 0.5rem; display: block; margin-left: auto; margin-right: auto; opacity: 0.5;"></i>
                    No purchase orders found matching your filters.
                </td>
            </tr>
        `;
        if (window.lucide) window.lucide.createIcons();
        return;
    }

    filteredOrders.forEach((order, index) => {
        const originalIndex = ordersList.indexOf(order);
        
        let statusClass = 'badge-status-pending';
        const displayStatus = getOrderDisplayStatus(order);
        if (displayStatus === 'Delivered' || displayStatus === 'Active') statusClass = 'badge-status-delivered';
        if (displayStatus === 'Cancelled') statusClass = 'badge-status-cancelled';
        if (displayStatus === 'Expired') statusClass = 'badge-status-cancelled';
        if (displayStatus === 'Pending') statusClass = 'badge-status-pending';
        
        let itemsListHTML = '';
        if (order.items && Array.isArray(order.items) && order.items.length > 0) {
            order.items.forEach(item => {
                if (!item) return;
                itemsListHTML += `<div class="order-item-detail-row" style="font-size: 0.8rem; margin-top: 2px; color: var(--text-secondary);">
                    • ${escapeHTML(item.name || '')} (${escapeHTML(item.planLabel || '')}) x ${item.qty || 1} - <span class="text-cyan">₹${((item.price || 0) * (item.qty || 1)).toLocaleString('en-IN')}</span>
                </div>`;
            });
        } else {
            itemsListHTML = `<div class="admin-table-order-title">${escapeHTML(order.product || '')}</div>
                             <div class="admin-table-order-plan">${escapeHTML(order.plan || '')}</div>`;
        }

        let pricingHTML = '';
        if (order.coupon) {
            pricingHTML = `<div class="admin-table-order-plan" style="margin-top: 4px;">
                <span style="text-decoration: line-through; opacity: 0.6; font-size: 0.8rem;">₹${(order.subtotal || 0).toLocaleString('en-IN')}</span> 
                <span style="font-size: 0.8rem; color: var(--clr-cyan);">Coupon: ${escapeHTML(order.coupon)} (-₹${(order.discount || 0).toLocaleString('en-IN')})</span>
                <br>
                <strong>Total: ₹${(order.price || 0).toLocaleString('en-IN')}</strong>
            </div>`;
        } else {
            pricingHTML = `<div class="admin-table-order-plan" style="margin-top: 4px; font-weight: bold;">
                Total: ₹${(order.price || 0).toLocaleString('en-IN')}
            </div>`;
        }

        let rowHighlightClass = '';
        const warrantyStatus = getWarrantyStatus(order);
        if (warrantyStatus === 'Expiring Soon') {
            rowHighlightClass = 'order-expiry-soon';
        } else if (warrantyStatus === 'Expired') {
            rowHighlightClass = 'order-expired';
        }

        const row = document.createElement('tr');
        if (rowHighlightClass) {
            row.className = rowHighlightClass;
        }
        row.style.cursor = 'pointer';
        row.innerHTML = `
            <td>
                <div class="admin-table-order-id">${escapeHTML(order.id || '')}</div>
                ${itemsListHTML}
                ${pricingHTML}
            </td>
            <td>
                <span class="admin-table-cust-name">${escapeHTML(order.name || '')}</span>
                <span class="admin-table-cust-meta">${escapeHTML(order.email || '')}</span>
                <span class="admin-table-cust-meta">+${escapeHTML(order.phone || '')}</span>
            </td>
            <td>
                <span style="font-family: monospace; font-size: 0.85rem; color: var(--text-primary); font-weight: 500;">${escapeHTML(order.utr || '')}</span>
                <span class="admin-table-cust-meta" style="font-size: 0.7rem;">${escapeHTML(order.date || '')}</span>
            </td>
            <td>
                <span class="badge-status ${statusClass}">${escapeHTML(displayStatus || '')}</span>
                <div style="font-size: 0.7rem; color: var(--text-secondary); margin-top: 4px;">Warranty: <strong>${warrantyStatus}</strong></div>
            </td>
            <td class="table-actions-cell">
                <div class="table-actions">
                    <button class="btn btn-whatsapp-action btn-xs whatsapp-contact-btn" data-index="${originalIndex}" title="Deliver via WhatsApp">
                        <svg class="social-svg-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="width: 13px; height: 13px; display: inline-block; vertical-align: middle;">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                    </button>
                    <button class="btn btn-secondary btn-xs deliver-status-btn" data-index="${originalIndex}" title="Mark as Delivered">
                        <i data-lucide="check-circle" style="width: 13px; height: 13px;"></i>
                    </button>
                    <button class="btn btn-secondary btn-xs cancel-status-btn" data-index="${originalIndex}" title="Cancel Order">
                        <i data-lucide="slash" style="width: 13px; height: 13px;"></i>
                    </button>
                    <button class="btn btn-danger btn-xs delete-order-btn" data-index="${originalIndex}" title="Delete Log">
                        <i data-lucide="trash-2" style="width: 13px; height: 13px;"></i>
                    </button>
                </div>
            </td>
        `;

        row.addEventListener('click', (e) => {
            if (e.target.closest('.table-actions') || e.target.closest('.table-actions-cell') || e.target.closest('button') || e.target.closest('a')) {
                return;
            }
            openOrderDetailDrawer(originalIndex);
        });

        tbody.appendChild(row);
    });

    tbody.querySelectorAll('.whatsapp-contact-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const idx = parseInt(btn.getAttribute('data-index'));
            contactCustomerWhatsApp(idx);
        });
    });

    tbody.querySelectorAll('.deliver-status-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const idx = parseInt(btn.getAttribute('data-index'));
            updateOrderStatus(idx, 'Delivered');
        });
    });

    tbody.querySelectorAll('.cancel-status-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const idx = parseInt(btn.getAttribute('data-index'));
            updateOrderStatus(idx, 'Cancelled');
        });
    });

    tbody.querySelectorAll('.delete-order-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const idx = parseInt(btn.getAttribute('data-index'));
            deleteOrderLog(idx);
        });
    });

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// --- WhatsApp delivery trigger button ---
function contactCustomerWhatsApp(index) {
    const order = ordersList[index];
    const customerPhone = order.phone; 
    const customerName = order.name;
    const productName = order.product;
    const planName = order.plan;
    const orderId = order.id;

    // Composition template for delivering credentials
    const welcomeMsg = `Hello ${customerName}! 👋\n\nThank you for ordering *${productName}* (${planName}) on Lightning Deals. (Order ID: *${orderId}*)\n\nHere are your premium activation details:\n\n🔑 Invite Link / Login Details:\n👉 [Paste Credentials Here]\n\nLet us know if you face any issues. Enjoy your premium access! ✨`;
    const encodedText = encodeURIComponent(welcomeMsg);
    
    const waUrl = `https://wa.me/${customerPhone}?text=${encodedText}`;
    window.open(waUrl, '_blank');
}

// --- Update Order Status ---
function updateOrderStatus(index, status) {
    ordersList[index].status = status;
    saveOrdersToStorage();
    renderOrdersStats();
    renderOrdersTable();
    updatePendingBadgeCount();
}

// --- Delete Single Order Log ---
function deleteOrderLog(index) {
    if (confirm("Are you sure you want to delete this order record?")) {
        ordersList.splice(index, 1);
        saveOrdersToStorage();
        renderOrdersStats();
        renderOrdersTable();
        updatePendingBadgeCount();
    }
}

// --- Save Orders Array to Storage ---
function saveOrdersToStorage() {
    if (database) {
        if (ordersList.length === 0) {
            database.ref('orders').remove()
                .then(() => console.log("Orders cleared from Firebase."))
                .catch(err => console.error("Firebase clear orders failed:", err));
        } else {
            const ordersMap = {};
            ordersList.forEach(o => {
                if (o && o.id) {
                    ordersMap[o.id] = o;
                }
            });
            database.ref('orders').set(ordersMap)
                .then(() => console.log("Orders synced to Firebase."))
                .catch(err => console.error("Firebase orders sync failed:", err));
        }
    }
    try {
        localStorage.setItem('lightning_deals_orders', JSON.stringify(ordersList));
    } catch (e) {
        console.error("Local Storage Save Error (Orders):", e);
        if (e.name === 'QuotaExceededError' || e.code === 22 || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            alert("⚠️ Browser storage is full! Could not save order updates. Please click 'Clear Order History' to delete older orders (which contain large screenshot images) and free up space.");
        } else {
            alert("⚠️ An error occurred while saving the orders database: " + e.message);
        }
    }
}

// --- Set up Orders control buttons ---
function setupOrdersControls() {
    const clearOrdersBtn = document.getElementById('btn-clear-orders');
    if (clearOrdersBtn) {
        clearOrdersBtn.addEventListener('click', () => {
            if (confirm("WARNING: Are you sure you want to clear ALL customer order history logs? This cannot be undone.")) {
                ordersList = [];
                saveOrdersToStorage();
                renderOrdersStats();
                renderOrdersTable();
                updatePendingBadgeCount();
                updateStorageIndicator();
                alert("Order history logs cleared successfully.");
            }
        });
    }

    // Clear all screenshots button handler
    const clearScreenshotsBtn = document.getElementById('btn-clear-screenshots');
    if (clearScreenshotsBtn) {
        clearScreenshotsBtn.addEventListener('click', () => {
            let screenshotCount = 0;
            ordersList.forEach(order => {
                if (order.screenshot && order.screenshot.length > 100) screenshotCount++;
            });
            if (screenshotCount === 0) {
                alert("No screenshot data found to clear.");
                return;
            }
            if (confirm(`This will remove screenshot images from ${screenshotCount} order(s) to free up browser storage. Order details will be preserved. Continue?`)) {
                ordersList.forEach(order => {
                    if (order.screenshot && order.screenshot.length > 100) {
                        order.screenshot = "removed:manually_cleared";
                        order.screenshotRemoved = true;
                    }
                });
                saveOrdersToStorage();
                renderOrdersTable();
                updateStorageIndicator();
                alert(`✅ Screenshots cleared from ${screenshotCount} order(s). Storage space freed!`);
            }
        });
    }

    // Show storage usage indicator
    updateStorageIndicator();

    // Search input handler
    const searchInput = document.getElementById('order-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            orderSearchQuery = e.target.value;
            renderOrdersTable();
        });
    }

    // Status filter buttons handler
    const filterBtns = document.querySelectorAll('.order-filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            orderStatusFilter = btn.getAttribute('data-status');
            renderOrdersTable();
        });
    });

    // Lightbox close binders
    const closeLightboxBtn = document.getElementById('close-lightbox-btn');
    const lightbox = document.getElementById('admin-lightbox');
    if (closeLightboxBtn && lightbox) {
        closeLightboxBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }

    // Drawer close binder
    const closeDrawerBtn = document.getElementById('close-drawer-btn');
    const drawer = document.getElementById('order-detail-drawer');
    if (closeDrawerBtn && drawer) {
        closeDrawerBtn.addEventListener('click', () => {
            drawer.classList.remove('active');
        });
        drawer.addEventListener('click', (e) => {
            if (e.target === drawer) {
                drawer.classList.remove('active');
            }
        });
    }
}

// --- Utils ---
function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getCategoryDisplayName(category) {
    const map = {
        'design': 'Design & Creative',
        'ai': 'AI Tools',
        'business': 'Business & Professional',
        'finance': 'Finance & Trading',
        'education': 'Education & Others'
    };
    return map[category] || (category ? category.toUpperCase() : '');
}

// Generate URL slug from name
function generateId(name) {
    return name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}

function escapeHTML(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// ==========================================================================
// DISCOUNT COUPONS DIRECTORY CONTROLS
// ==========================================================================

function loadCoupons() {
    couponsList = safeGetLocalStorage('lightning_deals_coupons', DEFAULT_COUPONS);
    if (!couponsList || !Array.isArray(couponsList) || couponsList.length === 0) {
        couponsList = [...DEFAULT_COUPONS];
        localStorage.setItem('lightning_deals_coupons', JSON.stringify(couponsList));
    }
}

function saveCouponsToStorage() {
    if (database) {
        database.ref('coupons').set(couponsList)
            .then(() => console.log("Coupons synced to Firebase."))
            .catch(err => console.error("Firebase coupons sync failed:", err));
    }
    localStorage.setItem('lightning_deals_coupons', JSON.stringify(couponsList));
}

function renderCouponsStats() {
    const total = couponsList.length;
    const active = couponsList.filter(c => c.active).length;
    
    const totalEl = document.getElementById('stat-total-coupons');
    const activeEl = document.getElementById('stat-active-coupons');
    
    if (totalEl) totalEl.innerText = total;
    if (activeEl) activeEl.innerText = active;
}

function renderCouponsTable() {
    const tbody = document.getElementById('admin-coupons-tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    const validCoupons = couponsList.filter(c => c);
    if (validCoupons.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center" style="padding: 3rem 1rem; color: var(--text-muted);">
                    <i data-lucide="ticket" style="width: 32px; height: 32px; margin-bottom: 0.5rem; display: block; margin-left: auto; margin-right: auto; opacity: 0.5;"></i>
                    No discount coupons found in the database. Add one on the left.
                </td>
            </tr>
        `;
        if (window.lucide) window.lucide.createIcons();
        return;
    }

    validCoupons.forEach((coupon, index) => {
        const discountText = coupon.type === 'percentage' 
            ? `${coupon.value || 0}% Off` 
            : `₹${(coupon.value || 0).toLocaleString('en-IN')} Off`;

        const statusClass = coupon.active ? 'badge-status-delivered' : 'badge-status-cancelled';
        const statusLabel = coupon.active ? 'Active' : 'Inactive';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <span class="text-cyan" style="font-weight: 700; font-family: monospace; font-size: 0.95rem; text-transform: uppercase;">${escapeHTML(coupon.code || '')}</span>
            </td>
            <td>
                <span style="font-weight: 600; color: var(--text-primary);">${discountText}</span>
            </td>
            <td>
                <span style="color: var(--text-secondary);">₹${(coupon.minOrder || 0).toLocaleString('en-IN')}</span>
            </td>
            <td>
                <span class="badge-status ${statusClass}">${statusLabel}</span>
            </td>
            <td>
                <div class="table-actions">
                    <button class="btn btn-secondary btn-xs edit-coupon-btn-trigger" data-index="${index}" aria-label="Edit coupon">
                        <i data-lucide="edit-3" style="width: 13px; height: 13px;"></i>
                    </button>
                    <button class="btn btn-danger btn-xs delete-coupon-btn-trigger" data-index="${index}" aria-label="Delete coupon">
                        <i data-lucide="trash-2" style="width: 13px; height: 13px;"></i>
                    </button>
                </div>
            </td>
        `;

        tbody.appendChild(row);
    });

    tbody.querySelectorAll('.edit-coupon-btn-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-index'));
            initiateEditCoupon(idx);
        });
    });

    tbody.querySelectorAll('.delete-coupon-btn-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-index'));
            deleteCoupon(idx);
        });
    });

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

function setupCouponsForm() {
    const form = document.getElementById('coupon-form');
    const cancelBtn = document.getElementById('cancel-coupon-edit-btn');

    if (!form) return;

    if (cancelBtn) {
        cancelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            cancelCouponEdit();
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const codeInput = document.getElementById('coupon-code');
        const code = codeInput.value.trim().toUpperCase();
        const type = document.getElementById('coupon-type').value;
        const value = parseFloat(document.getElementById('coupon-value').value) || 0;
        const minOrder = parseFloat(document.getElementById('coupon-min-order').value) || 0;
        const active = document.getElementById('coupon-active').checked;
        const editIndexVal = parseInt(document.getElementById('edit-coupon-index').value);

        if (!/^[A-Z0-9]+$/.test(code)) {
            alert("Coupon code must contain only letters and numbers (no spaces or special characters).");
            codeInput.focus();
            return;
        }

        // Check if code is unique when creating new or changing code
        const duplicateIdx = couponsList.findIndex(c => c.code.toUpperCase() === code);
        if (duplicateIdx > -1 && duplicateIdx !== editIndexVal) {
            alert(`A coupon with the code "${code}" already exists.`);
            codeInput.focus();
            return;
        }

        const newCoupon = {
            code,
            type,
            value,
            minOrder,
            active
        };

        if (editIndexVal >= 0) {
            couponsList[editIndexVal] = newCoupon;
        } else {
            couponsList.push(newCoupon);
        }

        saveCouponsToStorage();
        cancelCouponEdit();
        renderCouponsStats();
        renderCouponsTable();
    });
}

function initiateEditCoupon(index) {
    editingCouponIndex = index;
    const coupon = couponsList[index];

    document.getElementById('edit-coupon-index').value = index;
    document.getElementById('coupon-code').value = coupon.code;
    document.getElementById('coupon-type').value = coupon.type;
    document.getElementById('coupon-value').value = coupon.value;
    document.getElementById('coupon-min-order').value = coupon.minOrder;
    document.getElementById('coupon-active').checked = coupon.active;

    document.getElementById('coupon-form-action-title').innerHTML = `<i data-lucide="edit" style="vertical-align: middle; margin-right: 4px;"></i> Edit Coupon: ${coupon.code}`;
    document.getElementById('coupon-submit-btn').querySelector('span').innerText = "Update Coupon";
    document.getElementById('cancel-coupon-edit-btn').style.display = 'inline-block';

    if (window.lucide) window.lucide.createIcons();
}

function cancelCouponEdit() {
    editingCouponIndex = -1;
    document.getElementById('coupon-form').reset();
    document.getElementById('edit-coupon-index').value = "-1";
    document.getElementById('coupon-active').checked = true;

    document.getElementById('coupon-form-action-title').innerHTML = `<i data-lucide="plus-circle" style="vertical-align: middle; margin-right: 4px;"></i> Add Coupon`;
    document.getElementById('coupon-submit-btn').querySelector('span').innerText = "Save Coupon";
    document.getElementById('cancel-coupon-edit-btn').style.display = 'none';

    if (window.lucide) window.lucide.createIcons();
}

function deleteCoupon(index) {
    const coupon = couponsList[index];
    if (confirm(`Are you sure you want to delete coupon code "${coupon.code}"?`)) {
        if (editingCouponIndex === index) {
            cancelCouponEdit();
        } else if (editingCouponIndex > index) {
            editingCouponIndex--;
        }

        couponsList.splice(index, 1);
        saveCouponsToStorage();
        renderCouponsStats();
        renderCouponsTable();
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

// --- Store Settings Implementation ---
function setupStoreSettings() {
    const phoneInput = document.getElementById('settings-phone');
    const upiInput = document.getElementById('settings-upi');
    const notifyMethodSelect = document.getElementById('settings-notify-method');
    const saveBtn = document.getElementById('btn-save-settings');
    const testBtn = document.getElementById('btn-test-notification');

    // Fields groups
    const fieldsCallmebot = document.getElementById('fields-callmebot');
    const fieldsDiscord = document.getElementById('fields-discord');
    const fieldsTelegram = document.getElementById('fields-telegram');

    // API Key / Token fields
    const callmebotApiKeyInput = document.getElementById('settings-callmebot-apikey');
    const discordWebhookInput = document.getElementById('settings-discord-webhook');
    const telegramTokenInput = document.getElementById('settings-telegram-token');
    const telegramChatIdInput = document.getElementById('settings-telegram-chatid');

    if (!phoneInput || !upiInput || !notifyMethodSelect || !saveBtn || !testBtn) return;

    // Load settings from storage
    function loadStoreSettings() {
        const DEFAULT_SETTINGS = {
            phone: "917695956938",
            upiId: "sidhjain9002-1@okhdfcbank",
            notificationMethod: "disabled",
            callmebotApiKey: "",
            discordWebhookUrl: "",
            telegramBotToken: "",
            telegramChatId: ""
        };

        let settings = { ...DEFAULT_SETTINGS };
        const saved = localStorage.getItem('lightning_deals_settings');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed && typeof parsed === 'object') {
                    settings = { ...DEFAULT_SETTINGS, ...parsed };
                }
            } catch (e) {
                console.error("Error parsing settings in admin:", e);
            }
        }

        window.loadStoreSettings = loadStoreSettings;

        // Fill form fields
        phoneInput.value = settings.phone;
        upiInput.value = settings.upiId;
        notifyMethodSelect.value = settings.notificationMethod;
        callmebotApiKeyInput.value = settings.callmebotApiKey || "";
        discordWebhookInput.value = settings.discordWebhookUrl || "";
        telegramTokenInput.value = settings.telegramBotToken || "";
        telegramChatIdInput.value = settings.telegramChatId || "";

        // Toggle subfields display
        toggleNotificationFields(settings.notificationMethod);

        // Update top summary cards
        updateSettingsSummaryCards(settings);
    }

    function toggleNotificationFields(method) {
        if (fieldsCallmebot) fieldsCallmebot.style.display = (method === 'callmebot') ? 'block' : 'none';
        if (fieldsDiscord) fieldsDiscord.style.display = (method === 'discord') ? 'block' : 'none';
        if (fieldsTelegram) fieldsTelegram.style.display = (method === 'telegram') ? 'block' : 'none';
    }

    function updateSettingsSummaryCards(settings) {
        const statPhone = document.getElementById('stat-settings-phone');
        const statUpi = document.getElementById('stat-settings-upi');
        const statNotify = document.getElementById('stat-settings-notify');

        if (statPhone) statPhone.innerText = settings.phone ? `+${settings.phone}` : "Not Configured";
        if (statUpi) statUpi.innerText = settings.upiId || "Not Configured";
        
        if (statNotify) {
            let displayMethod = "Disabled";
            if (settings.notificationMethod === 'callmebot') displayMethod = "WhatsApp";
            else if (settings.notificationMethod === 'discord') displayMethod = "Discord Webhook";
            else if (settings.notificationMethod === 'telegram') displayMethod = "Telegram Bot";
            statNotify.innerText = displayMethod;
        }
    }

    // Toggle fields on dropdown select change
    notifyMethodSelect.addEventListener('change', (e) => {
        toggleNotificationFields(e.target.value);
    });

    // Save Settings Event Listener
    saveBtn.addEventListener('click', () => {
        const phone = phoneInput.value.trim();
        const upiId = upiInput.value.trim();
        const notificationMethod = notifyMethodSelect.value;
        const callmebotApiKey = callmebotApiKeyInput.value.trim();
        const discordWebhookUrl = discordWebhookInput.value.trim();
        const telegramBotToken = telegramTokenInput.value.trim();
        const telegramChatId = telegramChatIdInput.value.trim();

        if (!phone) {
            alert("Reseller WhatsApp Number is required.");
            return;
        }
        if (!upiId) {
            alert("Reseller UPI ID is required.");
            return;
        }

        // Specific subfield validations
        if (notificationMethod === 'callmebot' && !callmebotApiKey) {
            alert("CallMeBot API Key is required when WhatsApp method is selected.");
            return;
        }
        if (notificationMethod === 'discord' && !discordWebhookUrl) {
            alert("Discord Webhook URL is required when Discord method is selected.");
            return;
        }
        if (notificationMethod === 'telegram') {
            if (!telegramBotToken) {
                alert("Telegram Bot Token is required when Telegram method is selected.");
                return;
            }
            if (!telegramChatId) {
                alert("Telegram Chat ID is required when Telegram method is selected.");
                return;
            }
        }

        const settings = {
            phone,
            upiId,
            notificationMethod,
            callmebotApiKey,
            discordWebhookUrl,
            telegramBotToken,
            telegramChatId
        };

        if (database) {
            database.ref('settings').set(settings)
                .then(() => console.log("Settings synced to Firebase."))
                .catch(err => console.error("Firebase settings sync failed:", err));
        }
        localStorage.setItem('lightning_deals_settings', JSON.stringify(settings));
        updateSettingsSummaryCards(settings);
        alert("Store settings saved successfully!");
    });

    // Test Alert Event Listener
    testBtn.addEventListener('click', () => {
        const phone = phoneInput.value.trim();
        const notificationMethod = notifyMethodSelect.value;
        const callmebotApiKey = callmebotApiKeyInput.value.trim();
        const discordWebhookUrl = discordWebhookInput.value.trim();
        const telegramBotToken = telegramTokenInput.value.trim();
        const telegramChatId = telegramChatIdInput.value.trim();

        if (notificationMethod === 'disabled') {
            alert("Please select a notification method (WhatsApp, Discord, or Telegram) to test.");
            return;
        }

        let messageText = `🔔 *Test Alert from Admin Dashboard!*\n\nYour store notification system is successfully configured and working. Ready to receive client orders!`;

        if (notificationMethod === 'callmebot') {
            if (!callmebotApiKey) {
                alert("Please enter your CallMeBot API key first.");
                return;
            }
            if (!phone) {
                alert("Please enter your Reseller WhatsApp Number first.");
                return;
            }
            const encodedMsg = encodeURIComponent(messageText);
            const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodedMsg}&apikey=${callmebotApiKey}`;
            
            alert("Sending WhatsApp test alert via CallMeBot...");
            fetch(url)
                .then(res => {
                    alert("WhatsApp test alert sent! Please check your phone.");
                })
                .catch(err => {
                    console.error(err);
                    alert("Error sending WhatsApp test alert: " + err.message);
                });
        } else if (notificationMethod === 'discord') {
            if (!discordWebhookUrl) {
                alert("Please enter a Discord Webhook URL first.");
                return;
            }
            const discordPayload = {
                embeds: [{
                    title: "🔔 Test Notification",
                    description: "Your store notification system is successfully configured and working. Ready to receive client orders!",
                    color: 3066993, // Green
                    timestamp: new Date().toISOString()
                }]
            };

            alert("Sending Discord test alert webhook...");
            fetch(discordWebhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(discordPayload)
            })
            .then(res => {
                if (res.ok) {
                    alert("Discord test alert sent successfully!");
                } else {
                    alert("Failed to send Discord webhook. Status code: " + res.status);
                }
            })
            .catch(err => {
                console.error(err);
                alert("Error sending Discord webhook: " + err.message);
            });
        } else if (notificationMethod === 'telegram') {
            if (!telegramBotToken || !telegramChatId) {
                alert("Please enter both Telegram Bot Token and Chat ID first.");
                return;
            }
            const text = encodeURIComponent(messageText);
            const url = `https://api.telegram.com/bot${telegramBotToken}/sendMessage?chat_id=${telegramChatId}&text=${text}&parse_mode=Markdown`;

            alert("Sending Telegram test message...");
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    if (data.ok) {
                        alert("Telegram test alert sent successfully!");
                    } else {
                        alert("Failed to send Telegram message: " + data.description);
                    }
                })
                .catch(err => {
                    console.error(err);
                    alert("Error sending Telegram message: " + err.message);
                });
        }
    });

    // Run initial load
    loadStoreSettings();

    // Export function to reload when clicking tab
    window.loadStoreSettings = loadStoreSettings;
}

// ==========================================================================
// RESELLER MESSAGE TEMPLATES & CUSTOM ANALYTICS & BULK ACTIONS
// ==========================================================================

// Global Seed Templates
const DEFAULT_TEMPLATES = [
    {
        id: "temp-canva",
        name: "Canva Pro Invite Link",
        text: "Hello {customer_name}! 👋\n\nThank you for choosing Canva Pro. Here is your team invite link to join our Premium Team:\n\n🔗 Invite Link: {invite_link}\n\nSimply click this link while logged in to upgrade your account instantly!\n\nWarranty Expiry: {expiry_date}\n\nLet us know if you need any assistance! ✨"
    },
    {
        id: "temp-adobe",
        name: "Adobe CC Activation",
        text: "Hello {customer_name}! 👋\n\nYour Adobe Creative Cloud subscription is now active on your email: {customer_email}.\n\nSteps to access:\n1. Go to adobe.com and log in with your email.\n2. Choose the profile/team license when prompted.\n3. Download your favorite creative apps!\n\nWarranty Expiry: {expiry_date}\n\nEnjoy your creative tools! 🎨"
    },
    {
        id: "temp-streaming",
        name: "Streaming Login Credentials",
        text: "Hello {customer_name}! 👋\n\nYour streaming account credentials are ready:\n\nService: {product_name} ({plan_name})\n📧 Email: {login_email}\n🔑 Password: {login_password}\n📌 Profile Name: {profile_name}\n🔒 Profile PIN: {profile_pin}\n\n*Please do not change the password or account settings to keep the warranty active.*\n\nWarranty Expiry: {expiry_date}\n\nHappy watching! 🍿"
    }
];

let templatesList = [];

function loadTemplates() {
    templatesList = safeGetLocalStorage('lightning_deals_templates', DEFAULT_TEMPLATES);
    if (!templatesList || !Array.isArray(templatesList) || templatesList.length === 0) {
        templatesList = [...DEFAULT_TEMPLATES];
        localStorage.setItem('lightning_deals_templates', JSON.stringify(templatesList));
    }
}

function saveTemplatesToStorage() {
    if (database) {
        database.ref('templates').set(templatesList)
            .then(() => console.log("Templates synced to Firebase."))
            .catch(err => console.error("Firebase templates sync failed:", err));
    }
    localStorage.setItem('lightning_deals_templates', JSON.stringify(templatesList));
}

function setupTemplatesForm() {
    const listContainer = document.getElementById('templates-list-container');
    if (!listContainer) return;

    if (!document.getElementById('template-editor-form-container')) {
        const editorDiv = document.createElement('div');
        editorDiv.id = 'template-editor-form-container';
        editorDiv.className = 'glass-card admin-form-card';
        editorDiv.style.display = 'none';
        editorDiv.style.marginBottom = '20px';
        editorDiv.style.padding = '1.5rem';
        editorDiv.innerHTML = `
            <h3 style="font-size: 1.1rem; color: var(--clr-cyan); margin-bottom: 12px;" id="template-form-title">Add New Reseller Template</h3>
            <form id="template-crud-form" onsubmit="return false;">
                <input type="hidden" id="template-edit-id" value="">
                <div class="form-group">
                    <label for="template-name" style="font-weight: 600; display: block; margin-bottom: 6px;">Template Name *</label>
                    <input type="text" id="template-name" placeholder="e.g. Canva Pro Team Invite" required style="width: 100%; padding: 8px; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: #fff; font-size: 0.9rem; margin-bottom: 12px;">
                </div>
                <div class="form-group">
                    <label for="template-text" style="font-weight: 600; display: block; margin-bottom: 6px;">Template Text *</label>
                    <textarea id="template-text" rows="6" placeholder="Write message with placeholders: {customer_name}, {product_name}, {plan_name}, {order_id}, {expiry_date}" required style="width: 100%; padding: 8px; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: #fff; font-size: 0.85rem; font-family: sans-serif; resize: vertical; margin-bottom: 12px;"></textarea>
                    <small style="color: var(--text-muted); display: block; margin-top: -6px; margin-bottom: 12px;">Placeholders: <code>{customer_name}</code>, <code>{customer_email}</code>, <code>{product_name}</code>, <code>{plan_name}</code>, <code>{order_id}</code>, <code>{expiry_date}</code></small>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button type="button" class="btn btn-primary btn-sm" id="btn-save-template">Save Template</button>
                    <button type="button" class="btn btn-secondary btn-sm" id="btn-cancel-template">Cancel</button>
                </div>
            </form>
        `;
        listContainer.parentNode.insertBefore(editorDiv, listContainer);
    }

    const btnAdd = document.getElementById('btn-add-template');
    const editorContainer = document.getElementById('template-editor-form-container');
    const btnSave = document.getElementById('btn-save-template');
    const btnCancel = document.getElementById('btn-cancel-template');

    if (btnAdd) {
        btnAdd.addEventListener('click', () => {
            document.getElementById('template-form-title').innerText = "Add New Reseller Template";
            document.getElementById('template-edit-id').value = "";
            document.getElementById('template-name').value = "";
            document.getElementById('template-text').value = "";
            editorContainer.style.display = 'block';
            editorContainer.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (btnCancel) {
        btnCancel.addEventListener('click', () => {
            editorContainer.style.display = 'none';
        });
    }

    if (btnSave) {
        btnSave.addEventListener('click', () => {
            const idVal = document.getElementById('template-edit-id').value;
            const nameVal = document.getElementById('template-name').value.trim();
            const textVal = document.getElementById('template-text').value.trim();

            if (!nameVal || !textVal) {
                alert("Please fill in all template fields.");
                return;
            }

            loadTemplates();

            if (idVal) {
                const idx = templatesList.findIndex(t => t.id === idVal);
                if (idx > -1) {
                    templatesList[idx].name = nameVal;
                    templatesList[idx].text = textVal;
                }
            } else {
                const newTemp = {
                    id: "temp-" + Date.now(),
                    name: nameVal,
                    text: textVal
                };
                templatesList.push(newTemp);
            }

            saveTemplatesToStorage();
            editorContainer.style.display = 'none';
            renderTemplates();
            alert("Template saved successfully!");
        });
    }
}

function renderTemplates() {
    loadTemplates();
    const listContainer = document.getElementById('templates-list-container');
    if (!listContainer) return;

    listContainer.innerHTML = '';

    if (templatesList.length === 0) {
        listContainer.innerHTML = `
            <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
                <i data-lucide="copy-slash" style="width: 36px; height: 36px; margin-bottom: 0.5rem; display: block; margin-left: auto; margin-right: auto; opacity: 0.5;"></i>
                No reseller templates found. Click Add New Template above to create one.
            </div>
        `;
        if (window.lucide) window.lucide.createIcons();
        return;
    }

    templatesList.forEach((temp) => {
        const card = document.createElement('div');
        card.className = 'glass-card';
        card.style.padding = '1.25rem';
        card.style.marginBottom = '1rem';
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.gap = '10px';

        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 8px;">
                <h4 style="color: #fff; font-weight: 600; font-size: 0.95rem; margin: 0;">${escapeHTML(temp.name)}</h4>
                <div style="display: flex; gap: 6px;">
                    <button class="btn btn-secondary btn-xs edit-temp-btn" data-id="${temp.id}" style="padding: 3px 8px;">
                        <i data-lucide="edit-3" style="width: 12px; height: 12px;"></i>
                    </button>
                    <button class="btn btn-danger btn-xs delete-temp-btn" data-id="${temp.id}" style="padding: 3px 8px;">
                        <i data-lucide="trash-2" style="width: 12px; height: 12px;"></i>
                    </button>
                </div>
            </div>
            <pre style="background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.05); border-radius: 6px; padding: 10px; font-family: monospace; font-size: 0.8rem; color: var(--text-secondary); white-space: pre-wrap; margin: 0; line-height: 1.4; max-height: 150px; overflow-y: auto;">${escapeHTML(temp.text)}</pre>
            <div style="display: flex; justify-content: flex-end;">
                <button class="btn btn-secondary btn-xs copy-temp-btn" data-id="${temp.id}" style="display: flex; align-items: center; gap: 4px;">
                    <i data-lucide="copy" style="width: 12px; height: 12px;"></i> <span>Copy Raw Template</span>
                </button>
            </div>
        `;

        card.querySelector('.edit-temp-btn').addEventListener('click', () => {
            const editorContainer = document.getElementById('template-editor-form-container');
            document.getElementById('template-form-title').innerText = "Edit Reseller Template";
            document.getElementById('template-edit-id').value = temp.id;
            document.getElementById('template-name').value = temp.name;
            document.getElementById('template-text').value = temp.text;
            if (editorContainer) {
                editorContainer.style.display = 'block';
                editorContainer.scrollIntoView({ behavior: 'smooth' });
            }
        });

        card.querySelector('.delete-temp-btn').addEventListener('click', () => {
            if (confirm(`Are you sure you want to delete template "${temp.name}"?`)) {
                saveTemplatesToStorage();
                renderTemplates();
            }
        });

        card.querySelector('.copy-temp-btn').addEventListener('click', () => {
            navigator.clipboard.writeText(temp.text).then(() => {
                const btn = card.querySelector('.copy-temp-btn');
                const initialHTML = btn.innerHTML;
                btn.innerHTML = `<i data-lucide="check" style="width: 12px; height: 12px;"></i> <span>Copied!</span>`;
                if (window.lucide) window.lucide.createIcons();
                setTimeout(() => {
                    btn.innerHTML = initialHTML;
                    if (window.lucide) window.lucide.createIcons();
                }, 2000);
            });
        });

        listContainer.appendChild(card);
    });

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

function updateBulkToolbar() {
    const toolbar = document.getElementById('bulk-actions-toolbar');
    const selectedCountEl = document.getElementById('bulk-selected-count');
    if (!toolbar || !selectedCountEl) return;

    const tbody = document.getElementById('admin-products-tbody');
    if (!tbody) return;

    const checkedBoxes = tbody.querySelectorAll('.bulk-select-row:checked');
    if (checkedBoxes.length > 0) {
        toolbar.style.display = 'flex';
        selectedCountEl.innerText = checkedBoxes.length;
    } else {
        toolbar.style.display = 'none';
        selectedCountEl.innerText = '0';
    }
}

function setupBulkActions() {
    const selectAllCheckbox = document.getElementById('bulk-select-all');
    const tbody = document.getElementById('admin-products-tbody');
    const actionSelect = document.getElementById('bulk-action-select');
    
    const inputCategory = document.getElementById('bulk-input-category');
    const inputDiscount = document.getElementById('bulk-input-discount');
    const inputVisibility = document.getElementById('bulk-input-visibility');
    const inputStock = document.getElementById('bulk-input-stock');
    
    const applyBtn = document.getElementById('bulk-apply-btn');
    const cancelBtn = document.getElementById('bulk-cancel-btn');

    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', () => {
            if (!tbody) return;
            const rows = tbody.querySelectorAll('.bulk-select-row');
            rows.forEach(cb => {
                cb.checked = selectAllCheckbox.checked;
            });
            updateBulkToolbar();
        });
    }

    if (actionSelect) {
        actionSelect.addEventListener('change', () => {
            const action = actionSelect.value;
            if (inputCategory) inputCategory.style.display = 'none';
            if (inputDiscount) inputDiscount.style.display = 'none';
            if (inputVisibility) inputVisibility.style.display = 'none';
            if (inputStock) inputStock.style.display = 'none';

            if (action === 'category' && inputCategory) inputCategory.style.display = 'inline-block';
            else if (action === 'discount' && inputDiscount) inputDiscount.style.display = 'inline-block';
            else if (action === 'visibility' && inputVisibility) inputVisibility.style.display = 'inline-block';
            else if (action === 'stock' && inputStock) inputStock.style.display = 'inline-block';
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            if (selectAllCheckbox) selectAllCheckbox.checked = false;
            if (tbody) {
                tbody.querySelectorAll('.bulk-select-row').forEach(cb => {
                    cb.checked = false;
                });
            }
            updateBulkToolbar();
        });
    }

    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            const action = actionSelect.value;
            if (!action) {
                alert("Please select a bulk action.");
                return;
            }

            if (!tbody) return;
            const checkedBoxes = tbody.querySelectorAll('.bulk-select-row:checked');
            if (checkedBoxes.length === 0) {
                alert("Please select at least one product.");
                return;
            }

            const indexes = [];
            checkedBoxes.forEach(cb => {
                const idx = parseInt(cb.getAttribute('data-index'));
                if (!isNaN(idx)) {
                    indexes.push(idx);
                }
            });

            if (action === 'delete') {
                if (confirm(`Are you sure you want to delete all ${indexes.length} selected products?`)) {
                    indexes.sort((a, b) => b - a);
                    indexes.forEach(idx => {
                        if (editingIndex === idx) cancelProductEdit();
                        else if (editingIndex > idx) editingIndex--;
                        productsList.splice(idx, 1);
                    });
                    saveCatalogToStorage();
                    renderCatalogStats();
                    renderProductsTable();
                    alert("Selected products deleted successfully.");
                }
                return;
            }

            indexes.forEach(idx => {
                const prod = productsList[idx];
                if (!prod) return;

                if (action === 'category') {
                    prod.category = inputCategory.value;
                } else if (action === 'visibility') {
                    prod.visible = (inputVisibility.value === 'true');
                } else if (action === 'stock') {
                    prod.stockStatus = inputStock.value;
                } else if (action === 'discount') {
                    const pct = parseFloat(inputDiscount.value) || 0;
                    if (pct > 0 && pct < 100) {
                        if (prod.plans && Array.isArray(prod.plans)) {
                            prod.plans.forEach(plan => {
                                plan.price = Math.round(plan.price * (1 - pct / 100));
                            });
                        }
                    }
                }
            });

            saveCatalogToStorage();
            renderCatalogStats();
            renderProductsTable();
            alert("Bulk action applied successfully.");
        });
    }
}

function renderAnalytics() {
    const visits = parseInt(localStorage.getItem('lightning_deals_visits')) || 0;
    const totalOrders = ordersList.filter(o => o).length;
    const conversionRate = visits > 0 ? ((totalOrders / visits) * 100).toFixed(1) : '0.0';
    
    const grossRevenue = ordersList
        .filter(o => o && (o.status === 'Delivered' || o.status === 'Paid via Stripe'))
        .reduce((sum, o) => sum + (o.price || 0), 0);

    const visitsEl = document.getElementById('stat-analytics-visits');
    const ordersEl = document.getElementById('stat-analytics-orders');
    const conversionEl = document.getElementById('stat-analytics-conversion');
    const revenueEl = document.getElementById('stat-analytics-revenue');

    if (visitsEl) visitsEl.innerText = visits;
    if (ordersEl) ordersEl.innerText = totalOrders;
    if (conversionEl) conversionEl.innerText = `${conversionRate}%`;
    if (revenueEl) revenueEl.innerText = `₹${grossRevenue.toLocaleString('en-IN')}`;

    const revenueContainer = document.getElementById('revenue-chart-container');
    if (revenueContainer) {
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            last7Days.push({
                dateStr: d.toLocaleDateString('en-IN').split(',')[0],
                label: d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
                revenue: 0
            });
        }

        ordersList.forEach(order => {
            if (!order || (order.status !== 'Delivered' && order.status !== 'Paid via Stripe')) return;
            if (order.date) {
                const datePart = order.date.split(',')[0].trim();
                const dayMatch = last7Days.find(d => d.dateStr === datePart);
                if (dayMatch) {
                    dayMatch.revenue += (order.price || 0);
                }
            }
        });

        const maxRevenue = Math.max(...last7Days.map(d => d.revenue), 1000);

        const width = 500;
        const height = 200;
        const paddingLeft = 55;
        const paddingRight = 20;
        const paddingTop = 20;
        const paddingBottom = 30;

        const chartWidth = width - paddingLeft - paddingRight;
        const chartHeight = height - paddingTop - paddingBottom;

        let points = '';
        let areaPoints = `${paddingLeft},${height - paddingBottom} `;
        
        const dots = [];
        const xCoords = [];
        const yCoords = [];

        last7Days.forEach((day, index) => {
            const x = paddingLeft + (index * (chartWidth / 6));
            const y = paddingTop + chartHeight - ((day.revenue / maxRevenue) * chartHeight);
            xCoords.push(x);
            yCoords.push(y);
            points += `${x},${y} `;
            areaPoints += `${x},${y} `;
            dots.push(`<circle cx="${x}" cy="${y}" r="4" fill="#00F2FE" stroke="#0a0f1d" stroke-width="2" />`);
        });
        areaPoints += `${paddingLeft + chartWidth},${height - paddingBottom}`;

        const yGridCount = 4;
        const yGrids = [];
        for (let i = 0; i <= yGridCount; i++) {
            const pct = i / yGridCount;
            const y = paddingTop + chartHeight - (pct * chartHeight);
            const val = Math.round(pct * maxRevenue);
            
            yGrids.push(`
                <line x1="${paddingLeft}" y1="${y}" x2="${width - paddingRight}" y2="${y}" stroke="rgba(255,255,255,0.05)" stroke-dasharray="3,3" />
                <text x="${paddingLeft - 10}" y="${y + 4}" fill="var(--text-muted)" font-size="9" text-anchor="end">₹${val >= 1000 ? (val/1000).toFixed(1) + 'k' : val}</text>
            `);
        }

        const xLabels = last7Days.map((day, index) => {
            const x = xCoords[index];
            return `<text x="${x}" y="${height - 10}" fill="var(--text-muted)" font-size="9" text-anchor="middle">${day.label}</text>`;
        });

        revenueContainer.innerHTML = `
            <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: 100%; overflow: visible;">
                <defs>
                    <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#00F2FE" stop-opacity="0.25"/>
                        <stop offset="100%" stop-color="#00F2FE" stop-opacity="0.00"/>
                    </linearGradient>
                </defs>
                
                ${yGrids.join('')}
                <path d="M ${areaPoints}" fill="url(#chart-grad)" />
                <polyline points="${points.trim()}" fill="none" stroke="var(--clr-cyan)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                ${dots.join('')}
                ${xLabels.join('')}
                <line x1="${paddingLeft}" y1="${height - paddingBottom}" x2="${width - paddingRight}" y2="${height - paddingBottom}" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
            </svg>
        `;
    }

    const productsContainer = document.getElementById('products-chart-container');
    if (productsContainer) {
        const productStats = {};
        
        ordersList.forEach(order => {
            if (!order) return;
            
            if (order.items && Array.isArray(order.items) && order.items.length > 0) {
                order.items.forEach(item => {
                    if (!item) return;
                    const name = item.name || '';
                    if (!productStats[name]) {
                        productStats[name] = { count: 0, revenue: 0 };
                    }
                    productStats[name].count += item.qty || 1;
                    if (order.status === 'Delivered' || order.status === 'Paid via Stripe') {
                        productStats[name].revenue += (item.price || 0) * (item.qty || 1);
                    }
                });
            } else if (order.product) {
                const name = order.product;
                if (!productStats[name]) {
                    productStats[name] = { count: 0, revenue: 0 };
                }
                productStats[name].count += 1;
                if (order.status === 'Delivered' || order.status === 'Paid via Stripe') {
                    productStats[name].revenue += order.price || 0;
                }
            }
        });

        const sortedProducts = Object.keys(productStats).map(name => ({
            name: name,
            count: productStats[name].count,
            revenue: productStats[name].revenue
        })).sort((a, b) => b.count - a.count).slice(0, 5);

        if (sortedProducts.length === 0) {
            productsContainer.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--text-muted); font-size: 0.85rem;">
                    No product sales data available to chart.
                </div>
            `;
            return;
        }

        const maxCount = Math.max(...sortedProducts.map(p => p.count), 1);

        const width = 500;
        const height = 200;
        const rowHeight = 32;
        const paddingTop = 15;
        const paddingLeft = 110;
        const paddingRight = 60;
        const chartWidth = width - paddingLeft - paddingRight;

        const barsHTML = sortedProducts.map((p, index) => {
            const y = paddingTop + (index * rowHeight) + 8;
            const barW = (p.count / maxCount) * chartWidth;
            
            return `
                <text x="${paddingLeft - 10}" y="${y + 11}" fill="#fff" font-size="9" text-anchor="end" font-weight="500">${escapeHTML(p.name.substring(0, 15))}</text>
                <rect x="${paddingLeft}" y="${y}" width="${chartWidth}" height="14" rx="4" ry="4" fill="rgba(255,255,255,0.02)" />
                <rect x="${paddingLeft}" y="${y}" width="${Math.max(barW, 4)}" height="14" rx="4" ry="4" fill="url(#bar-grad-${index})" />
                <text x="${paddingLeft + barW + 8}" y="${y + 11}" fill="var(--clr-cyan)" font-size="9" font-weight="bold">${p.count} Sold</text>
            `;
        });

        const gradsHTML = sortedProducts.map((p, index) => {
            const colors = [
                { s: '#00F2FE', e: '#4FACFE' },
                { s: '#B92B27', e: '#1565C0' },
                { s: '#F2994A', e: '#F2C94C' },
                { s: '#7F00FF', e: '#E100FF' },
                { s: '#11998E', e: '#38EF7D' }
            ];
            const c = colors[index % colors.length];
            return `
                <linearGradient id="bar-grad-${index}" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="${c.s}" />
                    <stop offset="100%" stop-color="${c.e}" />
                </linearGradient>
            `;
        });

        productsContainer.innerHTML = `
            <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: 100%; overflow: visible;">
                <defs>
                    ${gradsHTML.join('')}
                </defs>
                ${barsHTML.join('')}
            </svg>
        `;
    }
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

function openOrderDetailDrawer(index) {
    const order = ordersList[index];
    if (!order) return;

    const drawer = document.getElementById('order-detail-drawer');
    const container = document.getElementById('drawer-body-content');
    if (!drawer || !container) return;

    if (order.replacementsClaimed === undefined) order.replacementsClaimed = 0;
    if (!order.notes) order.notes = "";
    
    let actDateVal = order.activationDate || "";
    if (!actDateVal && order.date) {
        try {
            const parts = order.date.split(',');
            const datePart = parts[0].trim();
            if (datePart.includes('/')) {
                const dp = datePart.split('/');
                if (dp[2] && dp[2].length === 4) {
                    actDateVal = `${dp[2]}-${dp[1].padStart(2, '0')}-${dp[0].padStart(2, '0')}`;
                }
            } else {
                const d = new Date(datePart);
                if (!isNaN(d.getTime())) {
                    actDateVal = d.toISOString().split('T')[0];
                }
            }
        } catch(e) {}
    }
    if (!actDateVal) {
        actDateVal = new Date().toISOString().split('T')[0];
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

    let templates = safeGetLocalStorage('lightning_deals_templates', []);
    if (templates.length === 0) {
        templates = typeof DEFAULT_TEMPLATES !== 'undefined' ? DEFAULT_TEMPLATES : [];
    }

    let templateOptionsHTML = '<option value="">Select a template...</option>';
    templates.forEach(t => {
        templateOptionsHTML += `<option value="${t.id}">${escapeHTML(t.name)}</option>`;
    });

    let screenshotHTML = '';
    if (order.screenshot) {
        screenshotHTML = `
            <div class="drawer-screenshot-wrapper" style="margin-top: 15px;">
                <label style="font-weight: 600; display: block; margin-bottom: 6px;">Payment Receipt Screenshot</label>
                <div class="drawer-screenshot-thumbnail-container" style="position: relative; border-radius: 8px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); width: 120px; height: 120px; cursor: pointer;" id="drawer-screenshot-thumb">
                    <img src="${order.screenshot}" style="width: 100%; height: 100%; object-fit: cover;" alt="Thumbnail">
                    <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s;" class="thumb-hover-overlay">
                        <i data-lucide="eye" style="width: 20px; height: 20px; color: #fff;"></i>
                    </div>
                </div>
            </div>
        `;
    } else {
        screenshotHTML = `
            <div style="margin-top: 15px;">
                <label style="font-weight: 600; display: block; margin-bottom: 6px;">Payment Receipt Screenshot</label>
                <div style="padding: 1rem; border: 1px dashed rgba(255,255,255,0.08); border-radius: 8px; color: var(--text-muted); font-size: 0.85rem; text-align: center;">
                    No payment receipt uploaded for this order.
                </div>
            </div>
        `;
    }

    container.innerHTML = `
        <div class="drawer-section">
            <h4 style="color: var(--clr-cyan); margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 6px;">Order Summary</h4>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; font-size: 0.85rem;">
                <div><strong>Order ID:</strong> <span style="font-family: monospace;">${escapeHTML(order.id)}</span></div>
                <div><strong>Date:</strong> ${escapeHTML(order.date)}</div>
                <div><strong>Customer:</strong> ${escapeHTML(order.name)}</div>
                <div><strong>WhatsApp:</strong> +${escapeHTML(order.phone)}</div>
                <div><strong>Email:</strong> ${escapeHTML(order.email)}</div>
                <div><strong>UTR ID:</strong> <span style="font-family: monospace;">${escapeHTML(order.utr)}</span></div>
                <div><strong>Product:</strong> ${escapeHTML(order.product)}</div>
                <div><strong>Plan:</strong> ${escapeHTML(order.plan)}</div>
                <div><strong>Price Paid:</strong> ₹${order.price.toLocaleString('en-IN')}</div>
                <div><strong>Current Status:</strong> <span class="badge-status badge-status-${order.status.toLowerCase().replace(/\s+/g, '-')}" style="font-size: 0.75rem; padding: 2px 6px;">${escapeHTML(order.status)}</span></div>
            </div>
        </div>

        <div class="drawer-section" style="margin-top: 20px;">
            <h4 style="color: var(--clr-cyan); margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 6px;">Activation & Warranty Details</h4>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                <div class="form-group" style="margin-bottom: 0;">
                    <label for="drawer-activation-date" style="font-weight: 600;">Activation Date</label>
                    <input type="date" id="drawer-activation-date" value="${actDateVal}" style="width: 100%; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 6px; color: #fff; font-size: 0.85rem;">
                </div>
                <div class="form-group" style="margin-bottom: 0;">
                    <label for="drawer-warranty-term" style="font-weight: 600;">Warranty Term</label>
                    <select id="drawer-warranty-term" style="width: 100%; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 6px; color: #fff; font-size: 0.85rem;">
                        <option value="1" ${termMonths == 1 ? 'selected' : ''}>1 Month</option>
                        <option value="2" ${termMonths == 2 ? 'selected' : ''}>2 Months</option>
                        <option value="3" ${termMonths == 3 ? 'selected' : ''}>3 Months</option>
                        <option value="6" ${termMonths == 6 ? 'selected' : ''}>6 Months</option>
                        <option value="12" ${termMonths == 12 ? 'selected' : ''}>12 Months (1 Year)</option>
                        <option value="9999" ${termMonths == 9999 ? 'selected' : ''}>Lifetime</option>
                    </select>
                </div>
            </div>
            
            <div style="margin-top: 15px; display: flex; align-items: center; justify-content: space-between;">
                <span style="font-weight: 600; font-size: 0.85rem;">Claimed Replacements Count</span>
                <div class="qty-selector" style="margin-top: 0;">
                    <button type="button" class="qty-btn" id="btn-rep-minus" style="width: 28px; height: 28px; line-height: 26px;">−</button>
                    <span class="qty-display" id="drawer-rep-count" style="width: 32px; text-align: center; font-size: 0.9rem; font-weight: 700; color: var(--text-primary);">${order.replacementsClaimed}</span>
                    <button type="button" class="qty-btn" id="btn-rep-plus" style="width: 28px; height: 28px; line-height: 26px;">+</button>
                </div>
            </div>
        </div>

        <div class="drawer-section" style="margin-top: 20px;">
            <h4 style="color: var(--clr-cyan); margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 6px;">Customer Notes Memo</h4>
            <div class="form-group" style="margin-bottom: 0;">
                <textarea id="drawer-notes" rows="3" placeholder="Add custom reseller activation notes, credentials, account logins, customer notes, etc." style="width: 100%; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 8px; color: #fff; font-size: 0.85rem; resize: vertical;">${escapeHTML(order.notes)}</textarea>
            </div>
        </div>

        ${screenshotHTML}

        <div class="drawer-section" style="margin-top: 25px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px;">
            <h4 style="color: var(--clr-cyan); margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 6px;">Copy Reseller Activation Template</h4>
            <div class="form-row" style="margin-bottom: 10px;">
                <div class="form-group" style="margin-bottom: 0; width: 100%;">
                    <label for="drawer-template-select" style="font-weight: 600;">Choose Template</label>
                    <select id="drawer-template-select" style="width: 100%; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 6px; color: #fff; font-size: 0.85rem;">
                        ${templateOptionsHTML}
                    </select>
                </div>
            </div>
            <div class="form-group" style="margin-bottom: 10px;">
                <textarea id="drawer-template-preview" rows="5" placeholder="Select a template above to generate copyable activation message." style="width: 100%; background: rgba(0,0,0,0.1); border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; padding: 8px; color: var(--text-secondary); font-size: 0.8rem; resize: vertical; font-family: sans-serif;" readonly></textarea>
            </div>
            <button class="btn btn-secondary w-100 btn-xs" id="btn-drawer-copy-template" style="display: flex; align-items: center; justify-content: center; gap: 6px; padding: 8px 12px;" disabled>
                <i data-lucide="copy" style="width: 14px; height: 14px;"></i> <span>Copy Activation Message</span>
            </button>
        </div>

        <div style="margin-top: 25px; display: flex; gap: 10px;">
            <button class="btn btn-primary w-100" id="btn-save-drawer-data">
                <i data-lucide="save" style="width: 15px; height: 15px; margin-right: 6px; vertical-align: middle; display: inline-block;"></i>
                <span>Save Changes</span>
            </button>
        </div>
    `;

    drawer.classList.add('active');

    if (window.lucide) {
        window.lucide.createIcons();
    }

    const btnMinus = document.getElementById('btn-rep-minus');
    const btnPlus = document.getElementById('btn-rep-plus');
    const repCountEl = document.getElementById('drawer-rep-count');
    let repCount = order.replacementsClaimed;

    if (btnMinus && btnPlus && repCountEl) {
        btnMinus.addEventListener('click', () => {
            if (repCount > 0) {
                repCount--;
                repCountEl.innerText = repCount;
            }
        });
        btnPlus.addEventListener('click', () => {
            repCount++;
            repCountEl.innerText = repCount;
        });
    }

    const thumb = document.getElementById('drawer-screenshot-thumb');
    if (thumb) {
        const overlay = thumb.querySelector('.thumb-hover-overlay');
        thumb.addEventListener('mouseenter', () => {
            overlay.style.opacity = '1';
        });
        thumb.addEventListener('mouseleave', () => {
            overlay.style.opacity = '0';
        });
        thumb.addEventListener('click', () => {
            const lightbox = document.getElementById('admin-lightbox');
            const lightboxImg = document.getElementById('lightbox-image-view');
            if (lightbox && lightboxImg) {
                lightboxImg.src = order.screenshot;
                lightbox.classList.add('active');
            }
        });
    }

    const templateSelect = document.getElementById('drawer-template-select');
    const templatePreview = document.getElementById('drawer-template-preview');
    const btnCopyTemplate = document.getElementById('btn-drawer-copy-template');

    if (templateSelect && templatePreview && btnCopyTemplate) {
        templateSelect.addEventListener('change', () => {
            const tempId = templateSelect.value;
            if (!tempId) {
                templatePreview.value = "";
                btnCopyTemplate.disabled = true;
                return;
            }

            const chosen = templates.find(t => t.id === tempId);
            if (!chosen) {
                templatePreview.value = "";
                btnCopyTemplate.disabled = true;
                return;
            }

            let actDateStr = document.getElementById('drawer-activation-date').value;
            let currentWarrantyTerm = parseInt(document.getElementById('drawer-warranty-term').value);
            
            let expiryDateStr = "N/A (Lifetime)";
            if (currentWarrantyTerm !== 9999) {
                let actDate = new Date(actDateStr);
                if (isNaN(actDate.getTime())) actDate = new Date();
                actDate.setMonth(actDate.getMonth() + currentWarrantyTerm);
                expiryDateStr = actDate.toLocaleDateString('en-IN');
            }

            let text = chosen.text;
            text = text.replace(/{customer_name}/g, order.name || '');
            text = text.replace(/{customer_email}/g, order.email || '');
            text = text.replace(/{customer_phone}/g, order.phone || '');
            text = text.replace(/{product_name}/g, order.product || '');
            text = text.replace(/{plan_name}/g, order.plan || '');
            text = text.replace(/{order_id}/g, order.id || '');
            text = text.replace(/{expiry_date}/g, expiryDateStr);

            templatePreview.value = text;
            btnCopyTemplate.disabled = false;
        });

        btnCopyTemplate.addEventListener('click', () => {
            const textToCopy = templatePreview.value;
            if (!textToCopy) return;

            navigator.clipboard.writeText(textToCopy).then(() => {
                const initialHTML = btnCopyTemplate.innerHTML;
                btnCopyTemplate.innerHTML = `<i data-lucide="check" style="width: 14px; height: 14px; margin-right: 4px;"></i> <span>Copied!</span>`;
                if (window.lucide) window.lucide.createIcons();
                
                setTimeout(() => {
                    btnCopyTemplate.innerHTML = initialHTML;
                    if (window.lucide) window.lucide.createIcons();
                }, 2000);
            }).catch(err => {
                alert("Failed to copy automatically: " + err.message);
            });
        });
    }

    const saveBtn = document.getElementById('btn-save-drawer-data');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const actDate = document.getElementById('drawer-activation-date').value;
            const warrantyTerm = parseInt(document.getElementById('drawer-warranty-term').value);
            const notes = document.getElementById('drawer-notes').value;

            order.activationDate = actDate;
            order.warrantyTerm = warrantyTerm;
            order.replacementsClaimed = repCount;
            order.notes = notes;

            ordersList[index] = order;
            saveOrdersToStorage();
            
            renderOrdersStats();
            renderOrdersTable();

            drawer.classList.remove('active');
            alert("Order details updated successfully!");
        });
    }
}
