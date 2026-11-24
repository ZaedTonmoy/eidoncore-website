"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InnerHero from "@/components/InnerHero";
import CTA from "@/components/CTA";
import FAQSection from "@/components/FAQSection";
import Testimonials from "@/components/Testimonials";
import AnimatedHeading from "@/components/AnimatedHeading";
import AnimatedButton from "@/components/AnimatedButton";
import SectionBadge from "@/components/SectionBadge";
import Link from "next/link";
import { Check, X, ArrowRight } from "lucide-react";

export interface CompetitorData {
  name: string;
  tagline: string;
  summary: string;
  eidoncoreAdvantage: string;
  bestForEidoncore?: string;
  bestForCompetitor?: string;
  pricingComparison?: string;
  features: Array<{
    name: string;
    eidoncore: boolean | string;
    competitor: boolean | string;
  }>;
}

export const COMPETITORS: Record<string, CompetitorData> = {
  agencyhandy: {
    name: "AgencyHandy",
    tagline: "More Power, AI Integration & Transparent Flat Pricing",
    summary:
      "While AgencyHandy covers basic client portals and invoicing, Eidoncore gives you the full AI Workspace (111+ tools), native proposals with e-signatures, and zero per-seat fees.",
    eidoncoreAdvantage:
      "Save $1,200+/year on team seats while unlocking autonomous AI agent orchestration.",
    features: [
      { name: "Native AI Workspace (111+ MCP Tools)", eidoncore: true, competitor: false },
      { name: "White-Label CNAME Custom Domain", eidoncore: true, competitor: true },
      { name: "Proposals with Digital E-Signatures", eidoncore: true, competitor: false },
      { name: "Kanban Task Boards & Subtasks", eidoncore: true, competitor: true },
      { name: "Project Health & Margin Analytics", eidoncore: true, competitor: false },
      { name: "Flat Pricing (No Per-Seat Fee)", eidoncore: true, competitor: false },
      { name: "14-Day Free Pro Trial", eidoncore: true, competitor: true },
    ],
  },
  bonsai: {
    name: "Bonsai",
    tagline: "Built for Growing Agencies, Not Just Solo Freelancers",
    summary:
      "Bonsai was designed primarily for solo freelancers and contractors. Eidoncore is engineered from day one for multi-person agencies with complex client rosters and team permissions.",
    eidoncoreAdvantage:
      "Granular team role permissions, project budget burndowns, and native Claude/Cursor MCP integration.",
    features: [
      { name: "Multi-Member Team Permissions", eidoncore: true, competitor: "Limited" },
      { name: "AI Workspace with Model Context Protocol", eidoncore: true, competitor: false },
      { name: "100% White-Label Client Portal", eidoncore: true, competitor: "Enterprise only" },
      { name: "Real-Time Project Communication", eidoncore: true, competitor: false },
      { name: "Automated Recurring Retainer Billing", eidoncore: true, competitor: true },
      { name: "Hourly Budget Burndown Alerts", eidoncore: true, competitor: false },
      { name: "Zero Platform Markup Fees", eidoncore: true, competitor: true },
    ],
  },
  honeybook: {
    name: "HoneyBook",
    tagline: "True Agency Delivery, Sprints & White-Label Portals",
    summary:
      "HoneyBook is popular with event planners and wedding photographers. For digital agencies delivering sprints, code, and marketing campaigns, Eidoncore offers vastly superior project delivery tools.",
    eidoncoreAdvantage:
      "Real agile Kanban boards, developer-friendly webhooks, and complete agency domain white-labeling.",
    features: [
      { name: "Agile Sprint Kanban Boards", eidoncore: true, competitor: false },
      { name: "White-Label Portal (Your Own Domain)", eidoncore: true, competitor: false },
      { name: "MCP Protocol for AI Development", eidoncore: true, competitor: false },
      { name: "Integrated Time Tracking & Timers", eidoncore: true, competitor: true },
      { name: "Milestone Release Invoicing", eidoncore: true, competitor: "Manual" },
      { name: "Stripe Connect Direct Payouts", eidoncore: true, competitor: true },
      { name: "Outbound Webhooks & REST API", eidoncore: true, competitor: false },
    ],
  },
  kitchen: {
    name: "Kitchen.co",
    tagline: "Comprehensive Agency Operating System With Financials",
    summary:
      "Kitchen.co focuses mainly on conversation channels and file sharing. Eidoncore integrates your entire financial ledger — recurring billing, proposals, and AI automations in one suite.",
    eidoncoreAdvantage:
      "Full recurring billing, proposal contracts, and autonomous AI agents in addition to real-time chat.",
    features: [
      { name: "Recurring Retainer Invoicing via Stripe", eidoncore: true, competitor: "Basic" },
      { name: "Interactive Proposals & Contracts", eidoncore: true, competitor: false },
      { name: "AI Workspace (Claude & Cursor)", eidoncore: true, competitor: false },
      { name: "Project-Linked Chat Channels", eidoncore: true, competitor: true },
      { name: "Customer Health Scoring", eidoncore: true, competitor: false },
      { name: "SLA Support Ticket Helpdesk", eidoncore: true, competitor: false },
      { name: "Flat Monthly Agency Tiers", eidoncore: true, competitor: true },
    ],
  },
  moxie: {
    name: "Moxie",
    tagline: "Scale From 2 to 50+ Members Without Penalty",
    summary:
      "Moxie works well for solopreneurs, but scaling a team quickly becomes cumbersome. Eidoncore provides enterprise role security, workload capacity planning, and full AI automation.",
    eidoncoreAdvantage:
      "Team workload capacity cockpit, SOC 2 ready security, and autonomous AI workflows.",
    features: [
      { name: "Team Workload & Capacity Planning", eidoncore: true, competitor: false },
      { name: "Model Context Protocol (MCP) Tools", eidoncore: true, competitor: false },
      { name: "Client Portal Custom CNAME Domain", eidoncore: true, competitor: true },
      { name: "Trigger-Action Automation Engine", eidoncore: true, competitor: "Basic" },
      { name: "Digital Product Downloads Storefront", eidoncore: true, competitor: false },
      { name: "SOC 2 Ready Tenant Isolation", eidoncore: true, competitor: false },
      { name: "Flat Pricing for Growing Agencies", eidoncore: true, competitor: false },
    ],
  },
  productive: {
    name: "Productive",
    tagline: "Flat Agency Pricing + Native White-Label Portal vs. Per-Seat PSA",
    summary:
      "Productive is a strong agency PSA platform for resource forecasting and multi-subsidiary finance, priced per user with a 3-seat minimum ($10–$25+/user/mo annual). Eidoncore unifies projects, CRM, proposals, recurring Stripe billing, a white-label client portal, and a 111+ tool MCP AI Workspace on flat tier pricing.",
    eidoncoreAdvantage:
      "Predictable flat pricing ($0 Free, $29/mo Pro for 15 members, $79/mo Enterprise for unlimited members) with built-in white-label portals and proposals.",
    bestForEidoncore:
      "Digital agencies (2–50+ people) wanting flat pricing without per-seat fees, a custom-domain client portal, interactive proposals, and native MCP AI workflows.",
    bestForCompetitor:
      "Larger consultancies needing multi-entity subsidiary accounting, complex rate-card forecasting, and dedicated resource scheduling.",
    pricingComparison:
      "Productive charges $10–$25+/user/month (annual, 3-seat minimum) plus custom Ultimate pricing. Eidoncore offers a permanent Free plan ($0), Pro at $29/mo flat (15 members), and Enterprise at $79/mo flat (unlimited members).",
    features: [
      { name: "Flat Team Pricing (No Per-Seat Fee)", eidoncore: true, competitor: false },
      { name: "Permanent Free Plan ($0/mo)", eidoncore: true, competitor: false },
      { name: "White-Label Client Portal (Custom CNAME)", eidoncore: true, competitor: "Limited" },
      { name: "Project Budgets & Milestone Tracking", eidoncore: true, competitor: true },
      { name: "Interactive Proposals & E-Signatures", eidoncore: true, competitor: "Quotes / Docs" },
      { name: "Multi-Subsidiary Revenue Forecasting", eidoncore: false, competitor: true },
      { name: "Native MCP AI Workspace (111+ Tools)", eidoncore: true, competitor: "Ultimate / Add-on" },
    ],
  },
  scoro: {
    name: "Scoro",
    tagline: "Fast Agency Deployment & Flat Pricing vs. Heavy Quote-to-Cash ERP",
    summary:
      "Scoro is an enterprise-oriented quote-to-cash work management suite with a 5-seat minimum (starting around $17–$63/user/month annual). Eidoncore gives modern digital agencies client portals, projects, Kanban tasks, CRM, proposals, recurring Stripe invoicing, and AI workflows without a 5-seat minimum.",
    eidoncoreAdvantage:
      "Zero per-seat minimums, faster team onboarding, and an integrated white-label client portal + MCP AI Workspace.",
    bestForEidoncore:
      "Design studios, dev shops, and marketing agencies that want all-in-one project delivery, client portal, billing, and AI automation with predictable flat pricing.",
    bestForCompetitor:
      "Established professional services firms needing deep quote-to-cash ERP controls, multi-currency financial governance, and two-way QuickBooks/Xero accounting.",
    pricingComparison:
      "Scoro requires a 5-user minimum across standard paid plans (~$85–$315+/month entry). Eidoncore starts at $0/mo (2 members), $29/mo Pro (15 members), and $79/mo Enterprise (unlimited members).",
    features: [
      { name: "No Minimum Paid Seat Requirement", eidoncore: true, competitor: false },
      { name: "White-Label Custom Domain Client Portal", eidoncore: true, competitor: "Add-on / Limited" },
      { name: "Project Budgets, Tasks & Time Tracking", eidoncore: true, competitor: true },
      { name: "CRM Pipelines & Interactive Proposals", eidoncore: true, competitor: true },
      { name: "Two-Way Accounting ERP (Xero / QuickBooks)", eidoncore: false, competitor: true },
      { name: "Native MCP AI Workspace (Claude / Cursor)", eidoncore: true, competitor: false },
      { name: "Flat Monthly Agency Tiers", eidoncore: true, competitor: false },
    ],
  },
  teamwork: {
    name: "Teamwork.com",
    tagline: "All-in-One Agency Ops & White-Label Portal vs. Per-Seat Project Delivery",
    summary:
      "Teamwork.com excels at client-facing task delivery, Gantt views, and time tracking, with paid plans priced per user ($9.99–$24.99+/user/month annual, 3–5 seat minimums). Eidoncore combines project delivery with CRM pipelines, proposals, recurring Stripe billing, support tickets, white-label portals, and MCP AI workflows under flat pricing.",
    eidoncoreAdvantage:
      "Includes native CRM, interactive e-signature proposals, productized service storefronts, and flat team pricing without 3-to-5 seat minimums.",
    bestForEidoncore:
      "Agencies consolidating project management, client portals, CRM, proposals, invoicing, and AI workflows into one flat-priced platform.",
    bestForCompetitor:
      "Teams prioritizing classic Gantt charts, granular task dependencies, and native HubSpot/Salesforce/QuickBooks project delivery integrations.",
    pricingComparison:
      "Teamwork's Basics ($9.99/user/mo, 3-seat min) and Accelerate ($24.99/user/mo, 5-seat min) scale per internal seat. Eidoncore Pro is $29/mo flat for up to 15 members and Enterprise is $79/mo flat for unlimited members.",
    features: [
      { name: "Flat Pricing (Up to 15 or Unlimited Seats)", eidoncore: true, competitor: false },
      { name: "White-Label Custom Domain Portal", eidoncore: true, competitor: "Custom Domain (Higher Tiers)" },
      { name: "Kanban Task Boards & Time Tracking", eidoncore: true, competitor: true },
      { name: "Native CRM & Interactive Proposals", eidoncore: true, competitor: false },
      { name: "Productized Services & Digital Storefront", eidoncore: true, competitor: false },
      { name: "Gantt Charts & Role Resource Scheduling", eidoncore: "Milestones", competitor: true },
      { name: "Native MCP AI Workspace (111+ Tools)", eidoncore: true, competitor: false },
    ],
  },
};

export default function CompetitorCompareView({ slug }: { slug: string }) {
  const comp = COMPETITORS[slug] || COMPETITORS.agencyhandy;

  return (
    <div className="min-h-screen bg-white text-[#0B0B0F] flex flex-col antialiased selection:bg-[#3F72AF]/15 selection:text-[#0B0B0F]">
      <Navbar />

      <main id="main-content" className="flex-1">
        {/* Inner Hero */}
        <InnerHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Compare", href: "/compare/" },
            { label: comp.name },
          ]}
          eyebrow="Head-to-Head Comparison"
          title={`Eidoncore vs ${comp.name}`}
          description={comp.tagline}
          ctaPrimary={{
            label: "Start Free Trial →",
            href: "https://register.eidoncore.com/",
          }}
          ctaSecondary={{
            label: "View All Competitors",
            href: "/compare/",
          }}
        />

        {/* Feature Comparison Table */}
        <section className="py-20 md:py-28 bg-[#F8FAFC] border-b border-[#E7E7EA]">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6">
            <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-10 shadow-xs">
              <div className="mb-8">
                <SectionBadge text="Feature Breakdown" />
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] mt-2">
                  How Eidoncore Compares to {comp.name}
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-[#64748B]">
                  {comp.summary}
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-[#E2E8F0]">
                      <th className="py-4 px-4 font-semibold text-[#64748B]">Capability</th>
                      <th className="py-4 px-4 font-bold text-[#3F72AF] text-center bg-[#3F72AF]/5 rounded-t-xl">
                        Eidoncore
                      </th>
                      <th className="py-4 px-4 font-semibold text-[#64748B] text-center">
                        {comp.name}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {comp.features.map((feat) => (
                      <tr key={feat.name} className="hover:bg-[#F8FAFC] transition-colors">
                        <td className="py-3.5 px-4 font-medium text-[#334155]">{feat.name}</td>
                        <td className="py-3.5 px-4 text-center font-bold text-[#3F72AF] bg-[#3F72AF]/5">
                          {typeof feat.eidoncore === "boolean" ? (
                            feat.eidoncore ? (
                              <Check size={16} className="text-emerald-600 inline" strokeWidth={2.5} />
                            ) : (
                              <X size={16} className="text-[#CBD5E1] inline" />
                            )
                          ) : (
                            <span>{feat.eidoncore}</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center text-[#64748B]">
                          {typeof feat.competitor === "boolean" ? (
                            feat.competitor ? (
                              <Check size={16} className="text-emerald-600 inline" strokeWidth={2.5} />
                            ) : (
                              <X size={16} className="text-[#CBD5E1] inline" />
                            )
                          ) : (
                            <span className="font-mono text-xs">{feat.competitor}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold text-[#0F172A] block">
                    The Eidoncore Difference
                  </span>
                  <span className="text-xs text-[#64748B]">{comp.eidoncoreAdvantage}</span>
                </div>
                <AnimatedButton
                  as="a"
                  href="https://register.eidoncore.com/"
                  variant="primary"
                  className="text-xs px-5 py-2.5 font-semibold shrink-0"
                >
                  Start 14-Day Free Trial →
                </AnimatedButton>
              </div>

              {(comp.bestForEidoncore || comp.pricingComparison) && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {comp.bestForEidoncore && (
                    <div className="p-5 rounded-2xl border border-[#3F72AF]/20 bg-[#3F72AF]/5">
                      <h3 className="text-sm font-bold text-[#0F172A]">Best Fit for Eidoncore</h3>
                      <p className="mt-1.5 text-xs text-[#4A4E57] leading-relaxed">
                        {comp.bestForEidoncore}
                      </p>
                    </div>
                  )}
                  {comp.bestForCompetitor && (
                    <div className="p-5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]">
                      <h3 className="text-sm font-bold text-[#0F172A]">Best Fit for {comp.name}</h3>
                      <p className="mt-1.5 text-xs text-[#4A4E57] leading-relaxed">
                        {comp.bestForCompetitor}
                      </p>
                    </div>
                  )}
                  {comp.pricingComparison && (
                    <div className="md:col-span-2 p-5 rounded-2xl border border-[#E2E8F0] bg-white">
                      <h3 className="text-sm font-bold text-[#0F172A]">Pricing Comparison</h3>
                      <p className="mt-1.5 text-xs text-[#4A4E57] leading-relaxed">
                        {comp.pricingComparison}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-[#E2E8F0] flex flex-wrap items-center gap-4 text-xs font-medium text-[#3F72AF]">
                <Link href="/pricing/" className="inline-flex items-center gap-1 hover:underline">
                  View Flat Pricing <ArrowRight size={12} />
                </Link>
                <Link href="/portal/" className="inline-flex items-center gap-1 hover:underline">
                  White-Label Client Portal <ArrowRight size={12} />
                </Link>
                <Link href="/projects/" className="inline-flex items-center gap-1 hover:underline">
                  Project Management <ArrowRight size={12} />
                </Link>
                <Link href="/ai-workspace/" className="inline-flex items-center gap-1 hover:underline">
                  AI Workspace (MCP) <ArrowRight size={12} />
                </Link>
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
