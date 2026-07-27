import { Section } from "@/components/ui/Section";

const beats = [
  {
    label: "Build",
    text: "I ship things end to end — backend, frontend, and the deployment pipeline in between — rather than stopping at a working local demo.",
  },
  {
    label: "Question",
    text: "Before adding a feature, I ask what it costs: in complexity, in server bill, in a competitor's overlapping claim. PDFKit's zero-backend architecture and CodePilot AI's repositioning both came out of that question.",
  },
  {
    label: "Open source",
    text: "AgentXray is built in public from its first commit — roadmap, architecture decisions, and all — because the tool is for other people building agents, not just for me.",
  },
];

export function About() {
  return (
    <Section id="about" eyebrow="About" title="I build the tool I wish already existed, then ship it.">
      <div className="grid gap-8 md:grid-cols-3">
        {beats.map((b) => (
          <div key={b.label} className="border-t border-(--color-border) pt-6">
            <p className="font-mono text-xs uppercase tracking-[0.1em] text-(--color-signal)">{b.label}</p>
            <p className="mt-3 text-sm leading-relaxed text-(--color-ink-dim)">{b.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
