import { SocialLink, Achievement } from "@/types";

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/abhishek-s12" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abhishek-k-a16468351/" },
  { label: "X / Twitter", href: "https://x.com/abxdevops" },
  { label: "Email", href: "mailto:abhishek.ss1003@gmail.com" },
];

export const siteConfig = {
  name: "Abhishek",
  role: "FullStack AI Engineer",
  tagline: "Building AI developer tools, agent observability, and scalable backend systems.",
  location: "India",
  // EDIT ME before deploying — must stay a valid URL (metadataBase parses it at build time)
  domain: "https://example.com",
};

export const achievements: Achievement[] = [
  {
    title: "Solved 300+ problems across Leetcode, Codeforces",
    org: "[ADD organizer]",
    date: "[ADD date]",
    description: "[ADD one or two sentences on what it was and why it mattered]",
  },
];
