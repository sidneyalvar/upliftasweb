import HeroCarousel from "@/components/home/HeroCarousel";
import StatsBand from "@/components/home/StatsBand";
import ProductGrid from "@/components/home/ProductGrid";
import CasesScrollSection from "@/components/home/CasesScrollSection";
import NewsSection from "@/components/home/NewsSection";
import LogoCloud from "@/components/home/LogoCloud";
import CertificationsSection from "@/components/home/CertificationsSection";
import ContactCTABand from "@/components/shared/ContactCTABand";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import AmbientGlow from "@/components/ui/AmbientGlow";
import Section from "@/components/shared/Section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "DuoStep Staircase Platform Lift | Upliftas",
  description:
    "DuoStep turns an everyday staircase into a powered accessibility lift in seconds — no permanent ramp, no lost floor space. Explore DuoStep, Aeris Lift, and Stairlift HDN.",
  path: "",
  keywords: [
    "DuoStep",
    "DuoStep staircase lift",
    "staircase platform lift",
    "wheelchair accessibility lift",
    "Upliftas",
  ],
});

export default function HomePage() {
  return (
    <>
      <HeroCarousel />

      <Section className="!pb-0 !pt-16">
        <LogoCloud />
      </Section>

      <Section className="relative overflow-hidden">
        <AmbientGlow tone="light" />
        <div className="relative z-10">
          <StatsBand />
        </div>
      </Section>

      <Section>
        <ProductGrid />
      </Section>

      <CasesScrollSection />

      <Section>
        <NewsSection />
      </Section>

      <Section className="relative overflow-hidden bg-surface-muted">
        <AmbientGlow tone="light" />
        <div className="relative z-10">
          <TestimonialsSection />
        </div>
      </Section>

      <Section>
        <CertificationsSection />
      </Section>

      <Section>
        <ContactCTABand />
      </Section>
    </>
  );
}
