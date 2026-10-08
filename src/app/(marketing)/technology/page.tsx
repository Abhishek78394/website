import type { Metadata } from "next";
import { ArticlePage } from "@/components/content/ArticlePage";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Technology",
  description:
    "SCREENiSTA uses AI, connected screens, and secure records so outdoor campaigns can be planned, delivered, and measured.",
  path: "/technology",
  keywords: ["DOOH technology", "connected screens", "campaign measurement"],
});

export default function TechnologyPage() {
  return (
    <ArticlePage
      eyebrow="Technology"
      title="Built on intelligent technology."
      description="The product comes first. These are the systems that make discovery, delivery, and measurement possible."
      crumbs={[{ name: "Technology", path: "/technology" }]}
      sections={[
        {
          heading: "AI",
          paragraphs: [
            "AI on SCREENiSTA is a planning aid. It lines up a campaign objective with audience, time, and screen context so the shortlist is not every display in a city.",
            "A person still approves the screens before anything goes live.",
          ],
        },
        {
          heading: "IoT",
          paragraphs: [
            "Screens on the network are connected. Owners can see whether a display is online. Advertisers can see whether the booked seconds played.",
          ],
        },
        {
          heading: "Cryptography",
          paragraphs: [
            "Play history is protected so the record of what ran is hard to alter after the fact. That record is there for reporting, pauses, and makegood conversations.",
          ],
        },
        {
          heading: "Proprietary technology",
          paragraphs: [
            "The advertiser workspace, the partner tools, and the delivery layer are built for this network. Campaigns run in the advertiser app. Screen owners use the partner product.",
          ],
        },
      ]}
      related={[
        { href: "/how-it-works", label: "How a campaign runs" },
        { href: "/solutions/verified-play-logs", label: "Verified play logs" },
        { href: "/advertise", label: "Advertise" },
      ]}
    />
  );
}
