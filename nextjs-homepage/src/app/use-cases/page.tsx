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
import AnimatedImage from "@/components/AnimatedImage";
import {
  Megaphone,
  Palette,
  Code2,
  Briefcase,
  UserCheck,
  Check,
  ArrowRight,
  Sparkles,
  Layers,
  Clock,
  Receipt,
} from "lucide-react";

const VERTICALS = [
  {
    id: "marketing",
    name: "Marketing Agencies",
    icon: <Megaphone size={22} className="text-pink-600" />,
    tagline: "Manage campaigns, retainers, and client approvals with zero chaos",
    desc: "Coordinate ad campaigns, content calendars, and social deliverables across multiple client accounts. Track monthly recurring retainers and send automated performance digests.",
    points: [
      "Campaign milestone schedules with integrated asset reviews",
      "Automated monthly recurring retainer invoicing via Stripe",
      "White-label client portal for real-time campaign reporting",
      "Intake questionnaires for rapid onboarding of new client accounts",
    ],
    image: "/images/crm-content.webp",
  },
  {
    id: "design",
    name: "Design Studios",
    icon: <Palette size={22} className="text-purple-600" />,
    tagline: "Frictionless design proofs, revision rounds & deliverable delivery",
    desc: "Present Figma links, brand assets, and creative proofs cleanly. Let clients leave targeted feedback and approve milestone releases before final file handoff.",
    points: [
      "Dedicated asset galleries with rich in-browser image previews",
      "Milestone-based approval gating before invoice releases",
      "Productized design subscriptions and one-click add-ons",
      "Expiring download links protecting raw source files",
    ],
    image: "/images/digital-assets-content.webp",
  },
  {
    id: "development",
    name: "Software & Web Agencies",
    icon: <Code2 size={22} className="text-[#3F72AF]" />,
    tagline: "Agile sprints, hourly budget burndowns & MCP AI coding tools",
    desc: "Run two-week sprints with Kanban boards, connect Cursor and Claude via native MCP, track billable developer hours, and prevent scope creep with signed estimates.",
    points: [
      "Model Context Protocol (MCP) integration with Claude & Cursor",
      "Kanban sprint boards with WIP limits and subtask checklists",
      "Real-time budget burndown alerts when hours exceed estimates",
      "Outbound signed webhooks to GitHub, Slack, and internal APIs",
    ],
    image: "/images/tasks-board-content.webp",
  },
  {
    id: "consulting",
    name: "Consulting & Advisory Firms",
    icon: <Briefcase size={22} className="text-amber-600" />,
    tagline: "Professional engagement tracking, confidential notes & time audits",
    desc: "Track client engagements with clear milestone deliverables, calculate utilization rates across senior partners and associates, and maintain confidential internal notes.",
    points: [
      "Internal advisory notes strictly isolated from client portal views",
      "Partner and associate billable utilization analytics",
      "Custom proposal contracts with legally binding digital e-signatures",
      "Professional itemized invoices supporting multi-currency billing",
    ],
    image: "/images/reports-content.webp",
  },
  {
    id: "freelancers",
    name: "Freelancers & Solo Studios",
    icon: <UserCheck size={22} className="text-emerald-600" />,
    tagline: "One platform that replaces 5 subscriptions for solo creators",
    desc: "Look like a 20-person agency with a custom-branded portal, professional proposals, automated invoice reminders, and self-service productized services.",
    points: [
      "Free 14-day trial without needing a credit card",
      "Replace ClickUp, QuickBooks, Pandadoc, and Typeform in 1 tool",
      "Productized service catalog allowing clients to buy online",
      "Flat pricing that never penalizes you for inviting contractors",
    ],
    image: "/images/invoices-content.webp",
  },
];

export default function UseCasesPage() {
  const [selectedVertical, setSelectedVertical] = useState("marketing");
  const current = VERTICALS.find((v) => v.id === selectedVertical) || VERTICALS[0];

  return (
    <div className="min-h-screen bg-white text-[#0B0B0F] flex flex-col antialiased selection:bg-[#3F72AF]/15 selection:text-[#0B0B0F]">
      <Navbar />

      <main className="flex-1">
        {/* Inner Hero */}
        <InnerHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Use Cases" },
          ]}
          eyebrow="Engineered for Service Businesses"
          title="Built For Every Type of Agency"
          description="Whether you run a fast-paced marketing agency, high-end design studio, software shop, or consulting practice — Eidoncore adapts to your exact workflow."
          ctaPrimary={{
            label: "Start Free Trial →",
            href: "https://register.eidoncore.com/",
          }}
          ctaSecondary={{
            label: "Explore 19 Modules",
            href: "/features/",
          }}
        />

        {/* Agency Verticals Bento Selector (Platform modules box style & slow reveal) */}
        <section className="py-20 md:py-28 bg-[#F8FAFC] border-b border-[#E7E7EA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-14">
              <SectionBadge text="Industry Solutions" />
              <AnimatedHeading
                as="h2"
                text="Tailored for Your Exact Business Model"
                className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A]"
              />
              <p className="mt-3 text-[#64748B] text-sm sm:text-base leading-relaxed">
                Click any agency type below to see how Eidoncore optimizes deliverables, billing, and client communication for your niche.
              </p>
            </div>

            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {VERTICALS.map((v) => {
                const isActive = v.id === selectedVertical;

                return (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVertical(v.id)}
                    className="text-left w-full focus:outline-none"
                  >
                    <StaggerItem
                      className={`h-full group rounded-2xl p-5 flex flex-col justify-between transition-[border-color,background-color,box-shadow] duration-200 border ${
                        isActive
                          ? "bg-white border-[#3F72AF] shadow-sm ring-1 ring-[#3F72AF]"
                          : "bg-[#F8FAFC] border-[#E2E8F0] hover:bg-white hover:border-[#3F72AF]/40 hover:shadow-2xs"
                      }`}
                    >
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center mb-4 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                          {v.icon}
                        </div>
                        <h3 className="text-sm font-bold text-[#0F172A] tracking-tight group-hover:text-[#3F72AF] transition-colors">
                          {v.name}
                        </h3>
                      </div>
                      <span className="mt-4 text-[11px] font-semibold text-[#3F72AF] inline-flex items-center gap-1">
                        {isActive ? "Viewing" : "Explore"} <ArrowRight size={11} />
                      </span>
                    </StaggerItem>
                  </button>
                );
              })}
            </StaggerGroup>
          </div>
        </section>

        {/* Selected Vertical Deep Dive */}
        <section className="py-20 md:py-28 bg-white border-b border-[#E7E7EA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Text side */}
              <div className="flex-1 max-w-xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-8 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center shadow-2xs">
                    {current.icon}
                  </span>
                  <SectionBadge text={`${current.name} Solution`} className="!mb-0" />
                </div>

                <AnimatedHeading
                  as="h2"
                  text={current.tagline}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] leading-tight"
                />

                <p className="mt-4 text-xs sm:text-sm md:text-base text-[#64748B] leading-relaxed">
                  {current.desc}
                </p>

                <ul className="mt-6 flex flex-col gap-3">
                  {current.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="text-xs sm:text-sm text-[#334155] font-medium leading-snug">
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
                    Start Free Trial for {current.name} →
                  </AnimatedButton>
                  <a
                    href="/pricing/"
                    className="text-xs font-semibold text-[#64748B] hover:text-[#0F172A]"
                  >
                    View Pricing Plans
                  </a>
                </div>
              </div>

              {/* Preview Side */}
              <div className="flex-1 w-full max-w-xl">
                <div className="relative rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:p-6 shadow-sm overflow-hidden group">
                  <div className="flex items-center gap-1.5 pb-3 border-b border-[#E2E8F0] mb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
                    <span className="text-[10px] font-mono text-[#94A3B8] ml-2">
                      app.eidoncore.com/solutions/{current.id}
                    </span>
                  </div>
                  <AnimatedImage
                    key={current.image}
                    src={current.image}
                    alt={current.name}
                    origin="top-right"
                    className="rounded-xl border border-[#E2E8F0] bg-white"
                    imgClassName="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
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
