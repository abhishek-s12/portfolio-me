import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { ContextTrace } from "./ContextTrace";
import { siteConfig, socials } from "@/content/social";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-signature" aria-hidden />
      <Container className="relative py-24 md:py-36">
        <div className="grid gap-16 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="font-mono text-xs tracking-[0.14em] uppercase text-(--color-signal) mb-6">
              {siteConfig.role} · {siteConfig.location}
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-medium leading-[1.08] tracking-tight text-balance md:text-6xl">
              {siteConfig.name}
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-(--color-ink-dim)">
              I build AI agent tooling, retrieval-grounded developer products, and the
              backend systems underneath them. Currently building{" "}
              <span className="text-(--color-ink)">AgentXray</span> — open-source
              observability that shows exactly what an agent read and never used.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <LinkButton href="/projects">
                View projects <ArrowUpRight size={15} />
              </LinkButton>
              <LinkButton href="/resume" variant="outline">
                Download resume
              </LinkButton>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-(--color-ink-faint)">
              {socials.slice(0, 3).map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-(--color-ink-dim)">
                  {s.label} ↗
                </a>
              ))}
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <ContextTrace />
          </div>
        </div>
      </Container>
    </section>
  );
}
