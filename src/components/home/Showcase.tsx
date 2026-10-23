"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/home/SectionHeading";

type Slide = {
  venue: string;
  places: string;
  note: string;
  spot: string;
  bg: string;
  ink: string;
  beam: string;
};

const slides: readonly Slide[] = [
  {
    venue: "Beauty & Grooming",
    places: "Screens placed in beauty and grooming venues.",
    note: "A screen in a beauty or grooming venue plays while people are already there for an appointment.",
    spot: "15 sec",
    bg: "linear-gradient(135deg, #0f1519 0%, #1b2830 100%)",
    ink: "#cfe6f5",
    beam: "rgba(160, 205, 235, 0.22)",
  },
  {
    venue: "Educational",
    places: "Screens placed in educational venues.",
    note: "Educational venues cover campuses and coaching centres, where the same screen can change by the hour.",
    spot: "15 sec",
    bg: "linear-gradient(135deg, #efe9dd 0%, #d9d0bf 100%)",
    ink: "#16130f",
    beam: "rgba(255, 255, 255, 0.55)",
  },
  {
    venue: "Fashion",
    places: "Screens placed in fashion venues.",
    note: "Fashion venues put the screen inside the store, next to the clothes people are already looking at.",
    spot: "10 sec",
    bg: "linear-gradient(135deg, #1a1030 0%, #3a1f63 100%)",
    ink: "#f1e6ff",
    beam: "rgba(190, 150, 255, 0.28)",
  },
  {
    venue: "Fitness",
    places: "Screens placed in fitness venues.",
    note: "Fitness venues are gyms and studios. The screen runs while people train.",
    spot: "10 sec",
    bg: "linear-gradient(135deg, #e6efe1 0%, #c9dcc2 100%)",
    ink: "#10261a",
    beam: "rgba(255, 255, 255, 0.55)",
  },
  {
    venue: "Health",
    places: "Screens placed in health venues.",
    note: "Health venues are clinics and care centres. The screen reaches people in the waiting time.",
    spot: "15 sec",
    bg: "linear-gradient(135deg, #0c1a30 0%, #16345c 100%)",
    ink: "#dbeafe",
    beam: "rgba(130, 180, 255, 0.25)",
  },
  {
    venue: "Hospitality",
    places: "Hotel, restaurant, cafe, bar, resort, club, pub.",
    note: "Hospitality screens sit in hotels, restaurants, cafes, bars, resorts, clubs, pubs and ice cream parlors.",
    spot: "15 sec",
    bg: "linear-gradient(160deg, #2a1548 0%, #6b2fd1 100%)",
    ink: "#f6e9ff",
    beam: "rgba(220, 180, 255, 0.28)",
  },
  {
    venue: "Realty Residential",
    places: "Apartment, open society, independent house, society.",
    note: "Residential realty screens are placed in apartments, open societies, independent houses and societies.",
    spot: "15 sec",
    bg: "linear-gradient(135deg, #f4efe6 0%, #e4d3bc 100%)",
    ink: "#1c140c",
    beam: "rgba(255, 255, 255, 0.55)",
  },
  {
    venue: "Realty Commercial",
    places: "Screens placed in commercial realty venues.",
    note: "Commercial realty screens sit in business properties, where people pass through the working day.",
    spot: "10 sec",
    bg: "linear-gradient(135deg, #14202b 0%, #243848 100%)",
    ink: "#d7e7f2",
    beam: "rgba(160, 200, 230, 0.22)",
  },
  {
    venue: "Retail",
    places: "Mall, supermarket, store, electronics, furniture.",
    note: "Retail screens are placed in malls, supermarkets, stores, electronics, furniture and automotive shops.",
    spot: "10 sec",
    bg: "linear-gradient(135deg, #101614 0%, #1d3a2e 100%)",
    ink: "#e5f6ea",
    beam: "rgba(170, 230, 190, 0.22)",
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
          <span className="uppercase tracking-[0.14em] opacity-70">Venue</span>
        </div>

        <p className="max-w-[96%] text-[8cqw] leading-[0.92] font-semibold tracking-[-0.045em]">{slide.venue}</p>

        <div className="flex items-end justify-between gap-[4cqw] text-[2.9cqw] leading-[1.3]">
          <p className="max-w-[62%] opacity-80">{slide.places}</p>
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
          eyebrow="Where screens are placed"
          title="The type of place a screen sits in."
          body="Beauty and grooming, educational, fashion, fitness, health, hospitality, residential realty, commercial realty and retail."
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
