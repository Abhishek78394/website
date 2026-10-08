"use client";

import Link from "next/link";
import { useState } from "react";
import { cities } from "@/content/cities";
import { Container } from "@/components/ui/Container";

const pins: Record<string, { x: number; y: number }> = {
  "delhi-ncr": { x: 34, y: 28 },
  ahmedabad: { x: 26, y: 42 },
  bhopal: { x: 34, y: 44 },
  mumbai: { x: 25, y: 54 },
  hyderabad: { x: 38, y: 58 },
  bengaluru: { x: 36, y: 68 },
  chennai: { x: 42, y: 72 },
  dubai: { x: 72, y: 40 },
};

export function NetworkMap() {
  const [active, setActive] = useState<string>("mumbai");
  const city = cities.find((item) => item.slug === active) ?? cities[0];

  return (
    <section id="network" className="bg-dark text-white" aria-labelledby="network-heading">
      <Container className="py-20 lg:py-28">
        <div className="max-w-3xl">
          <p className="font-mono text-[11px] tracking-[0.18em] text-white/45 uppercase">Network</p>
          <h2 id="network-heading" className="story-title mt-4 max-w-4xl">
            Your audience is already out there.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/65">
            India and the GCC. Select a market to see the venues advertisers can plan against.
          </p>
        </div>
        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.6fr)]">
          <div className="relative min-h-[28rem] overflow-hidden rounded-2xl border border-white/10 bg-[#101218]">
            <svg viewBox="0 0 1000 640" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <defs>
                <pattern id="graticule" width="48" height="48" patternUnits="userSpaceOnUse">
                  <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.05)" />
                </pattern>
              </defs>
              <rect width="1000" height="640" fill="url(#graticule)" />
              <path
                d="M340 80 C400 68 450 120 490 160 C560 150 600 200 550 240 C510 270 500 310 470 330 C450 390 430 460 390 510 C360 555 320 580 300 545 C270 520 245 470 235 420 C210 370 190 320 210 270 C185 220 230 170 260 145 C285 110 305 90 340 80 Z"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.16)"
              />
              <path
                d="M690 210 C740 190 790 220 780 270 C800 300 760 340 710 325 C660 310 650 245 690 210 Z"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.16)"
              />
              <text x="250" y="600" fill="rgba(255,255,255,0.35)" fontSize="14">
                India
              </text>
              <text x="680" y="360" fill="rgba(255,255,255,0.35)" fontSize="14">
                GCC
              </text>
            </svg>
            {cities.map((item) => {
              const pin = pins[item.slug];
              if (!pin) return null;
              const selected = item.slug === city.slug;
              return (
                <button
                  key={item.slug}
                  type="button"
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  aria-pressed={selected}
                  onMouseEnter={() => setActive(item.slug)}
                  onFocus={() => setActive(item.slug)}
                  onClick={() => setActive(item.slug)}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`block h-2.5 w-2.5 rounded-full bg-accent ${selected ? "pin-pulse" : "opacity-80"}`}
                    />
                    <span className={`text-xs ${selected ? "text-white" : "text-white/55"}`}>{item.name}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <aside className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div>
              <p className="font-mono text-[11px] tracking-[0.16em] text-white/45 uppercase">{city.region}</p>
              <h3 className="mt-3 font-display text-4xl">{city.name}</h3>
              <p className="mt-4 text-sm leading-6 text-white/65">
                Venue types on this market: {city.venues.join(", ")}.
              </p>
              <p className="mt-4 text-sm leading-6 text-white/65">
                Inventory is listed by venue and hour. Screen counts change as owners join, so this map does not
                publish a fixed total.
              </p>
            </div>
            <Link
              href={`/locations/${city.slug}`}
              className="mt-8 inline-flex items-center gap-2 text-sm text-white"
            >
              View {city.name}
              <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>
        <p className="mt-6 text-sm text-white/45">
          <Link href="/locations" className="underline decoration-white/20 underline-offset-4 hover:decoration-white">
            All markets
          </Link>
          <span> · Expansion planning includes the United Kingdom and the Baltic region.</span>
        </p>
      </Container>
    </section>
  );
}
