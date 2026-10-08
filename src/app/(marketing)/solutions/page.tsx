import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { ResourceList } from "@/components/sections/ResourceList";
import { Container } from "@/components/ui/Container";
import { solutions } from "@/content/solutions";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Solutions",
  description:
    "Per-second buying, AI audience targeting, verified play logs, and screen-owner monetization on Screenista.",
  path: "/solutions",
  keywords: ["DOOH solutions", "proof of play", "screen monetization"],
});

export default function SolutionsPage() {
  return (
    <main id="main">
      <Breadcrumbs items={[{ name: "Solutions", path: "/solutions" }]} />
      <PageHero
        eyebrow="Solutions"
        title="The parts of the platform people buy."
        description="Each solution page explains one job: buying time, choosing screens, proving delivery, or earning from inventory."
      />
      <Container className="py-12">
        <ResourceList
          items={solutions.map((item) => ({
            href: `/solutions/${item.slug}`,
            title: item.title,
            description: item.description,
            meta: item.eyebrow,
          }))}
        />
      </Container>
    </main>
  );
}
