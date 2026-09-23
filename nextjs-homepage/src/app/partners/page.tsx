"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InnerHero from "@/components/InnerHero";
import CTA from "@/components/CTA";
import FAQSection from "@/components/FAQSection";
import { StaggerGroup, StaggerItem } from "@/components/StaggerReveal";
import AnimatedHeading from "@/components/AnimatedHeading";
import AnimatedButton from "@/components/AnimatedButton";
import SectionBadge from "@/components/SectionBadge";
import { Handshake, TrendingUp, DollarSign, Clock, Users, ArrowRight, Check } from "lucide-react";

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-white text-[#0B0B0F] flex flex-col antialiased selection:bg-[#3F72AF]/15 selection:text-[#0B0B0F]">
      <Navbar />

      <main className="flex-1">
        {/* Inner Hero */}
        <InnerHero
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Partners" },
          ]}
          eyebrow="Affiliate & Solution Partners"
          title="Grow With Eidoncore"
          description="Refer agencies to the all-in-one AI platform and earn up to 30% recurring monthly commissions for the lifetime of every customer."
          ctaPrimary={{
            label: "Join Partner Program →",
            href: "/contact/",
          }}
          ctaSecondary={{
            label: "Explore Features",
            href: "/features/",
          }}
        />

        {/* Stats Strip */}
        <section className="py-14 bg-[#F8FAFC] border-b border-[#E7E7EA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center p-4">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A]">
                  20<span className="text-[#3F72AF]">%</span>
                </div>
                <div className="mt-2 text-xs sm:text-sm font-medium text-[#64748B]">
                  Affiliate Commission
                </div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A]">
                  30<span className="text-[#3F72AF]">%</span>
                </div>
                <div className="mt-2 text-xs sm:text-sm font-medium text-[#64748B]">
                  Agency Partner Tier
                </div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A]">
                  90<span className="text-[#3F72AF]">d</span>
                </div>
                <div className="mt-2 text-xs sm:text-sm font-medium text-[#64748B]">
                  Attribution Cookie Window
                </div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A]">
                  $0
                </div>
                <div className="mt-2 text-xs sm:text-sm font-medium text-[#64748B]">
                  Free to Join
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Program Tiers Bento Grid (Platform modules box style & slow reveal) */}
        <section className="py-20 md:py-28 bg-white border-b border-[#E7E7EA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-14">
              <SectionBadge text="Partner Tiers" />
              <AnimatedHeading
                as="h2"
                text="Two High-Yield Ways to Partner"
                className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A]"
              />
              <p className="mt-3 text-[#64748B] text-sm sm:text-base leading-relaxed">
                Whether you create content for agency founders or consult high-growth studios, we offer recurring revenue share with monthly payouts.
              </p>
            </div>

            <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <StaggerItem className="group bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-8 flex flex-col justify-between hover:border-[#3F72AF]/40 hover:bg-white hover:shadow-xs transition-[border-color,background-color,box-shadow] duration-200">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform duration-200">
                      <TrendingUp size={20} className="text-[#3F72AF]" />
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full font-bold bg-blue-50 text-[#3F72AF] border border-blue-200">
                      20% RECURRING
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0F172A] tracking-tight group-hover:text-[#3F72AF] transition-colors">
                    Affiliate Partner
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    Ideal for creators, newsletter writers, podcasters, and educators in the agency space. Share your custom link and earn recurring revenue.
                  </p>

                  <ul className="mt-6 flex flex-col gap-3">
                    <li className="flex items-start gap-2.5 text-xs text-[#334155]">
                      <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>20% lifetime recurring commission on all customer subscriptions</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs text-[#334155]">
                      <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>90-day tracking cookie window</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs text-[#334155]">
                      <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>Dedicated affiliate dashboard with real-time conversion stats</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-[#E2E8F0]">
                  <AnimatedButton
                    as="a"
                    href="/contact/"
                    variant="primary"
                    className="w-full text-center text-xs py-2.5 font-semibold"
                  >
                    Apply as Affiliate →
                  </AnimatedButton>
                </div>
              </StaggerItem>

              <StaggerItem className="group bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-8 flex flex-col justify-between hover:border-[#3F72AF]/40 hover:bg-white hover:shadow-xs transition-[border-color,background-color,box-shadow] duration-200">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform duration-200">
                      <Handshake size={20} className="text-purple-600" />
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full font-bold bg-purple-50 text-purple-700 border border-purple-200">
                      30% RECURRING
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0F172A] tracking-tight group-hover:text-[#3F72AF] transition-colors">
                    Agency Solution Partner
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    Designed for operations consultants and agency builders who implement Eidoncore for clients. Unlock higher commissions and white-glove onboarding.
                  </p>

                  <ul className="mt-6 flex flex-col gap-3">
                    <li className="flex items-start gap-2.5 text-xs text-[#334155]">
                      <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>30% recurring monthly commission on referred client accounts</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs text-[#334155]">
                      <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>Co-marketing resources and joint case studies</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs text-[#334155]">
                      <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>Direct Slack channel with our engineering and product team</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-[#E2E8F0]">
                  <AnimatedButton
                    as="a"
                    href="/contact/"
                    variant="outline"
                    className="w-full text-center text-xs py-2.5 font-semibold"
                  >
                    Apply as Solution Partner →
                  </AnimatedButton>
                </div>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </section>

        {/* Unified FAQ */}
        <FAQSection />

        {/* Global CTA */}
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
