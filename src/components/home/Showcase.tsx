"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/home/SectionHeading";

type Slide = {
  venue: string;
  headline: string;
  spot: string;
  note: string;
  bg: string;
  ink: string;
  beam: string;
};

// Illustrative creatives only: no brands, no performance claims.
const slides: readonly Slide[] = [
  {
    venue: "Mall",
    headline: "Weekend",
    spot: "15 sec",
    note: "Atrium and concourse screens, where people slow down.",
    bg: "linear-gradient(135deg, #0f1519 0%, #1b2830 100%)",
    ink: "#cfe6f5",
    beam: "rgba(160, 205, 235, 0.22)",
  },
  {
    venue: "Street",
    headline: "Now open",
    spot: "10 sec",
    note: "Roadside and high-street screens with a long line of sight.",
    bg: "linear-gradient(135deg, #efe9dd 0%, #d9d0bf 100%)",
    ink: "#16130f",
    beam: "rgba(255, 255, 255, 0.55)",
  },
  {
    venue: "Transit",
    headline: "Next stop",
    spot: "30 sec",
    note: "Stations and routes, reaching people on the move.",
    bg: "linear-gradient(135deg, #1a1030 0%, #3a1f63 100%)",
    ink: "#f1e6ff",
    beam: "rgba(190, 150, 255, 0.28)",
  },
  {
    venue: "Store",
    headline: "New in",
    spot: "10 sec",
    note: "In-store screens, close to the moment of choice.",
    bg: "linear-gradient(135deg, #e6efe1 0%, #c9dcc2 100%)",
    ink: "#10261a",
    beam: "rgba(255, 255, 255, 0.55)",
  },
  {
    venue: "Office",
    headline: "Lunch",
    spot: "15 sec",
    note: "Lobbies and corridors, reaching people on the way through the day.",
    bg: "linear-gradient(135deg, #0c1a30 0%, #16345c 100%)",
    ink: "#dbeafe",
    beam: "rgba(130, 180, 255, 0.25)",
  },
];

const AUTOPLAY_MS = 5200;

function Card({ slide, active }: { slide: Slide; active: boolean }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-[1.1rem] [container-type:inline-size]"
      style={{ background: slide.bg, color: slide.ink }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(115deg, transparent 38%, ${slide.beam} 46%, transparent 58%)`,
        }}
      />
      <div className="relative flex h-full flex-col justify-between p-[4.5cqw]">
        <div className="flex items-center justify-between text-[3.2cqw] font-medium tracking-[-0.01em]">
          <span aria-hidden="true" className="flex items-center gap-[0.6cqw]">
            <span className="h-[2.8cqw] w-[2.8cqw] rounded-full bg-current" />
            <span className="h-[2.8cqw] w-[2.8cqw] rounded-full border border-current" />
          </span>
          <span className="flex gap-[4cqw] opacity-80">
            {slides.map((s) => (
              <span key={s.venue} className={s.venue === slide.venue ? "opacity-100" : "opacity-60"}>
                {s.venue}
              </span>
            ))}
          </span>
        </div>

        <div className="flex items-end gap-[2cqw]">
          <p className="text-[18cqw] leading-[0.82] font-semibold tracking-[-0.065em] pb-[1.2cqw]">{slide.headline}</p>
          <p className="pb-[2.4cqw] text-[3cqw] tracking-[0.02em] uppercase opacity-80">({slide.venue})</p>
        </div>

        <div className="flex items-end justify-between gap-[4cqw] text-[2.9cqw] leading-[1.3]">
          <p className="max-w-[44%] opacity-80">Illustrative creative, {slide.venue.toLowerCase()} screen.</p>
          <p className="text-right opacity-80">
            {slide.spot} spot
            <br />
            {active ? "Playing now" : "Up next"}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Showcase() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const dragStart = useRef<number | null>(null);
  const count = slides.length;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(() => setIndex((value) => (value + 1) % count), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, reduced, count]);

  const go = useCallback((step: number) => setIndex((value) => (value + step + count) % count), [count]);

  const offsetOf = (i: number) => {
    let d = i - index;
    if (d > count / 2) d -= count;
    if (d < -count / 2) d += count;
    return d;
  };

  return (
    <section aria-labelledby="showcase-heading" className="overflow-hidden bg-paper py-14 md:py-20">
      <Container>
        <SectionHeading
          id="showcase-heading"
          eyebrow="Where ads appear"
          title="Screens in places people already go."
          body="Malls, streets, offices, transit and stores. Pick the venue, set the hours."
        />
      </Container>

      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Venue types"
        tabIndex={0}
        className="mt-10 outline-none md:mt-14"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") go(1);
          if (event.key === "ArrowLeft") go(-1);
        }}
        onPointerDown={(event) => {
          dragStart.current = event.clientX;
        }}
        onPointerUp={(event) => {
          if (dragStart.current === null) return;
          const dx = event.clientX - dragStart.current;
          dragStart.current = null;
          if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
        }}
      >
        <div
          className="relative mx-auto w-full [--w:min(56vw,420px)] md:[--w:min(34vw,420px)]"
          style={{ height: "calc(var(--w) / 1.6)", perspective: "1900px" }}
        >
          {slides.map((slide, i) => {
            const d = offsetOf(i);
            const abs = Math.abs(d);
            const active = d === 0;
            return (
              <div
                key={slide.venue}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}: ${slide.venue}`}
                aria-hidden={!active}
                onClick={() => {
                  if (!active) setIndex(i);
                }}
                className={`absolute top-0 left-1/2 aspect-[1.6] w-[var(--w)] ${active ? "" : "cursor-pointer"} ${
                  reduced ? "" : "transition-[transform,opacity,filter] duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                }`}
                style={{
                  transform: `translateX(calc(-50% + ${d * 78}%)) translateZ(${-abs * 140}px) rotateY(${-d * 24}deg) scale(${1 - abs * 0.06})`,
                  opacity: abs > 2 ? 0 : abs === 2 ? 0.55 : abs === 1 ? 0.92 : 1,
                  filter: active ? "none" : "saturate(0.85) brightness(0.96)",
                  zIndex: 10 - abs,
                  boxShadow: active ? "0 40px 90px -30px rgba(16,17,20,0.45)" : "0 24px 60px -30px rgba(16,17,20,0.35)",
                  borderRadius: "1.1rem",
                  pointerEvents: abs > 2 ? "none" : "auto",
                }}
              >
                <Card slide={slide} active={active} />
              </div>
            );
          })}
        </div>

        <Container className="mt-8 md:mt-10">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div aria-live="polite" className="max-w-md">
              <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
                {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")} · {slides[index].venue}
              </p>
              <p className="mt-2 text-base leading-7 text-ink">{slides[index].note}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2" role="tablist" aria-label="Choose a venue">
                {slides.map((slide, i) => (
                  <button
                    key={slide.venue}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={slide.venue}
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all duration-500 ${i === index ? "w-7 bg-ink" : "w-2 bg-ink/25 hover:bg-ink/50"}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="rounded-full border border-ink/15 px-4 py-2 text-sm text-ink transition hover:border-ink/40 hover:bg-ink/5"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="rounded-full bg-ink px-4 py-2 text-sm text-white transition hover:bg-[#2a2d33]"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
