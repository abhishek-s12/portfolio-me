import { MetadataRoute } from "next";
import { siteConfig } from "@/content/social";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.domain}/sitemap.xml`,
  };
}
