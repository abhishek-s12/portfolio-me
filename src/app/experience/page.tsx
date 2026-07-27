import { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Timeline } from "@/components/sections/Timeline";
import { experience } from "@/content/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Education, builds, and hackathons.",
};

export default function ExperiencePage() {
  return (
    <Section eyebrow="Experience" title="What I've built, and where I've studied.">
      <Timeline items={experience} />
    </Section>
  );
}
