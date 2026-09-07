"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import CaseScrollCard from "@/components/home/CaseScrollCard";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/shared/MotionWrapper";
import { useResponsiveValue } from "@/lib/hooks/useResponsiveValue";
import { groupIntoColumns } from "@/lib/utils";
import { cases } from "@/lib/data/cases";


// How many columns the masonry grid shows at each breakpoint, and how much
// extra padding-top each successive column gets so the set reads as a
// staircase rather than a flat row. Both are tuned per breakpoint so the
// effect stays subtle on a single mobile column and more pronounced once
// there's room for 2-3 columns side by side.
const COLUMN_TIERS = [
  [0, 1], // mobile
  [768, 2], // md (tablet)
  [1280, 3], // xl+ (desktop)
];
const STEP_TIERS = [
  [0, 0], // mobile — single column, no stagger needed
  [768, 56], // md
  [1280, 90], // xl+
];

function SectionHeading() {
  return (
    <Container className="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6">
      <FadeUp>
        <span className="eyebrow text-primary-light mb-2 md:mb-3 block">
          Upliftas cases
        </span>
        <h2 className="text-2xl md:text-4xl font-bold leading-tight tracking-tight text-white mb-2 md:mb-4">
          Cases in different environments
        </h2>
        <p className="text-white/70 text-sm md:text-lg leading-relaxed max-w-xl hidden sm:block">
          Every environment where our equipment earns its place, from care
          homes to fire departments.
        </p>
      </FadeUp>
      <Button href="/cases" variant="white" className="shrink-0">
        View all cases
      </Button>
    </Container>
  );
}

/**
 * A responsive masonry grid — cases are grouped into columns, and each
 * successive column carries a small ascending top offset so the set reads
 * as a gentle staircase rather than a flat row of tiles. This is a normal,
 * un-pinned section: it scrolls with the page like everything else, no
 * scroll-jacking or horizontal translation involved.
 *
 * Only shows a preview (the first 6) rather than the full case library —
 * the "View all cases" button above sends anyone who wants more to the
 * dedicated /cases page, which has its own filterable, full-size gallery.
 */
const HOMEPAGE_CASE_LIMIT = 6;

export default function CasesScrollSection() {
  const numColumns = useResponsiveValue(COLUMN_TIERS, 1);
  const step = useResponsiveValue(STEP_TIERS, 0);
  const previewCases = cases.slice(0, HOMEPAGE_CASE_LIMIT);
  const columns = groupIntoColumns(previewCases, numColumns);

  return (
    <section className="relative bg-[#0a1f33] py-16 md:py-20 lg:py-24">
      <SectionHeading />
      <Container>
        <StaggerGroup className="flex flex-col md:flex-row gap-6 xl:gap-8" staggerDelay={0.08}>
          {columns.map((column, colIndex) => (
            <div
              key={colIndex}
              style={{ paddingTop: `${colIndex * step}px` }}
              className="flex-1 flex flex-col gap-6 xl:gap-8"
            >
              {column.map((item) => (
                <StaggerItem key={item.slug}>
                  <CaseScrollCard item={item} />
                </StaggerItem>
              ))}
            </div>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
