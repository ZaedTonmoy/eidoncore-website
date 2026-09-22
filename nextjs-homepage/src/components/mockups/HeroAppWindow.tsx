"use client";

import React from "react";
import { siteContent } from "@/content/site-content";
import {
  Inbox,
  CheckCircle2,
  FolderKanban,
  Layers,
  ChevronRight,
  MoreHorizontal,
  Circle,
  Clock,
  GitPullRequest,
  Check,
  User,
  Tag,
  Calendar,
  AlertCircle,
  Hash,
} from "lucide-react";

export default function HeroAppWindow() {
  const { sidebar, issue } = siteContent.hero.appMockup;

  return (
    <div className="w-full bg-[#FFFFFF] border border-[#E7E7EA] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden transition-all duration-300 hover:shadow-[0_12px_36px_rgb(0,0,0,0.08)] hover:-translate-y-0.5">
      {/* Top Application Bar */}
      <div className="h-10 bg-[#FAFAFA] border-b border-[#E7E7EA] px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#E7E7EA]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#E7E7EA]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#E7E7EA]" />
          <span className="text-[11px] font-mono text-[#6B6F76] ml-3 hidden sm:inline">
            linear.internal / {issue.team.toLowerCase().replace(" ", "-")} / {issue.id}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-[#6B6F76]">
          <span className="hidden md:inline-flex items-center gap-1.5 px-2 py-0.5 bg-white border border-[#E7E7EA] rounded-full text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Synced (24ms)
          </span>
          <MoreHorizontal size={14} className="text-[#6B6F76]" />
        </div>
      </div>

      {/* 3-Column Layout: Sidebar + Main Content + Properties Panel */}
      <div className="grid grid-cols-12 min-h-[460px] text-xs">
        {/* Column 1: Left Mini Sidebar */}
        <aside className="hidden md:flex md:col-span-3 lg:col-span-2 border-r border-[#E7E7EA] bg-[#FAFAFA] p-3 flex-col justify-between">
          <div className="flex flex-col gap-4">
            {/* Workspace switcher */}
            <div className="flex items-center justify-between px-2 py-1.5 bg-white border border-[#E7E7EA] rounded-lg shadow-2xs">
              <span className="font-medium text-[#0B0B0F] truncate">{sidebar.workspace}</span>
              <span className="text-[10px] text-[#6B6F76]">⌘K</span>
            </div>

            {/* Nav Items */}
            <nav className="flex flex-col gap-0.5">
              {sidebar.navItems.map((item, idx) => (
                <div
                  key={item.label}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-md cursor-pointer transition-colors ${
                    idx === 1
                      ? "bg-white font-medium text-[#0B0B0F] shadow-2xs border border-[#E7E7EA]"
                      : "text-[#6B6F76] hover:bg-white/60 hover:text-[#0B0B0F]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {idx === 0 && <Inbox size={13} />}
                    {idx === 1 && <CheckCircle2 size={13} className="text-indigo-600" />}
                    {idx === 2 && <FolderKanban size={13} />}
                    {idx === 3 && <Layers size={13} />}
                    <span>{item.label}</span>
                  </div>
                  {item.count !== null && (
                    <span className="text-[10px] text-[#6B6F76] font-mono">{item.count}</span>
                  )}
                </div>
              ))}
            </nav>

            {/* Teams */}
            <div className="pt-2 border-t border-[#E7E7EA]/80">
              <span className="px-2 text-[10px] font-medium text-[#6B6F76] uppercase tracking-wider block mb-1">
                Your Teams
              </span>
              {sidebar.teams.map((t) => (
                <div
                  key={t.name}
                  className="flex items-center justify-between px-2.5 py-1 text-[#6B6F76] hover:text-[#0B0B0F] cursor-pointer rounded"
                >
                  <span className="truncate">{t.name}</span>
                  <span className="text-[10px] font-mono">{t.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* User profile footer */}
          <div className="flex items-center gap-2 px-2 py-1.5 border-t border-[#E7E7EA] mt-4">
            <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px]">
              SJ
            </div>
            <span className="text-[11px] font-medium text-[#0B0B0F] truncate">{sidebar.user}</span>
          </div>
        </aside>

        {/* Column 2: Main Issue View */}
        <main className="col-span-12 md:col-span-6 lg:col-span-7 p-6 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            {/* Breadcrumb & ID */}
            <div className="flex items-center gap-2 text-[11px] text-[#6B6F76]">
              <span className="font-mono font-medium text-[#0B0B0F]">{issue.id}</span>
              <ChevronRight size={12} />
              <span>{issue.team}</span>
              <ChevronRight size={12} />
              <span className="inline-flex items-center gap-1 text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                <Circle size={8} className="fill-amber-500 text-amber-500" /> {issue.properties.status}
              </span>
            </div>

            {/* Issue Title */}
            <h3 className="text-base sm:text-lg font-medium text-[#0B0B0F] tracking-tight leading-snug">
              {issue.title}
            </h3>

            {/* Description */}
            <p className="text-[#6B6F76] text-xs leading-relaxed">
              {issue.description}
            </p>

            {/* Checklist */}
            <div className="bg-[#FAFAFA] border border-[#E7E7EA] rounded-xl p-3 flex flex-col gap-2 mt-1">
              <span className="text-[11px] font-medium text-[#0B0B0F]">Acceptance Criteria</span>
              {issue.checklist.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[11.5px] text-[#6B6F76]">
                  <div
                    className={`w-3.5 h-3.5 mt-0.5 rounded flex items-center justify-center border ${
                      item.done
                        ? "bg-indigo-600 border-indigo-600 text-white"
                        : "border-[#E7E7EA] bg-white"
                    }`}
                  >
                    {item.done && <Check size={10} strokeWidth={3} />}
                  </div>
                  <span className={item.done ? "line-through opacity-75" : ""}>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Activity Stream */}
            <div className="mt-4 pt-4 border-t border-[#E7E7EA] flex flex-col gap-2.5">
              <span className="text-[11px] font-medium text-[#6B6F76]">Activity</span>
              {issue.activity.map((act, idx) => (
                <div key={idx} className="flex items-center justify-between text-[11.5px] py-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span className="font-medium text-[#0B0B0F]">{act.author}</span>
                    <span className="text-[#6B6F76]">{act.action}</span>
                    <span className="font-mono text-[10.5px] bg-[#FAFAFA] border border-[#E7E7EA] px-1.5 py-0.5 rounded text-[#0B0B0F]">
                      {act.meta}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#6B6F76] font-mono">{act.time}</span>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Column 3: Properties Panel */}
        <aside className="hidden lg:flex lg:col-span-3 border-l border-[#E7E7EA] bg-[#FAFAFA] p-4 flex-col gap-4">
          <span className="text-[11px] font-medium text-[#6B6F76] uppercase tracking-wider">Properties</span>

          <div className="flex flex-col gap-3">
            {/* Status */}
            <div className="flex items-center justify-between">
              <span className="text-[#6B6F76] flex items-center gap-1.5">
                <Circle size={12} className="text-amber-500 fill-amber-500" /> Status
              </span>
              <span className="font-medium text-[#0B0B0F]">{issue.properties.status}</span>
            </div>

            {/* Priority */}
            <div className="flex items-center justify-between">
              <span className="text-[#6B6F76] flex items-center gap-1.5">
                <AlertCircle size={12} className="text-red-500" /> Priority
              </span>
              <span className="font-medium text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded text-[10px]">
                {issue.properties.priority}
              </span>
            </div>

            {/* Assignee */}
            <div className="flex items-center justify-between">
              <span className="text-[#6B6F76] flex items-center gap-1.5">
                <User size={12} /> Assignee
              </span>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[9px] font-bold">
                  SJ
                </div>
                <span className="font-medium text-[#0B0B0F]">{issue.properties.assignee}</span>
              </div>
            </div>

            {/* Cycle */}
            <div className="flex items-center justify-between">
              <span className="text-[#6B6F76] flex items-center gap-1.5">
                <Clock size={12} /> Cycle
              </span>
              <span className="font-medium text-[#0B0B0F]">{issue.properties.cycle}</span>
            </div>

            {/* Project */}
            <div className="flex items-center justify-between">
              <span className="text-[#6B6F76] flex items-center gap-1.5">
                <FolderKanban size={12} /> Project
              </span>
              <span className="font-medium text-[#0B0B0F] truncate max-w-[110px]">
                {issue.properties.project}
              </span>
            </div>

            {/* Labels */}
            <div className="flex flex-col gap-1.5 pt-2 border-t border-[#E7E7EA]">
              <span className="text-[#6B6F76] flex items-center gap-1.5">
                <Tag size={12} /> Labels
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {issue.properties.labels.map((l) => (
                  <span
                    key={l}
                    className="px-2 py-0.5 bg-white border border-[#E7E7EA] rounded-md text-[10.5px] font-mono text-[#0B0B0F]"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
