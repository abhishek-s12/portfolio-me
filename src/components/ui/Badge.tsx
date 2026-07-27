import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-(--color-border-strong) px-2.5 py-1 font-mono text-[11px] tracking-wide text-(--color-ink-dim)",
        className
      )}
      {...props}
    />
  );
}

const statusMap: Record<string, { label: string; dot: string }> = {
  shipping: { label: "Shipping", dot: "bg-(--color-signal)" },
  "active-build": { label: "In active build", dot: "bg-(--color-warn)" },
  archived: { label: "Archived", dot: "bg-(--color-ink-faint)" },
};

export function StatusBadge({ status }: { status: string }) {
  const s = statusMap[status] ?? statusMap.archived;
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-(--color-ink-dim)">
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} aria-hidden />
      {s.label}
    </span>
  );
}
