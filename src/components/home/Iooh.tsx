import { Container } from "@/components/ui/Container";

const eras = [
  {
    label: "OOH",
    title: "A site and a duration.",
    body: "Traditional outdoor. Useful for presence. Difficult to change, target, or prove.",
  },
  {
    label: "DOOH",
    title: "The site becomes a screen.",
    body: "Creative can change by the hour. Buying it can still feel like a fixed package.",
  },
  {
    label: "iOOH",
    title: "The screen becomes a system.",
    body: "Discovery, flexible time, connected playback, and a record of what ran.",
  },
];

export function Iooh() {
  return (
    <section className="border-b border-line bg-paper" aria-labelledby="iooh-heading">
      <Container className="py-20 lg:py-28">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">Intelligent out-of-home</p>
        <h2 id="iooh-heading" className="story-title mt-4 max-w-4xl text-ink">
          Introducing Intelligent Out-of-Home Advertising.
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
          SCREENiSTA brings intelligence, connectivity and measurable insights to traditional outdoor advertising.
        </p>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {eras.map((era, index) => (
            <li key={era.label} className="bg-paper p-6 md:p-8">
              <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
                0{index + 1} · {era.label}
              </p>
              <h3 className="mt-6 font-display text-3xl text-ink">{era.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{era.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
