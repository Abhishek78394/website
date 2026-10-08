import { Container } from "@/components/ui/Container";

const moments = [
  {
    title: "The gap",
    body: "Outdoor advertising was hard to buy in small, precise pieces, and harder to prove.",
  },
  {
    title: "The workspace",
    body: "Advertisers and screen owners needed one system, not another round of decks.",
  },
  {
    title: "The network",
    body: "India is home. The GCC, including Dubai, is an operating region.",
  },
  {
    title: "The record",
    body: "Connected screens report play logs, so delivery is something you can read.",
  },
];

export function Story() {
  return (
    <section className="bg-dark text-white" aria-labelledby="story-heading">
      <Container className="py-20 lg:py-28">
        <h2 id="story-heading" className="story-title max-w-4xl">
          We&apos;re building the infrastructure for the next generation of outdoor advertising.
        </h2>
        <div className="mt-8 max-w-2xl space-y-4 text-lg leading-8 text-white/70">
          <p>SCREENiSTA was created to make outdoor advertising more accessible, measurable and intelligent.</p>
          <p>
            By connecting advertisers, screen owners, locations and audiences through one technology platform,
            SCREENiSTA is transforming traditional outdoor media into an intelligent digital ecosystem.
          </p>
        </div>
        <ol className="mt-14 grid gap-8 md:grid-cols-4">
          {moments.map((moment, index) => (
            <li key={moment.title} className="border-t border-white/15 pt-5">
              <p className="font-mono text-[11px] text-white/40">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 font-display text-2xl">{moment.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/60">{moment.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
