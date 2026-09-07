import Image from "next/image";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/shared/MotionWrapper";
import CertificationBadge from "@/components/products/CertificationBadge";

const badges = [
  {
    src: "/assets/images/certifications/iso-9001-badge.png",
    alt: "ISO 9001 certified — quality management",
  },
  {
    src: "/assets/images/certifications/ce-machine-directive-badge.png",
    alt: "CE marked — compliant with the EU Machine Directive",
  },
];

// Real, supplied compliance/industry marks — shown as their own logo strip
// beneath the ISO/CE copy so the section backs up the written claims with
// actual third-party badges, not just the two ISO/CE placeholder tiles
// above (those are still awaiting real artwork — see CertificationBadge).
const complianceLogos = [
  {
    src: "/assets/images/certifications/asme-national-board.png",
    alt: "ASME — Setting the Standard, and The National Board of Boiler and Pressure Vessel Inspectors",
    theme: "light",
  },
  {
    src: "/assets/images/certifications/industry-certifications.png",
    alt: "NAEC, NMEDA, NMEDA Quality Assurance Program, AEMA, and HomeAdvisor Top Rated certification marks",
    theme: "dark",
  },
];

/**
 * Quality-assurance / certification strip for product detail pages.
 * Reused as-is across every product (DuoStep, Aeris Lift, Stairlift HDN) —
 * the certification is company-wide, not product-specific, so the copy and
 * badges never change between products.
 *
 * Badge images live under /assets/images/certifications/ — drop the real
 * ISO 9001 and CE / Machine Directive artwork in using those exact
 * filenames and the fallback badge tiles below disappear automatically,
 * same as every other image slot on this site.
 */
export default function IsoCertifiedSection() {
  return (
    <div>
      <div className="grid md:grid-cols-[auto,1fr] gap-8 md:gap-12 items-center">
        <StaggerGroup className="flex md:flex-col gap-5 justify-center md:justify-start">
          {badges.map((badge) => (
            <StaggerItem key={badge.src}>
              <CertificationBadge src={badge.src} alt={badge.alt} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <FadeUp delay={0.05}>
          <span className="eyebrow mb-3 block">Quality assurance</span>
          <h2 className="heading-md mb-4">ISO certified</h2>
          <div className="text-ink-muted text-lg leading-relaxed space-y-4 max-w-3xl">
            <p>
              Upliftas is ISO-certified according to the ISO 9001 standard for
              quality assurance. Certification is granted through agreements on
              continuous and periodic assessment by an independent third-party
              body that will audit the organisation to ensure that all quality
              processes are followed. That&apos;s your guarantee that we
              consistently deliver quality products and services able to
              fulfil your needs and expectation, along with any legal
              requirement.
            </p>
            <p>
              All Upliftas lifts fulfil the requirements of the EU Machine
              Directive. That&apos;s your guarantee of a safe product that will
              last for years.
            </p>
          </div>
        </FadeUp>
      </div>

      <FadeUp delay={0.1} className="mt-10 pt-10 border-t border-black/10">
        <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-6">
          Backed by industry-recognized certifications
        </p>
        <StaggerGroup className="grid sm:grid-cols-2 gap-5">
          {complianceLogos.map((logo) => (
            <StaggerItem key={logo.src}>
              <div
                className={`h-full rounded-2xl p-6 md:p-7 flex items-center justify-center ${
                  logo.theme === "dark"
                    ? "bg-[#0a1f33] shadow-card"
                    : "bg-white shadow-card"
                }`}
              >
                <div className="relative w-full h-16 md:h-20">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    sizes="(max-width: 640px) 90vw, 45vw"
                    className="object-contain"
                  />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </FadeUp>
    </div>
  );
}
