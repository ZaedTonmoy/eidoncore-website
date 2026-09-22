"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteContent } from "@/content/site-content";

export default function CTA() {
  const { heading, subheading, buttonPrimary, buttonSecondary } = siteContent.cta;

  return (
    <section className="py-28 md:py-36 text-center bg-white">
      <div className="max-w-[720px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#0B0B0F] leading-[1.08]">
            {heading}
          </h2>
          <p className="text-[#6B6F76] text-base sm:text-lg max-w-lg leading-relaxed">
            {subheading}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={buttonPrimary.href}
              className="inline-flex items-center justify-center text-sm font-medium text-white bg-[#0B0B0F] hover:bg-[#23242A] px-6 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
            >
              {buttonPrimary.label}
            </Link>
            <Link
              href={buttonSecondary.href}
              className="inline-flex items-center justify-center text-sm font-medium text-[#0B0B0F] bg-white border border-[#E7E7EA] hover:bg-[#FAFAFA] hover:border-[#0B0B0F]/20 px-6 py-3 rounded-full transition-all duration-200"
            >
              {buttonSecondary.label}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
