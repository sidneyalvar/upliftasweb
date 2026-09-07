"use client";

import { useEffect, useState } from "react";

/**
 * Returns a value chosen from a set of `[minWidth, value]` tiers based on the
 * current window width, re-evaluated on resize/orientation change.
 *
 * Tiers don't need to be sorted, and don't need to cover every breakpoint —
 * the tier with the largest `minWidth` that is still <= the current width
 * wins, so gaps just fall through to the next tier down.
 *
 * Example:
 *   const step = useResponsiveValue([
 *     [0, 10],     // < 480px
 *     [480, 14],   // >= 480px
 *     [768, 18],   // >= 768px
 *     [1024, 24],  // >= 1024px
 *     [1280, 30],  // >= 1280px
 *   ]);
 */
export function useResponsiveValue(tiers, fallback = tiers[0]?.[1]) {
  const [value, setValue] = useState(fallback);

  useEffect(() => {
    const sorted = [...tiers].sort((a, b) => a[0] - b[0]);

    function pick() {
      const width = window.innerWidth;
      let next = sorted[0]?.[1] ?? fallback;
      for (const [minWidth, tierValue] of sorted) {
        if (width >= minWidth) next = tierValue;
      }
      setValue(next);
    }

    pick();
    window.addEventListener("resize", pick);
    window.addEventListener("orientationchange", pick);
    return () => {
      window.removeEventListener("resize", pick);
      window.removeEventListener("orientationchange", pick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(tiers)]);

  return value;
}
