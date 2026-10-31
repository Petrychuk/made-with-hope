"use client";

import { useRef, useState } from "react";
import type { Dict } from "@/i18n/dictionaries";
import type { Achievement } from "@/lib/home";
import { Botanical } from "../Botanical";
import { Heart } from "../Heart";
import { Icon } from "../Icon";
import { Placeholder } from "../Placeholder";

/** Slider of the son's achievements: photo | text on desktop, photo above text on phones. No auto-play. */
export function Achievements({ d, slides }: { d: Dict; slides: Achievement[] }) {
  const [i, setI] = useState(0);
  const touchX = useRef<number | null>(null);
  const n = slides.length;
  if (!n) return null;
  const go = (to: number) => setI((to + n) % n);
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") go(i - 1);
    if (e.key === "ArrowRight") go(i + 1);
  };

  return (
    <section className="section ach" id="achievements" aria-labelledby="ach-title" style={{ paddingTop: 8 }}>
      <div
        className="wrap ach__grid"
        role="group"
        aria-roledescription="carousel"
        aria-label={d["ach.nav"]}
        onKeyDown={onKey}
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
        }}
      >
        <div className="ach__photos">
          {slides.map((s, k) => (
            <div className={`ach__ph${k === i ? " is-active" : ""}`} key={k} aria-hidden={k !== i}>
              <Placeholder tone="sun" image={s.photo} label={d["ph.son"]} alt={s.photo?.alt || s.title} sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 600px" />
            </div>
          ))}
          {n > 1 && (
            <>
              <button type="button" className="ach__arrow ach__arrow--prev" aria-label={d["ach.prev"]} onClick={() => go(i - 1)}>
                <Icon name="chev" size={20} />
              </button>
              <button type="button" className="ach__arrow ach__arrow--next" aria-label={d["ach.next"]} onClick={() => go(i + 1)}>
                <Icon name="chev" size={20} />
              </button>
            </>
          )}
        </div>

        <div className="ach__panel">
          <div className="ach__main">
            <span className="ach__kicker">{d["ach.kicker"]}</span>
            <h2 className="sec-title" id="ach-title">
              <span>{d["ach.title"]}</span> <Heart variant="tilt" size={30} className="heart-ico heart--sage" />
            </h2>

            <div className="ach__slides" aria-live="polite">
              {slides.map((s, k) => (
                <article
                  className={`ach__slide${k === i ? " is-active" : ""}`}
                  key={k}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${k + 1} ${d["ach.of"]} ${n}`}
                  aria-hidden={k !== i}
                  inert={k !== i}
                >
                  <h3>{s.title}</h3>
                  {(s.tag || s.date) && (
                    <p className="ach__meta">
                      {s.tag && <span className="ach__tag">{s.tag}</span>}
                      {s.date && <time>{s.date}</time>}
                    </p>
                  )}
                  {s.text && <p className="ach__text">{s.text}</p>}
                  {s.note && (
                    <p className="ach__note">
                      <span className="ach__note-mark" aria-hidden="true">“</span>
                      {s.note} <Heart variant="small" size={16} />
                    </p>
                  )}
                </article>
              ))}
            </div>

            {n > 1 && (
              <div className="dots" role="group" aria-label={d["ach.nav"]}>
                {slides.map((_, k) => (
                  <button
                    key={k}
                    type="button"
                    aria-label={`${d["ach.slide"]} ${k + 1}`}
                    aria-current={k === i ? "true" : undefined}
                    onClick={() => go(k)}
                  />
                ))}
              </div>
            )}
          </div>

          {n > 1 && (
            <div className="ach__thumbs">
              {slides.map((s, k) => (
                <button
                  key={k}
                  type="button"
                  className="ach__thumb"
                  aria-label={s.title}
                  aria-current={k === i ? "true" : undefined}
                  onClick={() => go(k)}
                >
                  <Placeholder tone="sun" image={s.photo} decorative sizes="96px" />
                </button>
              ))}
            </div>
          )}
          <Botanical name="peach-blossom" width={96} className="leaf ach__sprig" />
        </div>
      </div>
    </section>
  );
}
