import { projects } from "@/content/projects";

/**
 * Static shell for now. To wire live data, fetch server-side in
 * app/open-source/page.tsx (it's a Server Component) from:
 *   https://api.github.com/users/{handle}
 *   https://api.github.com/users/{handle}/repos?sort=updated
 * and pass the numbers down as props — no client-side GitHub calls,
 * so there's no token exposure and no client waterfall.
 */
const stats = [
  { label: "Public repos", value: "[ADD]" },
  { label: "Followers", value: "[ADD]" },
  { label: "Stars earned", value: "[ADD]" },
  { label: "Primary language", value: "TypeScript" },
];

export function OpenSourceStats() {
  const ossProjects = projects.filter((p) => p.links.github && !p.links.github.includes("[ADD"));

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-(--color-border) bg-(--color-border) md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-(--color-bg) p-6 text-center">
            <p className="mono-tabular font-[family-name:var(--font-display)] text-2xl font-medium text-(--color-signal)">
              {s.value}
            </p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-(--color-ink-faint)">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.1em] text-(--color-ink-faint)">
          Pinned repositories
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {ossProjects.map((p) => (
            <a
              key={p.slug}
              href={p.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-(--color-border) p-5 transition-colors hover:border-(--color-border-strong)"
            >
              <p className="font-[family-name:var(--font-display)] font-medium">{p.name}</p>
              <p className="mt-1.5 text-sm text-(--color-ink-dim) line-clamp-2">{p.tagline}</p>
              <p className="mt-3 font-mono text-[11px] text-(--color-ink-faint)">{p.stack[0]}</p>
            </a>
          ))}
        </div>
      </div>

      <p className="text-xs text-(--color-ink-faint)">
        Live contribution graph and star counts require a GitHub token — see README.md
        for a five-minute setup once your handle and repos are public.
      </p>
    </div>
  );
}
