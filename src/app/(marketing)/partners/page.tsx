import type { Metadata } from "next";
import { ArticlePage } from "@/components/content/ArticlePage";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Partners",
  description:
    "Media owners, venues, and real-estate partners list screens on Screenista and earn when campaigns play.",
  path: "/partners",
  keywords: ["DOOH partner", "screen partner program", "real estate screen partner"],
});

export default function PartnersPage() {
  return (
    <ArticlePage
      eyebrow="Partners"
      title="Three ways to work with the network."
      description="Advertisers buy time. Screen owners supply it. Real-estate partners bring buildings and footfall the network does not already cover."
      crumbs={[{ name: "Partners", path: "/partners" }]}
      sections={[
        {
          heading: "Media owners",
          paragraphs: [
            "If you already operate digital screens, list them, set the hours ads may run, and track fill. The partner product is at partner.screenista.ai.",
          ],
        },
        {
          heading: "Venues",
          paragraphs: [
            "Malls, offices, and retail sites with a display in a lobby or atrium can monetize house screens that currently only play their own content.",
          ],
        },
        {
          heading: "Real estate",
          paragraphs: [
            "Developers and property teams can both advertise a project and, where a screen exists, join as inventory. Those are different jobs: one spends, one earns.",
          ],
        },
      ]}
      related={[
        { href: "/screens", label: "Screen owners" },
        { href: "/contact", label: "Contact partnerships" },
      ]}
    >
      <p className="mt-10">
        <a href={siteConfig.partnerUrl} className="bg-ink px-4 py-3 text-sm text-white hover:bg-accent-dark">
          Go to the partner site
        </a>
      </p>
    </ArticlePage>
  );
}
