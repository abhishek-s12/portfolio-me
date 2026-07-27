"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [light, setLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Reading localStorage/DOM state must happen post-mount to avoid a
    // server/client hydration mismatch (server always renders the dark default).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const stored = localStorage.getItem("theme");
    const isLight = stored === "light";
    setLight(isLight);
    document.documentElement.classList.toggle("light", isLight);
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("theme", next ? "light" : "dark");
  }

  if (!mounted) return <span className="h-9 w-9 shrink-0" aria-hidden />;

  return (
    <button
      onClick={toggle}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-(--color-border) text-(--color-ink-dim) transition-colors hover:text-(--color-ink) hover:border-(--color-border-strong)"
    >
      {light ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
