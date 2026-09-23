"use client";

import React from "react";
import Link from "next/link";
import AnimatedHeading from "./AnimatedHeading";
import AnimatedText from "./AnimatedText";
import AnimatedButton from "./AnimatedButton";
import SectionBadge from "./SectionBadge";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface InnerHeroProps {
  breadcrumbs: BreadcrumbItem[];
  badge?: string;
  eyebrow?: string;
  title: string;
  description: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  children?: React.ReactNode;
}

export default function InnerHero({
  breadcrumbs,
  badge,
  eyebrow,
  title,
  description,
  ctaPrimary,
  ctaSecondary,
  children,
}: InnerHeroProps) {
  return (
    <section className="pt-8 pb-10 sm:pt-12 sm:pb-14 md:pt-28 md:pb-20 bg-white border-b border-[#E7E7EA] relative overflow-hidden">
      {/* Background subtle radial gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-b from-[#3F72AF]/5 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-3 sm:mb-6 flex items-center gap-1.5 text-xs text-[#64748B]">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.label}>
              {idx > 0 && <ChevronRight size={13} className="text-[#94A3B8]" />}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="hover:text-[#0F172A] transition-colors font-medium"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#0F172A] font-semibold">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Eyebrow badge */}
        {eyebrow && <SectionBadge text={eyebrow} className="mb-3 sm:mb-4" />}

        {/* Main Title */}
        <AnimatedHeading
          as="h1"
          text={title}
          immediate={true}
          className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-[#0F172A] leading-[1.08] justify-center max-w-4xl"
        />

        {/* Subtitle */}
        <AnimatedText
          text={description}
          mode="line"
          immediate={true}
          delay={0.06}
          className="mt-3 sm:mt-5 text-[#64748B] text-base sm:text-lg leading-relaxed max-w-2xl"
        />

        {/* Optional Action Buttons */}
        {(ctaPrimary || ctaSecondary) && (
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3">
            {ctaPrimary && (
              <AnimatedButton href={ctaPrimary.href} variant="primary">
                {ctaPrimary.label}
              </AnimatedButton>
            )}
            {ctaSecondary && (
              <AnimatedButton href={ctaSecondary.href} variant="secondary">
                {ctaSecondary.label}
              </AnimatedButton>
            )}
          </div>
        )}

        {/* Extra slot (e.g. search, tabs, toggle) */}
        {children && <div className="mt-8 w-full flex justify-center">{children}</div>}
      </div>
    </section>
  );
}
