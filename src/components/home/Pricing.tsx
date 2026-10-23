"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { prefersReducedMotion, withGsap } from "@/lib/motion/with-gsap";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/home/Magnetic";

const RATE_PAISE = 30;
const MAX_SECONDS = 120;
const DEFAULT_SECONDS = 30;
const DEFAULT_SCREENS = 4;
const MAX_SCREENS = 20;
const DEFAULT_PLAYS = 10;
const MAX_PLAYS = 200;
const VIEWERS_PER_PLAY = 20;
const presets = [10, 30, 60, 120] as const;
const screenPresets = [1, 2, 4, 8] as const;
const playPresets = [1, 5, 10, 20] as const;

const steps = [
  { n: "01", label: "Choose location" },
  { n: "02", label: "Choose screen" },
  { n: "03", label: "Choose duration" },
  { n: "04", label: "Choose time" },
  { n: "05", label: "Set budget" },
  { n: "06", label: "Launch campaign" },
];

const ARC_R = 160;
const ARC_LEN = 2 * Math.PI * ARC_R;

function rupees(seconds: number, screens: number, plays: number) {
  return (seconds * screens * plays * RATE_PAISE) / 100;
}

function impressions(screens: number, plays: number) {
  return screens * plays * VIEWERS_PER_PLAY;
}

function quoteRef(seconds: number, screens: number, plays: number) {
  const day = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `SQ-${day}-${seconds}-${screens}-${plays}`;
}

function quotationMessage(seconds: number, screens: number, plays: number) {
  const budget = formatRupees(rupees(seconds, screens, plays));
  const reach = impressions(screens, plays).toLocaleString("en-IN");
  const date = new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date());
  return [
    "*SCREENISTA QUOTATION*",
    `Ref: ${quoteRef(seconds, screens, plays)}`,
    `Date: ${date}`,
    "",
    "From",
    siteConfig.legalName,
    siteConfig.email,
    "",
    "*Campaign*",
    `Ad length: ${seconds} seconds`,
    `Screens: ${screens}`,
    `Plays per screen: ${plays}`,
    "Rate: ₹0.30 per second",
    "",
    "*Amount*",
    `${seconds} sec × ${screens} screens × ${plays} plays × ₹0.30`,
    `*Total: ${budget}*`,
    "",
    "*Outcome for the client*",
    `Estimated impressions: ${reach}`,
    `About ${VIEWERS_PER_PLAY} people could see each play. This is a planning estimate, not a verified play log.`,
    "",
    "Cities: Bhopal, Indore, Jaipur, Goa, Hisar",
  ].join("\n");
}

function formatRupees(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

const ticks = Array.from({ length: 60 }, (_, i) => i);

export function Pricing() {
  const root = useRef<HTMLElement>(null);
  const priceRef = useRef<HTMLSpanElement>(null);
  const gsapRef = useRef<typeof import("gsap").default | null>(null);
  const shown = useRef({ value: rupees(DEFAULT_SECONDS, DEFAULT_SCREENS, DEFAULT_PLAYS) });
  const [seconds, setSeconds] = useState<number>(DEFAULT_SECONDS);
  const [screens, setScreens] = useState<number>(DEFAULT_SCREENS);
  const [plays, setPlays] = useState<number>(DEFAULT_PLAYS);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const quoteRefEl = useRef<HTMLElement>(null);

  // Scroll choreography
  useEffect(() => {
    const scope = root.current;
    if (!scope || prefersReducedMotion()) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    withGsap(
      scope,
      (gsap) => {
        gsapRef.current = gsap;

        gsap.from(".rate-line", {
          yPercent: 112,
          duration: 1.1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ".rate-head", start: "top 80%" },
        });
        gsap.from(".rate-note", {
          x: 180,
          opacity: 0,
          duration: 1.2,
          stagger: 0.14,
          ease: "power4.out",
          scrollTrigger: { trigger: ".rate-head", start: "top 75%" },
        });
        gsap.from(".rate-fade", {
          y: 24,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".rate-head", start: "top 70%" },
        });

        // giant outlined type drifts sideways as you scroll
        gsap.fromTo(
          ".rate-marquee",
          { xPercent: 0 },
          {
            xPercent: -32,
            ease: "none",
            scrollTrigger: { trigger: scope, start: "top bottom", end: "bottom top", scrub: 0.6 },
          },
        );

        // controls card + dial come in, then the dial drifts at its own speed
        gsap.from(".rate-controls", {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".rate-grid", start: "top 80%" },
        });
        gsap.from(".rate-dial", {
          scale: 0.82,
          rotate: -24,
          opacity: 0,
          duration: 1.3,
          ease: "power4.out",
          scrollTrigger: { trigger: ".rate-grid", start: "top 75%" },
        });
        gsap.to(".rate-dial-wrap", {
          yPercent: -7,
          ease: "none",
          scrollTrigger: { trigger: ".rate-grid", start: "top bottom", end: "bottom top", scrub: true },
        });

        // booking flow draws itself
        gsap.fromTo(
          ".rate-steps-fill",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: ".rate-steps", start: "top 85%", end: "top 40%", scrub: true },
          },
        );
        gsap.from(".rate-step", {
          y: 36,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".rate-steps", start: "top 85%" },
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

  // The price rolls to its new value instead of jumping
  useEffect(() => {
    const el = priceRef.current;
    if (!el) return;
    const target = rupees(seconds, screens, plays);
    const gsap = gsapRef.current;
    if (!gsap || prefersReducedMotion()) {
      shown.current.value = target;
      el.textContent = formatRupees(target);
      return;
    }
    const tween = gsap.to(shown.current, {
      value: target,
      duration: 0.7,
      ease: "power3.out",
      overwrite: true,
      onUpdate: () => {
        const v = shown.current.value;
        el.textContent = formatRupees(Math.round(v * 100) / 100);
      },
    });
    return () => {
      tween.kill();
    };
  }, [seconds, screens, plays]);

  const progress = (seconds / MAX_SECONDS) * 100;
  const budget = rupees(seconds, screens, plays);
  const reach = impressions(screens, plays);
  const showQuote = () => {
    setQuoteOpen(true);
    window.setTimeout(() => {
      quoteRefEl.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  };

  return (
    <section ref={root} id="pricing" className="rate" aria-labelledby="pricing-heading">
      <div className="rate-marquee" aria-hidden="true">
        <span>₹0.30 / second</span>
        <span>₹0.30 / second</span>
        <span>₹0.30 / second</span>
      </div>

      <Container className="relative py-20 md:py-32">
        <div className="rate-head">
          <div className="max-w-3xl">
          <p className="rate-fade font-mono text-[11px] tracking-[0.18em] text-muted uppercase">Pricing</p>
          <h2 id="pricing-heading" className="rv-title mt-5" aria-label="Every second has value.">
            <span className="rv-mask">
              <span className="rv-line rate-line">Every second</span>
            </span>
            <span className="rv-mask">
              <span className="rv-line rv-grad rate-line">has value.</span>
            </span>
          </h2>
          <p className="rate-fade mt-7 max-w-md text-lg leading-8 text-muted">
            Pay for the advertising time you actually use. The live price follows the screen and the hour.
          </p>
          </div>

          {/* notes that slide in from the right, decorative only */}
          <div className="rate-notes" aria-hidden="true">
            <div className="rate-note rate-note-a">
              <div className="rate-note-ad" />
              <div className="mt-3 flex items-center justify-between text-[11px] font-medium text-ink/70">
                <span className="inline-flex items-center gap-1.5">
                  <span className="rate-live" /> Now playing
                </span>
                <span className="font-mono text-ink/45">0:30</span>
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-ink/10">
                <div className="rate-note-progress" />
              </div>
            </div>

            <div className="rate-note rate-note-b">
              <span className="grid size-6 flex-none place-items-center rounded-full bg-emerald-500 text-white">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>
                <span className="block text-[13px] font-medium text-ink">Play verified</span>
                <span className="block text-[11px] text-muted">Play logs for every booking</span>
              </span>
            </div>

            <div className="rate-note rate-note-c">
              <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">Starting rate</p>
              <p className="mt-1.5 text-3xl font-semibold tracking-tight text-ink">
                ₹0.30<span className="ml-1 text-sm font-medium text-muted">/ sec</span>
              </p>
              <p className="mt-1 text-[11px] text-muted">Campaigns from ₹500</p>
            </div>

            <div className="rate-note rate-note-d">
              <span className="size-1.5 rounded-full bg-accent" />
              Bhopal · Indore · Jaipur · Goa · Hisar
            </div>
          </div>
        </div>

        <div className="rate-grid">
          <div className="rate-controls">
            <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Try it at the starting rate</p>

            <div className="rate-chips mt-5" role="group" aria-label="Example durations">
              {presets.map((preset) => (
                <button key={preset} type="button" aria-pressed={seconds === preset} onClick={() => setSeconds(preset)}>
                  {preset}s
                </button>
              ))}
            </div>

            <label className="mt-8 block">
              <span className="flex items-baseline justify-between text-sm text-muted">
                <span>Drag to set the duration</span>
                <span className="font-mono text-ink">{seconds} sec</span>
              </span>
              <input
                className="rate-range mt-4"
                type="range"
                min={1}
                max={MAX_SECONDS}
                step={1}
                value={seconds}
                onChange={(event) => setSeconds(Number(event.target.value))}
                style={{ ["--p" as string]: `${progress}%` }}
                aria-label="Duration in seconds"
              />
              <span className="rate-scale" aria-hidden="true">
                <span>1s</span>
                <span>60s</span>
                <span>120s</span>
              </span>
            </label>

            <div className="mt-8">
              <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">How many screens</p>
              <div className="rate-chips mt-3" role="group" aria-label="Number of screens">
                {screenPresets.map((preset) => (
                  <button key={preset} type="button" aria-pressed={screens === preset} onClick={() => setScreens(preset)}>
                    {preset}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <button
                  type="button"
                  className="grid size-9 place-items-center rounded-full border border-ink/15 text-lg text-ink hover:border-ink/40"
                  onClick={() => setScreens((value) => Math.max(1, value - 1))}
                  aria-label="Fewer screens"
                >
                  −
                </button>
                <p className="font-mono text-sm text-ink">
                  {screens} {screens === 1 ? "screen" : "screens"}
                </p>
                <button
                  type="button"
                  className="grid size-9 place-items-center rounded-full border border-ink/15 text-lg text-ink hover:border-ink/40"
                  onClick={() => setScreens((value) => Math.min(MAX_SCREENS, value + 1))}
                  aria-label="More screens"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-8">
              <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Plays per screen</p>
              <div className="rate-chips mt-3" role="group" aria-label="Plays per screen">
                {playPresets.map((preset) => (
                  <button key={preset} type="button" aria-pressed={plays === preset} onClick={() => setPlays(preset)}>
                    {preset}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <button
                  type="button"
                  className="grid size-9 place-items-center rounded-full border border-ink/15 text-lg text-ink hover:border-ink/40"
                  onClick={() => setPlays((value) => Math.max(1, value - 1))}
                  aria-label="Fewer plays"
                >
                  −
                </button>
                <p className="font-mono text-sm text-ink">
                  {plays} {plays === 1 ? "play" : "plays"} each
                </p>
                <button
                  type="button"
                  className="grid size-9 place-items-center rounded-full border border-ink/15 text-lg text-ink hover:border-ink/40"
                  onClick={() => setPlays((value) => Math.min(MAX_PLAYS, value + 1))}
                  aria-label="More plays"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 border-t border-line pt-6">
              <div>
                <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">Budget</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight text-ink">
                  {formatRupees(rupees(seconds, screens, plays))}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">Impressions</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight text-ink">
                  {impressions(screens, plays).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">
              {seconds} seconds × {screens} {screens === 1 ? "screen" : "screens"} × {plays}{" "}
              {plays === 1 ? "play" : "plays"} × ₹0.30 per second. About {VIEWERS_PER_PLAY} people could see each play — a
              planning estimate, not a verified play log.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={showQuote}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2a2d33]"
              >
                Show quotation
                <span aria-hidden="true">→</span>
              </button>
              <Button href={siteConfig.appUrl} external variant="secondary" className="w-full justify-center sm:w-auto">
                Start Advertising
              </Button>
            </div>
          </div>

          <div className="rate-dial-wrap">
            <div className="rate-dial">
              <svg viewBox="0 0 400 400" aria-hidden="true">
                <defs>
                  <linearGradient id="rate-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#2f7bff" />
                    <stop offset="45%" stopColor="#7a4dff" />
                    <stop offset="80%" stopColor="#ff4fa3" />
                    <stop offset="100%" stopColor="#ff5a36" />
                  </linearGradient>
                </defs>
                {ticks.map((tick) => (
                  <line
                    key={tick}
                    x1="200"
                    y1={tick % 5 === 0 ? 8 : 14}
                    x2="200"
                    y2="22"
                    className={tick % 5 === 0 ? "rate-tick rate-tick-major" : "rate-tick"}
                    transform={`rotate(${tick * 6} 200 200)`}
                  />
                ))}
                <circle cx="200" cy="200" r={ARC_R} className="rate-track" />
                <circle
                  cx="200"
                  cy="200"
                  r={ARC_R}
                  className="rate-arc"
                  stroke="url(#rate-grad)"
                  strokeDasharray={ARC_LEN}
                  strokeDashoffset={ARC_LEN * (1 - seconds / MAX_SECONDS)}
                />
                <g className="rate-hand">
                  <line x1="200" y1="30" x2="200" y2="48" className="rate-hand-line" />
                  <circle cx="200" cy="26" r="4.5" className="rate-hand-dot" />
                </g>
              </svg>

              <div className="rate-face">
                <p className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">You pay</p>
                <p className="rate-price" aria-hidden="true">
                  <span ref={priceRef}>{formatRupees(rupees(DEFAULT_SECONDS, DEFAULT_SCREENS, DEFAULT_PLAYS))}</span>
                </p>
                <p className="sr-only" aria-live="polite">
                  {formatRupees(rupees(seconds, screens, plays))} for {seconds} seconds, {plays} plays, on {screens}{" "}
                  screens. Estimated impressions {impressions(screens, plays)}.
                </p>
                <p className="mt-2 text-sm text-muted">
                  {plays} {plays === 1 ? "play" : "plays"} on {screens} {screens === 1 ? "screen" : "screens"}
                </p>
              </div>
            </div>
            <p className="rate-chip-float">Live price follows the screen and the hour</p>
          </div>
        </div>

        {quoteOpen ? (
          <article
            ref={quoteRefEl}
            id="quotation"
            aria-labelledby="quotation-heading"
            className="mt-12 scroll-mt-24 rounded-[2rem] border border-white/90 bg-white px-6 py-8 shadow-[0_30px_70px_-34px_rgba(16,17,20,0.28)] md:px-10 md:py-10"
          >
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
              <div>
                <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">Quotation</p>
                <h3 id="quotation-heading" className="mt-2 font-display text-4xl tracking-tight text-ink">
                  Screenista
                </h3>
                <p className="mt-2 text-sm text-muted">{siteConfig.legalName}</p>
                <p className="text-sm text-muted">{siteConfig.email}</p>
              </div>
              <div className="text-sm leading-6 text-ink">
                <p>
                  <span className="text-muted">Ref </span>
                  {quoteRef(seconds, screens, plays)}
                </p>
                <p>
                  <span className="text-muted">Date </span>
                  {new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date())}
                </p>
                <p>
                  <span className="text-muted">Cities </span>
                  Bhopal, Indore, Jaipur, Goa, Hisar
                </p>
              </div>
            </div>

            <table className="mt-6 w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-[11px] tracking-[0.14em] text-muted uppercase">
                  <th className="py-3 font-medium">Item</th>
                  <th className="py-3 text-right font-medium">Detail</th>
                </tr>
              </thead>
              <tbody className="text-ink">
                <tr className="border-b border-line/80">
                  <td className="py-3">Ad length</td>
                  <td className="py-3 text-right">{seconds} seconds</td>
                </tr>
                <tr className="border-b border-line/80">
                  <td className="py-3">Screens</td>
                  <td className="py-3 text-right">{screens}</td>
                </tr>
                <tr className="border-b border-line/80">
                  <td className="py-3">Plays per screen</td>
                  <td className="py-3 text-right">{plays}</td>
                </tr>
                <tr className="border-b border-line/80">
                  <td className="py-3">Rate</td>
                  <td className="py-3 text-right">₹0.30 per second</td>
                </tr>
                <tr>
                  <td className="py-3 text-muted">
                    {seconds} sec × {screens} screens × {plays} plays
                  </td>
                  <td className="py-3 text-right font-semibold">{formatRupees(budget)}</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-paper px-5 py-4">
                <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">Total</p>
                <p className="mt-1 text-3xl font-semibold tracking-tight text-ink">{formatRupees(budget)}</p>
              </div>
              <div className="rounded-2xl bg-paper px-5 py-4">
                <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">Outcome</p>
                <p className="mt-1 text-3xl font-semibold tracking-tight text-ink">{reach.toLocaleString("en-IN")}</p>
                <p className="mt-1 text-sm text-muted">Estimated impressions</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted">
              About {VIEWERS_PER_PLAY} people could see each play. This is a planning estimate, not a verified play log.
              The live price follows the screen and the hour.
            </p>

            <div className="mt-7">
              <Magnetic>
                <Button
                  href={`https://wa.me/?text=${encodeURIComponent(quotationMessage(seconds, screens, plays))}`}
                  external
                  className="w-full justify-center sm:w-auto"
                >
                  Send this quotation on WhatsApp
                </Button>
              </Magnetic>
            </div>
          </article>
        ) : null}

        <ol className="rate-steps">
          <li className="rate-steps-line" aria-hidden="true">
            <span className="rate-steps-fill" />
          </li>
          {steps.map((step) => (
            <li key={step.n} className="rate-step">
              <span className="rate-step-dot" aria-hidden="true" />
              <span className="font-mono text-[10px] tracking-[0.16em] text-muted">{step.n}</span>
              <p className="mt-1.5 text-sm font-medium text-ink md:text-[15px]">{step.label}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
