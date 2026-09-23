"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteContent } from "@/content/site-content";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import AnimatedButton from "./AnimatedButton";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);
  const [mobileUseCasesOpen, setMobileUseCasesOpen] = useState(false);
  const { logo } = siteContent.navbar;

  const featureLinks = [
    { title: "Projects", desc: "Budgets, milestones, health scoring", href: "/projects/" },
    { title: "Tasks", desc: "Kanban boards, list views, subtasks", href: "/tasks/" },
    { title: "CRM & Clients", desc: "Pipeline, contacts, health tracking", href: "/crm/" },
    { title: "Invoicing", desc: "Recurring billing, automated payments", href: "/invoicing/" },
    { title: "Offerings", desc: "Productized service catalog", href: "/services/" },
    { title: "Proposals", desc: "E-signatures & line item estimates", href: "/proposals/" },
    { title: "Messaging", desc: "Internal & client communication", href: "/messaging/" },
    { title: "Automations", desc: "Trigger-action workflow rules", href: "/automations/" },
    { title: "Client Portal", desc: "100% white-label client access", href: "/portal/" },
    { title: "AI Workspace", desc: "MCP agents, Claude & Cursor sync", href: "/ai-workspace/" },
    { title: "Notifications", desc: "Real-time activity alerts", href: "/notifications/" },
    { title: "Reports", desc: "Financial & delivery intelligence", href: "/reports/" },
  ];

  const useCaseLinks = [
    { title: "Marketing Agencies", href: "/use-cases/" },
    { title: "Design Studios", href: "/use-cases/" },
    { title: "Development Agencies", href: "/use-cases/" },
    { title: "Consulting Firms", href: "/use-cases/" },
    { title: "Freelancers & Solo", href: "/use-cases/" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#E7E7EA] transition-colors">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <img
            src="/images/logo.png"
            alt="Eidoncore Logo"
            className="w-7 h-7 object-contain rounded-lg group-hover:scale-105 transition-transform duration-200 shadow-2xs"
          />
          <span className="font-bold text-base tracking-tight text-[#0B0B0F]">
            {logo.name}
          </span>
        </Link>

        {/* Desktop Navigation Links with Multi-Page Submenus */}
        <nav className="hidden lg:flex items-center gap-7">
          {/* Features Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("features")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 text-[13.5px] text-[#4A4E57] hover:text-[#0B0B0F] font-medium transition-colors py-2">
              <span>Features</span>
              <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === "features" ? "rotate-180" : ""}`} />
            </button>

            {activeDropdown === "features" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[520px] bg-white border border-[#E7E7EA] rounded-2xl p-4 shadow-lg grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-1 duration-150">
                {featureLinks.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="p-2.5 rounded-xl hover:bg-[#FAFAFA] transition-colors group flex flex-col gap-0.5"
                  >
                    <span className="text-xs font-semibold text-[#0B0B0F] group-hover:text-[#3F72AF] transition-colors">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-[#6B6F76] leading-tight">
                      {item.desc}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href="https://eidoncore.com/pricing/"
            className="text-[13.5px] text-[#4A4E57] hover:text-[#0B0B0F] font-medium transition-colors"
          >
            Pricing
          </a>

          {/* Use Cases Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("use-cases")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 text-[13.5px] text-[#4A4E57] hover:text-[#0B0B0F] font-medium transition-colors py-2">
              <span>Use Cases</span>
              <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === "use-cases" ? "rotate-180" : ""}`} />
            </button>

            {activeDropdown === "use-cases" && (
              <div className="absolute top-full left-0 w-[240px] bg-white border border-[#E7E7EA] rounded-2xl p-3 shadow-lg flex flex-col gap-1 animate-in fade-in slide-in-from-top-1 duration-150">
                {useCaseLinks.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="px-3 py-2 rounded-lg text-xs font-medium text-[#0B0B0F] hover:bg-[#FAFAFA] hover:text-[#3F72AF] transition-colors"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href="https://eidoncore.com/about/"
            className="text-[13.5px] text-[#4A4E57] hover:text-[#0B0B0F] font-medium transition-colors"
          >
            About
          </a>

          <a
            href="https://eidoncore.com/contact/"
            className="text-[13.5px] text-[#4A4E57] hover:text-[#0B0B0F] font-medium transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="https://register.eidoncore.com/login"
            className="text-[13.5px] text-[#4A4E57] hover:text-[#0B0B0F] font-medium transition-colors"
          >
            Log In
          </a>
          <AnimatedButton
            href="https://register.eidoncore.com/"
            className="text-[13px] !px-4 !py-2 shadow-sm font-semibold"
          >
            Start Free Trial
          </AnimatedButton>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-[#4A4E57] hover:text-[#0B0B0F] rounded-lg"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-b border-[#E7E7EA] bg-white px-5 py-5 flex flex-col gap-3.5 max-h-[85vh] overflow-y-auto shadow-lg animate-in fade-in duration-200">
          
          {/* Features Accordion */}
          <div>
            <button
              onClick={() => setMobileFeaturesOpen(!mobileFeaturesOpen)}
              className="w-full flex items-center justify-between py-2 text-sm font-semibold text-[#0B0B0F]"
            >
              <span>Features (12 Modules)</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 text-[#6B6F76] ${
                  mobileFeaturesOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileFeaturesOpen && (
              <div className="grid grid-cols-2 gap-2 pl-2 pt-1 pb-2">
                {featureLinks.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="text-xs text-[#334155] py-1 hover:text-[#3F72AF]"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Use Cases Accordion */}
          <div>
            <button
              onClick={() => setMobileUseCasesOpen(!mobileUseCasesOpen)}
              className="w-full flex items-center justify-between py-2 text-sm font-semibold text-[#0B0B0F]"
            >
              <span>Use Cases</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 text-[#6B6F76] ${
                  mobileUseCasesOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileUseCasesOpen && (
              <div className="flex flex-col gap-1 pl-2 pt-1 pb-2">
                {useCaseLinks.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="text-xs text-[#334155] py-1 hover:text-[#3F72AF]"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-[#E7E7EA] flex flex-col gap-2.5">
            <a href="https://eidoncore.com/pricing/" className="text-sm font-semibold text-[#0B0B0F] py-1">
              Pricing
            </a>
            <a href="https://eidoncore.com/about/" className="text-sm font-semibold text-[#0B0B0F] py-1">
              About
            </a>
            <a href="https://eidoncore.com/contact/" className="text-sm font-semibold text-[#0B0B0F] py-1">
              Contact
            </a>
          </div>

          <div className="pt-4 border-t border-[#E7E7EA] flex items-center justify-between gap-3">
            <a
              href="https://register.eidoncore.com/login"
              className="text-sm font-semibold text-[#4A4E57] px-3 py-2 rounded-lg hover:bg-neutral-100"
            >
              Log In
            </a>
            <AnimatedButton
              href="https://register.eidoncore.com/"
              className="text-xs !px-5 !py-2.5 font-bold"
            >
              Start Free Trial
            </AnimatedButton>
          </div>
        </div>
      )}
    </header>
  );
}
