"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion, withGsap } from "@/lib/motion/with-gsap";
import { Container } from "@/components/ui/Container";

const days = [
  { label: "Mon", height: "42%" },
  { label: "Tue", height: "58%" },
  { label: "Wed", height: "50%" },
  { label: "Thu", height: "74%" },
  { label: "Fri", height: "92%" },
  { label: "Sat", height: "80%" },
  { label: "Sun", height: "48%" },
];

const metrics = [
  "Campaign delivery",
  "Screen performance",
  "Audience exposure",
  "Dwell time",
  "QR interactions",
  "Campaign duration",
];

export function Analytics() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const scope = root.current;
    if (!scope || prefersReducedMotion()) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    withGsap(scope, (gsap, ScrollTrigger) => {
      gsap.from(".analytics-bar", {
        scaleY: 0,
        transformOrigin: "bottom",
        stagger: 0.06,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: { trigger: scope, start: "top 72%" },
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
    <section ref={root} className="bg-dark text-white" aria-labelledby="analytics-heading">
      <Container className="grid items-center gap-14 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:py-28">
        <div>
          <h2 id="analytics-heading" className="story-title">
            Know what happened after you pressed “Publish.”
          </h2>
          <p className="mt-5 max-w-md text-lg leading-8 text-white/65">
            Connected screens report play logs. That is the record of delivery. Response sits beside it when a creative
            includes a QR or NFC action.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-3 text-sm text-white/80">
            {metrics.map((metric) => (
              <li key={metric} className="border-t border-white/10 py-3">
                {metric}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
          <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.16em] text-white/40 uppercase">
            <span>Plays across a week</span>
            <span>Example view</span>
          </div>
          <div className="mt-8 flex h-48 items-end gap-3" aria-hidden="true">
            {days.map((day) => (
              <div key={day.label} className="flex h-full flex-1 flex-col justify-end">
                <div className="analytics-bar w-full rounded-t-md bg-white/80" style={{ height: day.height }} />
                <span className="mt-2 text-center font-mono text-[10px] text-white/40">{day.label}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-white/50">
            Illustrative shape only. A live report lists plays by screen and day from the campaign you booked.
          </p>
        </div>
      </Container>
    </section>
  );
}
