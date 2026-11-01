"use client";

// AnimatedHeading.tsx
// Splits a heading into single letters and animates each one:
// bottom -> top, blurred -> sharp, faded -> visible.
// Plays only once, when the heading is enough inside the viewport.

import React from "react";
import { motion } from "framer-motion";
import { fadeUpBlurItem, staggerContainer, TIMING } from "../lib/animations";

type AnimatedHeadingProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4";
  className?: string;
  immediate?: boolean;
  delay?: number;
};

export default function AnimatedHeading({
  text,
  as = "h2",
  className = "",
  immediate = false,
  delay = 0,
}: AnimatedHeadingProps) {
  const Tag = motion[as]; // motion.h1 / motion.h2 / etc.

  // Split into words first (so wrapping still looks natural),
  // then into letters inside each word.
  const words = text.split(" ");

  return (
    <Tag
      key={text}
      className={`flex flex-wrap gap-x-[0.28em] gap-y-[0.1em] ${className}`}
      style={{
        display: "flex",
        flexWrap: "wrap",
        columnGap: "0.28em",
        rowGap: "0.1em",
      }}
      variants={staggerContainer(immediate ? 0.008 : TIMING.letterStagger, delay)}
      initial="hidden"
      {...(immediate
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once: true, amount: TIMING.viewportAmount } })}
    >
      {words.map((word, wordIndex) => (
        <React.Fragment key={`${word}-${wordIndex}`}>
          <motion.span
            variants={fadeUpBlurItem}
            className="inline-block whitespace-nowrap"
          >
            {word}
          </motion.span>
          {wordIndex < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </Tag>
  );
}
