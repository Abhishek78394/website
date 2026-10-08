import type { default as Gsap } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

type GsapApi = typeof Gsap;
type ScrollTriggerApi = typeof ScrollTriggerType;

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export async function withGsap(
  scope: Element,
  setup: (gsap: GsapApi, ScrollTrigger: ScrollTriggerApi) => void,
  isCancelled?: () => boolean,
) {
  const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);
  if (isCancelled?.() || !scope.isConnected) {
    return { revert() {} };
  }
  gsap.registerPlugin(ScrollTrigger);
  const ctx = gsap.context(() => setup(gsap, ScrollTrigger), scope);
  ScrollTrigger.refresh();
  return ctx;
}
