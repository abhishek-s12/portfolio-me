import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center gap-4 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-(--color-signal)">404</p>
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-medium">
        This page doesn&apos;t exist.
      </h1>
      <p className="max-w-md text-(--color-ink-dim)">
        The link may be outdated, or the page was moved. Head back to the homepage
        to find what you&apos;re looking for.
      </p>
      <LinkButton href="/">Back to home</LinkButton>
    </Container>
  );
}
