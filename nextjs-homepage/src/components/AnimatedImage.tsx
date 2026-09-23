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
  isHero?: boolean; // if in hero section, animates immediately with minimal delay
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
  delay,
  duration,
  isHero = false,
}: AnimatedImageProps) {
  const position = CORNER_POSITION[origin];
  const effectiveDelay = delay !== undefined ? delay : isHero ? 0.04 : 0.15;
  const effectiveDuration = duration !== undefined ? duration : isHero ? 0.75 : 1.1;

  const wipeVariants = {
    hidden: {
      clipPath: `circle(0% at ${position})`,
    },
    show: {
      clipPath: `circle(150% at ${position})`, // 150% safely covers the full box
      transition: {
        delay: effectiveDelay,
        duration: effectiveDuration,
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
        delay: effectiveDelay + 0.02,
        duration: Math.max(effectiveDuration - 0.15, 0.6),
        ease: EASE,
      },
    },
  };

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      variants={wipeVariants}
      initial="hidden"
      {...(isHero
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once: true, amount: "some", margin: "0px 0px -40px 0px" } })}
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
