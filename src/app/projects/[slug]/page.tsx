import { notFound } from "next/navigation";
import { Metadata } from "next";
import { projects, getProject } from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { StatusBadge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { Code2, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.tagline,
    openGraph: { title: project.name, description: project.tagline },
  };
}

function Block({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-(--color-border) py-10">
      <h2 className="font-mono text-xs uppercase tracking-[0.12em] text-(--color-signal)">{heading}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return notFound();

  return (
    <article>
      <Container className="pt-16">
        <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-(--color-ink-faint) hover:text-(--color-ink-dim)">
          <ArrowLeft size={14} /> All projects
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <StatusBadge status={project.status} />
          <span className="font-mono text-xs text-(--color-ink-faint)">{project.year}</span>
          <span className="font-mono text-xs text-(--color-ink-faint)">·</span>
          <span className="font-mono text-xs text-(--color-ink-faint)">{project.role}</span>
        </div>

        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-medium tracking-tight md:text-5xl">
          {project.name}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-(--color-ink-dim)">{project.tagline}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span key={s} className="rounded-full border border-(--color-border) px-2.5 py-1 font-mono text-[11px] text-(--color-ink-faint)">
              {s}
            </span>
          ))}
        </div>

        <div className="mt-8 flex gap-3">
          {project.links.github && !project.links.github.includes("[ADD") && (
            <LinkButton href={project.links.github} variant="outline">
              <Code2 size={15} /> Source
            </LinkButton>
          )}
          {project.links.demo && !project.links.demo.includes("[ADD") && (
            <LinkButton href={project.links.demo} variant="primary">
              <ExternalLink size={15} /> Live demo
            </LinkButton>
          )}
        </div>
      </Container>

      <Container className="max-w-3xl">
        <Block heading="Problem">
          <p className="leading-relaxed text-(--color-ink-dim)">{project.problem}</p>
        </Block>

        <Block heading="Solution">
          <p className="leading-relaxed text-(--color-ink-dim)">{project.solution}</p>
        </Block>

        <Block heading="Architecture">
          <ul className="space-y-3">
            {project.architecture.map((a, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-(--color-ink-dim)">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-signal)" aria-hidden />
                {a}
              </li>
            ))}
          </ul>
        </Block>

        <Block heading="Challenges">
          <div className="space-y-6">
            {project.challenges.map((c, i) => (
              <div key={i}>
                <h3 className="font-[family-name:var(--font-display)] font-medium">{c.heading}</h3>
                <p className="mt-2 text-sm leading-relaxed text-(--color-ink-dim)">{c.body}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block heading="Impact">
          <ul className="space-y-2">
            {project.impact.map((imp, i) => (
              <li key={i} className="text-sm leading-relaxed text-(--color-ink-dim)">
                — {imp}
              </li>
            ))}
          </ul>
        </Block>

        <Block heading="Lessons learned">
          <ul className="space-y-2">
            {project.lessons.map((l, i) => (
              <li key={i} className="text-sm leading-relaxed text-(--color-ink-dim)">
                — {l}
              </li>
            ))}
          </ul>
        </Block>

        <Block heading="Roadmap">
          <ul className="space-y-2">
            {project.roadmap.map((r, i) => (
              <li key={i} className="text-sm leading-relaxed text-(--color-ink-dim)">
                — {r}
              </li>
            ))}
          </ul>
        </Block>
      </Container>
    </article>
  );
}
