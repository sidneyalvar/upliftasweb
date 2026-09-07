"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Footer from "@/components/ui/Footer";

export default function CurvedFooterTransition() {
  const wrapperRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end end"],
  });

  const path = useTransform(scrollYProgress, (p) => {
    const curve = 64 * p;
    return `M0,${curve} Q720,${curve * -1.1} 1440,${curve} L1440,120 L0,120 Z`;
  });

  return (
    <div ref={wrapperRef}>
      <div className="relative bg-white overflow-hidden">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="block w-full h-[56px] md:h-[88px]"
        >
          <motion.path d={path} className="fill-[#0a1f33]" />
        </svg>
      </div>
      <Footer />
    </div>
  );
}
