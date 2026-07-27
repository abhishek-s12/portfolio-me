import { skills } from "@/content/skills";

export function SkillGrid() {
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-(--color-border) bg-(--color-border) sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((group) => (
        <div key={group.category} className="bg-(--color-bg) p-6">
          <h3 className="font-mono text-xs uppercase tracking-[0.1em] text-(--color-ink-faint)">
            {group.category}
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {group.items.map((item) => (
              <span
                key={item}
                className="rounded-md border border-(--color-border) px-2.5 py-1 text-sm text-(--color-ink-dim)"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
