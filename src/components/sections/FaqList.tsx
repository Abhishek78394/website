import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo/schema";

type Faq = { question: string; answer: string };

export function FaqList({ items, includeSchema = false }: { items: readonly Faq[]; includeSchema?: boolean }) {
  return (
    <div>
      {includeSchema ? <JsonLd data={faqSchema(items)} /> : null}
      <dl className="divide-y divide-line border-y border-line">
        {items.map((item) => (
          <div key={item.question} className="grid gap-2 py-6 md:grid-cols-[1fr_1.4fr] md:gap-10">
            <dt className="font-display text-xl text-ink">{item.question}</dt>
            <dd className="leading-7 text-muted">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
