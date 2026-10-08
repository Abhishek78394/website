import type { Post } from "@/content/types";

export const posts: Post[] = [
  {
    slug: "what-is-dooh",
    title: "What digital out-of-home advertising actually is",
    description:
      "DOOH is advertising on connected screens in public places. Here is how it differs from a static billboard, and what to ask before you buy.",
    eyebrow: "Guide",
    publishedAt: "2026-06-04",
    updatedAt: "2026-09-01",
    keywords: ["what is DOOH", "digital out of home", "digital billboard advertising"],
    sections: [
      {
        heading: "A screen, not a printed face",
        paragraphs: [
          "Digital out-of-home, or DOOH, is advertising on screens in places people already go: malls, streets, offices, transit, and stores. The site can change creative by the hour. A printed billboard cannot.",
          "Because the screen is connected, the buyer can schedule dayparts and, on a platform like Screenista, pay for seconds instead of a fixed face for a month.",
        ],
      },
      {
        heading: "What to ask a network",
        paragraphs: [
          "Ask which venues are live, whether the screen reports a play log, and how you stop a campaign if the offer ends. Estimated impressions are a planning input. They are not proof that the ad played.",
          "Also ask how creative is checked. A 15-second film that is illegible at a distance will not get better because the screen is digital.",
        ],
      },
    ],
    related: [
      { href: "/how-it-works", label: "How Screenista works" },
      { href: "/blog/measuring-outdoor-ads", label: "Measuring outdoor ads" },
    ],
  },
  {
    slug: "per-second-pricing",
    title: "Why outdoor ads are moving to per-second pricing",
    description:
      "Packages hide unused hours. Per-second buying lets a campaign pay for the daypart it needs, starting from a few hundred rupees.",
    eyebrow: "Pricing",
    publishedAt: "2026-07-16",
    updatedAt: "2026-09-08",
    keywords: ["per second advertising", "DOOH pricing", "outdoor media buying"],
    sections: [
      {
        heading: "The unused hour problem",
        paragraphs: [
          "A restaurant that needs 6 pm to 10 pm still pays for the morning if the product is sold as a day. A weekend retailer pays for Monday. Per-second pricing exists so those hours are not in the invoice.",
          "On Screenista, rates can start from ₹0.30 per second and campaigns from ₹500. That is enough to test a city and a daypart before a larger buy.",
        ],
      },
      {
        heading: "What still needs a human",
        paragraphs: [
          "Price does not choose the screen. Venue, sightline, and audience moment still do. Use the rate to control waste, and use the screen list to control relevance.",
        ],
      },
    ],
    related: [
      { href: "/pricing", label: "Screenista pricing" },
      { href: "/solutions/per-second-advertising", label: "Per-second advertising" },
    ],
  },
  {
    slug: "measuring-outdoor-ads",
    title: "How to measure an outdoor campaign",
    description:
      "Separate planning estimates from delivery proof. Plays, device health, and scan-throughs answer different questions.",
    eyebrow: "Measurement",
    publishedAt: "2026-08-11",
    updatedAt: "2026-09-15",
    keywords: ["measure DOOH", "proof of play", "outdoor campaign analytics"],
    sections: [
      {
        heading: "Three numbers, three jobs",
        paragraphs: [
          "Estimated audience helps you pick a screen before you buy. Play logs tell you whether the creative ran. Scans or site visits tell you whether anyone responded. Mixing those three into one “reach” number hides the gaps.",
          "Screenista keeps delivery logs from connected screens and can attach a QR or NFC action so outdoor exposure has a response path.",
        ],
      },
      {
        heading: "A simple wrap-up",
        paragraphs: [
          "For each city, report screens booked, seconds played, screens that were offline, and response actions. If a screen was dark, the next step is a makegood, not a revised estimate.",
        ],
      },
    ],
    related: [
      { href: "/solutions/verified-play-logs", label: "Verified play logs" },
      { href: "/case-studies/transit-brand-awareness", label: "Transit launch case" },
    ],
  },
];
