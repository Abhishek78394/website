"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";
import { prefersReducedMotion, withGsap } from "@/lib/motion/with-gsap";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/home/Magnetic";

const facts = [
  { k: "From ₹0.30", v: "Starting rate, per second" },
  { k: "From ₹500", v: "Campaigns can start here" },
  { k: "Verified", v: "Play logs for every booking" },
];

const lineOne = ["Your", "audience"];
const lineTwo = ["is", "out", "there."];
const lineThree = ["Reach", "them."];

function Word({ children, grad = false }: { children: string; grad?: boolean }) {
  return (
    <span className="rv-mask close-word">
      <span className={`rv-line close-in${grad ? " rv-grad" : ""}`}>{children}</span>
    </span>
  );
}

export function FinalCta() {
  const root = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = root.current;
    if (!scope || prefersReducedMotion()) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    withGsap(
      scope,
      (gsap) => {
        // the card grows into place as it scrolls into view
        gsap.fromTo(
          ".close-card",
          { scale: 0.88, borderRadius: 72 },
          {
            scale: 1,
            borderRadius: 40,
            ease: "none",
            scrollTrigger: { trigger: scope, start: "top 95%", end: "top 25%", scrub: true },
          },
        );

        // two rows of giant outlined type slide in opposite directions
        gsap.fromTo(
          ".close-marquee-a",
          { xPercent: 0 },
          { xPercent: -28, ease: "none", scrollTrigger: { trigger: scope, start: "top bottom", end: "bottom top", scrub: 0.6 } },
        );
        gsap.fromTo(
          ".close-marquee-b",
          { xPercent: -28 },
          { xPercent: 0, ease: "none", scrollTrigger: { trigger: scope, start: "top bottom", end: "bottom top", scrub: 0.6 } },
        );

        // headline words rise one after another
        gsap.from(".close-in", {
          yPercent: 115,
          rotate: 4,
          duration: 1.1,
          stagger: 0.07,
          ease: "power4.out",
          scrollTrigger: { trigger: ".close-title", start: "top 85%" },
        });
        gsap.from(".close-fade", {
          y: 28,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".close-title", start: "top 70%" },
        });
        gsap.from(".cta-facts li", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cta-facts", start: "top 95%" },
        });
      },
      () => cancelled,
    ).then((context) => {
      if (cancelled) context.revert();
      else ctx = context;
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={root} className="close" aria-labelledby="final-cta-heading">
      <Container>
        <div
          ref={card}
          className="close-card cta-panel"
          onPointerMove={(event) => {
            const node = card.current;
            if (!node || event.pointerType !== "mouse") return;
            const rect = node.getBoundingClientRect();
            node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
            node.style.setProperty("--my", `${event.clientY - rect.top}px`);
          }}
        >
          <div className="cta-aurora" aria-hidden="true" />
          <div className="cta-grid" aria-hidden="true" />
          <div className="cta-glow" aria-hidden="true" />

          <div className="close-marquee close-marquee-a" aria-hidden="true">
            <span>Reach them ✦ Reach them ✦ Reach them ✦</span>
          </div>
          <div className="close-marquee close-marquee-b" aria-hidden="true">
            <span>Start advertising ✦ Become a partner ✦ Start advertising ✦</span>
          </div>

          <div className="relative px-6 py-20 text-center md:px-12 md:py-28 xl:py-32">
            <p className="close-fade font-mono text-[11px] tracking-[0.18em] text-muted uppercase">Get started</p>

            <h2 id="final-cta-heading" className="close-title rv-title mx-auto mt-6 max-w-5xl" aria-label="Your audience is out there. Reach them.">
              <span className="close-row">
                {lineOne.map((word) => (
                  <Word key={word}>{word}</Word>
                ))}
              </span>
              <span className="close-row">
                {lineTwo.map((word) => (
                  <Word key={word}>{word}</Word>
                ))}
              </span>
              <span className="close-row">
                {lineThree.map((word) => (
                  <Word key={word} grad>
                    {word}
                  </Word>
                ))}
              </span>
            </h2>

            <p className="close-fade mx-auto mt-8 max-w-md text-lg leading-8 text-muted">
              Plan smarter. Advertise better. Measure what matters.
            </p>

            <div className="close-fade mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Magnetic>
                <Button href={siteConfig.appUrl} external variant="primary" className="cta-btn w-full justify-center sm:w-auto">
                  Start Advertising
                </Button>
              </Magnetic>
              <Magnetic>
                <Button href={siteConfig.partnerUrl} external variant="secondary" className="cta-btn w-full justify-center bg-white/80 sm:w-auto">
                  Become a Partner
                </Button>
              </Magnetic>
            </div>
          </div>

          <ul className="cta-facts">
            {facts.map((fact) => (
              <li key={fact.k}>
                <p className="font-display text-xl tracking-tight text-ink md:text-2xl">{fact.k}</p>
                <p className="mt-1 text-sm text-muted">{fact.v}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
