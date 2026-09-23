"use client";

// AnimatedHeading.tsx
// Splits a heading into single letters and animates each one:
// bottom -> top, blurred -> sharp, faded -> visible.
// Plays only once, when the heading is enough inside the viewport.

import { motion } from "framer-motion";
import { fadeUpBlurItem, staggerContainer, TIMING } from "../lib/animations";

type AnimatedHeadingProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4";
  className?: string;
};

export default function AnimatedHeading({
  text,
  as = "h2",
  className = "",
}: AnimatedHeadingProps) {
  const Tag = motion[as]; // motion.h1 / motion.h2 / etc.

  // Split into words first (so wrapping still looks natural),
  // then into letters inside each word.
  const words = text.split(" ");

  return (
    <Tag
      className={className}
      style={{ display: "flex", flexWrap: "wrap" }}
      variants={staggerContainer(TIMING.letterStagger)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: TIMING.viewportAmount }}
    >
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          style={{ display: "inline-flex", marginRight: "0.25em" }}
        >
          {word.split("").map((letter, letterIndex) => (
            <motion.span
              key={letterIndex}
              variants={fadeUpBlurItem}
              style={{ display: "inline-block" }}
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
