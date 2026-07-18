document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sticky nav shadow ---------- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open);
    });
    document.querySelectorAll('.nav-dropdown > .dropdown-trigger').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 920) {
          e.preventDefault();
          trigger.closest('.nav-dropdown').classList.toggle('open');
        }
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  /* ---------- Animated stat counters ---------- */
  const counters = document.querySelectorAll('.stat-number');
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

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-answer').style.maxHeight = null;
        }
      });
      item.classList.toggle('open', !isOpen);
      answer.style.maxHeight = !isOpen ? answer.scrollHeight + 'px' : null;
    });
  });

  /* ---------- Pricing toggle ---------- */
  const toggle = document.getElementById('pricingToggle');
  const monthlyLabel = document.getElementById('toggleMonthly');
  const annualLabel = document.getElementById('toggleAnnual');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const annual = toggle.classList.toggle('on');
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

  /* ---------- Live feed panel (signature element) ---------- */
  const feedLines = [
    { tag: 'AI', tagClass: 'ai', text: 'Task auto-assigned to Sarah based on workload' },
    { tag: 'OK', tagClass: 'ok', text: 'Invoice #1042 sent to ClientCo — $3,200.00' },
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
    setInterval(pushLine, 2600);
  }

  /* ---------- Newsletter forms ---------- */
  document.querySelectorAll('.newsletter-form, .footer-newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const successEl = form.parentElement.querySelector('.newsletter-success');
      if (successEl) {
        form.style.display = 'none';
        successEl.style.display = 'block';
      } else {
        const btn = form.querySelector('button');
        if (btn) { btn.textContent = 'Subscribed ✓'; btn.disabled = true; }
      }
    });
  });

});
