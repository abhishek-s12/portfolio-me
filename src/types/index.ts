export type ProjectStatus = "shipping" | "active-build" | "archived";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectSection {
  heading: string;
  body: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  status: ProjectStatus;
  year: string;
  role: string;
  featured: boolean;
  accent: "signal" | "warn" | "ink";
  stack: string[];
  tags: string[];
  problem: string;
  solution: string;
  architecture: string[];
  challenges: ProjectSection[];
  impact: string[];
  lessons: string[];
  roadmap: string[];
  links: {
    github?: string;
    demo?: string;
  };
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ExperienceItem {
  kind: "education" | "build" | "hackathon" | "oss";
  title: string;
  org: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
}

export interface Achievement {
  title: string;
  org: string;
  date: string;
  description: string;
}

export interface SocialLink {
  label: string;
  href: string;
  handle?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readingTime: string;
}
