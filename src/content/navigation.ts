export type NavLink = {
  href: string;
  label: string;
  note?: string;
  external?: boolean;
};

export type NavItem = NavLink & {
  children?: readonly NavLink[];
};

export const primaryNav: readonly NavItem[] = [
  { href: "/about", label: "About us" },
  {
    href: "/solutions",
    label: "Solutions",
    children: [
      { href: "/how-it-works", label: "How it works", note: "Discover, plan, launch, measure" },
      { href: "/solutions/per-second-advertising", label: "Per-second advertising", note: "Pay for the time you use" },
      { href: "/solutions/screen-owner-monetization", label: "Screen monetization", note: "Earn from screens you own" },
      { href: "/industries", label: "Industries", note: "Who advertises on screens" },
      { href: "/pricing", label: "Pricing", note: "From ₹0.30/sec" },
    ],
  },
  {
    href: "/technology",
    label: "Technology",
    children: [
      { href: "/technology", label: "Platform", note: "AI, IoT and cryptography" },
      { href: "/solutions/ai-audience-targeting", label: "Audience intelligence", note: "Plan with context" },
      { href: "/solutions/verified-play-logs", label: "Verified play logs", note: "Read what actually played" },
    ],
  },
  {
    href: "/partners",
    label: "Ecosystem",
    children: [
      { href: "/advertise", label: "Advertisers", note: "Plan and launch campaigns" },
      { href: "/screens", label: "Screen owners", note: "List and monetize screens" },
      { href: "/partners", label: "Business partners", note: "Media owners, venues, real estate" },
      { href: "/locations", label: "Network", note: "Markets we serve" },
    ],
  },
] as const;
export const footerNav = [
  {
    title: "Product",
    links: [
      { href: "/advertise", label: "Advertising" },
      { href: "/locations", label: "Screen Network" },
      { href: "/how-it-works", label: "Campaigns" },
      { href: "/solutions/verified-play-logs", label: "Analytics" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Partners",
    links: [
      { href: "/screens", label: "Screen Owners" },
      { href: "/partners", label: "Business Partners" },
      { href: "https://partner.screenista.ai", label: "Become a Partner", external: true },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/technology", label: "Technology" },
      { href: "/about#opportunity", label: "Impact" },
      { href: "/contact", label: "Careers" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/faq", label: "FAQs" },
      { href: "/blog/what-is-dooh", label: "Guides" },
      { href: "/case-studies", label: "Case Studies" },
    ],
  },
] as const;

export function navIsActive(href: string, pathname: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function navGroupIsActive(item: NavItem, pathname: string) {
  if (item.children) {
    return item.children.some((child) => navIsActive(child.href, pathname));
  }
  return navIsActive(item.href, pathname);
}