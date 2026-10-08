"use client";

import { useEffect, useId, useRef } from "react";
import { prefersReducedMotion, withGsap } from "@/lib/motion/with-gsap";

const WORD = "SCREENiSTA";

// SVG user units. The word is stretched (letter-spacing only) to exactly VB_W.
const VB_W = 1000;
const VB_H = 190;
const BASELINE = 150;
const FONT_SIZE = 170;

const PAD = 380; // room around the word so the rough patch edge never clips

// Pointer ink, tuned to match the footer ink on heronaiapp.com:
// max radius is 45% of the short side of the interactive box, the displacement scale
// is capped at 150 / 0.7 of the radius, and two circles are used: a solid one that
// lags the pointer, and a fainter, slightly larger "pulse" ring that runs ahead of it.
const MAX_RADIUS = 100;
const DISPLACE = Math.min(150, MAX_RADIUS * 0.7);
const PULSE_RADIUS = MAX_RADIUS * 1.05;
const PULSE_OPACITY = 0.2;
const FOLLOW = 0.09; // main circle, fraction of the remaining distance per frame
const FOLLOW_PULSE = 0.15; // pulse circle

/**
 * Blueprint wordmark. The letters rest as unfilled outlines on a drafting strip.
 * Hovering inks a colour-gradient patch into whichever part of the letters is under
 * the pointer. The rough, bleeding edge is an SVG mask whose circles are pushed through
 * feTurbulence + feDisplacementMap and re-thresholded, the same technique (and the
 * same timings) as the pointer ink on heronaiapp.com.
 */
export function FooterWordmark() {
  const root = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, "");
  const filterId = `wm-ink-${uid}`;
  const maskId = `wm-mask-${uid}`;
  const gradId = `wm-grad-${uid}`;

  useEffect(() => {
    const scope = root.current;
    if (!scope) return;
    const reduced = prefersReducedMotion();
    let ctx: { revert: () => void } | undefined;
    let removeHover: (() => void) | undefined;
    let cancelled = false;

    withGsap(
      scope,
      (gsap) => {
        const svg = scope.querySelector<SVGSVGElement>(".wm-svg");
        const main = scope.querySelector<SVGCircleElement>(".wm-ink-main");
        const pulse = scope.querySelector<SVGCircleElement>(".wm-ink-pulse");
        const dot = scope.querySelector<HTMLElement>(".wm-cursor");
        if (!svg || !main || !pulse || !dot) return;

        const target = { x: 0, y: 0 };
        const current = { x: 0, y: 0 };
        const ahead = { x: 0, y: 0 };
        let entered = false;
        let raf = 0;

        const moveDotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
        const moveDotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });

        const paint = () => {
          raf = 0;
          current.x += (target.x - current.x) * FOLLOW;
          current.y += (target.y - current.y) * FOLLOW;
          ahead.x += (target.x - ahead.x) * FOLLOW_PULSE;
          ahead.y += (target.y - ahead.y) * FOLLOW_PULSE;
          main.setAttribute("cx", String(current.x));
          main.setAttribute("cy", String(current.y));
          pulse.setAttribute("cx", String(ahead.x));
          pulse.setAttribute("cy", String(ahead.y));
          if (entered && (Math.abs(target.x - current.x) > 0.1 || Math.abs(target.y - current.y) > 0.1)) {
            raf = requestAnimationFrame(paint);
          }
        };

        const setPointer = (event: PointerEvent, snap: boolean) => {
          const box = svg.getBoundingClientRect();
          if (!box.width || !box.height) return;
          target.x = Math.max(0, Math.min(VB_W, ((event.clientX - box.left) / box.width) * VB_W));
          target.y = Math.max(0, Math.min(VB_H, ((event.clientY - box.top) / box.height) * VB_H));
          if (snap || reduced) {
            current.x = ahead.x = target.x;
            current.y = ahead.y = target.y;
          }
          if (!raf) raf = requestAnimationFrame(paint);

          const host = scope.getBoundingClientRect();
          const x = event.clientX - host.left;
          const y = event.clientY - host.top;
          if (snap) gsap.set(dot, { x, y });
          else {
            moveDotX(x);
            moveDotY(y);
          }
        };

        const onEnter = (event: PointerEvent) => {
          entered = true;
          setPointer(event, true);
          gsap.killTweensOf(main);
          gsap.killTweensOf(pulse);
          gsap.killTweensOf(dot);
          gsap.to(main, { attr: { r: MAX_RADIUS }, duration: reduced ? 0 : 0.55, ease: "power3.out" });
          gsap.to(pulse, {
            attr: { r: PULSE_RADIUS },
            opacity: PULSE_OPACITY,
            duration: reduced ? 0 : 0.45,
            ease: "power3.out",
          });
          gsap.to(dot, { opacity: 1, scale: 1, duration: reduced ? 0 : 0.25, ease: "power3.out" });
        };

        const onMove = (event: PointerEvent) => {
          if (!entered) onEnter(event);
          else setPointer(event, false);
        };

        const onLeave = () => {
          entered = false;
          gsap.killTweensOf(main);
          gsap.killTweensOf(pulse);
          gsap.killTweensOf(dot);
          gsap.to(main, { attr: { r: 0 }, duration: reduced ? 0 : 0.8, ease: "power3.inOut" });
          gsap.to(pulse, { attr: { r: 0 }, opacity: 0, duration: reduced ? 0 : 1, ease: "power3.out" });
          gsap.to(dot, { opacity: 0, scale: 0.4, duration: reduced ? 0 : 0.25, ease: "power3.out" });
        };

        svg.addEventListener("pointerenter", onEnter);
        svg.addEventListener("pointermove", onMove);
        svg.addEventListener("pointerleave", onLeave);
        svg.addEventListener("pointercancel", onLeave);
        removeHover = () => {
          cancelAnimationFrame(raf);
          svg.removeEventListener("pointerenter", onEnter);
          svg.removeEventListener("pointermove", onMove);
          svg.removeEventListener("pointerleave", onLeave);
          svg.removeEventListener("pointercancel", onLeave);
        };
      },
      () => cancelled,
    ).then((context) => {
      if (cancelled) {
        context.revert();
        removeHover?.();
      } else ctx = context;
    });

    return () => {
      cancelled = true;
      removeHover?.();
      ctx?.revert();
    };
  }, []);

  const textProps = {
    x: 0,
    y: BASELINE,
    fontSize: FONT_SIZE,
    textLength: VB_W,
    lengthAdjust: "spacing" as const,
  };

  const region = {
    x: -PAD,
    y: -60,
    width: VB_W + PAD * 2,
    height: VB_H + 120,
  };

  return (
    <div ref={root} className="wordmark" role="img" aria-label="SCREENiSTA">
      <div className="wm-stage" aria-hidden="true">
        <span className="wm-guide wm-guide-top" />
        <span className="wm-guide wm-guide-base" />
        <svg className="wm-svg" viewBox={`0 0 ${VB_W} ${VB_H}`} focusable="false">
          <defs>
            {/* the colour that gets inked in under the pointer */}
            <linearGradient id={gradId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={VB_W} y2={VB_H}>
              <stop offset="0" stopColor="#2f7bff" />
              <stop offset="0.35" stopColor="#7a4dff" />
              <stop offset="0.7" stopColor="#ff4fa3" />
              <stop offset="1" stopColor="#ff5a36" />
            </linearGradient>

            {/* same recipe as the Heron pointer-ink filter: displace, soften, re-threshold alpha */}
            <filter id={filterId} x="-25%" y="-25%" width="150%" height="150%">
              <feTurbulence type="fractalNoise" baseFrequency="0.028 0.04" numOctaves={3} seed={5} result="noise" />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale={DISPLACE}
                xChannelSelector="R"
                yChannelSelector="G"
              />
              <feGaussianBlur stdDeviation={0.55} result="blurred" />
              <feComponentTransfer in="blurred" result="contrast">
                <feFuncA type="linear" slope={5} intercept={-2.15} />
              </feComponentTransfer>
            </filter>

            <mask id={maskId} maskUnits="userSpaceOnUse" {...region}>
              <circle
                className="wm-ink-main"
                cx={VB_W / 2}
                cy={VB_H / 2}
                r={0}
                fill="#fff"
                style={{ filter: `url(#${filterId})` }}
              />
              <circle
                className="wm-ink-pulse"
                cx={VB_W / 2}
                cy={VB_H / 2}
                r={0}
                fill="#fff"
                opacity={0}
                style={{ filter: `url(#${filterId})` }}
              />
            </mask>
          </defs>

          <text {...textProps} className="wm-glyphs wm-outline">
            {WORD}
          </text>
          <text {...textProps} className="wm-glyphs wm-hover" fill={`url(#${gradId})`} mask={`url(#${maskId})`}>
            {WORD}
          </text>
        </svg>
      </div>
      <span className="wm-cursor" aria-hidden="true" />
    </div>
  );
}
