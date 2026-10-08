import type { Entry } from "@/content/types";

export const solutions: Entry[] = [
  {
    slug: "per-second-advertising",
    title: "Per-second outdoor advertising",
    description:
      "Buy the seconds your ad runs. Skip unused inventory and start a campaign from ₹500.",
    eyebrow: "Solution",
    updatedAt: "2026-09-10",
    keywords: ["per second DOOH", "programmatic outdoor pricing", "buy billboard seconds"],
    sections: [
      {
        heading: "Pay for airtime, not a package",
        paragraphs: [
          "Traditional outdoor often sells a site for a week or a month. Screenista sells seconds on connected screens, so a brand can buy a dinner rush, a weekend, or a product-launch hour.",
          "Rates can start from ₹0.30 per second. A first campaign can begin at ₹500 and scale once the play reports look right.",
        ],
      },
      {
        heading: "What you control",
        paragraphs: [
          "Choose screens, days, and hours in one schedule. Pause or extend a live campaign from the advertiser app when a promotion ends early or a store needs more traffic.",
        ],
      },
    ],
    related: [
      { href: "/pricing", label: "Pricing" },
      { href: "/blog/per-second-pricing", label: "Why per-second pricing exists" },
    ],
  },
  {
    slug: "ai-audience-targeting",
    title: "AI audience targeting for DOOH",
    description:
      "Match screens to the audience and the moment. Use context, time, and location instead of buying every board in a city.",
    eyebrow: "Solution",
    updatedAt: "2026-09-10",
    keywords: ["AI DOOH targeting", "audience outdoor advertising", "contextual screens"],
    sections: [
      {
        heading: "Context before a city-wide buy",
        paragraphs: [
          "AI targeting on Screenista is a planning aid: it lines up campaign objective, audience, and screen context so the shortlist is not every display in the city. A restaurant brief looks different from a transit brand campaign.",
          "Signals include time of day, venue type, and location. The planner still approves the screens before anything goes live.",
        ],
      },
    ],
    related: [
      { href: "/how-it-works", label: "Campaign steps" },
      { href: "/industries/food-and-beverage", label: "Food and beverage example" },
    ],
  },
  {
    slug: "verified-play-logs",
    title: "Verified play logs",
    description:
      "See the seconds that actually played. Screenista reporting is built on delivery logs from connected screens.",
    eyebrow: "Solution",
    updatedAt: "2026-08-28",
    keywords: ["DOOH proof of play", "verified outdoor reporting", "play logs"],
    sections: [
      {
        heading: "Proof instead of a forecast only",
        paragraphs: [
          "Estimated reach is still useful for planning. It is a weak way to close a campaign. Screenista records play logs from connected screens so a report can show what ran.",
          "Those logs support pauses, makegood conversations, and client reporting. Blockchain-backed records are used so the play history is hard to alter after the fact.",
        ],
      },
    ],
    related: [
      { href: "/blog/measuring-outdoor-ads", label: "Measuring outdoor ads" },
      { href: "/screens", label: "Connected screens" },
    ],
  },
  {
    slug: "screen-owner-monetization",
    title: "Monetize screens you already own",
    description:
      "List displays, fill empty seconds, and track revenue. Built for media owners, venues, and real-estate partners.",
    eyebrow: "Solution",
    updatedAt: "2026-08-28",
    keywords: ["screen owner revenue", "DOOH inventory", "monetize digital signage"],
    sections: [
      {
        heading: "Empty seconds are unsold inventory",
        paragraphs: [
          "A lobby or mall screen that only plays house content is leaving airtime unused. Owners register the display, set when ads may run, and earn when advertiser campaigns play.",
          "The partner product shows what is scheduled, what is playing, and whether the device is online. Payouts are tracked in a wallet rather than in a monthly spreadsheet.",
        ],
      },
    ],
    related: [
      { href: "/screens", label: "For screen owners" },
      { href: "/partners", label: "Become a partner" },
    ],
  },
];
