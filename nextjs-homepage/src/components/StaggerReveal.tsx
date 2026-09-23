"use client";

// StaggerReveal.tsx
// Use this to wrap any group of cards/boxes (3, 6, or any number).
// StaggerGroup = the wrapper (put around the whole grid/list).
// StaggerItem  = each card/box inside it.
// Box 1 animates in, then box 2 after a short delay, then box 3, etc.

import { motion } from "framer-motion";
import { fadeUpBlurItem, staggerContainer, TIMING } from "../lib/animations";

type StaggerGroupProps = {
  children: React.ReactNode;
  className?: string;
};

export function StaggerGroup({ children, className = "" }: StaggerGroupProps) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer(TIMING.cardStagger)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: TIMING.viewportAmount }}
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
    <motion.div className={className} variants={fadeUpBlurItem}>
      {children}
    </motion.div>
  );
}
