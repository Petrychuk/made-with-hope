import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import { site } from "@/content/site";
import { Icon } from "./Icon";
import { LangSwitch } from "./LangSwitch";

export function Footer({ locale, d }: { locale: Locale; d: Dict }) {
  const base = `/${locale}`;
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <Link className="logo" href={base}>
            <Icon name="heart" className="heart-ico" />
            <span>
              <span className="logo__name">Home Made Galyna</span>
              <span className="logo__tag" style={{ display: "block" }}>{d.tagline}</span>
            </span>
          </Link>
          <nav className="footer__nav" aria-label="Footer">
            <Link href={base}>{d["nav.home"]}</Link>
            <Link href={`${base}#story`}>{d["nav.story"]}</Link>
            <Link href={`${base}#handmade`}>{d["nav.handmade"]}</Link>
            <Link href={`${base}/journal`}>{d["nav.journal"]}</Link>
            <Link href={`${base}#support`}>{d["nav.support"]}</Link>
            <Link href={`${base}#transparency`}>{d["nav.transparency"]}</Link>
            <LangSwitch locale={locale} />
          </nav>
          <div className="socials">
            <a href={site.contacts.instagram} {...ext} aria-label="Instagram"><Icon name="ig" /></a>
            <a href={site.contacts.facebook} {...ext} aria-label="Facebook"><Icon name="fb" /></a>
            <a href={`mailto:${site.contacts.email}`} aria-label="Email"><Icon name="mail" /></a>
            <a href={site.contacts.telegram} {...ext} aria-label="Telegram"><Icon name="tg" /></a>
          </div>
        </div>
        <div className="footer__mid">
          <div>
            <p>© 2026 Home Made Galyna. {d["ft.rights"]}</p>
            <p className="footer__made">{d["ft.made"]}</p>
          </div>
          <p className="footer__hand" aria-hidden="true">{d["ft.hand"]}</p>
          <div className="footer__legal">
            <Link href={`${base}/privacy`}>{d["ft.privacy"]}</Link>
            <span aria-hidden="true">|</span>
            <Link href={`${base}/privacy#support-terms`}>{d["ft.terms"]}</Link>
            <span aria-hidden="true">|</span>
            <Link href={`${base}#contacts`}>{d["ft.contact"]}</Link>
          </div>
        </div>
      </div>
      <svg className="landscape" viewBox="0 0 1440 170" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 80C160 40 300 70 430 55s260-40 400-10 290 30 410 10 160-10 200 0V170H0Z" fill="#E9DCC7" />
        <path d="M0 110c180-30 330-10 480-25s300-35 470-5 330 20 490-5V170H0Z" fill="#D9C7A6" />
        <path d="M0 135c200-20 380 5 560-10s360-15 520 5 260 0 360-10V170H0Z" fill="#B9C49E" />
        <g fill="#F2B27A">
          {[[60,140,4],[140,150,3],[260,138,4],[390,152,3],[520,142,4],[700,150,3],[860,140,4],[1010,152,3],[1160,141,4],[1300,150,3],[1400,140,4]].map(([cx,cy,r]) => (
            <circle key={`${cx}`} cx={cx} cy={cy} r={r} />
          ))}
        </g>
        <g fill="#fff">
          {[100,330,610,930,1220].map((cx) => <circle key={cx} cx={cx} cy={156} r={3} />)}
        </g>
      </svg>
    </footer>
  );
}
