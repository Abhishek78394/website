import type { Metadata } from "next";
import { ArticlePage } from "@/components/content/ArticlePage";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "List and monetize screens",
  description:
    "Screen owners register displays, fill unused seconds, and track revenue and device health in the partner product.",
  path: "/screens",
  keywords: ["monetize digital signage", "screen owner platform", "DOOH inventory"],
});

export default function ScreensPage() {
  return (
    <ArticlePage
      eyebrow="Screen owners"
      title="Turn idle screen time into booked seconds."
      description="Media owners, venues, and real-estate partners list displays on Screenista and earn when advertiser campaigns play."
      crumbs={[{ name: "Screens", path: "/screens" }]}
      sections={[
        {
          heading: "What owners manage",
          paragraphs: [
            "Register a screen, see which campaigns are scheduled or playing, and check whether the device is online. Occupancy and play data replace a monthly status email.",
            "Revenue is tracked in a wallet. The partner site is separate from the advertiser app so owners are not browsing someone else’s campaign builder.",
          ],
        },
        {
          heading: "What advertisers see",
          paragraphs: [
            "A listed screen can appear in discovery by city and venue type: mall, street, office, transit, or retail. Accurate venue data is what makes targeting useful.",
          ],
        },
      ]}
      related={[
        { href: "/solutions/screen-owner-monetization", label: "Owner monetization" },
        { href: "/partners", label: "Partner paths" },
        { href: "/locations", label: "Markets" },
      ]}
    >
      <p className="mt-10">
        <a href={siteConfig.partnerUrl} className="bg-ink px-4 py-3 text-sm text-white hover:bg-accent-dark">
          Open the partner site
        </a>
      </p>
    </ArticlePage>
  );
}
