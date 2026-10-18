"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import AnimatedButton from "./AnimatedButton";

type NavDropdownId = "features" | "use-cases";

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
  { title: "Marketing Agencies", href: "/use-cases/#marketing" },
  { title: "Design Studios", href: "/use-cases/#design" },
  { title: "Development Agencies", href: "/use-cases/#development" },
  { title: "Consulting Firms", href: "/use-cases/#consulting" },
  { title: "Freelancers & Solo", href: "/use-cases/#freelancers" },
];

const SIGNUP_URL = "https://register.eidoncore.com/";
const LOGIN_URL = "https://register.eidoncore.com/login";

const desktopLink =
  "text-[13.5px] font-medium text-[#4A4E57] hover:text-[#0B0B0F] data-[active=true]:text-[#0B0B0F] transition-colors rounded-md py-2";

export default function Navbar() {
  const pathname = usePathname() || "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<NavDropdownId | null>(null);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);
  const [mobileUseCasesOpen, setMobileUseCasesOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const isActive = (href: string) => {
    const clean = href.split("#")[0];
    return clean === "/" ? pathname === "/" : pathname.startsWith(clean.replace(/\/$/, ""));
  };

  // Close menus on navigation
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Escape closes any open menu; clicking outside closes dropdowns
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setMobileOpen(false);
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  // Lock page scroll behind the mobile drawer
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const dropdownHandlers = (id: NavDropdownId) => ({
    onMouseEnter: () => setActiveDropdown(id),
    onMouseLeave: () => setActiveDropdown((cur) => (cur === id ? null : cur)),
    onFocus: () => setActiveDropdown(id),
    onBlur: (e: React.FocusEvent<HTMLDivElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
        setActiveDropdown((cur) => (cur === id ? null : cur));
      }
    },
  });

  const linkState = (href: string) =>
    isActive(href) ? { "aria-current": "page" as const, "data-active": "true" } : {};

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#E7E7EA]"
    >
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group py-1 rounded-md" aria-label="Eidoncore home">
          <img
            src="/images/Eidoncore-Black.png"
            alt="Eidoncore"
            width={98}
            height={28}
            className="h-6 sm:h-7 w-auto object-contain group-hover:opacity-85 transition-opacity duration-200"
          />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden lg:flex items-center gap-7">
          {/* Features dropdown */}
          <div className="relative" {...dropdownHandlers("features")}>
            <Link
              href="/features/"
              aria-haspopup="true"
              aria-expanded={activeDropdown === "features"}
              className={`flex items-center gap-1 ${desktopLink}`}
              {...linkState("/features/")}
            >
              <span>Features</span>
              <ChevronDown
                size={13}
                aria-hidden="true"
                className={`transition-transform duration-200 ${activeDropdown === "features" ? "rotate-180" : ""}`}
              />
            </Link>

            {activeDropdown === "features" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="w-[520px] bg-white border border-[#E7E7EA] rounded-2xl p-3 shadow-lg grid grid-cols-2 gap-1">
                  {featureLinks.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className="p-2.5 rounded-xl hover:bg-[#F8FAFC] focus-visible:bg-[#F8FAFC] transition-colors group flex flex-col gap-0.5"
                    >
                      <span className="text-[13px] font-semibold text-[#0B0B0F] group-hover:text-[#3F72AF] transition-colors">
                        {item.title}
                      </span>
                      <span className="text-xs text-[#64748B] leading-snug">{item.desc}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/pricing/" className={desktopLink} {...linkState("/pricing/")}>
            Pricing
          </Link>

          {/* Use cases dropdown */}
          <div className="relative" {...dropdownHandlers("use-cases")}>
            <Link
              href="/use-cases/"
              aria-haspopup="true"
              aria-expanded={activeDropdown === "use-cases"}
              className={`flex items-center gap-1 ${desktopLink}`}
              {...linkState("/use-cases/")}
            >
              <span>Use Cases</span>
              <ChevronDown
                size={13}
                aria-hidden="true"
                className={`transition-transform duration-200 ${activeDropdown === "use-cases" ? "rotate-180" : ""}`}
              />
            </Link>

            {activeDropdown === "use-cases" && (
              <div className="absolute top-full left-0 pt-2 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="w-[240px] bg-white border border-[#E7E7EA] rounded-2xl p-2 shadow-lg flex flex-col">
                  {useCaseLinks.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className="px-3 py-2 rounded-lg text-[13px] font-medium text-[#0B0B0F] hover:bg-[#F8FAFC] focus-visible:bg-[#F8FAFC] hover:text-[#3F72AF] transition-colors"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/about/" className={desktopLink} {...linkState("/about/")}>
            About
          </Link>
          <Link href="/contact/" className={desktopLink} {...linkState("/contact/")}>
            Contact
          </Link>
        </nav>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-4">
          <a href={LOGIN_URL} className={desktopLink}>
            Log In
          </a>
          <AnimatedButton href={SIGNUP_URL} className="text-[13px] !px-4 !py-2 shadow-sm font-semibold">
            Start Free Trial
          </AnimatedButton>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="lg:hidden -mr-2 h-11 w-11 inline-flex items-center justify-center text-[#4A4E57] hover:text-[#0B0B0F] rounded-lg"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) setMobileOpen(false);
          }}
          className="lg:hidden border-t border-[#E7E7EA] bg-white px-4 sm:px-6 py-3 flex flex-col max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain shadow-lg animate-in fade-in slide-in-from-top-1 duration-200"
        >
          {/* Features accordion */}
          <div className="border-b border-[#F1F5F9]">
            <div className="flex items-center justify-between">
              <Link
                href="/features/"
                className="flex-1 py-3.5 text-[15px] font-semibold text-[#0B0B0F] hover:text-[#3F72AF] transition-colors"
              >
                Features
              </Link>
              <button
                type="button"
                onClick={() => setMobileFeaturesOpen((o) => !o)}
                className="h-11 w-11 -mr-2 inline-flex items-center justify-center text-[#64748B] hover:text-[#0B0B0F]"
                aria-label="Show feature pages"
                aria-expanded={mobileFeaturesOpen}
                aria-controls="mobile-features"
              >
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className={`transition-transform duration-200 ${mobileFeaturesOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>
            {mobileFeaturesOpen && (
              <div id="mobile-features" className="grid grid-cols-2 gap-x-2 pb-3">
                {featureLinks.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="py-2.5 text-sm text-[#334155] hover:text-[#3F72AF]"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/pricing/"
            className="py-3.5 text-[15px] font-semibold text-[#0B0B0F] border-b border-[#F1F5F9]"
          >
            Pricing
          </Link>

          {/* Use cases accordion */}
          <div className="border-b border-[#F1F5F9]">
            <div className="flex items-center justify-between">
              <Link
                href="/use-cases/"
                className="flex-1 py-3.5 text-[15px] font-semibold text-[#0B0B0F] hover:text-[#3F72AF] transition-colors"
              >
                Use Cases
              </Link>
              <button
                type="button"
                onClick={() => setMobileUseCasesOpen((o) => !o)}
                className="h-11 w-11 -mr-2 inline-flex items-center justify-center text-[#64748B] hover:text-[#0B0B0F]"
                aria-label="Show use case pages"
                aria-expanded={mobileUseCasesOpen}
                aria-controls="mobile-use-cases"
              >
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className={`transition-transform duration-200 ${mobileUseCasesOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>
            {mobileUseCasesOpen && (
              <div id="mobile-use-cases" className="flex flex-col pb-3">
                {useCaseLinks.map((item) => (
                  <Link key={item.title} href={item.href} className="py-2.5 text-sm text-[#334155] hover:text-[#3F72AF]">
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/about/" className="py-3.5 text-[15px] font-semibold text-[#0B0B0F] border-b border-[#F1F5F9]">
            About
          </Link>
          <Link href="/contact/" className="py-3.5 text-[15px] font-semibold text-[#0B0B0F]">
            Contact
          </Link>

          <div className="mt-2 pt-4 pb-2 border-t border-[#E7E7EA] grid grid-cols-2 gap-3">
            <a
              href={LOGIN_URL}
              className="inline-flex items-center justify-center h-11 rounded-full border border-[#E7E7EA] text-sm font-semibold text-[#0B0B0F] hover:bg-[#F8FAFC]"
            >
              Log In
            </a>
            <AnimatedButton href={SIGNUP_URL} className="text-sm !py-0 h-11 font-semibold">
              Start Free Trial
            </AnimatedButton>
          </div>
        </nav>
      )}
    </header>
  );
}
