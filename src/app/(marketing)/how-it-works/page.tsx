import type { Metadata } from "next";
import { ArticlePage } from "@/components/content/ArticlePage";
import { buildMetadata } from "@/lib/seo/metadata";

const steps = [
  ["Discover", "Browse inventory across malls, streets, offices, retail, and transit."],
  ["Choose locations", "Pick the cities and venues where the audience already spends time."],
  ["Build the campaign", "Name the objective and upload creative in one workflow."],
  ["Select the audience", "Use AI targeting as a shortlist, then approve the screens yourself."],
  ["Schedule", "Book by the second. No forced package and no unused morning if you only need the evening."],
  ["Publish", "Send the campaign to connected screens through the delivery layer."],
  ["Measure", "Read verified plays, dwell context, QR activity, and city performance."],
];

export const metadata: Metadata = buildMetadata({
  title: "How Screenista campaigns work",
  description:
    "Seven steps from screen discovery to a verified play log: locations, creative, audience, schedule, publish, and measurement.",
  path: "/how-it-works",
  keywords: ["how DOOH works", "Screenista campaign", "book digital screens"],
});

export default function HowItWorksPage() {
  return (
    <ArticlePage
      eyebrow="Platform"
      title="One path from a screen list to a play log."
      description="Advertisers stay in a single workflow. Screen owners see the same campaign only as scheduled airtime on their displays."
      crumbs={[{ name: "How it works", path: "/how-it-works" }]}
      sections={steps.map(([heading, paragraph], index) => ({
        heading: `${String(index + 1).padStart(2, "0")} · ${heading}`,
        paragraphs: [paragraph],
      }))}
      related={[
        { href: "/advertise", label: "For advertisers" },
        { href: "/pricing", label: "Pricing" },
        { href: "/faq", label: "FAQ" },
      ]}
    />
  );
}
