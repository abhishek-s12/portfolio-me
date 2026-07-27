import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Section } from "@/components/ui/Section";
import { SkillGrid } from "@/components/sections/SkillGrid";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { Timeline } from "@/components/sections/Timeline";
import { CTA } from "@/components/sections/CTA";
import { LinkButton } from "@/components/ui/Button";
import { featuredProjects } from "@/content/projects";
import { experience } from "@/content/experience";

export default function Home() {
  return (
    <>
      <Hero />
      <About />

      <Section
        eyebrow="Selected work"
        title="Projects that shipped, not just compiled."
        description="Each one includes the problem, the architecture, and what broke along the way — not just a screenshot."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <div className="mt-10">
          <LinkButton href="/projects" variant="outline">
            View all projects
          </LinkButton>
        </div>
      </Section>

      <Section eyebrow="Toolbox" title="Skills, grouped by what they're for.">
        <SkillGrid />
      </Section>

      <Section eyebrow="Path" title="Recent builds and background." description="Full history on the experience page.">
        <Timeline items={experience.slice(0, 3)} />
        <div className="mt-8">
          <LinkButton href="/experience" variant="outline">
            Full timeline
          </LinkButton>
        </div>
      </Section>

      <CTA />
    </>
  );
}
