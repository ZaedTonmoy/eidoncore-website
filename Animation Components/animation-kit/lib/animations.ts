// lib/animations.ts
// Central place for all animation timing so the whole site feels consistent.
// Change numbers here to tune the feel everywhere at once.

export const EASE = [0.22, 1, 0.36, 1]; // soft "ease-out" cubic-bezier

export const TIMING = {
  duration: 0.55,        // how long one letter/word/card takes to animate
  moveDistance: 24,      // how far it travels (px) while animating
  blurAmount: 8,         // starting blur (px)
  letterStagger: 0.02,   // delay between each letter (20ms)
  wordStagger: 0.045,    // delay between each word (45ms)
  cardStagger: 0.12,     // delay between each card/box (120ms)
  viewportAmount: 0.25,  // % of element that must be visible to start (25%)
};

// One "item" animation: fades in, moves up, and un-blurs.
// Used for a single letter, word, or card.
export const fadeUpBlurItem = {
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
      ease: EASE,
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
