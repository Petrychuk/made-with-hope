import Link from "next/link";
import { pick, type Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import type { Post } from "@/content/types";
import { categoryLabel, formatDate } from "@/lib/format";
import { Placeholder } from "./Placeholder";

export function JournalCard({ post, locale, d }: { post: Post; locale: Locale; d: Dict }) {
  return (
    <li>
      <Link className="j-card" href={`/${locale}/journal/${post.slug}`}>
        <Placeholder tone={post.tone} image={post.image} label={d["ph.photo"]} decorative sizes="(max-width: 767px) 42vw, 280px" />
        <div className="j-card__body">
          <span className={`tag tag--${post.category}`}>{categoryLabel(d, post.category)}</span>
          <h3>{pick(post.title, locale)}</h3>
          <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
          <p>{pick(post.excerpt, locale)}</p>
          <span className="read">{d["j.more"]} →</span>
        </div>
      </Link>
    </li>
  );
}
