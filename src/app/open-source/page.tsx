import { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { OpenSourceStats } from "@/components/sections/OpenSourceStats";

export const metadata: Metadata = {
  title: "Open Source",
  description: "Public repositories and open-source contributions.",
};

export default function OpenSourcePage() {
  return (
    <Section eyebrow="Open Source" title="Built in public, from the first commit.">
      <OpenSourceStats />
    </Section>
  );
}
