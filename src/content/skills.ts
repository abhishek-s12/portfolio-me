import { SkillCategory } from "@/types";

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    items: ["TypeScript", "Python", "Rust", "C++", "SQL"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Zustand", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["FastAPI", "Node.js", "REST API design", "WebSockets"],
  },
  {
    category: "AI / ML",
    items: ["Embeddings & vector search", "AST-based code analysis", "RAG pipelines", "OpenRouter / model routing", "Prompt engineering"],
  },
  {
    category: "Data",
    items: ["ChromaDB", "PostgreSQL", "Redis"],
  },
  {
    category: "Cloud & DevOps",
    items: ["Vercel", "Docker", "GitHub Actions", "Linux"],
  },
  {
    category: "Tooling",
    items: ["Git", "MCP (Model Context Protocol)", "Antigravity IDE", "Stitch (UI design)"],
  },
];
