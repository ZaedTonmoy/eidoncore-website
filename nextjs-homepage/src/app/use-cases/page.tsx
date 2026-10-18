"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InnerHero from "@/components/InnerHero";
import CTA from "@/components/CTA";
import FAQSection from "@/components/FAQSection";
import Testimonials from "@/components/Testimonials";
import { StaggerGroup, StaggerItem } from "@/components/StaggerReveal";
import AnimatedHeading from "@/components/AnimatedHeading";
import AnimatedButton from "@/components/AnimatedButton";
import SectionBadge from "@/components/SectionBadge";
import BlendedFeaturePreview from "@/components/BlendedFeaturePreview";
import {
  Megaphone,
  Palette,
  Code2,
  Briefcase,
  UserCheck,
  Check,
  ArrowRight,
  ArrowDown,
  Layout,
  CheckCircle2,
  Receipt,
  FileText,
  Zap,
  Bot,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Content                                                                    */
/* -------------------------------------------------------------------------- */

interface Vertical {
  id: string; // keep in sync with the Navbar "Use Cases" dropdown anchors
  name: string;
  Icon: LucideIcon;
  iconClass: string; // tile colours
  summary: string; // short line for the overview card
  tagline: string; // row heading
  desc: string;
  points: string[];
  modules: { name: string; href: string }[];
  featureHref: string;
  featureName: string;
  // Which live feature screen illustrates this section (same screens as the feature pages)
  screen: { moduleName: string; featureIndex: string; title: string };
}

const VERTICALS: Vertical[] = [
  {
    id: "marketing",
    name: "Marketing Agencies",
    Icon: Megaphone,
    iconClass: "bg-pink-50 text-pink-600 border-pink-100",
    summary: "Recurring retainers, client portals and fast onboarding.",
    tagline: "Run retainers and client accounts without the chaos",
    desc: "Keep every client on a predictable monthly rhythm. Retainers bill themselves, deliverables stay on schedule, and clients check progress in their own portal.",
    points: [
      "Recurring retainers that auto-charge through Stripe",
      "Monthly, quarterly or custom billing for each client",
      "White-label client portal for live campaign reporting",
      "Intake forms that onboard new accounts fast",
    ],
    modules: [
      { name: "Invoicing", href: "/invoicing/" },
      { name: "Client Portal", href: "/portal/" },
      { name: "CRM & Clients", href: "/crm/" },
      { name: "Intake Forms", href: "/intake-forms/" },
    ],
    featureHref: "/invoicing/",
    featureName: "Invoicing",
    // Invoicing 01: recurring retainers dashboard (Monthly Design Retainer, SEO & Growth Retainer...)
    screen: { moduleName: "Invoicing", featureIndex: "01", title: "Recurring retainers" },
  },
  {
    id: "design",
    name: "Design Studios",
    Icon: Palette,
    iconClass: "bg-purple-50 text-purple-600 border-purple-100",
    summary: "Milestones, client sign-off and secure file hand-off.",
    tagline: "Break every project into milestones clients can sign off",
    desc: "Split each design project into clear phases with due dates and linked tasks. Clients review the work and approve it before the next phase starts.",
    points: [
      "Milestones with due dates and linked tasks",
      "Client review and sign-off before each phase moves on",
      "Productized design packages and one-click add-ons",
      "Expiring download links protect your source files",
    ],
    modules: [
      { name: "Projects", href: "/projects/" },
      { name: "Client Portal", href: "/portal/" },
      { name: "Proposals & E-Sign", href: "/proposals/" },
      { name: "Digital Products", href: "/digital-products/" },
    ],
    featureHref: "/projects/",
    featureName: "Projects",
    // Projects 02: milestone management (design tokens, client review, handover)
    screen: { moduleName: "Projects", featureIndex: "02", title: "Project milestones" },
  },
  {
    id: "development",
    name: "Software & Web Agencies",
    Icon: Code2,
    iconClass: "bg-blue-50 text-[#3F72AF] border-blue-100",
    summary: "Sprint boards, subtasks, billable time and MCP.",
    tagline: "Plan sprints on boards your whole team can follow",
    desc: "Run sprints on Kanban boards or lists, set priorities and due dates, and break work into subtasks. Connect Claude and Cursor through MCP and track billable time on every task.",
    points: [
      "Board and list views with priorities, assignees and due dates",
      "Subtasks, checklists and live billable timers",
      "Budget alerts when hours pass the estimate",
      "Claude and Cursor access through MCP",
    ],
    modules: [
      { name: "Tasks", href: "/tasks/" },
      { name: "Projects", href: "/projects/" },
      { name: "AI Workspace", href: "/ai-workspace/" },
      { name: "Tickets", href: "/tickets/" },
    ],
    featureHref: "/tasks/",
    featureName: "Tasks",
    // Tasks 01: Kanban board + list view
    screen: { moduleName: "Tasks", featureIndex: "01", title: "Kanban and list views" },
  },
  {
    id: "consulting",
    name: "Consulting & Advisory Firms",
    Icon: Briefcase,
    iconClass: "bg-amber-50 text-amber-600 border-amber-100",
    summary: "Revenue, cash flow and e-signed proposals.",
    tagline: "See engagement revenue and cash flow at a glance",
    desc: "Know how your engagements are performing without building a spreadsheet. Follow revenue pacing, invoiced versus collected cash, and keep internal notes away from clients.",
    points: [
      "Revenue pacing with an end-of-month projection",
      "Invoiced vs collected cash flow and collection rate",
      "Internal notes isolated from the client portal",
      "Proposals with legally binding e-signatures",
    ],
    modules: [
      { name: "Reports", href: "/reports/" },
      { name: "Proposals", href: "/proposals/" },
      { name: "Invoicing", href: "/invoicing/" },
      { name: "Team Directory", href: "/team/" },
    ],
    featureHref: "/reports/",
    featureName: "Reports",
    // Reports 01: financial intelligence (revenue pacing + cash flow tabs)
    screen: { moduleName: "Reports & Intelligence", featureIndex: "01", title: "Financial intelligence" },
  },
  {
    id: "freelancers",
    name: "Freelancers & Solo Studios",
    Icon: UserCheck,
    iconClass: "bg-emerald-50 text-emerald-600 border-emerald-100",
    summary: "Packaged services and one tool instead of five.",
    tagline: "Sell packaged services and look like a full agency",
    desc: "Turn what you do into clear, click-to-buy packages. Clients order online and pay you, while a custom-branded portal keeps everything professional, all from one tool.",
    points: [
      "Service catalog with recurring and one-time pricing",
      "Replaces ClickUp, QuickBooks, PandaDoc and Typeform",
      "14-day free trial, no credit card needed",
      "Flat pricing that never penalizes you for adding contractors",
    ],
    modules: [
      { name: "Services", href: "/services/" },
      { name: "Invoicing", href: "/invoicing/" },
      { name: "Proposals", href: "/proposals/" },
      { name: "Dashboard", href: "/dashboard/" },
    ],
    featureHref: "/services/",
    featureName: "Services",
    // Services 01: productized catalog (click-to-buy packages)
    screen: { moduleName: "Offerings & Services", featureIndex: "01", title: "Productized service catalog" },
  },
];

const STATS = [
  { value: "19", label: "Connected modules" },
  { value: "5", label: "Agency setups covered" },
  { value: "100", suffix: "%", label: "White-label client portal" },
  { value: "14", suffix: "-day", label: "Free trial, no card" },
];

const FOUNDATION: {
  title: string;
  tag: string;
  desc: string;
  href: string;
  Icon: LucideIcon;
  iconClass: string;
}[] = [
  {
    title: "White-Label Client Portal",
    tag: "Client experience",
    desc: "Clients approve milestones, pay invoices and see deliverables under your own domain, without asking for updates.",
    href: "/portal/",
    Icon: Layout,
    iconClass: "text-[#3F72AF]",
  },
  {
    title: "Tasks & Team Capacity",
    tag: "Operations",
    desc: "Kanban boards, workload views and live billable timers keep projects profitable and your team balanced.",
    href: "/tasks/",
    Icon: CheckCircle2,
    iconClass: "text-emerald-600",
  },
  {
    title: "Invoicing & Retainers",
    tag: "Revenue",
    desc: "Recurring retainers, upfront deposits and live margin tracking help you get paid on time.",
    href: "/invoicing/",
    Icon: Receipt,
    iconClass: "text-purple-600",
  },
  {
    title: "Proposals & E-Sign",
    tag: "Sales",
    desc: "Block-based proposals with line-item pricing and e-signatures that convert straight into live projects.",
    href: "/proposals/",
    Icon: FileText,
    iconClass: "text-amber-600",
  },
  {
    title: "Automations",
    tag: "Workflows",
    desc: "Trigger, condition, action. Automate assignments, emails, status changes and webhook alerts.",
    href: "/automations/",
    Icon: Zap,
    iconClass: "text-amber-500",
  },
  {
    title: "AI Workspace",
    tag: "New",
    desc: "Let Claude, Cursor or any MCP assistant manage tasks, billing and projects with role-based access.",
    href: "/ai-workspace/",
    Icon: Bot,
    iconClass: "text-indigo-600",
  },
];

/* -------------------------------------------------------------------------- */
/* Mounts a heavy live screen only while it is near the viewport.             */
/* Each feature screen runs its own timers, so this keeps 5 of them from      */
/* running at the same time.                                                  */
/* -------------------------------------------------------------------------- */

function LazyScreen({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const lastHeight = useRef(480);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          lastHeight.current = el.offsetHeight || lastHeight.current;
          setVisible(false);
        }
      },
      { rootMargin: "400px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={visible ? undefined : { minHeight: lastHeight.current }}>
      {visible && children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function UseCasesPage() {
  // Support deep links like /use-cases/#design (used by the navbar dropdown)
  useEffect(() => {
    const hash = window.location.hash.replace("#", "").toLowerCase();
    if (!hash || !VERTICALS.some((v) => v.id === hash)) return;
    const t = setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 250);
    return () => clearTimeout(t);
  }, []);

  const jumpTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <div className="min-h-screen bg-white text-[#0B0B0F] flex flex-col antialiased selection:bg-[#3F72AF]/15 selection:text-[#0B0B0F] overflow-x-clip">
      <Navbar />

      <main id="main-content" className="flex-1 overflow-x-clip">
        {/* Hero */}
        <InnerHero
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Use Cases" }]}
          eyebrow="Use Cases"
          title="Built for the way your agency works"
          description="Marketing, design, software, consulting or solo. See how Eidoncore fits your workflow from the first proposal to the final invoice."
          ctaPrimary={{ label: "Start 14-Day Free Trial →", href: "https://register.eidoncore.com/" }}
          ctaSecondary={{ label: "Explore 19 Modules", href: "/features/" }}
        />

        {/* Overview: pick your agency type */}
        <section className="py-20 md:py-28 bg-white border-b border-[#E7E7EA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-14">
              <SectionBadge text="Find Your Fit" />
              <AnimatedHeading
                as="h2"
                text="Pick the Setup That Matches Your Business"
                className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A]"
              />
              <p className="mt-3 text-[#64748B] text-sm sm:text-base leading-relaxed">
                Every agency type gets the same connected platform, with the modules that matter most to you up front.
              </p>
            </div>

            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {VERTICALS.map((v) => (
                <StaggerItem key={v.id} className="h-full">
                  <a
                    href={`#${v.id}`}
                    onClick={(e) => jumpTo(e, v.id)}
                    className="group h-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 flex flex-col justify-between hover:border-[#3F72AF]/40 hover:bg-white hover:shadow-xs transition-[border-color,background-color,box-shadow] duration-200"
                  >
                    <div>
                      <div
                        className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-200 ${v.iconClass}`}
                      >
                        <v.Icon size={18} />
                      </div>
                      <h3 className="text-base font-semibold text-[#0F172A] tracking-tight group-hover:text-[#3F72AF] transition-colors">
                        {v.name}
                      </h3>
                      <p className="mt-2 text-xs text-[#64748B] leading-relaxed">{v.summary}</p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B] group-hover:text-[#0F172A] transition-colors">
                      <span className="font-medium text-[11px]">See the workflow</span>
                      <ArrowDown size={12} className="group-hover:translate-y-0.5 transition-transform" />
                    </div>
                  </a>
                </StaggerItem>
              ))}

              <StaggerItem className="h-full">
                <Link
                  href="/features/"
                  className="group h-full bg-white border border-dashed border-[#CBD5E1] rounded-2xl p-6 flex flex-col justify-between hover:border-[#3F72AF]/50 hover:shadow-xs transition-[border-color,box-shadow] duration-200"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center mb-5 text-[#3F72AF]">
                      <Layout size={18} />
                    </div>
                    <h3 className="text-base font-semibold text-[#0F172A] tracking-tight group-hover:text-[#3F72AF] transition-colors">
                      Something different?
                    </h3>
                    <p className="mt-2 text-xs text-[#64748B] leading-relaxed">
                      Not on the list? Browse all 19 modules and build the setup that fits your team.
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B] group-hover:text-[#0F172A] transition-colors">
                    <span className="font-medium text-[11px]">Explore all modules</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </section>

        {/* Vertical rows (same alternating layout as the feature pages) */}
        <section className="py-20 md:py-28 bg-white border-b border-[#E7E7EA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col gap-24 sm:gap-32">
            {VERTICALS.map((v, idx) => {
              const isReverse = idx % 2 === 1;
              return (
                <div
                  key={v.id}
                  id={v.id}
                  className={`scroll-mt-28 flex flex-col ${
                    isReverse ? "lg:flex-row-reverse" : "lg:flex-row"
                  } items-center gap-12 lg:gap-16`}
                >
                  {/* Text side */}
                  <div className="flex-1 w-full max-w-xl min-w-0">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-7 h-7 rounded-lg bg-[#3F72AF]/10 text-[#2F5F96] font-mono text-xs font-bold flex items-center justify-center border border-[#3F72AF]/20 shrink-0">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <SectionBadge text={v.name} className="!mb-0" />
                    </div>

                    <AnimatedHeading
                      as="h2"
                      text={v.tagline}
                      className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] leading-tight"
                    />

                    <p className="mt-4 text-xs sm:text-sm md:text-base text-[#64748B] leading-relaxed">
                      {v.desc}
                    </p>

                    <ul className="mt-6 flex flex-col gap-3">
                      {v.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                            <Check size={12} strokeWidth={3} />
                          </div>
                          <span className="text-xs sm:text-sm text-[#334155] font-medium leading-snug">{pt}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] mr-1">
                        Modules
                      </span>
                      {v.modules.map((m) => (
                        <Link
                          key={m.name}
                          href={m.href}
                          className="px-2.5 py-1 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[11px] font-medium text-[#334155] hover:border-[#3F72AF]/40 hover:text-[#3F72AF] transition-colors"
                        >
                          {m.name}
                        </Link>
                      ))}
                    </div>

                    <div className="mt-8 flex items-center gap-5 flex-wrap">
                      <AnimatedButton
                        as="a"
                        href="https://register.eidoncore.com/"
                        variant="primary"
                        className="text-xs px-5 py-2.5 font-semibold"
                      >
                        Start Free Trial →
                      </AnimatedButton>
                      <Link
                        href={v.featureHref}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors"
                      >
                        <span>Explore {v.featureName}</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>

                  {/* Visual side: one live preview, no toggle */}
                  <div className="flex-1 w-full max-w-xl min-w-0">
                    <LazyScreen>
                      <BlendedFeaturePreview
                        title={v.screen.title}
                        moduleName={v.screen.moduleName}
                        featureIndex={v.screen.featureIndex}
                      />
                    </LazyScreen>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Stats strip */}
        <section className="py-14 bg-[#F8FAFC] border-b border-[#E7E7EA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {STATS.map((st) => (
                <div key={st.label} className="text-center p-4">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A]">
                    {st.value}
                    {st.suffix && <span className="text-[#3F72AF]">{st.suffix}</span>}
                  </div>
                  <div className="mt-2 text-xs sm:text-sm font-medium text-[#64748B]">{st.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Shared foundation */}
        <section className="py-20 md:py-28 bg-white border-b border-[#E7E7EA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-14">
              <SectionBadge text="One Platform" />
              <AnimatedHeading
                as="h2"
                text="Every Agency Type Runs on the Same Core"
                className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A]"
              />
              <p className="mt-3 text-[#64748B] text-sm sm:text-base leading-relaxed">
                Whatever your niche, these connected tools keep clients happy, your team busy and your cash flow steady.
              </p>
            </div>

            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FOUNDATION.map((f) => (
                <StaggerItem key={f.title} className="h-full">
                  <Link
                    href={f.href}
                    className="group h-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 flex flex-col justify-between hover:border-[#3F72AF]/40 hover:bg-white hover:shadow-xs transition-[border-color,background-color,box-shadow] duration-200"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform duration-200">
                          <f.Icon size={18} className={f.iconClass} />
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded font-semibold bg-neutral-100 text-neutral-700 border border-neutral-200">
                          {f.tag}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-[#0F172A] tracking-tight group-hover:text-[#3F72AF] transition-colors">
                        {f.title}
                      </h3>
                      <p className="mt-2 text-xs text-[#64748B] leading-relaxed">{f.desc}</p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B] group-hover:text-[#0F172A] transition-colors">
                      <span className="font-medium text-[11px]">Learn more</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        <Testimonials />
        <FAQSection />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
