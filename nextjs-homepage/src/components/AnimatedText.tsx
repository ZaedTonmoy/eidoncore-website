"use client";

// AnimatedText.tsx
// For paragraphs / longer text. Animates word by word (default) or
// line by line, bottom -> top, blurred -> sharp, faded -> visible.
// Use "word" mode for short paragraphs, "line" mode for long blocks
// of text (fewer animated pieces = feels faster, less busy).

import React from "react";
import { motion } from "framer-motion";
import { fadeUpBlurItem, staggerContainer, TIMING } from "../lib/animations";

type AnimatedTextProps = {
  text: string;
  mode?: "word" | "line";
  as?: "p" | "span" | "div";
  className?: string;
  immediate?: boolean;
  delay?: number;
};

export default function AnimatedText({
  text,
  mode = "word",
  as = "p",
  className = "",
  immediate = false,
  delay = 0.05,
}: AnimatedTextProps) {
  const Tag = motion[as];

  // "word" mode: split by spaces.
  // "line" mode: split by existing line breaks (\n) in the text.
  const pieces = mode === "word" ? text.split(" ") : text.split("\n");

  return (
    <Tag
      className={className}
      variants={staggerContainer(immediate ? 0.015 : TIMING.wordStagger, immediate ? delay : 0)}
      initial={immediate ? false : "hidden"}
      {...(immediate
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once: true, amount: TIMING.viewportAmount } })}
    >
      {pieces.map((piece, index) => (
        <React.Fragment key={index}>
          <motion.span
            variants={fadeUpBlurItem}
            initial={immediate ? false : undefined}
            style={{
              display: mode === "line" ? "block" : "inline-block",
            }}
          >
            {piece}
          </motion.span>
          {mode === "word" && index < pieces.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </Tag>
  );
}
