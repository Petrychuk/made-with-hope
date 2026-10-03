"use client";

import { useRef, useState, type FormEvent } from "react";
import { pick, type Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import type { Product } from "@/content/types";
import { formatMoney } from "@/lib/format";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { Icon } from "../Icon";
import { Placeholder } from "../Placeholder";

type Field = "name" | "phone" | "email" | "consent";
type Errors = Partial<Record<Field, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function OrderModal({
  product, locale, d, trigger, onClose,
}: { product: Product; locale: Locale; d: Dict; trigger: HTMLElement | null; onClose: () => void }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLElement | null>(trigger);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ kind: "idle" | "sending" | "error"; text?: string }>({ kind: "idle" });
  const [done, setDone] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  useFocusTrap(boxRef, true, onClose, triggerRef, nameRef);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = Object.fromEntries(fd) as Record<string, string>;
    const next: Errors = {};
    if (!v.name?.trim()) next.name = d["e.name"];
    if ((v.phone ?? "").replace(/\D/g, "").length < 9) next.phone = d["e.phone"];
    if (v.email && !EMAIL_RE.test(v.email)) next.email = d["e.email"];
    if (!fd.get("consent")) next.consent = d["e.consent"];
    setErrors(next);

    const firstBad = (Object.keys(next) as Field[])[0];
    if (firstBad) {
      setStatus({ kind: "error", text: d["e.fix"] });
      document.getElementById(`o-${firstBad}`)?.focus();
      return;
    }

    setStatus({ kind: "sending", text: d["o.sending"] });
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v, productId: product.id, locale, consent: true }),
      });
      if (res.status === 429) { setStatus({ kind: "error", text: d["e.rate"] }); return; }
      if (!res.ok) throw new Error(String(res.status));
      setDone(true);
      setTimeout(() => successRef.current?.focus(), 0);
    } catch {
      setStatus({ kind: "error", text: d["e.send"] });
    }
  }

  const err = (f: Field) =>
    errors[f] ? { "aria-invalid": true as const } : { "aria-invalid": false as const };

  const name = pick(product.name, locale);

  return (
    <div className="modal is-open">
      <div className="modal__bg" onClick={onClose} />
      <div className="modal__box" role="dialog" aria-modal="true" aria-labelledby="order-title" ref={boxRef}>
        <button className="modal__close" type="button" aria-label={d.close} onClick={onClose}>
          <Icon name="close" size={22} />
        </button>

        {!done ? (
          <div>
            <h2 id="order-title">{d["o.title"]}</h2>
            <div className="modal__item">
              <Placeholder tone={product.tone} image={product.image} decorative sizes="64px" />
              <div>
                <strong>{name}</strong>
                <span>
                  {product.price != null && <>{formatMoney(product.price, locale, d)} · </>}
                  {product.available ? d["hm.avail"] : d["hm.made"]}
                </span>
              </div>
            </div>
            <p className="modal__hint">{d["o.hint"]}</p>

            <form className="form" onSubmit={onSubmit} noValidate>
              <div className="field">
                <label htmlFor="o-name">{d["o.name"]} <span className="req" aria-hidden="true">*</span></label>
                <input ref={nameRef} id="o-name" name="name" autoComplete="name" required aria-describedby="e-name" {...err("name")} />
                <span className="err" id="e-name">{errors.name}</span>
              </div>
              <div className="field">
                <label htmlFor="o-phone">{d["o.phone"]} <span className="req" aria-hidden="true">*</span></label>
                <input id="o-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+380" required aria-describedby="e-phone" {...err("phone")} />
                <span className="err" id="e-phone">{errors.phone}</span>
              </div>
              <div className="field">
                <label htmlFor="o-email">Email</label>
                <input id="o-email" name="email" type="email" autoComplete="email" aria-describedby="e-email" {...err("email")} />
                <span className="err" id="e-email">{errors.email}</span>
              </div>
              <div className="field">
                <label htmlFor="o-city">{d["o.city"]}</label>
                <input id="o-city" name="city" autoComplete="address-level2" />
              </div>
              <div className="field">
                <label htmlFor="o-delivery">{d["o.delivery"]}</label>
                <select id="o-delivery" name="delivery" defaultValue="nova">
                  <option value="nova">{d["o.d1"]}</option>
                  <option value="ukr">{d["o.d2"]}</option>
                  <option value="other">{d["o.d3"]}</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="o-branch">{d["o.branch"]}</label>
                <input id="o-branch" name="branch" />
              </div>
              <div className="field field--full">
                <label htmlFor="o-comment">{d["o.comment"]}</label>
                <textarea id="o-comment" name="comment" maxLength={800} placeholder={d["o.commentPh"]} />
              </div>
              {/* honeypot: real people never see or fill this */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />
              <label className="consent">
                <input type="checkbox" id="o-consent" name="consent" aria-describedby="e-consent" {...err("consent")} />
                <span>
                  {d["o.consent"]} <span className="req" aria-hidden="true">*</span>
                  <span className="err" id="e-consent" style={{ display: "block" }}>{errors.consent}</span>
                </span>
              </label>
              <div className="form__actions">
                <button className="btn btn--primary" type="submit" disabled={status.kind === "sending"}>
                  {d["o.submit"]}
                </button>
                <p className={`form__status${status.kind === "error" ? " err" : ""}`} role="status">
                  {status.text}
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="success" ref={successRef} tabIndex={-1}>
            <Icon name="heart" />
            <h2 id="order-title">{d["o.okTitle"]}</h2>
            <p>{d["o.ok"]}</p>
            <button className="btn btn--sage" type="button" onClick={onClose}>{d["o.done"]}</button>
          </div>
        )}
      </div>
    </div>
  );
}
