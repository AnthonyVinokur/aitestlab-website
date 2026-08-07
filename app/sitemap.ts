import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const routes = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/features", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/atlas", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/reports", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/documentation", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/roadmap", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    priority: route.priority,
    changeFrequency: route.changeFrequency,
  }));
}
