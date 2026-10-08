export const siteConfig = {
  name: "Screenista",
  legalName: "Screenista Private Limited",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://screenista.ai",
  description:
    "Reach the right audience on digital screens across high-value locations — with flexible campaigns, intelligent targeting and measurable results.",
  locale: "en_IN",
  language: "en-IN",
  email: "support@SCREENiSTA.ai",
  pressEmail: "press@SCREENiSTA.ai",
  appUrl: "https://app.screenista.ai",
  partnerUrl: "https://partner.screenista.ai",
  twitter: "@SCREENiSTA",
  sameAs: [
    "https://www.instagram.com/SCREENiSTA.ai/",
    "https://www.facebook.com/SCREENiSTAai/",
    "https://x.com/SCREENiSTA",
    "https://www.linkedin.com/company/SCREENiSTA/",
  ],
} as const;

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}
