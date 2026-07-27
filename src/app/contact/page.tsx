import { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "./ContactForm";
import { socials, siteConfig } from "@/content/social";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch.",
};

export default function ContactPage() {
  return (
    <Section eyebrow="Contact" title="Say hello." description={`Based in ${siteConfig.location}. Reply time is usually under a day.`}>
      <div className="grid gap-12 md:grid-cols-2">
        <ContactForm />
        <div className="space-y-1">
          <h3 className="font-mono text-xs uppercase tracking-[0.1em] text-(--color-ink-faint)">Direct</h3>
          <ul className="mt-4 space-y-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-(--color-ink-dim) hover:text-(--color-signal)">
                  {s.label} <span className="text-(--color-ink-faint)">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
