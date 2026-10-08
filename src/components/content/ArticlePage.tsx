import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import type { RelatedLink, Section } from "@/content/types";

function sectionId(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function ArticlePage({
  eyebrow,
  title,
  description,
  crumbs,
  sections,
  jsonLd,
  meta,
  related,
  children,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  crumbs: Crumb[];
  sections: Section[];
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  meta?: string;
  related?: RelatedLink[];
  children?: ReactNode;
}) {
  return (
    <main id="main">
      <Breadcrumbs items={crumbs} />
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      {jsonLd ? <JsonLd data={jsonLd} /> : null}
      <Container className="grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_260px]">
        <article>
          {meta ? <p className="mb-8 font-mono text-xs tracking-[0.14em] text-muted uppercase">{meta}</p> : null}
          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.heading} id={sectionId(section.heading)}>
                <h2 className="font-display text-2xl text-ink md:text-3xl">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-4 leading-7">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
          {children}
        </article>
        {related && related.length > 0 ? (
          <aside>
            <h2 className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Related</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {related.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </Container>
      <CtaBand />
    </main>
  );
}
