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
import AnimatedButton from "@/components/AnimatedButton";
import SectionBadge from "@/components/SectionBadge";
import { Check, X, Shield, Lock, Users, Zap, HelpCircle, ChevronDown, ArrowRight } from "lucide-react";

interface PlanTier {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  popular?: boolean;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
}

const PLANS: PlanTier[] = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "For freelancers and solo consultants getting started.",
    features: [
      "2 Team Members",
      "3 Client Organizations",
      "5 Active Projects",
      "3 Productized Services",
      "1 Intake Form",
      "500 MB Secure Storage",
      "10 Chat Channels",
      "Basic Financial Reports",
      "In-App Reminders",
      "Executive Dashboard & KPIs",
    ],
    ctaLabel: "Get Started Free",
    ctaHref: "https://register.eidoncore.com/",
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 29,
    annualPrice: 23,
    popular: true,
    description: "For growing agencies that need full autonomous power.",
    features: [
      "15 Team Members",
      "50 Client Organizations",
      "100 Active Projects",
      "30 Productized Services",
      "20 Workflow Automations",
      "20 Recurring Invoices",
      "10 Intake Forms",
      "5 Custom Permission Roles",
      "10 GB Cloud Storage",
      "50 Chat Channels",
      "Advanced Revenue Reports",
      "Custom Branded Emails",
      "100% White-Label Client Portal",
      "Credit Notes & Refunds",
      "Client Health Scoring",
    ],
    ctaLabel: "Start 14-Day Free Trial",
    ctaHref: "https://register.eidoncore.com/",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthlyPrice: 79,
    annualPrice: 63,
    description: "For established agencies that demand total isolation and scale.",
    features: [
      "Unlimited Team Members",
      "Unlimited Client Organizations",
      "Unlimited Active Projects",
      "Unlimited Services & Catalogs",
      "Unlimited Workflow Automations",
      "Unlimited Everything",
      "100 GB Cloud Storage",
      "Custom SMTP Gateway",
      "Custom CNAME Domains",
      "Total White-Labeling (No Eidoncore badge)",
      "Dedicated Security Policies",
      "Member Impersonation for Support",
      "Priority 24/7 SLA Support",
    ],
    ctaLabel: "Contact Enterprise Sales",
    ctaHref: "/contact/",
  },
];

const COMPARISON_ROWS = [
  {
    category: "Team & Capacity",
    items: [
      { name: "Team Members", free: "2", pro: "15", enterprise: "Unlimited" },
      { name: "Client Organizations", free: "3", pro: "50", enterprise: "Unlimited" },
      { name: "Active Projects", free: "5", pro: "100", enterprise: "Unlimited" },
      { name: "Cloud Storage", free: "500 MB", pro: "10 GB", enterprise: "100 GB" },
      { name: "Custom Roles & Permissions", free: "Standard", pro: "5 Custom Roles", enterprise: "Granular Matrix" },
    ],
  },
  {
    category: "Modules & Features",
    items: [
      { name: "AI Workspace (MCP Agents)", free: "Limited", pro: "Full Access", enterprise: "Unlimited + OAuth 2.1" },
      { name: "Project Milestones & Budgets", free: true, pro: true, enterprise: true },
      { name: "Task Kanban & Timers", free: true, pro: true, enterprise: true },
      { name: "CRM & Pipelines", free: "Basic", pro: "Advanced + Health Scoring", enterprise: "Full Custom Fields" },
      { name: "Recurring Invoicing & Stripe", free: "Manual", pro: "20 Recurring", enterprise: "Unlimited Recurring" },
      { name: "Automations Builder", free: false, pro: "20 Active", enterprise: "Unlimited" },
      { name: "Support Ticketing & SLAs", free: false, pro: true, enterprise: true },
      { name: "Financial & Revenue Reports", free: "Basic", pro: "Advanced", enterprise: "Executive + Custom Export" },
    ],
  },
  {
    category: "Branding & Customization",
    items: [
      { name: "Branded Client Portal", free: false, pro: true, enterprise: true },
      { name: "Custom Domain (CNAME)", free: false, pro: false, enterprise: true },
      { name: "Custom SMTP Email Gateway", free: false, pro: false, enterprise: true },
      { name: "Remove Eidoncore Branding", free: false, pro: true, enterprise: true },
      { name: "Priority Support SLA", free: "Community", pro: "Standard", enterprise: "Dedicated 24/7" },
    ],
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-white text-[#0B0B0F] flex flex-col antialiased selection:bg-[#3F72AF]/15 selection:text-[#0B0B0F]">
      <Navbar />

      <main className="flex-1">
        {/* Inner Hero */}
        <InnerHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Pricing" },
          ]}
          eyebrow="Predictable Agency Pricing"
          title="Plans That Scale With Your Agency"
          description="Start with a 14-day free PRO trial. No credit card required. Flat transparent pricing — never pay per-seat penalties again."
        >
          {/* Monthly / Annual Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-full shadow-2xs">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                !annual
                  ? "bg-[#0F172A] text-white shadow-xs"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                annual
                  ? "bg-[#0F172A] text-white shadow-xs"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              <span>Annual billing</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                SAVE 20%
              </span>
            </button>
          </div>
        </InnerHero>

        {/* 3 Pricing Cards Grid */}
        <section className="pt-6 pb-16 md:pt-10 md:pb-24 bg-white border-b border-[#E7E7EA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <StaggerGroup viewportAmount={0.01} className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {PLANS.map((plan) => {
                const price = annual ? plan.annualPrice : plan.monthlyPrice;

                return (
                  <StaggerItem
                    key={plan.id}
                    className={`relative rounded-3xl p-7 sm:p-9 flex flex-col justify-between transition-[border-color,background-color,box-shadow] duration-200 ${
                      plan.popular
                        ? "bg-[#F8FAFC] border-2 border-[#3F72AF] shadow-lg shadow-[#3F72AF]/5"
                        : "bg-white border border-[#E2E8F0] hover:border-[#3F72AF]/40 hover:shadow-xs shadow-2xs"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#3F72AF] text-white font-mono text-[10.5px] font-bold uppercase tracking-wider rounded-full shadow-xs">
                        Most Popular
                      </div>
                    )}

                    <div>
                      {/* Plan Header */}
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-[#0F172A] tracking-tight">
                          {plan.name}
                        </h3>
                        {plan.id === "enterprise" && (
                          <Shield size={18} className="text-[#3F72AF]" />
                        )}
                      </div>

                      <p className="mt-2 text-xs sm:text-sm text-[#64748B] leading-relaxed">
                        {plan.description}
                      </p>

                      {/* Price Display */}
                      <div className="mt-6 pt-6 border-t border-[#E2E8F0] flex items-baseline gap-1.5">
                        <span className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
                          ${price}
                        </span>
                        <span className="text-xs sm:text-sm text-[#64748B] font-medium">
                          / month {annual && <span className="text-[11px] text-emerald-600 font-semibold">(billed annually)</span>}
                        </span>
                      </div>

                      {/* Feature Bullet List */}
                      <div className="mt-7 flex flex-col gap-3">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] font-bold">
                          Included in {plan.name}:
                        </span>
                        {plan.features.map((feat) => (
                          <div key={feat} className="flex items-start gap-2.5 text-xs text-[#334155]">
                            <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                              <Check size={11} />
                            </div>
                            <span className="font-medium leading-relaxed">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-8 pt-6 border-t border-[#E2E8F0]">
                      <AnimatedButton
                        href={plan.ctaHref}
                        variant={plan.popular ? "primary" : "secondary"}
                        className="w-full text-center"
                      >
                        {plan.ctaLabel}
                      </AnimatedButton>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>
          </div>
        </section>

        {/* Detailed Feature Comparison Table */}
        <section className="py-20 md:py-28 bg-[#F8FAFC] border-b border-[#E7E7EA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <SectionBadge text="Side-By-Side Comparison" />
              <AnimatedHeading
                as="h2"
                text="Full Feature Matrix"
                className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] justify-center"
              />
              <AnimatedText
                text="Explore every limitation, included module, and enterprise security control across our plans."
                mode="line"
                className="mt-4 text-[#64748B] text-base leading-relaxed"
              />
            </div>

            {/* Responsive Table Wrapper */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-[#E2E8F0] bg-[#F1F5F9]/60">
                      <th className="py-4 px-6 font-bold text-[#0F172A] w-2/5">Feature</th>
                      <th className="py-4 px-6 font-bold text-[#0F172A] w-1/5 text-center">Free</th>
                      <th className="py-4 px-6 font-bold text-[#3F72AF] w-1/5 text-center">Pro</th>
                      <th className="py-4 px-6 font-bold text-[#0F172A] w-1/5 text-center">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_ROWS.map((group) => (
                      <React.Fragment key={group.category}>
                        <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                          <td
                            colSpan={4}
                            className="py-3 px-6 font-mono text-xs font-bold text-[#3F72AF] uppercase tracking-wider"
                          >
                            {group.category}
                          </td>
                        </tr>
                        {group.items.map((row) => (
                          <tr
                            key={row.name}
                            className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC]/50 transition-colors"
                          >
                            <td className="py-3.5 px-6 font-medium text-[#334155]">{row.name}</td>
                            <td className="py-3.5 px-6 text-center text-[#64748B]">
                              {typeof row.free === "boolean" ? (
                                row.free ? (
                                  <Check size={16} className="text-emerald-600 inline" />
                                ) : (
                                  <X size={16} className="text-[#CBD5E1] inline" />
                                )
                              ) : (
                                <span className="font-semibold text-[#0F172A]">{row.free}</span>
                              )}
                            </td>
                            <td className="py-3.5 px-6 text-center bg-[#3F72AF]/5">
                              {typeof row.pro === "boolean" ? (
                                row.pro ? (
                                  <Check size={16} className="text-emerald-600 inline" />
                                ) : (
                                  <X size={16} className="text-[#CBD5E1] inline" />
                                )
                              ) : (
                                <span className="font-semibold text-[#3F72AF]">{row.pro}</span>
                              )}
                            </td>
                            <td className="py-3.5 px-6 text-center text-[#64748B]">
                              {typeof row.enterprise === "boolean" ? (
                                row.enterprise ? (
                                  <Check size={16} className="text-emerald-600 inline" />
                                ) : (
                                  <X size={16} className="text-[#CBD5E1] inline" />
                                )
                              ) : (
                                <span className="font-semibold text-[#0F172A]">{row.enterprise}</span>
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

        {/* Customer Testimonials Carousel */}
        <Testimonials />

        {/* Unified FAQ Section */}
        <FAQSection />

        {/* Global CTA */}
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
