import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { ResourceList } from "@/components/sections/ResourceList";
import { Container } from "@/components/ui/Container";
import { caseStudies } from "@/content/case-studies";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Case studies",
  description:
    "How advertisers used dayparts, mall screens, and play logs on Screenista instead of a fixed outdoor package.",
  path: "/case-studies",
  keywords: ["DOOH case studies", "outdoor advertising examples"],
});

export default function CaseStudiesPage() {
  return (
    <main id="main">
      <Breadcrumbs items={[{ name: "Case studies", path: "/case-studies" }]} />
      <PageHero
        eyebrow="Work"
        title="Campaigns shaped around a daypart."
        description="These examples show the buying decision. They are not a promise of the same result."
      />
      <Container className="py-12">
        <ResourceList
          items={caseStudies.map((item) => ({
            href: `/case-studies/${item.slug}`,
            title: item.title,
            description: item.description,
            meta: `${item.industry} · ${item.result}`,
          }))}
        />
      </Container>
    </main>
  );
}
