import { Project } from "@/types";

/**
 * EDIT ME: this is the only file you touch to change project content.
 * Replace bracketed placeholders — [ADD ...] — with real numbers/links
 * before you ship. Nothing here is fabricated data; anything I couldn't
 * verify is left as an explicit placeholder rather than a guess.
 */
export const projects: Project[] = [
  {
    slug: "agentxray",
    name: "AgentXray",
    tagline:
      "Open-source observability for AI coding agents — see exactly which files an agent read but never used.",
    status: "active-build",
    year: "2026",
    role: "Creator & sole maintainer",
    featured: true,
    accent: "signal",
    stack: ["Python", "TypeScript", "AST parsing", "Embeddings", "React"],
    tags: ["AI tooling", "Developer tools", "Open source"],
    problem:
      "Coding agents routinely pull far more context into a session than they end up using — reading entire files to justify a two-line edit. That waste is invisible today: existing agent-observability tools show token counts and latency, but nothing tells you which specific files were read for nothing, or how much of a session's context window was dead weight.",
    solution:
      "AgentXray instruments an agent session and reconstructs a per-file 'utilization' score using two independent signals: AST symbol overlap (did any function/class the agent read actually appear, referenced or modified, in the final diff?) and embedding similarity between file content and the agent's output. Where both signals agree a file was unused, AgentXray flags it as wasted context, with a confidence score rather than a binary guess.",
    architecture: [
      "Ingestion layer parses agent transcripts/tool-call logs into a normalized session graph (files read, files written, timestamps).",
      "AST layer builds a symbol table per touched file and diffs it against the final output to compute direct symbol overlap.",
      "Embedding layer runs file-level and output-level embeddings and scores cosine similarity as a secondary, softer signal.",
      "Scoring engine combines both signals into a single wasted-context percentage per file and per session.",
      "Dashboard (11 screens, designed in Stitch) surfaces session timelines, per-file scores, and aggregate waste trends across a project.",
    ],
    challenges: [
      {
        heading: "AST overlap alone isn't enough",
        body: "Symbol overlap misses cases where a file legitimately informed a decision without being quoted or modified — e.g. a config file that changed the agent's plan. Embedding similarity was added specifically to catch that class of 'read but not written' usage that pure AST diffing was blind to.",
      },
      {
        heading: "Scoping an 11-phase roadmap solo",
        body: "As a single maintainer building this alongside coursework, the build is sequenced into 11 phases so each phase ships something independently useful — the scoring engine works headless before the dashboard exists — rather than requiring the whole system to land at once.",
      },
    ],
    impact: [
      "Full UI system designed across 11 screens before writing implementation code, to keep scope honest against the roadmap.",
      "Built in the open from day one on GitHub, with the roadmap itself public.",
    ],
    lessons: [
      "A single detection signal (AST or embeddings alone) produces too many false positives or false negatives — combining both, and being explicit about disagreement between them, is what makes the score trustworthy.",
      "Designing the full UI before building phase 1 surfaced scope problems early that would have been expensive to discover mid-implementation.",
    ],
    roadmap: [
      "Ship the scoring engine as a standalone CLI/MCP server, independent of the dashboard.",
      "Add session replay so a wasted-context flag can be traced back to the exact tool call that caused it.",
      "Publish a benchmark comparing wasted-context rates across popular agent frameworks.",
    ],
    links: {
      github: "https://github.com/abhishek-s12/AgentXray",
    },
  },
  {
    slug: "codepilot-ai",
    name: "CodePilot AI",
    tagline:
      "An AI-powered IDE companion that indexes a whole repository so answers are grounded in your actual code, not guesses.",
    status: "shipping",
    year: "2025",
    role: "Creator & lead engineer",
    featured: true,
    accent: "signal",
    stack: ["FastAPI", "ChromaDB", "OpenRouter", "React", "Zustand", "AST parsing"],
    tags: ["AI tooling", "Full-stack", "Developer tools"],
    problem:
      "Generic AI coding assistants answer from the model's training data, not from the repository actually open in front of the developer — so answers about internal helpers, conventions, or architecture are frequently wrong or invented.",
    solution:
      "CodePilot AI parses a repository with AST-aware chunking, embeds and stores it in ChromaDB, and routes generation through OpenRouter (defaulting to gpt-4o-mini for cost-effective iteration) so every answer is retrieved against the real codebase before the model writes a word. The React + Zustand frontend keeps retrieved context, chat state, and file references in sync without prop-drilling across the IDE surface.",
    architecture: [
      "FastAPI backend exposes indexing, retrieval, and chat endpoints, decoupled from any single model provider.",
      "AST parser chunks source files by function/class boundary rather than fixed token windows, so retrieved context is semantically complete.",
      "ChromaDB stores embeddings per chunk with file-path and symbol metadata for precise citation back to source.",
      "OpenRouter abstraction allows swapping the underlying model without touching retrieval logic.",
      "React + Zustand frontend manages session, retrieved-context, and streaming response state as independent stores.",
    ],
    challenges: [
      {
        heading: "Repositioning against Sourcegraph",
        body: "Mid-build, Sourcegraph repositioned its own messaging onto very similar language ('grounded in your code'). Rather than compete head-on with an incumbent's exact framing, the public marketing site was rewritten to lead with the AST-aware chunking detail specifically — a concrete mechanism Sourcegraph's messaging didn't emphasize — instead of the more generic 'grounded' claim.",
      },
      {
        heading: "Chunking by AST boundary vs. fixed windows",
        body: "Fixed-size chunking regularly split a function in half, degrading retrieval quality. Switching to AST-boundary chunking fixed this but required handling malformed or partially-parseable files gracefully instead of failing the whole index.",
      },
    ],
    impact: [
      "Public beta shipped with a dedicated marketing site (Next.js 14, TypeScript, Tailwind, Framer Motion).",
      "Deployed publicly rather than kept as a local-only prototype, specifically to have a working link for recruiters and reviewers.",
    ],
    lessons: [
      "A defensible product narrative needs one concrete mechanism (AST-boundary chunking) that a competitor's messaging hasn't already claimed — not just a better-sounding adjective.",
      "Decoupling the model provider behind an abstraction (OpenRouter) early avoided a rewrite when default-model economics changed mid-project.",
    ],
    roadmap: [
      "Add multi-repo indexing for monorepo and microservice setups.",
      "Support local/self-hosted embedding models for privacy-sensitive codebases.",
    ],
    links: {
      github: "https://github.com/abhishek-s12/codepilot-ai",
      demo: "https://codepilot-ai-wine.vercel.app/",
    },
  },
  {
    slug: "pdfkit",
    name: "PDFKit",
    tagline:
      "Fully client-side PDF utilities — merge, split, compress, convert, watermark — with zero backend and zero server cost.",
    status: "shipping",
    year: "2025",
    role: "Creator & solo developer",
    featured: true,
    accent: "warn",
    stack: ["Next.js", "TypeScript", "WASM PDF processing", "Vercel"],
    tags: ["Web product", "Frontend engineering"],
    problem:
      "Most free PDF tools online upload your file to a third-party server, which is a real privacy concern for anything containing sensitive documents, and a real cost problem for the operator if the tool gets any meaningful traffic.",
    solution:
      "Every operation — merge, split, compress, JPG-to-PDF, watermark — runs entirely in the browser. No file is ever uploaded, which removes both the privacy concern and the server/bandwidth cost that would otherwise scale with usage, letting the product target ad-supported revenue on a near-zero cost base.",
    architecture: [
      "All PDF manipulation runs client-side in the browser; no backend service exists for the core product.",
      "Static deployment to Vercel/Netlify with no server compute on the critical path.",
      "Structured specifically to keep hosting cost near zero regardless of traffic volume, since monetization is ad-based rather than subscription-based.",
    ],
    challenges: [
      {
        heading: "Monetization viability under honest scrutiny",
        body: "Before building further, the AdSense-based revenue model was pressure-tested rather than assumed: what traffic volume is actually required before ad revenue is meaningful, and what the realistic timeline to that traffic looks like for a new domain with no existing audience.",
      },
    ],
    impact: [
      "Shipped as a genuinely serverless product — the cost structure of the business is a deliberate engineering decision, not an afterthought.",
    ],
    lessons: [
      "An ad-supported web product's real bottleneck is traffic acquisition, not the engineering — the technical build here was the easier half of the problem.",
    ],
    roadmap: [
      "Add PDF form-filling and OCR for scanned documents.",
      "SEO-focused content build-out targeting long-tail 'how to X a PDF' search queries.",
    ],
    links: {
      demo: "[ADD-DEPLOYED-URL]",
    },
  },
  {
    slug: "omnidex",
    name: "omnidex",
    tagline: "A local, multi-source search CLI and MCP server, written in Rust for speed and a small footprint.",
    status: "active-build",
    year: "2026",
    role: "Creator",
    featured: false,
    accent: "ink",
    stack: ["Rust", "MCP", "CLI"],
    tags: ["Systems", "Developer tools", "Rust"],
    problem:
      "Developers keep relevant information scattered across local files, notes, and multiple search indices, with no single fast entry point that an AI agent (or the developer themselves) can query consistently.",
    solution:
      "omnidex indexes multiple local sources behind one CLI and exposes the same search surface as an MCP server, so both a human in the terminal and an AI agent get identical, fast, local-first search — no cloud dependency, no data leaving the machine.",
    architecture: [
      "Rust core for indexing and query performance with a small memory and binary footprint.",
      "Pluggable source adapters so new local sources can be indexed without touching the core query engine.",
      "Dual interface: direct CLI usage and an MCP server exposing the same search tool to any MCP-compatible agent.",
    ],
    challenges: [
      {
        heading: "One query surface, two consumers",
        body: "Designing a single search interface that serves both an interactive human CLI session and a structured MCP tool call required keeping the result schema strict and typed rather than optimizing for pretty terminal output first.",
      },
    ],
    impact: ["Early-stage build; architecture prioritizes a stable MCP tool contract from the start."],
    lessons: [
      "Building the MCP interface alongside the CLI from day one, rather than bolting it on later, avoided reshaping the query engine's output format twice.",
    ],
    roadmap: [
      "Add remote source adapters (git remotes, wikis) behind the same local-first privacy model.",
      "Publish benchmark numbers against existing local search tools.",
    ],
    links: {
      github: "https://github.com/abhishek-s12/omnidex",
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredProjects = projects.filter((p) => p.featured);
