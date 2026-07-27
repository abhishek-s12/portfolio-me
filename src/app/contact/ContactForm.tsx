"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { socials } from "@/content/social";

/**
 * Ships with a mailto fallback so the form works with zero backend.
 * To send silently instead, replace handleSubmit's body with a POST to
 * an API route wired to Resend/Postmark/etc. — see README "Contact form" section.
 */
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const emailLink = socials.find((s) => s.label === "Email")?.href ?? "mailto:";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name");
    const message = data.get("message");
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}`);
    window.location.href = `${emailLink}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm text-(--color-ink-dim)">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-md border border-(--color-border) bg-(--color-bg-raised) px-3.5 py-2.5 text-sm outline-none focus-visible:border-(--color-signal)"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm text-(--color-ink-dim)">
          Your email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-md border border-(--color-border) bg-(--color-bg-raised) px-3.5 py-2.5 text-sm outline-none focus-visible:border-(--color-signal)"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm text-(--color-ink-dim)">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-md border border-(--color-border) bg-(--color-bg-raised) px-3.5 py-2.5 text-sm outline-none focus-visible:border-(--color-signal)"
        />
      </div>
      <Button type="submit">Send message</Button>
      {status === "sent" && (
        <p role="status" className="text-xs text-(--color-ink-faint)">
          Opening your email client to finish sending.
        </p>
      )}
    </form>
  );
}
