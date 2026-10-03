"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";

const labels: Record<Locale, string> = { uk: "UA", en: "EN" };

export function LangSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`;

  const hrefFor = (target: Locale) => {
    const parts = pathname.split("/");
    parts[1] = target; // "/uk/journal" -> ["", "uk", "journal"]
    return parts.join("/") || `/${target}`;
  };

  const remember = (target: Locale) => {
    document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <div className="lang" role="group" aria-label="Language / Мова">
      {locales.map((l, i) => (
        <span key={l} style={{ display: "contents" }}>
          {i > 0 && <span aria-hidden="true">|</span>}
          <Link
            href={hrefFor(l)}
            hrefLang={l}
            lang={l}
            aria-current={l === locale ? "true" : undefined}
            onClick={() => remember(l)}
            scroll={false}
          >
            {labels[l]}
          </Link>
        </span>
      ))}
    </div>
  );
}
