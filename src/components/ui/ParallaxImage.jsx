"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import PlaceholderBox from "@/components/ui/PlaceholderBox";

/**
 * Drop-in replacement for a `<div className="relative ... overflow-hidden">
 * <Image fill /></div>` block. The image (or placeholder) sits inside a
 * slightly oversized, translating layer so it drifts more slowly than its
 * surroundings — a restrained parallax, not a flashy one.
 *
 * By default the drift is vertical, tied to the image's own scroll position
 * (classic "this section is scrolling past" parallax). Pass `parallaxX` — a
 * Framer Motion MotionValue in pixels — when the parent already has a scroll
 * signal of its own to sync to (e.g. a horizontally scroll-jacked gallery);
 * in that case the drift becomes horizontal and rides that shared value
 * instead of computing a second, unrelated scroll listener.
 *
 * A missing `src`, or one that fails to actually load (404/decode error),
 * renders a yellow placeholder instead of a broken image, so it's obvious
 * during development what still needs a real photo. We detect this via the
 * `<Image>`'s own onError, not by guessing from the path string — a real
 * file that happens to live under /assets/ still renders normally.
 */
export default function ParallaxImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  range = 12,
  parallaxX,
}) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [failed, setFailed] = useState(false);

  // Reset the error flag if the parent swaps in a different src.
  useEffect(() => {
    setFailed(false);
  }, [src]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yScroll = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`]);

  const motionStyle = prefersReducedMotion
    ? {}
    : parallaxX
    ? { x: parallaxX }
    : { y: yScroll };

  const isPlaceholder = !src || failed;

  // The wrapper below always carries its own `relative` class. If a caller
  // passes `className="absolute inset-0"` (every full-bleed hero and card
  // image on the site does this) to make the image fill and detach from
  // its parent's layout flow, that `absolute` was silently losing to the
  // built-in `relative` — same specificity, but Tailwind's generated
  // stylesheet defines `.relative` after `.absolute`, so the later rule
  // wins the cascade. The image never actually left the document flow, so
  // any sibling meant to sit *on top of* it (like a hero's text block)
  // instead got pushed down, below the image's own box, and out of the
  // parent's overflow-hidden viewport — invisible instead of overlapping.
  // Dropping `relative` whenever the caller supplies `absolute` avoids the
  // clash and lets the intended stacking actually happen.
  const wantsAbsolute = /(^|\s)absolute(\s|$)/.test(className);

  return (
    <div
      ref={ref}
      className={`${wantsAbsolute ? "" : "relative"} overflow-hidden h-full ${className}`}
    >
      <motion.div
        style={motionStyle}
        className="absolute -top-[15%] -bottom-[15%] left-0 right-0"
      >
        {isPlaceholder ? (
          <PlaceholderBox label={alt} className={imgClassName} />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={`object-cover ${imgClassName}`}
            onError={() => setFailed(true)}
          />
        )}
      </motion.div>
    </div>
  );
}
