"use client";

// AnimatedImage.tsx
// Reveals an image from a chosen corner (like a soft curtain opening),
// combined with a blur-to-sharp and fade-in on the image itself.
// Plays once, when the image is enough inside the viewport.

import { motion } from "framer-motion";
import { EASE, TIMING } from "../lib/animations";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

type AnimatedImageProps = {
  src: string;
  alt: string;
  origin?: Corner; // which corner the reveal grows from
  className?: string; // classes for the outer wrapper (set width/height/rounded here)
  imgClassName?: string; // classes for the <img> itself (e.g. object-cover)
  delay?: number; // optional delay in seconds
  duration?: number; // optional duration in seconds
};

const CORNER_POSITION: Record<Corner, string> = {
  "top-left": "0% 0%",
  "top-right": "100% 0%",
  "bottom-left": "0% 100%",
  "bottom-right": "100% 100%",
};

export default function AnimatedImage({
  src,
  alt,
  origin = "top-left",
  className = "",
  imgClassName = "",
  delay = 0.3,
  duration = 1.4,
}: AnimatedImageProps) {
  const position = CORNER_POSITION[origin];

  const wipeVariants = {
    hidden: {
      clipPath: `circle(0% at ${position})`,
    },
    show: {
      clipPath: `circle(150% at ${position})`, // 150% safely covers the full box
      transition: {
        delay,
        duration, // slower, majestic reveal so visitors see the curtain unfold
        ease: EASE,
      },
    },
  };

  const fadeVariants = {
    hidden: {
      opacity: 0,
      filter: `blur(${TIMING.blurAmount}px)`,
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: delay + 0.05,
        duration: Math.max(duration - 0.2, 0.9),
        ease: EASE,
      },
    },
  };

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      variants={wipeVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: "some", margin: "0px 0px -80px 0px" }}
    >
      <motion.img
        src={src}
        alt={alt}
        className={`block w-full h-auto ${imgClassName}`}
        variants={fadeVariants}
      />
    </motion.div>
  );
}
