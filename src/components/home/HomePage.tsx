import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { Journey } from "@/components/home/Journey";
import { Pricing } from "@/components/home/Pricing";
import { Showcase } from "@/components/home/Showcase";

export function HomePage() {
  return (
    <main id="main">
      <Hero />
      <Showcase />
      <Journey />
      <Pricing />
      <FinalCta />
    </main>
  );
}
