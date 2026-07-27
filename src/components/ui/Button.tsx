import { cn } from "@/lib/utils";
import Link from "next/link";
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors duration-150 disabled:opacity-40 disabled:pointer-events-none";

const variants = {
  primary: "bg-(--color-signal) text-(--color-signal-ink) hover:bg-(--color-signal-dim)",
  outline:
    "border border-(--color-border-strong) text-(--color-ink) hover:border-(--color-signal) hover:text-(--color-signal)",
  ghost: "text-(--color-ink-dim) hover:text-(--color-ink)",
};

type Variant = keyof typeof variants;

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={cn(base, variants[variant], className)} {...props} />;
}

export function LinkButton({
  className,
  variant = "primary",
  href,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; href: string }) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  if (isExternal) {
    return (
      <a
        href={href}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel="noopener noreferrer"
        className={cn(base, variants[variant], className)}
        {...props}
      />
    );
  }
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {props.children}
    </Link>
  );
}
