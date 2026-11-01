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
    <div className="h-14 bg-white border-b border-[#E2E8F0] px-3 sm:px-5 flex items-center justify-between gap-2 shrink-0 select-none">
      {/* Left: module icon button + vertical separator + search */}
      <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
        <div className="w-9 h-9 rounded-xl border border-[#CBD5E1] bg-white flex items-center justify-center text-[#6366F1] shadow-2xs shrink-0">
          <LayoutGrid size={16} />
        </div>
        <div className="h-5 w-px bg-[#E2E8F0] mx-1 shrink-0 hidden sm:block" />

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-xs text-[#94A3B8] w-48 md:w-64 lg:w-80 shadow-2xs">
          <Search size={14} className="text-[#94A3B8] shrink-0" />
          <span className="truncate text-[12px]">Search or jump to...</span>
          <kbd className="ml-auto text-[10px] font-mono bg-white border border-[#CBD5E1] rounded px-1.5 py-0.5 text-[#64748B] shadow-2xs">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: 11/17 ring, Copilot, Settings, Notification, Profile */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* Progress ring 11/17 */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white border border-[#CBD5E1] rounded-full text-xs font-medium text-[#0F172A] shadow-2xs">
          <svg className="w-3.5 h-3.5 -rotate-90" viewBox="0 0 36 36">
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
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EEF2FF] border border-[#C7D2FE] text-[#4F46E5] hover:bg-[#E0E7FF] transition-colors rounded-xl text-xs font-semibold shadow-2xs"
        >
          <Sparkles size={13} className="shrink-0 text-[#6366F1]" />
          <span>AI Copilot</span>
          <kbd className="hidden lg:inline text-[9.5px] font-mono px-1.5 py-0.2 bg-white/90 rounded border border-[#C7D2FE] text-[#4F46E5]">
            ⌘J
          </kbd>
        </button>

        {/* Gear icon */}
        <div className="w-9 h-9 rounded-xl border border-[#CBD5E1] bg-white text-[#64748B] hover:text-[#0F172A] hidden sm:flex items-center justify-center shadow-2xs cursor-pointer">
          <Settings size={15} />
        </div>

        {/* Notification bell badge */}
        <div className="relative w-9 h-9 rounded-xl border border-[#CBD5E1] bg-white text-[#64748B] hover:text-[#0F172A] flex items-center justify-center shadow-2xs cursor-pointer">
          <Bell size={15} />
          <span className="absolute -top-1 -right-1 px-1.5 py-0.2 text-[8.5px] font-bold font-mono bg-[#3B82F6] text-white rounded-full shadow-2xs">
            49
          </span>
        </div>

        {/* User avatar & name */}
        <div className="flex items-center gap-2 pl-1 cursor-pointer">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-[#2563EB] border border-white shadow-2xs ring-1 ring-black/5 shrink-0 relative flex items-center justify-center text-white">
            <svg viewBox="0 0 32 32" className="w-full h-full">
              <rect width="32" height="32" fill="#3B82F6" />
              <circle cx="16" cy="12" r="5.5" fill="#FDE68A" />
              <path d="M7 29 C7 22 11 19 16 19 C21 19 25 22 25 29 Z" fill="#1E3A8A" />
              <path d="M11 11 Q16 6 21 11 Q20 8 16 8 Q12 8 11 11" fill="#1E293B" />
            </svg>
          </div>
          <span className="text-xs font-bold text-[#0F172A] hidden sm:inline">Julian Vance</span>
          <ChevronDown size={13} className="text-[#94A3B8]" />
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
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-4">
          
          {/* Card 1: Colors (Matches media_1793536619030_81de624b.png exactly) */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight">Colors</h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Primary and secondary colors are used across UI. Semantic colors override system defaults for status indicators.
              </p>
            </div>

            <div className="border-b border-[#F1F5F9] my-4" />

            {/* Primary & Secondary Color Inputs Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 relative">
              {/* Primary Color */}
              <div className="relative">
                <label className="text-xs font-medium text-[#334155] block mb-2">
                  Primary Color
                </label>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className="w-12 h-10 rounded-xl bg-[#6366f1] shadow-2xs cursor-pointer shrink-0 transition-transform hover:scale-105 active:scale-95 relative"
                    style={{ backgroundColor: primaryColor }}
                    title="Click to open color picker"
                  />
                  <div
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className="flex-1 px-4 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-xs sm:text-sm font-mono text-[#0F172A] cursor-pointer hover:border-[#6366F1] shadow-2xs transition-colors flex items-center justify-between"
                  >
                    <span>{primaryColor}</span>
                    <span className="text-[10px] font-sans text-[#6366F1] font-semibold hidden sm:inline">
                      {showColorPicker ? "Close picker" : "Edit color"}
                    </span>
                  </div>
                </div>

                {/* Color Picker Popover (Matches media_1793536828272_2628878c.png) */}
                {showColorPicker && (
                  <div className="absolute top-full left-0 mt-2 w-64 sm:w-72 bg-white border border-[#CBD5E1] rounded-2xl shadow-2xl p-3.5 z-40 flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-150">
                    {/* 2D Gradient Area */}
                    <div
                      className="h-36 rounded-xl relative overflow-hidden cursor-crosshair shadow-inner"
                      style={{
                        background:
                          "linear-gradient(to bottom, transparent, #000000), linear-gradient(to right, #ffffff, #1d00ff)",
                      }}
                      onClick={(e) => {
                        // Quick interactive click on gradient box
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        if (x > rect.width * 0.7) setPrimaryColor("#4338ca");
                        else if (x > rect.width * 0.4) setPrimaryColor("#6366f1");
                        else setPrimaryColor("#818cf8");
                      }}
                    >
                      {/* Selection Knob */}
                      <div
                        className="w-4 h-4 rounded-full border-2 border-white shadow-md ring-2 ring-black/40 absolute pointer-events-none"
                        style={{ top: "12%", left: "55%", transform: "translate(-50%, -50%)" }}
                      />
                    </div>

                    {/* Controls Row: Pipette, Swatch, Rainbow Hue Slider */}
                    <div className="flex items-center gap-2.5 pt-0.5">
                      {/* Pipette */}
                      <button
                        type="button"
                        className="w-7 h-7 flex items-center justify-center text-[#0F172A] hover:bg-neutral-100 rounded-lg shrink-0"
                      >
                        <Pipette size={14} />
                      </button>

                      {/* Color Circle Swatch */}
                      <div
                        className="w-7 h-7 rounded-full shadow-inner border border-black/10 shrink-0"
                        style={{ backgroundColor: primaryColor }}
                      />

                      {/* Rainbow Hue Slider */}
                      <div className="flex-1 h-3 rounded-full relative flex items-center overflow-visible bg-gradient-to-r from-[#ff00ff] via-[#0000ff] via-[#00ffff] via-[#00ff00] via-[#ffff00] to-[#ff0000]">
                        <div
                          className="w-4 h-4 rounded-full border-2 border-white shadow-md absolute"
                          style={{ left: "45%", backgroundColor: "#1e40af", transform: "translateX(-50%)" }}
                        />
                      </div>
                    </div>

                    {/* RGB Input Row */}
                    <div className="flex items-center gap-2 pt-0.5 text-center">
                      <div className="flex-1 flex flex-col items-center">
                        <input
                          type="text"
                          readOnly
                          value="99"
                          className="w-full text-center px-1 py-1 bg-white border border-[#CBD5E1] rounded-lg text-xs font-mono font-medium text-[#0F172A]"
                        />
                        <span className="text-[10px] text-[#64748B] font-mono mt-0.5">R</span>
                      </div>
                      <div className="flex-1 flex flex-col items-center">
                        <input
                          type="text"
                          readOnly
                          value="102"
                          className="w-full text-center px-1 py-1 bg-white border border-[#CBD5E1] rounded-lg text-xs font-mono font-medium text-[#0F172A]"
                        />
                        <span className="text-[10px] text-[#64748B] font-mono mt-0.5">G</span>
                      </div>
                      <div className="flex-1 flex flex-col items-center">
                        <input
                          type="text"
                          readOnly
                          value="241"
                          className="w-full text-center px-1 py-1 bg-white border border-[#CBD5E1] rounded-lg text-xs font-mono font-medium text-[#0F172A]"
                        />
                        <span className="text-[10px] text-[#64748B] font-mono mt-0.5">B</span>
                      </div>
                      <button
                        type="button"
                        className="p-1 text-[#64748B] hover:text-[#0F172A] shrink-0"
                      >
                        <ChevronsUpDown size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Secondary Color */}
              <div>
                <label className="text-xs font-medium text-[#334155] block mb-2">
                  Secondary Color
                </label>
                <div className="flex items-center gap-2.5">
                  <div className="w-12 h-10 rounded-xl bg-[#06b6d4] shadow-2xs shrink-0" />
                  <div className="flex-1 px-4 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-xs sm:text-sm font-mono text-[#0F172A] shadow-2xs">
                    #06b6d4
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-[#F1F5F9] my-4" />

            {/* Semantic Status Colors (Success, Warning, Danger) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-[#334155] block mb-2">
                  Success Color
                </label>
                <div className="flex items-center gap-2.5">
                  <div className="w-12 h-10 rounded-xl bg-[#E2E8F0]/70 border border-[#CBD5E1]/60 shadow-2xs shrink-0" />
                  <div className="flex-1 px-3.5 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-xs sm:text-sm font-mono text-[#475569] shadow-2xs">
                    #6366f1
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#334155] block mb-2">
                  Warning Color
                </label>
                <div className="flex items-center gap-2.5">
                  <div className="w-12 h-10 rounded-xl bg-[#E2E8F0]/70 border border-[#CBD5E1]/60 shadow-2xs shrink-0" />
                  <div className="flex-1 px-3.5 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-xs sm:text-sm font-mono text-[#475569] shadow-2xs">
                    #6366f1
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#334155] block mb-2">
                  Danger Color
                </label>
                <div className="flex items-center gap-2.5">
                  <div className="w-12 h-10 rounded-xl bg-[#E2E8F0]/70 border border-[#CBD5E1]/60 shadow-2xs shrink-0" />
                  <div className="flex-1 px-3.5 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-xs sm:text-sm font-mono text-[#475569] shadow-2xs">
                    #6366f1
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Typography & Shape (Matches media_1793536619030_81de624b.png exactly) */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col">
            <h3 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight">Typography &amp; Shape</h3>

            <div className="border-b border-[#F1F5F9] my-4" />

            {/* Font Family Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs sm:text-sm font-medium text-[#0F172A]">
                Font Family
              </span>
              <div className="px-4 py-2 bg-white border border-[#CBD5E1] rounded-xl text-xs sm:text-sm text-[#0F172A] flex items-center justify-between w-full sm:w-72 shadow-2xs cursor-pointer hover:border-[#6366F1] transition-colors">
                <span>System Default</span>
                <ChevronDown size={14} className="text-[#94A3B8]" />
              </div>
            </div>

            <div className="border-b border-[#F1F5F9] my-4" />

            {/* Border Radius Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs sm:text-sm font-medium text-[#0F172A]">
                Border Radius
              </span>
              <div className="flex items-center bg-[#E2E8F0]/60 p-1 rounded-xl gap-1 text-xs sm:text-sm">
                <button
                  type="button"
                  onClick={() => setBorderRadius("sharp")}
                  className={`px-4 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    borderRadius === "sharp"
                      ? "bg-white text-[#0F172A] shadow-xs font-semibold border border-slate-200/50"
                      : "text-[#475569] hover:text-[#0F172A]"
                  }`}
                >
                  <span className="w-2.5 h-2.5 border-l-2 border-t-2 border-current" />
                  <span>Sharp</span>
                </button>
                <button
                  type="button"
                  onClick={() => setBorderRadius("medium")}
                  className={`px-4 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    borderRadius === "medium"
                      ? "bg-white text-[#0F172A] shadow-xs font-semibold border border-slate-200/50"
                      : "text-[#475569] hover:text-[#0F172A]"
                  }`}
                >
                  <span className="w-2.5 h-2.5 border-l-2 border-t-2 border-current rounded-tl-sm" />
                  <span>Medium</span>
                </button>
                <button
                  type="button"
                  onClick={() => setBorderRadius("rounded")}
                  className={`px-4 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    borderRadius === "rounded"
                      ? "bg-white text-[#0F172A] shadow-xs font-semibold border border-slate-200/50"
                      : "text-[#475569] hover:text-[#0F172A]"
                  }`}
                >
                  <span className="w-2.5 h-2.5 border-l-2 border-t-2 border-current rounded-full" />
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
/* STEP 3: MISSION CONTROL / DELIVERY TELEMETRY MOCKUP (Exact Match)          */
/* -------------------------------------------------------------------------- */
export function MissionControlMockup() {
  const [activeTab, setActiveTab] = useState<"overview" | "delivery" | "activity">("delivery");
  const [scheduleToggle, setScheduleToggle] = useState<"schedule" | "risk">("schedule");

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] select-none text-left relative">
      <AppTopBar activeModule="dashboard" />

      {/* Main Page Scrollable Body */}
      <div className="flex-1 p-4 sm:p-5 lg:p-6 overflow-y-auto no-scrollbar flex flex-col gap-5 relative bg-[#F8FAFC]">
        {/* ================================================================== */}
        {/* DARK HERO DECK: Executive Workspace / Aetheris Creative Studio      */}
        {/* ================================================================== */}
        <div className="bg-[#090D16] border border-[#1E293B] rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col gap-4 text-white relative overflow-hidden">
          {/* Deck Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-[#1E293B]/80 pb-3">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold tracking-wider">
              <Activity size={14} className="text-[#818CF8]" />
              <span className="text-[#818CF8]">EXECUTIVE WORKSPACE</span>
              <span className="text-[#475569]">/</span>
              <span className="text-[#E2E8F0]">AETHERIS CREATIVE STUDIO</span>
            </div>

            <div className="flex items-center gap-2 shrink-0 flex-wrap">
              <span className="px-3 py-1 bg-[#2D0609] border border-[#7F1D1D]/70 rounded-full font-mono text-[9.5px] font-bold text-[#F87171] flex items-center gap-1.5 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-pulse" />
                <span>2 CRITICAL</span>
                <span className="text-[#991B1B] font-normal">as of 5:15 PM</span>
              </span>

              <span className="px-3 py-1 bg-[#052E16] border border-[#166534]/70 rounded-full font-mono text-[9.5px] font-bold text-white flex items-center gap-1.5 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                <span>Live</span>
              </span>

              <span className="px-2.5 py-1 bg-[#1E293B]/70 border border-[#334155]/60 rounded-lg font-mono text-[9.5px] text-[#94A3B8] flex items-center gap-1.5">
                <span className="flex items-center gap-0.5">
                  <span className="w-0.5 h-2.5 bg-[#94A3B8] rounded-full" />
                  <span className="w-0.5 h-2.5 bg-[#94A3B8] rounded-full" />
                </span>
                <span>Motion on</span>
              </span>
            </div>
          </div>

          {/* Headline + Clocks Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Mission Control</h3>
              <p className="text-xs sm:text-[13px] text-[#94A3B8] mt-0.5">
                <strong className="text-white font-semibold">Good Evening, Julian.</strong> Revenue, delivery and priorities at a glance.
              </p>
            </div>

            {/* Clocks & Window */}
            <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono shrink-0 flex-wrap">
              <div className="bg-[#111827] px-3 py-2 rounded-xl border border-[#1E293B]">
                <span className="text-[9px] text-[#64748B] block uppercase tracking-wider font-semibold">Local · GMT+6</span>
                <span className="font-bold text-white text-base sm:text-lg tracking-wider">17:16:36</span>
              </div>

              <div className="bg-[#111827] px-3 py-2 rounded-xl border border-[#1E293B]">
                <span className="text-[9px] text-[#64748B] block uppercase tracking-wider font-semibold">UTC</span>
                <span className="font-bold text-white text-base sm:text-lg tracking-wider">11:16:36</span>
              </div>

              <div className="bg-[#111827] px-3.5 py-2 rounded-xl border border-[#1E293B] flex flex-col justify-between min-w-[170px]">
                <div className="flex items-center justify-between text-[9px] text-[#64748B] uppercase font-semibold">
                  <span>Window · UTC</span>
                  <span className="normal-case">Day 1 of 30</span>
                </div>
                <div className="flex items-center justify-between my-0.5">
                  <span className="font-bold text-white text-xs sm:text-sm">This Month</span>
                  <span className="text-[10px] text-[#94A3B8] font-mono">Nov 1 – 30, 2026</span>
                </div>
                {/* 30 discrete mini bars */}
                <div className="flex items-center gap-0.5 pt-0.5">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 flex-1 rounded-xs ${
                        i < 2 ? "bg-[#6366F1]" : "bg-[#1E293B]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 5 Telemetry Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-1">
            {/* Card 1: Finance (Critical) */}
            <div className="p-3.5 bg-[#190C10] border border-red-900/40 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
                    <span className="text-[10px] font-mono font-bold text-neutral-300 uppercase tracking-wider">Finance</span>
                  </div>
                  <span className="text-[9px] font-mono text-[#EF4444] font-bold tracking-wider">CRITICAL</span>
                </div>
                <div className="grid grid-cols-2 gap-2 my-2.5">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-white">$0</div>
                    <div className="text-[9.5px] text-[#94A3B8] leading-tight">Revenue this period</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-white">$21,800</div>
                    <div className="text-[9.5px] text-[#94A3B8] leading-tight">Overdue</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div>
                  <div className="flex items-center justify-between text-[9px] text-[#64748B]">
                    <span>Revenue trend</span>
                    <span>6 months</span>
                  </div>
                  <svg className="w-full h-4 mt-1" viewBox="0 0 120 16" fill="none">
                    <path d="M 0 8 L 65 8 L 95 13 L 115 11" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="115" cy="11" r="2.5" fill="#38BDF8" />
                  </svg>
                </div>

                <div className="bg-[#2D0B10] border border-[#7F1D1D]/70 text-[#F87171] px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 text-[10px] font-medium shadow-2xs">
                  <AlertTriangle size={11} className="shrink-0" />
                  <span className="truncate">3 Overdue Invoices</span>
                </div>
              </div>
            </div>

            {/* Card 2: Delivery (Critical) */}
            <div className="p-3.5 bg-[#190C10] border border-red-900/40 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
                    <span className="text-[10px] font-mono font-bold text-neutral-300 uppercase tracking-wider">Delivery</span>
                  </div>
                  <span className="text-[9px] font-mono text-[#EF4444] font-bold tracking-wider">CRITICAL</span>
                </div>
                <div className="grid grid-cols-2 gap-2 my-2.5">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-white">3</div>
                    <div className="text-[9.5px] text-[#94A3B8] leading-tight">Active projects</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-white">1</div>
                    <div className="text-[9.5px] text-[#94A3B8] leading-tight">Tasks due this week</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div>
                  <div className="flex items-center justify-between text-[9px] text-[#64748B]">
                    <span>Completed</span>
                    <span>14 days</span>
                  </div>
                  <div className="flex items-center gap-1 my-1.5">
                    <div className="h-0.5 w-full border-t border-dashed border-[#334155]" />
                  </div>
                </div>

                <div className="bg-[#2D0B10] border border-[#7F1D1D]/70 text-[#F87171] px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 text-[10px] font-medium shadow-2xs">
                  <AlertTriangle size={11} className="shrink-0" />
                  <span className="truncate">3 Critical Projects</span>
                </div>
              </div>
            </div>

            {/* Card 3: Clients (Nominal) */}
            <div className="p-3.5 bg-[#0C121E] border border-[#1E293B]/60 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                    <span className="text-[10px] font-mono font-bold text-neutral-300 uppercase tracking-wider">Clients</span>
                  </div>
                  <span className="text-[9px] font-mono text-[#10B981] font-bold tracking-wider">NOMINAL</span>
                </div>
                <div className="my-2.5">
                  <div className="text-xl sm:text-2xl font-bold text-white">4</div>
                  <div className="text-[9.5px] text-[#94A3B8] leading-tight">Active organizations</div>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <div>
                  <div className="flex items-center justify-between text-[9px] text-[#64748B]">
                    <span>CRM stages</span>
                    <span>Lead → Active</span>
                  </div>
                  <div className="h-1 bg-[#1E293B] rounded-full overflow-hidden my-1">
                    <div className="h-full bg-[#38BDF8] rounded-full w-3/5" />
                  </div>
                </div>
                <div className="text-[10.5px] text-[#94A3B8] pt-1 border-t border-[#1E293B]/60">
                  2 open proposals
                </div>
              </div>
            </div>

            {/* Card 4: Support (Nominal) */}
            <div className="p-3.5 bg-[#0C121E] border border-[#1E293B]/60 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                    <span className="text-[10px] font-mono font-bold text-neutral-300 uppercase tracking-wider">Support</span>
                  </div>
                  <span className="text-[9px] font-mono text-[#10B981] font-bold tracking-wider">NOMINAL</span>
                </div>
                <div className="my-2.5">
                  <div className="text-xl sm:text-2xl font-bold text-white">2</div>
                  <div className="text-[9.5px] text-[#94A3B8] leading-tight">Open tickets</div>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center justify-between text-[9px] text-[#64748B]">
                  <span className="flex items-center gap-1">
                    <span>Opened</span>
                    <span>Resolved</span>
                  </span>
                  <span>14 days</span>
                </div>
                <div className="text-[10.5px] text-[#94A3B8] pt-1 border-t border-[#1E293B]/60">
                  No SLA breaches today
                </div>
              </div>
            </div>

            {/* Card 5: Automation (Nominal) */}
            <div className="p-3.5 bg-[#0C121E] border border-[#1E293B]/60 rounded-2xl flex flex-col justify-between col-span-2 md:col-span-1">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                    <span className="text-[10px] font-mono font-bold text-neutral-300 uppercase tracking-wider">Automation</span>
                  </div>
                  <span className="text-[9px] font-mono text-[#10B981] font-bold tracking-wider">NOMINAL</span>
                </div>
                <div className="my-2.5">
                  <div className="text-xl sm:text-2xl font-bold text-white">0</div>
                  <div className="text-[9.5px] text-[#94A3B8] leading-tight">Failing automations</div>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <div className="h-3" />
                <div className="text-[10.5px] text-[#94A3B8] pt-1 border-t border-[#1E293B]/60">
                  Latest runs · last 7 days
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* TABS & TIME WINDOW FILTER BAR (Matching Screenshot)                */}
        {/* ================================================================== */}
        <div className="flex items-center justify-between pt-1">
          <div className="bg-[#E2E8F0]/70 p-1 rounded-xl flex items-center gap-1 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors ${
                activeTab === "overview"
                  ? "bg-white text-[#0F172A] shadow-xs"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("delivery")}
              className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors ${
                activeTab === "delivery"
                  ? "bg-white text-[#0F172A] shadow-xs"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              Delivery
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("activity")}
              className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors ${
                activeTab === "activity"
                  ? "bg-white text-[#0F172A] shadow-xs"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              Activity
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3.5 py-1.5 bg-white border border-[#CBD5E1] rounded-xl text-xs font-medium text-[#0F172A] flex items-center gap-2 shadow-2xs cursor-pointer hover:border-[#6366F1] transition-colors">
              <span>This Month</span>
              <ChevronDown size={13} className="text-[#94A3B8]" />
            </div>
            <button
              type="button"
              className="w-8 h-8 rounded-xl bg-white border border-[#CBD5E1] flex items-center justify-center text-[#64748B] hover:text-[#0F172A] shadow-2xs transition-colors"
            >
              <RotateCw size={13} />
            </button>
          </div>
        </div>

        {/* ================================================================== */}
        {/* SUBHEADER: Delivery telemetry                                      */}
        {/* ================================================================== */}
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 bg-[#0F172A] text-white rounded-md font-mono text-[10px] font-bold">
            DLV
          </span>
          <span className="text-sm sm:text-base font-bold text-[#0F172A]">Delivery telemetry</span>
          <span className="text-xs text-[#64748B]">Schedule, status and follow-up</span>
        </div>

        {/* ================================================================== */}
        {/* FLIGHT PLAN CARD (Exact Match to Screenshot)                       */}
        {/* ================================================================== */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col gap-4 text-left">
          {/* Card Top Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="px-1.5 py-0.5 bg-white border border-[#CBD5E1] rounded text-[9.5px] font-mono text-[#64748B] font-semibold">
                DLV 1
              </span>
              <div>
                <div className="text-sm sm:text-base font-bold text-[#0F172A]">Flight plan</div>
                <div className="text-xs text-[#64748B]">
                  Active projects by schedule • bar fill = completed tasks
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-[#F1F5F9] p-0.5 rounded-lg flex items-center text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setScheduleToggle("schedule")}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    scheduleToggle === "schedule"
                      ? "bg-white text-[#0F172A] font-semibold shadow-2xs border border-slate-200/50"
                      : "text-[#64748B] hover:text-[#0F172A]"
                  }`}
                >
                  Schedule
                </button>
                <button
                  type="button"
                  onClick={() => setScheduleToggle("risk")}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    scheduleToggle === "risk"
                      ? "bg-white text-[#0F172A] font-semibold shadow-2xs border border-slate-200/50"
                      : "text-[#64748B] hover:text-[#0F172A]"
                  }`}
                >
                  Risk
                </button>
              </div>

              <button
                type="button"
                className="text-xs font-semibold text-[#0F172A] flex items-center gap-1 hover:text-[#4F46E5] transition-colors"
              >
                <span>All projects</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* Status Metrics Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-2 border-y border-[#F1F5F9] text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                <span className="text-[#64748B]">On track</span>
                <strong className="text-[#0F172A]">0</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                <span className="text-[#64748B]">At risk</span>
                <strong className="text-[#0F172A]">0</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                <span className="text-[#64748B]">Off track</span>
                <strong className="text-[#0F172A]">3</strong>
              </span>
            </div>

            <div className="flex-1 max-w-xl mx-2 sm:mx-4">
              <div className="h-2 bg-[#EF4444] rounded-full w-full shadow-2xs" />
            </div>

            <div className="text-xs text-[#64748B] font-medium shrink-0">
              3 in progress
            </div>
          </div>

          {/* Gantt Calendar Table */}
          <div className="overflow-x-auto no-scrollbar relative pt-2">
            <div className="min-w-[620px] flex flex-col gap-3 relative">
              {/* Table Column Headers */}
              <div className="flex items-center text-[10px] font-mono text-[#64748B] uppercase font-semibold pb-2 border-b border-[#F1F5F9] relative">
                <div className="w-[38%] shrink-0"></div>
                <div className="w-[52%] grid grid-cols-8 text-center relative shrink-0">
                  <span>JUN</span>
                  <span>JUL</span>
                  <span>AUG</span>
                  <span>SEP</span>
                  <span>OCT</span>
                  {/* Today • Nov 1 marker tag positioned right between OCT and NOV */}
                  <div className="absolute left-[62.5%] -top-3.5 -translate-x-1/2 z-20">
                    <span className="px-2 py-0.5 bg-[#0F172A] text-white rounded-full font-mono text-[9px] font-bold shadow-xs whitespace-nowrap">
                      Today · Nov 1
                    </span>
                  </div>
                  <span>NOV</span>
                  <span>DEC</span>
                  <span>JAN</span>
                </div>
                <div className="w-[10%] text-right font-mono text-[10px] text-[#64748B] uppercase shrink-0">
                  Done · due
                </div>
              </div>

              {/* Vertical line through calendar at Today (62.5% of timeline section) */}
              <div className="absolute top-6 bottom-0 left-[calc(38%+52%*0.625)] w-[1.5px] bg-[#0F172A] z-10 pointer-events-none" />

              {/* Row 1: Kroma Mobile SDK & Merchant Suite */}
              <div className="flex items-center py-1.5 relative">
                {/* Left project details */}
                <div className="w-[38%] pr-3 shrink-0">
                  <div className="flex items-start gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#EF4444] shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-[#0F172A] text-xs sm:text-[13px] leading-snug">
                        Kroma Mobile SDK &amp; Mercha...
                      </div>
                      <div className="text-xs text-[#64748B] mt-0.5">
                        <span>Kroma Fintech • </span>
                        <span className="text-[#B45309] font-bold">6 late</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline bar (JUN to NOV 1) */}
                <div className="w-[52%] pr-3 relative shrink-0">
                  <div className="h-4 w-full flex items-center">
                    <div className="w-[62.5%] flex h-3.5">
                      {/* Solid purple 45% */}
                      <div className="bg-[#6366F1] h-full w-[70%] rounded-l-full shadow-2xs" />
                      {/* Translucent purple outlined remaining */}
                      <div className="bg-[#EEF2FF] border border-[#818CF8] h-full w-[30%] rounded-r-full" />
                    </div>
                  </div>
                </div>

                {/* Right percentage & date */}
                <div className="w-[10%] text-right shrink-0">
                  <div className="font-bold text-[#0F172A] text-xs sm:text-sm">45%</div>
                  <div className="text-xs text-[#64748B]">Oct 26</div>
                </div>
              </div>

              {/* Row 2: Nebula Telehealth 2.0 Core Platform */}
              <div className="flex items-center py-1.5 relative">
                {/* Left project details */}
                <div className="w-[38%] pr-3 shrink-0">
                  <div className="flex items-start gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#EF4444] shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-[#0F172A] text-xs sm:text-[13px] leading-snug">
                        Nebula Telehealth 2.0 Core P...
                      </div>
                      <div className="text-xs text-[#64748B] mt-0.5">
                        <span>Nebula Health • </span>
                        <span className="text-[#B45309] font-bold">10 late</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline bar (JUN past NOV 1 into NOV) */}
                <div className="w-[52%] pr-3 relative shrink-0">
                  <div className="h-4 w-full flex items-center">
                    <div className="w-[75%] flex h-3.5">
                      {/* Solid purple 38% */}
                      <div className="bg-[#6366F1] h-full w-[52%] rounded-l-full shadow-2xs" />
                      {/* Translucent purple extending past today marker */}
                      <div className="bg-[#EEF2FF] border border-[#818CF8] h-full w-[48%] rounded-r-full" />
                    </div>
                  </div>
                </div>

                {/* Right percentage & date */}
                <div className="w-[10%] text-right shrink-0">
                  <div className="font-bold text-[#0F172A] text-xs sm:text-sm">38%</div>
                  <div className="text-xs text-[#64748B]">Nov 2</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* FLOATING ACCESSORIES (Chat bubble & Theme toggle)                  */}
      {/* ================================================================== */}
      {/* Blue Floating Chat Bubble */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-30">
        <button
          type="button"
          className="w-11 h-11 rounded-full bg-[#4F46E5] hover:bg-[#4338CA] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 relative cursor-pointer"
        >
          <MessageSquare size={18} />
          <span className="w-4 h-4 rounded-full bg-[#0F172A] text-white text-[9px] font-bold flex items-center justify-center border border-white absolute -top-1 -right-1 shadow-xs">
            2
          </span>
        </button>
      </div>

      {/* Theme toggle pill icon on right edge */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex pointer-events-none">
        <div className="w-5 h-9 bg-white border-l border-y border-[#CBD5E1] rounded-l-lg flex items-center justify-center text-[#64748B] shadow-2xs">
          <Sun size={12} />
        </div>
      </div>
    </div>
  );
}
