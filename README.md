# Portfolio

A production-grade personal developer portfolio built with Next.js 16, TypeScript,
Tailwind CSS v4, and Framer Motion. Dark-mode-first, content-first, and built so
you never have to touch a component to update your projects, skills, or resume.

This document is deliberately long — treat it as the operating manual for the
whole build, not a decorative README.

---

## 1. Before you do anything else: fill in your real content

Everything you need to personalize lives in **`src/content/`**, not in
components. Search the codebase for `[ADD` to find every placeholder:

```bash
grep -rn "\[ADD" src
```

Files to edit, in priority order:

1. **`src/content/social.ts`** — your name, tagline, domain, GitHub/LinkedIn/email.
   `siteConfig.domain` must stay a valid URL (it's parsed at build time by
   Next's `metadataBase`) — don't leave it as `https://example.com` in production.
2. **`src/content/projects.ts`** — GitHub URLs and deployed demo URLs for each
   project (`links.github`, `links.demo`).
3. **`src/content/experience.ts`** — your university name, CGPA/honors, and any
   hackathons — these were left as placeholders rather than invented.
4. **`public/resume.pdf`** — drop your real resume PDF here. The `/resume` page
   already links to it.
5. **`src/content/writing/*.mdx`** — one sample post is included
   (`detecting-wasted-context.mdx`) as a template. Add more `.mdx` files to the
   same folder; the writing index and sitemap pick them up automatically.

Everything else (screenshots, GitHub star counts) is intentionally left as a
placeholder rather than fabricated — see section 5 for wiring up live data.

---

## 2. Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # serve the production build locally
npm run lint    # ESLint
```

---

## 3. Architecture

```
src/
  app/                  # Next.js App Router — one folder per route
    projects/[slug]/    # dynamic project case-study pages
    writing/[slug]/     # dynamic MDX blog post pages
    sitemap.ts          # generated sitemap.xml
    robots.ts           # generated robots.txt
    opengraph-image.tsx # dynamically generated OG image (next/og)
  components/
    ui/                 # Button, Badge, Section, Container, Tooltip, ThemeToggle
    sections/           # Hero, Navbar, Footer, ProjectCard, Timeline, etc.
  content/              # <- YOU EDIT THESE, not the components
    projects.ts
    skills.ts
    experience.ts
    social.ts
    writing/*.mdx
  lib/                  # utils.ts (cn helper), mdx.ts (frontmatter + reading time)
  types/                # shared TypeScript interfaces for all content
```

**Why this split matters:** adding a project, skill, or blog post never
requires touching a `.tsx` file. `ProjectCard`, the projects grid, the sitemap,
and the case-study page all read from `content/projects.ts` as the single
source of truth.

### Design system

- **Fonts:** Space Grotesk (display), Inter (body), JetBrains Mono (data/labels)
  — self-hosted via `@fontsource-variable/*`, so there's no runtime dependency
  on Google Fonts and no layout shift from a blocked font request.
- **Color tokens:** defined once in `src/app/globals.css` under `@theme`, with
  a `.light` class override for the light-mode variant. Change the palette in
  exactly one place.
- **Accent color:** a bespoke signal-teal (`--color-signal`), chosen to read as
  "trace / diff / detected overlap" — tied to what AgentXray's product
  actually does, not a decorative gradient.

---

## 4. Deployment (Vercel)

1. Push this repo to GitHub.
2. Import it at vercel.com/new.
3. No environment variables are required for the base site to work.
4. Set `siteConfig.domain` in `src/content/social.ts` to your real production
   URL before the first deploy — it feeds `metadataBase`, the sitemap, and
   `robots.ts`.

Any static host that supports Next.js (Netlify, Cloudflare Pages) works too;
the app has no server-only runtime dependencies beyond the Node.js build step.

---

## 5. Wiring up things left as placeholders on purpose

I didn't fabricate data I couldn't verify. Here's how to make each piece live:

### Live GitHub stats (`/open-source`)
`OpenSourceStats` is a static shell. To make it live, fetch server-side in
`src/app/open-source/page.tsx` (it's a Server Component, so this never touches
the client):

```ts
const res = await fetch(`https://api.github.com/users/${handle}`, {
  next: { revalidate: 3600 }, // cache 1hr, avoid rate limits
});
```

Pass the numbers down as props to `OpenSourceStats` instead of the hardcoded
placeholder array.

### Contact form
Ships with a zero-backend `mailto:` fallback (works immediately, no setup).
To send silently instead of opening the user's email client, replace the
`handleSubmit` body in `src/app/contact/ContactForm.tsx` with a `POST` to an
API route wired to Resend or Postmark.

### Real project screenshots
Project cards currently show a generated gradient + grid pattern instead of a
fabricated screenshot. Once you have real product screenshots, drop them in
`public/projects/{slug}.png` and swap the gradient div in `ProjectCard.tsx`
and the project detail page for a `next/image`.

### Command palette / search
Listed in the original brief but not built — genuinely optional for a
portfolio's core job (getting a recruiter to a project page in one click).
If you want it: `cmdk` is the standard library, wired to a Cmd+K keyboard
listener in `Navbar.tsx`, searching `projects.ts` + blog post titles.

---

## 6. Performance, SEO, accessibility — what's already done

- **Metadata:** per-page `title`/`description` via each route's `metadata`
  export, global `<title>` template, Open Graph + Twitter cards, JSON-LD
  `Person` schema in the root layout.
- **Sitemap & robots:** generated dynamically from your actual content
  (`sitemap.ts`, `robots.ts`) — add a project or blog post and it appears
  automatically, no manual XML editing.
- **Images/fonts:** self-hosted variable fonts avoid a render-blocking
  third-party font request; no `<img>` tags are used without `next/image`
  once you add real screenshots.
- **Accessibility:** a visible skip-to-content link, `:focus-visible` rings on
  every interactive element (never suppressed), `aria-label`/`aria-pressed` on
  icon-only and toggle buttons, `prefers-reduced-motion` respected in the hero
  animation and globally in CSS.
- **Static generation:** every route (including project and blog detail pages)
  is statically generated at build time via `generateStaticParams` — no
  server round-trip on page load.

### Getting to 100/100/100/100 on Lighthouse

The architecture above gets you most of the way there automatically. The
remaining points are typically lost on:
1. **Unoptimized images** — once you add real screenshots, always go through
   `next/image`, never a raw `<img>`.
2. **Third-party scripts** — if you add analytics, load it with
   `next/script` and `strategy="lazyOnload"`.
3. **CLS from web fonts** — already mitigated by self-hosting + `font-display: swap`.
4. Run `npx lighthouse http://localhost:3000 --view` locally after
   `npm run build && npm run start` to check for regressions before each deploy.

---

## 7. Future improvements (not built, intentionally scoped out)

- Command palette (`cmdk`) for keyboard-driven navigation and search.
- Live GitHub contribution graph and star counts (needs a small API route or
  server-side fetch — see section 5).
- RSS feed for the writing section (`app/writing/rss.xml/route.ts` is a
  natural place to add this — reuse `getAllPosts()` from `lib/mdx.ts`).
- Analytics (Vercel Analytics or Plausible — a single script/component
  drop-in once you decide on a provider).
- MDX syntax highlighting (currently plain code blocks) via
  `rehype-pretty-code` once you're publishing posts with real code samples.

---

## 8. A note on content honesty

Every technical detail in `content/projects.ts` (the AST-overlap + embedding
approach in AgentXray, the FastAPI/ChromaDB/OpenRouter stack in CodePilot AI,
the zero-backend architecture in PDFKit) reflects what you've actually
described building. Anything unverifiable — GitHub handles, exact dates,
university name, hackathon results — is a bracketed placeholder, not a guess.
Fill those in before this goes live; a recruiter who clicks through to a
broken GitHub link notices.
