import Link from "next/link";
import Section from "@/components/shared/Section";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section className="!py-32 text-center">
      <span className="eyebrow mb-4 block">404</span>
      <h1 className="heading-lg mb-4">Page not found</h1>
      <p className="text-ink-muted text-lg mb-8 max-w-md mx-auto">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Button href="/" variant="primary">
        Back to homepage
      </Button>
    </Section>
  );
}
