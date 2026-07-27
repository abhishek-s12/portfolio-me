"use client";

import { useMemo, useState } from "react";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { cn } from "@/lib/utils";

export function ProjectsGrid() {
  const allTags = useMemo(() => Array.from(new Set(projects.flatMap((p) => p.tags))), []);
  const [active, setActive] = useState<string | null>(null);

  const filtered = active ? projects.filter((p) => p.tags.includes(active)) : projects;

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by tag">
        <button
          onClick={() => setActive(null)}
          className={cn(
            "rounded-full border px-3 py-1.5 font-mono text-xs transition-colors",
            active === null
              ? "border-(--color-signal) text-(--color-signal)"
              : "border-(--color-border) text-(--color-ink-dim) hover:border-(--color-border-strong)"
          )}
          aria-pressed={active === null}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActive(tag)}
            className={cn(
              "rounded-full border px-3 py-1.5 font-mono text-xs transition-colors",
              active === tag
                ? "border-(--color-signal) text-(--color-signal)"
                : "border-(--color-border) text-(--color-ink-dim) hover:border-(--color-border-strong)"
            )}
            aria-pressed={active === tag}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
