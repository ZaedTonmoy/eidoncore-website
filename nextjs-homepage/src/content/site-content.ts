export const siteContent = {
  // 1. NAVBAR
  navbar: {
    logo: {
      name: "Platform",
      symbol: "▲",
    },
    links: [
      { label: "Product", href: "#product" },
      { label: "Resources", href: "#resources" },
      { label: "Customers", href: "#customers" },
      { label: "Pricing", href: "#pricing" },
      { label: "Now", href: "#now" },
      { label: "Contact", href: "#contact" },
    ],
    actions: {
      login: { label: "Log in", href: "#login" },
      signup: { label: "Sign up", href: "#signup" },
    },
  },

  // 2. HERO
  hero: {
    headline: "The product development system for teams and agents",
    subheadline: "A purpose-built workspace uniting issue tracking, roadmaps, and automated agents into one fluid flow.",
    announcement: {
      text: "New: Autonomous Triage 2.0 →",
      href: "#announcement",
    },
    appMockup: {
      sidebar: {
        workspace: "Acme Studio",
        user: "Sarah Jenkins",
        navItems: [
          { label: "Inbox", count: 3 },
          { label: "My Issues", count: 12 },
          { label: "Roadmaps", count: null },
          { label: "Views", count: null },
        ],
        teams: [
          { name: "Core Engine", count: 8 },
          { name: "Frontend Platform", count: 14 },
          { name: "Agent Infrastructure", count: 6 },
        ],
      },
      issue: {
        id: "ENG-1042",
        team: "Core Engine",
        title: "Refactor agent orchestration protocol for high-concurrency event streams",
        description:
          "Implement optimistic reconciliation for agent dispatching pipelines. Ensure fallback channels trigger sub-50ms failover without dropped WebSocket frames.",
        checklist: [
          { done: true, text: "Define protocol buffer schemas for event payloads" },
          { done: true, text: "Add distributed trace IDs across message hops" },
          { done: false, text: "Benchmark p99 latency under 20k simulated agent workers" },
        ],
        activity: [
          { author: "Alex Rivera", action: "pushed commit", meta: "c8f921a - Add worker pool balancer", time: "18m ago" },
          { author: "Linear Agent", action: "auto-linked PR", meta: "#482 (Passing all tests)", time: "12m ago" },
          { author: "Sarah Jenkins", action: "approved PR", meta: "Ready for canary rollout", time: "4m ago" },
        ],
        properties: {
          status: "In Progress",
          priority: "Urgent",
          assignee: "Sarah Jenkins",
          cycle: "Cycle 42",
          project: "Autonomous Ops Q3",
          labels: ["Architecture", "Agent Engine", "P0"],
        },
      },
    },
  },

  // 3. LOGO STRIP
  logoStrip: {
    label: "Trusted by the world’s best product teams",
    logos: [
      "VERCEL",
      "RAMP",
      "SCALE AI",
      "SUBSTACK",
      "MERCURY",
      "DESCRIPT",
      "RETOOL",
    ],
  },

  // 4. BIG STATEMENT
  statement: {
    firstSentence: "A new speed of software design. Purpose-built for modern product teams.",
    rest: "An all-in-one system to plan, build, and deliver the next generation of software products with unrelenting craft, tactile responsiveness, and sub-50ms velocity.",
  },

  // 5. THREE FEATURE COLUMNS (Pillars)
  pillars: [
    {
      index: "1.0",
      title: "Purpose-built for product craft",
      description: "Obsessively engineered for high-agency software teams who treat software as craft rather than paperwork.",
      iconType: "compass",
    },
    {
      index: "1.1",
      title: "Designed for modern velocity",
      description: "Keyboard-first navigation, optimistic UI updates, and sub-50ms synchronization that never blocks your flow.",
      iconType: "stack",
    },
    {
      index: "1.2",
      title: "Built for teams and agents",
      description: "Seamlessly integrate autonomous agents directly into your sprint cycles, code reviews, and issue triage.",
      iconType: "lattice",
    },
  ],

  // 6. FOUR FEATURE SECTIONS
  featureSections: [
    {
      id: "intake",
      title: "Intake and integrations",
      description: "Consolidate customer bug reports, community Discord pings, and internal requests directly into prioritised execution boards without losing context.",
      learnMoreHref: "#intake-details",
      features: [
        { label: "Slack & Discord sync", href: "#slack" },
        { label: "Customer portal", href: "#portal" },
        { label: "Bi-directional GitHub links", href: "#github" },
        { label: "Public issue submission", href: "#public" },
      ],
    },
    {
      id: "planning",
      title: "Planning and monitoring",
      description: "Align your entire organization around multi-quarter roadmaps, automated velocity tracking, and cycle burndowns that stay honest.",
      learnMoreHref: "#planning-details",
      features: [
        { label: "Interactive Gantt roadmaps", href: "#gantt" },
        { label: "Cycle burndown scatter", href: "#burndown" },
        { label: "Capacity heatmaps", href: "#capacity" },
        { label: "Initiative dependencies", href: "#dependencies" },
      ],
    },
    {
      id: "ai",
      title: "AI and automations",
      description: "Put repetitive triage on autopilot. Autonomous agents summarize stack traces, identify duplicate bugs, and draft pull request descriptions in seconds.",
      learnMoreHref: "#ai-details",
      features: [
        { label: "Autonomous stack trace triage", href: "#triage" },
        { label: "Duplicate issue clustering", href: "#clustering" },
        { label: "Workflow state transitions", href: "#transitions" },
        { label: "Custom webhook recipes", href: "#webhooks" },
      ],
    },
    {
      id: "build",
      title: "Build, review, and ship",
      description: "Close the feedback loop with native git branch management, PR review gates, and automated issue resolution upon production deployment.",
      learnMoreHref: "#build-details",
      features: [
        { label: "Git branch synchronization", href: "#branch" },
        { label: "Inline diff inspection", href: "#diff" },
        { label: "Staging deployment markers", href: "#deploy" },
        { label: "Release notes generator", href: "#release" },
      ],
    },
  ],

  // 7. CHANGELOG
  changelog: {
    heading: "Changelog",
    viewAllHref: "#changelog-all",
    items: [
      {
        tag: "ENGINE",
        title: "Autonomous Agent Protocol v2",
        description: "Zero-latency event streaming for multi-agent triage and review tasks.",
        date: "Sep 18, 2026",
      },
      {
        tag: "SYNC",
        title: "Sub-50ms Sync Engine",
        description: "Optimistic conflict resolution with local SQLite cache for all clients.",
        date: "Sep 11, 2026",
      },
      {
        tag: "PLANNING",
        title: "Dynamic Milestone Dependencies",
        description: "Automatic timeline cascading and resource capacity warnings.",
        date: "Aug 28, 2026",
      },
      {
        tag: "DESKTOP",
        title: "Desktop Client 2.4",
        description: "Multi-tab workspaces, global command palette, and offline queues.",
        date: "Aug 14, 2026",
      },
    ],
  },

  // 8. TESTIMONIALS
  testimonials: {
    cardLeft: {
      quote: "The speed of execution we unlocked after standardizing on this platform transformed how our engineering teams ship every single week.",
      author: "Sarah Lin",
      role: "VP of Engineering, OpenAI",
    },
    cardRight: {
      quote: "It’s exceedingly rare to find software that respects your keyboard shortcuts and attention this deeply. It feels like an extension of your own mind.",
      author: "Alexandre Martin",
      role: "Head of Product, Ramp",
    },
    footerLabel: "Read how leading teams accelerate release cadence",
    customerStoriesHref: "#customer-stories",
  },

  // 9. FINAL CALL TO ACTION
  cta: {
    heading: "Built for the future. Available today.",
    subheading: "Join thousands of world-class software teams building with clarity and velocity.",
    buttonPrimary: { label: "Get started", href: "#get-started" },
    buttonSecondary: { label: "Contact sales", href: "#contact-sales" },
  },

  // 10. FOOTER
  footer: {
    logo: {
      name: "Platform",
      tagline: "The modern software development operating system.",
    },
    columns: [
      {
        title: "Product",
        links: ["Issues", "Cycles", "Roadmaps", "Insights", "Automations", "Integrations"],
      },
      {
        title: "Features",
        links: ["Keyboard shortcuts", "Command menu", "Offline sync", "Security & SOC2", "Desktop apps"],
      },
      {
        title: "Company",
        links: ["About us", "Changelog", "Careers", "Brand assets", "Contact us"],
      },
      {
        title: "Resources",
        links: ["Documentation", "API Reference", "Community Discord", "Status page", "Customers"],
      },
      {
        title: "Connect",
        links: ["GitHub", "Twitter / X", "LinkedIn", "YouTube", "Newsletter"],
      },
    ],
    legal: {
      copyright: "© 2026 Platform Technologies Inc. All rights reserved.",
      links: [
        { label: "Privacy Policy", href: "#privacy" },
        { label: "Terms of Service", href: "#terms" },
        { label: "Security", href: "#security" },
        { label: "Cookie Settings", href: "#cookies" },
      ],
    },
  },
};
