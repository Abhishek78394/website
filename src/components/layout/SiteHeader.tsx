"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { navGroupIsActive, primaryNav } from "@/content/navigation";
import { Logo } from "@/components/layout/Logo";
import { NavIcon } from "@/components/layout/nav-icons";

const BAR = 60; // keep in sync with --nav-h
// Hover intent: a short delay before opening stops fly-by opens, a longer one before
// closing lets the pointer cross the gap to the panel without it vanishing.
const OPEN_DELAY = 90;
const CLOSE_DELAY = 200;

function Roll({ children }: { children: string }) {
  // The label rolls up and a copy rolls in from below on hover. The copy is hidden from assistive tech.
  return (
    <span className="nav-roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

function Chevron() {
  return (
    <svg className="nav-chevron" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M1.5 3.5 5 7l3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg className="nav-item-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2.5 7h9M8 3.5 11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// The highlight behind the dropdown rows is one element that glides to the hovered row.
function moveRow(panel: HTMLElement, row: HTMLElement) {
  panel.style.setProperty("--row-y", `${row.offsetTop}px`);
  panel.style.setProperty("--row-h", `${row.offsetHeight}px`);
  // first hover appears in place, later ones glide
  panel.dataset.row = panel.dataset.row ? "moving" : "on";
}

function resetRow(panel: HTMLElement) {
  delete panel.dataset.row;
}

export function SiteHeader() {
  const pathname = usePathname();
  const home = pathname === "/";
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [menu, setMenu] = useState<string | null>(null);
  const [path, setPath] = useState(pathname);
  const [pill, setPill] = useState({ x: 0, w: 0, show: false, snap: true });
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const openTimer = useRef<number | undefined>(undefined);
  const closeTimer = useRef<number | undefined>(undefined);
  const openedAt = useRef(0);

  if (path !== pathname) {
    setPath(pathname);
    setOpen(false);
    setOpenGroup(null);
    setMenu(null);
  }

  useEffect(() => {
    return () => {
      window.clearTimeout(openTimer.current);
      window.clearTimeout(closeTimer.current);
    };
  }, []);

  // One shared highlight glides to whichever item is hovered or focused.
  const movePill = useCallback((el: HTMLElement | null) => {
    const nav = navRef.current;
    if (!nav || !el) return;
    const n = nav.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setPill((p) => ({ x: r.left - n.left, w: r.width, show: true, snap: !p.show }));
  }, []);

  const hidePill = useCallback(() => setPill((p) => ({ ...p, show: false })), []);

  const openMenu = useCallback((label: string) => {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(openTimer.current);
    // when another menu is already open, switch straight away
    openTimer.current = window.setTimeout(() => {
      openedAt.current = Date.now();
      setMenu(label);
    }, OPEN_DELAY);
  }, []);

  const switchMenu = useCallback((label: string) => {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(openTimer.current);
    openedAt.current = Date.now();
    setMenu(label);
  }, []);

  const closeMenu = useCallback(() => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMenu(null), CLOSE_DELAY);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!home) {
        setCompact(window.scrollY > 8);
        return;
      }
      const hero = document.querySelector(".hero-pin");
      const bottom = hero?.getBoundingClientRect().bottom ?? 0;
      setCompact(bottom < BAR);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [home]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open && !menu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, menu]);

  const onDark = home && !compact && !open;

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 h-(--nav-h) ${onDark ? "nav-glass-dark" : "nav-glass-light"}`}
        onPointerMove={(event) => {
          // a soft light along the bottom edge that follows the pointer
          headerRef.current?.style.setProperty("--hx", `${event.clientX}px`);
        }}
      >
        <div className="relative mx-auto flex h-full max-w-[1240px] items-center justify-between px-5 md:px-8">
          <Logo nav tone={onDark ? "light" : "dark"} />

          <nav
            ref={navRef}
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 lg:flex"
            aria-label="Primary"
            onPointerLeave={() => {
              hidePill();
              closeMenu();
            }}
            onPointerMove={(event) => {
              const pillEl = pillRef.current;
              if (!pillEl) return;
              // spotlight inside the pill tracks the pointer
              pillEl.style.setProperty("--spot-x", `${event.clientX - pillEl.getBoundingClientRect().left}px`);
            }}
          >
            <span
              ref={pillRef}
              aria-hidden="true"
              className="nav-pill"
              data-show={pill.show}
              data-snap={pill.snap}
              style={{ width: pill.w, ["--pill-x" as string]: `${pill.x}px` }}
            />
            {primaryNav.map((item) => {
              const active = navGroupIsActive(item, pathname);

              if (!item.children) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="nav-link nav-link-main"
                    aria-current={active ? "page" : undefined}
                    onPointerEnter={(event) => {
                      movePill(event.currentTarget);
                      closeMenu();
                    }}
                    onFocus={(event) => movePill(event.currentTarget)}
                  >
                    <Roll>{item.label}</Roll>
                  </Link>
                );
              }

              const isOpen = menu === item.label;
              const panelId = `menu-${item.label.toLowerCase()}`;

              return (
                <div
                  key={item.label}
                  className="relative"
                  onPointerEnter={(event) => {
                    if (event.pointerType !== "mouse") return;
                    movePill(event.currentTarget.querySelector<HTMLElement>(".nav-link-main"));
                    if (menu) switchMenu(item.label);
                    else openMenu(item.label);
                  }}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setMenu(null);
                  }}
                  onKeyDown={(event) => {
                    const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(".nav-item"));
                    const trigger = event.currentTarget.querySelector<HTMLElement>(".nav-link-main");
                    if (event.key === "Escape" && isOpen) {
                      event.stopPropagation();
                      setMenu(null);
                      trigger?.focus();
                    } else if (event.key === "ArrowDown") {
                      event.preventDefault();
                      switchMenu(item.label);
                      // the rows only become focusable once the panel is open
                      window.setTimeout(() => items[0]?.focus(), 30);
                    } else if (event.key === "ArrowUp" && isOpen) {
                      event.preventDefault();
                      items[items.length - 1]?.focus();
                    }
                    if (isOpen && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
                      const at = items.indexOf(document.activeElement as HTMLElement);
                      if (at >= 0) {
                        event.preventDefault();
                        const next = event.key === "ArrowDown" ? at + 1 : at - 1;
                        if (next < 0) trigger?.focus();
                        else items[next % items.length]?.focus();
                      }
                    }
                  }}
                >
                  <button
                    type="button"
                    className="nav-link nav-link-main"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    aria-current={active ? "page" : undefined}
                    onFocus={(event) => movePill(event.currentTarget)}
                    onClick={() => {
                      // a click right after the hover-open should not immediately close it
                      if (isOpen && Date.now() - openedAt.current > 400) setMenu(null);
                      else switchMenu(item.label);
                    }}
                  >
                    <Roll>{item.label}</Roll>
                    <Chevron />
                  </button>
                  <div
                    id={panelId}
                    className={`absolute top-full left-1/2 w-[20.5rem] -translate-x-1/2 pt-3 transition duration-300 ease-out ${
                      isOpen ? "visible translate-y-0 scale-100 opacity-100" : "pointer-events-none invisible -translate-y-1.5 scale-[0.97] opacity-0"
                    }`}
                  >
                    <div
                      className="nav-panel"
                      data-open={isOpen}
                      onPointerOver={(event) => {
                        const row = (event.target as HTMLElement).closest<HTMLElement>(".nav-item");
                        if (row) moveRow(event.currentTarget, row);
                      }}
                      onFocus={(event) => {
                        const row = (event.target as HTMLElement).closest<HTMLElement>(".nav-item");
                        if (row) moveRow(event.currentTarget, row);
                      }}
                      onPointerLeave={(event) => resetRow(event.currentTarget)}
                    >
                      <span aria-hidden="true" className="nav-row-pill" />
                      {item.children.map((child, index) => (
                        <Link
                          key={`${item.label}-${child.href}`}
                          href={child.href}
                          className="nav-item"
                          style={{ ["--i" as string]: index }}
                          tabIndex={isOpen ? 0 : -1}
                        >
                          <span className="nav-item-icon">
                            <NavIcon href={child.href} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[13.5px] leading-tight font-medium tracking-[-0.01em]">{child.label}</span>
                            {child.note ? <span className="nav-item-note">{child.note}</span> : null}
                          </span>
                          <Arrow />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <a href={siteConfig.appUrl} className="nav-link nav-link-login">
              Login
            </a>
            <a href={siteConfig.appUrl} className="nav-cta">
              Get Started
              <svg className="nav-cta-arrow" width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2.5 7h9M8 3.5 11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <button
              type="button"
              className="nav-link nav-link-menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden="true" className="text-xl leading-none">
                {open ? "×" : "☰"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div id="mobile-nav" className="nav-glass-light fixed inset-x-0 top-(--nav-h) bottom-0 z-40 overflow-y-auto lg:hidden">
          <nav className="px-6 py-4" aria-label="Mobile">
            <ul>
              {primaryNav.map((item) => (
                <li key={item.label} className="border-b border-black/10">
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between py-4 text-left text-[1.7rem] leading-none tracking-[-0.04em] text-ink"
                        aria-expanded={openGroup === item.label}
                        onClick={() => setOpenGroup((value) => (value === item.label ? null : item.label))}
                      >
                        {item.label}
                        <span aria-hidden="true" className="text-base text-muted">
                          {openGroup === item.label ? "–" : "+"}
                        </span>
                      </button>
                      {openGroup === item.label ? (
                        <ul className="pb-4">
                          {item.children.map((child) => (
                            <li key={`${item.label}-${child.href}`}>
                              <Link href={child.href} className="block py-2 text-sm text-muted">
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </>
                  ) : (
                    <Link href={item.href} className="block py-4 text-[1.7rem] leading-none tracking-[-0.04em] text-ink">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-6 text-sm">
              <a href={siteConfig.appUrl} className="text-ink">
                Login
              </a>
              <a href={siteConfig.partnerUrl} className="text-muted">
                Become a partner
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
