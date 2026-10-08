import type { Metadata } from "next";
import Link from "next/link";
import { ArticlePage } from "@/components/content/ArticlePage";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Advertise on digital screens",
  description:
    "Discover screens, book campaigns by the second, and measure verified plays. Built for brands and agencies.",
  path: "/advertise",
  keywords: ["advertise on billboards", "DOOH for brands", "agency outdoor buying"],
});

export default function AdvertisePage() {
  return (
    <ArticlePage
      eyebrow="Advertisers"
      title="Buy the screens and the hours you actually need."
      description="Brands and agencies use Screenista to discover inventory, launch a standard or AI-assisted campaign, and read delivery from the play log."
      crumbs={[{ name: "Advertise", path: "/advertise" }]}
      sections={[
        {
          heading: "What you can do",
          paragraphs: [
            "Search screens by city and venue, upload creative once, add a QR or NFC action, and schedule exact seconds. A wallet funds the campaign. Reports show plays, not only a forecast.",
            "Agency owners see the full workspace, including clients and wallet. Team members work inside the permissions they are given. Client logins can review campaigns without creating them.",
          ],
        },
        {
          heading: "Two ways to build a campaign",
          paragraphs: [
            "The standard path is screens, schedule, creative, then launch. The AI path drafts a plan from the objective and audience, then you approve it before anything is saved.",
            "Either path ends in the same delivery network. You can pause or extend a live campaign from the advertiser app.",
          ],
        },
      ]}
      related={[
        { href: "/pricing", label: "Pricing" },
        { href: "/how-it-works", label: "Steps" },
        { href: "/locations", label: "Choose a city" },
      ]}
    >
      <p className="mt-10">
        <a href={siteConfig.appUrl} className="bg-ink px-4 py-3 text-sm text-white hover:bg-accent-dark">
          Open the advertiser app
        </a>
        <Link href="/contact" className="ml-4 text-sm underline decoration-line underline-offset-4">
          Ask for a walkthrough
        </Link>
      </p>
    </ArticlePage>
  );
}
