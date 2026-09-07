import { FadeUp } from "@/components/shared/MotionWrapper";
import Section from "@/components/shared/Section";
import CaseFilterGallery from "@/components/cases/CaseFilterGallery";
import { cases } from "@/lib/data/cases";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Case Studies",
  description:
    "See how care homes, restaurants, clinics, schools, and emergency services use DuoStep, Aeris Lift, and Stairlift HDN day to day.",
  path: "/cases",
  keywords: ["DuoStep case studies", "accessibility lift case studies", "Upliftas"],
});

export default function CasesPage() {
  return (
    <>
      <Section className="pt-16 pb-8">
        <FadeUp className="max-w-2xl">
          <span className="eyebrow mb-3 block">Case studies</span>
          <h1 className="heading-lg mb-4">Proven in the field</h1>
          <p className="text-ink-muted text-lg leading-relaxed">
            Real facilities, real outcomes — explore how our products are
            used across care homes, hospitality, rehabilitation, schools,
            and emergency response. Filter by product to see it in its own
            element.
          </p>
        </FadeUp>
      </Section>

      <CaseFilterGallery cases={cases} />
    </>
  );
}
