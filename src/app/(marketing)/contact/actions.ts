"use server";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function submitContact(_previous: ContactState, formData: FormData): Promise<ContactState> {
  const honeypot = String(formData.get("company_website") ?? "").trim();
  if (honeypot) {
    return {
      status: "success",
      message: "Thanks. If you need a reply sooner, email support@SCREENiSTA.ai.",
    };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (name.length < 2) {
    return { status: "error", message: "Enter your name." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Enter a valid email address." };
  }
  if (message.length < 20) {
    return { status: "error", message: "Add a bit more detail — at least a sentence." };
  }

  return {
    status: "success",
    message: `Thanks ${name}${company ? ` at ${company}` : ""}. This site does not store form submissions yet. Email support@SCREENiSTA.ai from ${email} and the team can reply.`,
  };
}
