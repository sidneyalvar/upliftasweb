"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ParallaxImage from "@/components/ui/ParallaxImage";

// Cycling through a few different aspect ratios (rather than one fixed
// shape) is what actually makes the grid read as masonry — the varying
// image heights are what break the rows, not just the column count.
const ASPECTS = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[4/3]"];

export default function CaseGalleryCard({ item, index = 0 }) {
  const aspect = ASPECTS[index % ASPECTS.length];

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative w-full ${aspect} rounded-2xl overflow-hidden`}
    >
      <ParallaxImage
        src={item.thumbnail}
        alt={item.title}
        className="absolute inset-0"
        imgClassName="transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 92vw, (max-width: 1024px) 46vw, 30vw"
        range={8}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#06102A]/90 via-[#06102A]/40 to-[#06102A]/5" />

      <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-3">
        <div>
          <span className="text-primary-light text-xs font-semibold uppercase tracking-[0.16em] mb-2 block">
            {item.product}
          </span>
          <h3 className="text-white font-bold uppercase leading-tight tracking-tight text-lg sm:text-xl mb-2">
            {item.title}
          </h3>
          <p className="text-white/75 text-sm leading-relaxed line-clamp-2">
            {item.excerpt}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <Link
            href={`/cases/${item.slug}`}
            className="rounded-lg bg-white text-ink text-xs font-semibold px-4 py-2 hover:bg-secondary transition-colors"
          >
            View Case
          </Link>
          <Link
            href={`/products/${item.productSlug}`}
            className="rounded-lg border border-white/50 text-white text-xs font-semibold px-4 py-2 hover:bg-white/10 transition-colors"
          >
            View product
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
