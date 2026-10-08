import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FaqList } from "@/components/sections/FaqList";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { faqs } from "@/content/faqs";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Frequently asked questions",
  description:
    "Answers on Screenista pricing, cities, play logs, agencies, and how to launch a digital out-of-home campaign.",
  path: "/faq",
  keywords: ["Screenista FAQ", "DOOH questions", "per second advertising FAQ"],
});

export default function FaqPage() {
  return (
    <main id="main">
      <Breadcrumbs items={[{ name: "FAQ", path: "/faq" }]} />
      <PageHero
        eyebrow="Help"
        title="Questions advertisers and owners ask first."
        description="Short answers. For a screen list or a quote, use the advertiser app or the contact form."
      />
      <Container className="py-14">
        <FaqList items={faqs} includeSchema />
      </Container>
    </main>
  );
}
