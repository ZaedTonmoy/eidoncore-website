"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteContent } from "@/content/site-content";
import HeroAppWindow from "./mockups/HeroAppWindow";

export default function Hero() {
  const { headline, subheadline, announcement } = siteContent.hero;

  return (
    <section className="pt-20 pb-16 md:pt-28 md:pb-24">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Top Row: Left Heading + Subhead & Right Side Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-medium tracking-tight text-[#0B0B0F] leading-[1.05]">
              {headline}
            </h1>
            <p className="mt-4 text-[#6B6F76] text-lg leading-relaxed">
              {subheadline}
            </p>
          </div>

          <div className="shrink-0 mb-1">
            <Link
              href={announcement.href}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0B0B0F] hover:text-indigo-600 transition-colors duration-200"
            >
              {announcement.text}
            </Link>
          </div>
        </motion.div>

        {/* Wide Fake App Window Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <HeroAppWindow />
        </motion.div>
      </div>
    </section>
  );
}
