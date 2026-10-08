import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { siteConfig } from "@/config/site";

const homeTitle = "Outdoor advertising, made intelligent | SCREENiSTA";

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: homeTitle,
    description: siteConfig.description,
    url: "/",
  },
  twitter: {
    title: homeTitle,
    description: siteConfig.description,
  },
};

export default function Page() {
  return <HomePage />;
}
