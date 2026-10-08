import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { ResourceList } from "@/components/sections/ResourceList";
import { Container } from "@/components/ui/Container";
import { cities } from "@/content/cities";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "DOOH advertising locations",
  description:
    "Digital screen advertising in Mumbai, Delhi NCR, Bengaluru, Hyderabad, Ahmedabad, Chennai, Bhopal, and Dubai.",
  path: "/locations",
  keywords: ["DOOH cities India", "digital billboard locations", "Screenista cities"],
});

export default function LocationsPage() {
  return (
    <main id="main">
      <Breadcrumbs items={[{ name: "Locations", path: "/locations" }]} />
      <PageHero
        eyebrow="Locations"
        title="Cities on the network."
        description="Each city page covers the venue types advertisers use there and how a local campaign is usually planned."
      />
      <Container className="py-12">
        <ResourceList
          items={cities.map((city) => ({
            href: `/locations/${city.slug}`,
            title: city.name,
            description: city.description,
            meta: city.region,
          }))}
        />
      </Container>
    </main>
  );
}
