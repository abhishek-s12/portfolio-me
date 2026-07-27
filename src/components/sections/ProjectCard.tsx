import Link from "next/link";
import { Project } from "@/types";
import { StatusBadge } from "@/components/ui/Badge";
import { ArrowUpRight } from "lucide-react";

const accentBg: Record<Project["accent"], string> = {
  signal: "from-(--color-signal)/18",
  warn: "from-(--color-warn)/16",
  ink: "from-(--color-ink)/10",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-(--color-border) bg-(--color-bg-raised) transition-all duration-200 hover:-translate-y-1 hover:border-(--color-border-strong)"
    >
      <div className={`relative h-40 bg-gradient-to-br ${accentBg[project.accent]} to-transparent`}>
        <div className="absolute inset-0 grid-signature opacity-40" aria-hidden />
        <span className="absolute bottom-4 left-5 font-[family-name:var(--font-display)] text-2xl font-medium text-(--color-ink)">
          {project.name}
        </span>
        <ArrowUpRight
          size={18}
          className="absolute right-5 top-5 text-(--color-ink-faint) transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-(--color-signal)"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-center justify-between">
          <StatusBadge status={project.status} />
          <span className="font-mono text-xs text-(--color-ink-faint)">{project.year}</span>
        </div>
        <p className="text-sm leading-relaxed text-(--color-ink-dim)">{project.tagline}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.stack.slice(0, 4).map((s) => (
            <span key={s} className="rounded-full border border-(--color-border) px-2.5 py-0.5 font-mono text-[10px] text-(--color-ink-faint)">
              {s}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
