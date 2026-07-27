import { Container } from "@/components/ui/Container";
import { socials, siteConfig } from "@/content/social";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-(--color-border) py-12">
      <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="font-[family-name:var(--font-display)] text-sm font-medium">
            {siteConfig.name}
            <span className="text-(--color-signal)">.</span>
          </p>
          <p className="mt-1 text-sm text-(--color-ink-faint)">{siteConfig.tagline}</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-(--color-ink-dim)" aria-label="Social">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-(--color-ink)">
              {s.label}
            </a>
          ))}
        </nav>
      </Container>
      <Container className="mt-8 flex flex-col-reverse gap-4 border-t border-(--color-border) pt-6 text-xs text-(--color-ink-faint) md:flex-row md:items-center md:justify-between">
        <p>&copy; {new Date().getFullYear()} {siteConfig.name}. Built with Next.js.</p>
        <div className="flex gap-4">
          <Link href="/sitemap.xml" className="hover:text-(--color-ink-dim)">
            Sitemap
          </Link>
        </div>
      </Container>
    </footer>
  );
}
