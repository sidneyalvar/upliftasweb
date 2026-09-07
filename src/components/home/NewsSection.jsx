import { FadeUp, StaggerGroup, StaggerItem } from "@/components/shared/MotionWrapper";
import { NewsCard } from "@/components/shared/Card";
import Button from "@/components/ui/Button";
import { news } from "@/lib/data/news";

export default function NewsSection() {
  const latest = news.slice(0, 3);

  return (
    <>
      <FadeUp className="max-w-2xl mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <span className="eyebrow mb-3 block">News</span>
          <h2 className="heading-lg mb-4">Latest updates</h2>
          <p className="text-ink-muted text-lg leading-relaxed">
            Product launches, clinical data, and stories from the field.
          </p>
        </div>
        <Button href="/news" variant="outline" className="shrink-0">
          View all news
        </Button>
      </FadeUp>

      <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {latest.map((article) => (
          <StaggerItem key={article.slug}>
            <NewsCard article={article} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </>
  );
}
