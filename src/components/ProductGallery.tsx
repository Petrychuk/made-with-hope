"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { ImageRef, Tone } from "@/content/types";
import { imageLoader, isSanityUrl } from "@/lib/sanityLoader";
import { Icon } from "./Icon";
import { Placeholder } from "./Placeholder";

type Labels = { gallery: string; prev: string; next: string; photo: string; of: string; placeholder: string };

/**
 * Up to 5 photos: swipe on phones (CSS scroll-snap), arrows + thumbnails on desktop,
 * ← → keys when focused. One photo → no controls. No photos → placeholder.
 */
export function ProductGallery({ images, name, tone, labels }: { images: ImageRef[]; name: string; tone: Tone; labels: Labels }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = Math.min(images.length, 5);
  const photos = images.slice(0, 5);

  // keep the counter in sync while the visitor swipes
  useEffect(() => {
    const el = trackRef.current;
    if (!el || count < 2) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const i = Math.round(el.scrollLeft / el.clientWidth);
        setIndex(Math.max(0, Math.min(count - 1, i)));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => { el.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, [count]);

  const goTo = useCallback((i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const target = (i + count) % count;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: target * el.clientWidth, behavior: smooth ? "smooth" : "auto" });
    setIndex(target);
  }, [count]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (count < 2) return;
    if (e.key === "ArrowRight") { e.preventDefault(); goTo(index + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); goTo(index - 1); }
  };

  if (count === 0) {
    return <Placeholder tone={tone} label={labels.placeholder} className="gallery__empty" priority />;
  }

  const photoLabel = (i: number) => `${labels.photo} ${i + 1} ${labels.of} ${count}`;

  return (
    <div className="gallery" role="region" aria-roledescription="carousel" aria-label={`${labels.gallery}: ${name}`} onKeyDown={onKeyDown}>
      <div className="gallery__viewport">
        <div className="gallery__track" ref={trackRef} tabIndex={count > 1 ? 0 : -1}>
          {photos.map((img, i) => (
            <div className="gallery__slide" key={img.url} role="group" aria-roledescription="slide" aria-label={photoLabel(i)}>
              <Image
                src={img.url}
                alt={img.alt || `${name} — ${photoLabel(i)}`}
                fill
                loader={isSanityUrl(img.url) ? imageLoader : undefined}
                sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 600px"
                priority={i === 0}
                placeholder={img.lqip ? "blur" : "empty"}
                blurDataURL={img.lqip}
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>

        {count > 1 && (
          <>
            <button type="button" className="gallery__nav gallery__nav--prev" aria-label={labels.prev} onClick={() => goTo(index - 1)}>
              <Icon name="arrow" size={22} />
            </button>
            <button type="button" className="gallery__nav gallery__nav--next" aria-label={labels.next} onClick={() => goTo(index + 1)}>
              <Icon name="arrow" size={22} />
            </button>
            <span className="gallery__count" aria-hidden="true">{index + 1} / {count}</span>
            <span className="sr-only" aria-live="polite">{photoLabel(index)}</span>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="gallery__thumbs">
          {photos.map((img, i) => (
            <button
              key={img.url}
              type="button"
              aria-label={photoLabel(i)}
              aria-current={i === index ? "true" : undefined}
              onClick={() => goTo(i)}
            >
              <Image src={img.url} alt="" fill loader={isSanityUrl(img.url) ? imageLoader : undefined} sizes="80px" style={{ objectFit: "cover" }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
