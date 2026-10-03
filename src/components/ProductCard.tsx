import { pick, type Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import type { Product } from "@/content/types";
import { formatMoney } from "@/lib/format";
import { Placeholder } from "./Placeholder";
import { OrderButton } from "./order/OrderButton";

export function ProductCard({ p, locale, d }: { p: Product; locale: Locale; d: Dict }) {
  const name = pick(p.name, locale);
  return (
    <li className="p-card">
      <Placeholder
        tone={p.tone}
        image={p.image}
        label={d["ph.photo"]}
        alt={name}
        decorative={!p.image}
        sizes="(max-width: 900px) 50vw, 220px"
      />
      <div className="p-card__body">
        <span className="p-card__name">{name}</span>
        <span className={`p-card__avail${p.available ? "" : " is-made"}`}>
          {p.available ? d["hm.avail"] : d["hm.made"]}
        </span>
        <div className="p-card__row">
          <span className="p-card__price">{p.price != null ? formatMoney(p.price, locale, d) : ""}</span>
          <OrderButton productId={p.id} label={`${d["hm.order"]}: ${name}`} />
        </div>
      </div>
    </li>
  );
}
