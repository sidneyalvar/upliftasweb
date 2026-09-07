"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ParallaxImage from "@/components/ui/ParallaxImage";

export default function CaseScrollCard({ item }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative w-full aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/3] rounded-2xl overflow-hidden"
    >
      <ParallaxImage
        src={item.thumbnail}
        alt={item.title}
        className="absolute inset-0"
        imgClassName="transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 92vw, (max-width: 1024px) 46vw, 32vw"
        range={8}
      />
      {/*
        Text-readability scrim: a blue wash, darkest at the bottom (where
        the title/excerpt/CTAs sit) and fading to fully transparent at the
        top, so the photo itself stays visible through the upper two-thirds
        of the card instead of being washed out.
      */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 via-primary-dark/14 to-primary-dark/0" />

      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/75 mb-2">
          {item.product}
        </span>
        <h3 className="text-white text-xl md:text-2xl font-extrabold uppercase leading-tight mb-3 max-w-[90%] [text-shadow:0_1px_12px_rgba(6,16,38,0.55)]">
          {item.title}
        </h3>
        <p className="text-white/85 text-sm leading-relaxed mb-5 line-clamp-2 max-w-[92%] [text-shadow:0_1px_8px_rgba(6,16,38,0.5)]">
          {item.excerpt}
        </p>
        <div className="flex flex-wrap gap-3 text-sm font-semibold">
          <Link
            href={`/cases/${item.slug}`}
            className="rounded-full bg-white text-ink px-5 py-2.5 hover:bg-secondary transition-colors"
          >
            View Case
          </Link>
          <Link
            href={`/products/${item.productSlug}`}
            className="rounded-full border border-white/50 bg-white/10 text-white px-5 py-2.5 backdrop-blur-sm hover:bg-white/20 hover:border-white/70 transition-colors"
          >
            View product
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
