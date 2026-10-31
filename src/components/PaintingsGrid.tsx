"use client";

import { useRef, useState } from "react";
import { PaintingCard, type PaintingItem } from "./PaintingCard";
import { PaintingLightbox } from "./PaintingLightbox";

export function PaintingsGrid({ items, labels }: { items: PaintingItem[]; labels: Record<string, string> }) {
  const trigger = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <ul className="pt-grid">
        {items.map((p, i) => (
          <li key={p.id}>
            <PaintingCard item={p} label={labels.ph} sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 280px"
              openLabel={labels.open} onOpen={(el) => { trigger.current = el; setOpen(i); }} />
          </li>
        ))}
      </ul>
      {open !== null && (
        <PaintingLightbox items={items} index={open} labels={labels} trigger={trigger} onIndex={setOpen} onClose={() => setOpen(null)} />
      )}
    </>
  );
}
