"use client";

import React, { useState } from "react";
import { siteContent } from "@/content/site-content";
import AnimatedHeading from "./AnimatedHeading";
import AnimatedText from "./AnimatedText";
import AnimatedButton from "./AnimatedButton";
import SectionBadge from "./SectionBadge";
import { StaggerGroup, StaggerItem } from "./StaggerReveal";
import { Check } from "lucide-react";

export default function PricingSection() {
  const { eyebrow, title, description, tiers } = siteContent.pricing;
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 md:py-32 bg-white border-b border-[#E7E7EA]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <SectionBadge text={eyebrow} />
          <AnimatedHeading
            as="h2"
            text={title}
            className="mt-3 text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#0B0B0F] leading-[1.08] justify-center"
          />
          <AnimatedText
            text={description}
            mode="word"
            className="mt-4 text-[#6B6F76] text-base sm:text-lg leading-relaxed justify-center"
          />

          {/* Billing Frequency Switch */}
          <div className="mt-8 inline-flex items-center gap-3 p-1 bg-[#FAFAFA] border border-[#E7E7EA] rounded-full text-xs">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-3 py-1.5 rounded-full font-medium transition-all ${
                !isAnnual
                  ? "bg-white text-[#0B0B0F] shadow-2xs"
                  : "text-[#6B6F76] hover:text-[#0B0B0F]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium transition-all ${
                isAnnual
                  ? "bg-white text-[#0B0B0F] shadow-2xs"
                  : "text-[#6B6F76] hover:text-[#0B0B0F]"
              }`}
            >
              <span>Annual</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full font-mono">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => {
            const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;

            return (
              <StaggerItem
                key={tier.name}
                className={`relative bg-white border rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  tier.featured
                    ? "border-[#3F72AF] shadow-md ring-1 ring-[#3F72AF]/30"
                    : "border-[#E7E7EA] hover:border-[#0B0B0F]/20 hover:shadow-xs"
                }`}
              >
                <div>
                  {tier.popularBadge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#3F72AF] text-white text-[10px] font-mono px-3 py-0.5 rounded-full uppercase tracking-wider font-semibold shadow-xs">
                      {tier.popularBadge}
                    </span>
                  )}

                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xl font-medium text-[#0B0B0F]">{tier.name}</h3>
                  </div>

                  <p className="mt-1 text-xs text-[#6B6F76]">{tier.desc}</p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-semibold tracking-tight text-[#0B0B0F]">
                      ${price}
                    </span>
                    <span className="text-xs text-[#6B6F76]">/ month</span>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#E7E7EA]">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B6F76]">
                      Included Features
                    </span>
                    <ul className="mt-4 flex flex-col gap-2.5 text-xs text-[#0B0B0F]">
                      {tier.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2">
                          <Check size={13} className="text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <AnimatedButton
                    href={tier.href}
                    variant={tier.featured ? "primary" : "secondary"}
                    className="w-full"
                  >
                    {tier.cta}
                  </AnimatedButton>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
