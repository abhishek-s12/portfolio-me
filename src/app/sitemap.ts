import { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { getAllPostSlugs } from "@/lib/mdx";
import { siteConfig } from "@/content/social";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.domain;
  const staticRoutes = ["", "/projects", "/experience", "/open-source", "/writing", "/resume", "/contact"].map(
    (route) => ({
      url: `${base}${route}`,
      lastModified: new Date(),
    })
  );
  const projectRoutes = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(),
  }));
  const postRoutes = getAllPostSlugs().map((slug) => ({
    url: `${base}/writing/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
