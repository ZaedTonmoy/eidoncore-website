"use client";

import React, { useState } from "react";
import {
  Search,
  Sparkles,
  Settings,
  Bell,
  ChevronDown,
  Globe,
  Palette,
  Copy,
  Check,
  AlertTriangle,
  RotateCw,
  ArrowRight,
  Zap,
  Activity,
  LayoutGrid,
  LayoutDashboard,
  Building2,
  Users,
  User,
  Plus,
  MessageSquare,
  Square,
  CheckCircle2,
  UserPlus,
  X,
  Pipette,
  ChevronsUpDown,
  Sun,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* SHARED APP TOPBAR (Julian Vance, Search, 11/17 ring, AI Copilot, Bell)     */
/* -------------------------------------------------------------------------- */
export function AppTopBar({ activeModule = "settings" }: { activeModule?: "settings" | "team" | "dashboard" }) {
  return (
    <div className="h-14 bg-white border-b border-[#E2E8F0] px-3 sm:px-5 flex items-center justify-between gap-2 shrink-0 select-none overflow-hidden">
      {/* Left: module icon button + vertical separator + search */}
      <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 shrink">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-[#CBD5E1] bg-white flex items-center justify-center text-[#6366F1] shadow-2xs shrink-0">
          <LayoutGrid size={15} />
        </div>
        <div className="h-5 w-px bg-[#E2E8F0] mx-0.5 shrink-0 hidden xl:block" />

        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-xs text-[#94A3B8] w-44 xl:w-56 shrink min-w-0 shadow-2xs">
          <Search size={13} className="text-[#94A3B8] shrink-0" />
          <span className="truncate text-[11px] sm:text-[12px]">Search or jump to...</span>
          <kbd className="ml-auto text-[10px] font-mono bg-white border border-[#CBD5E1] rounded px-1.5 py-0.5 text-[#64748B] shadow-2xs shrink-0">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: 11/17 ring, Copilot, Settings, Notification, Profile */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Progress ring 11/17 */}
        <div className="hidden xl:flex items-center gap-2 px-2.5 py-1.5 bg-white border border-[#CBD5E1] rounded-full text-xs font-medium text-[#0F172A] shadow-2xs shrink-0">
          <svg className="w-3.5 h-3.5 -rotate-90 shrink-0" viewBox="0 0 36 36">
            <path
              className="text-[#E2E8F0]"
              strokeWidth="4"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-emerald-500"
              strokeDasharray="65, 100"
              strokeWidth="4"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="font-semibold text-xs text-[#0F172A]">Get started</span>
          <span className="text-[#64748B] text-[11px] font-mono">11/17</span>
        </div>

        {/* AI Copilot Button */}
        <button
          type="button"
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-[#EEF2FF] border border-[#C7D2FE] text-[#4F46E5] hover:bg-[#E0E7FF] transition-colors rounded-xl text-xs font-semibold shadow-2xs shrink-0"
        >
          <Sparkles size={13} className="shrink-0 text-[#6366F1]" />
          <span>AI Copilot</span>
          <kbd className="hidden xl:inline text-[9.5px] font-mono px-1.5 py-0.2 bg-white/90 rounded border border-[#C7D2FE] text-[#4F46E5]">
            ⌘J
          </kbd>
        </button>

        {/* Gear icon */}
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-[#CBD5E1] bg-white text-[#64748B] hover:text-[#0F172A] hidden sm:flex items-center justify-center shadow-2xs cursor-pointer shrink-0">
          <Settings size={14} />
        </div>

        {/* Notification bell badge */}
        <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-[#CBD5E1] bg-white text-[#64748B] hover:text-[#0F172A] flex items-center justify-center shadow-2xs cursor-pointer shrink-0">
          <Bell size={14} />
          <span className="absolute -top-1 -right-1 px-1.5 py-0.2 text-[8px] font-bold font-mono bg-[#3B82F6] text-white rounded-full shadow-2xs">
            49
          </span>
        </div>

        {/* User avatar & name */}
        <div className="flex items-center gap-1.5 sm:gap-2 pl-0.5 sm:pl-1 cursor-pointer shrink-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-[#2563EB] border border-white shadow-2xs ring-1 ring-black/5 shrink-0 relative flex items-center justify-center text-white">
            <svg viewBox="0 0 32 32" className="w-full h-full">
              <rect width="32" height="32" fill="#3B82F6" />
              <circle cx="16" cy="12" r="5.5" fill="#FDE68A" />
              <path d="M7 29 C7 22 11 19 16 19 C21 19 25 22 25 29 Z" fill="#1E3A8A" />
              <path d="M11 11 Q16 6 21 11 Q20 8 16 8 Q12 8 11 11" fill="#1E293B" />
            </svg>
          </div>
          <span className="text-xs font-bold text-[#0F172A] hidden md:inline truncate max-w-[85px] xl:max-w-none">Julian Vance</span>
          <ChevronDown size={13} className="text-[#94A3B8] shrink-0" />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* STEP 0: AGENCY PROFILE MOCKUP (Full-width, No Sidebar)                     */
/* -------------------------------------------------------------------------- */
export function AgencyProfileMockup() {
  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] select-none text-left relative">
      <AppTopBar activeModule="settings" />

      {/* Main Content (spans full width) */}
      <div className="flex-1 p-4 sm:p-6 lg:p-7 overflow-y-auto no-scrollbar bg-white">
        <div className="max-w-3xl mx-auto">
          {/* Header row with breadcrumb */}
          <div className="flex items-center justify-between mb-4 border-b border-[#F1F5F9] pb-3">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-0.5">
                <span>Settings</span>
                <span>/</span>
                <span className="text-[#4F46E5] font-semibold">Agency Profile</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#0F172A] tracking-tight">Agency Profile</h3>
              <p className="text-[11px] sm:text-xs text-[#64748B] mt-0.5">
                Manage your agency&apos;s information and defaults.
              </p>
            </div>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono font-semibold rounded-full">
              <CheckCircle2 size={11} className="text-emerald-600" />
              Verified Workspace
            </span>
          </div>

          {/* General Information Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 sm:p-6 shadow-2xs flex flex-col gap-4">
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-[#0F172A]">General Information</h4>
              <p className="text-[10px] sm:text-[11px] text-[#64748B]">Basic agency details.</p>
            </div>

            {/* Form rows in clean 2-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Agency Name */}
              <div>
                <label className="text-[11px] font-medium text-[#334155] block mb-1">
                  Agency Name <span className="text-red-500">*</span>
                </label>
                <div className="px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs font-semibold text-[#0F172A] shadow-2xs">
                  Aetheris Creative Studio
                </div>
              </div>

              {/* Email (Reply-to) */}
              <div>
                <label className="text-[11px] font-medium text-[#334155] block mb-1">
                  Email (Reply-to)
                </label>
                <div className="px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#0F172A] flex items-center justify-between shadow-2xs">
                  <span className="font-mono text-[11px]">hello@aetheris.design</span>
                  <span className="w-4 h-4 rounded bg-red-50 text-red-600 font-mono text-[9px] flex items-center justify-center font-bold">
                    ...
                  </span>
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="text-[11px] font-medium text-[#334155] block mb-1">Phone</label>
                <div className="px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs font-mono text-[#0F172A] shadow-2xs">
                  +1 (415) 890-4200
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="text-[11px] font-medium text-[#334155] block mb-1">Address</label>
                <div className="px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#0F172A] leading-relaxed shadow-2xs truncate">
                  550 Montgomery St, Suite 700, San Francisco, CA 94111
                </div>
              </div>
            </div>

            {/* Agency Logo */}
            <div className="pt-2 border-t border-[#F1F5F9]">
              <label className="text-[11px] font-medium text-[#334155] block mb-1.5">
                Agency Logo
              </label>
              <div className="p-3.5 sm:p-4 border border-dashed border-[#CBD5E1] rounded-xl bg-[#F8FAFC] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#0F172A] text-white flex flex-col items-center justify-center px-1 font-bold text-[9px] tracking-widest shadow-2xs shrink-0">
                    <span>AETHER</span>
                    <span className="text-[6.5px] text-indigo-400 font-normal">STUDIO</span>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#0F172A]">aetheris-brand-mark.svg</div>
                    <div className="text-[10px] text-[#64748B]">SVG, PNG, WebP · Max 2MB · 512×512px</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium">
                  <button type="button" className="px-3 py-1.5 bg-white border border-[#CBD5E1] rounded-lg text-[#334155] hover:bg-neutral-50 shadow-2xs">
                    Replace
                  </button>
                  <button type="button" className="px-3 py-1.5 bg-white border border-[#CBD5E1] rounded-lg text-[#334155] hover:bg-neutral-50 shadow-2xs hidden sm:inline">
                    Browse
                  </button>
                  <button type="button" className="px-2.5 py-1.5 text-red-600 hover:text-red-700">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Defaults Card */}
          <div className="mt-4 bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-xs font-semibold text-[#0F172A]">Workspace Defaults</h4>
              <p className="text-[10px] text-[#64748B]">Default currency and timezone for all client records.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10.5px] font-mono font-medium px-2.5 py-1 bg-[#F1F5F9] rounded-md text-[#334155]">
                USD ($)
              </span>
              <span className="text-[10.5px] font-mono font-medium px-2.5 py-1 bg-[#F1F5F9] rounded-md text-[#334155]">
                America/Los_Angeles (GMT-7)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Bubble Widget from Screenshot */}
      <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-[#6366F1] text-white flex items-center justify-center shadow-lg cursor-pointer hover:bg-[#4F46E5] transition-colors">
        <MessageSquare size={16} />
        <span className="absolute -top-1 -right-1 px-1 py-0.2 text-[8px] font-bold font-mono bg-[#0F172A] text-white rounded-full">
          2
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* STEP 1: BRANDING MOCKUP (Exact Match to User Screenshot 1 & 2)             */
/* -------------------------------------------------------------------------- */
export function BrandingDomainsMockup() {
  const [primaryColor, setPrimaryColor] = useState("#6366f1");
  const [borderRadius, setBorderRadius] = useState<"sharp" | "medium" | "rounded">("medium");
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] select-none text-left relative">
      <AppTopBar activeModule="settings" />

      {/* Main Content (spans full width) */}
      <div className="flex-1 p-4 sm:p-6 lg:p-7 overflow-y-auto no-scrollbar bg-white flex flex-col">
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-3.5 sm:gap-4">
          
          {/* Header row with breadcrumb matching AgencyProfileMockup */}
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-0.5">
                <span>Settings</span>
                <span>/</span>
                <span className="text-[#4F46E5] font-semibold">Branding</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#0F172A] tracking-tight">Branding &amp; Theme</h3>
              <p className="text-[11px] sm:text-xs text-[#64748B] mt-0.5">
                Configure your agency colors, typography, and theme styling.
              </p>
            </div>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] font-mono font-semibold rounded-full">
              <CheckCircle2 size={11} className="text-indigo-600" />
              Theme Active
            </span>
          </div>

          {/* Card 1: Colors (Matches media_1793536619030_81de624b.png & consistent with AgencyProfile) */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 sm:p-5 shadow-2xs flex flex-col gap-3">
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-[#0F172A]">Colors</h4>
              <p className="text-[10px] sm:text-[11px] text-[#64748B] mt-0.5">
                Primary and secondary colors are used across UI. Semantic colors override system defaults for status indicators.
              </p>
            </div>

            <div className="border-b border-[#F1F5F9]" />

            {/* Primary & Secondary Color Inputs Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 relative">
              {/* Primary Color */}
              <div className="relative">
                <label className="text-[11px] font-medium text-[#334155] block mb-1">
                  Primary Color
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className="w-9 h-8 sm:w-10 sm:h-8.5 rounded-lg bg-[#6366f1] shadow-2xs cursor-pointer shrink-0 transition-transform hover:scale-105 active:scale-95 relative border border-black/5"
                    style={{ backgroundColor: primaryColor }}
                    title="Click to open color picker"
                  />
                  <div
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className="flex-1 px-3 py-1.5 sm:py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs font-mono text-[#0F172A] cursor-pointer hover:border-[#6366F1] shadow-2xs transition-colors flex items-center justify-between"
                  >
                    <span>{primaryColor}</span>
                    <span className="text-[10px] font-sans text-[#6366F1] font-semibold hidden sm:inline">
                      {showColorPicker ? "Close" : "Edit color"}
                    </span>
                  </div>
                </div>

                {/* Color Picker Popover (Matches media_1793536828272_2628878c.png) */}
                {showColorPicker && (
                  <div className="absolute top-full left-0 mt-2 w-60 sm:w-64 bg-white border border-[#CBD5E1] rounded-xl shadow-2xl p-3 z-40 flex flex-col gap-2.5 animate-in fade-in zoom-in-95 duration-150">
                    {/* 2D Gradient Area */}
                    <div
                      className="h-28 sm:h-32 rounded-lg relative overflow-hidden cursor-crosshair shadow-inner"
                      style={{
                        background:
                          "linear-gradient(to bottom, transparent, #000000), linear-gradient(to right, #ffffff, #1d00ff)",
                      }}
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        if (x > rect.width * 0.7) setPrimaryColor("#4338ca");
                        else if (x > rect.width * 0.4) setPrimaryColor("#6366f1");
                        else setPrimaryColor("#818cf8");
                      }}
                    >
                      {/* Selection Knob */}
                      <div
                        className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-md ring-2 ring-black/40 absolute pointer-events-none"
                        style={{ top: "12%", left: "55%", transform: "translate(-50%, -50%)" }}
                      />
                    </div>

                    {/* Controls Row: Pipette, Swatch, Rainbow Hue Slider */}
                    <div className="flex items-center gap-2 pt-0.5">
                      {/* Pipette */}
                      <button
                        type="button"
                        className="w-6 h-6 flex items-center justify-center text-[#0F172A] hover:bg-neutral-100 rounded-md shrink-0"
                      >
                        <Pipette size={13} />
                      </button>

                      {/* Color Circle Swatch */}
                      <div
                        className="w-6 h-6 rounded-full shadow-inner border border-black/10 shrink-0"
                        style={{ backgroundColor: primaryColor }}
                      />

                      {/* Rainbow Hue Slider */}
                      <div className="flex-1 h-2.5 rounded-full relative flex items-center overflow-visible bg-gradient-to-r from-[#ff00ff] via-[#0000ff] via-[#00ffff] via-[#00ff00] via-[#ffff00] to-[#ff0000]">
                        <div
                          className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-md absolute"
                          style={{ left: "45%", backgroundColor: "#1e40af", transform: "translateX(-50%)" }}
                        />
                      </div>
                    </div>

                    {/* RGB Input Row */}
                    <div className="flex items-center gap-1.5 pt-0.5 text-center">
                      <div className="flex-1 flex flex-col items-center">
                        <input
                          type="text"
                          readOnly
                          value="99"
                          className="w-full text-center px-1 py-0.5 bg-white border border-[#CBD5E1] rounded-md text-[11px] font-mono font-medium text-[#0F172A]"
                        />
                        <span className="text-[9.5px] text-[#64748B] font-mono mt-0.5">R</span>
                      </div>
                      <div className="flex-1 flex flex-col items-center">
                        <input
                          type="text"
                          readOnly
                          value="102"
                          className="w-full text-center px-1 py-0.5 bg-white border border-[#CBD5E1] rounded-md text-[11px] font-mono font-medium text-[#0F172A]"
                        />
                        <span className="text-[9.5px] text-[#64748B] font-mono mt-0.5">G</span>
                      </div>
                      <div className="flex-1 flex flex-col items-center">
                        <input
                          type="text"
                          readOnly
                          value="241"
                          className="w-full text-center px-1 py-0.5 bg-white border border-[#CBD5E1] rounded-md text-[11px] font-mono font-medium text-[#0F172A]"
                        />
                        <span className="text-[9.5px] text-[#64748B] font-mono mt-0.5">B</span>
                      </div>
                      <button
                        type="button"
                        className="p-1 text-[#64748B] hover:text-[#0F172A] shrink-0"
                      >
                        <ChevronsUpDown size={13} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Secondary Color */}
              <div>
                <label className="text-[11px] font-medium text-[#334155] block mb-1">
                  Secondary Color
                </label>
                <div className="flex items-center gap-2">
                  <div className="w-9 h-8 sm:w-10 sm:h-8.5 rounded-lg bg-[#06b6d4] shadow-2xs shrink-0 border border-black/5" />
                  <div className="flex-1 px-3 py-1.5 sm:py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs font-mono text-[#0F172A] shadow-2xs">
                    #06b6d4
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-[#F1F5F9] my-1" />

            {/* Semantic Status Colors (Success, Warning, Danger) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-medium text-[#334155] block mb-1">
                  Success Color
                </label>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-7 sm:w-9 sm:h-8 rounded-lg bg-[#E2E8F0]/70 border border-[#CBD5E1]/60 shadow-2xs shrink-0" />
                  <div className="flex-1 px-3 py-1.5 sm:py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs font-mono text-[#475569] shadow-2xs">
                    #6366f1
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-[#334155] block mb-1">
                  Warning Color
                </label>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-7 sm:w-9 sm:h-8 rounded-lg bg-[#E2E8F0]/70 border border-[#CBD5E1]/60 shadow-2xs shrink-0" />
                  <div className="flex-1 px-3 py-1.5 sm:py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs font-mono text-[#475569] shadow-2xs">
                    #6366f1
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-[#334155] block mb-1">
                  Danger Color
                </label>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-7 sm:w-9 sm:h-8 rounded-lg bg-[#E2E8F0]/70 border border-[#CBD5E1]/60 shadow-2xs shrink-0" />
                  <div className="flex-1 px-3 py-1.5 sm:py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs font-mono text-[#475569] shadow-2xs">
                    #6366f1
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Typography & Shape (Matches media_1793536619030_81de624b.png & consistent with AgencyProfile) */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 sm:p-5 shadow-2xs flex flex-col gap-3">
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-[#0F172A]">Typography &amp; Shape</h4>
              <p className="text-[10px] sm:text-[11px] text-[#64748B] mt-0.5">
                Font choice and corner rounding applied across all client portals and dashboard widgets.
              </p>
            </div>

            <div className="border-b border-[#F1F5F9]" />

            {/* Font Family Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-[11px] font-medium text-[#334155]">
                Font Family
              </span>
              <div className="px-3.5 py-1.5 sm:py-2 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#0F172A] flex items-center justify-between w-full sm:w-60 shadow-2xs cursor-pointer hover:border-[#6366F1] transition-colors">
                <span>System Default</span>
                <ChevronDown size={13} className="text-[#94A3B8]" />
              </div>
            </div>

            <div className="border-b border-[#F1F5F9]" />

            {/* Border Radius Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-[11px] font-medium text-[#334155]">
                Border Radius
              </span>
              <div className="flex items-center bg-[#F1F5F9] p-0.5 sm:p-1 rounded-lg gap-1 text-xs">
                <button
                  type="button"
                  onClick={() => setBorderRadius("sharp")}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    borderRadius === "sharp"
                      ? "bg-white text-[#0F172A] shadow-xs font-semibold border border-slate-200/50"
                      : "text-[#475569] hover:text-[#0F172A]"
                  }`}
                >
                  <span className="w-2 h-2 border-l-2 border-t-2 border-current" />
                  <span>Sharp</span>
                </button>
                <button
                  type="button"
                  onClick={() => setBorderRadius("medium")}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    borderRadius === "medium"
                      ? "bg-white text-[#0F172A] shadow-xs font-semibold border border-slate-200/50"
                      : "text-[#475569] hover:text-[#0F172A]"
                  }`}
                >
                  <span className="w-2 h-2 border-l-2 border-t-2 border-current rounded-tl-sm" />
                  <span>Medium</span>
                </button>
                <button
                  type="button"
                  onClick={() => setBorderRadius("rounded")}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    borderRadius === "rounded"
                      ? "bg-white text-[#0F172A] shadow-xs font-semibold border border-slate-200/50"
                      : "text-[#475569] hover:text-[#0F172A]"
                  }`}
                >
                  <span className="w-2 h-2 border-l-2 border-t-2 border-current rounded-full" />
                  <span>Rounded</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* STEP 2: TEAM DIRECTORY MOCKUP WITH INTERACTIVE INVITE MODAL                */
/* (Matches Screenshot 4 & media_1793536882722_f22eab42.png)                  */
/* -------------------------------------------------------------------------- */
export function TeamDirectoryMockup() {
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] select-none text-left relative">
      <AppTopBar activeModule="team" />

      <div className="flex-1 p-4 sm:p-6 overflow-y-auto no-scrollbar bg-white flex flex-col gap-4">
        {/* Header: The People Behind the Work */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-3.5">
          <div>
            <span className="text-[9.5px] font-mono font-bold tracking-wider text-[#64748B] uppercase">
              The People Behind The Work
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#0F172A] tracking-tight">
              Great work starts with your team.
            </h3>
            <p className="text-[11px] sm:text-xs text-[#64748B]">
              Find the right person, make room for focused work, and keep everyone moving together.
            </p>
          </div>

          {/* Avatar stack + 6 people count */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex -space-x-1.5 overflow-hidden">
              <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-indigo-500 text-white font-bold text-[8px] flex items-center justify-center">AO</div>
              <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-rose-500 text-white font-bold text-[8px] flex items-center justify-center">CB</div>
              <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-amber-500 text-white font-bold text-[8px] flex items-center justify-center">DS</div>
              <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-emerald-500 text-white font-bold text-[8px] flex items-center justify-center">LG</div>
              <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-slate-700 text-white font-bold text-[8px] flex items-center justify-center">+2</div>
            </div>
            <span className="text-xs font-semibold text-[#0F172A]">6 people</span>
          </div>
        </div>

        {/* Tabs & Invite Member Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-4 text-xs font-semibold">
            <button type="button" className="text-[#4F46E5] border-b-2 border-[#4F46E5] pb-1">
              Directory
            </button>
            <button type="button" className="text-[#64748B] hover:text-[#0F172A] pb-1">
              Workload
            </button>
            <button type="button" className="text-[#64748B] hover:text-[#0F172A] pb-1 hidden sm:inline">
              Capacity &amp; Timeline
            </button>
            <button type="button" className="text-[#64748B] hover:text-[#0F172A] pb-1">
              Invitations
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button type="button" className="p-1.5 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:bg-neutral-50">
              <RotateCw size={12} />
            </button>
            <button
              type="button"
              onClick={() => setIsInviteOpen(true)}
              className="px-3.5 py-1.5 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all hover:shadow cursor-pointer active:scale-98"
            >
              <Plus size={12} />
              <span>Invite member</span>
            </button>
          </div>
        </div>

        {/* Main Grid: 2 Columns (Directory Cards + Right Rail Copilot) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Left Column (Team Cards) */}
          <div className="lg:col-span-8 flex flex-col gap-3">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#94A3B8] flex-1 max-w-xs">
                <Search size={11} />
                <span className="truncate text-[11px]">Search people, roles, departments...</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#64748B]">
                <span className="px-2.5 py-1 bg-white border border-[#E2E8F0] rounded-md font-medium">All depts ▾</span>
                <span className="px-2.5 py-1 bg-white border border-[#E2E8F0] rounded-md font-medium">All roles ▾</span>
              </div>
            </div>

            {/* 2x2 Grid of Team Members */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Amara Okafor */}
              <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-xl shadow-2xs flex flex-col justify-between gap-2.5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-400 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      AO
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0F172A]">Amara Okafor</div>
                      <span className="text-[9.5px] px-1.5 py-0.2 bg-[#F1F5F9] rounded text-[#475569] font-medium">
                        Agency Member
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                </div>
                <div className="text-[10px] text-[#64748B] font-mono">amara@aetheris.design · Engineering</div>
                <div className="flex items-center justify-between pt-1.5 border-t border-[#F1F5F9] text-[10.5px]">
                  <span className="font-semibold text-[#0F172A]">10 Active tasks</span>
                  <span className="px-1.5 py-0.2 bg-red-50 text-red-600 border border-red-200 rounded font-semibold font-mono">
                    ▲ 10 overdue
                  </span>
                </div>
              </div>

              {/* Chloe Bennett */}
              <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-xl shadow-2xs flex flex-col justify-between gap-2.5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      CB
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0F172A]">Chloe Bennett</div>
                      <span className="text-[9.5px] px-1.5 py-0.2 bg-[#F1F5F9] rounded text-[#475569] font-medium">
                        Agency Member
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                </div>
                <div className="text-[10px] text-[#64748B] font-mono">chloe@aetheris.design · Design</div>
                <div className="flex items-center justify-between pt-1.5 border-t border-[#F1F5F9] text-[10.5px]">
                  <span className="font-semibold text-[#0F172A]">6 Active tasks</span>
                  <span className="px-1.5 py-0.2 bg-red-50 text-red-600 border border-red-200 rounded font-semibold font-mono">
                    ▲ 5 overdue
                  </span>
                </div>
              </div>

              {/* Dominic Sterling */}
              <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-xl shadow-2xs flex flex-col justify-between gap-2.5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-400 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      DS
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0F172A]">Dominic Sterling</div>
                      <span className="text-[9.5px] px-1.5 py-0.2 bg-[#F1F5F9] rounded text-[#475569] font-medium">
                        Accountant
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                </div>
                <div className="text-[10px] text-[#64748B] font-mono">dominic@aetheris.design · Finance</div>
                <div className="flex items-center justify-between pt-1.5 border-t border-[#F1F5F9] text-[10.5px]">
                  <span className="font-semibold text-[#0F172A]">0 Active tasks</span>
                  <span className="text-emerald-600 font-medium font-mono">All clear</span>
                </div>
              </div>

              {/* Liam Gallagher */}
              <div className="p-3.5 bg-white border border-[#E2E8F0] rounded-xl shadow-2xs flex flex-col justify-between gap-2.5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      LG
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0F172A]">Liam Gallagher</div>
                      <span className="text-[9.5px] px-1.5 py-0.2 bg-[#F1F5F9] rounded text-[#475569] font-medium">
                        Agency Member
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                </div>
                <div className="text-[10px] text-[#64748B] font-mono">liam@aetheris.design · Design</div>
                <div className="flex items-center justify-between pt-1.5 border-t border-[#F1F5F9] text-[10.5px]">
                  <span className="font-semibold text-[#0F172A]">6 Active tasks</span>
                  <span className="px-1.5 py-0.2 bg-red-50 text-red-600 border border-red-200 rounded font-semibold font-mono">
                    ▲ 6 overdue
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Team Copilot & Worth a Look) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {/* Team Copilot Widget */}
            <div className="bg-[#F5F3FF] border border-[#DDD6FE] rounded-xl p-4 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-[#4F46E5] font-bold text-xs">
                <Sparkles size={13} />
                <span>TEAM COPILOT</span>
              </div>
              <h4 className="text-xs font-bold text-[#1E1B4B]">A little help, a better handoff.</h4>
              <p className="text-[10.5px] text-[#475569] leading-relaxed">
                Use team context to plan onboarding, clarify responsibilities, and prepare handoffs.
              </p>

              <div className="flex flex-col gap-1.5 pt-1">
                <button type="button" className="w-full px-3 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-[10.5px] font-medium text-[#0F172A] flex items-center justify-between hover:border-[#6366F1] transition-colors shadow-2xs">
                  <span>Clarify team responsibilities</span>
                  <ArrowRight size={11} className="text-[#64748B]" />
                </button>
                <button type="button" className="w-full px-3 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-[10.5px] font-medium text-[#0F172A] flex items-center justify-between hover:border-[#6366F1] transition-colors shadow-2xs">
                  <span>Plan an onboarding checklist</span>
                  <ArrowRight size={11} className="text-[#64748B]" />
                </button>
                <button type="button" className="w-full px-3 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-[10.5px] font-medium text-[#0F172A] flex items-center justify-between hover:border-[#6366F1] transition-colors shadow-2xs">
                  <span>Prepare a handoff checklist</span>
                  <ArrowRight size={11} className="text-[#64748B]" />
                </button>
              </div>

              <span className="text-[9.5px] text-[#64748B] pt-0.5">
                Uses only information your role can access.
              </span>
            </div>

            {/* Worth a Look Widget */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-3.5 shadow-2xs flex flex-col gap-2">
              <div className="text-xs font-bold text-[#0F172A]">WORTH A LOOK</div>
              <p className="text-[10px] text-[#64748B]">A few small check-ins can make a big difference.</p>

              <div className="flex flex-col gap-1.5 pt-0.5 text-[11px]">
                <div className="flex items-center justify-between text-red-600 font-medium hover:underline cursor-pointer">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    5 people with overdue work
                  </span>
                  <ArrowRight size={11} />
                </div>
                <div className="flex items-center justify-between text-amber-600 font-medium hover:underline cursor-pointer">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    1 person with 10+ tasks
                  </span>
                  <ArrowRight size={11} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* INVITE MEMBER POPUP MODAL (Matches media_1793536882722_f22eab42.png)    */}
      {/* ---------------------------------------------------------------------- */}
      {isInviteOpen && (
        <div
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
          onClick={() => setIsInviteOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] w-full max-w-[460px] p-5 sm:p-6 relative flex flex-col gap-4 text-left animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button X */}
            <button
              type="button"
              onClick={() => setIsInviteOpen(false)}
              className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#0F172A] p-1 rounded-lg transition-colors"
            >
              <X size={16} />
            </button>

            {/* Modal Header */}
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#6366F1] flex items-center justify-center mb-2.5">
                <UserPlus size={18} />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#0F172A] tracking-tight">
                Bring someone into the team
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                They&apos;ll receive a secure email invitation to your agency workspace.
              </p>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-3.5 pt-0.5">
              {/* First name & Last name */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-medium text-[#334155] block mb-1">
                    First name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder=""
                      defaultValue=""
                      className="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-xl text-xs text-[#0F172A] shadow-2xs focus:outline-none focus:ring-1 focus:ring-[#6366F1]"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded bg-red-50 text-red-600 font-mono text-[9px] flex items-center justify-center font-bold">
                      ...
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-[#334155] block mb-1">
                    Last name
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    defaultValue=""
                    className="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-xl text-xs text-[#0F172A] shadow-2xs focus:outline-none focus:ring-1 focus:ring-[#6366F1]"
                  />
                </div>
              </div>

              {/* Work email */}
              <div>
                <label className="text-[11px] font-medium text-[#334155] block mb-1">
                  Work email
                </label>
                <input
                  type="email"
                  placeholder=""
                  defaultValue=""
                  className="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-xl text-xs text-[#0F172A] shadow-2xs focus:outline-none focus:ring-1 focus:ring-[#6366F1]"
                />
              </div>

              {/* Workspace role */}
              <div>
                <label className="text-[11px] font-medium text-[#334155] block mb-1">
                  Workspace role
                </label>
                <div className="w-full px-3.5 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-xs text-[#0F172A] shadow-2xs flex items-center justify-between cursor-pointer hover:border-[#6366F1] transition-colors">
                  <span>Choose a role</span>
                  <ChevronDown size={14} className="text-[#94A3B8]" />
                </div>
              </div>

              {/* Department */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-medium text-[#334155]">Department</label>
                  <span className="text-[11px] text-[#94A3B8]">Optional</span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  defaultValue=""
                  className="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-xl text-xs text-[#0F172A] shadow-2xs focus:outline-none focus:ring-1 focus:ring-[#6366F1]"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#F1F5F9]">
              <button
                type="button"
                onClick={() => setIsInviteOpen(false)}
                className="px-4 py-2 bg-white border border-[#CBD5E1] rounded-xl text-xs font-semibold text-[#334155] hover:bg-neutral-50 shadow-2xs transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setIsInviteOpen(false)}
                className="px-4 py-2 bg-[#A5B4FC] hover:bg-[#818CF8] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
              >
                Send invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* STEP 3: MISSION CONTROL DASHBOARD MOCKUP (Copied from Hero Section)        */
/* -------------------------------------------------------------------------- */
export function MissionControlMockup() {
  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] select-none text-left relative">
      {/* Top Header Bar matching Hero Section Dashboard */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-3 sm:px-5 py-2.5 bg-[#F8FAFC]/95 backdrop-blur-sm border-b border-[#E2E8F0] shrink-0 gap-2 overflow-hidden">
        {/* Left: View Title with Dashboard Icon */}
        <div className="flex items-center gap-2 min-w-0 shrink-0">
          <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
            <LayoutDashboard size={13} />
          </div>
          <h2 className="text-sm font-bold text-[#0F172A] tracking-tight">
            Dashboard
          </h2>
        </div>

        {/* Center Search Bar - safely hidden until xl so it never collides */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 bg-white border border-[#E2E8F0] rounded-lg text-[#64748B] text-xs max-w-[220px] shrink min-w-0 shadow-2xs">
          <Search size={12} className="text-[#94A3B8] shrink-0" />
          <span className="text-[11px] text-[#94A3B8] truncate">Search or jump to...</span>
          <kbd className="text-[9px] bg-slate-100 border border-slate-200 px-1 rounded text-[#64748B] font-mono shrink-0">
            ⌘K
          </kbd>
        </div>

        {/* Right Quick Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Get started progress capsule */}
          <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 bg-white border border-[#E2E8F0] rounded-full text-xs font-medium text-[#0F172A] shadow-2xs shrink-0">
            <div className="w-4 h-4 rounded-full border-2 border-emerald-500 flex items-center justify-center shrink-0">
              <Check size={9} className="text-emerald-600 stroke-[3]" />
            </div>
            <span className="text-[11.5px] font-semibold text-[#0F172A]">Get started</span>
            <span className="text-[10.5px] font-mono text-[#64748B]">11/17</span>
          </div>

          {/* AI Copilot Button */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] shadow-2xs shrink-0">
            <Sparkles size={12} className="text-[#2563EB]" />
            <span className="hidden sm:inline">AI Copilot</span>
            <kbd className="hidden xl:inline text-[9px] px-1 rounded font-mono bg-white text-[#2563EB] border border-blue-200">
              ⌘J
            </kbd>
          </div>

          {/* Settings */}
          <div className="w-7 h-7 rounded-lg border border-[#E2E8F0] text-slate-500 hidden sm:flex items-center justify-center hover:bg-slate-50 shrink-0">
            <Settings size={13} />
          </div>

          {/* Notification bell badge */}
          <div className="relative w-7 h-7 rounded-lg border border-[#E2E8F0] text-slate-500 flex items-center justify-center hover:bg-slate-50 shrink-0">
            <Bell size={13} />
            <span className="absolute -top-1 -right-1 px-1.5 py-0.2 text-[8.5px] font-bold font-mono bg-[#3B82F6] text-white rounded-full">
              4
            </span>
          </div>

          {/* User profile */}
          <div className="flex items-center gap-1.5 pl-1 shrink-0">
            <div className="w-7 h-7 rounded-full bg-[#2563EB] text-white font-bold text-[10px] flex items-center justify-center shadow-2xs overflow-hidden shrink-0">
              <svg viewBox="0 0 32 32" className="w-full h-full">
                <rect width="32" height="32" fill="#3B82F6" />
                <circle cx="16" cy="12" r="5.5" fill="#FDE68A" />
                <path d="M7 29 C7 22 11 19 16 19 C21 19 25 22 25 29 Z" fill="#1E3A8A" />
                <path d="M11 11 Q16 6 21 11 Q20 8 16 8 Q12 8 11 11" fill="#1E293B" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-[#0F172A] hidden xl:inline">Julian Vance</span>
            <ChevronDown size={11} className="text-[#94A3B8] shrink-0" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 p-3.5 sm:p-5 overflow-y-auto no-scrollbar flex flex-col gap-4">
        {/* ================================================================== */}
        {/* MISSION CONTROL: EXECUTIVE WORKSPACE COCKPIT (Copied from Hero)    */}
        {/* ================================================================== */}
        <div className="bg-[#0E1118] border border-[#232733] rounded-[22px] p-4 sm:p-5 text-white shadow-2xl relative overflow-hidden select-none">
          {/* Row 1: Header Breadcrumb & Status Pill */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Left: Executive Workspace Path */}
            <div className="flex items-center gap-2 text-[10.5px] font-mono tracking-wider">
              <Activity size={13} className="text-[#38BDF8] shrink-0" strokeWidth={2.5} />
              <span className="text-[#38BDF8] font-bold uppercase">EXECUTIVE WORKSPACE</span>
              <span className="text-[#64748B] font-semibold">/</span>
              <span className="text-[#94A3B8] font-medium uppercase">AETHERIS CREATIVE STUDIO</span>
            </div>

            {/* Right: Consolidated Alert Pill */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2B1419] border border-[#482028] text-[10px] font-mono shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
              <span className="text-[#F87171] font-bold">1 CRITICAL</span>
              <span className="text-[#64748B]">·</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
              <span className="text-[#FBBF24] font-bold">1 CAUTION</span>
              <span className="text-[#94A3B8] text-[9.5px] ml-1 font-normal">as of 12:49 AM</span>
              <span className="text-[#64748B]">·</span>
              <span className="text-[#94A3B8] text-[9.5px] font-normal">changed 12:48 AM</span>
            </div>
          </div>

          {/* Row 2: Secondary Controls (Live & Motion on) */}
          <div className="flex items-center gap-2 pt-3">
            {/* Live Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1F18] border border-[#143B2C] text-[10px] text-[#34D399] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span className="font-semibold">Live</span>
            </div>

            {/* Motion on Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121B2A] border border-[#1E2E44] text-[10px] text-slate-300 font-mono">
              <span className="flex items-end gap-[2px] h-2.5 mr-0.5">
                <span className="w-[2px] h-2.5 bg-slate-300 rounded-2xs" />
                <span className="w-[2px] h-1.5 bg-slate-400 rounded-2xs" />
                <span className="w-[2px] h-2 bg-slate-300 rounded-2xs" />
              </span>
              <span>Motion on</span>
            </div>
          </div>

          {/* Row 3: Cockpit Heading & Clocks */}
          <div className="pt-3 pb-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                Mission Control
              </h3>
              <p className="mt-1 text-[11px] text-[#94A3B8] max-w-xl leading-normal">
                <strong className="text-white font-semibold">Good Morning, Julian.</strong> Revenue, delivery and priorities at a glance.
              </p>
            </div>

            {/* Right Clocks & Window Progress */}
            <div className="flex items-center gap-4 sm:gap-6 font-mono text-slate-400 text-xs shrink-0 pt-1 lg:pt-0">
              {/* Local Clock */}
              <div className="flex flex-col">
                <span className="text-[8px] uppercase tracking-wider text-[#64748B]">LOCAL · GMT+6</span>
                <span className="text-[17px] sm:text-[20px] font-bold text-white tracking-wide mt-0.5">00:49:52</span>
              </div>

              {/* UTC Clock */}
              <div className="flex flex-col border-l border-[#282C35] pl-4 sm:pl-6">
                <span className="text-[8px] uppercase tracking-wider text-[#64748B]">UTC</span>
                <span className="text-[17px] sm:text-[20px] font-bold text-slate-200 tracking-wide mt-0.5">18:49:52</span>
              </div>

              {/* Window UTC Progress */}
              <div className="flex flex-col border-l border-[#282C35] pl-4 sm:pl-6">
                <div className="flex items-center justify-between gap-3 text-[8px] uppercase tracking-wider">
                  <span className="text-[#64748B]">WINDOW · UTC</span>
                  <span className="text-[#94A3B8] font-semibold">Day 8 of 31</span>
                </div>
                <div className="flex items-center justify-between gap-2 mt-0.5">
                  <span className="text-[12px] font-bold text-white">This Month</span>
                  <span className="text-[9.5px] text-[#64748B]">Oct 1 – 31, 2026</span>
                </div>
                {/* Segment progress bar: exactly 31 day segments */}
                <div className="flex gap-[2px] mt-1.5">
                  {[...Array(31)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-[4px] w-[3px] sm:w-[4px] rounded-[1px] ${
                        i < 7
                          ? "bg-[#34363C]"
                          : i === 7
                          ? "bg-[#818CF8]"
                          : "bg-[#1A1D24]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Row 4: Unified 5-Column Dashboard Table (12-Column Grid) */}
          <div className="rounded-xl border border-[#2B313A] overflow-hidden grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#282C32] text-xs">
            
            {/* Column 1: FINANCE (span 3) */}
            <div className="md:col-span-3 bg-[#311B21] flex flex-col justify-between relative">
              {/* Top colored stripe */}
              <div className="h-[2px] w-full bg-[#EF4444]" />
              <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                <div>
                  {/* Dot + Title */}
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-200 font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
                    FINANCE
                  </div>
                  {/* Stacked status text */}
                  <div className="text-[9px] font-mono font-bold text-[#F87171] uppercase tracking-wider mt-0.5">
                    CRITICAL
                  </div>

                  {/* Dual Stats */}
                  <div className="flex items-baseline justify-between mt-3 gap-1">
                    <div>
                      <div className="text-[20px] sm:text-[24px] font-black text-white leading-none font-sans">$40,900</div>
                      <div className="text-[9px] text-[#34D399] font-semibold font-mono mt-1">↑ 529%</div>
                      <div className="text-[9px] text-[#94A3B8] mt-0.5">Revenue this period</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[18px] sm:text-[22px] font-black text-white leading-none font-sans">$4,800</div>
                      <div className="text-[9px] text-[#94A3B8] mt-2">Overdue</div>
                    </div>
                  </div>

                  {/* Sparkline */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[8.5px] text-[#94A3B8] font-mono mb-1">
                      <span>Revenue trend</span>
                      <span>6 months</span>
                    </div>
                    <div className="relative h-6 w-full">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 100 24" preserveAspectRatio="none">
                        {/* Dark horizontal baseline */}
                        <line x1="0" y1="23" x2="100" y2="23" stroke="#2B313A" strokeWidth="1" />
                        {/* Smooth historical trend curve */}
                        <path
                          d="M 0,19 C 10,18.5 16,14 26,13 C 38,12.5 50,12.8 62,12 C 74,11.5 86,7 96,5"
                          fill="none"
                          stroke="#64748B"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                      {/* Perfectly circular dot at (96%, 5px) */}
                      <div
                        className="absolute -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full bg-[#38BDF8] shadow-[0_0_8px_rgba(56,189,248,0.9)] ring-1 ring-[#38BDF8]/40 pointer-events-none"
                        style={{ left: "96%", top: "calc(5 / 24 * 100%)" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Alert Cell */}
              <div className="border-t border-[#282C32] px-3.5 py-2.5 text-[9.5px] font-medium text-[#F87171] flex items-center gap-1.5">
                <AlertTriangle size={11} className="shrink-0 text-[#F87171]" />
                <span className="truncate">1 Overdue Invoice</span>
              </div>
            </div>

            {/* Column 2: DELIVERY (span 3) */}
            <div className="md:col-span-3 bg-[#311B21] flex flex-col justify-between relative">
              {/* Top colored stripe */}
              <div className="h-[2px] w-full bg-[#EF4444]" />
              <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                <div>
                  {/* Dot + Title */}
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-200 font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
                    DELIVERY
                  </div>
                  {/* Stacked status text */}
                  <div className="text-[9px] font-mono font-bold text-[#F87171] uppercase tracking-wider mt-0.5">
                    CRITICAL
                  </div>

                  {/* Dual Stats */}
                  <div className="flex items-baseline justify-between mt-3 gap-1">
                    <div>
                      <div className="text-[20px] sm:text-[24px] font-black text-white leading-none font-sans">3</div>
                      <div className="text-[9px] text-[#94A3B8] mt-1.5">Active projects</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[20px] sm:text-[24px] font-black text-white leading-none font-sans">10</div>
                      <div className="text-[9px] text-[#94A3B8] mt-1.5">Tasks due this week</div>
                    </div>
                  </div>

                  {/* Completed 14 days histogram */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[8.5px] text-[#94A3B8] font-mono mb-1">
                      <span>Completed</span>
                      <span>14 days</span>
                    </div>
                    <div className="flex items-end h-6 gap-[3px]">
                      {[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0].map((val, idx) => (
                        <div
                          key={idx}
                          className={`flex-1 ${
                            val > 0
                              ? "bg-[#64748B] rounded-[3px] h-[18px]"
                              : "bg-[#2E333B] rounded-[1px] h-[2px]"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Alert Cell */}
              <div className="border-t border-[#282C32] px-3.5 py-2.5 text-[9.5px] font-medium text-[#F87171] flex items-center gap-1.5">
                <AlertTriangle size={11} className="shrink-0 text-[#F87171]" />
                <span className="truncate">1 Critical Project</span>
              </div>
            </div>

            {/* Column 3: CLIENTS (span 2) */}
            <div className="md:col-span-2 bg-[#181A1F] flex flex-col justify-between">
              <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                <div>
                  {/* Dot + Title */}
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-200 font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                    CLIENTS
                  </div>
                  {/* Stacked status text */}
                  <div className="text-[9px] font-mono font-bold text-[#34D399] uppercase tracking-wider mt-0.5">
                    NOMINAL
                  </div>

                  {/* Single Stat */}
                  <div className="mt-3">
                    <div className="text-[20px] sm:text-[24px] font-black text-white leading-none font-sans">4</div>
                    <div className="text-[9px] text-[#94A3B8] mt-1.5">Active organizations</div>
                  </div>

                  {/* CRM stages bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-[8.5px] text-[#94A3B8] font-mono mb-1.5">
                      <span>CRM stages</span>
                      <span className="text-slate-300">Lead → Active</span>
                    </div>
                    <div className="w-full bg-[#3B82F6] h-[3px] rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                  </div>
                </div>
              </div>

              {/* Bottom Status Cell */}
              <div className="border-t border-[#282C32] px-3.5 py-2.5 text-[9.5px] text-[#94A3B8] truncate">
                No open proposals
              </div>
            </div>

            {/* Column 4: SUPPORT (span 2) */}
            <div className="md:col-span-2 bg-[#181A1F] flex flex-col justify-between">
              <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                <div>
                  {/* Dot + Title */}
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-200 font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                    SUPPORT
                  </div>
                  {/* Stacked status text */}
                  <div className="text-[9px] font-mono font-bold text-[#34D399] uppercase tracking-wider mt-0.5">
                    NOMINAL
                  </div>

                  {/* Single Stat */}
                  <div className="mt-3">
                    <div className="text-[20px] sm:text-[24px] font-black text-white leading-none font-sans">2</div>
                    <div className="text-[9px] text-[#94A3B8] mt-1.5">Open tickets</div>
                  </div>

                  {/* Opened & Resolved 14 days */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-[8.5px] text-[#94A3B8] font-mono mb-1">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-[#475569] rounded-2xs inline-block" /> Opened
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-[#94A3B8] rounded-2xs inline-block" /> Resolved
                      </span>
                    </div>
                    <div className="text-[8px] text-[#64748B] font-mono mb-1">14 days</div>
                    <div className="flex items-end h-3 gap-2">
                      <div className="w-2 bg-[#475569] h-2.5 rounded-2xs" />
                      <div className="w-2 bg-[#94A3B8] h-2.5 rounded-2xs" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Status Cell */}
              <div className="border-t border-[#282C32] px-3.5 py-2.5 text-[9.5px] text-[#94A3B8] truncate">
                No SLA breaches today
              </div>
            </div>

            {/* Column 5: AUTOMATION (span 2) */}
            <div className="md:col-span-2 bg-[#181A1F] flex flex-col justify-between">
              <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                <div>
                  {/* Dot + Title */}
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-200 font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                    AUTOMATION
                  </div>
                  {/* Stacked status text */}
                  <div className="text-[9px] font-mono font-bold text-[#34D399] uppercase tracking-wider mt-0.5">
                    NOMINAL
                  </div>

                  {/* Single Stat */}
                  <div className="mt-3">
                    <div className="text-[20px] sm:text-[24px] font-black text-white leading-none font-sans">0</div>
                    <div className="text-[9px] text-[#94A3B8] mt-1.5">Failing automations</div>
                  </div>

                  {/* Spacer to match height */}
                  <div className="mt-4 pt-5" />
                </div>
              </div>

              {/* Bottom Status Cell */}
              <div className="border-t border-[#282C32] px-3.5 py-2.5 text-[9.5px] text-[#94A3B8] truncate font-mono">
                Latest runs · last 7 days
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
