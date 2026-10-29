"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import uk from "@/i18n/dictionaries/uk";
import en from "@/i18n/dictionaries/en";
import { Heart } from "@/components/Heart";

/** Minimal 404 in the site style; language taken from the address. */
export default function NotFound() {
  const locale = usePathname()?.startsWith("/en") ? "en" : "uk";
  const d = locale === "en" ? en : uk;
  return (
    <section className="section nf" aria-labelledby="nf-title">
      <div className="wrap nf__in">
        <p className="nf__code" aria-hidden="true">
          4<Heart variant="main" size={96} className="heart-ico nf__heart" />4
        </p>
        <h1 id="nf-title" className="sec-title">{d["nf.title"]}</h1>
        <p className="nf__text">{d["nf.text"]}</p>
        <div className="nf__cta">
          <Link className="btn btn--primary" href={`/${locale}`}>{d["nf.home"]}</Link>
          <Link className="btn btn--ghost" href={`/${locale}/handmade`}>{d["nf.handmade"]}</Link>
        </div>
      </div>
    </section>
  );
}
