"use client";

import Image from "next/image";
import { useRef, type KeyboardEvent, type RefObject } from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { Icon } from "./Icon";
import { useOrder } from "./order/OrderProvider";
import type { PaintingItem } from "./PaintingCard";

/** Full-size view of a painting with ← → and Esc. Rendered into <body> so it always sits above the header. */
export function PaintingLightbox({ items, index, labels, trigger, onIndex, onClose }: {
  items: PaintingItem[]; index: number; labels: Record<string, string>;
  trigger: RefObject<HTMLElement | null>; onIndex: (i: number) => void; onClose: () => void;
}) {
  const { openPainting } = useOrder();
  const boxRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useFocusTrap(boxRef, true, onClose, trigger, closeRef);

  const p = items[index];
  const many = items.length > 1;
  const step = (d: 1 | -1) => onIndex((index + d + items.length) % items.length);
  const onKey = (e: KeyboardEvent) => {
    if (!many) return;
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  };
  if (!p?.image) return null;

  return createPortal(
    <div className="pt-lb" onKeyDown={onKey}>
      <div className="pt-lb__bg" onClick={onClose} />
      <div className="pt-lb__box" role="dialog" aria-modal="true" aria-label={p.title} ref={boxRef}>
        <button ref={closeRef} type="button" className="pt-lb__btn pt-lb__close" aria-label={labels.close} onClick={onClose}>
          <Icon name="close" size={22} />
        </button>
        <figure className="pt-lb__fig">
          <Image
            key={p.id}
            src={p.image.url}
            alt={p.image.alt || p.title}
            width={p.image.width || 1200}
            height={p.image.height || 900}
            sizes="100vw"
            className="pt-lb__img"
            placeholder={p.image.lqip ? "blur" : "empty"}
            blurDataURL={p.image.lqip}
            priority
          />
          <figcaption>
            <strong>{p.title}</strong>
            {p.meta && <small>{p.meta}</small>}
            {p.forSale && (
              <button type="button" className="btn btn--primary pt-lb__ask"
                onClick={() => { onClose(); openPainting(p.title, trigger.current); }}>
                {labels.ask}
              </button>
            )}
          </figcaption>
        </figure>
        {many && (
          <>
            <button type="button" className="pt-lb__btn pt-lb__prev" aria-label={labels.prev1} onClick={() => step(-1)}>
              <Icon name="chev" />
            </button>
            <button type="button" className="pt-lb__btn pt-lb__next" aria-label={labels.next1} onClick={() => step(1)}>
              <Icon name="chev" />
            </button>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
