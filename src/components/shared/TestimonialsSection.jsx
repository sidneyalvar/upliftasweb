"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { FadeUp } from "@/components/shared/MotionWrapper";
import { testimonials } from "@/lib/data/testimonials";
import { products } from "@/lib/data/products";

const AUTOPLAY_MS = 7000;

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const slideVariants = {
  enter: (direction) => ({ opacity: 0, x: direction > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -40 : 40,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  }),
};

/**
 * Distributor/partner quotes — used on the homepage (general trust signal)
 * and again on the contact page (reassurance right before someone hands
 * over their details). Renders one testimonial at a time, paired with a
 * photo of the product it's about, so it's clear at a glance what's being
 * talked about rather than just a name and a quote. Autoplays (pauses on
 * hover), supports drag/swipe, and always shows a prev/next + dots control
 * row so it's obvious how to navigate on every screen size.
 */
export default function TestimonialsSection({
  eyebrow = "What distributors say",
  title = "Trusted by the people who install and support it",
  limit,
}) {
  const items = limit ? testimonials.slice(0, limit) : testimonials;
  const [[index, direction], setSlide] = useState([0, 0]);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback(
    (nextIndex, dir) => {
      setSlide(([current]) => {
        const len = items.length;
        const wrapped = ((nextIndex % len) + len) % len;
        return [wrapped, dir ?? (nextIndex > current ? 1 : -1)];
      });
    },
    [items.length]
  );

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  useEffect(() => {
    if (paused || items.length <= 1) return;
    timerRef.current = setTimeout(() => {
      setSlide(([current]) => [(current + 1) % items.length, 1]);
    }, AUTOPLAY_MS);
    return () => clearTimeout(timerRef.current);
  }, [index, paused, items.length]);

  // Left/right arrow keys move the slider — ignored while the person is
  // typing in a form field elsewhere on the page (e.g. the contact form
  // this section sits below).
  useEffect(() => {
    if (items.length <= 1) return;
    function onKeyDown(e) {
      const tag = e.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || e.target?.isContentEditable) {
        return;
      }
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [next, prev, items.length]);

  const t = items[index];
  const product = products.find((p) => p.slug === t.productSlug);
  const canSlide = items.length > 1;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <FadeUp className="max-w-2xl mb-10 md:mb-14">
        <span className="eyebrow mb-3 block">{eyebrow}</span>
        <h2 className="heading-md">{title}</h2>
      </FadeUp>

      <div className="relative rounded-3xl bg-white shadow-card overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={t.name}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag={canSlide ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={(_, info) => {
              const threshold = 60;
              if (info.offset.x < -threshold) next();
              else if (info.offset.x > threshold) prev();
            }}
            className="grid md:grid-cols-5"
          >
            {/* Product photo — grounds the quote in something concrete
                instead of leaving it as a vague, unverifiable endorsement. */}
            <div className="relative aspect-[16/9] md:aspect-auto md:col-span-2 bg-secondary">
              {product ? (
                <Image
                  src={product.thumbnail}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-primary/40 text-sm font-semibold">
                  {t.company}
                </div>
              )}
              {product && (
                <div className="absolute bottom-4 left-4 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 text-xs font-semibold text-ink shadow-soft">
                  {product.name}
                </div>
              )}
            </div>

            <div className="md:col-span-3 flex flex-col justify-center p-8 md:p-10 lg:p-12">
              <Quote size={32} className="text-primary/25 mb-4" fill="currentColor" />
              <div className="flex gap-0.5 mb-5" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400" fill="currentColor" />
                ))}
              </div>
              <p className="text-ink text-lg md:text-xl leading-relaxed mb-8">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  aria-hidden="true"
                  className="w-12 h-12 shrink-0 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-sm"
                >
                  {initials(t.name)}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold truncate">{t.name}</p>
                  <p className="text-ink-muted text-sm truncate">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
              {product && (
                <Link
                  href={`/products/${product.slug}`}
                  className="mt-5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors w-fit"
                >
                  On {product.name} →
                </Link>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {canSlide && (
        <div className="flex items-center justify-center gap-5 mt-8">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-11 h-11 rounded-full border border-black/10 flex items-center justify-center text-ink hover:bg-secondary hover:border-transparent transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {items.map((item, i) => (
              <button
                key={item.name}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial from ${item.name}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-primary" : "w-1.5 bg-primary/20 hover:bg-primary/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="w-11 h-11 rounded-full border border-black/10 flex items-center justify-center text-ink hover:bg-secondary hover:border-transparent transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
