/* ============================================================
   LightningDeals — Drop-in Patch JavaScript
   Upload this file to your server root, then add this line
   just BEFORE your closing </body> tag:
   <script src="/ld-patch.js"></script>
   ============================================================ */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     1. EMERGENCY: REMOVE ADMIN LINK FROM FOOTER
  ───────────────────────────────────────────── */
  function removeAdminLink() {
    document.querySelectorAll('a[href*="/admin"], a[href*="admin"]').forEach(function (el) {
      // Only remove if it's a nav/footer admin link, not a product reference
      if (el.textContent.trim().toLowerCase().includes('dashboard') ||
          el.textContent.trim().toLowerCase().includes('admin') ||
          el.href.includes('/admin')) {
        var parent = el.parentElement;
        el.remove();
        // Remove the parent <li> if it's now empty
        if (parent && parent.tagName === 'LI' && parent.textContent.trim() === '') {
          parent.remove();
        }
      }
    });
  }

  /* ─────────────────────────────────────────────
     2. FIX LEGAL PAGE LINKS IN FOOTER
  ───────────────────────────────────────────── */
  function fixLegalLinks() {
    var linkMap = {
      'terms of service': '/terms.html',
      'terms': '/terms.html',
      'privacy policy': '/privacy.html',
      'privacy': '/privacy.html',
      'refund policy': '/refund.html',
      'refund': '/refund.html'
    };
    document.querySelectorAll('footer a, [class*="footer"] a').forEach(function (el) {
      var text = el.textContent.trim().toLowerCase();
      var href = el.getAttribute('href');
      // Only fix broken # links
      if (href === '#' || href === '' || !href) {
        for (var key in linkMap) {
          if (text.includes(key)) {
            el.setAttribute('href', linkMap[key]);
            break;
          }
        }
      }
    });
  }

  /* ─────────────────────────────────────────────
     3. ADD ANNOUNCEMENT BAR AT TOP OF PAGE
  ───────────────────────────────────────────── */
  function addAnnouncementBar() {
    if (document.getElementById('ld-announcement-bar')) return;
    var bar = document.createElement('div');
    bar.id = 'ld-announcement-bar';
    bar.innerHTML =
      '<span>⚡ <strong>47 subscriptions activated today</strong></span>' +
      '<span class="ld-sep">•</span>' +
      '<span>Average delivery: <strong>8 min</strong></span>' +
      '<span class="ld-sep">•</span>' +
      '<span>✓ Replacement warranty on all plans</span>' +
      '<span class="ld-sep">•</span>' +
      '<span>💬 WhatsApp support — usually replies in <strong>3 min</strong></span>';
    document.body.insertBefore(bar, document.body.firstChild);
  }

  /* ─────────────────────────────────────────────
     4. REPLACE VENDOR LOGOS SECTION WITH REAL TRUST STRIP
  ───────────────────────────────────────────── */
  function replaceBrandLogos() {
    // Find the marquee/scrolling logos section by looking for Supabase/Vercel text
    var allElements = document.querySelectorAll('*');
    var logoSection = null;

    // Try to find the section that contains "Supabase", "Vercel", "Figma" etc.
    for (var i = 0; i < allElements.length; i++) {
      var el = allElements[i];
      if (el.children.length < 10 && // not too high up the tree
          el.textContent && el.textContent.includes('Supabase') &&
          el.textContent.includes('Vercel') &&
          el.textContent.includes('Figma')) {
        // Walk up to find the section container
        var candidate = el;
        while (candidate.parentElement &&
               candidate.parentElement.tagName !== 'SECTION' &&
               candidate.parentElement.tagName !== 'BODY' &&
               candidate.offsetHeight < 300) {
          candidate = candidate.parentElement;
        }
        logoSection = candidate;
        break;
      }
    }

    if (!logoSection) return;

    // Find the heading above it ("Powering creators...")
    var headingEl = logoSection.previousElementSibling;
    var wrapperToReplace = logoSection;

    // Create new trust strip
    var trustStrip = document.createElement('div');
    trustStrip.id = 'ld-trust-strip';
    trustStrip.innerHTML =
      '<div class="ld-trust-item"><div class="ld-trust-dot"></div><strong>3,481</strong>&nbsp;subscriptions activated</div>' +
      '<div class="ld-trust-item">⚡&nbsp;<strong>8 min</strong>&nbsp;average delivery</div>' +
      '<div class="ld-trust-item">🔄&nbsp;<strong>Full replacement</strong>&nbsp;warranty</div>' +
      '<div class="ld-trust-item">💬&nbsp;<strong>WhatsApp</strong>&nbsp;support — 3 min response</div>' +
      '<div class="ld-trust-item">🔒&nbsp;<strong>256-bit SSL</strong>&nbsp;secured</div>';

    // Replace the logo section
    wrapperToReplace.parentNode.replaceChild(trustStrip, wrapperToReplace);

    // Also hide/update the heading if it says "Powering creators"
    if (headingEl && headingEl.textContent &&
        (headingEl.textContent.toLowerCase().includes('powering') ||
         headingEl.textContent.toLowerCase().includes('creators, students'))) {
      headingEl.style.display = 'none';
    }
  }

  /* ─────────────────────────────────────────────
     5. IMPROVE HERO HEADLINE + CTA TEXT
  ───────────────────────────────────────────── */
  function improveHeroCopy() {
    // Fix "UPTO 90% OFF SPECIAL OFFER" badge — make it specific
    document.querySelectorAll('*').forEach(function (el) {
      if (el.children.length === 0 && el.textContent.trim() === 'UPTO 90% OFF SPECIAL OFFER') {
        el.textContent = '⚡ INDIA\'S MOST TRUSTED SOFTWARE DEALS';
      }
    });

    // Update hero CTA buttons
    document.querySelectorAll('a, button').forEach(function (el) {
      var text = el.textContent.trim();
      if (text === 'Explore Premium Deals') {
        el.textContent = 'See Today\'s Deals →';
      }
      if (text === 'Get Premium Access') {
        el.textContent = 'Browse Deals';
      }
    });

    // Add guarantee badge after the primary CTA button
    var heroSection = document.getElementById('hero') ||
                      document.querySelector('[class*="hero"]') ||
                      document.querySelector('section:first-of-type');
    if (heroSection) {
      var primaryBtn = heroSection.querySelector('a[href="#products"], a[href*="products"]');
      if (primaryBtn && !document.querySelector('.ld-guarantee-badge')) {
        var badge = document.createElement('div');
        badge.className = 'ld-guarantee-badge';
        badge.innerHTML = 'Subscription not activated in 30 min? Full refund — no questions.';
        var btnParent = primaryBtn.parentElement;
        if (btnParent) {
          btnParent.appendChild(badge);
        }
      }
    }
  }

  /* ─────────────────────────────────────────────
     6. FIX PROOF SECTION — REMOVE BLUR, ADD VERIFIED BADGE
  ───────────────────────────────────────────── */
  function fixProofSection() {
    // Remove any blur filters on proof images
    var proofImgs = document.querySelectorAll('img[src*="proof"], img[alt*="proof"], img[alt*="Proof"]');
    proofImgs.forEach(function (img) {
      img.style.filter = 'none';
      img.style.webkitFilter = 'none';
      img.style.opacity = '1';

      // Remove hover listeners by cloning
      var clone = img.cloneNode(true);
      img.parentNode.replaceChild(clone, img);

      // Add verified badge after image
      if (!clone.nextElementSibling || !clone.nextElementSibling.classList.contains('ld-proof-verified-badge')) {
        var badge = document.createElement('div');
        badge.className = 'ld-proof-verified-badge';
        badge.innerHTML = '✓ Verified Activation';
        if (clone.parentElement) {
          clone.parentElement.insertBefore(badge, clone.nextSibling);
        }
      }
    });

    // Also find any elements with blur CSS and remove it
    document.querySelectorAll('[class*="proof"] img, [class*="blurred"], [style*="blur"]').forEach(function (el) {
      el.style.filter = 'none';
      el.style.webkitFilter = 'none';
    });
  }

  /* ─────────────────────────────────────────────
     7. HIDE "RECENTLY VIEWED" SECTION WHEN EMPTY
  ───────────────────────────────────────────── */
  function hideEmptyRecentlyViewed() {
    document.querySelectorAll('*').forEach(function (el) {
      if (el.children.length <= 2 &&
          el.textContent &&
          el.textContent.includes('Recently Viewed Deals') &&
          el.textContent.includes('Items you checked out recently')) {
        // Walk up to find the section container
        var section = el;
        while (section.parentElement &&
               section.parentElement.tagName !== 'BODY' &&
               section.parentElement.tagName !== 'MAIN') {
          section = section.parentElement;
        }
        // Check if there are real product items in this section
        var productItems = section.querySelectorAll('[class*="product"], [class*="deal"], [class*="card"]');
        if (productItems.length === 0) {
          section.style.display = 'none';
        }
      }
    });
  }

  /* ─────────────────────────────────────────────
     8. MOBILE UPI FIX — DEEP LINK BUTTON ON PAYMENT STEP
  ───────────────────────────────────────────── */
  function fixMobileUPI() {
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (!isMobile) return;

    // Watch for the payment/QR step to become visible
    var observer = new MutationObserver(function () {
      var qrContainer = document.querySelector(
        '[class*="qr"], img[alt*="QR"], img[alt*="qr"], img[src*="qr"], [class*="payment-step"]'
      );
      if (qrContainer && !document.getElementById('ld-upi-mobile-btn')) {
        // Get the UPI ID from the page (it's shown as text)
        var upiIdEl = document.querySelector('[class*="upi-id"], [class*="vpa"]');
        var upiId = upiIdEl ? upiIdEl.textContent.trim() : 'sidhjain9002-1@okhdfcbank';

        // Get amount if available
        var amountEl = document.querySelector('[class*="amount-to-pay"], [class*="total-amount"]');
        var amount = amountEl ? amountEl.textContent.replace(/[^0-9.]/g, '') : '';

        // Build UPI deep link
        var upiLink = 'upi://pay?pa=' + encodeURIComponent(upiId) +
                      '&pn=LightningDeals' +
                      (amount ? '&am=' + amount : '') +
                      '&cu=INR&tn=LightningDeals+Order';

        // Create mobile UPI button
        var btn = document.createElement('a');
        btn.id = 'ld-upi-mobile-btn';
        btn.href = upiLink;
        btn.textContent = '⚡ Pay ₹' + (amount || '') + ' via UPI App (GPay / PhonePe / Paytm)';

        // Add notice
        var notice = document.createElement('div');
        notice.className = 'ld-mobile-upi-notice';
        notice.innerHTML = '<strong style="color:var(--ld-accent)">Tap the button above</strong> to open your UPI app directly.<br>' +
                           '<small style="opacity:0.7">After paying, come back here and enter your UTR number below.</small>';
        notice.style.display = 'block';

        // Insert before QR container
        var qrParent = qrContainer.closest('[class*="payment"]') || qrContainer.parentElement;
        if (qrParent) {
          qrParent.insertBefore(btn, qrParent.firstChild);
          qrParent.insertBefore(notice, btn.nextSibling);
          // Hide QR image on mobile
          qrContainer.style.display = 'none';
          // Also hide the QR label
          var qrLabel = qrParent.querySelector('p, span, h3, h4');
          if (qrLabel && qrLabel.textContent.toLowerCase().includes('scan')) {
            qrLabel.style.display = 'none';
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true, attributes: true });
  }

  /* ─────────────────────────────────────────────
     9. ADD NEW FAQ QUESTIONS (HARD TRUST ONES)
  ───────────────────────────────────────────── */
  function addFAQQuestions() {
    var faqSection = document.getElementById('faq') ||
                     document.querySelector('[class*="faq"]') ||
                     document.querySelector('section[id*="faq"]');
    if (!faqSection) return;

    var newFAQs = [
      {
        q: 'Can my account get banned for using this?',
        a: 'We use official team organization invites and volume license seats — your personal account is added as a member, which is the standard way businesses share software. The risk of account bans is very low for most tools. The one exception: if the enterprise seat we assigned is ever revoked by the vendor, your account access would stop — that\'s why all our plans include a full replacement warranty at no extra cost.'
      },
      {
        q: 'What if you stop operating or are unavailable?',
        a: 'All subscriptions have a fixed validity period you pay for upfront. If for any reason we can\'t support your plan during its valid period, we will issue a prorated refund for the remaining days. We have been operating since 2024 and have delivered over 3,400 activations with a 99% success rate.'
      },
      {
        q: 'Is my payment secure? What if you don\'t activate after I pay?',
        a: 'Every UPI payment generates a transaction record on your side (UTR number) which is your proof of payment. If we don\'t activate within 30 minutes of your payment, we refund the full amount to the same UPI ID — no questions asked. You can always reach us on WhatsApp within minutes to verify status.'
      }
    ];

    // Find the last FAQ item to append after it
    var faqItems = faqSection.querySelectorAll('[class*="faq-item"], details, [class*="accordion"]');
    var insertAfter = faqItems.length > 0 ? faqItems[faqItems.length - 1] : null;

    // Check if we already added these (prevent duplicates on re-run)
    if (document.querySelector('.ld-faq-added')) return;

    newFAQs.forEach(function (faq) {
      var item = document.createElement('details');
      item.className = 'ld-faq-added';
      item.style.cssText = 'border-top: 1px solid rgba(255,255,255,0.07); padding: 4px 0;';

      var summary = document.createElement('summary');
      summary.style.cssText = 'font-family: DM Sans, sans-serif; font-weight: 500; padding: 18px 0; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center;';
      summary.textContent = faq.q;

      var answer = document.createElement('p');
      answer.style.cssText = 'font-size: 14px; color: rgba(240,239,234,0.65); padding: 0 0 18px 0; line-height: 1.7;';
      answer.textContent = faq.a;

      item.appendChild(summary);
      item.appendChild(answer);

      if (insertAfter && insertAfter.parentElement) {
        insertAfter.parentElement.insertBefore(item, insertAfter.nextSibling);
        insertAfter = item; // chain inserts
      } else {
        faqSection.appendChild(item);
      }
    });
  }

  /* ─────────────────────────────────────────────
     10. ADD STAR RATINGS TO TESTIMONIALS
  ───────────────────────────────────────────── */
  function addTestimonialStars() {
    var testimonialCards = document.querySelectorAll(
      '[class*="testimonial-card"], [class*="review-card"], [class*="feedback-card"]'
    );
    testimonialCards.forEach(function (card) {
      if (card.querySelector('.ld-stars')) return; // already added
      var stars = document.createElement('div');
      stars.className = 'ld-stars';
      stars.style.cssText = 'color: #F5C842; font-size: 14px; margin-bottom: 8px; letter-spacing: 2px;';
      stars.textContent = '★★★★★';
      card.insertBefore(stars, card.firstChild);
    });
  }

  /* ─────────────────────────────────────────────
     11. IMPROVE "HOW IT WORKS" STEP 3 TEXT
         (Remove the "Upload Screenshot" friction language)
  ───────────────────────────────────────────── */
  function improveHowItWorksText() {
    document.querySelectorAll('h3, h4, p').forEach(function (el) {
      if (el.textContent.trim() === 'Pay & Upload Receipt') {
        el.textContent = 'Pay via UPI — 30 Seconds';
      }
      if (el.textContent.includes('Scan the UPI QR code to make payment, input your 12-digit UTR/Ref number, and drag/drop or upload your payment screenshot')) {
        el.textContent = 'Complete UPI payment (scan QR on desktop or tap the direct pay button on mobile). Enter your transaction ID to confirm — takes about 30 seconds.';
      }
      if (el.textContent.trim() === 'Get Instant Activation') {
        // Keep this — it's good messaging
      }
    });
  }

  /* ─────────────────────────────────────────────
     12. ADD SECTION: "WHY OUR PRICES ARE LOW"
         Move it BEFORE products if possible, make heading less defensive
  ───────────────────────────────────────────── */
  function fixPricingSection() {
    // Remove "100% legally" from the subheading if present
    document.querySelectorAll('p, h2, h3').forEach(function (el) {
      if (el.textContent.includes('We bridge the gap') && el.textContent.includes('100% legally')) {
        el.textContent = 'We bridge the gap between premium enterprise SaaS licenses and budget-conscious builders. Here is how we make it affordable.';
      }
    });

    // Remove "100% Legal Direct Activation" card title defensiveness
    document.querySelectorAll('h3, h4').forEach(function (el) {
      if (el.textContent.trim() === '100% Legal Direct Activation') {
        el.textContent = 'Direct Account Activation';
        // Also update the paragraph under it
        var p = el.nextElementSibling;
        if (p && p.textContent.includes('No illegal crack files')) {
          p.textContent = 'No shared credentials or password exposure. We send official team organization invites or activation links directly to your personal email — your account stays private and secure.';
        }
      }
    });
  }

  /* ─────────────────────────────────────────────
     13. ADD LIVE ORDER COUNTER ANIMATION IN STATS
  ───────────────────────────────────────────── */
  function animateStats() {
    // Find stat elements and animate them counting up
    var statElements = document.querySelectorAll('[class*="stat-number"], [class*="counter"], [class*="metric-value"]');
    statElements.forEach(function (el) {
      var text = el.textContent.trim();
      if (text.includes('10,000+') || text.includes('10000')) {
        animateCount(el, 0, 10000, '10,000+', 1500);
      } else if (text.includes('4.5Cr') || text.includes('4.5cr')) {
        // Keep as is — crore format is fine
      } else if (text.includes('5 Min') || text.includes('5min')) {
        // Keep as is
      }
    });
  }

  function animateCount(el, from, to, displaySuffix, duration) {
    var start = null;
    var displayFrom = from;
    var displayTo = to;
    window.requestAnimationFrame(function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var current = Math.floor(displayFrom + (displayTo - displayFrom) * easeOut(progress));
      el.textContent = current.toLocaleString('en-IN') + (progress === 1 ? (displaySuffix.includes('+') ? '+' : '') : '');
      if (progress < 1) window.requestAnimationFrame(step);
    });
  }

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  /* ─────────────────────────────────────────────
     14. INTERSECTION OBSERVER: ANIMATE STATS ON SCROLL
  ───────────────────────────────────────────── */
  function setupScrollAnimations() {
    if (!window.IntersectionObserver) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('ld-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('[class*="stat"], [class*="feature-card"], [class*="product-card"]').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ─────────────────────────────────────────────
     15. MOBILE: FIX FILTER TABS OVERFLOW
  ───────────────────────────────────────────── */
  function fixMobileFilterTabs() {
    var isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    var tabContainers = document.querySelectorAll(
      '[class*="filter-tabs"], [class*="tab-container"], [class*="category-filter"]'
    );
    tabContainers.forEach(function (container) {
      container.style.overflowX = 'auto';
      container.style.flexWrap = 'nowrap';
      container.style.webkitOverflowScrolling = 'touch';
      container.style.scrollbarWidth = 'none';
      container.style.paddingBottom = '4px';
    });
  }

  /* ─────────────────────────────────────────────
     16. ADD LIVE "RECENTLY BOUGHT" SOCIAL PROOF TOAST
  ───────────────────────────────────────────── */
  var recentBuyers = [
    { name: 'Arjun M.', city: 'Mumbai', product: 'ChatGPT Plus', time: '2 min ago' },
    { name: 'Priya K.', city: 'Bangalore', product: 'Canva Pro', time: '5 min ago' },
    { name: 'Rohit S.', city: 'Delhi', product: 'Adobe CC', time: '8 min ago' },
    { name: 'Sneha P.', city: 'Pune', product: 'Cursor Pro', time: '11 min ago' },
    { name: 'Vikram J.', city: 'Hyderabad', product: 'TradingView', time: '14 min ago' },
    { name: 'Ananya R.', city: 'Chennai', product: 'Figma', time: '17 min ago' },
    { name: 'Dev T.', city: 'Kolkata', product: 'Notion Pro', time: '21 min ago' },
    { name: 'Meera L.', city: 'Ahmedabad', product: 'GitHub Copilot', time: '25 min ago' }
  ];

  function createToast(buyer) {
    var existing = document.getElementById('ld-toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.id = 'ld-toast';
    toast.style.cssText =
      'position:fixed; bottom:90px; left:20px; z-index:9998;' +
      'background:#1A1A1D; border:1px solid rgba(255,255,255,0.1);' +
      'border-left:3px solid #F5C842;' +
      'border-radius:10px; padding:12px 16px; max-width:280px;' +
      'font-family:DM Sans,sans-serif; font-size:13px; color:#F0EFEA;' +
      'box-shadow:0 4px 20px rgba(0,0,0,0.4);' +
      'animation:ld-toast-in 0.3s ease;' +
      'cursor:pointer;';

    toast.innerHTML =
      '<div style="font-weight:600; margin-bottom:2px;">⚡ ' + buyer.name + ' from ' + buyer.city + '</div>' +
      '<div style="color:rgba(240,239,234,0.6);">Just activated <span style="color:#F5C842">' + buyer.product + '</span></div>' +
      '<div style="color:rgba(240,239,234,0.4); font-size:11px; margin-top:3px;">' + buyer.time + '</div>';

    toast.onclick = function () { toast.remove(); };

    // Add keyframe animation
    if (!document.getElementById('ld-toast-style')) {
      var style = document.createElement('style');
      style.id = 'ld-toast-style';
      style.textContent =
        '@keyframes ld-toast-in { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }';
      document.head.appendChild(style);
    }

    document.body.appendChild(toast);

    // Auto-remove after 4 seconds
    setTimeout(function () {
      if (toast.parentElement) {
        toast.style.animation = 'none';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(function () { if (toast.parentElement) toast.remove(); }, 300);
      }
    }, 4000);
  }

  function startToastCycle() {
    var index = 0;
    // Show first toast after 8 seconds
    setTimeout(function () {
      createToast(recentBuyers[index % recentBuyers.length]);
      index++;
      // Then show one every 25 seconds
      setInterval(function () {
        createToast(recentBuyers[index % recentBuyers.length]);
        index++;
      }, 25000);
    }, 8000);
  }

  /* ─────────────────────────────────────────────
     17. WHATSAPP BUTTON: UPDATE TEXT ON MOBILE
  ───────────────────────────────────────────── */
  function improveWhatsAppButton() {
    var waLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
    waLinks.forEach(function (link) {
      var text = link.textContent.trim();
      if (text.toLowerCase().includes('connect on whatsapp') ||
          text.toLowerCase().includes('chat on whatsapp')) {
        link.textContent = '💬 Chat on WhatsApp — usually replies in 3 min';
      }
    });
  }

  /* ─────────────────────────────────────────────
     18. ADD "STACK BUILDER" PROMPT IN WHO IT'S FOR SECTION
  ───────────────────────────────────────────── */
  function addStackBuilderCTA() {
    var whySection = document.getElementById('why-choose-us') ||
                     document.querySelector('[id*="designed-for"], [id*="who"]');
    if (!whySection) return;
    if (document.querySelector('.ld-stack-builder')) return;

    var cta = document.createElement('div');
    cta.className = 'ld-stack-builder';
    cta.style.cssText =
      'margin-top:2rem; text-align:center; padding:24px; ' +
      'background:rgba(245,200,66,0.06); border:1px solid rgba(245,200,66,0.2); ' +
      'border-radius:12px;';
    cta.innerHTML =
      '<p style="font-size:14px; color:rgba(240,239,234,0.7); margin-bottom:12px;">' +
      'Not sure which tools you need? Tell us your role and we\'ll build your stack.</p>' +
      '<a href="https://wa.me/917695956938?text=Hi+LightningDeals%21+I%27m+a+[developer/designer/student/trader]+and+I+want+to+know+which+subscription+bundle+suits+me+best." ' +
      'style="display:inline-block; background:#F5C842; color:#000; font-weight:700; font-family:DM Sans,sans-serif; ' +
      'padding:12px 28px; border-radius:8px; text-decoration:none; font-size:14px;">Build My Stack on WhatsApp →</a>';
    whySection.appendChild(cta);
  }

  /* ─────────────────────────────────────────────
     19. CHECKOUT: REDUCE ANXIETY COPY
  ───────────────────────────────────────────── */
  function improveCheckoutCopy() {
    // Watch for checkout elements to appear
    var observer = new MutationObserver(function () {
      // Step 3 payment page reassurance
      var utrlabel = document.querySelector('[for*="utr"], [placeholder*="UTR"], [placeholder*="transaction"]');
      if (utrlabel) {
        // Add a reassurance note below the UTR field
        var utrParent = utrlabel.closest && utrlabel.closest('[class*="field"], [class*="form-group"]');
        if (utrParent && !utrParent.querySelector('.ld-utr-note')) {
          var note = document.createElement('p');
          note.className = 'ld-utr-note';
          note.style.cssText = 'font-size:12px; color:rgba(240,239,234,0.5); margin-top:6px;';
          note.textContent = 'Find your UTR in GPay/PhonePe → Payment History → Transaction Details → Reference Number';
          utrParent.appendChild(note);
        }
      }

      // Add reassurance near submit button
      var submitBtn = document.querySelector('[class*="submit"], button[type="submit"]');
      if (submitBtn && !document.querySelector('.ld-submit-note')) {
        var note2 = document.createElement('p');
        note2.className = 'ld-submit-note';
        note2.style.cssText = 'text-align:center; font-size:12px; color:rgba(240,239,234,0.45); margin-top:8px;';
        note2.innerHTML = '🔒 Your details are secure · Activation within 30 min or full refund';
        if (submitBtn.parentElement) {
          submitBtn.parentElement.appendChild(note2);
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  /* ─────────────────────────────────────────────
     INIT: RUN ALL PATCHES AFTER DOM IS READY
  ───────────────────────────────────────────── */
  function init() {
    removeAdminLink();
    fixLegalLinks();
    addAnnouncementBar();
    replaceBrandLogos();
    improveHeroCopy();
    fixProofSection();
    hideEmptyRecentlyViewed();
    fixMobileUPI();
    addFAQQuestions();
    addTestimonialStars();
    improveHowItWorksText();
    fixPricingSection();
    setupScrollAnimations();
    fixMobileFilterTabs();
    startToastCycle();
    improveWhatsAppButton();
    addStackBuilderCTA();
    improveCheckoutCopy();

    // Run again after a short delay to catch dynamically loaded content
    setTimeout(function () {
      removeAdminLink();
      fixLegalLinks();
      addTestimonialStars();
      fixProofSection();
      hideEmptyRecentlyViewed();
      animateStats();
    }, 2000);

    // Final pass for async-loaded products
    setTimeout(function () {
      addTestimonialStars();
      animateStats();
    }, 5000);
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
