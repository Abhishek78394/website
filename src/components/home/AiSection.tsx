"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion, withGsap } from "@/lib/motion/with-gsap";
import { Container } from "@/components/ui/Container";

const flow = ["Campaign objective", "Audience", "Location", "Screens", "Creative", "Campaign"] as const;

const benefits = [
  {
    title: "AI Campaign Builder",
    body: "Create campaigns faster with recommendations you still approve.",
  },
  {
    title: "Audience Intelligence",
    body: "Understand who a screen is likely to reach, by place and time.",
  },
  {
    title: "Creative Intelligence",
    body: "See how a message is built for a short glance, not a feed.",
  },
  {
    title: "Campaign Optimization",
    body: "Use play logs and response to decide what to run next.",
  },
];

export function AiSection() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = root.current;
    if (!scope || prefersReducedMotion()) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    withGsap(scope, (gsap, ScrollTrigger) => {
      const steps = gsap.utils.toArray<HTMLElement>(".ai-step");
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: scope, start: "top 68%" },
      });
      steps.forEach((step, index) => {
        timeline.call(
          () => {
            steps.forEach((node, nodeIndex) => node.classList.toggle("is-on", nodeIndex <= index));
          },
          undefined,
          index * 0.28,
        );
      });
      void ScrollTrigger;
    }, () => cancelled).then((context) => {
      if (cancelled) context.revert();
      else ctx = context;
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section className="border-b border-line bg-paper" aria-labelledby="ai-heading">
      <Container className="grid gap-14 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:py-28">
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">Intelligence</p>
          <h2 id="ai-heading" className="story-title mt-4 text-ink">
            Smarter campaigns with AI.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-8 text-muted">
            Recommendations help you plan. You still choose the screens before anything goes live.
          </p>
          <ul className="mt-10 space-y-6">
            {benefits.map((benefit) => (
              <li key={benefit.title}>
                <h3 className="font-display text-xl text-ink">{benefit.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted">{benefit.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <div ref={root} className="rounded-2xl border border-line bg-white p-6 md:p-8">
          <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">From brief to campaign</p>
          <ol className="mt-6 space-y-3">
            {flow.map((step, index) => (
              <li
                key={step}
                className={`ai-step flex items-center justify-between rounded-xl border border-line px-4 py-4 text-ink ${
                  index === 0 ? "is-on" : ""
                }`}
              >
                <span className="font-display text-xl">{step}</span>
                <span className="font-mono text-[11px] text-muted">{String(index + 1).padStart(2, "0")}</span>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
