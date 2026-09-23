export const siteContent = {
  // 1. NAVBAR
  navbar: {
    logo: {
      name: "Eidoncore",
      symbol: "EC",
      badge: "AI-Powered",
    },
    links: [
      { label: "Features", href: "#features" },
      { label: "Modules", href: "#modules" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Why Eidoncore", href: "#why-eidoncore" },
      { label: "Compare", href: "#compare" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
    actions: {
      login: { label: "Log in", href: "https://app.eidoncore.com/login" },
      signup: { label: "Start Free Trial →", href: "https://register.eidoncore.com" },
    },
  },

  // 2. HERO
  hero: {
    eyebrow: "AI-Powered Agency Platform",
    eyebrowHref: "#features",
    headline: "Run your AI-powered agency from one platform",
    subheadline:
      "The all-in-one system for client portals, projects, billing, CRM, and autonomous AI workflows — beautifully unified in a single platform.",
    ctaPrimary: {
      label: "Start Free Trial →",
      href: "https://register.eidoncore.com/",
    },
    ctaSecondary: {
      label: "Explore Features",
      href: "#features",
    },
    trustNotes: [
      "14-day free trial",
      "No credit card required",
      "Setup in 2 minutes",
    ],
    announcement: {
      text: "Explore 19 Modules & 111+ Tools →",
      href: "#modules",
    },
  },

  // 3. METRICS / TRUST BENTO
  metrics: [
    {
      value: "19",
      label: "Modules",
      desc: "Client portals to automated invoicing",
    },
    {
      value: "111+",
      label: "Native Tools",
      desc: "Built-in AI agents & automations",
    },
    {
      value: "99.9%",
      label: "Uptime SLA",
      desc: "Enterprise-grade cloud infrastructure",
    },
    {
      value: "500+",
      label: "Agencies Worldwide",
      desc: "Scale client operations with ease",
    },
  ],

  // 4. CLIENT LOGOS
  clientLogos: [
    "Pixel Forge",
    "Mosaic Digital",
    "Vanguard Creative",
    "Nova Studio",
    "Apex Agency",
    "Clarity Co.",
  ],

  // 5. CORE MODULES / FEATURES
  modulesHeading: {
    eyebrow: "Platform modules",
    title: "Everything your agency needs — now with AI",
    description:
      "From first proposal to final invoice, run the complete client lifecycle seamlessly without stitching together disjointed apps.",
  },
  modules: [
    {
      id: "ai-workspace",
      tag: "NEW",
      title: "AI Workspace",
      description:
        "Connect AI assistants to manage tasks, invoices, and projects via MCP — with role-based access and OAuth 2.1 security.",
      href: "#features",
      color: "indigo",
    },
    {
      id: "proposals",
      tag: "CORE",
      title: "Proposals & Contracts",
      description:
        "Block-based builder, line item pricing, e-signatures, analytics, and one-click conversion to live projects.",
      href: "#features",
      color: "blue",
    },
    {
      id: "projects",
      tag: "CORE",
      title: "Projects & Health Scoring",
      description:
        "Budgets, milestones, real-time health scoring, team assignments, time tracking, and progress monitoring.",
      href: "#features",
      color: "blue",
    },
    {
      id: "tasks",
      tag: "CORE",
      title: "Tasks & Kanban Boards",
      description:
        "Interactive Kanban boards, list views, subtasks, checklists, dependencies, labels, and live timers.",
      href: "#features",
      color: "emerald",
    },
    {
      id: "crm",
      tag: "CORE",
      title: "CRM & Client Portals",
      description:
        "Full client lifecycle — deal pipelines, shared deliverables, contact directories, follow-ups, and health metrics.",
      href: "#features",
      color: "amber",
    },
    {
      id: "invoicing",
      tag: "FINANCE",
      title: "Smart Invoicing & Billing",
      description:
        "Automated recurring subscriptions, Stripe sync, tax calculations, automatic reminders, and instant payments.",
      href: "#features",
      color: "violet",
    },
    {
      id: "portal",
      tag: "PORTAL",
      title: "Branded Client Portal",
      description:
        "Dedicated self-serve portal for clients to view work deliverables, approve milestones, and self-serve.",
      href: "https://eidoncore.com/portal/",
      color: "sky",
    },
  ],

  // 6. HOW IT WORKS
  howItWorks: {
    eyebrow: "How It Works",
    title: "Up and running in minutes",
    description: "Get your fully branded agency workspace live in four simple steps.",
    steps: [
      {
        num: "01",
        title: "Create your workspace",
        desc: "Pick your agency name and claim your custom subdomain in under 60 seconds.",
      },
      {
        num: "02",
        title: "Customize & brand",
        desc: "Upload logo, set custom colors, email templates, or map your own custom domain.",
      },
      {
        num: "03",
        title: "Invite your team",
        desc: "Assign roles to project managers, developers, designers, and clients with granular permissions.",
      },
      {
        num: "04",
        title: "Start delivering",
        desc: "Onboard clients, launch projects, track hours, and send automated invoices effortlessly.",
      },
    ],
  },

  // 7. WHY EIDONCORE
  whyEidoncore: {
    eyebrow: "Why Eidoncore",
    title: "What makes us different",
    description: "Other tools solve one problem. Eidoncore unites them all — without compromise.",
    cards: [
      {
        index: "01 / 04",
        title: "All-In-One Platform",
        description:
          "Projects, tasks, CRM, invoicing, services, automations, reporting, and a client portal — all in a single app. Eliminate context switching.",
      },
      {
        index: "02 / 04",
        title: "Full White-Label",
        description:
          "Custom logo, brand colors, fonts, email templates, and your own domain. Clients see only your brand, never Eidoncore.",
      },
      {
        index: "03 / 04",
        title: "Multi-Tenant by Design",
        description:
          "Built from day one for agencies managing multiple client organizations. Complete data isolation and strict role-based access.",
      },
      {
        index: "04 / 04",
        title: "AI-Native Architecture",
        description:
          "Connect Claude, Cursor, or any MCP-compatible AI assistant to manage your workspace with 111+ tools across 19 modules.",
      },
    ],
  },

  // 8. COMPARE
  compare: {
    eyebrow: "Consolidate",
    title: "Replace your entire tool stack",
    description: "Stop paying for 6+ separate subscriptions. One Eidoncore plan covers everything.",
    savingsNote: "Estimated agency savings: $200+/month",
    rows: [
      { need: "Project Management", traditional: "Asana / Monday.com", eidoncore: "Built-in" },
      { need: "Task Boards", traditional: "Trello / ClickUp", eidoncore: "Built-in" },
      { need: "CRM & Client Pipeline", traditional: "HubSpot / Pipedrive", eidoncore: "Built-in" },
      { need: "Invoicing & Billing", traditional: "QuickBooks / FreshBooks", eidoncore: "Built-in" },
      { need: "Client Portal", traditional: "Custom build / Notion", eidoncore: "Built-in" },
      { need: "Proposals & E-Signatures", traditional: "PandaDoc / Better Proposals", eidoncore: "Built-in" },
      { need: "Client Support & Ticketing", traditional: "Zendesk / Freshdesk", eidoncore: "Built-in" },
      { need: "AI Assistants & Workspace", traditional: "Custom GPTs / Plugins", eidoncore: "Built-in" },
    ],
  },

  // 9. PRICING
  pricing: {
    eyebrow: "Pricing",
    title: "Simple, transparent pricing",
    description: "Start with a 14-day free PRO trial. No credit card required.",
    tiers: [
      {
        name: "Free",
        monthlyPrice: 0,
        annualPrice: 0,
        desc: "For freelancers getting started",
        features: [
          "2 Team Members",
          "3 Clients",
          "5 Active Projects",
          "3 Offerings / Services",
          "500 MB Storage",
          "Basic Reports",
          "In-App Reminders",
        ],
        cta: "Get Started Free",
        href: "https://register.eidoncore.com/",
        featured: false,
      },
      {
        name: "Pro",
        monthlyPrice: 29,
        annualPrice: 23,
        desc: "For growing agencies",
        popularBadge: "Most Popular",
        features: [
          "15 Team Members",
          "50 Clients",
          "100 Active Projects",
          "30 Services",
          "20 Automations",
          "10 GB Storage",
          "AI Workspace (19 Modules)",
          "Advanced Reports",
          "Custom Roles & Permissions",
          "Branded Emails & Client Portal",
        ],
        cta: "Start 14-Day Free Trial",
        href: "https://register.eidoncore.com/",
        featured: true,
      },
      {
        name: "Enterprise",
        monthlyPrice: 79,
        annualPrice: 63,
        desc: "For established agencies",
        features: [
          "Unlimited Everything",
          "AI Workspace (Full Write Access)",
          "Custom SMTP & Custom Domain",
          "Full White-Label Removal",
          "Advanced Security & Audit Logs",
          "100 GB Cloud Storage",
          "Dedicated Success Manager",
          "Priority 24/7 SLA Support",
        ],
        cta: "Contact Sales",
        href: "#contact",
        featured: false,
      },
    ],
  },

  // 10. TESTIMONIALS
  testimonials: {
    eyebrow: "What Agencies Say",
    title: "Loved by 500+ agencies worldwide",
    description: "Here's how Eidoncore replaces the tool stack for real agencies every single day.",
    items: [
      {
        quote:
          "We replaced Trello, HubSpot, and QuickBooks with just Eidoncore. Having our project budgets, client CRM, and invoicing connected in one platform saved us 15+ hours every week and eliminated all context switching.",
        author: "Sarah Lindqvist",
        role: "Managing Director at Studio Nine",
        stats: "15 hrs saved / week",
        replaced: "Trello + HubSpot + QuickBooks",
      },
      {
        quote:
          "The white-label client portal is what sold us. Our clients log into our own domain, see their project deliverables and invoices, and love the transparency. It elevated our agency's credibility overnight.",
        author: "Marcus Vance",
        role: "Founder at Apex Digital",
        stats: "100% white-label",
        replaced: "Notion + PandaDoc + ClickUp",
      },
    ],
  },

  // 11. FAQ
  faq: {
    eyebrow: "FAQ",
    title: "Frequently Asked Questions",
    items: [
      {
        q: "Is there a free plan?",
        a: "Yes! Eidoncore offers a permanent Free plan with up to 2 team members, 3 clients, 5 projects, and core agency features. No credit card required.",
      },
      {
        q: "Can I use my own domain?",
        a: "Absolutely. Pro and Enterprise plans allow you to map your own custom domain (e.g., portal.youragency.com) to the client portal so clients see only your agency's brand.",
      },
      {
        q: "What happens after the 14-day trial?",
        a: "Your workspace automatically downgrades to the Free plan. No data is lost — you can upgrade anytime to restore Pro or Enterprise capabilities.",
      },
      {
        q: "Can I migrate from another tool?",
        a: "Yes. Our team offers free migration assistance for Pro and Enterprise customers. We'll help you import clients, projects, tasks, and historical invoice records.",
      },
      {
        q: "Is my data secure?",
        a: "Eidoncore uses AES-256 encryption, TLS 1.3, two-factor authentication, and strict multi-tenant isolation. Your data is protected by enterprise-grade security protocols.",
      },
      {
        q: "Does Eidoncore support AI assistants?",
        a: "Yes! The built-in AI Workspace lets you connect any MCP-compatible AI assistant — like Claude, Cursor, or Windsurf — to query and manage your projects, tasks, invoices, and more securely using OAuth 2.1.",
      },
    ],
  },

  // 12. CTA
  cta: {
    eyebrow: "14-day free PRO trial",
    heading: "Ready to streamline your agency?",
    subheading:
      "Join hundreds of agencies running their entire client workflow from a single platform. Start your 14-day free PRO trial — no credit card required.",
    buttonPrimary: {
      label: "Start Free Trial →",
      href: "https://register.eidoncore.com/",
    },
    buttonSecondary: {
      label: "Explore Live Demo",
      href: "#how-it-works",
    },
    trustBadges: [
      "No credit card required",
      "Cancel anytime",
      "SOC2-ready security",
    ],
  },

  // 13. FOOTER
  footer: {
    logo: {
      name: "Eidoncore",
      tagline: "The AI-powered platform to manage and scale your client agency.",
    },
    columns: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "/features/" },
          { label: "AI Workspace", href: "/ai-workspace/" },
          { label: "Client Portal", href: "/portal/" },
          { label: "Pricing", href: "/pricing/" },
          { label: "Compare", href: "/compare/" },
        ],
      },
      {
        title: "Modules",
        links: [
          { label: "Projects", href: "/projects/" },
          { label: "Tasks", href: "/tasks/" },
          { label: "Invoicing", href: "/invoicing/" },
          { label: "CRM", href: "/crm/" },
          { label: "Proposals", href: "/proposals/" },
          { label: "Automations", href: "/automations/" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Documentation", href: "/docs/" },
          { label: "Changelog", href: "/changelog/" },
          { label: "Demo", href: "/demo/" },
          { label: "FAQ", href: "/faq/" },
          { label: "Blog", href: "/blog/" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/about/" },
          { label: "Customers", href: "/customers/" },
          { label: "Use Cases", href: "/use-cases/" },
          { label: "Partners", href: "/partners/" },
          { label: "Contact", href: "/contact/" },
        ],
      },
    ],
    legal: {
      copyright: `© ${new Date().getFullYear()} Eidoncore, Inc. All rights reserved.`,
      badges: ["AES-256 Encrypted", "SOC 2 Ready", "GDPR Compliant"],
      links: [
        { label: "Privacy Policy", href: "/privacy/" },
        { label: "Terms of Service", href: "/terms/" },
        { label: "Security", href: "/security/" },
      ],
    },
  },
};
