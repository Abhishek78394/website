"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";
import { prefersReducedMotion, withGsap } from "@/lib/motion/with-gsap";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/home/Magnetic";

const lines = ["Outdoor", "advertising,"] as const;

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const scope = root.current;
    if (!scope || prefersReducedMotion()) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    withGsap(scope, (gsap) => {
      gsap.from(".hero-line", {
        yPercent: 110,
        duration: 1.05,
        stagger: 0.08,
        ease: "power3.out",
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
    <section ref={root} className="hero-bg relative -mt-14 text-white">
      <div className="hero-pin flex min-h-svh flex-col justify-center pt-(--nav-h) pb-12">
        <div className="hero-copy mx-auto w-full max-w-[1400px] px-5 text-center">
          <p className="font-mono text-[11px] tracking-[0.18em] text-white/45 uppercase">Intelligent Out of Home</p>
          <h1 className="hero-title mx-auto mt-4 text-white">
            {lines.map((line) => (
              <span key={line} className="hero-mask block">
                <span className="hero-line block">{line}</span>
              </span>
            ))}
            <span className="hero-mask block md:hidden">
              <span className="hero-line block">made</span>
            </span>
            <span className="hero-mask block md:hidden">
              <span className="hero-line block">intelligent.</span>
            </span>
            <span className="hero-mask hidden md:block">
              <span className="hero-line block">made intelligent.</span>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/70 md:text-lg md:leading-8">
            Reach the right audience on digital screens across high-value locations — with flexible campaigns,
            intelligent targeting and measurable results.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <Button href={siteConfig.appUrl} external variant="light">
                Start Advertising
              </Button>
            </Magnetic>
            <Button href="/locations" variant="ghost">
              Explore Our Network
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
