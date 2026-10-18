"use client";

import React from "react";
import Link from "next/link";
import { siteContent } from "@/content/site-content";
import { ShieldCheck } from "lucide-react";

export default function Footer() {
  const { logo, columns, legal } = siteContent.footer;

  return (
    <footer className="bg-[#F8FAFC] border-t border-[#E2E8F0] pt-16 sm:pt-20 pb-10 text-[13px]">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Top: Logo + 4 Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-x-6 gap-y-10 mb-12 sm:mb-16">
          
          {/* Logo column */}
          <div className="col-span-2 flex flex-col gap-3">
            <div className="flex items-center">
              <img
                src="/images/Eidoncore-Black.png"
                alt="Eidoncore"
                width={98}
                height={28}
                className="h-7 w-auto object-contain"
              />
            </div>
            <p className="text-[#64748B] text-[13px] leading-relaxed max-w-sm mt-1">
              {logo.tagline}
            </p>

            {/* Compliance Pills */}
            <div className="flex flex-wrap items-center gap-2 mt-3">
              {legal.badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E2E8F0] rounded-md text-[11px] font-mono text-[#475569] shadow-2xs"
                >
                  <ShieldCheck size={12} className="text-emerald-600" />
                  <span>{badge}</span>
                </span>
              ))}
            </div>
          </div>

          {/* 4 Link columns */}
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <span className="font-bold text-[#0F172A] text-xs uppercase tracking-wider font-mono mb-1">
                {col.title}
              </span>
              <div className="flex flex-col gap-1">
                {col.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="py-1 text-[#64748B] hover:text-[#0F172A] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Row: Legal & Copyright */}
        <div className="pt-8 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 text-[#64748B]">
          <span>{legal.copyright}</span>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
            {legal.links.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="py-1 hover:text-[#0F172A] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
