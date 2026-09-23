"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InnerHero from "@/components/InnerHero";
import CTA from "@/components/CTA";
import FAQSection from "@/components/FAQSection";
import Testimonials from "@/components/Testimonials";
import { StaggerGroup, StaggerItem } from "@/components/StaggerReveal";
import AnimatedHeading from "@/components/AnimatedHeading";
import AnimatedText from "@/components/AnimatedText";
import SectionBadge from "@/components/SectionBadge";
import { Check, X, AlertCircle, ArrowRight, DollarSign, Layers, Shield, Zap } from "lucide-react";

interface Competitor {
  id: string;
  name: string;
  category: string;
  price: string;
  desc: string;
  tag: string;
}

const COMPETITORS: Competitor[] = [
  {
    id: "agencyhandy",
    name: "AgencyHandy",
    category: "Agency Ops",
    price: "$49/mo",
    desc: "Lacks a permanent free plan, has no real-time team chat, and charges higher initial fees for basic client onboarding.",
    tag: "Higher Starting Price",
  },
  {
    id: "kitchen",
    name: "Kitchen.co",
    category: "Client Portal",
    price: "$29/mo",
    desc: "Focuses strictly on client file sharing & portals, lacking built-in project budget tracking, invoicing, and autonomous AI agents.",
    tag: "Portal Only",
  },
  {
    id: "moxie",
    name: "Moxie",
    category: "Freelance Suite",
    price: "$12/mo",
    desc: "Tailored to solo freelancers. Struggles with multi-tenant agency teams, advanced client role permissions, and custom CNAME domains.",
    tag: "Solo Focused",
  },
  {
    id: "bonsai",
    name: "Bonsai",
    category: "Invoicing & Contracts",
    price: "$21/mo",
    desc: "Built around accounting and proposals, lacking true Kanban project boards, live ticket SLAs, and native visual automation builder.",
    tag: "Accounting Heavy",
  },
  {
    id: "honeybook",
    name: "HoneyBook",
    category: "Event & Booking",
    price: "$19/mo",
    desc: "Excellent for photographers and event bookings, but lacks developer webhooks, MCP agents, and agency-grade data isolation.",
    tag: "Non-Technical",
  },
];

const MATRIX_SECTIONS = [
  {
    category: "Pricing & Plans",
    rows: [
      { feature: "Permanent Free Tier ($0/mo)", eidoncore: "Yes (2 team, 3 clients)", agencyhandy: "No", kitchen: "Limited", moxie: "No", bonsai: "No", honeybook: "No" },
      { feature: "Starting Monthly Price", eidoncore: "$0/mo", agencyhandy: "$49/mo", kitchen: "$29/mo", moxie: "$12/mo", bonsai: "$21/mo", honeybook: "$19/mo" },
      { feature: "Free Team Members Included", eidoncore: "2 Members", agencyhandy: "None", kitchen: "1 Member", moxie: "None", bonsai: "None", honeybook: "None" },
    ],
  },
  {
    category: "Project & Task Operations",
    rows: [
      { feature: "Kanban Boards & Subtasks", eidoncore: true, agencyhandy: true, kitchen: true, moxie: true, bonsai: false, honeybook: false },
      { feature: "Live Time Tracking & Budgets", eidoncore: true, agencyhandy: "Basic", kitchen: false, moxie: true, bonsai: true, honeybook: false },
      { feature: "AI Workspace & MCP Agent Sync", eidoncore: true, agencyhandy: false, kitchen: false, moxie: false, bonsai: false, honeybook: false },
    ],
  },
  {
    category: "Client CRM & White-Label",
    rows: [
      { feature: "Client Health Scoring & CRM", eidoncore: true, agencyhandy: true, kitchen: false, moxie: true, bonsai: "Basic", honeybook: true },
      { feature: "Branded Client Portal", eidoncore: true, agencyhandy: true, kitchen: true, moxie: "Pro Only", bonsai: "Basic", honeybook: true },
      { feature: "Custom Domain CNAME", eidoncore: true, agencyhandy: "Pro Only", kitchen: "Pro Only", moxie: "Enterprise", bonsai: "No", honeybook: "No" },
    ],
  },
  {
    category: "Communication & Automation",
    rows: [
      { feature: "Native Visual Automation Builder", eidoncore: true, agencyhandy: "Zapier", kitchen: false, moxie: false, bonsai: false, honeybook: "Basic" },
      { feature: "Integrated Client & Team Chat", eidoncore: true, agencyhandy: false, kitchen: true, moxie: false, bonsai: false, honeybook: false },
      { feature: "Client Support Ticketing & SLAs", eidoncore: true, agencyhandy: true, kitchen: false, moxie: false, bonsai: false, honeybook: false },
    ],
  },
];

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-white text-[#0B0B0F] flex flex-col antialiased selection:bg-[#3F72AF]/15 selection:text-[#0B0B0F]">
      <Navbar />

      <main className="flex-1">
        {/* Inner Hero */}
        <InnerHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Compare" },
          ]}
          eyebrow="Market Comparison"
          title="How Eidoncore Compares"
          description="See exactly how Eidoncore stacks up against alternative agency platforms. Honest, feature-by-feature breakdowns to help your agency choose with confidence."
          ctaPrimary={{ label: "Start 14-Day Free Trial →", href: "https://register.eidoncore.com/" }}
          ctaSecondary={{ label: "View Pricing", href: "/pricing/" }}
        />

        {/* Competitor Overview Cards */}
        <section className="py-16 md:py-24 bg-white border-b border-[#E7E7EA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <SectionBadge text="Direct Alternatives" />
              <AnimatedHeading
                as="h2"
                text="Evaluate Before You Switch"
                className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] justify-center"
              />
              <p className="mt-4 text-[#64748B] text-base leading-relaxed">
                Whether you&apos;re currently on a point solution or evaluating options, here is how Eidoncore delivers more value at a lower total cost of ownership.
              </p>
            </div>

            <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COMPETITORS.map((comp) => (
                <StaggerItem
                  key={comp.id}
                  className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-7 flex flex-col justify-between hover:border-[#3F72AF]/40 hover:bg-white hover:shadow-xs transition-[border-color,background-color,box-shadow] duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-mono font-bold text-[#64748B] uppercase tracking-wider bg-white border border-[#E2E8F0] px-2.5 py-1 rounded shadow-2xs">
                        {comp.category}
                      </span>
                      <span className="text-xs font-bold text-[#DC2626] bg-rose-50 px-2 py-0.5 rounded font-mono">
                        {comp.price}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#0F172A] tracking-tight">
                      Eidoncore vs {comp.name}
                    </h3>

                    <p className="mt-2.5 text-xs sm:text-sm text-[#64748B] leading-relaxed">
                      {comp.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#3F72AF] font-semibold">
                    <span>Why agencies pick Eidoncore</span>
                    <ArrowRight size={13} />
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        {/* Feature-by-Feature Matrix Table */}
        <section className="py-20 md:py-28 bg-[#F8FAFC] border-b border-[#E7E7EA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <SectionBadge text="Side-by-Side Table" />
              <AnimatedHeading
                as="h2"
                text="Quick Platform Comparison"
                className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] justify-center"
              />
              <p className="mt-4 text-[#64748B] text-base leading-relaxed">
                Horizontal comparison of capabilities, pricing, and infrastructure features across all 6 platforms.
              </p>
            </div>

            {/* Responsive Table */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-[#E2E8F0] bg-[#F1F5F9]/60">
                      <th className="py-4 px-6 font-bold text-[#0F172A] min-w-[200px]">Feature</th>
                      <th className="py-4 px-6 font-bold text-[#3F72AF] text-center bg-[#3F72AF]/5 min-w-[140px]">
                        Eidoncore
                      </th>
                      <th className="py-4 px-6 font-semibold text-[#64748B] text-center min-w-[120px]">
                        AgencyHandy
                      </th>
                      <th className="py-4 px-6 font-semibold text-[#64748B] text-center min-w-[120px]">
                        Kitchen.co
                      </th>
                      <th className="py-4 px-6 font-semibold text-[#64748B] text-center min-w-[120px]">
                        Moxie
                      </th>
                      <th className="py-4 px-6 font-semibold text-[#64748B] text-center min-w-[120px]">
                        Bonsai
                      </th>
                      <th className="py-4 px-6 font-semibold text-[#64748B] text-center min-w-[120px]">
                        HoneyBook
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {MATRIX_SECTIONS.map((sec) => (
                      <React.Fragment key={sec.category}>
                        <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                          <td
                            colSpan={7}
                            className="py-3 px-6 font-mono text-xs font-bold text-[#3F72AF] uppercase tracking-wider"
                          >
                            {sec.category}
                          </td>
                        </tr>
                        {sec.rows.map((row) => (
                          <tr
                            key={row.feature}
                            className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC]/50 transition-colors"
                          >
                            <td className="py-3.5 px-6 font-medium text-[#334155]">{row.feature}</td>
                            
                            {/* Eidoncore Column */}
                            <td className="py-3.5 px-6 text-center font-bold text-[#3F72AF] bg-[#3F72AF]/5">
                              {typeof row.eidoncore === "boolean" ? (
                                <Check size={16} className="text-emerald-600 inline" />
                              ) : (
                                <span>{row.eidoncore}</span>
                              )}
                            </td>

                            {/* Competitor Columns */}
                            <td className="py-3.5 px-6 text-center text-[#64748B]">
                              {typeof row.agencyhandy === "boolean" ? (
                                row.agencyhandy ? (
                                  <Check size={15} className="text-emerald-600 inline" />
                                ) : (
                                  <X size={15} className="text-[#CBD5E1] inline" />
                                )
                              ) : (
                                row.agencyhandy
                              )}
                            </td>
                            <td className="py-3.5 px-6 text-center text-[#64748B]">
                              {typeof row.kitchen === "boolean" ? (
                                row.kitchen ? (
                                  <Check size={15} className="text-emerald-600 inline" />
                                ) : (
                                  <X size={15} className="text-[#CBD5E1] inline" />
                                )
                              ) : (
                                row.kitchen
                              )}
                            </td>
                            <td className="py-3.5 px-6 text-center text-[#64748B]">
                              {typeof row.moxie === "boolean" ? (
                                row.moxie ? (
                                  <Check size={15} className="text-emerald-600 inline" />
                                ) : (
                                  <X size={15} className="text-[#CBD5E1] inline" />
                                )
                              ) : (
                                row.moxie
                              )}
                            </td>
                            <td className="py-3.5 px-6 text-center text-[#64748B]">
                              {typeof row.bonsai === "boolean" ? (
                                row.bonsai ? (
                                  <Check size={15} className="text-emerald-600 inline" />
                                ) : (
                                  <X size={15} className="text-[#CBD5E1] inline" />
                                )
                              ) : (
                                row.bonsai
                              )}
                            </td>
                            <td className="py-3.5 px-6 text-center text-[#64748B]">
                              {typeof row.honeybook === "boolean" ? (
                                row.honeybook ? (
                                  <Check size={15} className="text-emerald-600 inline" />
                                ) : (
                                  <X size={15} className="text-[#CBD5E1] inline" />
                                )
                              ) : (
                                row.honeybook
                              )}
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
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
