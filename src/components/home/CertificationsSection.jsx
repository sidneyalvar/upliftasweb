import Image from "next/image";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/shared/MotionWrapper";

/**
 * "Certified & Recognized By" trust band for the homepage. Two cards,
 * grouped by the kind of trust each set of marks signals rather than
 * dumped into one strip:
 *
 *  - Engineering & safety: ASME + National Board — shown on a light card
 *    since the source artwork already has a near-white background; we
 *    keyed that background out to transparent so it sits flush against
 *    the card with no visible seam.
 *  - Industry & service: NAEC / NMEDA / QAP / AEMA / HomeAdvisor — the
 *    source graphic already has its own dark, evenly-lit backdrop, so we
 *    keep it as one image inside a dark card rather than trying to cut
 *    five differently-styled logos out of a photo background (that kind
 *    of aggressive chroma-keying reliably leaves halos/fades on real
 *    logo art — worse than just using the vendor-supplied graphic as-is).
 */
export default function CertificationsSection() {
  return (
    <FadeUp>
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="eyebrow mb-3 block">Compliance &amp; industry standards</span>
        <h2 className="heading-md">Certified and recognized by</h2>
      </div>

      <StaggerGroup className="grid md:grid-cols-2 gap-6">
        <StaggerItem>
          <div className="h-full rounded-3xl bg-white shadow-card p-8 md:p-10 flex flex-col items-center justify-center text-center">
            <div className="relative w-full h-24 md:h-28 mb-6">
              <Image
                src="/assets/images/certifications/asme-national-board.png"
                alt="ASME — Setting the Standard, and The National Board of Boiler and Pressure Vessel Inspectors"
                fill
                sizes="(max-width: 768px) 90vw, 40vw"
                className="object-contain"
              />
            </div>
            <p className="text-sm font-semibold text-ink-muted uppercase tracking-wide">
              Engineering &amp; safety standards
            </p>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="h-full rounded-3xl bg-[#0a1f33] shadow-card p-8 md:p-10 flex flex-col items-center justify-center text-center overflow-hidden">
            <div className="relative w-full h-24 md:h-28 mb-6">
              <Image
                src="/assets/images/certifications/industry-certifications.png"
                alt="NAEC, NMEDA, NMEDA Quality Assurance Program, AEMA, and HomeAdvisor Top Rated certification marks"
                fill
                sizes="(max-width: 768px) 90vw, 40vw"
                className="object-contain rounded-xl"
              />
            </div>
            <p className="text-sm font-semibold text-white/70 uppercase tracking-wide">
              Industry associations &amp; ratings
            </p>
          </div>
        </StaggerItem>
      </StaggerGroup>
    </FadeUp>
  );
}
