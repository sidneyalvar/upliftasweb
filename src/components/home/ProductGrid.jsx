import { FadeUp } from "@/components/shared/MotionWrapper";
import { ProductCard } from "@/components/shared/Card";
import ScrollSlideIn from "@/components/shared/ScrollSlideIn";
import { products } from "@/lib/data/products";

const DIRECTIONS = ["left", "up", "right"];

export default function ProductGrid() {
  return (
    <>
      <FadeUp className="max-w-2xl mb-12">
        <span className="eyebrow mb-3 block">Our products</span>
        <h2 className="heading-lg mb-4">
          Equipment for every stage of care
        </h2>
        <p className="text-ink-muted text-lg leading-relaxed">
          From emergency lift-assist to full staircase accessibility and
          rehabilitation training — built with input from the people who use
          it every day.
        </p>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:items-start">
        {products.map((product, i) => (
          <ScrollSlideIn
            key={product.slug}
            direction={DIRECTIONS[i % DIRECTIONS.length]}
            className="md:mt-[var(--step-offset)]"
            style={{ "--step-offset": `${i * 20}px` }}
          >
            <ProductCard product={product} />
          </ScrollSlideIn>
        ))}
      </div>
    </>
  );
}
