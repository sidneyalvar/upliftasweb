"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Linkedin, Facebook, Youtube } from "lucide-react";
import Container from "@/components/ui/Container";
import CaseGalleryCard from "@/components/cases/CaseGalleryCard";
import { useResponsiveValue } from "@/lib/hooks/useResponsiveValue";
import { groupIntoColumns } from "@/lib/utils";
import { products } from "@/lib/data/products";
import { siteConfig } from "@/lib/site-config";

// Same staircase tiers as the homepage cases section (CasesScrollSection),
// so the full gallery reads as the same visual language rather than a
// different grid system.
const COLUMN_TIERS = [
  [0, 1], // mobile
  [768, 2], // md (tablet)
  [1280, 3], // xl+ (desktop)
];
const STEP_TIERS = [
  [0, 0], // mobile — single column, no stagger needed
  [768, 48], // md
  [1280, 76], // xl+
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Dark staircase-style masonry gallery of case studies, filterable by
 * product so a visitor who only cares about (say) DuoStep can jump
 * straight to those cases. Columns carry an ascending top offset (same
 * technique as the homepage cases section) so the grid reads as a gentle
 * staircase rather than a flat row, and every card fades/rises in with a
 * staggered entrance — on first load, and again each time the filter
 * changes (the `key={activeFilter}` remount is what makes the animation
 * replay instead of only firing once on initial scroll-into-view).
 */
export default function CaseFilterGallery({ cases }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const numColumns = useResponsiveValue(COLUMN_TIERS, 1);
  const step = useResponsiveValue(STEP_TIERS, 0);

  const filters = useMemo(
    () => [{ slug: "all", name: "All cases" }, ...products.map((p) => ({ slug: p.slug, name: p.name }))],
    []
  );

  const filteredCases = useMemo(
    () =>
      activeFilter === "all"
        ? cases
        : cases.filter((c) => c.productSlug === activeFilter),
    [cases, activeFilter]
  );

  const columns = groupIntoColumns(filteredCases, numColumns);

  return (
    <section className="relative bg-gradient-to-b from-[#0a1f33] via-[#0f2a4a] to-[#173a63] py-16 md:py-20">
      {/* Follow-us rail — visible on larger screens where there's room
          alongside the grid without crowding the cards. */}
      <div className="hidden lg:flex flex-col items-center gap-5 absolute left-6 xl:left-10 top-24">
        <SocialIcon href={siteConfig.social.facebook} icon={Facebook} label="Facebook" />
        <SocialIcon href={siteConfig.social.linkedin} icon={Linkedin} label="LinkedIn" />
        <SocialIcon href={siteConfig.social.youtube} icon={Youtube} label="YouTube" />
        <div className="w-px h-12 bg-white/20" />
        <span className="text-white/50 text-[10px] font-semibold uppercase tracking-[0.2em] [writing-mode:vertical-rl] rotate-180">
          Follow us
        </span>
      </div>

      <Container className="lg:pl-16 xl:pl-20">
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.slug}
              onClick={() => setActiveFilter(f.slug)}
              aria-pressed={activeFilter === f.slug}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-all duration-200 ${
                activeFilter === f.slug
                  ? "bg-primary border-primary text-white shadow-md"
                  : "border-white/20 text-white/70 hover:border-white hover:text-white"
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>

        <motion.div
          key={activeFilter}
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="flex flex-col md:flex-row gap-6 xl:gap-8"
        >
          {columns.map((column, colIndex) => (
            <div
              key={colIndex}
              style={{ paddingTop: `${colIndex * step}px` }}
              className="flex-1 flex flex-col gap-6 xl:gap-8"
            >
              {column.map((item) => {
                const originalIndex = filteredCases.findIndex((c) => c.slug === item.slug);
                return (
                  <motion.div key={item.slug} variants={itemVariants}>
                    <CaseGalleryCard item={item} index={originalIndex} />
                  </motion.div>
                );
              })}
            </div>
          ))}
        </motion.div>

        {filteredCases.length === 0 && (
          <p className="text-white/60 text-center py-16">
            No cases for this product yet — check back soon.
          </p>
        )}
      </Container>
    </section>
  );
}

function SocialIcon({ href, icon: Icon, label }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-colors"
    >
      <Icon size={16} />
    </Link>
  );
}
