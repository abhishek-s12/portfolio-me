import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CTA() {
  return (
    <section className="border-t border-(--color-border) py-24">
      <Container className="flex flex-col items-start gap-6">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight md:text-4xl">
          Building something that needs a person who ships?
        </h2>
        <p className="max-w-md text-(--color-ink-dim)">
          I&apos;m currently interviewing for full-time engineering roles and open to
          conversations about AI tooling and developer infrastructure.
        </p>
        <LinkButton href="/contact">Get in touch</LinkButton>
      </Container>
    </section>
  );
}
