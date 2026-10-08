import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { ResourceList } from "@/components/sections/ResourceList";
import { Container } from "@/components/ui/Container";
import { posts } from "@/content/posts";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Guides on digital out-of-home, per-second pricing, and how to measure an outdoor campaign.",
  path: "/blog",
  keywords: ["DOOH blog", "outdoor advertising guide"],
});

export default function BlogPage() {
  return (
    <main id="main">
      <Breadcrumbs items={[{ name: "Blog", path: "/blog" }]} />
      <PageHero
        eyebrow="Journal"
        title="Notes on buying and measuring screens."
        description="Practical explainers. The RSS feed is at /feed.xml."
      />
      <Container className="py-12">
        <ResourceList
          items={posts.map((post) => ({
            href: `/blog/${post.slug}`,
            title: post.title,
            description: post.description,
            meta: post.eyebrow,
          }))}
        />
      </Container>
    </main>
  );
}
