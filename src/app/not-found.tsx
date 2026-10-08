import Link from "next/link";
import { SiteFrame } from "@/components/layout/SiteFrame";

export default function NotFound() {
  return (
    <SiteFrame>
      <main id="main" className="mx-auto max-w-xl px-6 py-24">
        <p className="font-mono text-xs tracking-[0.16em] text-accent-dark uppercase">404</p>
        <h1 className="mt-4 font-display text-5xl text-ink">This page is not on the site.</h1>
        <p className="mt-4 leading-7 text-muted">The address may be mistyped. Start from the homepage or the location list.</p>
        <p className="mt-8 flex gap-4 text-sm">
          <Link href="/" className="bg-ink px-4 py-2 text-white">
            Home
          </Link>
          <Link href="/locations" className="border border-ink px-4 py-2">
            Locations
          </Link>
        </p>
      </main>
    </SiteFrame>
  );
}
