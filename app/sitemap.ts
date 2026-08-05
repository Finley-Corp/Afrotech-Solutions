import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { industries } from "@/app/data/industries";
import { services } from "@/app/data/services";
import { featuredProjects } from "@/app/data/projects";
import { neonQuery } from "@/lib/neon-db";

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" },
  { path: "/products", priority: 0.9, changeFrequency: "daily" },
  { path: "/services", priority: 0.85, changeFrequency: "monthly" },
  { path: "/industries", priority: 0.85, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.8, changeFrequency: "monthly" },
  { path: "/partners", priority: 0.75, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.85, changeFrequency: "monthly" },
  { path: "/quote", priority: 0.85, changeFrequency: "monthly" },
];

async function getProductSlugs(): Promise<string[]> {
  try {
    const rows = await neonQuery<{ slug: string }>(
      "SELECT slug FROM products WHERE slug IS NOT NULL ORDER BY scraped_at DESC NULLS LAST LIMIT 2000",
    );
    return rows.map((r) => r.slug).filter(Boolean);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();
  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  for (const service of services) {
    entries.push({
      url: `${base}${service.path}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const project of featuredProjects) {
    entries.push({
      url: `${base}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const industry of industries) {
    entries.push({
      url: `${base}/industries/${industry.id}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    });
  }

  const slugs = await getProductSlugs();
  for (const slug of slugs) {
    entries.push({
      url: `${base}/products/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  return entries;
}
