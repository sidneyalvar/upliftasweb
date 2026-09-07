import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { CheckCircle2, PlusCircle, Download } from "lucide-react";
import Section from "@/components/shared/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { BlurReveal, FadeUp, StaggerGroup, StaggerItem } from "@/components/shared/MotionWrapper";
import ProductGallery from "@/components/products/ProductGallery";
import RelatedCaseCard from "@/components/products/RelatedCaseCard";
import PickSolutionSection from "@/components/products/PickSolutionSection";
import IsoCertifiedSection from "@/components/products/IsoCertifiedSection";
import ContactCTABand from "@/components/shared/ContactCTABand";
import AmbientGlow from "@/components/ui/AmbientGlow";
import { products, getProductBySlug, getProductCode } from "@/lib/data/products";
import { cases } from "@/lib/data/cases";
import { buildMetadata, productJsonLd, breadcrumbJsonLd } from "@/lib/seo";

// Code-split rather than bundled into the route's initial JS — none of
// these are needed for first paint (they're below the fold, and the video
// player already gates its own playback on scroll position), so loading
// their JS as a separate chunk once the browser gets to them keeps the
// initial page weight down without changing what's rendered.
const VideoShowcase = dynamic(() => import("@/components/products/VideoShowcase"));
const MagnifyImage = dynamic(() => import("@/components/products/MagnifyImage"));
const StepModelSelector = dynamic(() => import("@/components/products/StepModelSelector"));

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  const code = getProductCode(product);
  return buildMetadata({
    title: `${product.name} ${product.modelVersion} (${product.sku}) — ${product.tagline}`,
    description: `${product.shortDescription} Model: ${code}.`,
    path: `/products/${product.slug}`,
    image: product.heroImage,
    keywords: [
      product.name,
      code,
      product.sku,
      `${product.name} ${product.modelVersion}`,
      product.category,
      "Upliftas",
      ...product.useCases,
    ],
  });
}

export default function ProductDetailPage({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const relatedCases = cases.filter((c) => c.productSlug === product.slug);
  const hasStepModels = Array.isArray(product.stepModels) && product.stepModels.length > 0;

  return (
    <>
      {/* Descriptive structured data (name/image/SKU/model) — deliberately
          not typed as schema.org "Product", since Google requires a
          Product entity to carry offers, review, or aggregateRating, and
          Upliftas doesn't publish per-unit pricing or have genuine
          per-product review data. See the comment on productJsonLd() in
          lib/seo.js for the full reasoning. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }}
      />
      {/* Breadcrumb trail Google can show under the search result instead
          of the bare URL. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "" },
              { name: "Products", path: "/products" },
              { name: product.name, path: `/products/${product.slug}` },
            ])
          ),
        }}
      />
      <section className="relative h-[50vh] min-h-[360px] w-full overflow-hidden">
        <ParallaxImage
          src={product.heroImage}
          alt={product.name}
          className="absolute inset-0"
          sizes="100vw"
          priority
          range={8}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06102A]/78 via-[#06102A]/28 to-[#06102A]/8" />
        <Container className="relative z-10 h-full flex flex-col justify-end pb-16">
          <span className="eyebrow text-white/90 mb-3">{product.category}</span>
          <BlurReveal>
            <h1 className="heading-xl text-white max-w-2xl mb-4">
              {product.name}
            </h1>
          </BlurReveal>
          <p className="text-white/90 text-lg max-w-xl mb-3">{product.tagline}</p>
          <p className="text-white/60 text-sm font-medium tracking-wide">
            Model: {getProductCode(product)}
          </p>
        </Container>
      </section>

      <Section>
        <div className="grid md:grid-cols-3 gap-12">
          <FadeUp className="md:col-span-2">
            <h2 className="heading-md mb-4">Overview</h2>
            <p className="text-ink-muted text-lg leading-relaxed mb-10">
              {product.shortDescription}
            </p>

            <h3 className="text-xl font-bold mb-6">Key features</h3>
            <StaggerGroup className="grid sm:grid-cols-2 gap-6 mb-10">
              {product.features.map((feature) => (
                <StaggerItem key={feature.title}>
                  <div className="flex gap-3">
                    <CheckCircle2
                      size={22}
                      className="text-primary shrink-0 mt-0.5"
                    />
                    <div>
                      <h4 className="font-semibold mb-1">{feature.title}</h4>
                      <p className="text-sm text-ink-muted leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            {product.variants.length > 0 && (
              <>
                <h3 className="text-xl font-bold mb-6">Versions</h3>
                <div className="grid sm:grid-cols-2 gap-6 mb-10">
                  {product.variants.map((v) => (
                    <div
                      key={v.name}
                      className="rounded-xl border border-black/10 p-5"
                    >
                      <h4 className="font-semibold mb-1">{v.name}</h4>
                      <p className="text-sm text-ink-muted">{v.description}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            <h3 className="text-xl font-bold mb-4">Used in</h3>
            <div className="flex flex-wrap gap-2">
              {product.useCases.map((use) => (
                <span
                  key={use}
                  className="px-4 py-2 rounded-full bg-secondary text-primary text-sm font-medium"
                >
                  {use}
                </span>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="rounded-2xl bg-secondary/60 p-6 sticky top-28">
              <h3 className="font-bold mb-4">At a glance</h3>
              <dl className="space-y-4 mb-8">
                {product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex justify-between text-sm border-b border-black/5 pb-3"
                  >
                    <dt className="text-ink-muted">{spec.label}</dt>
                    <dd className="font-semibold text-right">{spec.value}</dd>
                  </div>
                ))}
              </dl>
              <Magnetic className="block">
                <Button href={`/contact?product=${product.slug}`} variant="primary" className="w-full">
                  Request a demo
                </Button>
              </Magnetic>
            </div>
          </FadeUp>
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <IsoCertifiedSection />
      </Section>

      <Section className="bg-surface-muted">
        <FadeUp className="max-w-2xl mb-10">
          <span className="eyebrow mb-3 block">Gallery</span>
          <h2 className="heading-md mb-4">See {product.name} from every angle</h2>
          <p className="text-ink-muted text-lg leading-relaxed">
            A closer look at the build, the controls, and the finish.
          </p>
        </FadeUp>
        <ProductGallery images={product.gallery} productName={product.name} />
      </Section>

      <Section className="bg-ink !py-0">
        <div className="py-16 md:py-24">
          <FadeUp className="max-w-2xl mb-10">
            <span className="eyebrow text-primary-light mb-3 block">
              See it in action
            </span>
            <h2 className="heading-md text-white mb-4">
              {product.name}, up close
            </h2>
            <p className="text-white/70 leading-relaxed">
              A full walkthrough of {product.name} in a real environment —
              setup, operation, and everyday use.
            </p>
          </FadeUp>
          <VideoShowcase
            video={product.video}
            poster={product.heroImage}
            title={product.name}
          />
        </div>
      </Section>

      <Section>
        <FadeUp className="max-w-2xl mb-8">
          <span className="eyebrow mb-3 block">Technical specifications</span>
          <h2 className="heading-md mb-4">Built to a standard, not a price point</h2>
          <p className="text-ink-muted text-lg leading-relaxed">
            {hasStepModels
              ? `Every ${product.name} model ships with its own set of standard safety features, with optional upgrades available to match your site.`
              : `Every ${product.name} ships with a complete set of standard safety and comfort features, with optional upgrades available to match your site.`}
          </p>
        </FadeUp>

        {product.brochure && (
          <FadeUp delay={0.05} className="mb-12">
            <a
              href={product.brochure}
              download
              className="group/brochure inline-flex items-center gap-3 rounded-full border-2 border-primary pl-6 pr-7 py-3.5 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-colors duration-300"
            >
              <Download
                size={18}
                className="shrink-0 transition-transform duration-300 group-hover/brochure:animate-bounce"
              />
              Download brochure
            </a>
          </FadeUp>
        )}

        <div className={`grid md:grid-cols-2 gap-12 ${hasStepModels ? "mb-16" : "mb-4"}`}>
          {!hasStepModels && (
            <>
              <FadeUp>
                <MagnifyImage
                  src={product.modelImage}
                  alt={`${product.name} model`}
                />
              </FadeUp>

              <FadeUp delay={0.1} className="grid sm:grid-cols-2 gap-10">
                <div>
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <CheckCircle2 size={20} className="text-primary" />
                    Standard
                  </h3>
                  <ul className="space-y-3">
                    {product.standardFeatures.map((f) => (
                      <li key={f} className="text-sm text-ink-muted leading-relaxed border-l-2 border-primary/30 pl-3">
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <PlusCircle size={20} className="text-ink-muted" />
                    Optional
                  </h3>
                  <ul className="space-y-3">
                    {product.optionalFeatures.map((f) => (
                      <li key={f} className="text-sm text-ink-muted leading-relaxed border-l-2 border-ink/10 pl-3">
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            </>
          )}
        </div>

        {hasStepModels && (
          <div>
            <FadeUp className="max-w-2xl mb-8">
              <h3 className="text-xl font-bold mb-3">Choose your model</h3>
              <p className="text-ink-muted leading-relaxed">
                {product.name} is available from 2 to 6 steps. Select a
                model to see its image, rise height, load capacity,
                footprint — and which features are standard or optional at
                that size.
              </p>
            </FadeUp>
            <StepModelSelector models={product.stepModels} productName={product.name} />
          </div>
        )}

        {/*
          Once someone's finished comparing models (or, for products without
          step models, the standard/optional feature breakdown above), this
          is the natural next step: hand them straight to the contact form
          with this product already selected, rather than leaving them to
          hunt for a way to get in touch.
        */}
        <FadeUp className="mt-14">
          <ContactCTABand
            eyebrow="Found your fit?"
            title={`Ready to bring ${product.name} to your site?`}
            description="Continue to the contact form and we'll carry this product over automatically — just add a few details about the space."
            productSlug={product.slug}
          />
        </FadeUp>
      </Section>

      <Section className="bg-secondary/40 relative overflow-hidden">
        <AmbientGlow tone="light" />
        <div className="relative z-10">
          <PickSolutionSection />
        </div>
      </Section>

      {relatedCases.length > 0 && (
        <Section>
          <FadeUp className="mb-10">
            <span className="eyebrow mb-3 block">Upliftas cases</span>
            <h2 className="heading-md mb-2">
              {product.name} in the field
            </h2>
            <p className="text-ink-muted">
              Case studies from facilities using this product.
            </p>
          </FadeUp>
          <div className="grid sm:grid-cols-2 gap-6">
            {relatedCases.map((item) => (
              <RelatedCaseCard key={item.slug} item={item} />
            ))}
          </div>
        </Section>
      )}

      <Section className="!pt-0">
        <ContactCTABand
          eyebrow="Still deciding?"
          title="Talk it through with a specialist"
          description="No obligation — just a conversation about the space, the timeline, and what fits."
          productSlug={product.slug}
          buttonLabel="Get in touch"
        />
      </Section>
    </>
  );
}
