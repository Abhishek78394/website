import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Talk to Screenista about advertising, screen partnerships, or press.",
  path: "/contact",
  keywords: ["contact Screenista", "DOOH sales"],
});

export default function ContactPage() {
  return (
    <main id="main">
      <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
      <PageHero
        eyebrow="Contact"
        title="Tell us what you want to run."
        description="Advertisers, screen owners, and press can reach the team directly. The form checks your note. It does not save it on a server yet."
      />
      <Container className="grid gap-12 py-14 lg:grid-cols-[1fr_280px]">
        <ContactForm />
        <aside className="text-sm leading-7">
          <h2 className="font-display text-2xl text-ink">Direct</h2>
          <p className="mt-4">
            Support{" "}
            <a className="underline decoration-line underline-offset-4" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
          </p>
          <p className="mt-2">
            Press{" "}
            <a className="underline decoration-line underline-offset-4" href={`mailto:${siteConfig.pressEmail}`}>
              {siteConfig.pressEmail}
            </a>
          </p>
          <p className="mt-6 text-muted">
            Campaigns are created in the advertiser app. Screen listings start on the partner site.
          </p>
        </aside>
      </Container>
    </main>
  );
}
