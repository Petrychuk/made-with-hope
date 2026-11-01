"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Heart } from "./Heart";
import { Icon, type IconName } from "./Icon";
import { PaintingCard, type PaintingItem } from "./PaintingCard";
import { PaintingLightbox } from "./PaintingLightbox";

export type Chip = { key: string; label: string; icon?: string };
const KNOWN_ICONS = ["flower", "mountain", "home", "paw", "sun", "leafbtn"] as const;

/** Big featured painting + a swipeable row + category chips. `labels` = dictionary strings (pt.*). */
export function PaintingsGallery({ items, chips, labels, allHref }: { items: PaintingItem[]; chips: Chip[]; labels: Record<string, string>; allHref: string }) {
  const [cat, setCat] = useState("all");
  const track = useRef<HTMLUListElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [edge, setEdge] = useState({ prev: false, next: false });

  const real = items.some((i) => !i.placeholder);
  const list = real && cat !== "all" ? items.filter((i) => i.topics.some((t) => t.key === cat)) : items;
  const [first, ...rest] = list;
  const show = (i: number) => (el: HTMLElement) => { trigger.current = el; setOpen(i); };

  const update = () => {
    const el = track.current;
    if (el) setEdge({ prev: el.scrollLeft > 4, next: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 });
  };
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    el.scrollLeft = 0;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [cat, rest.length]);

  function go(dir: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: calm ? "auto" : "smooth" });
  }

  return (
    <div className="pt-gallery">
      {first ? (
        <div className="pt-stage">
          <PaintingCard item={first} label={labels.ph} big sizes="(max-width: 1023px) 100vw, 380px" openLabel={labels.open} onOpen={show(0)} />
          {rest.length > 0 && (
            <div className="pt-track-wrap">
              <ul className="pt-track" ref={track} onScroll={update} tabIndex={0} aria-label={labels.list}>
                {rest.map((p, i) => (
                  <li key={p.id}>
                    <PaintingCard item={p} label={labels.ph} sizes="(max-width: 767px) 60vw, 150px" openLabel={labels.open} onOpen={show(i + 1)} />
                  </li>
                ))}
              </ul>
              {edge.prev && (
                <button type="button" className="pt-arrow pt-arrow--prev" aria-label={labels.prev} onClick={() => go(-1)}>
                  <Icon name="chev" />
                </button>
              )}
              {edge.next && (
                <button type="button" className="pt-arrow pt-arrow--next" aria-label={labels.next} onClick={() => go(1)}>
                  <Icon name="chev" />
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <p className="empty">{labels.empty}</p>
      )}

      <div className="pt-bar">
        <div className="pt-chips" role="group" aria-label={labels.filter}>
          {chips.map((c) => (
            <button key={c.key} type="button" className="pt-chip" aria-pressed={cat === c.key} onClick={() => setCat(c.key)}>
              {c.icon === "heart" ? <Heart variant="small" size={20} className="" />
                : (KNOWN_ICONS as readonly string[]).includes(c.icon ?? "") ? <Icon name={c.icon as IconName} /> : null}
              <span>{c.label}</span>
            </button>
          ))}
        </div>
        <Link className="btn btn--primary" href={allHref}>
          <Icon name="brush" /><span>{labels.cta}</span><Icon name="arrow" />
        </Link>
      </div>
      {open !== null && real && (
        <PaintingLightbox items={list} index={open} labels={labels} trigger={trigger} onIndex={setOpen} onClose={() => setOpen(null)} />
      )}
    </div>
  );
}
