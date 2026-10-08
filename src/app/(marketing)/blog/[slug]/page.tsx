import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/content/ArticlePage";
import { posts } from "@/content/posts";
import { findBySlug } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleSchema } from "@/lib/seo/schema";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = findBySlug(posts, slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
  });
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(`${iso}T00:00:00+05:30`));
}

async function PostArticle({ params }: { params: Params }) {
  const { slug } = await params;
  const post = findBySlug(posts, slug);
  if (!post) notFound();
  const path = `/blog/${post.slug}`;

  return (
    <ArticlePage
      eyebrow={post.eyebrow}
      title={post.title}
      description={post.description}
      crumbs={[
        { name: "Blog", path: "/blog" },
        { name: post.title, path },
      ]}
      sections={post.sections}
      related={post.related}
      meta={`${formatDate(post.publishedAt)} · Updated ${formatDate(post.updatedAt)}`}
      jsonLd={articleSchema({
        title: post.title,
        description: post.description,
        path,
        publishedAt: post.publishedAt,
        updatedAt: post.updatedAt,
      })}
    />
  );
}

export default function BlogPostPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={<p className="px-8 py-24 text-muted">Loading article…</p>}>
      <PostArticle params={params} />
    </Suspense>
  );
}
