import type { Metadata } from "next";
import { ArticlePage } from "@/components/content/ArticlePage";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Cookie policy",
  description: "How the SCREENiSTA public website uses cookies.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <ArticlePage
      eyebrow="Legal"
      title="Cookie policy"
      description="This notice covers the public marketing site. The advertiser and partner apps are separate products."
      crumbs={[{ name: "Cookie policy", path: "/cookies" }]}
      sections={[
        {
          heading: "This website",
          paragraphs: [
            "The public SCREENiSTA website does not set advertising cookies and does not run a third-party analytics tag.",
            "If you email us or use the contact form, we receive the message you send. That form does not store the submission in a database.",
          ],
        },
        {
          heading: "Product accounts",
          paragraphs: [
            "Signing in happens on app.screenista.ai or partner.screenista.ai. Those products may use cookies to keep you signed in. Their own notices describe that use.",
          ],
        },
      ]}
    />
  );
}
