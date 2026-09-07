import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import Section from "@/components/shared/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { FadeUp } from "@/components/shared/MotionWrapper";
import { cases, getCaseBySlug } from "@/lib/data/cases";
import { products } from "@/lib/data/products";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const item = getCaseBySlug(params.slug);
  if (!item) return {};
  return buildMetadata({
    title: item.title,
    description: item.excerpt,
    path: `/cases/${item.slug}`,
    image: item.thumbnail,
    keywords: [item.product, item.type, "Upliftas case study"],
  });
}

export default function CaseDetailPage({ params }) {
  const item = getCaseBySlug(params.slug);
  if (!item) notFound();

  const relatedProduct = products.find((p) => p.slug === item.productSlug);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "" },
              { name: "Case studies", path: "/cases" },
              { name: item.title, path: `/cases/${item.slug}` },
            ])
          ),
        }}
      />
      <section className="relative h-[55vh] min-h-[420px] w-full overflow-hidden">
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06102A]/80 via-[#06102A]/32 to-[#06102A]/8" />
        <Container className="relative z-10 h-full flex flex-col justify-end pb-14">
          <span className="eyebrow text-white/90 mb-3">{item.type}</span>
          <h1 className="heading-lg text-white max-w-3xl">{item.title}</h1>
        </Container>
      </section>

      <Section>
        <div className="grid md:grid-cols-3 gap-12">
          <FadeUp className="md:col-span-2 space-y-6">
            {item.body.map((paragraph, i) => (
              <p key={i} className="text-lg text-ink-muted leading-relaxed">
                {paragraph}
              </p>
            ))}
          </FadeUp>

          {relatedProduct && (
            <FadeUp delay={0.1}>
              <div className="rounded-2xl bg-secondary/60 p-6 sticky top-28">
                <h3 className="font-bold mb-3">Product used</h3>
                <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                  <Image
                    src={relatedProduct.thumbnail}
                    alt={relatedProduct.name}
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                </div>
                <h4 className="font-semibold mb-1">{relatedProduct.name}</h4>
                <p className="text-sm text-ink-muted mb-5">
                  {relatedProduct.tagline}
                </p>
                <Link
                  href={`/products/${relatedProduct.slug}`}
                  className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:gap-2 transition-all"
                >
                  View product <ArrowUpRight size={14} />
                </Link>
              </div>
            </FadeUp>
          )}
        </div>

        <div className="mt-16 pt-10 border-t border-black/10">
          <Button href={`/contact?product=${item.productSlug}`} variant="primary">
            Discuss your facility&apos;s needs
          </Button>
        </div>
      </Section>
    </>
  );
}
