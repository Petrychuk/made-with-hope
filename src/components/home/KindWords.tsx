"use client";

import { useState } from "react";
import type { Dict } from "@/i18n/dictionaries";

export function KindWordsCarousel({ messages, d }: { messages: { text: string; by: string }[]; d: Dict }) {
  const [i, setI] = useState(0);
  const m = messages[i];
  if (!m) return null;
  return (
    <>
      <div className="msgs" aria-live="polite">
        <blockquote className="msg is-active" style={{ margin: 0 }}>
          <span className="quote-mark" aria-hidden="true">“</span>
          {m.text}
          {m.by && <footer>{m.by}</footer>}
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
