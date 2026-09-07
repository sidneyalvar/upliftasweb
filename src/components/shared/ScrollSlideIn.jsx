"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const DISTANCE_BY_DIRECTION = {
  left: { axis: "x", from: -1 },
  right: { axis: "x", from: 1 },
  up: { axis: "y", from: 1 },
};

/**
 * Ties an element's position directly to scroll progress rather than
 * firing a one-shot "entrance" animation — as the element travels through
 * a window near the bottom of the viewport it slides into place, and
 * scrolling back up smoothly reverses the same motion instead of
 * replaying a canned animation. This is what actually reads as "sliding
 * in as you scroll up and down" rather than "fading in once."
 */
export default function ScrollSlideIn({
  children,
  direction = "up",
  distance = 56,
  className = "",
  style,
}) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "start 45%"],
  });

  const { axis, from } = DISTANCE_BY_DIRECTION[direction] ?? DISTANCE_BY_DIRECTION.up;
  const offset = useTransform(scrollYProgress, [0, 1], [from * distance, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (prefersReducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{ ...style, ...(axis === "x" ? { x: offset, opacity } : { y: offset, opacity }) }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
