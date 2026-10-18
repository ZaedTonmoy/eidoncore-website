"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type AnimatedButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  /** @deprecated kept for backwards compatibility; the element is chosen from `href` */
  as?: string;
  type?: "button" | "submit";
};

export default function AnimatedButton({
  children,
  onClick,
  href,
  className = "",
  variant = "primary",
  type = "button",
}: AnimatedButtonProps) {
  const isSecondary = variant === "secondary" || variant === "outline";

  const baseClasses = `
    group relative inline-flex items-center justify-center
    overflow-hidden rounded-full px-6 py-2.5
    font-medium text-sm
    transition-all duration-300 ease-out
    hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]
    ${
      isSecondary
        ? "text-[#0B0B0F] bg-white border border-[#E7E7EA] hover:border-[#0B0B0F]/30 hover:shadow-md hover:shadow-black/5"
        : "text-white bg-[#0B0B0F] hover:shadow-lg hover:shadow-black/20"
    }
    ${className}
  `;

  // Staggered letter reveal component
  const renderStaggerText = (text: string) => {
    return (
      <span className="inline-flex items-center" aria-hidden="true">
        {text.split("").map((char, idx) => (
          <span
            key={idx}
            className="relative inline-block overflow-hidden h-[1.35em] leading-[1.35em]"
          >
            {/* Primary letter (slides up and out) */}
            <span
              className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-full"
              style={{ transitionDelay: `${idx * 16}ms` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
            {/* Incoming letter (slides up from below) */}
            <span
              className="absolute left-0 top-full inline-block transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-full"
              style={{ transitionDelay: `${idx * 16}ms` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          </span>
        ))}
      </span>
    );
  };

  // A trailing "→" in a label renders as a proper icon (the font's arrow glyph is tiny)
  const rawLabel = typeof children === "string" ? children : "";
  const hasArrow = /\s*→\s*$/.test(rawLabel);
  const label = hasArrow ? rawLabel.replace(/\s*→\s*$/, "") : rawLabel;

  const content = (
    <>
      {/* Background fill sweep on hover */}
      <span
        className={`
          absolute inset-0 -z-0 scale-0 rounded-full
          transition-transform duration-500 ease-out
          group-hover:scale-150
          ${isSecondary ? "bg-neutral-100" : "bg-neutral-800"}
        `}
      />
      <span className="relative z-10 flex items-center gap-1.5">
        {typeof children === "string" ? (
          <>
            {/* Real text for assistive tech; the letter-by-letter copy is decorative */}
            <span className="sr-only">{label}</span>
            {renderStaggerText(label)}
            {hasArrow && (
              <ArrowRight
                size={15}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            )}
          </>
        ) : (
          children
        )}
      </span>
    </>
  );

  if (href) {
    // External destinations (app / sign-up) use a plain anchor; internal ones use client routing
    if (/^(https?:|mailto:|tel:)/.test(href)) {
      return (
        <a href={href} className={baseClasses}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );
}
