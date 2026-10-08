import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-line">
      <Container className="pt-8 pb-10 md:pt-12 md:pb-14">
        {eyebrow ? (
          <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">{eyebrow}</p>
        ) : null}
        <h1 className="story-title mt-4 max-w-5xl text-ink">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{description}</p>
        {children}
      </Container>
    </header>
  );
}
