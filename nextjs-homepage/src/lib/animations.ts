// lib/animations.ts
// Central place for all animation timing so the whole site feels consistent.
// Change numbers here to tune the feel everywhere at once.

import type { Variants } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1] as const; // unified smooth cubic-bezier

export const TIMING = {
  duration: 0.45,        // unified duration so unblur and glide finish at the exact same moment
  moveDistance: 12,      // subtle 12px travel so movement and unblur feel like one single animation
  blurAmount: 4,         // soft 4px camera focus blur
  letterStagger: 0.018,  // delay between each letter
  wordStagger: 0.04,     // delay between each word
  cardStagger: 0.08,     // brisk 80ms delay between cards
  viewportAmount: 0.2,   // % of element visible to trigger
};

// One "item" animation: fades in, moves up, and un-blurs simultaneously in unison.
export const fadeUpBlurItem: Variants = {
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
      duration: TIMING.duration,
      ease: [0.16, 1, 0.3, 1],
      opacity: { duration: TIMING.duration, ease: [0.16, 1, 0.3, 1] },
      y: { duration: TIMING.duration, ease: [0.16, 1, 0.3, 1] },
      filter: { duration: TIMING.duration, ease: [0.16, 1, 0.3, 1] },
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
