/* ============================================
   EIDONCORE — Shared Components JS
   Dynamic Nav, Footer, Newsletter, Scroll
   ============================================ */

(function () {
    'use strict';

    // --- Determine depth for relative paths ---
    const depth = document.documentElement.dataset.depth || '0';
    const prefix = depth === '1' ? '../' : '';

    // --- Inject Navbar ---
    function createNav() {
        const nav = document.createElement('nav');
        nav.className = 'navbar';
        nav.id = 'navbar';
        nav.innerHTML = `
      <div class="nav-container">
        <a href="${prefix}./" class="nav-logo">
          <span class="logo-icon">◆</span> Eidoncore
        </a>
        <ul class="nav-links" id="navLinks">
          <li class="nav-dropdown">
            <a href="${prefix}features/" class="dropdown-trigger">Features <span class="dropdown-arrow">▾</span></a>
            <div class="dropdown-menu">
              <a href="${prefix}projects/">Projects</a>
              <a href="${prefix}tasks/">Tasks</a>
              <a href="${prefix}crm/">CRM &amp; Clients</a>
              <a href="${prefix}invoicing/">Invoicing</a>
              <a href="${prefix}services/">Services</a>
              <a href="${prefix}automations/">Automations</a>
              <a href="${prefix}portal/">Client Portal</a>
            </div>
          </li>
          <li><a href="${prefix}pricing/">Pricing</a></li>
          <li><a href="${prefix}about/">About</a></li>
          <li><a href="${prefix}contact/">Contact</a></li>
          <li class="mobile-cta-item"><a href="https://register.eidoncore.com/login" class="btn btn-ghost btn-block">Log In</a></li>
          <li class="mobile-cta-item"><a href="https://register.eidoncore.com/" class="btn btn-primary btn-block">Start Free Trial</a></li>
        </ul>
        <div class="nav-actions" id="navActions">
          <a href="https://register.eidoncore.com/login" class="btn btn-ghost">Log In</a>
          <a href="https://register.eidoncore.com/" class="btn btn-primary">Start Free Trial</a>
        </div>
        <button class="nav-toggle" id="navToggle" aria-label="Toggle menu">
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
          <div class="footer-col">
            <h4>Product</h4>
            <a href="${prefix}features/">Features</a>
            <a href="${prefix}pricing/">Pricing</a>
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
          </div>
          <div class="footer-col">
            <h4>Resources</h4>
            <a href="${prefix}contact/">Help Center</a>
            <a href="${prefix}about/#security">Security</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2026 Eidoncore. All rights reserved.</p>
        </div>
      </div>
    `;
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
            });

            // Close mobile on link click (but not dropdown triggers)
            navLinks.querySelectorAll('a').forEach(link => {
                if (link.classList.contains('dropdown-trigger')) return;
                link.addEventListener('click', () => {
                    navLinks.classList.remove('open');
                    navToggle.classList.remove('active');
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
            // Desktop: hover
            dd.addEventListener('mouseenter', () => { if (!isMobile()) dd.classList.add('active'); });
            dd.addEventListener('mouseleave', () => { if (!isMobile()) dd.classList.remove('active'); });
            // Mobile: tap the trigger to toggle
            const trigger = dd.querySelector('.dropdown-trigger');
            if (trigger) {
                trigger.addEventListener('click', (e) => {
                    if (isMobile()) {
                        e.preventDefault();
                        dd.classList.toggle('active');
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
