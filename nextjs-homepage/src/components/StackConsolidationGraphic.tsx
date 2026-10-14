"use client";

import React from "react";
import Image from "next/image";
import {
  ArrowDown,
  CheckCircle2,
  Database,
  Layers,
  Sparkles,
  Users,
  Briefcase,
  CreditCard,
  MessageSquare,
  Lock,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

export default function StackConsolidationGraphic() {
  const tools = [
    {
      name: "Asana",
      role: "Projects",
      cost: "$30/mo",
      color: "#F06A6A",
      bg: "bg-rose-50",
      border: "border-rose-200",
      textColor: "text-rose-700",
      tag: "Siloed Milestones",
      icon: (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none">
          <circle cx="12" cy="7" r="3.5" fill="#F06A6A" />
          <circle cx="6.5" cy="16.5" r="3.5" fill="#F06A6A" />
          <circle cx="17.5" cy="16.5" r="3.5" fill="#F06A6A" />
        </svg>
      ),
    },
    {
      name: "Trello",
      role: "Tasks",
      cost: "$12/mo",
      color: "#0079BF",
      bg: "bg-sky-50",
      border: "border-sky-200",
      textColor: "text-sky-700",
      tag: "Manual Updates",
      icon: (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#0079BF">
          <rect width="24" height="24" rx="4" fill="#0079BF" />
          <rect x="4" y="4" width="6.5" height="13" rx="1.5" fill="white" />
          <rect x="13.5" y="4" width="6.5" height="8.5" rx="1.5" fill="white" />
        </svg>
      ),
    },
    {
      name: "HubSpot",
      role: "CRM",
      cost: "$50/mo",
      color: "#FF7A59",
      bg: "bg-amber-50",
      border: "border-amber-200",
      textColor: "text-amber-700",
      tag: "Isolated Deals",
      icon: (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#FF7A59">
          <circle cx="12" cy="12" r="9" fill="#FF7A59" />
          <circle cx="12" cy="12" r="4" fill="white" />
        </svg>
      ),
    },
    {
      name: "QuickBooks",
      role: "Invoicing",
      cost: "$35/mo",
      color: "#2CA01C",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      textColor: "text-emerald-700",
      tag: "Re-keyed Bills",
      icon: (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#2CA01C">
          <circle cx="12" cy="12" r="10" fill="#2CA01C" />
          <text x="7" y="16" fill="white" fontSize="10" fontWeight="bold">qb</text>
        </svg>
      ),
    },
    {
      name: "Slack",
      role: "Client Chat",
      cost: "$15/mo",
      color: "#4A154B",
      bg: "bg-purple-50",
      border: "border-purple-200",
      textColor: "text-purple-700",
      tag: "Lost Context",
      icon: (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
          <path d="M5 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 2h4a2 2 0 0 1 0 4H5a2 2 0 0 1 0-4z" fill="#E01E5A" />
          <path d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm2 0v4a2 2 0 0 1 4 0V5a2 2 0 0 1-4 0z" fill="#36C5F0" />
          <path d="M19 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0-2h-4a2 2 0 0 1 0-4h4a2 2 0 0 1 0 4z" fill="#2EB67D" />
          <path d="M14 19a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm-2 0v-4a2 2 0 0 1-4 0v4a2 2 0 0 1 4 0z" fill="#ECB22E" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full rounded-2xl border border-[#E2E8F0] bg-gradient-to-b from-slate-50 via-white to-blue-50/30 p-3 sm:p-5 shadow-xl relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#0F172A 1px, transparent 1px)",
          backgroundSize: "16px 16px"
        }}
      />

      <div className="relative flex flex-col gap-4">
        
        {/* TOP: The 5-Tool Fragmented Stack (The Problem) */}
        <div className="rounded-xl border border-red-200/80 bg-white/90 backdrop-blur-xs p-3.5 shadow-xs">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700">
                The Fragmented Agency Stack (2022)
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              <AlertCircle size={11} className="text-amber-500" /> 5 Logins • 5 SaaS Bills
            </span>
          </div>

          {/* 5 Mock Browser Tabs */}
          <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-5 gap-1.5">
            {tools.map((t) => (
              <div
                key={t.name}
                className={`flex flex-col justify-between p-2 rounded-lg border ${t.border} ${t.bg} transition-transform hover:-translate-y-0.5`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {t.icon}
                    <span className="text-[11px] font-bold text-slate-800">{t.name}</span>
                  </div>
                </div>
                <div className="mt-1 flex items-baseline justify-between text-[10px]">
                  <span className="text-slate-500">{t.role}</span>
                  <span className="font-semibold text-rose-600">{t.cost}</span>
                </div>
                <div className="mt-1 text-[9px] font-medium text-slate-500 bg-white/80 px-1 py-0.5 rounded text-center border border-slate-200/50">
                  {t.tag}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2.5 py-1 px-2.5 rounded-md bg-rose-50/70 border border-rose-100 flex items-center justify-between text-[11px] text-rose-700">
            <span>⚠️ Total cost: <strong className="font-bold">$142+/user/mo</strong></span>
            <span className="text-[10px] text-rose-600/80">Constant tab-switching & sync delays</span>
          </div>
        </div>

        {/* CONNECTOR: Downward Bridge */}
        <div className="flex items-center justify-center my-0.5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-[#3F72AF] text-white shadow-md text-[11px] font-semibold tracking-wide">
            <ArrowDown size={13} className="animate-bounce" />
            <span>CONSOLIDATED INTO ONE FOUNDATION</span>
          </div>
        </div>

        {/* BOTTOM: Eidoncore Unified Platform (The Solution) */}
        <div className="rounded-xl border border-blue-200 bg-white shadow-md overflow-hidden">
          {/* Browser Mockup Top Bar */}
          <div className="px-3 py-2 bg-slate-900 text-slate-300 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>

            <div className="flex items-center gap-1.5 bg-slate-800/90 px-3 py-0.5 rounded-md text-[11px] text-slate-200 font-mono">
              <Lock size={10} className="text-emerald-400" />
              <span>app.eidoncore.com/agency-workspace</span>
            </div>

            <span className="text-[10px] font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" /> Live
            </span>
          </div>

          {/* Eidoncore Unified Database & Connected Modules */}
          <div className="p-3.5 sm:p-4 bg-gradient-to-b from-white to-slate-50/50">
            {/* Header with Eidoncore branding */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/logo.png"
                  alt="Eidoncore Logo"
                  width={20}
                  height={20}
                  className="rounded-md shadow-2xs"
                />
                <span className="text-xs font-bold text-slate-900 tracking-tight">
                  Eidoncore Unified OS
                </span>
              </div>
              <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                1 Shared Database • Flat $29/mo
              </span>
            </div>

            {/* 4 Interconnected Core Modules in One Place */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-lg bg-blue-50/50 border border-blue-100 flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-blue-700 font-semibold text-[11px]">
                  <Users size={13} className="text-blue-600" />
                  <span>Client CRM</span>
                </div>
                <p className="text-[10px] text-slate-600 leading-tight">
                  Replaces HubSpot. Deals, contacts, and custom white-label portals.
                </p>
                <div className="mt-1 flex items-center gap-1 text-[9px] font-medium text-blue-700">
                  <CheckCircle2 size={10} className="text-blue-600" /> Synced to Projects
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-indigo-50/50 border border-indigo-100 flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-indigo-700 font-semibold text-[11px]">
                  <Briefcase size={13} className="text-indigo-600" />
                  <span>Tasks & Projects</span>
                </div>
                <p className="text-[10px] text-slate-600 leading-tight">
                  Replaces Asana & Trello. Sprints, delivery boards, and team workloads.
                </p>
                <div className="mt-1 flex items-center gap-1 text-[9px] font-medium text-indigo-700">
                  <CheckCircle2 size={10} className="text-indigo-600" /> Linked to Client CRM
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100 flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px]">
                  <CreditCard size={13} className="text-emerald-600" />
                  <span>Invoicing & Billing</span>
                </div>
                <p className="text-[10px] text-slate-600 leading-tight">
                  Replaces QuickBooks. One-click billing from logged delivery milestones.
                </p>
                <div className="mt-1 flex items-center gap-1 text-[9px] font-medium text-emerald-700">
                  <CheckCircle2 size={10} className="text-emerald-600" /> 0% Markup / Stripe
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-purple-50/50 border border-purple-100 flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-purple-700 font-semibold text-[11px]">
                  <Sparkles size={13} className="text-purple-600" />
                  <span>AI Copilot & Chat</span>
                </div>
                <p className="text-[10px] text-slate-600 leading-tight">
                  Replaces Slack silos. AI assistant with native context across all 4 modules.
                </p>
                <div className="mt-1 flex items-center gap-1 text-[9px] font-medium text-purple-700">
                  <CheckCircle2 size={10} className="text-purple-600" /> Cross-Module Context
                </div>
              </div>
            </div>

            {/* Bottom Foundation Proof Bar */}
            <div className="mt-2.5 p-2 rounded-lg bg-slate-900 text-white flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5">
                <Database size={12} className="text-blue-400" />
                <span className="font-semibold text-slate-200">Single Source of Truth</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-medium">
                ✓ 0 Sync Lag • 1 Tab • No Seat Limits
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
