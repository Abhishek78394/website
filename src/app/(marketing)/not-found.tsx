import Link from "next/link";

export default function MarketingNotFound() {
  return (
    <main id="main" className="mx-auto max-w-xl px-6 py-24">
      <p className="font-mono text-xs tracking-[0.16em] text-accent-dark uppercase">404</p>
      <h1 className="mt-4 font-display text-5xl text-ink">We could not find that page.</h1>
      <p className="mt-4 leading-7 text-muted">It may have moved, or the link is for a screen that is not published.</p>
      <p className="mt-8">
        <Link href="/" className="bg-ink px-4 py-2 text-sm text-white">
          Back home
        </Link>
      </p>
    </main>
  );
}
