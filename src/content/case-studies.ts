import type { CaseStudy } from "@/content/types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "mumbai-restaurant-launch",
    title: "A Mumbai restaurant filled weekday tables",
    description:
      "An evening-only screen plan around Bandra and Lower Parel, with a booking QR, instead of a month-long outdoor board.",
    eyebrow: "Case study",
    result: "Evening schedule, QR bookings",
    industry: "Food & beverage",
    updatedAt: "2026-09-05",
    keywords: ["Mumbai restaurant advertising", "DOOH case study", "QR outdoor"],
    sections: [
      {
        heading: "The brief",
        paragraphs: [
          "A new restaurant needed dinner covers, not all-day awareness. The team limited screens to lifestyle corridors near the venue and ran Thursday to Sunday, 6:00 to 10:30 pm.",
          "Creative was a 15-second film and a QR code to the booking page. The budget started small and extended only on the nights the room was still light.",
        ],
      },
      {
        heading: "What the report showed",
        paragraphs: [
          "Play logs confirmed the seconds that ran inside the booked window. Scan-throughs gave the restaurant a response number to sit next to covers, which a static hoarding would not have produced.",
        ],
      },
    ],
    related: [
      { href: "/industries/food-and-beverage", label: "Food and beverage" },
      { href: "/locations/mumbai", label: "Mumbai screens" },
    ],
  },
  {
    slug: "retail-weekend-footfall",
    title: "A retail weekend that stayed on the mall floor",
    description:
      "A multi-city retailer moved spend onto mall screens for Friday-to-Sunday trading and paused the campaign when the offer ended.",
    eyebrow: "Case study",
    result: "Weekend-only mall buy",
    industry: "Retail",
    updatedAt: "2026-08-19",
    keywords: ["mall advertising case study", "retail DOOH", "weekend footfall"],
    sections: [
      {
        heading: "The brief",
        paragraphs: [
          "The retailer already knew weekend footfall drove the promotion. A week-long roadside buy would have paid for days the offer was not the priority.",
          "Screens were limited to malls in the cities where the promotion was stocked. The film carried the offer end date so it did not keep running after the sale.",
        ],
      },
      {
        heading: "What changed in the buy",
        paragraphs: [
          "The team paused remaining seconds from the advertiser app when stock of the lead item ran out in one city, and left the other cities live. That city-level control is the practical difference from a single outdoor contract.",
        ],
      },
    ],
    related: [
      { href: "/industries/retail", label: "Retail advertising" },
      { href: "/solutions/per-second-advertising", label: "Per-second buying" },
    ],
  },
  {
    slug: "transit-brand-awareness",
    title: "A transit launch with a play record",
    description:
      "A brand used corridor LEDs for a two-week awareness burst and closed the campaign with play logs rather than a reach estimate alone.",
    eyebrow: "Case study",
    result: "Verified corridor plays",
    industry: "Automotive",
    updatedAt: "2026-07-30",
    keywords: ["transit advertising case study", "proof of play", "automotive DOOH"],
    sections: [
      {
        heading: "The brief",
        paragraphs: [
          "The launch needed presence on commute routes for two weeks. The media team had been burned before by outdoor reports that could not show whether a site was dark.",
          "They selected outdoor LED and transit screens, kept the creative to a model name and a test-drive line, and required play logs in the wrap-up.",
        ],
      },
      {
        heading: "What the report showed",
        paragraphs: [
          "The wrap deck listed plays by screen and day. Sites that dropped offline were visible in device health, so the conversation was about makegood seconds rather than a disputed photo.",
        ],
      },
    ],
    related: [
      { href: "/industries/automotive", label: "Automotive" },
      { href: "/solutions/verified-play-logs", label: "Verified play logs" },
    ],
  },
];
