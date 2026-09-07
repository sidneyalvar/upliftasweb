import { FadeUp, StaggerGroup, StaggerItem } from "@/components/shared/MotionWrapper";
import { NewsCard } from "@/components/shared/Card";
import Section from "@/components/shared/Section";
import { news } from "@/lib/data/news";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "News",
  description: "Product launches, clinical data, and stories from the field.",
  path: "/news",
});

export default function NewsPage() {
  return (
    <Section className="pt-16">
      <FadeUp className="max-w-2xl mb-12">
        <span className="eyebrow mb-3 block">News</span>
        <h1 className="heading-lg mb-4">Latest updates</h1>
        <p className="text-ink-muted text-lg leading-relaxed">
          Product launches, clinical data, and stories from care teams using
          our equipment every day.
        </p>
      </FadeUp>

      <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {news.map((article) => (
          <StaggerItem key={article.slug}>
            <NewsCard article={article} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
