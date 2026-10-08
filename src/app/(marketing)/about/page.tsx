import type { Metadata } from "next";
import { ArticlePage } from "@/components/content/ArticlePage";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About Screenista",
  description:
    "Screenista is a digital out-of-home platform owned by Screenista Private Limited. Advertisers book screens. Owners monetize them.",
  path: "/about",
  keywords: ["about Screenista", "DOOH company", "Screenista Private Limited"],
});

export default function AboutPage() {
  return (
    <ArticlePage
      eyebrow="Company"
      title="Outdoor advertising, sold by the second."
      description="Screenista connects brands that need screens with the people who own them, and keeps a record of what actually played."
      crumbs={[{ name: "About", path: "/about" }]}
      sections={[
        {
          heading: "What the company builds",
          paragraphs: [
            "Screenista Private Limited builds the advertiser workspace, the partner tools for screen owners, and the delivery layer that plays campaigns on connected displays.",
            "The public site explains the product. Campaigns run in the advertiser app. Screen owners use the partner product. Operations and admin use a separate console.",
          ],
        },
        {
          heading: "Where it operates",
          paragraphs: [
            "India is the home market. The GCC, including Dubai, is an operating region. Expansion planning includes the United Kingdom and the Baltic region.",
            "Country settings follow the domain and environment. India and the UAE are separate deployments of the same products, not a second company.",
          ],
        },
        {
          heading: "Opportunity",
          paragraphs: [
            "The aim is a network more businesses can use: advertisers who start with a few hours, and screen owners who fill time that would otherwise sit idle.",
            "That is an ambition for access to outdoor advertising. It is not a count of jobs, and it is not a promise of employment.",
          ],
        },
      ]}
      related={[
        { href: "/how-it-works", label: "How a campaign runs" },
        { href: "/contact", label: "Contact" },
        { href: "/partners", label: "Partners" },
      ]}
    />
  );
}
