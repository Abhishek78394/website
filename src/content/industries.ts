import type { Entry } from "@/content/types";

export const industries: Entry[] = [
  {
    slug: "retail",
    title: "Retail screen advertising",
    description:
      "Put offers on mall and store screens while shoppers are nearby. Book the hours that match store traffic and track scans.",
    eyebrow: "Industry",
    updatedAt: "2026-09-01",
    keywords: ["retail DOOH", "mall advertising", "in-store screens"],
    sections: [
      {
        heading: "Advertise where the purchase happens",
        paragraphs: [
          "Retail campaigns work when the screen is close to the store, not only on a distant highway. Mall atriums, retail corridors, and in-store displays let a weekend offer reach people who can act the same day.",
          "Pair the film with a QR code for a coupon or a store locator. Scan counts sit next to play logs, so the team can see both delivery and response.",
        ],
      },
      {
        heading: "Schedule around real footfall",
        paragraphs: [
          "Friday evening through Sunday afternoon is a common retail window. Per-second buying means you are not paying for Monday morning inventory you do not need.",
        ],
      },
    ],
    related: [
      { href: "/locations/mumbai", label: "Mumbai retail corridors" },
      { href: "/case-studies/retail-weekend-footfall", label: "Weekend retail case" },
    ],
  },
  {
    slug: "food-and-beverage",
    title: "Food and beverage advertising",
    description:
      "Drive meal-time visits with screens near restaurants, malls, and lifestyle streets. Start from a small evening schedule.",
    eyebrow: "Industry",
    updatedAt: "2026-09-01",
    keywords: ["restaurant DOOH", "QSR advertising", "food billboard"],
    sections: [
      {
        heading: "Match the meal, not the whole day",
        paragraphs: [
          "A dinner campaign does not need breakfast inventory. Screenista schedules let a restaurant or QSR brand buy Thursday-to-Sunday evenings on screens near the venues people already pass.",
          "A 15-second offer plus a booking QR is a practical creative pattern: the screen creates the craving, the scan takes the reservation or the coupon.",
        ],
      },
    ],
    related: [
      { href: "/case-studies/mumbai-restaurant-launch", label: "Mumbai restaurant launch" },
      { href: "/locations/mumbai", label: "Advertise in Mumbai" },
    ],
  },
  {
    slug: "automotive",
    title: "Automotive out-of-home",
    description:
      "Use transit corridors and outdoor LEDs for model launches and test-drive offers, with proof of which seconds played.",
    eyebrow: "Industry",
    updatedAt: "2026-08-15",
    keywords: ["automotive DOOH", "car billboard advertising", "transit LED"],
    sections: [
      {
        heading: "Corridors and commute context",
        paragraphs: [
          "Automotive creative performs on outdoor LEDs and transit routes where people have a few seconds and a clear sightline. Keep the model name and the offer large; save the specification list for the landing page.",
          "City-level reporting shows which corridors delivered plays, so a dealer group can shift spend toward the routes that actually ran.",
        ],
      },
    ],
    related: [
      { href: "/locations/delhi-ncr", label: "Delhi NCR corridors" },
      { href: "/solutions/verified-play-logs", label: "Verified delivery" },
    ],
  },
  {
    slug: "real-estate",
    title: "Real estate screen campaigns",
    description:
      "Promote developments on office lobbies and city screens aimed at people who live or work near the project.",
    eyebrow: "Industry",
    updatedAt: "2026-08-15",
    keywords: ["real estate DOOH", "property advertising screens", "lobby displays"],
    sections: [
      {
        heading: "Proximity beats a city-wide splash",
        paragraphs: [
          "A residential or commercial project usually needs the people who already spend time nearby. Office lobbies and local street screens keep the message in that radius.",
          "Use a short film of the development and a QR to the site plan. The campaign can pause when inventory of a unit type sells out.",
        ],
      },
    ],
    related: [
      { href: "/partners", label: "Real estate partners" },
      { href: "/locations/bengaluru", label: "Bengaluru offices" },
    ],
  },
  {
    slug: "technology",
    title: "Technology brand advertising",
    description:
      "Reach product and enterprise audiences on office and tech-park screens in Bengaluru, Hyderabad, and other workplace markets.",
    eyebrow: "Industry",
    updatedAt: "2026-07-22",
    keywords: ["tech park advertising", "B2B DOOH", "office screen ads"],
    sections: [
      {
        heading: "Screens inside the workday",
        paragraphs: [
          "Technology brands often waste outdoor spend on audiences who will never buy the product. Office and tech-park screens narrow that to people already in a work context.",
          "Weekday morning and lunch windows are the usual buy. A product launch can add mall screens on the weekend if the offer is consumer-facing.",
        ],
      },
    ],
    related: [
      { href: "/locations/hyderabad", label: "Hyderabad tech parks" },
      { href: "/locations/bengaluru", label: "Bengaluru workplaces" },
    ],
  },
  {
    slug: "finance",
    title: "Finance and insurance advertising",
    description:
      "Run compliant, clear offers on city screens and lobbies. Measure plays instead of relying only on estimated reach.",
    eyebrow: "Industry",
    updatedAt: "2026-07-22",
    keywords: ["finance DOOH", "insurance billboard", "bank screen advertising"],
    sections: [
      {
        heading: "Clarity and proof",
        paragraphs: [
          "Financial creative has to stay readable at a distance: one product, one action, no fine print on the screen itself. The landing page carries the detail.",
          "Verified play logs give brand and compliance teams a record of what ran, on which screens, and for how many seconds.",
        ],
      },
    ],
    related: [
      { href: "/solutions/verified-play-logs", label: "Play-log reporting" },
      { href: "/blog/measuring-outdoor-ads", label: "How to measure outdoor ads" },
    ],
  },
];
