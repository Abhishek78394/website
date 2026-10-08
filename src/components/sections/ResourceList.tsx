import Link from "next/link";

export type ResourceCard = {
  href: string;
  title: string;
  description: string;
  meta?: string;
};

export function ResourceList({ items }: { items: ResourceCard[] }) {
  return (
    <ul className="grid gap-px bg-line sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.href} className="bg-white">
          <Link href={item.href} className="block h-full p-6 transition-colors hover:bg-soft">
            {item.meta ? (
              <p className="font-mono text-[11px] tracking-[0.16em] text-accent-dark uppercase">{item.meta}</p>
            ) : null}
            <h2 className="mt-3 font-display text-2xl text-ink">{item.title}</h2>
            <p className="mt-2 leading-7 text-muted">{item.description}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
