"use client";

// StaggerReveal.tsx
// Use this to wrap any group of cards/boxes (3, 6, or any number).
// StaggerGroup = the wrapper (put around the whole grid/list).
// StaggerItem  = each card/box inside it.
// Box 1 animates in, then box 2 after a short delay, then box 3, etc.

import { motion } from "framer-motion";
import { fadeUpBlurBox, staggerContainer, TIMING } from "../lib/animations";

type StaggerGroupProps = {
  children: React.ReactNode;
  className?: string;
  viewportAmount?: number | "some" | "all";
};

export function StaggerGroup({
  children,
  className = "",
  viewportAmount = 0.02,
}: StaggerGroupProps) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer(TIMING.cardStagger)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: viewportAmount }}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: React.ReactNode;
  className?: string;
};

export function StaggerItem({ children, className = "" }: StaggerItemProps) {
  return (
    <motion.div className={className} variants={fadeUpBlurBox}>
      {children}
    </motion.div>
  );
}
