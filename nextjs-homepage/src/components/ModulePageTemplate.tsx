"use client";

import React from "react";
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
import AnimatedImage from "@/components/AnimatedImage";
import BlendedFeaturePreview from "@/components/BlendedFeaturePreview";
import { Check, ArrowRight, Sparkles } from "lucide-react";

export interface ModuleFeature {
  idx: string;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  image?: string;
}

export interface BentoCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag?: string;
}

export interface ModuleStat {
  value: string;
  suffix?: string;
  label: string;
}

export interface ModulePageProps {
  name: string;
  eyebrow: string;
  title: string;
  description: string;
  badge?: string;
  breadcrumbs: { label: string; href?: string }[];
  stats: ModuleStat[];
  features: ModuleFeature[];
  bentoTitle?: string;
  bentoEyebrow?: string;
  bentoDescription?: string;
  bentoCards: BentoCard[];
  customSection?: React.ReactNode;
  useBlendedImages?: boolean;
}

export default function ModulePageTemplate({
  name,
  eyebrow,
  title,
  description,
  badge,
  breadcrumbs,
  stats,
  features,
  bentoTitle = "Engineered for Agency Scale",
  bentoEyebrow = "Key Capabilities",
  bentoDescription = "Every tool is designed to work in synergy with the entire Eidoncore suite.",
  bentoCards,
  customSection,
  useBlendedImages,
}: ModulePageProps) {
  const isBlended = useBlendedImages || name.toLowerCase() === "projects";
  return (
    <div className="min-h-screen bg-white text-[#0B0B0F] flex flex-col antialiased selection:bg-[#3F72AF]/15 selection:text-[#0B0B0F] overflow-x-hidden">
      <Navbar />

      <main className="flex-1 overflow-x-hidden">
        {/* Inner Hero */}
        <InnerHero
          breadcrumbs={breadcrumbs}
          badge={badge || "Core Platform Module"}
          eyebrow={eyebrow}
          title={title}
          description={description}
          ctaPrimary={{
            label: "Start 14-Day Free Trial →",
            href: "https://register.eidoncore.com/",
          }}
          ctaSecondary={{
            label: "Explore All Modules",
            href: "/features/",
          }}
        />

        {/* Custom Section (e.g. for AI Workspace interactive tab or role matrix) */}
        {customSection}

        {/* Feature Rows (Alternating) */}
        <section className="py-20 md:py-28 bg-white border-b border-[#E7E7EA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col gap-24 sm:gap-32">
            {features.map((feat, idx) => {
              const isReverse = idx % 2 === 1;

              return (
                <div
                  key={feat.idx}
                  className={`flex flex-col ${
                    isReverse ? "lg:flex-row-reverse" : "lg:flex-row"
                  } items-center gap-12 lg:gap-16`}
                >
                  {/* Left / Text side */}
                  <div className="flex-1 max-w-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-7 h-7 rounded-lg bg-[#3F72AF]/10 text-[#3F72AF] font-mono text-xs font-bold flex items-center justify-center border border-[#3F72AF]/20">
                        {feat.idx}
                      </span>
                      <SectionBadge text={feat.eyebrow} className="!mb-0" />
                    </div>

                    <AnimatedHeading
                      as="h2"
                      text={feat.title}
                      className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] leading-tight"
                    />

                    <p className="mt-4 text-xs sm:text-sm md:text-base text-[#64748B] leading-relaxed">
                      {feat.description}
                    </p>

                    <ul className="mt-6 flex flex-col gap-3">
                      {feat.points.map((pt) => (
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

                    <div className="mt-8">
                      <AnimatedButton
                        as="a"
                        href="https://register.eidoncore.com/"
                        variant="primary"
                        className="text-xs px-5 py-2.5 font-semibold"
                      >
                        Start Free Trial →
                      </AnimatedButton>
                    </div>
                  </div>

                  {/* Right / Visual Preview */}
                  <div className="flex-1 w-full max-w-xl">
                    {feat.image ? (
                      isBlended ? (
                        <BlendedFeaturePreview
                          image={feat.image}
                          title={feat.title}
                          isReverse={isReverse}
                          moduleName={name}
                          featureIndex={feat.idx}
                        />
                      ) : (
                        <div className="relative rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3 sm:p-5 shadow-xs overflow-hidden group">
                          <div className="flex items-center gap-1.5 pb-3 border-b border-[#E2E8F0] mb-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
                            <span className="text-[10px] font-mono text-[#94A3B8] ml-2">
                              app.eidoncore.com/{name.toLowerCase().replace(/\s+/g, "-")}
                            </span>
                          </div>

                          <AnimatedImage
                            src={feat.image}
                            alt={feat.title}
                            origin={isReverse ? "top-left" : "top-right"}
                            className="rounded-xl border border-[#E2E8F0] bg-white"
                            imgClassName="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                          />
                        </div>
                      )
                    ) : (
                      <div className="relative rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3 sm:p-5 shadow-xs overflow-hidden group">
                        <div className="flex items-center gap-1.5 pb-3 border-b border-[#E2E8F0] mb-3">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
                          <span className="text-[10px] font-mono text-[#94A3B8] ml-2">
                            app.eidoncore.com/{name.toLowerCase().replace(/\s+/g, "-")}
                          </span>
                        </div>
                        <div className="rounded-xl p-6 bg-white border border-[#E2E8F0] flex flex-col gap-4">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#0F172A]">{feat.title}</span>
                            <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                              Active
                            </span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-[#3F72AF] rounded-full w-4/5" />
                          </div>
                          <div className="grid grid-cols-2 gap-3 pt-2">
                            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                              <span className="text-[10px] text-[#64748B] block font-mono">Sync Status</span>
                              <span className="text-xs font-bold text-[#0F172A] mt-0.5 block">Automated</span>
                            </div>
                            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                              <span className="text-[10px] text-[#64748B] block font-mono">Security</span>
                              <span className="text-xs font-bold text-[#0F172A] mt-0.5 block">Isolated</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Stats Strip */}
        {stats && stats.length > 0 && (
          <section className="py-14 bg-[#F8FAFC] border-b border-[#E7E7EA]">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {stats.map((st) => (
                  <div key={st.label} className="text-center p-4">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A]">
                      {st.value}
                      {st.suffix && (
                        <span className="text-[#3F72AF]">{st.suffix}</span>
                      )}
                    </div>
                    <div className="mt-2 text-xs sm:text-sm font-medium text-[#64748B]">
                      {st.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bento Capabilities Grid (uses exact "Platform modules" box styling & 2x slow reveal animation) */}
        {bentoCards && bentoCards.length > 0 && (
          <section className="py-20 md:py-28 bg-white border-b border-[#E7E7EA]">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
              <div className="max-w-2xl mb-14">
                <SectionBadge text={bentoEyebrow} />
                <AnimatedHeading
                  as="h2"
                  text={bentoTitle}
                  className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A]"
                />
                <p className="mt-3 text-[#64748B] text-sm sm:text-base leading-relaxed">
                  {bentoDescription}
                </p>
              </div>

              <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bentoCards.map((card) => (
                  <StaggerItem
                    key={card.title}
                    className="group bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 flex flex-col justify-between hover:border-[#3F72AF]/40 hover:bg-white hover:shadow-xs transition-[border-color,background-color,box-shadow] duration-200"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform duration-200">
                          {card.icon}
                        </div>
                        {card.tag && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded font-semibold bg-neutral-100 text-neutral-700 border border-neutral-200">
                            {card.tag}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-semibold text-[#0F172A] tracking-tight group-hover:text-[#3F72AF] transition-colors">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-xs text-[#64748B] leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B] group-hover:text-[#0F172A] transition-colors">
                      <span className="font-medium text-[11px]">Learn more</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </section>
        )}

        {/* Testimonials */}
        <Testimonials />

        {/* FAQ - Identical to homepage FAQ */}
        <FAQSection />

        {/* Global CTA */}
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
