"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion, withGsap } from "@/lib/motion/with-gsap";
import { Container } from "@/components/ui/Container";

const stages = [
  {
    kicker: "Traditional OOH",
    title: "Bought in weeks and months.",
    body: "A site is sold as a block of time. Many of those hours will not match the audience you actually wanted.",
  },
  {
    kicker: "Limited targeting",
    title: "A city, when you needed a street.",
    body: "Finding the right screen, venue, and hour is slow when inventory lives in decks and phone calls.",
  },
  {
    kicker: "Limited measurement",
    title: "A photo is not a result.",
    body: "Estimated reach and a picture of the site leave the real question open: did the ad play?",
  },
  {
    kicker: "Manual workflows",
    title: "The campaign lives in inboxes.",
    body: "Schedules, creative, and reports move by hand. Changing a daypart means starting the conversation again.",
  },
  {
    kicker: "SCREENiSTA",
    title: "One place to plan, run, and read it.",
    body: "Discover screens, book the seconds you need, and see the play log from connected displays.",
  },
];

export function Problem() {
  const root = useRef<HTMLElement>(null);
  const indexRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const scope = root.current;
    if (!scope || prefersReducedMotion()) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    withGsap(scope, (gsap, ScrollTrigger) => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const items = gsap.utils.toArray<HTMLElement>(".problem-stage");
        gsap.set(items, { position: "absolute", inset: 0, autoAlpha: 0, y: 24 });
        gsap.set(items[0], { autoAlpha: 1, y: 0 });
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: scope,
            start: "top top",
            end: "+=240%",
            pin: ".problem-pin",
            scrub: 0.6,
            anticipatePin: 1,
            onUpdate: (self) => {
              const index = Math.min(items.length - 1, Math.floor(self.progress * items.length));
              if (indexRef.current) indexRef.current.textContent = String(index + 1).padStart(2, "0");
            },
          },
        });
        items.forEach((item, index) => {
          if (index === 0) return;
          timeline.to(items[index - 1], { autoAlpha: 0, y: -20, duration: 0.35 }, index);
          timeline.to(item, { autoAlpha: 1, y: 0, duration: 0.35 }, index);
        });
        void ScrollTrigger;
      });
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
    <section ref={root} className="border-b border-line bg-paper" aria-labelledby="problem-heading">
      <div className="problem-pin lg:flex lg:min-h-svh lg:items-center">
        <Container className="grid gap-12 py-20 lg:grid-cols-2 lg:py-16">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">The old buy</p>
            <h2 id="problem-heading" className="story-title mt-4 max-w-xl text-ink">
              Outdoor advertising shouldn&apos;t be a guessing game.
            </h2>
            <p className="mt-6 hidden font-mono text-sm text-muted lg:block">
              <span ref={indexRef}>01</span>
              <span className="text-ink/30"> / 05</span>
            </p>
          </div>
          <div className="problem-stages relative min-h-[16rem]">
            <ol className="space-y-10 lg:space-y-0">
              {stages.map((stage) => (
                <li key={stage.kicker} className="problem-stage max-w-md">
                  <p className="font-mono text-[11px] tracking-[0.16em] text-accent-dark uppercase">{stage.kicker}</p>
                  <h3 className="mt-3 font-display text-3xl text-ink md:text-4xl">{stage.title}</h3>
                  <p className="mt-4 text-lg leading-8 text-muted">{stage.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </div>
    </section>
  );
}
