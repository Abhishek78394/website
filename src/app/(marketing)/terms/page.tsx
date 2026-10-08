import type { Metadata } from "next";
import { ArticlePage } from "@/components/content/ArticlePage";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Terms",
  description: "Terms for using the Screenista public website. Campaign contracts are completed in the advertiser app.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <ArticlePage
      eyebrow="Legal"
      title="Terms"
      description={`The public website is operated by ${siteConfig.legalName}. Booking a campaign is a separate step inside the advertiser app.`}
      crumbs={[{ name: "Terms", path: "/terms" }]}
      sections={[
        {
          heading: "This website",
          paragraphs: [
            "Content on screenista.ai describes the product. Prices shown as starting points are not a quote for a specific screen until you select inventory and a schedule.",
            "You may not misuse the site, attempt to break it, or copy it in a way that suggests a false affiliation.",
          ],
        },
        {
          heading: "Campaigns",
          paragraphs: [
            "A campaign starts when you confirm it in the advertiser product and the wallet or payment step succeeds. Screen availability, creative review, and venue rules can still block a booking.",
            `Questions: ${siteConfig.email}.`,
          ],
        },
      ]}
    />
  );
}
