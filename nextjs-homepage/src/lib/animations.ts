// lib/animations.ts
// Central place for all animation timing so the whole site feels consistent.
// Change numbers here to tune the feel everywhere at once.

import type { Variants } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1] as const; // unified smooth cubic-bezier

export const TIMING = {
  duration: 0.45,        // text/letter reveal duration
  boxDuration: 0.9,      // 2x slower box reveal duration (0.9s) for calm, luxurious motion
  moveDistance: 16,      // subtle 16px travel so movement and unblur feel like one single animation
  blurAmount: 5,         // soft camera focus blur
  letterStagger: 0.018,  // delay between each letter
  wordStagger: 0.04,     // delay between each word
  cardStagger: 0.14,     // 2x more spacious 140ms delay between cards
  viewportAmount: 0.2,   // % of element visible to trigger
};

// One "item" animation (letters, words, inline text):
export const fadeUpBlurItem: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    filter: "blur(4px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: TIMING.duration,
      ease: [0.16, 1, 0.3, 1],
      opacity: { duration: TIMING.duration, ease: [0.16, 1, 0.3, 1] },
      y: { duration: TIMING.duration, ease: [0.16, 1, 0.3, 1] },
      filter: { duration: TIMING.duration, ease: [0.16, 1, 0.3, 1] },
    },
  },
};

// Box / Card reveal animation (2x slower, smooth cinematic unblur & glide):
export const fadeUpBlurBox: Variants = {
  hidden: {
    opacity: 0,
    y: TIMING.moveDistance,
    filter: `blur(${TIMING.blurAmount}px)`,
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: TIMING.boxDuration,
      ease: [0.16, 1, 0.3, 1],
      opacity: { duration: TIMING.boxDuration, ease: [0.16, 1, 0.3, 1] },
      y: { duration: TIMING.boxDuration, ease: [0.16, 1, 0.3, 1] },
      filter: { duration: TIMING.boxDuration, ease: [0.16, 1, 0.3, 1] },
    },
  },
};

// Wrapper animation: does nothing by itself, just tells its children
// to animate one after another (stagger).
export const staggerContainer = (staggerAmount: number, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: staggerAmount,
      delayChildren,
    },
  },
});
