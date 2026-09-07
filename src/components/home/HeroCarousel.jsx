"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import PlaceholderBox from "@/components/ui/PlaceholderBox";
import { heroSlides } from "@/lib/data/hero-slides";

const AUTOPLAY_MS = 6500;

const textContainerVariants = {
  enter: {},
  center: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
  exit: {},
};

const textItemVariants = {
  enter: { opacity: 0, y: 28 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3 } },
};

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback((next) => {
    setIndex((current) => {
      const len = heroSlides.length;
      return ((next % len) + len) % len;
    });
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % heroSlides.length);
    }, AUTOPLAY_MS);
    return () => clearTimeout(timerRef.current);
  }, [index, paused]);

  const slide = heroSlides[index];

  return (
    <section
      className="relative h-[92vh] min-h-[600px] w-full overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {slide.image ? (
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <PlaceholderBox label={slide.title} />
          )}
        </motion.div>
      </AnimatePresence>

      {/*
        Text-readability scrim, tuned for where the copy actually sits
        (bottom-left): a horizontal navy wash that's darkest behind the
        text on the left and dissolves to nearly nothing on the right,
        plus a light bottom-up pass so the eyebrow/title/CTA row always
        has enough contrast regardless of what's directly behind it.
        Two soft-edged layers blending together read as one considered
        treatment rather than a flat tinted box.
      */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "linear-gradient(100deg, rgba(6,16,38,0.88) 0%, rgba(6,16,38,0.66) 26%, rgba(6,16,38,0.32) 52%, rgba(6,16,38,0.08) 74%, rgba(6,16,38,0) 92%)",
            "linear-gradient(to top, rgba(6,16,38,0.65) 0%, rgba(6,16,38,0.18) 40%, rgba(6,16,38,0) 65%)",
          ].join(", "),
        }}
      />

      <Container className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            variants={textContainerVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="max-w-3xl"
          >
            <motion.span
              variants={textItemVariants}
              className="eyebrow text-white/90 mb-4 block"
            >
              {slide.eyebrow}
            </motion.span>
            <motion.h1
              variants={textItemVariants}
              className="heading-xl text-white mb-6"
            >
              {slide.title}
            </motion.h1>
            <motion.p
              variants={textItemVariants}
              className="text-white/90 text-lg max-w-xl mb-8 leading-relaxed"
            >
              {slide.subtitle}
            </motion.p>
            <motion.div
              variants={textItemVariants}
              className="flex flex-wrap gap-4"
            >
              <Button href={slide.ctaPrimary.href} variant="primary">
                {slide.ctaPrimary.label}
              </Button>
              <Button href={slide.ctaSecondary.href} variant="white">
                {slide.ctaSecondary.label}
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </Container>

      {/* Controls */}
      <div className="absolute inset-y-0 left-0 flex items-center z-20">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="ml-3 md:ml-6 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur flex items-center justify-center text-white transition-colors"
        >
          <ChevronLeft size={22} />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center z-20">
        <button
          onClick={next}
          aria-label="Next slide"
          className="mr-3 md:mr-6 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur flex items-center justify-center text-white transition-colors"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Indicators + autoplay progress */}
      <div className="absolute bottom-8 left-0 w-full z-20">
        <Container className="flex items-center gap-3">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="relative h-1.5 w-16 rounded-full bg-white/25 overflow-hidden"
            >
              {i === index && (
                <motion.span
                  key={`${slide.id}-progress`}
                  initial={{ width: "0%" }}
                  animate={{ width: paused ? undefined : "100%" }}
                  transition={{
                    duration: paused ? 0 : AUTOPLAY_MS / 1000,
                    ease: "linear",
                  }}
                  className="absolute inset-y-0 left-0 bg-white rounded-full"
                />
              )}
              {i !== index && (
                <span className="absolute inset-0 bg-white/0" />
              )}
            </button>
          ))}
        </Container>
      </div>
    </section>
  );
}
