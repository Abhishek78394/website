import Image from "next/image";
import Link from "next/link";

export function Logo({ tone = "dark", nav = false }: { tone?: "dark" | "light"; nav?: boolean }) {
  const onDark = tone === "light";

  return (
    <Link href="/" aria-label="SCREENiSTA home" className="inline-flex items-center">
      <Image
        src={onDark ? "/brand/logo-light.png" : "/brand/logo-dark.png"}
        alt=""
        width={972}
        height={306}
        priority={nav}
        className={nav ? "h-10 w-auto" : "h-12 w-auto"}
      />
    </Link>
  );
}
