import Image from "next/image";
import { notFound } from "next/navigation";
import Section from "@/components/shared/Section";
import Container from "@/components/ui/Container";
import { FadeUp } from "@/components/shared/MotionWrapper";
import { news, getNewsBySlug } from "@/lib/data/news";
import { formatDate } from "@/lib/utils";
import { buildMetadata, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export function generateMetadata({ params }) {
  const article = getNewsBySlug(params.slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/news/${article.slug}`,
    image: article.thumbnail,
  });
}

export default function NewsDetailPage({ params }) {
  const article = getNewsBySlug(params.slug);
  if (!article) notFound();

  return (
    <>
      {/* NewsArticle structured data — headline/image/date independent of
          the rendered HTML; backs eligibility for Google News/Discover
          style placements. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "" },
              { name: "News", path: "/news" },
              { name: article.title, path: `/news/${article.slug}` },
            ])
          ),
        }}
      />
      <section className="relative h-[50vh] min-h-[380px] w-full overflow-hidden">
        <Image
          src={article.thumbnail}
          alt={article.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06102A]/80 via-[#06102A]/32 to-[#06102A]/8" />
        <Container className="relative z-10 h-full flex flex-col justify-end pb-14">
          <time className="text-white/80 text-sm font-semibold uppercase tracking-wide mb-3">
            {formatDate(article.date)}
          </time>
          <h1 className="heading-lg text-white max-w-3xl">{article.title}</h1>
        </Container>
      </section>

      <Section>
        <FadeUp className="max-w-3xl mx-auto space-y-6">
          {article.body.map((paragraph, i) => (
            <p key={i} className="text-lg text-ink-muted leading-relaxed">
              {paragraph}
            </p>
          ))}
        </FadeUp>
      </Section>
    </>
  );
}
