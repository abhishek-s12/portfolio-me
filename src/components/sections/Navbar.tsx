"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LinkButton } from "@/components/ui/Button";
import { siteConfig } from "@/content/social";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/#about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/open-source", label: "Open Source" },
  { href: "/writing", label: "Writing" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-(--color-border) bg-(--color-bg)/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
        <Link href="/" className="font-[family-name:var(--font-display)] text-sm font-medium tracking-tight">
          {siteConfig.name}
          <span className="text-(--color-signal)">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm text-(--color-ink-dim) transition-colors hover:text-(--color-ink)",
                pathname === l.href && "text-(--color-ink)"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <LinkButton href="/resume" variant="outline" className="text-xs">
            Resume
          </LinkButton>
          <LinkButton href="/contact" variant="primary" className="text-xs">
            Contact
          </LinkButton>
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center text-(--color-ink) md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-(--color-border) px-6 py-4 md:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className="text-sm text-(--color-ink-dim)">
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="flex gap-3 pt-2">
              <LinkButton href="/resume" variant="outline" className="flex-1 text-xs">
                Resume
              </LinkButton>
              <LinkButton href="/contact" variant="primary" className="flex-1 text-xs">
                Contact
              </LinkButton>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
