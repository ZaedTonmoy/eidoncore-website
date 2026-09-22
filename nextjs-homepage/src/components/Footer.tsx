"use client";

import React from "react";
import Link from "next/link";
import { siteContent } from "@/content/site-content";

export default function Footer() {
  const { logo, columns, legal } = siteContent.footer;

  return (
    <footer className="border-t border-[#E7E7EA] bg-white pt-16 pb-12 text-xs">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Top: Logo + 5 Link Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 mb-16">
          {/* Logo column */}
          <div className="col-span-2 sm:col-span-3 md:col-span-1 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-[#0B0B0F] text-white flex items-center justify-center text-[10px] font-bold">
                ▲
              </span>
              <span className="font-medium text-sm text-[#0B0B0F]">{logo.name}</span>
            </div>
            <p className="text-[#6B6F76] text-[11.5px] leading-relaxed mt-1">
              {logo.tagline}
            </p>
          </div>

          {/* 5 Link columns */}
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <span className="font-medium text-[#0B0B0F] text-xs">{col.title}</span>
              <div className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <Link
                    key={link}
                    href="#"
                    className="text-[#6B6F76] hover:text-[#0B0B0F] transition-colors"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Row: Legal & Copyright */}
        <div className="pt-8 border-t border-[#E7E7EA] flex flex-col sm:flex-row items-center justify-between gap-4 text-[#6B6F76]">
          <span>{legal.copyright}</span>
          <div className="flex items-center gap-6">
            {legal.links.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-[#0B0B0F] transition-colors"
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
