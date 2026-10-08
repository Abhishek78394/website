import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { ResourceList } from "@/components/sections/ResourceList";
import { Container } from "@/components/ui/Container";
import { industries } from "@/content/industries";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Industries",
  description:
    "Digital out-of-home for retail, food and beverage, automotive, real estate, technology, and finance.",
  path: "/industries",
  keywords: ["DOOH industries", "retail screen advertising", "automotive billboards"],
});

export default function IndustriesPage() {
  return (
    <main id="main">
      <Breadcrumbs items={[{ name: "Industries", path: "/industries" }]} />
      <PageHero
        eyebrow="Industries"
        title="Campaign patterns by category."
        description="The screen mix changes with the job: a dinner offer is not a transit launch."
      />
      <Container className="py-12">
        <ResourceList
          items={industries.map((item) => ({
            href: `/industries/${item.slug}`,
            title: item.title,
            description: item.description,
            meta: item.eyebrow,
          }))}
        />
      </Container>
    </main>
  );
}
