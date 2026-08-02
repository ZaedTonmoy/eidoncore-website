(function () {
  const depth = parseInt(document.documentElement.getAttribute('data-depth') || '0', 10);
  const prefix = depth === 0 ? './' : '../'.repeat(depth);

  function createNav() {
    if (document.getElementById('navbar')) return;
    const skip = document.createElement('a');
    skip.href = '#main-content';
    skip.className = 'skip-link';
    skip.textContent = 'Skip to main content';
    document.body.prepend(skip);

    const main = document.querySelector('main');
    if (main) main.id = 'main-content';

    const nav = document.createElement('nav');
    nav.className = 'navbar';
    nav.id = 'navbar';
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'Main navigation');
    nav.innerHTML = `
      <div class="nav-container">
        <a href="${prefix}" class="nav-logo" aria-label="Eidoncore home">
          <img src="${prefix}images/logo.png" alt="" class="logo-icon" style="height:24px;width:24px;"> Eidoncore
        </a>
        <ul class="nav-links" id="navLinks" role="menubar">
          <li class="nav-dropdown" role="none">
            <a href="${prefix}features/" class="dropdown-trigger" role="menuitem" aria-haspopup="true">Features <span class="dropdown-arrow">▾</span></a>
            <div class="dropdown-menu" role="menu">
              <a href="${prefix}projects/" role="menuitem">Projects</a>
              <a href="${prefix}tasks/" role="menuitem">Tasks</a>
              <a href="${prefix}crm/" role="menuitem">CRM &amp; Clients</a>
              <a href="${prefix}invoicing/" role="menuitem">Invoicing</a>
              <a href="${prefix}services/" role="menuitem">Offerings</a>
              <a href="${prefix}proposals/" role="menuitem">Proposals</a>
              <a href="${prefix}messaging/" role="menuitem">Messaging</a>
              <a href="${prefix}automations/" role="menuitem">Automations</a>
              <a href="${prefix}portal/" role="menuitem">Client Portal</a>
              <a href="${prefix}notifications/" role="menuitem">Notifications</a>
              <a href="${prefix}reports/" role="menuitem">Reports</a>
              <a href="${prefix}ai-workspace/" role="menuitem">AI Workspace</a>
            </div>
          </li>
          <li role="none"><a href="${prefix}pricing/" role="menuitem">Pricing</a></li>
          <li class="nav-dropdown" role="none">
            <a href="${prefix}use-cases/" class="dropdown-trigger" role="menuitem" aria-haspopup="true">Use Cases <span class="dropdown-arrow">▾</span></a>
            <div class="dropdown-menu" role="menu">
              <a href="${prefix}use-cases/marketing-agencies/" role="menuitem">Marketing Agencies</a>
              <a href="${prefix}use-cases/design-studios/" role="menuitem">Design Studios</a>
              <a href="${prefix}use-cases/development-agencies/" role="menuitem">Development Agencies</a>
              <a href="${prefix}use-cases/consulting-firms/" role="menuitem">Consulting Firms</a>
              <a href="${prefix}use-cases/freelancers/" role="menuitem">Freelancers</a>
            </div>
          </li>
          <li role="none"><a href="${prefix}about/" role="menuitem">About</a></li>
          <li role="none"><a href="${prefix}contact/" role="menuitem">Contact</a></li>
          <li class="mobile-cta-item" role="none"><a href="https://register.eidoncore.com/login" class="btn btn-ghost btn-block" role="menuitem">Log In</a></li>
          <li class="mobile-cta-item" role="none"><a href="https://register.eidoncore.com/" class="btn btn-primary btn-block" role="menuitem">Start Free Trial</a></li>
        </ul>
        <div class="nav-actions">
          <a href="https://register.eidoncore.com/login" class="btn btn-ghost">Log In</a>
          <a href="https://register.eidoncore.com/" class="btn btn-primary">Start Free Trial</a>
        </div>
        <button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>`;
    document.body.prepend(nav);
  }

  function createFooter() {
    if (document.getElementById('footer')) return;
    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.id = 'footer';
    footer.setAttribute('role', 'contentinfo');
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="${prefix}" class="nav-logo"><img src="${prefix}images/logo.png" alt="" class="logo-icon" style="height:24px;width:24px;"> Eidoncore</a>
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
              <a href="${prefix}proposals/">Proposals</a>
              <a href="${prefix}messaging/">Messaging</a>
              <a href="${prefix}automations/">Automations</a>
              <a href="${prefix}services/">Offerings</a>
              <a href="${prefix}portal/">Client Portal</a>
              <a href="${prefix}notifications/">Notifications</a>
              <a href="${prefix}reports/">Reports</a>
              <a href="${prefix}ai-workspace/">AI Workspace</a>
              <a href="${prefix}digital-products/">Digital Products</a>
            </div>
            <div class="footer-col">
              <h4>Use Cases</h4>
              <a href="${prefix}use-cases/marketing-agencies/">Marketing Agencies</a>
              <a href="${prefix}use-cases/design-studios/">Design Studios</a>
              <a href="${prefix}use-cases/development-agencies/">Dev Agencies</a>
              <a href="${prefix}use-cases/consulting-firms/">Consulting Firms</a>
              <a href="${prefix}use-cases/freelancers/">Freelancers</a>
              <a href="${prefix}customers/">Customer Stories</a>
            </div>
            <div class="footer-col">
              <h4>Resources</h4>
              <a href="${prefix}docs/">Documentation</a>
              <a href="${prefix}blog/">Blog</a>
              <a href="${prefix}faq/">FAQ</a>
              <a href="${prefix}compare/">Compare</a>
              <a href="${prefix}demo/">Product Tour</a>
              <a href="${prefix}developers/">Developers</a>
              <a href="${prefix}partners/">Partners</a>
              <a href="${prefix}security/">Security</a>
              <a href="${prefix}privacy/">Privacy Policy</a>
              <a href="${prefix}terms/">Terms of Service</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="footer-social">
            <a href="https://github.com/ZaedTonmoy" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg></a>
            <a href="https://twitter.com/eidoncore" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
            <a href="https://linkedin.com/company/eidoncore" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
          </div>
          <p>&copy; 2026 Eidoncore. All rights reserved.</p>
        </div>
      </div>`;
    document.body.appendChild(footer);
  }

  function init() {
    createNav();
    createFooter();

    const iconShapes = {
      activity: '<path d="M22 12h-4l-3 8-6-16-3 8H2"/>',
      alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
      archive: '<path d="M21 8v13H3V8"/><path d="M1 3h22v5H1z"/><path d="M10 12h4"/>',
      badgeCheck: '<path d="m9 12 2 2 4-4"/><path d="M12 3 14.3 5.2 17.5 5.1 18.9 8 21.7 9.6 20.9 12.7 21.7 15.8 18.9 17.4 17.5 20.3 14.3 20.2 12 22.4 9.7 20.2 6.5 20.3 5.1 17.4 2.3 15.8 3.1 12.7 2.3 9.6 5.1 8 6.5 5.1 9.7 5.2 12 3z"/>',
      banknote: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
      bell: '<path d="M10 21h4"/><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/>',
      book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H22"/><path d="M4 4v15.5A2.5 2.5 0 0 1 6.5 17H22V4H6.5A2.5 2.5 0 0 0 4 6.5"/>',
      bot: '<path d="M12 8V4H8"/><rect x="4" y="8" width="16" height="12" rx="2"/><path d="M2 14h2M20 14h2M9 13v2M15 13v2"/>',
      box: '<path d="m21 8-9-5-9 5 9 5 9-5Z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/>',
      briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M2 12h20"/>',
      building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/>',
      calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
      chart: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
      check: '<path d="m20 6-11 11-5-5"/>',
      clipboard: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>',
      clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
      cloud: '<path d="M17.5 19H7a5 5 0 1 1 1.1-9.9A7 7 0 0 1 21 12.5 4.5 4.5 0 0 1 17.5 19Z"/>',
      code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
      compass: '<circle cx="12" cy="12" r="10"/><path d="m16 8-2 6-6 2 2-6 6-2z"/>',
      creditCard: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
      database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5"/><path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/>',
      file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
      flag: '<path d="M4 22V4"/><path d="M4 4h13l-1 4 1 4H4"/>',
      folder: '<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
      gift: '<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18"/><path d="M7.5 8a2.5 2.5 0 1 1 4.5-1.5A2.5 2.5 0 1 1 16.5 8"/>',
      globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"/>',
      head: '<path d="M18 10a6 6 0 0 0-12 0v3a4 4 0 0 0 4 4h1v3h2v-3h1a4 4 0 0 0 4-4v-3Z"/><path d="M9 10h.01M15 10h.01M10 14h4"/>',
      heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/>',
      home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v11h14V10"/><path d="M9 21v-6h6v6"/>',
      key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m12 12 8-8M15 7l2 2M18 4l2 2"/>',
      layers: '<path d="m12 2 10 5-10 5L2 7l10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>',
      lifeBuoy: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="m4.9 4.9 4.2 4.2M14.9 14.9l4.2 4.2M19.1 4.9l-4.2 4.2M9.1 14.9l-4.2 4.2"/>',
      link: '<path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.1 0l-2 2A5 5 0 0 0 12 20.1l1.1-1.1"/>',
      lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
      mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
      mapPin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
      megaphone: '<path d="m3 11 18-5v12L3 13v-2Z"/><path d="M11.6 16.8A3 3 0 0 1 6 15"/>',
      message: '<path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>',
      pen: '<path d="M12 20h9"/><path d="m16.5 3.5 4 4L7 21H3v-4L16.5 3.5z"/>',
      percent: '<path d="M19 5 5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
      play: '<path d="m5 3 14 9-14 9V3z"/>',
      plug: '<path d="M12 22v-5"/><path d="M9 8V2M15 8V2"/><path d="M6 8h12v3a6 6 0 0 1-12 0V8Z"/>',
      refresh: '<path d="M21 12a9 9 0 0 1-15.5 6.3L3 16"/><path d="M3 21v-5h5"/><path d="M3 12A9 9 0 0 1 18.5 5.7L21 8"/><path d="M21 3v5h-5"/>',
      rocket: '<path d="M4.5 16.5c-1.5 1.3-2 3.7-2 3.7s2.4-.5 3.7-2c.7-.8.7-2 0-2.7s-1.9-.7-2.7 0Z"/><path d="M9 15 4 10l7-7c3.5-.7 7.2.3 10 3.1-2.8 2.8-3.8 6.5-3.1 10l-7 7-5-5"/><path d="M14 8h.01"/>',
      search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
      send: '<path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/>',
      server: '<rect x="3" y="4" width="18" height="6" rx="2"/><rect x="3" y="14" width="18" height="6" rx="2"/><path d="M7 7h.01M7 17h.01"/>',
      settings: '<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V22a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H2a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3h.1a1.7 1.7 0 0 0 1-1.6V2a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6h.1a1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.6 1H22a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.6 1Z"/>',
      shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>',
      shieldCheck: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
      sparkles: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="M5 3v4M3 5h4M19 17v4M17 19h4"/>',
      star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21 7 14.2 2 9.3l6.9-1L12 2Z"/>',
      tag: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z"/><path d="M7 7h.01"/>',
      target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
      terminal: '<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',
      timer: '<path d="M10 2h4"/><path d="M12 14v-4"/><circle cx="12" cy="14" r="8"/>',
      trophy: '<path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M5 5H3v2a4 4 0 0 0 4 4M19 5h2v2a4 4 0 0 1-4 4"/>',
      upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>',
      user: '<path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/>',
      users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',
      wallet: '<path d="M20 7V6a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v10H5a3 3 0 0 1-3-3V7"/><path d="M16 14h.01"/>',
      workflow: '<rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M9 6h4a3 3 0 0 1 3 3v6"/><path d="M6 9v2a3 3 0 0 0 3 3h6"/>',
      x: '<path d="M18 6 6 18M6 6l12 12"/>',
      zap: '<path d="M13 2 3 14h8l-1 8 10-12h-8l1-8Z"/>'
    };

    const icon = (name) => `<svg class="site-icon" viewBox="0 0 24 24" aria-hidden="true">${iconShapes[name] || iconShapes.sparkles}</svg>`;

    document.querySelectorAll('[data-icon]').forEach(el => {
      el.innerHTML = icon(el.dataset.icon);
      el.setAttribute('aria-hidden', 'true');
    });

    const keywordIcons = [
      [' free ', 'gift'], ['pro ', 'zap'], ['enterprise', 'building'], ['pricing', 'creditCard'], ['plan', 'creditCard'],
      ['aes', 'lock'], ['encryption', 'lock'], ['security', 'shieldCheck'], ['soc', 'shieldCheck'], ['2fa', 'key'], ['gdpr', 'shield'], ['role', 'users'], ['permission', 'key'], ['tenant', 'database'], ['hsts', 'lock'], ['csrf', 'shield'], ['xss', 'shield'], ['brute', 'shield'], ['dns', 'globe'],
      ['project', 'folder'], ['task', 'clipboard'], ['kanban', 'layers'], ['gantt', 'calendar'], ['milestone', 'flag'],
      ['invoice', 'file'], ['billing', 'creditCard'], ['payment', 'creditCard'], ['refund', 'refresh'], ['finance', 'banknote'], ['accounting', 'banknote'], ['revenue', 'chart'], ['report', 'chart'], ['analytics', 'chart'], ['dashboard', 'chart'], ['kpi', 'activity'],
      ['crm', 'users'], ['client', 'users'], ['customer', 'heart'], ['agency', 'briefcase'], ['freelancer', 'user'], ['team', 'users'], ['consult', 'briefcase'], ['marketing', 'megaphone'], ['design', 'pen'], ['development', 'code'], ['dev ', 'code'], ['owner', 'briefcase'],
      ['message', 'message'], ['chat', 'message'], ['email', 'mail'], ['smtp', 'mail'], ['notification', 'bell'], ['reminder', 'bell'], ['support', 'lifeBuoy'],
      ['automation', 'workflow'], ['workflow', 'workflow'], ['integration', 'plug'], ['webhook', 'link'], ['api', 'code'], ['rest', 'code'], ['sdk', 'box'], ['cli', 'terminal'], ['developer', 'code'], ['documentation', 'book'], ['docs', 'book'],
      ['portal', 'home'], ['white-label', 'badgeCheck'], ['branding', 'badgeCheck'], ['domain', 'globe'], ['magic link', 'link'],
      ['service', 'tag'], ['offering', 'tag'], ['catalog', 'tag'], ['digital product', 'box'], ['product', 'box'], ['file', 'archive'], ['storage', 'database'], ['upload', 'upload'], ['preview', 'search'], ['annotation', 'pen'],
      ['proposal', 'file'], ['contract', 'pen'], ['signature', 'pen'], ['accept', 'check'], ['sign', 'pen'], ['view', 'search'], ['time', 'clock'], ['schedule', 'calendar'],
      ['ai', 'bot'], ['smart', 'sparkles'], ['all features', 'layers'], ['features', 'layers'], ['all-in-one', 'layers'], ['scales', 'rocket'], ['switch', 'refresh'], ['compare', 'target'], ['vs ', 'target'], ['use cases', 'compass'], ['about', 'compass'], ['partner', 'users'], ['content creator', 'megaphone'], ['community', 'message'],
      ['lifetime', 'star'], ['trial', 'rocket'], ['uptime', 'server'], ['cdn', 'cloud'], ['responsive', 'globe'], ['real-time', 'activity'], ['password', 'key']
    ];

    const chooseIcon = (text) => {
      const lower = text.toLowerCase();
      if (/\bfreelancers?\b/.test(lower)) return 'user';
      if (/\bfree\b/.test(lower)) return 'gift';
      if (/\bpro\b/.test(lower) && !/\bproposal/.test(lower)) return 'zap';
      const haystack = ` ${lower} `;
      const match = keywordIcons.find(([keyword]) => haystack.includes(keyword));
      return match ? match[1] : 'sparkles';
    };

    document.querySelectorAll('.mini-card').forEach(card => {
      const target = card.querySelector('.mini-icon');
      if (!target) return;
      const title = card.querySelector('h3')?.textContent || '';
      const copy = card.querySelector('p')?.textContent || '';
      target.innerHTML = icon(chooseIcon(`${title} ${copy}`));
      target.setAttribute('aria-hidden', 'true');
    });

    const contactIcons = [
      ['email', 'mail'], ['live chat', 'message'], ['response', 'clock'], ['location', 'mapPin'],
      ['features', 'layers'], ['pricing', 'creditCard'], ['security', 'shieldCheck'], ['support hours', 'clock']
    ];

    document.querySelectorAll('.contact-item').forEach(item => {
      const target = item.querySelector('.ic');
      if (!target) return;
      const label = item.querySelector('h4')?.textContent.toLowerCase() || '';
      const match = contactIcons.find(([keyword]) => label.includes(keyword));
      target.innerHTML = icon(match ? match[1] : 'message');
      target.setAttribute('aria-hidden', 'true');
    });

    document.querySelectorAll('td').forEach(cell => {
      const text = cell.textContent.trim();
      const status = text.startsWith('\u2705') ? ['yes', 'check'] : text.startsWith('\u274c') ? ['no', 'x'] : text.startsWith('\u26a0\ufe0f') || text.startsWith('\u26a0') ? ['warn', 'alert'] : null;
      if (!status) return;
      const clean = text.replace(/^(\u2705|\u274c|\u26a0\ufe0f|\u26a0)\s*/, '');
      cell.innerHTML = `<span class="status-icon ${status[0]}">${icon(status[1])}</span>${clean}`;
    });

    document.querySelectorAll('.newsletter-success').forEach(el => {
      el.innerHTML = `<span class="inline-icon">${icon('badgeCheck')}You're subscribed! Welcome aboard.</span>`;
    });

    document.querySelectorAll('.trust-badge').forEach(el => {
      if (el.querySelector('[data-icon], .site-icon')) return;
      const text = el.textContent.replace(/[\u{1f512}\u{1f6e1}]/gu, '').trim();
      const name = text.toLowerCase().includes('soc') ? 'shieldCheck' : 'lock';
      el.innerHTML = `${icon(name)} ${text}`;
    });

    document.querySelectorAll('.mock-row span:first-child').forEach(el => {
      if (!el.textContent.includes('\u{1f389}')) return;
      el.innerHTML = `${icon('badgeCheck')} ${el.textContent.replace('\u{1f389}', '').trim()}`;
    });

    /* Sticky nav shadow */
    const navbar = document.getElementById('navbar');
    if (navbar) {
      const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 20);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* Mobile nav toggle */
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => {
        const open = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', open);
        document.body.classList.toggle('nav-open', open);
      });
      document.querySelectorAll('.nav-dropdown > .dropdown-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
          if (window.innerWidth <= 920) {
            e.preventDefault();
            trigger.closest('.nav-dropdown').classList.toggle('open');
          }
        });
      });
      navLinks.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link || link.classList.contains('dropdown-trigger')) return;
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      });
      document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape' || !navLinks.classList.contains('open')) return;
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
        navToggle.focus();
      });
    }

    /* Scroll reveal */
    const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        });
      }, { threshold: 0.15 });
      revealEls.forEach(el => io.observe(el));
    } else {
      revealEls.forEach(el => el.classList.add('in'));
    }

    /* Adaptive shared layouts */
    document.querySelectorAll('.timeline').forEach(timeline => {
      const count = timeline.querySelectorAll('.tl-step').length;
      if (!count) return;
      timeline.style.setProperty('--timeline-count', count);
      timeline.style.setProperty('--timeline-line-right', `calc((100% - ${24 * (count - 1)}px) / ${count} - 26px)`);
    });

    document.querySelectorAll('.stack-wrap').forEach(stack => {
      const cards = stack.querySelectorAll('.stack-card');
      const section = stack.closest('section');
      if (!section || !cards.length) return;
      section.classList.add('stack-section');
      cards.forEach((card, index) => {
        card.style.setProperty('--i', index);
        card.style.setProperty('--stack-index', index);
      });
    });

    /* Animated stat counters */
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if ('IntersectionObserver' in window) {
      const counterIO = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseFloat(el.dataset.target);
          const duration = 1100;
          const start = performance.now();
          function tick(now) {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased);
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          counterIO.unobserve(el);
        });
      }, { threshold: 0.5 });
      counters.forEach(el => counterIO.observe(el));
    }

    /* FAQ accordion */
    document.querySelectorAll('.faq-item').forEach(item => {
      const btn = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      if (!btn || !answer) return;
      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(other => {
          if (other === item) return;
          other.classList.remove('open');
          other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
          const otherAnswer = other.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        });
        item.classList.toggle('open', !isOpen);
        btn.setAttribute('aria-expanded', String(!isOpen));
        answer.style.maxHeight = !isOpen ? `${answer.scrollHeight}px` : null;
      });
    });

    /* Pricing toggle */
    const toggle = document.getElementById('pricingToggle');
    const monthlyLabel = document.getElementById('toggleMonthly');
    const annualLabel = document.getElementById('toggleAnnual');
    if (toggle && monthlyLabel && annualLabel) {
      toggle.addEventListener('click', () => {
        const annual = toggle.classList.toggle('on');
        toggle.setAttribute('aria-pressed', String(annual));
        monthlyLabel.classList.toggle('active', !annual);
        annualLabel.classList.toggle('active', annual);
        document.querySelectorAll('.plan-price .amount').forEach(amount => {
          amount.textContent = annual ? amount.dataset.annual : amount.dataset.monthly;
        });
        document.querySelectorAll('.plan-price .period').forEach(period => {
          period.textContent = annual ? '/mo, billed yearly' : '/mo';
        });
      });
    }

    /* Live feed panel */
    const feedLines = [
      { tag: 'AI', tagClass: 'ai', text: 'Task auto-assigned to Sarah based on workload' },
      { tag: 'OK', tagClass: 'ok', text: 'Invoice #1042 sent to ClientCo - $3,200.00' },
      { tag: 'AI', tagClass: 'ai', text: 'Proposal follow-up drafted for Nova Studio' },
      { tag: 'OK', tagClass: 'ok', text: 'Project "Rebrand Q3" health score updated: 92' },
      { tag: 'AI', tagClass: 'ai', text: 'Recurring invoice scheduled for next cycle' },
      { tag: 'OK', tagClass: 'ok', text: 'Contract signed by Vanguard Creative' },
      { tag: 'AI', tagClass: 'ai', text: 'Support ticket routed to on-call agent' },
      { tag: 'OK', tagClass: 'ok', text: 'New lead captured from intake form' },
    ];
    const feedBody = document.getElementById('feedBody');
    if (feedBody) {
      let i = 0;
      const maxLines = 5;
      function pushLine() {
        const item = feedLines[i % feedLines.length];
        const row = document.createElement('div');
        row.className = 'feed-line';
        row.innerHTML = `<span class="feed-tag ${item.tagClass}">${item.tag}</span><span class="feed-text">${item.text}</span>`;
        feedBody.appendChild(row);
        while (feedBody.children.length > maxLines) {
          feedBody.removeChild(feedBody.firstChild);
        }
        i++;
      }
      pushLine(); pushLine(); pushLine();
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setInterval(pushLine, 2600);
      }
    }

    /* Newsletter forms */
    document.querySelectorAll('.newsletter-form, .footer-newsletter-form').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const successEl = form.parentElement.querySelector('.newsletter-success');
        if (successEl) {
          form.style.display = 'none';
          successEl.style.display = 'block';
        } else {
          const btn = form.querySelector('button');
          if (btn) {
            btn.textContent = 'Subscribed';
            btn.disabled = true;
          }
        }
      });
    });

    /* Mark current nav item active based on path */
    const path = window.location.pathname.replace(/\/index\.html$/, '/');
    document.querySelectorAll('.nav-links a[role="menuitem"]').forEach(a => {
      try {
        const linkPath = new URL(a.href).pathname;
        if (linkPath !== '/' && path.startsWith(linkPath)) a.setAttribute('aria-current', 'page');
      } catch (e) {}
    });

    /* Testimonial Carousel */
    const carousel = document.getElementById('testimonialCarousel');
    if (carousel) {
      const slides = carousel.querySelectorAll('.testimonial-slide');
      const avatarNav = carousel.querySelector('#testimonialAvatarNav');
      const avatarBtns = carousel.querySelectorAll('.avatar-nav-item');
      const dots = carousel.querySelectorAll('.carousel-dots .dot');
      const prevBtn = carousel.querySelector('#carouselPrev');
      const nextBtn = carousel.querySelector('#carouselNext');
      if (slides.length > 0) {
        let currentIndex = 0;
        let autoplayTimer = null;

        function showSlide(index) {
          if (index < 0) index = slides.length - 1;
          if (index >= slides.length) index = 0;
          currentIndex = index;
          slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentIndex);
          });
          dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
          });
          avatarBtns.forEach((btn, i) => {
            btn.classList.toggle('active', i === currentIndex);
          });
        }

        function nextSlide() { showSlide(currentIndex + 1); }
        function prevSlide() { showSlide(currentIndex - 1); }

        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

        /* Handle avatar button clicks via event delegation */
        if (avatarNav) {
          avatarNav.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-slide]');
            if (btn) {
              e.preventDefault();
              const idx = parseInt(btn.getAttribute('data-slide') || '0', 10);
              showSlide(idx);
              resetAutoplay();
            }
          });
        }

        dots.forEach(dot => {
          dot.addEventListener('click', () => {
            const idx = parseInt(dot.getAttribute('data-slide') || '0', 10);
            showSlide(idx);
            resetAutoplay();
          });
        });

        function startAutoplay() {
          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
          stopAutoplay();
          autoplayTimer = setInterval(nextSlide, 5000);
        }
        function stopAutoplay() {
          if (autoplayTimer) clearInterval(autoplayTimer);
        }
        function resetAutoplay() {
          stopAutoplay();
          startAutoplay();
        }

        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);
        startAutoplay();
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
