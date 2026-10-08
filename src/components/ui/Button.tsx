import Link from "next/link";
import type { ReactNode } from "react";

const variants = {
  primary: "bg-ink text-white hover:bg-[#2a2d33]",
  secondary: "border border-ink/15 bg-transparent text-ink hover:border-ink/40",
  light: "bg-white text-ink hover:bg-soft",
  ghost: "border border-white/20 bg-transparent text-white hover:border-white/50 hover:bg-white/5",
} as const;

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  external?: boolean;
  className?: string;
}) {
  const classes = `group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition duration-300 ${variants[variant]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
