import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/content/ArticlePage";
import { industries } from "@/content/industries";
import { findBySlug } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { serviceSchema } from "@/lib/seo/schema";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return industries.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const item = findBySlug(industries, slug);
  if (!item) return {};
  return buildMetadata({
    title: item.title,
    description: item.description,
    path: `/industries/${item.slug}`,
    keywords: item.keywords,
    modifiedTime: item.updatedAt,
  });
}

async function IndustryArticle({ params }: { params: Params }) {
  const { slug } = await params;
  const item = findBySlug(industries, slug);
  if (!item) notFound();

  return (
    <ArticlePage
      eyebrow={item.eyebrow}
      title={item.title}
      description={item.description}
      crumbs={[
        { name: "Industries", path: "/industries" },
        { name: item.title, path: `/industries/${item.slug}` },
      ]}
      sections={item.sections}
      related={item.related}
      jsonLd={serviceSchema({
        name: item.title,
        description: item.description,
        path: `/industries/${item.slug}`,
        areaName: "India and GCC",
        areaType: "Place",
      })}
    />
  );
}

export default function IndustryPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={<p className="px-8 py-24 text-muted">Loading industry…</p>}>
      <IndustryArticle params={params} />
    </Suspense>
  );
}
