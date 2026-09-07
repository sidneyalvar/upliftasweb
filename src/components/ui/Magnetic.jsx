"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Wraps a button/link and gives it a subtle "magnetic" pull toward the
 * cursor on hover — a restrained, precision-feeling micro-interaction
 * rather than a flashy one. Falls back to no movement for touch/keyboard.
 */
export default function Magnetic({ children, strength = 16, className }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x / strength, y: y / strength });
  }

  function reset() {
    setPos({ x: 0, y: 0 });
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.3 }}
      className={className ? className : "inline-block"}
    >
      {children}
    </motion.div>
  );
}
