"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="main" className="mx-auto max-w-xl px-6 py-24">
      <h1 className="font-display text-4xl text-ink">Something went wrong</h1>
      <p className="mt-4 leading-7 text-muted">Refresh the page. If it keeps happening, email support@SCREENiSTA.ai.</p>
      <button type="button" onClick={reset} className="mt-8 bg-ink px-4 py-2 text-sm text-white">
        Try again
      </button>
    </main>
  );
}
