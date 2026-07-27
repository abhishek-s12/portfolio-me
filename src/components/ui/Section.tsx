import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title?: string;
  description?: string;
  id?: string;
}

export function Section({ eyebrow, title, description, className, children, id, ...props }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 md:py-28 border-t border-(--color-border) first:border-t-0", className)} {...props}>
      <Container>
        {(eyebrow || title || description) && (
          <div className="mb-12 md:mb-16 max-w-2xl">
            {eyebrow && (
              <p className="font-mono text-xs tracking-[0.14em] uppercase text-(--color-signal) mb-3">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-medium tracking-tight text-balance text-(--color-ink)">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-(--color-ink-dim) leading-relaxed">{description}</p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
