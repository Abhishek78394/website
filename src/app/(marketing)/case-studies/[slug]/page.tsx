import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/content/ArticlePage";
import { caseStudies } from "@/content/case-studies";
import { findBySlug } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleSchema } from "@/lib/seo/schema";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return caseStudies.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const item = findBySlug(caseStudies, slug);
  if (!item) return {};
  return buildMetadata({
    title: item.title,
    description: item.description,
    path: `/case-studies/${item.slug}`,
    keywords: item.keywords,
    publishedTime: item.updatedAt,
    modifiedTime: item.updatedAt,
  });
}

async function CaseArticle({ params }: { params: Params }) {
  const { slug } = await params;
  const item = findBySlug(caseStudies, slug);
  if (!item) notFound();
  const path = `/case-studies/${item.slug}`;

  return (
    <ArticlePage
      eyebrow={item.eyebrow}
      title={item.title}
      description={item.description}
      crumbs={[
        { name: "Case studies", path: "/case-studies" },
        { name: item.title, path },
      ]}
      sections={item.sections}
      related={item.related}
      meta={`${item.industry} · ${item.result}`}
      jsonLd={articleSchema({
        title: item.title,
        description: item.description,
        path,
        publishedAt: item.updatedAt,
        updatedAt: item.updatedAt,
      })}
    />
  );
}

export default function CaseStudyPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={<p className="px-8 py-24 text-muted">Loading case study…</p>}>
      <CaseArticle params={params} />
    </Suspense>
  );
}
