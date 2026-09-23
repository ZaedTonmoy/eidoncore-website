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
import { Check, X } from "lucide-react";

export interface CompetitorData {
  name: string;
  tagline: string;
  summary: string;
  eidoncoreAdvantage: string;
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
};

export default function CompetitorCompareView({ slug }: { slug: string }) {
  const comp = COMPETITORS[slug] || COMPETITORS.agencyhandy;

  return (
    <div className="min-h-screen bg-white text-[#0B0B0F] flex flex-col antialiased selection:bg-[#3F72AF]/15 selection:text-[#0B0B0F]">
      <Navbar />

      <main className="flex-1">
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
