import Link from "next/link";
import { caseStudies } from "@/content/case-studies";
import { Container } from "@/components/ui/Container";

const details: Record<string, { location: string; objective: string; screens: string; duration: string; audience: string; results: string }> = {
  "mumbai-restaurant-launch": {
    location: "Mumbai",
    objective: "Dinner covers, not all-day awareness",
    screens: "Lifestyle corridors near the venue",
    duration: "Thursday–Sunday, 6:00–10:30 pm",
    audience: "People already near Bandra and Lower Parel",
    results: "Play logs for the booked window, with QR scan-throughs",
  },
  "retail-weekend-footfall": {
    location: "Multiple cities",
    objective: "Weekend promotion, not a week-long board",
    screens: "Malls where the offer was stocked",
    duration: "Friday–Sunday",
    audience: "Shoppers already on the mall floor",
    results: "One city paused when stock ran out; the others stayed live",
  },
  "transit-brand-awareness": {
    location: "Commute corridors",
    objective: "Two-week awareness with a play record",
    screens: "Outdoor LED and transit",
    duration: "Two weeks",
    audience: "People on the routes that were booked",
    results: "Plays listed by screen and day, including sites that went offline",
  },
};

export function Cases() {
  return (
    <section className="border-b border-line bg-paper" aria-labelledby="cases-heading">
      <Container className="py-20 lg:py-28">
        <div className="flex items-end justify-between gap-6">
          <h2 id="cases-heading" className="story-title text-ink">
            Campaigns
          </h2>
          <Link href="/case-studies" className="text-sm text-ink underline decoration-line underline-offset-4">
            All case studies
          </Link>
        </div>
        <div className="mt-12 border-t border-line">
          {caseStudies.map((study) => {
            const detail = details[study.slug];
            return (
              <article key={study.slug} className="grid gap-8 border-b border-line py-10 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">{study.industry}</p>
                  <h3 className="mt-3 font-display text-3xl text-ink md:text-4xl">{study.title}</h3>
                  <p className="mt-4 max-w-lg text-muted">{study.description}</p>
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="mt-6 inline-flex text-sm text-ink underline decoration-line underline-offset-4"
                  >
                    View Case Study
                  </Link>
                </div>
                {detail ? (
                  <dl className="grid grid-cols-2 gap-x-6 gap-y-5 text-sm">
                    {(
                      [
                        ["Location", detail.location],
                        ["Objective", detail.objective],
                        ["Screens", detail.screens],
                        ["Duration", detail.duration],
                        ["Audience", detail.audience],
                        ["Results", detail.results],
                      ] as const
                    ).map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-muted">{label}</dt>
                        <dd className="mt-1 text-ink">{value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
