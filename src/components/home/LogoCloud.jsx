import { FadeUp } from "@/components/shared/MotionWrapper";

const brands = [
  "Harborview Care",
  "Meridian Rehab",
  "Cascade City Fire Dept.",
  "The Oak Room",
  "Willowbrook Retail",
  "Northgate Hospital",
];

export default function LogoCloud() {
  return (
    <FadeUp>
      <p className="text-center text-sm font-semibold uppercase tracking-widest text-ink-muted mb-8">
        Trusted by care teams and facilities across the country
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        {brands.map((brand) => (
          <span
            key={brand}
            className="text-lg md:text-xl font-bold text-ink/30 hover:text-ink/60 transition-colors"
          >
            {brand}
          </span>
        ))}
      </div>
    </FadeUp>
  );
}
