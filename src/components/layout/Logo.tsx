import Image from "next/image";
import Link from "next/link";

export function Logo({ tone = "dark", nav = false }: { tone?: "dark" | "light"; nav?: boolean }) {
  const onDark = tone === "light";

  return (
    <Link href="/" aria-label="SCREENiSTA home" className="inline-flex items-center">
      <Image
        src={onDark ? "/brand/logo-light.png" : "/brand/logo-dark.png"}
        alt=""
        width={800}
        height={160}
        priority={nav}
        className={nav ? "h-9 w-auto" : "h-11 w-auto"}
      />
    </Link>
  );
}
