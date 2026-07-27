import { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { ProjectsGrid } from "./ProjectsGrid";

export const metadata: Metadata = {
  title: "Projects",
  description: "Production projects across AI tooling, developer infrastructure, and web products.",
};

export default function ProjectsPage() {
  return (
    <Section
      eyebrow="Projects"
      title="Everything I've shipped, with the architecture underneath."
      description="Filter by what you're evaluating for."
    >
      <ProjectsGrid />
    </Section>
  );
}
