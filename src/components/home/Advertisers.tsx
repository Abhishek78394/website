import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const groups = [
  { title: "Retail", body: "Drive customers to your store.", href: "/industries/retail" },
  { title: "Restaurants", body: "Promote offers when customers are nearby.", href: "/industries/food-and-beverage" },
  { title: "Real estate", body: "Reach high-intent audiences.", href: "/industries/real-estate" },
  { title: "Education", body: "Reach students and parents.", href: "/advertise" },
  { title: "Healthcare", body: "Build local awareness.", href: "/advertise" },
  { title: "Enterprise", body: "Run campaigns across multiple locations.", href: "/industries/technology" },
];

export function Advertisers() {
  return (
    <section className="border-b border-line bg-paper" aria-labelledby="advertisers-heading">
      <Container className="py-20 lg:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 id="advertisers-heading" className="story-title max-w-3xl text-ink">
            Built for every kind of advertiser.
          </h2>
          <Button href={siteConfig.appUrl} external>
            Start Advertising
          </Button>
        </div>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, index) => (
            <li key={group.title} className="bg-paper">
              <Link href={group.href} className="group flex h-full flex-col p-6 transition-colors hover:bg-white md:p-8">
                <span className="font-mono text-[11px] text-muted">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-8 font-display text-3xl text-ink">{group.title}</h3>
                <p className="mt-3 text-muted">{group.body}</p>
                <span className="mt-8 text-sm text-ink transition-transform duration-300 group-hover:translate-x-1">
                  See how →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
