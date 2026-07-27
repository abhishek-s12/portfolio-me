"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

// Nodes on the left represent files an agent read; nodes on the right
// represent symbols that actually appeared in its output. Lines drawing
// between them are "used" context; nodes that never connect are "wasted."
const files = [
  { id: "f1", y: 24, used: true },
  { id: "f2", y: 64, used: false },
  { id: "f3", y: 104, used: true },
  { id: "f4", y: 144, used: false },
  { id: "f5", y: 184, used: true },
  { id: "f6", y: 224, used: false },
];

export function ContextTrace() {
  const reduce = useReducedMotion();
  const [pct, setPct] = useState(0);
  const target = Math.round((files.filter((f) => !f.used).length / files.length) * 100);

  useEffect(() => {
    if (reduce) {
      // Reduced-motion users get the final value immediately, no tween.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPct(target);
      return;
    }
    let raf: number;
    const start = performance.now();
    const duration = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setPct(Math.round(p * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const timeout = setTimeout(() => (raf = requestAnimationFrame(tick)), 500);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [reduce, target]);

  return (
    <div className="relative w-full max-w-md" role="img" aria-label="Diagram showing a coding agent's context trace: some read files connect to the output, others go unused and are flagged as wasted context.">
      <svg viewBox="0 0 320 248" className="w-full overflow-visible" aria-hidden>
        {files.map((f, i) => (
          <g key={f.id}>
            {/* connecting line — only drawn for used files */}
            {f.used && (
              <motion.line
                x1={40}
                y1={f.y}
                x2={280}
                y2={116}
                stroke="var(--color-signal)"
                strokeWidth={1.5}
                strokeOpacity={0.55}
                initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
                animate={reduce ? undefined : { pathLength: 1, opacity: 0.55 }}
                transition={{ duration: 1, delay: 0.15 * i, ease: "easeOut" }}
              />
            )}
            {/* file node */}
            <motion.circle
              cx={40}
              cy={f.y}
              r={6}
              fill={f.used ? "var(--color-signal)" : "var(--color-bg-raised)"}
              stroke={f.used ? "var(--color-signal)" : "var(--color-border-strong)"}
              strokeWidth={1.5}
              initial={reduce ? undefined : { opacity: 0 }}
              animate={reduce ? undefined : { opacity: f.used ? 1 : 0.5 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
            />
            <text x={54} y={f.y + 4} className="font-mono" fontSize="9" fill="var(--color-ink-faint)">
              file_{i + 1}.ts
            </text>
          </g>
        ))}

        {/* output node */}
        <circle cx={280} cy={116} r={9} fill="none" stroke="var(--color-signal)" strokeWidth={2} />
        <circle cx={280} cy={116} r={3.5} fill="var(--color-signal)" />
        <text x={280} y={140} textAnchor="middle" className="font-mono" fontSize="9" fill="var(--color-ink-dim)">
          agent output
        </text>
      </svg>

      <div className="mt-2 flex items-baseline gap-2 border-t border-(--color-border) pt-4">
        <span className="mono-tabular font-[family-name:var(--font-display)] text-3xl font-medium text-(--color-signal)">
          {pct}%
        </span>
        <span className="font-mono text-xs text-(--color-ink-faint)">of read context went unused this session</span>
      </div>
    </div>
  );
}
