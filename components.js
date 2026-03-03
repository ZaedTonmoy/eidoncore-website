/* ============================================
   EIDONCORE — Shared Components JS
   Dynamic Nav, Footer, Newsletter, Scroll
   ============================================ */

(function () {
    'use strict';

    // --- Google Analytics (gtag.js) ---
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-708D36YCMR';
    document.head.appendChild(gtagScript);
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-708D36YCMR');

    // --- Microsoft Clarity ---
    (function (c, l, a, r, i, t, y) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
        t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", "vq6ikthh3w");

    // --- Determine depth for relative paths ---
    const depth = document.documentElement.dataset.depth || '0';
    const prefix = depth === '1' ? '../' : '';

    // --- Inject Navbar ---
    function createNav() {
        // Skip-to-content link
        const skip = document.createElement('a');
        skip.href = '#main-content';
        skip.className = 'skip-link';
        skip.textContent = 'Skip to main content';
        document.body.prepend(skip);

        // Add id to main
        const main = document.querySelector('main');
        if (main) main.id = 'main-content';

        const nav = document.createElement('nav');
        nav.className = 'navbar';
        nav.id = 'navbar';
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'Main navigation');
        nav.innerHTML = `
      <div class="nav-container">
        <a href="${prefix}./" class="nav-logo" aria-label="Eidoncore home">
          <span class="logo-icon">◆</span> Eidoncore
        </a>
        <ul class="nav-links" id="navLinks" role="menubar">
          <li class="nav-dropdown" role="none">
            <a href="${prefix}features/" class="dropdown-trigger" role="menuitem" aria-haspopup="true" aria-expanded="false">Features <span class="dropdown-arrow">▾</span></a>
            <div class="dropdown-menu" role="menu">
              <a href="${prefix}projects/" role="menuitem">Projects</a>
              <a href="${prefix}tasks/" role="menuitem">Tasks</a>
              <a href="${prefix}crm/" role="menuitem">CRM &amp; Clients</a>
              <a href="${prefix}invoicing/" role="menuitem">Invoicing</a>
              <a href="${prefix}services/" role="menuitem">Services</a>
              <a href="${prefix}automations/" role="menuitem">Automations</a>
              <a href="${prefix}portal/" role="menuitem">Client Portal</a>
              <a href="${prefix}notifications/" role="menuitem">Notifications</a>
              <a href="${prefix}reports/" role="menuitem">Reports</a>
            </div>
          </li>
          <li class="nav-dropdown" role="none">
            <a href="${prefix}blog/" class="dropdown-trigger" role="menuitem" aria-haspopup="true" aria-expanded="false">Resources <span class="dropdown-arrow">▾</span></a>
            <div class="dropdown-menu" role="menu">
              <a href="${prefix}blog/" role="menuitem">Blog</a>
              <a href="${prefix}docs/" role="menuitem">Documentation</a>
              <a href="${prefix}integrations/" role="menuitem">Integrations</a>
              <a href="${prefix}changelog/" role="menuitem">Changelog</a>
            </div>
          </li>
          <li role="none"><a href="${prefix}pricing/" role="menuitem">Pricing</a></li>
          <li role="none"><a href="${prefix}about/" role="menuitem">About</a></li>
          <li role="none"><a href="${prefix}contact/" role="menuitem">Contact</a></li>
          <li class="mobile-cta-item" role="none"><a href="https://register.eidoncore.com/login" class="btn btn-ghost btn-block" role="menuitem">Log In</a></li>
          <li class="mobile-cta-item" role="none"><a href="https://register.eidoncore.com/" class="btn btn-primary btn-block" role="menuitem">Start Free Trial</a></li>
        </ul>
        <div class="nav-actions" id="navActions">
          <a href="https://register.eidoncore.com/login" class="btn btn-ghost">Log In</a>
          <a href="https://register.eidoncore.com/" class="btn btn-primary">Start Free Trial</a>
        </div>
        <button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    `;
        return nav;
    }

    // --- Inject Footer ---
    function createFooter() {
        const footer = document.createElement('footer');
        footer.className = 'site-footer';
        footer.id = 'footer';
        footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="${prefix}./" class="nav-logo"><span class="logo-icon">◆</span> Eidoncore</a>
            <p>The all-in-one agency management platform.</p>
            <div class="footer-newsletter">
              <p>Subscribe to our newsletter</p>
              <form class="footer-newsletter-form" id="footerNewsletter">
                <input type="email" placeholder="you@agency.com" required>
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
          <div class="footer-link-columns">
          <div class="footer-col">
            <h4>Product</h4>
            <a href="${prefix}features/">Features</a>
            <a href="${prefix}pricing/">Pricing</a>
            <a href="${prefix}integrations/">Integrations</a>
            <a href="${prefix}changelog/">Changelog</a>
            <a href="${prefix}about/">About</a>
            <a href="${prefix}contact/">Contact</a>
          </div>
          <div class="footer-col">
            <h4>Features</h4>
            <a href="${prefix}projects/">Projects</a>
            <a href="${prefix}tasks/">Tasks</a>
            <a href="${prefix}invoicing/">Invoicing</a>
            <a href="${prefix}crm/">CRM</a>
            <a href="${prefix}automations/">Automations</a>
            <a href="${prefix}services/">Services</a>
            <a href="${prefix}portal/">Client Portal</a>
            <a href="${prefix}notifications/">Notifications</a>
            <a href="${prefix}reports/">Reports</a>
          </div>
          <div class="footer-col">
            <h4>Resources</h4>
            <a href="${prefix}docs/">Documentation</a>
            <a href="${prefix}blog/">Blog</a>
            <a href="${prefix}security/">Security</a>
            <a href="${prefix}privacy/">Privacy Policy</a>
            <a href="${prefix}terms/">Terms of Service</a>
          </div>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="footer-social">
            <a href="https://github.com/ZaedTonmoy" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg></a>
            <a href="https://twitter.com/eidoncore" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
            <a href="https://linkedin.com/company/eidoncore" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
          </div>
          <p>&copy; 2026 Eidoncore. All rights reserved.</p>
        </div>
      </div>
    `;
        footer.setAttribute('role', 'contentinfo');
        return footer;
    }

    // --- Init shared behaviors ---
    function initShared() {
        // Navbar scroll
        const navbar = document.getElementById('navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                navbar.classList.toggle('scrolled', window.scrollY > 50);
            }, { passive: true });
            if (window.scrollY > 50) navbar.classList.add('scrolled');
        }

        // Mobile toggle
        const navToggle = document.getElementById('navToggle');
        const navLinks = document.getElementById('navLinks');
        if (navToggle && navLinks) {
            navToggle.addEventListener('click', () => {
                const open = navLinks.classList.toggle('open');
                navToggle.classList.toggle('active', open);
                navToggle.setAttribute('aria-expanded', String(open));
            });

            // Close mobile on link click (but not dropdown triggers)
            navLinks.querySelectorAll('a').forEach(link => {
                if (link.classList.contains('dropdown-trigger')) return;
                link.addEventListener('click', () => {
                    navLinks.classList.remove('open');
                    navToggle.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                });
            });
        }

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                const href = a.getAttribute('href');
                if (href === '#') return;
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offset = 80;
                    const top = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            });
        });

        // --- Scroll animations (observe ALL animated elements) ---
        const animSelector = '.animate-on-scroll, .anim-blur, .anim-scale, .anim-slide-left, .anim-slide-right, .anim-cinematic, .text-reveal';
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Stagger siblings
                    const parent = entry.target.parentElement;
                    const siblings = parent ? Array.from(parent.querySelectorAll(animSelector)) : [];
                    const idx = siblings.indexOf(entry.target);
                    const delay = idx > 0 ? idx * 80 : 0;
                    setTimeout(() => entry.target.classList.add('visible'), delay);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
        document.querySelectorAll(animSelector).forEach(el => obs.observe(el));

        // --- Newsletter forms ---
        document.querySelectorAll('.newsletter-form, .footer-newsletter-form').forEach(form => {
            form.addEventListener('submit', e => {
                e.preventDefault();
                const input = form.querySelector('input');
                const box = form.closest('.newsletter-box') || form.closest('.footer-newsletter');
                if (input && input.value) {
                    input.value = '';
                    if (box) {
                        const msg = box.querySelector('.newsletter-success');
                        if (msg) { msg.style.display = 'block'; setTimeout(() => msg.style.display = 'none', 4000); }
                    }
                    const btn = form.querySelector('button');
                    if (btn) {
                        const orig = btn.textContent;
                        btn.textContent = '✓ Subscribed!';
                        btn.style.background = 'var(--accent-green)';
                        setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 3000);
                    }
                }
            });
        });

        // --- Dropdown menus ---
        const isMobile = () => window.innerWidth <= 768;
        document.querySelectorAll('.nav-dropdown').forEach(dd => {
            const trigger = dd.querySelector('.dropdown-trigger');
            // Desktop: hover
            dd.addEventListener('mouseenter', () => { if (!isMobile()) { dd.classList.add('active'); if (trigger) trigger.setAttribute('aria-expanded', 'true'); } });
            dd.addEventListener('mouseleave', () => { if (!isMobile()) { dd.classList.remove('active'); if (trigger) trigger.setAttribute('aria-expanded', 'false'); } });
            // Mobile: tap the trigger to toggle
            if (trigger) {
                trigger.addEventListener('click', (e) => {
                    if (isMobile()) {
                        e.preventDefault();
                        const isOpen = dd.classList.toggle('active');
                        trigger.setAttribute('aria-expanded', String(isOpen));
                    }
                });
            }
        });

        // --- FAQ Accordion (if on page) ---
        document.querySelectorAll('.faq-question').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = btn.parentElement;
                const isOpen = item.classList.contains('active');
                document.querySelectorAll('.faq-item.active').forEach(openItem => {
                    if (openItem !== item) openItem.classList.remove('active');
                });
                item.classList.toggle('active', !isOpen);
                btn.setAttribute('aria-expanded', String(!isOpen));
            });
        });

        // --- Pricing toggle (if on page) ---
        const pricingToggle = document.getElementById('pricingToggle');
        const toggleMonthly = document.getElementById('toggleMonthly');
        const toggleAnnual = document.getElementById('toggleAnnual');
        if (pricingToggle && toggleMonthly && toggleAnnual) {
            let isAnnual = false;
            pricingToggle.addEventListener('click', () => {
                isAnnual = !isAnnual;
                pricingToggle.classList.toggle('active', isAnnual);
                toggleMonthly.classList.toggle('active', !isAnnual);
                toggleAnnual.classList.toggle('active', isAnnual);
                document.querySelectorAll('.plan-price .amount').forEach(el => {
                    const target = isAnnual ? parseInt(el.dataset.annual) : parseInt(el.dataset.monthly);
                    animateValue(el, parseInt(el.textContent), target, 400);
                });
            });
        }

        // --- Stat counter animation ---
        const statObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.target);
                    if (!isNaN(target)) animateValue(el, 0, target, 1800);
                    statObs.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        document.querySelectorAll('.stat-number[data-target]').forEach(el => statObs.observe(el));

        // --- Parallax on hero orbs ---
        const orbs = document.querySelectorAll('.orb');
        if (orbs.length) {
            window.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 2;
                const y = (e.clientY / window.innerHeight - 0.5) * 2;
                orbs.forEach((orb, i) => {
                    const factor = (i + 1) * 12;
                    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
                });
            }, { passive: true });
        }

        // --- Back to Top button ---
        const btt = document.createElement('button');
        btt.className = 'back-to-top';
        btt.id = 'backToTop';
        btt.setAttribute('aria-label', 'Back to top');
        btt.innerHTML = '↑';
        document.body.appendChild(btt);
        window.addEventListener('scroll', () => {
            btt.classList.toggle('visible', window.scrollY > 500);
        }, { passive: true });
        btt.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // --- Cookie Consent ---
        if (!localStorage.getItem('eidon_cookie_consent')) {
            const banner = document.createElement('div');
            banner.className = 'cookie-banner';
            banner.id = 'cookieBanner';
            banner.setAttribute('role', 'alert');
            banner.innerHTML = `
                <p>We use cookies to improve your experience. By using this site, you agree to our <a href="${prefix}privacy/">Privacy Policy</a>.</p>
                <button class="btn btn-primary btn-sm" id="cookieAccept">Accept</button>
            `;
            document.body.appendChild(banner);
            setTimeout(() => banner.classList.add('visible'), 1000);
            document.getElementById('cookieAccept').addEventListener('click', () => {
                localStorage.setItem('eidon_cookie_consent', '1');
                banner.classList.remove('visible');
                setTimeout(() => banner.remove(), 400);
            });
        }

        // --- Breadcrumb JSON-LD ---
        const bc = document.querySelector('.breadcrumb');
        if (bc) {
            const links = bc.querySelectorAll('a');
            const current = bc.querySelector('.current');
            if (links.length && current) {
                const items = [];
                links.forEach((a, i) => {
                    items.push({ '@type': 'ListItem', 'position': i + 1, 'name': a.textContent.trim(), 'item': a.href });
                });
                items.push({ '@type': 'ListItem', 'position': items.length + 1, 'name': current.textContent.trim() });
                const schema = document.createElement('script');
                schema.type = 'application/ld+json';
                schema.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', 'itemListElement': items });
                document.head.appendChild(schema);
            }
        }

        // --- Mobile comparison table scroll ---
        document.querySelectorAll('.comparison-table').forEach(table => {
            if (!table.parentElement.classList.contains('table-scroll')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'table-scroll';
                table.parentNode.insertBefore(wrapper, table);
                wrapper.appendChild(table);
            }
        });

        // --- Main landmark role ---
        const mainEl = document.querySelector('main');
        if (mainEl) mainEl.setAttribute('role', 'main');
    }

    // --- Animate counter value ---
    function animateValue(el, start, end, duration) {
        const range = end - start;
        if (range === 0) { el.textContent = end; return; }
        const startTime = performance.now();
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(start + range * ease);
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    // --- Insert nav+footer when DOM is ready ---
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            document.body.prepend(createNav());
            document.body.appendChild(createFooter());
            initShared();
        });
    } else {
        // DOM already loaded
        document.body.prepend(createNav());
        document.body.appendChild(createFooter());
        initShared();
    }
})();
