import { Container } from "@/components/ui/Container";

const steps = [
  { id: "01", title: "Discover", body: "Find screens by place and time." },
  { id: "02", title: "Plan", body: "Set budget, hours, and screens." },
  { id: "03", title: "Launch", body: "Upload creative and go live." },
  { id: "04", title: "Monitor", body: "Watch delivery as it runs." },
  { id: "05", title: "Measure", body: "Read the seconds that played." },
];

export function Journey() {
  return (
    <section id="journey" className="bg-dark text-white" aria-labelledby="journey-heading">
      <Container className="py-16 md:py-20">
        <h2 id="journey-heading" className="story-title max-w-4xl">
          One platform. The entire advertising journey.
        </h2>
        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step) => (
            <li key={step.id}>
              <p className="font-mono text-xs text-accent">{step.id}</p>
              <h3 className="mt-3 font-display text-2xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/65">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
