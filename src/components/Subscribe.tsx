"use client";

import { useState, type FormEvent } from "react";
import type { Dict } from "@/i18n/dictionaries";

/** UI only for MVP — no newsletter backend yet (see README). */
export function Subscribe({ d }: { d: Dict }) {
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("email") as HTMLInputElement;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
      setMsg({ ok: false, text: d["tc.err"] });
      input.focus();
      return;
    }
    setMsg({ ok: true, text: d["tc.ok"] });
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="sub-form">
        <label htmlFor="sub-email" className="sr-only">{d["tc.label"]}</label>
        <input id="sub-email" name="email" type="email" autoComplete="email" placeholder={d["tc.ph"]} aria-describedby="sub-msg" />
        <button className="btn btn--sage" type="submit">{d["tc.btn"]}</button>
      </div>
      <p className={`sub-msg${msg ? (msg.ok ? " ok" : " err") : ""}`} id="sub-msg" role="status">{msg?.text}</p>
    </form>
  );
}
