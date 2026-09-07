import Section from "@/components/shared/Section";
import { BlurReveal } from "@/components/shared/MotionWrapper";
import ContactSection from "@/components/contact/ContactSection";
import AboutCompanySection from "@/components/contact/AboutCompanySection";
import CompanyStaffSection from "@/components/contact/CompanyStaffSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import AmbientGlow from "@/components/ui/AmbientGlow";
import Container from "@/components/ui/Container";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with Upliftas about DuoStep, a vertical lift platform, or mobility training equipment for your building.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      {/*
        Banner styled to match the dark image-and-gradient treatment used
        at the top of every product page (see src/app/products/[slug]/page.js)
        so the contact page opens with the same visual weight as the rest
        of the site, rather than a plain text header. Stairlift HDN's hero
        photo doubles here since it's the most "welcoming" of the three
        product shots — a person on a staircase, not a piece of equipment
        in isolation.
      */}
      <section className="relative h-[42vh] min-h-[320px] w-full overflow-hidden">
        <ParallaxImage
          src="/assets/images/Stairlift-hero.WebP"
          alt="Stairlift HDN staircase accessibility equipment"
          className="absolute inset-0"
          sizes="100vw"
          priority
          range={8}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06102A]/78 via-[#06102A]/28 to-[#06102A]/8" />
        <Container className="relative z-10 h-full flex flex-col justify-end pb-16">
          <span className="eyebrow text-white/90 mb-3">Get in touch</span>
          <BlurReveal>
            <h1 className="heading-lg text-white max-w-2xl">Contact us</h1>
          </BlurReveal>
        </Container>
      </section>

      <Section className="!pt-12 md:!pt-16">
        <ContactSection />
      </Section>

      <Section className="bg-surface-muted">
        <AboutCompanySection />
      </Section>

      <Section>
        <CompanyStaffSection />
      </Section>

      <Section className="relative overflow-hidden bg-surface-muted">
        <AmbientGlow tone="light" />
        <div className="relative z-10">
          <TestimonialsSection
            eyebrow="Hear it from our partners"
            title="What distributors say before you talk to us"
            limit={3}
          />
        </div>
      </Section>
    </>
  );
}
