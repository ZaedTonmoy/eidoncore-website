"use client";

import React from "react";

interface SectionBadgeProps {
  text: string;
  className?: string;
}

export default function SectionBadge({ text, className = "" }: SectionBadgeProps) {
  if (!text) return null;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-full text-xs font-mono font-semibold tracking-wider text-[#3F72AF] uppercase shadow-2xs mb-3 ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#3F72AF] animate-pulse shrink-0" />
      <span>{text}</span>
    </div>
  );
}
