import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Per-second DOOH pricing",
  description:
    "Screenista campaigns can start from ₹500. Per-second rates start from ₹0.30. You pay for the seconds that are booked.",
  path: "/pricing",
  keywords: ["DOOH pricing", "billboard cost India", "per second ad rate"],
});

export default function PricingPage() {
  return (
    <main id="main">
      <Breadcrumbs items={[{ name: "Pricing", path: "/pricing" }]} />
      <PageHero
        eyebrow="Pricing"
        title="Start small. Scale the seconds that work."
        description="You pay for the seconds you book. The live price follows the screen and the hour."
      />
      <Container className="grid gap-10 py-12 sm:grid-cols-2 md:py-16">
        <div>
          <p className="story-title text-ink">₹0.30</p>
          <p className="mt-3 text-muted">Starting rate, per second.</p>
        </div>
        <div>
          <p className="story-title text-ink">₹500</p>
          <p className="mt-3 text-muted">Campaigns can start here.</p>
        </div>
        <div className="sm:col-span-2">
          <Button href={siteConfig.appUrl} external>
            Start Advertising
          </Button>
        </div>
      </Container>
    </main>
  );
}
