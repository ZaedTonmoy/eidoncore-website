"use client";

import React, { useState } from "react";
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
import {
  Users,
  FolderKanban,
  CheckCircle2,
  MessageSquare,
  Zap,
  Receipt,
  BarChart3,
  Check,
  ArrowRight,
  Sparkles,
  Calendar,
} from "lucide-react";

const TOUR_STEPS = [
  {
    step: "01",
    title: "1. Win the Client",
    desc: "Track prospective deals through your pipeline, send interactive proposals with legal e-signatures, and auto-convert won deals into active projects.",
    icon: <Users size={20} className="text-amber-600" />,
    image: "/images/crm-content.webp",
    points: [
      "Visual drag-and-drop deal pipeline",
      "Automatic contract & proposal generation",
      "Health scoring on historical accounts",
      "Instant 1-click workspace onboarding",
    ],
  },
  {
    step: "02",
    title: "2. Launch Project & Budget",
    desc: "Deploy pre-built agency templates for web design, marketing, or development. Set fixed or hourly budgets and milestone release schedules.",
    icon: <FolderKanban size={20} className="text-[#3F72AF]" />,
    image: "/images/projects-content.webp",
    points: [
      "Hourly or fixed-dollar budget modes",
      "Milestone breakdown with dependency gates",
      "Real-time budget burndown alerts",
      "Automatic client visibility inside the portal",
    ],
  },
  {
    step: "03",
    title: "3. Assign & Execute Tasks",
    desc: "Fluid Kanban boards and compact list views give specialists clarity on deliverables, priorities, and deadlines without context switching.",
    icon: <CheckCircle2 size={20} className="text-emerald-600" />,
    image: "/images/tasks-board-content.webp",
    points: [
      "Drag-and-drop Kanban columns with WIP limits",
      "Checklists and multi-specialist subtasks",
      "Integrated 1-click billable timers",
      "Keyboard shortcuts for rapid task creation",
    ],
  },
  {
    step: "04",
    title: "4. Collaborate in Context",
    desc: "Chat directly in project channels and 1-on-1 team direct messages. Keep internal strategy private from clients with clear security tags.",
    icon: <MessageSquare size={20} className="text-blue-600" />,
    image: "/images/messages-content.webp",
    points: [
      "Project-linked channels preserving decision history",
      "Internal-only notes invisible to client eyes",
      "Integrated file vault with instant previews",
      "Real-time typing and read receipts",
    ],
  },
  {
    step: "05",
    title: "5. Automate Repetitive Work",
    desc: "Trigger actions when milestones are reached, invoices are paid, or tasks are assigned. Zero code or Zapier subscription needed.",
    icon: <Zap size={20} className="text-purple-600" />,
    image: "/images/automations-content.webp",
    points: [
      "Visual Trigger → Condition → Action rule builder",
      "Automated Slack alerts for team milestones",
      "Branded welcome emails for new clients",
      "Outbound signed webhooks for custom software",
    ],
  },
  {
    step: "06",
    title: "6. Invoice & Get Paid Fast",
    desc: "Convert completed milestones or logged time into professional invoices with one click. Retainers recur on schedule and bill cards automatically.",
    icon: <Receipt size={20} className="text-rose-600" />,
    image: "/images/invoices-content.webp",
    points: [
      "Instant Stripe checkout with credit card and ACH",
      "Automated recurring retainer subscriptions",
      "Polite automated reminder emails",
      "White-label invoice PDFs with your corporate VAT",
    ],
  },
  {
    step: "07",
    title: "7. Report & Scale Profitably",
    desc: "Measure gross margin by offering, billable utilization per employee, and client lifetime value. Scale with data-driven confidence.",
    icon: <BarChart3 size={20} className="text-teal-600" />,
    image: "/images/reports-content.webp",
    points: [
      "Live MRR and cash flow velocity tracking",
      "Team billable vs. overhead hours breakdown",
      "Automated quarterly executive PDF summaries",
      "One-click data export to CSV and accounting tools",
    ],
  },
];

export default function DemoPage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="min-h-screen bg-white text-[#0B0B0F] flex flex-col antialiased selection:bg-[#3F72AF]/15 selection:text-[#0B0B0F]">
      <Navbar />

      <main className="flex-1">
        {/* Inner Hero */}
        <InnerHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Product Tour" },
          ]}
          eyebrow="Interactive Agency Walkthrough"
          title="See Eidoncore in Action"
          description="Walk through the complete lifecycle of an agency workflow — from winning a high-ticket client to delivering milestones and collecting payment. No credit card required."
          ctaPrimary={{
            label: "Start 14-Day Free Trial →",
            href: "https://register.eidoncore.com/",
          }}
          ctaSecondary={{
            label: "Book Live 1-on-1 Demo",
            href: "/contact/",
          }}
        />

        {/* 7 Steps Horizontal Navigation Bar */}
        <section className="py-8 bg-[#F8FAFC] border-b border-[#E7E7EA] sticky top-16 z-30 backdrop-blur-md bg-white/90">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 min-w-max">
              {TOUR_STEPS.map((s, idx) => (
                <button
                  key={s.step}
                  onClick={() => setActiveStep(idx)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    activeStep === idx
                      ? "bg-[#0F172A] text-white shadow-xs"
                      : "bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] hover:border-[#3F72AF]/40"
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-75">{s.step}</span>
                  <span>{s.title.split(". ")[1]}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Active Stage Interactive Showcase */}
        <section className="py-16 md:py-24 bg-white border-b border-[#E7E7EA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Text Side */}
              <div className="flex-1 max-w-xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-8 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center shadow-2xs">
                    {TOUR_STEPS[activeStep].icon}
                  </span>
                  <SectionBadge text={`Step ${TOUR_STEPS[activeStep].step} of 07`} className="!mb-0" />
                </div>

                <AnimatedHeading
                  as="h2"
                  text={TOUR_STEPS[activeStep].title}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A]"
                />

                <p className="mt-4 text-xs sm:text-sm md:text-base text-[#64748B] leading-relaxed">
                  {TOUR_STEPS[activeStep].desc}
                </p>

                <ul className="mt-6 flex flex-col gap-3">
                  {TOUR_STEPS[activeStep].points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="text-xs sm:text-sm text-[#334155] font-medium">
                        {pt}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex items-center gap-4">
                  <AnimatedButton
                    as="a"
                    href="https://register.eidoncore.com/"
                    variant="primary"
                    className="text-xs px-5 py-2.5 font-semibold"
                  >
                    Try This Workflow →
                  </AnimatedButton>
                  {activeStep < TOUR_STEPS.length - 1 ? (
                    <button
                      onClick={() => setActiveStep(activeStep + 1)}
                      className="text-xs font-semibold text-[#3F72AF] hover:underline flex items-center gap-1"
                    >
                      Next step <ArrowRight size={12} />
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveStep(0)}
                      className="text-xs font-semibold text-[#3F72AF] hover:underline flex items-center gap-1"
                    >
                      Back to Step 1 <ArrowRight size={12} />
                    </button>
                  )}
                </div>
              </div>

              {/* Visual Device Preview */}
              <div className="flex-1 w-full max-w-xl">
                <div className="relative rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:p-6 shadow-sm overflow-hidden group">
                  <div className="flex items-center gap-1.5 pb-3 border-b border-[#E2E8F0] mb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
                    <span className="text-[10px] font-mono text-[#94A3B8] ml-2">
                      app.eidoncore.com/workflow/{TOUR_STEPS[activeStep].step}
                    </span>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-[#E2E8F0] bg-white shadow-2xs">
                    <img
                      src={TOUR_STEPS[activeStep].image}
                      alt={TOUR_STEPS[activeStep].title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid: Why All-In-One Beats 5 Tools (Uses Platform modules box style & slow reveal) */}
        <section className="py-20 md:py-28 bg-[#F8FAFC] border-b border-[#E7E7EA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-14">
              <SectionBadge text="Unified Architecture" />
              <AnimatedHeading
                as="h2"
                text="The Power of All 19 Modules Connected"
                className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A]"
              />
              <p className="mt-3 text-[#64748B] text-sm sm:text-base leading-relaxed">
                When your project management, CRM, invoicing, and AI share the exact same database, magical things happen automatically.
              </p>
            </div>

            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StaggerItem className="group bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col justify-between hover:border-[#3F72AF]/40 hover:shadow-xs transition-[border-color,background-color,box-shadow] duration-200">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#3F72AF] border border-blue-100 flex items-center justify-center mb-5 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                    <Receipt size={20} />
                  </div>
                  <h3 className="text-base font-semibold text-[#0F172A] tracking-tight group-hover:text-[#3F72AF] transition-colors">
                    Paid Invoices Unlock Tasks
                  </h3>
                  <p className="mt-2 text-xs text-[#64748B] leading-relaxed">
                    Zero manual verification. When a retainer clears, sprint tasks automatically switch from On Hold to In Progress.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#E2E8F0] text-xs text-[#64748B] flex items-center justify-between">
                  <span className="font-mono text-[11px] text-emerald-600 font-semibold">Instant Sync</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </StaggerItem>

              <StaggerItem className="group bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col justify-between hover:border-[#3F72AF]/40 hover:shadow-xs transition-[border-color,background-color,box-shadow] duration-200">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mb-5 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                    <Sparkles size={20} />
                  </div>
                  <h3 className="text-base font-semibold text-[#0F172A] tracking-tight group-hover:text-[#3F72AF] transition-colors">
                    AI Sees Complete Context
                  </h3>
                  <p className="mt-2 text-xs text-[#64748B] leading-relaxed">
                    Ask Claude to draft proposals or summarize profits because the AI has secure MCP access to all agency data.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#E2E8F0] text-xs text-[#64748B] flex items-center justify-between">
                  <span className="font-mono text-[11px] text-indigo-600 font-semibold">MCP Native</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </StaggerItem>

              <StaggerItem className="group bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col justify-between hover:border-[#3F72AF]/40 hover:shadow-xs transition-[border-color,background-color,box-shadow] duration-200">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center mb-5 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                    <Users size={20} />
                  </div>
                  <h3 className="text-base font-semibold text-[#0F172A] tracking-tight group-hover:text-[#3F72AF] transition-colors">
                    Zero Per-Seat Fees
                  </h3>
                  <p className="mt-2 text-xs text-[#64748B] leading-relaxed">
                    Invite internal designers, account managers, and contractors without worrying about exponential monthly bill shock.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#E2E8F0] text-xs text-[#64748B] flex items-center justify-between">
                  <span className="font-mono text-[11px] text-purple-600 font-semibold">Flat Pricing</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />

        {/* Unified FAQ */}
        <FAQSection />

        {/* Global CTA */}
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
