"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteContent } from "@/content/site-content";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logo, links, actions } = siteContent.navbar;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-[#E7E7EA] transition-colors">
      <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="w-5 h-5 rounded-md bg-[#0B0B0F] text-white flex items-center justify-center text-[10px] font-bold group-hover:scale-105 transition-transform duration-200">
            {logo.symbol}
          </span>
          <span className="font-medium text-sm tracking-tight text-[#0B0B0F]">
            {logo.name}
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[13.5px] text-[#6B6F76] hover:text-[#0B0B0F] font-normal transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href={actions.login.href}
            className="text-[13.5px] text-[#6B6F76] hover:text-[#0B0B0F] font-normal transition-colors duration-200"
          >
            {actions.login.label}
          </Link>
          <Link
            href={actions.signup.href}
            className="inline-flex items-center justify-center text-[13px] font-medium text-white bg-[#0B0B0F] hover:bg-[#23242A] px-3.5 py-1.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
          >
            {actions.signup.label}
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-1 text-[#6B6F76] hover:text-[#0B0B0F]"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-b border-[#E7E7EA] bg-white px-6 py-4 flex flex-col gap-3">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm text-[#6B6F76] hover:text-[#0B0B0F] py-1"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-[#E7E7EA] flex items-center justify-between">
            <Link
              href={actions.login.href}
              className="text-sm text-[#6B6F76]"
            >
              {actions.login.label}
            </Link>
            <Link
              href={actions.signup.href}
              className="text-xs font-medium text-white bg-[#0B0B0F] px-4 py-2 rounded-full"
            >
              {actions.signup.label}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
