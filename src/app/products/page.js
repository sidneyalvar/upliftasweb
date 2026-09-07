import { FadeUp, StaggerGroup, StaggerItem } from "@/components/shared/MotionWrapper";
import { ProductCard } from "@/components/shared/Card";
import Section from "@/components/shared/Section";
import ContactCTABand from "@/components/shared/ContactCTABand";
import { products } from "@/lib/data/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Products — DuoStep, Aeris Lift & Stairlift HDN",
  description:
    "Explore DuoStep, our staircase platform lift, alongside Aeris Lift and Stairlift HDN — lifting chairs, staircase accessibility solutions, and rehabilitation training equipment.",
  path: "/products",
  keywords: ["DuoStep", "Aeris Lift", "Stairlift HDN", "accessibility products"],
});

export default function ProductsPage() {
  return (
    <>
      <Section className="pt-16">
        <FadeUp className="max-w-2xl mb-12">
          <span className="eyebrow mb-3 block">Products</span>
          <h1 className="heading-lg mb-4">Equipment for every stage of care</h1>
          <p className="text-ink-muted text-lg leading-relaxed">
            From emergency lift-assist to full staircase accessibility and
            rehabilitation training — built with input from the people who use
            it every day.
          </p>
        </FadeUp>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <StaggerItem key={product.slug}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section className="!pt-0">
        <ContactCTABand />
      </Section>
    </>
  );
}
