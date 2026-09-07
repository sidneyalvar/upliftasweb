import { Suspense } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { FadeUp } from "@/components/shared/MotionWrapper";
import ContactForm from "@/components/shared/ContactForm";
import { siteConfig } from "@/lib/site-config";

function ContactFormSkeleton() {
  return (
    <div className="rounded-3xl bg-white shadow-card p-6 md:p-10 animate-pulse space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="h-12 rounded-xl bg-surface-muted" />
        <div className="h-12 rounded-xl bg-surface-muted" />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="h-12 rounded-xl bg-surface-muted" />
        <div className="h-12 rounded-xl bg-surface-muted" />
      </div>
      <div className="h-28 rounded-xl bg-surface-muted" />
      <div className="h-12 w-40 rounded-full bg-surface-muted" />
    </div>
  );
}

export default function ContactSection() {
  return (
    <div id="contact" className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
      <FadeUp className="lg:col-span-2">
        <span className="eyebrow mb-3 block">Free consultation</span>
        <h2 className="heading-lg mb-4">Let&apos;s find the right solution</h2>
        <p className="text-ink-muted text-lg leading-relaxed mb-8">
          Tell us about the space and who it&apos;s for. A specialist will
          follow up with next steps — no pressure, no obligation.
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
            <span className="text-sm text-ink-muted">
              {siteConfig.contact.address}
            </span>
          </li>
          <li className="flex items-center gap-3">
            <Phone size={18} className="text-primary shrink-0" />
            <span className="text-sm font-semibold">
              <a
                href={`tel:${siteConfig.contact.phoneHref}`}
                className="hover:text-primary transition-colors"
              >
                {siteConfig.contact.phone}
              </a>
              <span className="text-ink-muted font-normal"> / </span>
              <a
                href={`tel:${siteConfig.contact.phone2Href}`}
                className="hover:text-primary transition-colors"
              >
                {siteConfig.contact.phone2}
              </a>
            </span>
          </li>
          <li className="flex items-center gap-3">
            <Mail size={18} className="text-primary shrink-0" />
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-sm font-semibold hover:text-primary transition-colors"
            >
              {siteConfig.contact.email}
            </a>
          </li>
        </ul>
      </FadeUp>

      <FadeUp delay={0.1} className="lg:col-span-3">
        <Suspense fallback={<ContactFormSkeleton />}>
          <ContactForm />
        </Suspense>
      </FadeUp>
    </div>
  );
}
