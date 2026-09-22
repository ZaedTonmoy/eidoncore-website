"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteContent } from "@/content/site-content";
import { ArrowRight } from "lucide-react";

export default function Testimonials() {
  const { cardLeft, cardRight, footerLabel, customerStoriesHref } = siteContent.testimonials;

  return (
    <section className="py-24 md:py-32 border-b border-[#E7E7EA]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* 2 Large Cards Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Card: Soft Lavender Gradient Background */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] border border-[#DDD6FE] rounded-2xl p-8 sm:p-10 flex flex-col justify-between min-h-[320px] transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
          >
            <p className="text-xl sm:text-2xl font-medium text-[#0B0B0F] tracking-tight leading-snug">
              &ldquo;{cardLeft.quote}&rdquo;
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                SL
              </div>
              <div>
                <h4 className="text-sm font-medium text-[#0B0B0F]">{cardLeft.author}</h4>
                <p className="text-xs text-[#6B6F76]">{cardLeft.role}</p>
              </div>
            </div>
          </motion.div>

          {/* Right Card: Highlight Color Background (Lime Yellow #E6F23A) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#E6F23A] border border-[#D5E12E] rounded-2xl p-8 sm:p-10 flex flex-col justify-between min-h-[320px] transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
          >
            <p className="text-xl sm:text-2xl font-medium text-[#0B0B0F] tracking-tight leading-snug">
              &ldquo;{cardRight.quote}&rdquo;
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0B0B0F] text-white flex items-center justify-center font-bold text-xs">
                AM
              </div>
              <div>
                <h4 className="text-sm font-medium text-[#0B0B0F]">{cardRight.author}</h4>
                <p className="text-xs text-[#0B0B0F]/70">{cardRight.role}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Below Link Row */}
        <div className="mt-8 flex items-center justify-between text-xs text-[#6B6F76]">
          <span>{footerLabel}</span>
          <Link
            href={customerStoriesHref}
            className="inline-flex items-center gap-1 font-medium text-[#0B0B0F] hover:text-indigo-600 transition-colors"
          >
            Customer stories <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  );
}
