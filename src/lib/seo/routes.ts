import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/case-studies";
import { cities } from "@/content/cities";
import { industries } from "@/content/industries";
import { posts } from "@/content/posts";
import { solutions } from "@/content/solutions";
import { absoluteUrl } from "@/config/site";

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

type Route = {
  path: string;
  lastModified: string;
  changeFrequency: ChangeFrequency;
  priority: number;
};

const staticRoutes: Route[] = [
  { path: "/", lastModified: "2026-10-01", changeFrequency: "weekly", priority: 1 },
  { path: "/about", lastModified: "2026-10-07", changeFrequency: "monthly", priority: 0.6 },
  { path: "/technology", lastModified: "2026-10-07", changeFrequency: "monthly", priority: 0.6 },
  { path: "/advertise", lastModified: "2026-09-20", changeFrequency: "monthly", priority: 0.9 },
  { path: "/screens", lastModified: "2026-09-20", changeFrequency: "monthly", priority: 0.9 },
  { path: "/how-it-works", lastModified: "2026-09-20", changeFrequency: "monthly", priority: 0.8 },
  { path: "/pricing", lastModified: "2026-09-20", changeFrequency: "monthly", priority: 0.8 },
  { path: "/locations", lastModified: "2026-09-18", changeFrequency: "weekly", priority: 0.8 },
  { path: "/industries", lastModified: "2026-09-01", changeFrequency: "monthly", priority: 0.7 },
  { path: "/solutions", lastModified: "2026-09-10", changeFrequency: "monthly", priority: 0.7 },
  { path: "/case-studies", lastModified: "2026-09-05", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog", lastModified: "2026-09-15", changeFrequency: "weekly", priority: 0.7 },
  { path: "/partners", lastModified: "2026-08-20", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", lastModified: "2026-08-01", changeFrequency: "yearly", priority: 0.5 },
  { path: "/faq", lastModified: "2026-09-01", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy", lastModified: "2026-06-01", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms", lastModified: "2026-06-01", changeFrequency: "yearly", priority: 0.2 },
  { path: "/cookies", lastModified: "2026-10-07", changeFrequency: "yearly", priority: 0.2 },
];

export function indexableRoutes(): Route[] {
  return [
    ...staticRoutes,
    ...cities.map((city) => ({
      path: `/locations/${city.slug}`,
      lastModified: city.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...industries.map((item) => ({
      path: `/industries/${item.slug}`,
      lastModified: item.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...solutions.map((item) => ({
      path: `/solutions/${item.slug}`,
      lastModified: item.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...caseStudies.map((item) => ({
      path: `/case-studies/${item.slug}`,
      lastModified: item.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...posts.map((item) => ({
      path: `/blog/${item.slug}`,
      lastModified: item.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

export function toSitemap(): MetadataRoute.Sitemap {
  return indexableRoutes().map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
