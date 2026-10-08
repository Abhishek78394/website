"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "./actions";

const initialState: ContactState = { status: "idle", message: "" };

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initialState);

  return (
    <form action={action} className="grid max-w-xl gap-5" noValidate>
      <label className="grid gap-2 text-sm">
        Name
        <input
          name="name"
          autoComplete="name"
          required
          className="border border-line bg-white px-3 py-2 text-base text-ink"
        />
      </label>
      <label className="grid gap-2 text-sm">
        Work email
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className="border border-line bg-white px-3 py-2 text-base text-ink"
        />
      </label>
      <label className="grid gap-2 text-sm">
        Company
        <input name="company" autoComplete="organization" className="border border-line bg-white px-3 py-2 text-base text-ink" />
      </label>
      <label className="grid gap-2 text-sm">
        How can we help?
        <textarea name="message" required rows={5} className="border border-line bg-white px-3 py-2 text-base text-ink" />
      </label>
      <label className="hidden" aria-hidden="true">
        Website
        <input name="company_website" tabIndex={-1} autoComplete="off" />
      </label>
      <button type="submit" disabled={pending} className="w-fit bg-ink px-4 py-3 text-sm text-white disabled:opacity-60">
        {pending ? "Sending…" : "Send message"}
      </button>
      {state.message ? (
        <p role="status" className={state.status === "error" ? "text-sm text-accent-dark" : "text-sm text-ink"}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
