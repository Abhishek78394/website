import type { ReactNode } from "react";

/**
 * Small line icons for the dropdown rows, keyed by destination so the nav data stays plain.
 * All are 24x24, drawn with currentColor.
 */
const paths: Record<string, ReactNode> = {
  "/how-it-works": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5v7l6-3.5z" />
    </>
  ),
  "/solutions/per-second-advertising": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  "/solutions/screen-owner-monetization": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 8h6M9 11.5h6M9.5 8c4 0 4 4 0 4H9l5 4.5" />
    </>
  ),
  "/industries": <path d="M4 4h6.5v6.5H4zM13.5 4H20v6.5h-6.5zM4 13.5h6.5V20H4zM13.5 13.5H20V20h-6.5z" />,
  "/pricing": (
    <>
      <path d="M3 12V4h8l10 10-8 8z" />
      <path d="M7.5 8.5h.01" />
    </>
  ),
  "/technology": (
    <>
      <path d="m12 3 9 5-9 5-9-5z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
  "/solutions/ai-audience-targeting": (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 12h.01" />
    </>
  ),
  "/solutions/verified-play-logs": (
    <>
      <path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  "/advertise": <path d="m3 17 6-6 4 4 8-8M15 7h6v6" />,
  "/screens": (
    <>
      <path d="M3 4h18v12H3z" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  "/partners": (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M16 5.2a3 3 0 0 1 0 5.6M18 14.4c1.8.8 3 2.6 3 5.6" />
    </>
  ),
  "/locations": (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
};

export function NavIcon({ href }: { href: string }) {
  const glyph = paths[href] ?? <circle cx="12" cy="12" r="3" />;
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {glyph}
    </svg>
  );
}
