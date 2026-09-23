"use client";

import React from "react";
import Link from "next/link";
import { siteContent } from "@/content/site-content";
import HeroAppWindow from "./mockups/HeroAppWindow";
import AnimatedHeading from "./AnimatedHeading";
import AnimatedText from "./AnimatedText";
import AnimatedButton from "./AnimatedButton";
import { StaggerGroup, StaggerItem } from "./StaggerReveal";
import { ArrowRight, Check } from "lucide-react";

export default function Hero() {
  const { headline, subheadline, eyebrow, eyebrowHref, ctaPrimary, ctaSecondary, trustNotes } =
    siteContent.hero;

  return (
    <section className="pt-8 pb-12 sm:pt-12 sm:pb-16 md:pt-24 md:pb-24 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Top Centered Header Content */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          {/* Eyebrow badge */}
          <Link
            href={eyebrowHref}
            className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E7E7EA] rounded-full text-xs font-medium text-[#0B0B0F] hover:border-[#3F72AF]/40 transition-colors mb-4 sm:mb-6 shadow-2xs group"
          >
            <span className="w-2 h-2 rounded-full bg-[#3F72AF] animate-pulse" />
            <span>{eyebrow}</span>
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>

          {/* Heading */}
          <AnimatedHeading
            as="h1"
            text={headline}
            immediate={true}
            className="text-3xl sm:text-5xl lg:text-[58px] font-bold tracking-tight text-[#0F172A] leading-[1.08] justify-center"
          />

          {/* Subheadline */}
          <AnimatedText
            text={subheadline}
            mode="word"
            immediate={true}
            delay={0.06}
            className="mt-4 sm:mt-5 text-[#6B6F76] text-base sm:text-xl leading-relaxed max-w-2xl"
          />

          {/* Action Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3">
            <AnimatedButton href={ctaPrimary.href} variant="primary">
              {ctaPrimary.label}
            </AnimatedButton>
            <AnimatedButton href={ctaSecondary.href} variant="secondary">
              {ctaSecondary.label}
            </AnimatedButton>
          </div>

          {/* Trust bullets */}
          <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-[#6B6F76]">
            {trustNotes.map((note, idx) => (
              <span key={note} className="inline-flex items-center gap-1.5">
                <Check size={13} className="text-emerald-600" />
                <span>{note}</span>
                {idx < trustNotes.length - 1 && (
                  <span className="text-[#E7E7EA] ml-2 hidden sm:inline">•</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Wide Interactive App Window Mockup */}
        <StaggerGroup viewportAmount={0.01}>
          <StaggerItem>
            <HeroAppWindow />
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
