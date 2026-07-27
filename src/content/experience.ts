import { ExperienceItem } from "@/types";

/**
 * EDIT ME: add real internships/freelance work here as they happen.
 * Left as explicit placeholders rather than invented entries.
 */
export const experience: ExperienceItem[] = [
  {
    kind: "build",
    title: "Creator & Maintainer, AgentXray",
    org: "Independent / Open Source",
    period: "2026 — present",
    summary:
      "Building an open-source observability platform for AI coding agents, combining AST symbol-overlap analysis with embedding similarity to detect wasted context in agent sessions.",
    highlights: [
      "Designed the full product UI across 11 screens before writing implementation code.",
      "Sequenced implementation into an 11 phase roadmap to ship value incrementally as a solo maintainer.",
    ],
  },
  {
    kind: "build",
    title: "Creator & Lead Engineer, CodePilot AI",
    org: "Independent",
    period: "2025",
    summary:
      "Built and shipped an AI-powered repository intelligence tool with a FastAPI + ChromaDB retrieval backend and a React + Zustand frontend, including its public marketing site.",
    highlights: [
      "Repositioned product messaging after a direct competitor shifted onto overlapping language.",
      "Deployed a working public beta rather than keeping it as a local prototype.",
    ],
  },
  {
    kind: "build",
    title: "Creator, PDFKit",
    org: "Independent",
    period: "2025",
    summary:
      "Shipped a fully client-side PDF utility suite with no backend, engineered around a near-zero hosting cost base for ad-supported monetization.",
    highlights: [
      "Pressure-tested the AdSense monetization model against realistic traffic expectations before over-investing.",
    ],
  },
  {
    kind: "education",
    title: "B.Tech, Computer Science",
    org: "BUNDELKHAND UNIVERSITY, JHANSI, UTTAR PRADESH, INDIA",
    period: "2023 — 2027",
    location: "India",
    summary: "Final-year Computer Science student, currently interviewing for full-time software engineering roles.",
    highlights: ["CGPA: 8.0"],
  },
  {
    kind: "hackathon",
    title: "HackSetu",
    org: "Amity University",
    period: "October - 2025",
    summary: "Earn valuable experience that helped me secure a 2nd prize",
    highlights: ["2nd Place in HackSetu 2025 at Amity University"],
  },
];
