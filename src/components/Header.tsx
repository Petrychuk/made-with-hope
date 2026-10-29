"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import { Icon } from "./Icon";
import { LangSwitch } from "./LangSwitch";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { Heart } from "@/components/Heart";

export function Header({ locale, d }: { locale: Locale; d: Dict }) {
  const pathname = usePathname() || "";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFocusTrap(panelRef, open, () => setOpen(false), burgerRef);

  const base = `/${locale}`;
  const isHome = pathname === base;
  const isJournal = pathname.startsWith(`${base}/journal`);

  const links = [
    { href: base, label: d["nav.home"], current: isHome },
    { href: `${base}#story`, label: d["nav.story"] },
    { href: `${base}#handmade`, label: d["nav.handmade"] },
    { href: `${base}/journal`, label: d["nav.journal"], current: isJournal },
    { href: `${base}#support`, label: d["nav.support"] },
  ];

  return (
    <>
      <header className={`header${scrolled ? " is-scrolled" : ""}`}>
        <div className="wrap header__in">
          <Link className="logo" href={base} aria-label="Home Made Galyna">
            <Heart variant="main" size={38} />
            <span>
              <span className="logo__name">Home Made Galyna</span>
              <span className="logo__tag">{d.tagline}</span>
            </span>
          </Link>

          <nav className="nav" aria-label={d.navLabel}>
            {links.map((l) => (
              <Link key={l.href} href={l.href} aria-current={l.current ? "page" : undefined}>
                {l.label}
              </Link>
            ))}
            <LangSwitch locale={locale} />
          </nav>

          <Link className="btn btn--primary btn--sm desktop-cta" href={`${base}#support`}>
            <Heart variant="small" size={20} className="" />
            <span>{d["cta.support"]}</span>
          </Link>

          <button
            ref={burgerRef}
            className="burger"
            type="button"
            aria-expanded={open}
            aria-controls="drawer"
            aria-label={d.menuOpen}
            onClick={() => setOpen(true)}
          >
            <Icon name="burger" />
          </button>
        </div>
      </header>

      <div className={`drawer${open ? " is-open" : ""}`} id="drawer" aria-hidden={!open}>
        <div className="drawer__bg" onClick={() => setOpen(false)} />
        <div className="drawer__panel" role="dialog" aria-modal="true" aria-label={d.navLabel} ref={panelRef}>
          <div className="drawer__top">
            <span className="logo">
              <Heart variant="main" size={34} />
              <span className="logo__name">Home Made Galyna</span>
            </span>
            <button className="drawer__close" type="button" aria-label={d.close} onClick={() => setOpen(false)}>
              <Icon name="close" size={24} />
            </button>
          </div>
          <nav aria-label={d.navLabel} onClick={() => setOpen(false)}>
            {links.map((l) => (
              <Link key={l.href} href={l.href} aria-current={l.current ? "page" : undefined}>
                {l.label}
              </Link>
            ))}
            <Link href={`${base}#contacts`}>{d["nav.contacts"]}</Link>
          </nav>
          <LangSwitch locale={locale} />
          <Link className="btn btn--primary" href={`${base}#support`} onClick={() => setOpen(false)}>
            <Heart variant="small" size={20} className="" />
            <span>{d["cta.support"]}</span>
          </Link>
        </div>
      </div>
    </>
  );
}
