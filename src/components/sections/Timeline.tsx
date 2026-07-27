import { ExperienceItem } from "@/types";

const kindLabel: Record<ExperienceItem["kind"], string> = {
  education: "Education",
  build: "Build",
  hackathon: "Hackathon",
  oss: "Open Source",
};

export function Timeline({ items }: { items: ExperienceItem[] }) {
  return (
    <ol className="relative border-l border-(--color-border) pl-8">
      {items.map((item, i) => (
        <li key={i} className="relative pb-12 last:pb-0">
          <span
            className="absolute -left-[calc(2rem+4.5px)] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-(--color-bg) bg-(--color-signal)"
            aria-hidden
          />
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-(--color-signal)">
            {kindLabel[item.kind]} · {item.period}
          </p>
          <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-medium">{item.title}</h3>
          <p className="text-sm text-(--color-ink-faint)">
            {item.org}
            {item.location ? ` · ${item.location}` : ""}
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-(--color-ink-dim)">{item.summary}</p>
          {item.highlights.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {item.highlights.map((h, hi) => (
                <li key={hi} className="flex gap-2 text-sm text-(--color-ink-dim)">
                  <span className="text-(--color-signal)">—</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}
