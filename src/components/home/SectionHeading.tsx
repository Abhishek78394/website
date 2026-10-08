export function SectionHeading({
  eyebrow,
  title,
  body,
  id,
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  id?: string;
  tone?: "light" | "dark";
}) {
  const titleColor = tone === "dark" ? "text-white" : "text-ink";
  const bodyColor = tone === "dark" ? "text-white/65" : "text-muted";
  const eyebrowColor = tone === "dark" ? "text-white/45" : "text-muted";

  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className={`font-mono text-[11px] tracking-[0.18em] uppercase ${eyebrowColor}`}>{eyebrow}</p>
      ) : null}
      <h2 id={id} className={`story-title mt-4 ${titleColor}`}>
        {title}
      </h2>
      {body ? <p className={`mt-5 max-w-xl text-lg leading-8 ${bodyColor}`}>{body}</p> : null}
    </div>
  );
}
