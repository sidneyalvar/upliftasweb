import Section from "@/components/shared/Section";

export default function Loading() {
  return (
    <Section className="pt-16">
      <div className="max-w-2xl mb-12 space-y-4 animate-pulse">
        <div className="h-4 w-32 bg-secondary rounded" />
        <div className="h-10 w-96 max-w-full bg-secondary rounded" />
        <div className="h-4 w-full bg-secondary rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white shadow-card overflow-hidden animate-pulse"
          >
            <div className="h-44 bg-secondary" />
            <div className="p-6 space-y-3">
              <div className="h-3 w-28 bg-secondary rounded" />
              <div className="h-5 w-2/3 bg-secondary rounded" />
              <div className="h-4 w-full bg-secondary rounded" />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
