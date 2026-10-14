"use client";

import React, { useState } from "react";
import BlendMockupCard from "@/components/BlendMockupCard";
import {
  Megaphone,
  Palette,
  Code2,
  Briefcase,
  UserCheck,
  Check,
  Lock,
  Unlock,
  Shield,
  Bot,
  Sparkles,
  ExternalLink,
  Calendar,
  CheckSquare,
  DollarSign,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Shared building blocks (same visual language as the feature page mockups)  */
/* -------------------------------------------------------------------------- */

function Shell({
  icon,
  iconClass,
  title,
  subtitle,
  badge,
  children,
}: {
  icon: React.ReactNode;
  iconClass: string;
  title: string;
  subtitle: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full max-w-xl group min-w-0">
      <BlendMockupCard className="bg-white p-3.5 sm:p-5 rounded-2xl w-full min-w-0 flex flex-col gap-3.5 sm:gap-4 text-slate-800 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${iconClass}`}
            >
              {icon}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-slate-900 leading-tight truncate">{title}</h3>
              <p className="text-[11px] text-slate-400 truncate">{subtitle}</p>
            </div>
          </div>
          {badge}
        </div>
        {children}
      </BlendMockupCard>
    </div>
  );
}

function LivePill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      {children}
    </span>
  );
}

function Stat({
  label,
  value,
  sub,
  tone = "default",
}: {
  label: string;
  value: React.ReactNode;
  sub: string;
  tone?: "default" | "good" | "info";
}) {
  const valueColor =
    tone === "good" ? "text-emerald-600" : tone === "info" ? "text-[#3F72AF]" : "text-slate-900";
  return (
    <div className="px-2.5 py-2 rounded-lg bg-slate-50/70 border border-slate-200/70 min-w-0">
      <span className="text-[10px] font-medium text-slate-400 block truncate">{label}</span>
      <span className={`text-sm sm:text-base font-bold tracking-tight block ${valueColor}`}>
        {value}
      </span>
      <span className="text-[10px] text-slate-500 block truncate">{sub}</span>
    </div>
  );
}

function Note({
  icon,
  pill,
  children,
}: {
  icon: React.ReactNode;
  pill: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-3 py-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200/80 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-[11px] text-slate-600 min-w-0">
        <span className="text-[#3F72AF] shrink-0">{icon}</span>
        <span className="leading-snug">{children}</span>
      </div>
      <span className="text-[10px] font-mono font-bold text-[#3F72AF] bg-blue-50 border border-blue-100 px-2 py-0.5 rounded shrink-0">
        {pill}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 1. Marketing agencies                                                      */
/* -------------------------------------------------------------------------- */

const RETAINERS = [
  { initials: "VM", name: "Vantage Media", campaign: "Q4 Omnichannel Ads", fee: "$12,500", health: 100 },
  { initials: "NH", name: "Nebula Health", campaign: "Patient Acquisition", fee: "$9,500", health: 98 },
  { initials: "KF", name: "Kroma Fintech", campaign: "Growth Sprint", fee: "$16,500", health: 100 },
];

export function MarketingPreview() {
  return (
    <Shell
      icon={<Megaphone size={16} />}
      iconClass="bg-pink-50 text-pink-600 border-pink-100"
      title="Client Retainers"
      subtitle="Campaign pacing & Stripe retainers"
      badge={<LivePill>Healthy book</LivePill>}
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <Stat label="Active retainers" value="$38,500" sub="3 accounts" tone="good" />
        <Stat label="Deliverables" value="18 / 18" sub="On track" />
        <Stat label="Next digest" value="Oct 31" sub="Auto-scheduled" tone="info" />
        <Stat label="Churn risk" value="0" sub="No red flags" tone="good" />
      </div>

      <div className="rounded-xl border border-slate-200/80 overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_64px] gap-3 px-3 py-2 bg-slate-50 border-b border-slate-200/80 text-[10px] font-mono uppercase tracking-wider text-slate-400">
          <span>Client</span>
          <span>Retainer</span>
          <span className="text-right">Health</span>
        </div>
        {RETAINERS.map((r) => (
          <div
            key={r.name}
            className="grid grid-cols-[1fr_auto_64px] gap-3 items-center px-3 py-2.5 border-b border-slate-100 last:border-b-0"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-bold flex items-center justify-center shrink-0">
                {r.initials}
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold text-slate-900 block truncate">{r.name}</span>
                <span className="text-[10px] text-slate-400 block truncate">{r.campaign}</span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-slate-900">{r.fee}/mo</span>
            <div className="flex items-center gap-1.5 justify-end">
              <div className="w-8 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${r.health}%` }} />
              </div>
              <span className="text-[10px] font-mono text-emerald-600 font-bold">{r.health}%</span>
            </div>
          </div>
        ))}
      </div>

      <Note icon={<Sparkles size={13} />} pill="Auto-pay on">
        Monthly retainer invoices run automatically via Stripe.
      </Note>
    </Shell>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Design studios                                                          */
/* -------------------------------------------------------------------------- */

export function DesignPreview() {
  const [approved, setApproved] = useState(false);

  return (
    <Shell
      icon={<Palette size={16} />}
      iconClass="bg-purple-50 text-purple-600 border-purple-100"
      title="Living with Lolo"
      subtitle="Brand & web experience"
      badge={
        <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
          Phase 2 / 3
        </span>
      }
    >
      <div className="flex flex-col gap-2">
        {/* Milestone 1 */}
        <div className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <Check size={11} strokeWidth={3} />
            </span>
            <span className="text-xs font-semibold text-slate-800 truncate">Brand guidelines & tokens</span>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 shrink-0">Approved</span>
        </div>

        {/* Milestone 2 */}
        <div className="rounded-xl border border-purple-200 bg-purple-50/40 p-3 flex flex-col gap-2.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                2
              </span>
              <span className="text-xs font-semibold text-slate-900 truncate">Design system & proofs</span>
            </div>
            <span className="text-[10px] font-bold text-purple-700 shrink-0">
              {approved ? "Signed off" : "In review"}
            </span>
          </div>

          <div className="rounded-lg bg-white border border-slate-200/80 p-2.5 flex flex-col gap-2">
            <div className="flex items-center justify-between text-[10px] text-slate-400 gap-2">
              <span className="inline-flex items-center gap-1 font-mono text-purple-600 truncate">
                <ExternalLink size={10} /> figma.com/file/Lolo-v2.4
              </span>
              <span className="shrink-0">Updated 2h ago</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              <strong className="text-slate-800">Sarah (client):</strong> &ldquo;The type hierarchy and
              mobile buttons look great. Ready for sign-off!&rdquo;
            </p>
            <button
              type="button"
              onClick={() => setApproved((v) => !v)}
              className={`w-full py-1.5 px-3 rounded-lg text-[11px] font-bold text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                approved ? "bg-emerald-600" : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              <Check size={12} strokeWidth={2.5} />
              {approved ? "Approved — Phase 3 unlocked" : "Approve milestone & unlock Phase 3"}
            </button>
          </div>
        </div>

        {/* Milestone 3 */}
        <div
          className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl border transition-colors ${
            approved ? "border-emerald-200 bg-emerald-50/50" : "border-slate-200 bg-slate-50/70"
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                approved ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"
              }`}
            >
              {approved ? <Unlock size={11} /> : <Lock size={11} />}
            </span>
            <span className="text-xs font-semibold text-slate-700 truncate">Final assets & source hand-off</span>
          </div>
          <span className={`text-[10px] font-bold shrink-0 ${approved ? "text-emerald-700" : "text-slate-400"}`}>
            {approved ? "Unlocked" : "Locked"}
          </span>
        </div>
      </div>

      <Note icon={<Shield size={13} />} pill="48h expiry">
        Source files download from a secure, expiring link.
      </Note>
    </Shell>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Software & web agencies                                                 */
/* -------------------------------------------------------------------------- */

export function DevelopmentPreview() {
  const [subtasks, setSubtasks] = useState({ schema: true, dispatch: true, tests: false });
  const toggle = (k: keyof typeof subtasks) => setSubtasks((s) => ({ ...s, [k]: !s[k] }));

  const items: { key: keyof typeof subtasks; label: string }[] = [
    { key: "schema", label: "Protocol schema" },
    { key: "dispatch", label: "Tool dispatch" },
    { key: "tests", label: "Unit tests" },
  ];

  return (
    <Shell
      icon={<Code2 size={16} />}
      iconClass="bg-blue-50 text-[#3F72AF] border-blue-100"
      title="Sprint 42"
      subtitle="Kanban board with WIP limits"
      badge={<LivePill>MCP active</LivePill>}
    >
      <div className="grid grid-cols-3 gap-2">
        <Stat label="Velocity" value="42 / 48" sub="87.5% done" tone="info" />
        <Stat label="Billable" value="124.5h" sub="Est. 140h max" />
        <Stat label="Live timer" value="01:24" sub="On MCP task" tone="good" />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {/* Backlog */}
        <div className="rounded-xl bg-slate-50/80 border border-slate-200/70 p-2 flex flex-col gap-2 min-w-0">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 px-0.5">
            <span>Backlog</span>
            <span className="font-mono text-slate-400">1</span>
          </div>
          <div className="rounded-lg bg-white border border-slate-200/80 p-2 shadow-2xs">
            <span className="text-[9px] font-mono font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">DevOps</span>
            <p className="text-[11px] font-semibold text-slate-800 leading-snug mt-1.5">Webhook retry backoff</p>
            <span className="text-[10px] text-slate-400 mt-1 block">8 pts</span>
          </div>
        </div>

        {/* In progress */}
        <div className="rounded-xl bg-blue-50/40 border border-blue-200/70 p-2 flex flex-col gap-2 min-w-0">
          <div className="flex items-center justify-between text-[10px] font-bold text-[#3F72AF] px-0.5">
            <span>In progress</span>
            <span className="font-mono">2/2 WIP</span>
          </div>
          <div className="rounded-lg bg-white border border-slate-200/80 p-2 shadow-2xs">
            <span className="text-[9px] font-mono font-bold text-[#3F72AF] bg-blue-50 px-1.5 py-0.5 rounded">MCP</span>
            <p className="text-[11px] font-semibold text-slate-800 leading-snug mt-1.5">Claude & Cursor bridge</p>
            <div className="mt-1.5 flex flex-col gap-1">
              {items.map((it) => (
                <label key={it.key} className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={subtasks[it.key]}
                    onChange={() => toggle(it.key)}
                    className="w-3 h-3 accent-[#3F72AF] cursor-pointer"
                  />
                  <span
                    className={`text-[10px] ${
                      subtasks[it.key] ? "line-through text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {it.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Done */}
        <div className="rounded-xl bg-slate-50/80 border border-slate-200/70 p-2 flex flex-col gap-2 min-w-0">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 px-0.5">
            <span>Done</span>
            <span className="font-mono text-slate-400">12</span>
          </div>
          <div className="rounded-lg bg-white border border-slate-200/80 p-2 shadow-2xs">
            <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">API</span>
            <p className="text-[11px] font-semibold text-slate-800 leading-snug mt-1.5">Stripe webhook idempotency</p>
            <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">6.2h billable</span>
          </div>
        </div>
      </div>

      <Note icon={<Bot size={13} />} pill="MCP ready">
        Budget alerts fire before hours pass the signed estimate.
      </Note>
    </Shell>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Consulting & advisory                                                   */
/* -------------------------------------------------------------------------- */

export function ConsultingPreview() {
  const [tab, setTab] = useState<"cashflow" | "revenue">("cashflow");

  return (
    <Shell
      icon={<Briefcase size={16} />}
      iconClass="bg-amber-50 text-amber-600 border-amber-100"
      title="Q4 Advisory Engagements"
      subtitle="Partner margins & utilization"
      badge={
        <div className="flex items-center gap-0.5 bg-slate-100/80 p-0.5 rounded-lg border border-slate-200/80 text-[10px] font-semibold">
          {(["cashflow", "revenue"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                tab === t ? "bg-white text-slate-900 shadow-2xs font-bold" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {t === "cashflow" ? "Cash flow" : "Revenue"}
            </button>
          ))}
        </div>
      }
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <Stat label="Collected" value="$84.2K" sub="75.2% of billed" tone="good" />
        <Stat label="Invoiced" value="$112K" sub="Net 30 terms" />
        <Stat label="Gross margin" value="68.4%" sub="+4.2% vs Q3" tone="info" />
        <Stat label="Utilization" value="88.5%" sub="Target 80%" />
      </div>

      <div className="rounded-xl border border-slate-200/80 p-3 flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-2 text-[11px]">
          <span className="font-semibold text-slate-800">
            {tab === "cashflow" ? "Quarterly cash flow" : "Revenue recognition"}
          </span>
          <span className="font-mono text-slate-500">
            {tab === "cashflow" ? "$84.2k of $112k" : "$112.0k recognized"}
          </span>
        </div>
        <div className="flex h-2 w-full rounded-full overflow-hidden bg-slate-100">
          <div className="bg-emerald-500" style={{ width: "75%" }} />
          <div className="bg-amber-400" style={{ width: "15%" }} />
          <div className="bg-[#3F72AF]" style={{ width: "10%" }} />
        </div>
        <div className="flex items-center gap-x-4 gap-y-1 flex-wrap text-[10px] text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Settled $84.2k
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" /> In grace $18.0k
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#3F72AF]" /> Retainers $9.8k
          </span>
        </div>
      </div>

      <Note icon={<Lock size={13} />} pill="Internal only">
        Partner memos stay hidden from the client portal.
      </Note>
    </Shell>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. Freelancers & solo studios                                              */
/* -------------------------------------------------------------------------- */

export function FreelancerPreview() {
  const [sent, setSent] = useState(true);
  const [exported, setExported] = useState(false);
  const done = Number(sent) + Number(exported);

  return (
    <Shell
      icon={<UserCheck size={16} />}
      iconClass="bg-emerald-50 text-emerald-600 border-emerald-100"
      title="My Day"
      subtitle="Your whole practice on one screen"
      badge={<LivePill>Ready for today</LivePill>}
    >
      <div className="px-3 py-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200/70 flex items-center justify-between gap-3">
        <span className="text-[11px] text-emerald-900 leading-snug">
          Tasks, invoices, proposals and forms now live in <strong>one tool</strong>.
        </span>
        <span className="text-[10px] font-mono font-bold text-emerald-700 bg-white border border-emerald-200 px-2 py-0.5 rounded shrink-0">
          Solo plan
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {/* Schedule */}
        <div className="rounded-xl border border-slate-200/80 p-3 flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <span className="inline-flex items-center gap-1">
              <Calendar size={11} /> Schedule
            </span>
            <span className="font-mono normal-case">Today</span>
          </div>
          {[
            { t: "10:00 AM", title: "Strategy sync", who: "Nebula Health" },
            { t: "02:30 PM", title: "Brand kit review", who: "Living with Lolo" },
          ].map((e) => (
            <div key={e.title} className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200/60">
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-slate-800 block truncate">{e.title}</span>
                <span className="text-[10px] text-slate-400 block truncate">{e.who}</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#3F72AF] shrink-0">{e.t}</span>
            </div>
          ))}
        </div>

        {/* Deliverables */}
        <div className="rounded-xl border border-slate-200/80 p-3 flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <span className="inline-flex items-center gap-1">
              <CheckSquare size={11} /> To do
            </span>
            <span className="font-mono normal-case">{done}/2 done</span>
          </div>
          {[
            { checked: sent, set: setSent, title: "Send retainer invoice", sub: "$12,500 via Stripe" },
            { checked: exported, set: setExported, title: "Export SVG icon pack", sub: "Figma release bundle" },
          ].map((c) => (
            <label
              key={c.title}
              className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200/60 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={c.checked}
                onChange={() => c.set((v) => !v)}
                className="w-3.5 h-3.5 mt-0.5 accent-[#3F72AF] cursor-pointer"
              />
              <div className="min-w-0">
                <span
                  className={`text-[11px] font-semibold block truncate ${
                    c.checked ? "line-through text-slate-400" : "text-slate-800"
                  }`}
                >
                  {c.title}
                </span>
                <span className="text-[10px] text-slate-400 block truncate">{c.sub}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <Note icon={<DollarSign size={13} />} pill="0 overdue">
        $18,400 collected this month.
      </Note>
    </Shell>
  );
}
