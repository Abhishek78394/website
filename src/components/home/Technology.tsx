import Link from "next/link";
import { Container } from "@/components/ui/Container";

const pillars = [
  {
    title: "AI",
    body: "Intelligent campaign and audience analysis, with a person approving the plan.",
  },
  {
    title: "IoT",
    body: "Connected screens with real-time monitoring of playback and device health.",
  },
  {
    title: "Cryptography",
    body: "Secure data and a play history that is hard to alter after the fact.",
  },
  {
    title: "Proprietary technology",
    body: "Technology developed for intelligent advertising delivery.",
  },
];

export function Technology() {
  return (
    <section className="border-b border-line bg-paper" aria-labelledby="technology-heading">
      <Container className="py-20 lg:py-28">
        <h2 id="technology-heading" className="story-title max-w-4xl text-ink">
          Built on intelligent technology.
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
          Technology supports the product. It is how campaigns get planned, delivered, and measured.
        </p>
        <ul className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <li key={pillar.title}>
              <h3 className="font-display text-2xl text-ink">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{pillar.body}</p>
            </li>
          ))}
        </ul>
        <Link
          href="/technology"
          className="mt-10 inline-flex text-sm text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
        >
          Read about the technology
        </Link>
      </Container>
    </section>
  );
}
