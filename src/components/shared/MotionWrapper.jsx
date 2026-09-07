"use client";

import { motion } from "framer-motion";

export function FadeUp({
  children,
  delay = 0,
  className,
  once = true,
  y = 24,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGroup({ children, className, staggerDelay = 0.1 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, y = 24, style }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/**
 * BlurReveal — a soft blur + fade + rise entrance, used for hero headlines
 * and hero imagery to convey precision and controlled reveal rather than a
 * generic slide-in.
 */
export function BlurReveal({ children, delay = 0, className, once = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(14px)", y: 18 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
