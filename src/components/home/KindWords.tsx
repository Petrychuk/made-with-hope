"use client";

import { useState } from "react";
import { pick, type Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import type { KindMessage } from "@/content/types";

export function KindWordsCarousel({ messages, locale, d }: { messages: KindMessage[]; locale: Locale; d: Dict }) {
  const [i, setI] = useState(0);
  const m = messages[i];
  return (
    <>
      <div className="msgs" aria-live="polite">
        <blockquote className="msg is-active" style={{ margin: 0 }}>
          <span className="quote-mark" aria-hidden="true">“</span>
          {pick(m.text, locale)}
          <footer>{m.by}</footer>
        </blockquote>
      </div>
      <div className="dots" role="group" aria-label={d["kw.nav"]}>
        {messages.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`${d["kw.msg"]} ${idx + 1}`}
            aria-current={idx === i ? "true" : undefined}
            onClick={() => setI(idx)}
          />
        ))}
      </div>
    </>
  );
}
