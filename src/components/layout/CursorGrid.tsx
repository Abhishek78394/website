"use client";

import { useEffect, useRef } from "react";

export function CursorGrid() {
  const bg = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const touch = "ontouchstart" in window;
    root.setAttribute("data-touch", touch ? "true" : "false");
    if (touch || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nodes = bg.current?.querySelectorAll<HTMLElement>(".bg");
    const onMove = (event: MouseEvent) => {
      if (root.getAttribute("data-touch") === "true" || !nodes?.length) return;
      root.style.setProperty("--mx", `${event.clientX}px`);
      root.style.setProperty("--my", `${event.clientY}px`);
      const mask = `radial-gradient(circle at ${event.clientX}px ${event.clientY}px, #fff 0, hsla(0, 0%, 100%, 0) 20%)`;
      nodes.forEach((node) => {
        node.style.webkitMaskImage = mask;
        node.style.maskImage = mask;
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={bg} className="print" aria-hidden="true">
      <img className="bg ink" src="/cursor/print.svg" alt="" />
      <img className="static ink" src="/cursor/print-static.svg" alt="" />
      <img className="bg glow" src="/cursor/print.svg" alt="" />
      <img className="static glow" src="/cursor/print-static.svg" alt="" />
    </div>
  );
}
