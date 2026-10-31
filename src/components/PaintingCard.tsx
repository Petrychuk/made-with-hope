import type { ImageRef, Tone } from "@/content/types";
import { Heart } from "./Heart";
import { Placeholder } from "./Placeholder";

/** A painting ready to render: text already in the visitor's language. */
export type PaintingItem = {
  id: string; title: string; meta: string; category: string; tone: Tone; image?: ImageRef; placeholder?: boolean;
};

export function PaintingCard({ item, label, big, sizes, openLabel, onOpen }: {
  item: PaintingItem; label: string; big?: boolean; sizes: string;
  /** with onOpen the picture becomes a button that enlarges it (not for placeholders) */
  openLabel?: string; onOpen?: (trigger: HTMLElement) => void;
}) {
  return (
    <figure className={`pt-card${big ? " pt-card--big" : ""}`}>
      <div className="pt-card__img">
        <Placeholder tone={item.tone} image={item.image} label={label} alt={item.image?.alt || item.title}
          decorative={item.placeholder} sizes={sizes} />
        {onOpen && !item.placeholder && (
          <button type="button" className="pt-card__open" aria-label={`${openLabel}: ${item.title}`} onClick={(e) => onOpen(e.currentTarget)} />
        )}
        {big && <span className="pt-heart pt-heart--float" aria-hidden="true"><Heart variant="small" size={22} className="" /></span>}
      </div>
      <figcaption className="pt-card__cap">
        <span className="pt-card__txt">
          <strong>{item.title}</strong>
          {item.meta && <small>{item.meta}</small>}
        </span>
        {!big && <span className="pt-heart" aria-hidden="true"><Heart variant="small" size={22} className="" /></span>}
      </figcaption>
    </figure>
  );
}
