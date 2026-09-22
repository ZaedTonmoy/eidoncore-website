"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteContent } from "@/content/site-content";

export default function LogoStrip() {
  const { label, logos } = siteContent.logoStrip;

  return (
    <section className="py-16 border-t border-b border-[#E7E7EA] bg-white">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <p className="text-xs font-medium tracking-wider text-[#6B6F76] uppercase mb-8">
          {label}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 md:justify-between"
        >
          {logos.map((logo) => (
            <span
              key={logo}
              className="text-sm md:text-base font-semibold tracking-widest text-[#6B6F76]/60 hover:text-[#0B0B0F] transition-colors duration-200 select-none"
            >
              {logo}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
