import type { City } from "@/content/types";

export const cities: City[] = [
  {
    slug: "mumbai",
    name: "Mumbai",
    region: "India",
    title: "Digital billboard advertising in Mumbai",
    description:
      "Book mall, street, and transit screens in Mumbai by the second. Reach shoppers and commuters without buying a fixed outdoor package.",
    eyebrow: "India · Mumbai",
    updatedAt: "2026-09-12",
    keywords: ["Mumbai DOOH", "Mumbai digital billboard", "outdoor advertising Mumbai"],
    venues: ["Outdoor LED", "Mall", "Transit"],
    sections: [
      {
        heading: "Where Mumbai campaigns play",
        paragraphs: [
          "Mumbai inventory concentrates on high-footfall retail and commute routes: mall atriums, lifestyle streets, and transit corridors. Brands use these screens when the audience is already moving between work, shopping, and evening plans.",
          "A typical launch pairs a short motion film with a QR code so a screen impression can become a store visit or a booking. Schedules can focus on evening peaks instead of a full-day buy.",
        ],
      },
      {
        heading: "How advertisers plan the city",
        paragraphs: [
          "Start with the neighbourhoods that match the offer — Andheri, Bandra, and Lower Parel are common lifestyle corridors — then add screens by venue type. Per-second booking keeps a first test small, from a few hundred rupees, before the same creative scales to more sites.",
        ],
      },
    ],
    related: [
      { href: "/industries/food-and-beverage", label: "Food and beverage campaigns" },
      { href: "/locations/delhi-ncr", label: "Delhi NCR screens" },
    ],
  },
  {
    slug: "delhi-ncr",
    name: "Delhi NCR",
    region: "India",
    title: "Digital out-of-home advertising in Delhi NCR",
    description:
      "Plan outdoor LED, transit, and office-lobby campaigns across Delhi NCR with verified play logs and per-second pricing.",
    eyebrow: "India · Delhi NCR",
    updatedAt: "2026-09-12",
    keywords: ["Delhi DOOH", "NCR billboard advertising", "transit advertising Delhi"],
    venues: ["Outdoor LED", "Transit", "Office"],
    sections: [
      {
        heading: "A metro built around movement",
        paragraphs: [
          "Delhi NCR campaigns usually follow work and travel routes: office lobbies in the morning, transit screens through the day, and outdoor LEDs on commercial corridors. The same creative can run across those contexts with different hour windows.",
          "Because the region spans several cities, location filters matter more than a single pin. Advertisers group screens by audience moment rather than buying one city-wide package.",
        ],
      },
    ],
    related: [
      { href: "/locations/mumbai", label: "Mumbai screens" },
      { href: "/solutions/ai-audience-targeting", label: "AI audience targeting" },
    ],
  },
  {
    slug: "bengaluru",
    name: "Bengaluru",
    region: "India",
    title: "Screen advertising in Bengaluru",
    description:
      "Reach workplace and premium retail audiences in Bengaluru with office, mall, and retail screens booked by the second.",
    eyebrow: "India · Bengaluru",
    updatedAt: "2026-09-18",
    keywords: ["Bengaluru DOOH", "Bangalore digital screens", "office screen advertising"],
    venues: ["Office", "Mall", "Retail"],
    sections: [
      {
        heading: "Workplace and lifestyle inventory",
        paragraphs: [
          "Bengaluru’s useful inventory sits in tech parks, office lobbies, and premium retail. Campaigns for software, finance, and consumer brands often run on weekday office hours, then shift to mall screens on weekends.",
          "Dwell time in lobbies is longer than on a roadside LED, so a 15-second film with a clear offer tends to outperform a slogan-only cutdown.",
        ],
      },
    ],
    related: [
      { href: "/industries/technology", label: "Technology advertising" },
      { href: "/locations/hyderabad", label: "Hyderabad screens" },
    ],
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    region: "India",
    title: "Digital screen advertising in Hyderabad",
    description:
      "Advertise on tech-park, mall, and retail screens in Hyderabad. Match the creative to office districts and lifestyle footfall.",
    eyebrow: "India · Hyderabad",
    updatedAt: "2026-09-18",
    keywords: ["Hyderabad DOOH", "Hyderabad mall advertising", "tech park screens"],
    venues: ["Tech parks", "Mall", "Retail"],
    sections: [
      {
        heading: "Office districts and shopping destinations",
        paragraphs: [
          "Hyderabad campaigns often split between HITEC-style office clusters and mall retail. A product launch can run near workplaces on weekdays and near stores when people are actually shopping.",
          "Screenista’s schedule step lets you keep those two dayparts in one campaign instead of negotiating two separate outdoor buys.",
        ],
      },
    ],
    related: [
      { href: "/locations/bengaluru", label: "Bengaluru screens" },
      { href: "/industries/retail", label: "Retail campaigns" },
    ],
  },
  {
    slug: "ahmedabad",
    name: "Ahmedabad",
    region: "India",
    title: "Outdoor screen advertising in Ahmedabad",
    description:
      "Book retail, street, and office screens in Ahmedabad. Local and regional brands can start with a small per-second campaign.",
    eyebrow: "India · Ahmedabad",
    updatedAt: "2026-08-20",
    keywords: ["Ahmedabad billboard", "Ahmedabad DOOH", "retail screens Ahmedabad"],
    venues: ["Retail", "Street", "Office"],
    sections: [
      {
        heading: "Commercial corridors",
        paragraphs: [
          "Ahmedabad inventory follows shopping streets and office clusters. Regional brands use it to stay visible on the routes people already take, without committing to a national outdoor plan.",
          "Street screens suit short, high-contrast creative. Retail screens inside stores can carry a longer offer and a QR code.",
        ],
      },
    ],
    related: [
      { href: "/locations/mumbai", label: "Mumbai screens" },
      { href: "/pricing", label: "Per-second pricing" },
    ],
  },
  {
    slug: "chennai",
    name: "Chennai",
    region: "India",
    title: "Transit and retail screens in Chennai",
    description:
      "Reach commuters and shoppers in Chennai with transit, retail, and outdoor screens, measured by verified plays.",
    eyebrow: "India · Chennai",
    updatedAt: "2026-08-20",
    keywords: ["Chennai DOOH", "Chennai transit advertising", "Chennai digital billboard"],
    venues: ["Transit", "Retail", "Outdoor"],
    sections: [
      {
        heading: "Commute and coast-city retail",
        paragraphs: [
          "Chennai’s dense commute makes transit screens useful for brand awareness, while retail screens work for offers that need a next step. A single campaign can weight budget toward the hours when those audiences are present.",
          "Verified play logs show whether the booked seconds actually ran, which matters when a local team is reporting back to a national brand.",
        ],
      },
    ],
    related: [
      { href: "/solutions/verified-play-logs", label: "Verified play logs" },
      { href: "/locations/bengaluru", label: "Bengaluru screens" },
    ],
  },
  {
    slug: "bhopal",
    name: "Bhopal",
    region: "India",
    title: "City-scale screen advertising in Bhopal",
    description:
      "Run local and regional campaigns on retail and street screens in Bhopal, with budgets that can start small.",
    eyebrow: "India · Bhopal",
    updatedAt: "2026-08-04",
    keywords: ["Bhopal digital advertising", "Bhopal screens", "local DOOH Bhopal"],
    venues: ["Retail", "Street"],
    sections: [
      {
        heading: "A city network for local brands",
        paragraphs: [
          "Bhopal is a practical market for local retailers, education brands, and regional launches. Street and retail screens cover everyday routes rather than only premium malls.",
          "Per-second booking fits campaigns that need a few busy hours — a weekend sale, an admission window, or a product trial — instead of a month-long board.",
        ],
      },
    ],
    related: [
      { href: "/locations/ahmedabad", label: "Ahmedabad screens" },
      { href: "/advertise", label: "Advertise on Screenista" },
    ],
  },
  {
    slug: "dubai",
    name: "Dubai",
    region: "GCC",
    title: "DOOH advertising in Dubai",
    description:
      "Plan mall, outdoor LED, and transit campaigns in Dubai. Screenista supports multi-market buys across India and the GCC.",
    eyebrow: "GCC · Dubai",
    updatedAt: "2026-09-02",
    keywords: ["Dubai DOOH", "Dubai digital billboard", "mall advertising Dubai"],
    venues: ["Mall", "Outdoor LED", "Transit"],
    sections: [
      {
        heading: "Lifestyle and transit environments",
        paragraphs: [
          "Dubai campaigns cluster in malls, outdoor LEDs, and transit nodes where residents and visitors share the same routes. Creative made for a Gulf audience can run here while an India cut runs on the same platform.",
          "Multi-currency campaign setup is part of the GCC workflow, so a brand does not need a separate buying stack for each market.",
        ],
      },
    ],
    related: [
      { href: "/locations", label: "All locations" },
      { href: "/solutions/per-second-advertising", label: "Per-second advertising" },
    ],
  },
];
