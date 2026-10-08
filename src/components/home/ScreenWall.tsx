"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion, withGsap } from "@/lib/motion/with-gsap";
import { Container } from "@/components/ui/Container";

const venues = ["Retail", "Mall", "Office", "Transit", "Outdoor", "Commercial", "Hospitality"];

export function ScreenWall() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const scope = root.current;
    if (!scope || prefersReducedMotion()) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    withGsap(scope, (gsap, ScrollTrigger) => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const frames = gsap.utils.toArray<HTMLElement>(".wall-screen");
        const traveler = scope.querySelector<HTMLElement>(".wall-traveler");
        const track = scope.querySelector<HTMLElement>(".wall-track");
        if (!traveler || !track) return;
        gsap.to(traveler, {
          x: () => Math.max(0, track.clientWidth - traveler.clientWidth),
          ease: "none",
          scrollTrigger: {
            trigger: scope,
            start: "top 65%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        });
        ScrollTrigger.create({
          trigger: scope,
          start: "top 70%",
          end: "bottom 40%",
          scrub: true,
          onUpdate: (self) => {
            const index = Math.min(frames.length - 1, Math.floor(self.progress * frames.length));
            frames.forEach((frame, frameIndex) => frame.classList.toggle("is-active", frameIndex <= index));
          },
        });
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
    <section ref={root} className="bg-dark text-white" aria-labelledby="wall-heading">
      <Container className="py-20 lg:py-28">
        <h2 id="wall-heading" className="story-title max-w-4xl">
          One campaign. Multiple screens. One platform.
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-8 text-white/65">
          The same plan can move across retail, transit, offices, and outdoor sites.
        </p>
        <div className="wall-track relative mt-12">
          <div
            className="wall-traveler mb-4 hidden w-max rounded-full border border-accent/50 bg-accent/10 px-4 py-2 text-sm text-white lg:inline-flex"
            aria-hidden="true"
          >
            Example · Evening offer
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {venues.map((venue) => (
              <li
                key={venue}
                className="wall-screen rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-[border-color] duration-300"
              >
                <p className="font-mono text-[10px] tracking-[0.16em] text-white/40 uppercase">{venue}</p>
                <div className="screen-bezel relative mt-4 aspect-[16/10] overflow-hidden rounded-lg">
                  <div className="absolute inset-x-3 bottom-3">
                    <p className="font-display text-lg">Evening offer</p>
                    <p className="text-xs text-white/55">Example creative</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
