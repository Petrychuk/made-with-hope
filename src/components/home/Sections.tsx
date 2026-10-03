import Link from "next/link";
import { pick, type Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import { site } from "@/content/site";
import { publishedProducts } from "@/content/products";
import { publishedPosts } from "@/content/posts";
import { faq, kindMessages, updates } from "@/content/home";
import { formatDate, formatMoney } from "@/lib/format";
import { Icon } from "../Icon";
import { Placeholder } from "../Placeholder";
import { ProductCard } from "../ProductCard";
import { JournalCard } from "../JournalCard";
import { Subscribe } from "../Subscribe";
import { KindWordsCarousel } from "./KindWords";

type P = { locale: Locale; d: Dict };

/* ---------------- HERO ---------------- */
export function Hero({ locale, d }: P) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero__grid">
        <div className="hero__text">
          <h1 id="hero-title">
            Home Made{" "}
            <span className="nowrap-heart">
              Galyna <Icon name="heart" className="heart-ico" />
            </span>
          </h1>
          <p className="hero__sub">
            <span>{d["hero.l1"]}</span>
            <span>{d["hero.l2"]}</span>
            <span>{d["hero.l3"]}</span>
          </p>
          <p className="hero__desc">{d["hero.desc"]}</p>
          <div className="hero__cta">
            <Link className="btn btn--primary" href={`/${locale}#support`}>
              <Icon name="heart-fill" />
              <span>{d["cta.support"]}</span>
            </Link>
            <Link className="btn btn--ghost" href={`/${locale}#story`}>
              <Icon name="leafbtn" style={{ color: "var(--sage)" }} />
              <span>{d["cta.readStory"]}</span>
            </Link>
          </div>
        </div>
        <Icon name="branch" className="leaf hero__leaf" />
      </div>
      <div className="hero__media">
        <Placeholder tone="sun" label={d["ph.hero"]} priority sizes="(max-width: 767px) 100vw, 57vw" />
        <p className="note hero__note">
          {d["note.hero"]} <Icon name="heart-fill" className="heart-ico" size={18} />
        </p>
      </div>
    </section>
  );
}

/* ---------------- PILLARS ---------------- */
export function Pillars({ d }: P) {
  const items = [
    { icon: "yarn", t: d["pil.1"], s: d["pil.1s"] },
    { icon: "book", t: d["pil.2"], s: d["pil.2s"] },
    { icon: "family", t: d["pil.3"], s: d["pil.3s"] },
    { icon: "heart", t: d["pil.4"], s: d["pil.4s"] },
  ] as const;
  return (
    <section className="pillars" aria-label={d.pillarsLabel}>
      <Icon name="branch" className="leaf leaf--l" />
      <ul className="wrap pillars__grid">
        {items.map((it) => (
          <li className="pillar" key={it.icon}>
            <span className="pillar__ico"><Icon name={it.icon} /></span>
            <span>{it.t}</span>
            <small>{it.s}</small>
          </li>
        ))}
      </ul>
      <Icon name="branch" className="leaf leaf--r" />
    </section>
  );
}

/* ---------------- HANDMADE ---------------- */
export function Handmade({ locale, d }: P) {
  const items = publishedProducts().filter((p) => p.featured).slice(0, 4);
  return (
    <section className="section" id="handmade" aria-labelledby="hm-title">
      <div className="wrap handmade__grid">
        <div>
          <div className="sec-head">
            <div>
              <h2 className="sec-title" id="hm-title">
                <span className="brush brush--peach" aria-hidden="true" />
                <span>{d["hm.title"]}</span> <Icon name="heart" className="heart-ico" size={30} />
              </h2>
              <p className="sec-lead">{d["hm.lead"]}</p>
            </div>
            <Link className="link-more" href={`/${locale}#handmade`}>
              <span>{d["hm.all"]}</span><Icon name="arrow" size={18} />
            </Link>
          </div>
          <ul className="cards">
            {items.map((p) => <ProductCard key={p.id} p={p} locale={locale} d={d} />)}
          </ul>
        </div>
        <div className="handmade__aside" aria-hidden="true">
          <Placeholder tone="sand" label={d["ph.craft"]} decorative />
          <p className="note">{d["note.hm"]}</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- JOURNAL PREVIEW ---------------- */
export function JournalPreview({ locale, d }: P) {
  const items = publishedPosts().slice(0, 4);
  return (
    <section className="section journal" id="journal" aria-labelledby="j-title" style={{ paddingTop: 16 }}>
      <div className="wrap journal__grid">
        <div>
          <div className="sec-head">
            <div>
              <h2 className="sec-title" id="j-title">
                <span className="brush brush--sage" aria-hidden="true" />
                <span>{d["j.title"]}</span> <Icon name="branch" className="leaf" size={36} />
              </h2>
              <p className="sec-lead">{d["j.lead"]}</p>
            </div>
            <Link className="link-more" href={`/${locale}/journal`}>
              <span>{d["j.all"]}</span><Icon name="arrow" size={18} />
            </Link>
          </div>
          <ul className="cards j-list">
            {items.map((p) => <JournalCard key={p.slug} post={p} locale={locale} d={d} />)}
          </ul>
          <Link className="btn btn--primary mobile-only" href={`/${locale}/journal`}>
            <span>{d["j.read"]}</span><Icon name="arrow" />
          </Link>
        </div>
        <div className="journal__aside" aria-hidden="true">
          <p className="note">{d["note.j"]} <Icon name="heart-fill" className="heart-ico" size={16} /></p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAMILY STORY ---------------- */
export function Story({ locale, d }: P) {
  return (
    <section className="story" id="story" aria-labelledby="st-title">
      <div className="wrap story__grid">
        <Placeholder tone="peach" label={d["ph.galyna"]} className="story__photo" />
        <div className="story__text">
          <h2 className="sec-title" id="st-title">
            <span>{d["st.title"]}</span> <Icon name="heart" className="heart-ico" size={30} />
          </h2>
          <p>{d["st.p1"]}</p>
          <p>{d["st.p2"]}</p>
          <Link className="btn btn--primary" href={`/${locale}#story`}>
            <span>{d["st.cta"]}</span><Icon name="arrow" />
          </Link>
        </div>
        <figure className="polaroid">
          <Placeholder tone="pink" label={d["ph.together"]} />
          <figcaption>{d["note.story"]} <Icon name="heart-fill" className="heart-ico" size={16} /></figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ---------------- SUPPORT ---------------- */
export function Support({ locale, d }: P) {
  const { raised, goal, updated } = site.fundraising;
  const pct = Math.min(100, Math.round((raised / goal) * 100));
  const helps = [
    { icon: "med", t: d["hp.1"], s: d["hp.1s"] },
    { icon: "rehab", t: d["hp.2"], s: d["hp.2s"] },
    { icon: "home", t: d["hp.3"], s: d["hp.3s"] },
    { icon: "sun", t: d["hp.4"], s: d["hp.4s"] },
  ] as const;
  return (
    <section className="section support" id="support" aria-labelledby="sp-title">
      <div className="wrap support__grid">
        <div>
          <h2 className="sec-title" id="sp-title">
            <span>{d["sp.title"]}</span> <Icon name="heart" className="heart-ico" size={30} />
          </h2>
          <p className="support__lead">{d["sp.lead"]}</p>
          <div className="progress">
            <div className="progress__top">
              <span className="progress__ico"><Icon name="family" /></span>
              <div>
                <div className="progress__sum">{formatMoney(raised, locale, d)}</div>
                <div className="progress__of">{d["sp.of"]} {formatMoney(goal, locale, d)}</div>
              </div>
              <span className="progress__pct">{pct}%</span>
            </div>
            <div
              className="bar"
              role="progressbar"
              aria-label={d["sp.progress"]}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={pct}
              aria-valuetext={`${formatMoney(raised, locale, d)} ${d["sp.of"]} ${formatMoney(goal, locale, d)}`}
            >
              <span style={{ width: `${pct}%` }} />
            </div>
            <p className="progress__upd">{d["sp.updated"]} {formatDate(updated, locale)}</p>
          </div>
          <a className="btn btn--primary" href={site.monobankUrl} target="_blank" rel="noopener noreferrer">
            <span>{d["sp.mono"]}</span><Icon name="ext" />
            <span className="sr-only">{d.newTab}</span>
          </a>
          <p className="support__note">
            <Icon name="heart-fill" className="heart-ico" size={18} style={{ marginTop: 2 }} />
            <span>{d["sp.note"]}</span>
          </p>
          <ul className="checks">
            {(["sp.c1", "sp.c2", "sp.c3"] as const).map((k) => (
              <li key={k}><Icon name="check" /><span>{d[k]}</span></li>
            ))}
          </ul>
        </div>
        <div className="helps">
          <h3>{d["hp.title"]}</h3>
          <ul>
            {helps.map((h) => (
              <li key={h.icon}>
                <span className="h-ico"><Icon name={h.icon} /></span>
                <span><strong>{h.t}</strong><small>{h.s}</small></span>
              </li>
            ))}
          </ul>
        </div>
        <div className="support__photo" aria-hidden="true">
          <Placeholder tone="pink" label={d["ph.flowers"]} decorative />
          <p className="note">{d["note.sp"]} <Icon name="heart-fill" className="heart-ico" size={16} /></p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TRANSPARENCY + UPDATES ---------------- */
export function Transparency({ locale, d }: P) {
  const actions = [
    { icon: "doc", t: d["tr.a1"], href: `/${locale}#transparency` },
    { icon: "receipt", t: d["tr.a2"], href: `/${locale}#transparency` },
    { icon: "news", t: d["tr.a3"], href: `/${locale}/journal?cat=news` },
  ] as const;
  return (
    <section className="section" id="transparency" aria-labelledby="tr-title" style={{ paddingTop: 8 }}>
      <div className="wrap">
        <div className="transp">
          <div>
            <h2 className="sec-title" id="tr-title" style={{ fontSize: 30 }}>{d["tr.title"]}</h2>
            <p className="sec-lead">{d["tr.lead"]}</p>
            <div className="transp__actions">
              {actions.map((a) => (
                <Link className="t-act" href={a.href} key={a.icon}>
                  <Icon name={a.icon} /><span>{a.t}</span><span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
            <p className="transp__privacy">{d["tr.privacy"]}</p>
          </div>
          <div className="updates" id="updates">
            <h3>{d["up.title"]} <Icon name="heart" className="heart-ico" size={24} /></h3>
            <ul className="u-list">
              {updates.map((u) => (
                <li className="u-card" key={u.date}>
                  <Placeholder tone={u.tone} image={u.image} label={d["ph.photo"]} decorative />
                  <div>
                    <strong>{pick(u.title, locale)}</strong>
                    <time dateTime={u.date}>{formatDate(u.date, locale)}</time>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- KIND WORDS ---------------- */
export function KindWords({ locale, d }: P) {
  return (
    <section className="section" id="kind" aria-labelledby="kw-title" style={{ paddingTop: 8 }}>
      <div className="wrap kind__grid">
        <div className="kind__photo">
          <Placeholder tone="sun" label={d["ph.son"]} />
          <p className="note">
            <span className="quote-mark" aria-hidden="true">“</span>
            <span className="hand">{d["note.kw"]}</span> <Icon name="heart-fill" className="heart-ico" size={16} />
          </p>
        </div>
        <div className="kind__panel">
          <h2 className="sec-title" id="kw-title">{d["kw.title"]}</h2>
          <p className="lead">{d["kw.lead"]}</p>
          <KindWordsCarousel messages={kindMessages} locale={locale} d={d} />
          <Link className="btn btn--sage btn--sm" href={`/${locale}#kind`}>
            <span>{d["kw.cta"]}</span><Icon name="arrow" />
          </Link>
          <Icon name="branch" className="leaf" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ + QUOTE + CONTACTS ---------------- */
export function FaqContacts({ locale, d }: P) {
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title" style={{ paddingTop: 8 }}>
      <div className="wrap faq__grid">
        <div>
          <h2 className="sec-title" id="faq-title" style={{ marginBottom: 20 }}>
            <span>{d["faq.title"]}</span> <Icon name="branch" className="leaf" size={34} />
          </h2>
          {faq.map((f) => (
            <details key={f.q.uk}>
              <summary>{pick(f.q, locale)}</summary>
              <p>{pick(f.a, locale)}</p>
            </details>
          ))}
        </div>
        <div>
          <figure className="gquote">
            <span className="quote-mark" aria-hidden="true">“</span>
            <blockquote>{d["quote.text"]}</blockquote>
            <figcaption><cite>{d["quote.by"]}</cite></figcaption>
          </figure>
          <div className="contacts" id="contacts">
            <h3>{d["ct.title"]}</h3>
            <p>{d["ct.lead"]}</p>
            <ul>
              <li><a href={site.contacts.telegram} {...ext}><span className="c-ico c-ico--tg"><Icon name="tg" /></span><span>{d["ct.tg"]}</span></a></li>
              <li><a href={site.contacts.instagram} {...ext}><span className="c-ico c-ico--ig"><Icon name="ig" /></span><span>{d["ct.ig"]}</span></a></li>
              <li><a href={`mailto:${site.contacts.email}`}><span className="c-ico c-ico--mail"><Icon name="mail" /></span>{site.contacts.email}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- STAY IN TOUCH ---------------- */
export function StayInTouch({ d }: P) {
  return (
    <section className="touch" aria-labelledby="tc-title">
      <div className="wrap touch__in">
        <Icon name="branch" className="leaf" />
        <div>
          <h2 id="tc-title">{d["tc.title"]}</h2>
          <p>{d["tc.lead"]}</p>
        </div>
        <Subscribe d={d} />
      </div>
    </section>
  );
}
