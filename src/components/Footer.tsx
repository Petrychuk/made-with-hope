import Link from "next/link";
import { getImageProps } from "next/image";
import meadowWide from "@/assets/footer/meadow-wide.webp";
import meadowTall from "@/assets/footer/meadow-tall.webp";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import type { Contacts } from "@/lib/home";
import { Icon } from "./Icon";
import { LangSwitch } from "./LangSwitch";
import { Heart } from "@/components/Heart";
import { LegalLinks } from "./LegalLinks";
import type { LegalDoc } from "@/content/legal";

export function Footer({ locale, d, contacts: c, legal }: { locale: Locale; d: Dict; contacts: Contacts; legal: LegalDoc[] }) {
  const base = `/${locale}`;
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  return (
    <footer className="footer">
      <FooterBackground />
      <div className="wrap">
        <div className="footer__top">
          <Link className="logo" href={base}>
            <Heart variant="main" size={38} />
            <span>
              <span className="logo__name">{d.brand}</span>
              <span className="logo__tag" style={{ display: "block" }}>{d.tagline}</span>
            </span>
          </Link>
          <nav className="footer__nav" aria-label="Footer">
            <Link href={`${base}#story`}>{d["nav.story"]}</Link>
            <Link href={`${base}#handmade`}>{d["nav.handmade"]}</Link>
            <Link href={`${base}/journal`}>{d["nav.journal"]}</Link>
            <Link href={`${base}/paintings`}>{d["nav.paintings"]}</Link>
            <LangSwitch locale={locale} />
          </nav>
          <div className="socials">
            {c.instagram && <a href={c.instagram} {...ext} aria-label="Instagram"><Icon name="ig" /></a>}
            {c.facebook && <a href={c.facebook} {...ext} aria-label="Facebook"><Icon name="fb" /></a>}
            {c.email && <a href={`mailto:${c.email}`} aria-label="Email"><Icon name="mail" /></a>}
            {c.telegram && <a href={c.telegram} {...ext} aria-label="Telegram"><Icon name="tg" /></a>}
          </div>
        </div>
        <div className="footer__mid">
          <LegalLinks docs={legal} locale={locale} closeLabel={d.close} updatedLabel={d["lg.updated"]} />
          <p className="footer__hand" aria-hidden="true">{d["ft.hand"]}</p>
          <div className="footer__copy">
            <p>© 2026 {d.brand}. {d["ft.rights"]}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * Art-directed background: wide meadow on tablet/desktop, tall meadow on phones.
 * next/image resizes it for each screen and serves AVIF/WebP; it loads lazily (footer is below the fold).
 */
function FooterBackground() {
  const common = { alt: "", sizes: "100vw", quality: 75 };
  const { props: { srcSet: wide } } = getImageProps({ ...common, src: meadowWide });
  const { props: { srcSet: tall, sizes, ...img } } = getImageProps({ ...common, src: meadowTall });
  return (
    <picture className="footer__bg" aria-hidden="true">
      <source media="(min-width: 768px)" srcSet={wide} sizes={sizes} />
      <source media="(max-width: 767px)" srcSet={tall} sizes={sizes} />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img {...img} loading="lazy" decoding="async" />
    </picture>
  );
}
