import Link from "next/link";
import { siteConfig } from "@/config/site";
import { footerNav } from "@/content/navigation";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { FooterWordmark } from "@/components/layout/FooterWordmark";

export function SiteFooter() {
  return (
    <footer className="bg-dark text-white">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr_1fr_1fr] md:py-20">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/65">
            Outdoor advertising, made intelligent. Discover screens, launch campaigns, and measure delivery.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {siteConfig.sameAs.map((href) => (
              <li key={href}>
                <a href={href} className="text-white/70 hover:text-white" rel="noopener noreferrer" target="_blank">
                  {labelForSocial(href)}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {footerNav.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="font-mono text-[11px] tracking-[0.16em] text-white/45 uppercase">{group.title}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {group.links.map((link) => (
                <li key={`${group.title}-${link.label}`}>
                  {"external" in link && link.external ? (
                    <a href={link.href} className="text-white/75 hover:text-white" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-white/75 hover:text-white">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <FooterWordmark />
      <Container className="flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p>{siteConfig.legalName}</p>
          <p>© 2026 SCREENiSTA. All rights reserved.</p>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          <li>
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
          </li>
          <li>
            <Link href="/cookies" className="hover:text-white">
              Cookie Policy
            </Link>
          </li>
        </ul>
      </Container>
    </footer>
  );
}

function labelForSocial(href: string) {
  if (href.includes("instagram")) return "Instagram";
  if (href.includes("facebook")) return "Facebook";
  if (href.includes("linkedin")) return "LinkedIn";
  return "X";
}
