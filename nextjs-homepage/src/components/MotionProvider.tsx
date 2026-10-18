"use client";

import { MotionConfig } from "framer-motion";

// Honors the visitor's "reduce motion" OS setting for every framer-motion
// animation on the site (transform/layout animations are skipped).
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
