import type { Metadata } from "next";
import { ArticlePage } from "@/components/content/ArticlePage";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Privacy",
  description: "How the Screenista marketing site handles the details you send through the contact form.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <ArticlePage
      eyebrow="Legal"
      title="Privacy"
      description="This page covers the public marketing site. The advertiser and partner apps have their own account terms."
      crumbs={[{ name: "Privacy", path: "/privacy" }]}
      sections={[
        {
          heading: "What this site collects",
          paragraphs: [
            "If you email support or press, we receive whatever you put in that message. The contact form on this preview checks that the fields are filled in. It does not store the submission in a database yet.",
            `Support email: ${siteConfig.email}. Press email: ${siteConfig.pressEmail}.`,
          ],
        },
        {
          heading: "Accounts",
          paragraphs: [
            "Signing in happens on app.screenista.ai or partner.screenista.ai. Those products handle account data, campaigns, and wallets under their own privacy notices.",
          ],
        },
      ]}
    />
  );
}
