"use client";

// AnimatedText.tsx
// For paragraphs / longer text. Animates word by word (default) or
// line by line, bottom -> top, blurred -> sharp, faded -> visible.
// Use "word" mode for short paragraphs, "line" mode for long blocks
// of text (fewer animated pieces = feels faster, less busy).

import { motion } from "framer-motion";
import { fadeUpBlurItem, staggerContainer, TIMING } from "../lib/animations";

type AnimatedTextProps = {
  text: string;
  mode?: "word" | "line";
  as?: "p" | "span" | "div";
  className?: string;
};

export default function AnimatedText({
  text,
  mode = "word",
  as = "p",
  className = "",
}: AnimatedTextProps) {
  const Tag = motion[as];

  // "word" mode: split by spaces.
  // "line" mode: split by existing line breaks (\n) in the text.
  const pieces = mode === "word" ? text.split(" ") : text.split("\n");

  return (
    <Tag
      className={className}
      variants={staggerContainer(TIMING.wordStagger)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: TIMING.viewportAmount }}
    >
      {pieces.map((piece, index) => (
        <motion.span
          key={index}
          variants={fadeUpBlurItem}
          style={{
            display: mode === "line" ? "block" : "inline-block",
            marginRight: mode === "word" ? "0.28em" : 0,
          }}
        >
          {piece}
        </motion.span>
      ))}
    </Tag>
  );
}
