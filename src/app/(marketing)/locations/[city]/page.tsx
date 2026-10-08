import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/content/ArticlePage";
import { cities } from "@/content/cities";
import { findBySlug } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { serviceSchema } from "@/lib/seo/schema";

type Params = Promise<{ city: string }>;

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { city: slug } = await params;
  const city = findBySlug(cities, slug);
  if (!city) return {};
  return buildMetadata({
    title: city.title,
    description: city.description,
    path: `/locations/${city.slug}`,
    keywords: city.keywords,
    modifiedTime: city.updatedAt,
  });
}

async function CityArticle({ params }: { params: Params }) {
  const { city: slug } = await params;
  const city = findBySlug(cities, slug);
  if (!city) notFound();

  return (
    <ArticlePage
      eyebrow={city.eyebrow}
      title={city.title}
      description={city.description}
      crumbs={[
        { name: "Locations", path: "/locations" },
        { name: city.name, path: `/locations/${city.slug}` },
      ]}
      sections={city.sections}
      related={city.related}
      meta={city.venues.join(" · ")}
      jsonLd={serviceSchema({
        name: city.title,
        description: city.description,
        path: `/locations/${city.slug}`,
        areaName: city.name,
        areaType: "City",
      })}
    />
  );
}

export default function CityPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={<p className="px-8 py-24 text-muted">Loading city…</p>}>
      <CityArticle params={params} />
    </Suspense>
  );
}
