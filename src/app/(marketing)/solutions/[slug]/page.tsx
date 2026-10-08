import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/content/ArticlePage";
import { solutions } from "@/content/solutions";
import { findBySlug } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { serviceSchema } from "@/lib/seo/schema";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return solutions.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const item = findBySlug(solutions, slug);
  if (!item) return {};
  return buildMetadata({
    title: item.title,
    description: item.description,
    path: `/solutions/${item.slug}`,
    keywords: item.keywords,
    modifiedTime: item.updatedAt,
  });
}

async function SolutionArticle({ params }: { params: Params }) {
  const { slug } = await params;
  const item = findBySlug(solutions, slug);
  if (!item) notFound();

  return (
    <ArticlePage
      eyebrow={item.eyebrow}
      title={item.title}
      description={item.description}
      crumbs={[
        { name: "Solutions", path: "/solutions" },
        { name: item.title, path: `/solutions/${item.slug}` },
      ]}
      sections={item.sections}
      related={item.related}
      jsonLd={serviceSchema({
        name: item.title,
        description: item.description,
        path: `/solutions/${item.slug}`,
        areaName: "India and GCC",
      })}
    />
  );
}

export default function SolutionPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={<p className="px-8 py-24 text-muted">Loading solution…</p>}>
      <SolutionArticle params={params} />
    </Suspense>
  );
}
