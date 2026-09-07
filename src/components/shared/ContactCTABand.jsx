import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { FadeUp } from "@/components/shared/MotionWrapper";

/**
 * A slim "next step" banner that links out to the dedicated /contact page,
 * optionally carrying a product slug so the contact form arrives with that
 * product already selected. Used anywhere we want to prompt a visitor
 * toward the contact form without embedding the full form (and, per the
 * one-contact-page rule, without embedding the sales team roster) again.
 */
export default function ContactCTABand({
  eyebrow = "Ready to move forward?",
  title = "Let's find the right solution for your space",
  description = "Tell us a little about the project and a specialist will follow up with next steps.",
  productSlug,
  buttonLabel = "Continue to contact form",
}) {
  const href = productSlug ? `/contact?product=${productSlug}` : "/contact";

  return (
    <FadeUp className="rounded-3xl bg-ink px-8 py-12 md:px-14 md:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
      <div>
        <span className="eyebrow text-primary-light mb-3 block">{eyebrow}</span>
        <h2 className="heading-md text-white mb-3">{title}</h2>
        <p className="text-white/70 max-w-lg leading-relaxed">{description}</p>
      </div>
      <Button href={href} variant="white" className="shrink-0 group/cta">
        {buttonLabel}
        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover/cta:translate-x-1"
        />
      </Button>
    </FadeUp>
  );
}
