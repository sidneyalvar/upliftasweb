import Image from "next/image";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/shared/MotionWrapper";

const milestones = [
  { label: "Founded", value: "2011" },
  { label: "Headquarters", value: "Boston, Massachusetts" },
  { label: "Ownership", value: "Independent, privately held" },
  { label: "Reach", value: "Distributor network across North America" },
];

/**
 * A short company-background section for the contact page — gives a
 * visitor who's about to hand over their details a reason to trust who
 * they're handing them to. Laid out as text + milestones on one side and
 * a company photo on the other, so the section reads as "about us" rather
 * than a wall of text.
 */
export default function AboutCompanySection() {
  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
      <div>
        <FadeUp className="max-w-2xl mb-10">
          <span className="eyebrow mb-3 block">About the company</span>
          <h2 className="heading-md mb-4">Built by people who take access personally</h2>
          <div className="text-ink-muted text-lg leading-relaxed space-y-4">
            <p>
              Upliftas started with a simple frustration: too many good
              buildings had one bad staircase standing between them and the
              people who needed to use them. We set out to design equipment
              that solves that problem properly — engineered to a clinical
              safety standard, but never at the expense of how a space
              actually looks and feels.
            </p>
            <p>
              We&apos;re an independent, privately held company, which means every
              product decision is made by the people who have to stand behind
              it — not a quarterly roadmap. That&apos;s why our lineup stays
              deliberately small: three products, each refined over years of
              real installations, rather than a catalog we can&apos;t fully
              support.
            </p>
            <p>
              Our mission is straightforward — equal, dignified access for
              everyone, in every kind of building. Not as an afterthought
              bolted onto a design after the fact, but as something worth
              engineering well from the start.
            </p>
          </div>
        </FadeUp>

        <StaggerGroup className="grid grid-cols-2 gap-6">
          {milestones.map((m) => (
            <StaggerItem key={m.label}>
              <div className="rounded-2xl bg-secondary/60 p-5">
                <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted block mb-1">
                  {m.label}
                </span>
                <span className="font-bold">{m.value}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      {/*
        Company photo — sticks alongside the text on large screens so it
        stays in view while the copy scrolls. Real Upliftas photo, served
        from /assets/images (replaces the earlier Unsplash stand-in).
      */}
      <FadeUp delay={0.1} className="lg:sticky lg:top-28">
        <div className="relative aspect-[4/5] md:aspect-[4/3] lg:aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-card bg-secondary">
          <Image
            src="/assets/images/about-us-upliftas.png"
            alt="The Upliftas team collaborating in the office"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover object-center"
          />
        </div>
      </FadeUp>
    </div>
  );
}
