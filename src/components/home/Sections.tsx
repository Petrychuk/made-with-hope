import Link from "next/link";
import { pick, type Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import type { HomeContent } from "@/lib/home";
import type { Post, Product, Support as SupportData, Update } from "@/content/types";
import { formatDate, formatMoney } from "@/lib/format";
import { Icon } from "../Icon";
import { Heart } from "../Heart";
import { Botanical } from "../Botanical";
import { Placeholder } from "../Placeholder";
import { ProductCard } from "../ProductCard";
import { JournalCard } from "../JournalCard";
import { KindWordsCarousel } from "./KindWords";
import { CustomOrderButton } from "../order/CustomOrderButton";

type P = { locale: Locale; d: Dict };
type H = { home: HomeContent };

/* ---------------- HERO ---------------- */
export function Hero({ locale, d, home }: P & H) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero__grid">
        <div className="hero__text">
          <h1 id="hero-title">
            Home Made{" "}
            <span className="nowrap-heart">
              Galyna <Heart variant="main" size={64} />
            </span>
          </h1>
          <p className="hero__sub">
            {home.heroLines.map((l) => <span key={l}>{l}</span>)}
          </p>
          <p className="hero__desc">{home.heroDesc}</p>
          <div className="hero__cta">
            <Link className="btn btn--primary" href={`/${locale}#support`}>
              <Heart variant="small" size={20} className="" />
              <span>{d["cta.support"]}</span>
            </Link>
            <Link className="btn btn--ghost" href={`/${locale}#story`}>
              <Icon name="leafbtn" style={{ color: "var(--sage)" }} />
              <span>{d["cta.readStory"]}</span>
            </Link>
          </div>
        </div>
        <Botanical name="leaves-buds" width={92} className="leaf hero__leaf" />
      </div>
      <div className="hero__media">
        <Placeholder tone="sun" image={home.heroImage} label={d["ph.hero"]} priority sizes="(max-width: 767px) 100vw, 57vw" />
        <p className="note hero__note">
          {home.heroNote} <Heart variant="small" size={18} />
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
    { icon: "heart", t: d["pil.4"], s: d["pil.4s"] }, // rendered as hand-drawn <Heart>
  ] as const;
  return (
    <section className="pillars" aria-label={d.pillarsLabel}>
      <Botanical name="eucalyptus" width={78} className="leaf leaf--l" />
      <ul className="wrap pillars__grid">
        {items.map((it) => (
          <li className="pillar" key={it.icon}>
            <span className="pillar__ico">
              {it.icon === "heart" ? <Heart variant="main" size={38} className="" /> : <Icon name={it.icon} />}
            </span>
            <span>{it.t}</span>
            <small>{it.s}</small>
          </li>
        ))}
      </ul>
      <Botanical name="pale-leaves" width={84} className="leaf leaf--r" flip />
    </section>
  );
}

/* ---------------- HANDMADE ---------------- */
/** 4 random products (new mix on every visit); missing ones → «coming soon» cards. */
function pickRandom<T>(list: T[], n: number): T[] {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

const SOON_TONES = ["sand", "sage", "pink", "peach"] as const;

export function Handmade({ locale, d, products }: P & H & { products: Product[] }) {
  const items = pickRandom(products.filter((p) => p.status !== "sold"), 4);
  const soon = Math.max(0, 4 - items.length);
  return (
    <section className="section" id="handmade" aria-labelledby="hm-title">
      <div className="wrap">
        <div>
          <div className="sec-head">
            <div>
              <h2 className="sec-title" id="hm-title">
                <span className="brush brush--peach" aria-hidden="true" />
                <span>{d["hm.title"]}</span> <Heart variant="tilt" size={32} />
              </h2>
              <p className="sec-lead">{d["hm.lead"]}</p>
            </div>
            <Link className="link-more" href={`/${locale}/handmade`}>
              <span>{d["hm.all"]}</span><Icon name="arrow" size={18} />
            </Link>
          </div>
          <ul className="cards cards--home">
            {items.map((p) => <ProductCard key={p.slug} p={p} locale={locale} d={d} />)}
            {Array.from({ length: soon }, (_, i) => (
              <li className="p-card p-card--soon" key={`soon-${i}`}>
                <div className="p-card__media">
                  <Placeholder tone={SOON_TONES[i % SOON_TONES.length]} decorative />
                  <span className="soon-ico" aria-hidden="true"><Icon name="yarn" /></span>
                </div>
                <div className="p-card__body">
                  <span className="p-card__name">{d["hm.soonT"]}</span>
                  <span className="p-card__avail is-made_to_order">{d["hm.soonS"]} <Heart variant="small" size={14} /></span>
                </div>
              </li>
            ))}
            <li className="custom-card">
              <div className="custom-card__in">
                <div className="custom-card__top">
                  <span className="custom-card__kicker">{d["co.cardKicker"]}</span>
                  <span className="custom-card__yarn" aria-hidden="true">
                    <Icon name="yarn" />
                    <Heart variant="double" size={28} className="custom-card__hearts" />
                  </span>
                </div>
                <h3>{d["co.cardTitle"]}</h3>
                <p>{d["co.cardText"]}</p>
                <CustomOrderButton label={d["co.cardBtn"]} />
                <span className="custom-card__hand" aria-hidden="true">{d["co.cardHand"]} <Heart variant="small" size={16} /></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- HOW YOUR PURCHASE HELPS ---------------- */
export function PurchaseHelps({ d }: P) {
  const steps = [
    { key: "bag", icon: <Icon name="bag" />, t: d["bh.1"], s: d["bh.1s"] },
    { key: "heart", icon: <Heart variant="main" size={36} className="" />, t: d["bh.2"], s: d["bh.2s"] },
    { key: "family", icon: <Icon name="family" />, t: d["bh.3"], s: d["bh.3s"] },
  ];
  return (
    <section className="section buy-helps" aria-labelledby="bh-title">
      <div className="wrap buy-helps__grid">
        <div>
          <h2 className="sec-title" id="bh-title">{d["bh.title"]}</h2>
          <p className="sec-lead">{d["bh.lead"]}</p>
          <ol className="bh-steps">
            {steps.map((st, i) => (
              <li className="bh-step" key={st.key}>
                <span className="pillar__ico">{st.icon}</span>
                <h3>{st.t}</h3>
                <p>{st.s}</p>
                {i < steps.length - 1 && <Icon name="arrow-long" className="bh-arrow" />}
              </li>
            ))}
          </ol>
        </div>
        <div className="bh-note">
          <p>{d["bh.note"]} <Heart variant="small" size={24} /></p>
          <Botanical name="pale-leaves" width={70} className="bh-note__sprig" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- JOURNAL PREVIEW ---------------- */
export function JournalPreview({ locale, d, posts }: P & { posts: Post[] }) {
  const items = posts.slice(0, 4);
  return (
    <section className="section journal" id="journal" aria-labelledby="j-title" style={{ paddingTop: 16 }}>
      <div className="wrap journal__grid">
        <div>
          <div className="sec-head">
            <div>
              <h2 className="sec-title" id="j-title">
                <span className="brush brush--sage" aria-hidden="true" />
                <span>{d["j.title"]}</span> <Botanical name="pale-leaves" width={36} className="leaf title-sprig" />
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
          <p className="note">{d["note.j"]} <Heart variant="small" size={16} /></p>
          <Botanical name="daisies" width={130} className="journal__daisies" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAMILY STORY ---------------- */
export function Story({ locale, d, home }: P & H) {
  return (
    <section className="story" id="story" aria-labelledby="st-title">
      <div className="wrap story__grid">
        <Placeholder tone="peach" image={home.storyImage} label={d["ph.galyna"]} className="story__photo" sizes="(max-width: 767px) 100vw, 300px" />
        <div className="story__text">
          <h2 className="sec-title" id="st-title">
            <span>{d["st.title"]}</span> <Heart variant="tilt" size={32} />
          </h2>
          {home.storyParagraphs.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
          <Link className="btn btn--primary" href={`/${locale}#story`}>
            <span>{d["st.cta"]}</span><Icon name="arrow" />
          </Link>
          <Botanical name="gypsophila" width={86} className="story__sprig" />
        </div>
        <figure className="polaroid">
          <Placeholder tone="pink" image={home.polaroidImage} label={d["ph.together"]} sizes="230px" />
          <figcaption>{home.polaroidCaption} <Heart variant="small" size={16} /></figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ---------------- SUPPORT ---------------- */
export function Support({ locale, d, support, home }: P & H & { support: SupportData }) {
  const { raised, goal, updated, monobankUrl } = support;
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
        <div className="support__main">
          <h2 className="sec-title" id="sp-title">
            <span>{d["sp.title"]}</span> <Heart variant="tilt" size={32} />
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
          <a className="btn btn--primary" href={monobankUrl} target="_blank" rel="noopener noreferrer">
            <span>{d["sp.mono"]}</span><Icon name="ext" />
            <span className="sr-only">{d.newTab}</span>
          </a>
          <p className="support__note">
            <Heart variant="small" size={18} style={{ marginTop: 2 }} />
            <span>{d["sp.note"]}</span>
          </p>
          <ul className="checks">
            {(["sp.c1", "sp.c2", "sp.c3"] as const).map((k) => (
              <li key={k}><Icon name="check" /><span>{d[k]}</span></li>
            ))}
          </ul>
          <Botanical name="pink-buds" width={78} className="support__sprig" />
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
          <Placeholder tone="pink" image={home.supportImage} label={d["ph.flowers"]} decorative sizes="320px" />
          <p className="note">{d["note.sp"]} <Heart variant="small" size={16} /></p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TRANSPARENCY + UPDATES ---------------- */
export function Transparency({ locale, d, updates }: P & { updates: Update[] }) {
  const actions = [
    { icon: "doc", t: d["tr.a1"], href: `/${locale}/transparency#documents` },
    { icon: "receipt", t: d["tr.a2"], href: `/${locale}/transparency#reports` },
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
            <h3>{d["up.title"]} <Heart variant="tilt" size={26} className="heart-ico heart--sage" /></h3>
            <ul className="u-list">
              {updates.map((u) => (
                <li className="u-card" key={u.id}>
                  <Placeholder tone={u.tone} image={u.image} label={d["ph.photo"]} decorative sizes="(max-width: 767px) 72vw, 200px" />
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
export function KindWords({ locale, d, home }: P & H) {
  return (
    <section className="section" id="kind" aria-labelledby="kw-title" style={{ paddingTop: 8 }}>
      <div className="wrap kind__grid">
        <div className="kind__photo">
          <Placeholder tone="sun" image={home.kindImage} label={d["ph.son"]} sizes="(max-width: 767px) 100vw, 600px" />
          <p className="note">
            <span className="quote-mark" aria-hidden="true">“</span>
            <span className="hand">{home.kindNote}</span> <Heart variant="small" size={16} />
          </p>
        </div>
        <div className="kind__panel">
          <h2 className="sec-title" id="kw-title">{d["kw.title"]}</h2>
          <p className="lead">{d["kw.lead"]}</p>
          <KindWordsCarousel messages={home.messages} d={d} />
          <Link className="btn btn--sage btn--sm" href={`/${locale}#kind`}>
            <span>{d["kw.cta"]}</span><Icon name="arrow" />
          </Link>
          <Botanical name="peach-blossom" width={96} className="leaf" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ + QUOTE + CONTACTS ---------------- */
export function FaqContacts({ d, home }: P & H) {
  const c = home.contacts;
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title" style={{ paddingTop: 8 }}>
      <div className="wrap faq__grid">
        <div>
          <h2 className="sec-title" id="faq-title" style={{ marginBottom: 20 }}>
            <span>{d["faq.title"]}</span> <Botanical name="eucalyptus" width={34} className="leaf title-sprig" />
          </h2>
          {home.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
        <div>
          <figure className="gquote">
            <span className="quote-mark" aria-hidden="true">“</span>
            <blockquote>{home.quote}</blockquote>
            <figcaption><cite>{d["quote.by"]}</cite></figcaption>
          </figure>
          <div className="contacts" id="contacts">
            <h3>{d["ct.title"]}</h3>
            <p>{d["ct.lead"]}</p>
            <ul>
              {c.telegram && <li><a href={c.telegram} {...ext}><span className="c-ico c-ico--tg"><Icon name="tg" /></span><span>{d["ct.tg"]}</span></a></li>}
              {c.instagram && <li><a href={c.instagram} {...ext}><span className="c-ico c-ico--ig"><Icon name="ig" /></span><span>{d["ct.ig"]}</span></a></li>}
              <li><a href={`mailto:${c.email}`}><span className="c-ico c-ico--mail"><Icon name="mail" /></span>{c.email}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
