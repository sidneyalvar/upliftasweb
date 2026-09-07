import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";

export default function Section({
  children,
  className,
  containerClassName,
  id,
}) {
  return (
    <section id={id} className={cn("section", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
