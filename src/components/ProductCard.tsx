import Link from "next/link";
import { pick, type Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import type { Product } from "@/content/types";
import { formatMoney, statusLabel } from "@/lib/format";
import { Icon } from "./Icon";
import { Placeholder } from "./Placeholder";
import { OrderButton } from "./order/OrderButton";

export function ProductCard({ p, locale, d }: { p: Product; locale: Locale; d: Dict }) {
  const name = pick(p.name, locale);
  const href = `/${locale}/handmade/${p.slug}`;
  const sold = p.status === "sold";
  return (
    <li className={`p-card${sold ? " is-sold" : ""}`}>
      {/* the photo repeats the name link — hidden from screen readers to avoid a double link */}
      <Link href={href} className="p-card__media" tabIndex={-1} aria-hidden="true">
        <Placeholder tone={p.tone} image={p.images[0]} label={d["ph.photo"]} decorative sizes="(max-width: 900px) 50vw, 240px" />
        {p.images.length > 1 && (
          <span className="p-card__count"><Icon name="camera" size={14} /> {p.images.length}</span>
        )}
        {sold && <span className="badge-sold">{d["hm.sold"]}</span>}
      </Link>
      <div className="p-card__body">
        <Link href={href} className="p-card__name">{name}</Link>
        <span className={`p-card__avail is-${p.status}`}>{statusLabel(d, p.status)}</span>
        <div className="p-card__row">
          <span className="p-card__price">{p.price != null ? formatMoney(p.price, locale, d) : ""}</span>
          {!sold && <OrderButton productId={p.slug} label={`${d["hm.order"]}: ${name}`} />}
        </div>
      </div>
    </li>
  );
}
