"use client";

import { motion } from "framer-motion";

const spring = { duration: 0.35, ease: [0.65, 0, 0.35, 1] };

export default function HamburgerIcon({ open }) {
  return (
    <div className="w-6 h-5 relative flex flex-col justify-between">
      <motion.span
        className="block h-0.5 w-full bg-ink rounded-full origin-center"
        animate={open ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
        transition={spring}
      />
      <motion.span
        className="block h-0.5 w-full bg-ink rounded-full"
        animate={open ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block h-0.5 w-full bg-ink rounded-full origin-center"
        animate={open ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
        transition={spring}
      />
    </div>
  );
}
