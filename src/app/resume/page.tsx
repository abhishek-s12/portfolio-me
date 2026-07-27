import { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import { experience } from "@/content/experience";
import { skills } from "@/content/skills";
import { siteConfig, socials } from "@/content/social";
import { Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Resume",
  description: "Download or view a summary of experience and skills.",
};

export default function ResumePage() {
  return (
    <Section eyebrow="Resume" title="One page, no fluff.">
      <div className="mb-10 flex flex-wrap items-center gap-4">
        <LinkButton href="/resume.pdf" variant="primary">
          <Download size={15} /> Download PDF
        </LinkButton>
        <p className="text-xs text-(--color-ink-faint)">
          Add your real resume.pdf to <code className="font-mono">/public</code> — see README.
        </p>
      </div>

      <div className="rounded-xl border border-(--color-border) bg-(--color-bg-raised) p-8 md:p-10">
        <header className="border-b border-(--color-border) pb-6">
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium">{siteConfig.name}</h1>
          <p className="mt-1 text-sm text-(--color-ink-dim)">{siteConfig.role} · {siteConfig.location}</p>
          <p className="mt-2 flex flex-wrap gap-x-4 font-mono text-xs text-(--color-ink-faint)">
            {socials.map((s) => (
              <span key={s.label}>{s.label}: {s.href.replace(/^mailto:|^https:\/\//, "")}</span>
            ))}
          </p>
        </header>

        <section className="mt-6">
          <h2 className="font-mono text-xs uppercase tracking-[0.1em] text-(--color-signal)">Experience</h2>
          <div className="mt-4 space-y-5">
            {experience.map((e, i) => (
              <div key={i}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <p className="font-medium">{e.title}</p>
                  <p className="font-mono text-xs text-(--color-ink-faint)">{e.period}</p>
                </div>
                <p className="text-sm text-(--color-ink-faint)">{e.org}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-(--color-ink-dim)">{e.summary}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 border-t border-(--color-border) pt-6">
          <h2 className="font-mono text-xs uppercase tracking-[0.1em] text-(--color-signal)">Skills</h2>
          <div className="mt-4 space-y-2">
            {skills.map((s) => (
              <p key={s.category} className="text-sm text-(--color-ink-dim)">
                <span className="text-(--color-ink)">{s.category}:</span> {s.items.join(", ")}
              </p>
            ))}
          </div>
        </section>
      </div>
    </Section>
  );
}
