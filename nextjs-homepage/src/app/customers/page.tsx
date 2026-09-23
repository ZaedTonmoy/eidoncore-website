"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InnerHero from "@/components/InnerHero";
import CTA from "@/components/CTA";
import FAQSection from "@/components/FAQSection";
import Testimonials from "@/components/Testimonials";
import { StaggerGroup, StaggerItem } from "@/components/StaggerReveal";
import AnimatedHeading from "@/components/AnimatedHeading";
import AnimatedButton from "@/components/AnimatedButton";
import { Check, ArrowRight, TrendingUp, Clock, DollarSign, Users, Sparkles, Shield } from "lucide-react";

const CASE_STUDIES = [
  {
    company: "Spectra Digital",
    niche: "Full-Service Creative Agency",
    result: "Saved $340/mo and eliminated tool switching",
    quote: "We replaced Trello, HubSpot, and QuickBooks with just Eidoncore. Having our project budgets, client CRM, and invoicing connected in one platform saved us 15+ hours every week.",
    author: "Sarah Kim, Operations Lead",
    stats: [
      { label: "Software Spend", value: "$79/mo", before: "$420/mo" },
      { label: "Hours Saved", value: "15+ hrs", before: "Weekly" },
      { label: "Client NPS", value: "+35%", before: "Score" },
    ],
    points: [
      "Consolidated 5 separate SaaS logins into 1 unified platform",
      "Client satisfaction jumped 35% with the white-label portal",
      "Automated milestone invoicing cut invoice chasing to zero",
      "Full agency migration completed in under 48 hours",
    ],
    image: "/images/dashboard.webp",
  },
  {
    company: "Northline Studio",
    niche: "Web & Product Design Studio",
    result: "$4.2k monthly savings & automated billing",
    quote: "Switching from Asana, Mailchimp, and Harvest felt risky, but Eidoncore paid for itself in a month. Client reporting is now fully automated and billing errors dropped to zero.",
    author: "Marcus Patel, Founder",
    stats: [
      { label: "Monthly Savings", value: "$4.2k", before: "Reclaimed" },
      { label: "Billing Errors", value: "0%", before: "Zero errors" },
      { label: "Team Velocity", value: "+45%", before: "Throughput" },
    ],
    points: [
      "Replaced separate Asana, Mailchimp, and Harvest subscriptions",
      "Built-in time tracking synced directly to Stripe invoices",
      "Automated weekly client milestone digests",
      "Team onboarded in a single afternoon",
    ],
    image: "/images/invoices.webp",
  },
  {
    company: "Fieldworks",
    niche: "Performance Marketing Firm",
    result: "5x faster client & employee onboarding",
    quote: "We were paying for Monday, Zendesk, and Xero separately and none of it talked to each other. Now every ticket, task, and invoice lives in one place — onboarding takes a day, not a week.",
    author: "Elena Ruiz, Managing Director",
    stats: [
      { label: "Onboarding Speed", value: "5x", before: "Faster" },
      { label: "Support Tickets", value: "-65%", before: "Fewer issues" },
      { label: "Retention Rate", value: "94%", before: "Annual" },
    ],
    points: [
      "Client portal replaced hundreds of monthly 'where is my file' emails",
      "SLA ticket routing cut client response latency to under 2 hours",
      "Revenue tracking keeps partner distributions completely transparent",
      "AI Workspace generates weekly executive client summaries",
    ],
    image: "/images/crm.webp",
  },
];

export default function CustomersPage() {
  return (
    <div className="min-h-screen bg-white text-[#0B0B0F] flex flex-col antialiased selection:bg-[#3F72AF]/15 selection:text-[#0B0B0F]">
      <Navbar />

      <main className="flex-1">
        {/* Inner Hero */}
        <InnerHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Customers" },
          ]}
          eyebrow="Trusted by 500+ Agencies"
          title="Agencies That Thrive With Eidoncore"
          description="Real case studies from boutique studios and scaling 50-person agencies. Discover how teams reclaimed billable hours, consolidated tool spend, and delighted clients."
          ctaPrimary={{
            label: "Start Free Trial →",
            href: "https://register.eidoncore.com/",
          }}
          ctaSecondary={{
            label: "Explore Features",
            href: "/features/",
          }}
        />

        {/* Global Impact Metrics */}
        <section className="py-14 bg-[#F8FAFC] border-b border-[#E7E7EA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center p-4">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A]">
                  500<span className="text-[#3F72AF]">+</span>
                </div>
                <div className="mt-2 text-xs sm:text-sm font-medium text-[#64748B]">
                  Agencies Worldwide
                </div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A]">
                  15<span className="text-[#3F72AF]">+</span>
                </div>
                <div className="mt-2 text-xs sm:text-sm font-medium text-[#64748B]">
                  Hours Saved / Week / Agency
                </div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A]">
                  98<span className="text-[#3F72AF]">%</span>
                </div>
                <div className="mt-2 text-xs sm:text-sm font-medium text-[#64748B]">
                  Customer Satisfaction
                </div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A]">
                  $4.2k
                </div>
                <div className="mt-2 text-xs sm:text-sm font-medium text-[#64748B]">
                  Average Monthly Tool Savings
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Case Studies */}
        <section className="py-20 md:py-28 bg-white border-b border-[#E7E7EA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col gap-24 sm:gap-32">
            {CASE_STUDIES.map((study, idx) => {
              const isReverse = idx % 2 === 1;

              return (
                <div
                  key={study.company}
                  className={`flex flex-col ${
                    isReverse ? "lg:flex-row-reverse" : "lg:flex-row"
                  } items-center gap-12 lg:gap-16`}
                >
                  {/* Left / Text Side */}
                  <div className="flex-1 max-w-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-mono font-bold text-[#3F72AF] bg-[#3F72AF]/10 px-2.5 py-0.5 rounded-full border border-[#3F72AF]/20">
                        {study.company}
                      </span>
                      <span className="text-xs font-mono text-[#64748B]">
                        {study.niche}
                      </span>
                    </div>

                    <AnimatedHeading
                      as="h2"
                      text={study.result}
                      className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] leading-tight"
                    />

                    {/* Pull Quote */}
                    <div className="mt-5 p-5 bg-[#F8FAFC] border-l-4 border-[#3F72AF] rounded-r-2xl">
                      <p className="text-xs sm:text-sm text-[#334155] italic leading-relaxed">
                        &ldquo;{study.quote}&rdquo;
                      </p>
                      <span className="block mt-2 text-[11px] font-mono font-semibold text-[#64748B]">
                        — {study.author}
                      </span>
                    </div>

                    {/* Stats pills */}
                    <div className="grid grid-cols-3 gap-3 my-6">
                      {study.stats.map((st) => (
                        <div key={st.label} className="p-3 bg-white border border-[#E2E8F0] rounded-xl shadow-2xs text-center">
                          <div className="text-base sm:text-lg font-extrabold text-[#0F172A]">{st.value}</div>
                          <div className="text-[10px] text-[#64748B] font-mono mt-0.5">{st.label}</div>
                        </div>
                      ))}
                    </div>

                    <ul className="flex flex-col gap-2.5">
                      {study.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#334155]">
                          <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                            <Check size={10} strokeWidth={3} />
                          </div>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <AnimatedButton
                        as="a"
                        href="https://register.eidoncore.com/"
                        variant="primary"
                        className="text-xs px-5 py-2.5 font-semibold"
                      >
                        Start Your Free Trial →
                      </AnimatedButton>
                    </div>
                  </div>

                  {/* Right / Visual Preview */}
                  <div className="flex-1 w-full max-w-xl">
                    <div className="relative rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:p-6 shadow-xs overflow-hidden group">
                      <div className="flex items-center gap-1.5 pb-3 border-b border-[#E2E8F0] mb-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
                        <span className="text-[10px] font-mono text-[#94A3B8] ml-2">
                          app.eidoncore.com/case-study/{study.company.toLowerCase().replace(/\s+/g, "-")}
                        </span>
                      </div>
                      <div className="rounded-xl overflow-hidden border border-[#E2E8F0] bg-white">
                        <img
                          src={study.image}
                          alt={study.company}
                          className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why Agencies Switch Bento (Platform modules box style & slow reveal) */}
        <section className="py-20 md:py-28 bg-[#F8FAFC] border-b border-[#E7E7EA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-14">
              <span className="text-xs font-mono text-[#3F72AF] uppercase tracking-wider font-semibold">
                Agency Transformation
              </span>
              <AnimatedHeading
                as="h2"
                text="Why Modern Agencies Are Leaving Fragmented SaaS"
                className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A]"
              />
              <p className="mt-3 text-[#64748B] text-sm sm:text-base leading-relaxed">
                The hidden tax of running 5–7 separate software tools is killing agency margins. Here is what changes when you consolidate.
              </p>
            </div>

            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StaggerItem className="group bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col justify-between hover:border-[#3F72AF]/40 hover:shadow-xs transition-[border-color,background-color,box-shadow] duration-200">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#3F72AF] border border-blue-100 flex items-center justify-center mb-5 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                    <DollarSign size={20} />
                  </div>
                  <h3 className="text-base font-semibold text-[#0F172A] tracking-tight group-hover:text-[#3F72AF] transition-colors">
                    $2,000–$5,000 Annual Savings
                  </h3>
                  <p className="mt-2 text-xs text-[#64748B] leading-relaxed">
                    Cut recurring monthly subscriptions to ClickUp, QuickBooks, HubSpot, Slack bots, and Pandadoc.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#E2E8F0] text-xs text-[#64748B] flex items-center justify-between">
                  <span className="font-mono text-[11px] text-emerald-600 font-semibold">Cost Slashed</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </StaggerItem>

              <StaggerItem className="group bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col justify-between hover:border-[#3F72AF]/40 hover:shadow-xs transition-[border-color,background-color,box-shadow] duration-200">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mb-5 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                    <Clock size={20} />
                  </div>
                  <h3 className="text-base font-semibold text-[#0F172A] tracking-tight group-hover:text-[#3F72AF] transition-colors">
                    Zero Sync Latency
                  </h3>
                  <p className="mt-2 text-xs text-[#64748B] leading-relaxed">
                    No broken Zapier webhooks. When an invoice is paid, project milestones unlock immediately.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#E2E8F0] text-xs text-[#64748B] flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#3F72AF] font-semibold">100% Reliable</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </StaggerItem>

              <StaggerItem className="group bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col justify-between hover:border-[#3F72AF]/40 hover:shadow-xs transition-[border-color,background-color,box-shadow] duration-200">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center mb-5 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                    <Sparkles size={20} />
                  </div>
                  <h3 className="text-base font-semibold text-[#0F172A] tracking-tight group-hover:text-[#3F72AF] transition-colors">
                    Clients Love The Portal
                  </h3>
                  <p className="mt-2 text-xs text-[#64748B] leading-relaxed">
                    Clients log in to your custom domain, pay invoices with Apple Pay, and approve milestones in one click.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#E2E8F0] text-xs text-[#64748B] flex items-center justify-between">
                  <span className="font-mono text-[11px] text-purple-600 font-semibold">100% White-Label</span>
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
