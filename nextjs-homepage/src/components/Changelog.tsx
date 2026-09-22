"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteContent } from "@/content/site-content";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Changelog() {
  const { heading, viewAllHref, items } = siteContent.changelog;

  return (
    <section className="py-24 md:py-32 border-b border-[#E7E7EA]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0B0B0F]">
            {heading}
          </h2>
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-1 text-sm font-medium text-[#6B6F76] hover:text-[#0B0B0F] transition-colors"
          >
            View all <ArrowRight size={13} />
          </Link>
        </div>

        {/* 4 Cards in a row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-[#FAFAFA] border border-[#E7E7EA] rounded-xl p-5 flex flex-col justify-between hover:border-[#0B0B0F]/30 hover:bg-white hover:shadow-xs transition-all duration-200"
            >
              <div>
                <span className="font-mono text-[10px] text-indigo-600 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded uppercase font-medium">
                  {item.tag}
                </span>
                <h3 className="mt-3 font-medium text-sm text-[#0B0B0F] tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs text-[#6B6F76] leading-relaxed">
                  {item.description}
                </p>
              </div>
              <span className="mt-6 pt-3 border-t border-[#E7E7EA] text-[11px] font-mono text-[#6B6F76]">
                {item.date}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
