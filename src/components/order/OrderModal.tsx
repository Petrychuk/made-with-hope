"use client";

import { useRef, useState, type FormEvent } from "react";
import { pick, type Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import type { Product } from "@/content/types";
import { formatMoney, statusLabel } from "@/lib/format";
import { track } from "@/lib/analytics";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { isValidEmail, isValidIdea, isValidName, isValidPhone } from "@/lib/orderValidation";
import { Icon } from "../Icon";
import { Placeholder } from "../Placeholder";
import { Heart } from "@/components/Heart";

type Field = "name" | "phone" | "email" | "idea" | "consent";
type Errors = Partial<Record<Field, string>>;

/**
 * Order request form.
 * product set   → request for that product
 * product unset → custom order («Замовити унікальне»): what & idea instead of the product card
 */
export function OrderModal({
  product, painting, locale, d, trigger, onClose,
}: { product?: Product; painting?: string; locale: Locale; d: Dict; trigger: HTMLElement | null; onClose: () => void }) {
  const custom = !product;
  const boxRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const ideaRef = useRef<HTMLTextAreaElement>(null);
  const triggerRef = useRef<HTMLElement | null>(trigger);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ kind: "idle" | "sending" | "error"; text?: string }>({ kind: "idle" });
  const [done, setDone] = useState(false);
  const [delivery, setDelivery] = useState("nova");
  const successRef = useRef<HTMLDivElement>(null);

  useFocusTrap(boxRef, true, onClose, triggerRef, custom ? ideaRef : nameRef);

  /** error text for one field ("" = valid) — same rules as the server (src/lib/orderValidation.ts) */
  function check(f: Field, value: string | boolean): string {
    const s = typeof value === "string" ? value : "";
    if (f === "idea") return custom && !isValidIdea(s) ? d["e.idea"] : "";
    if (f === "name") return isValidName(s) ? "" : d["e.name"];
    if (f === "phone") return isValidPhone(s) ? "" : d["e.phone"];
    if (f === "email") return isValidEmail(s) ? "" : d["e.email"];
    return value ? "" : d["e.consent"];
  }
  const FIELDS: Field[] = ["idea", "name", "phone", "email", "consent"];
  // validate a field when the user leaves it; once it shows an error, re-check while typing
  function liveCheck(e: { target: EventTarget }, onlyIfError: boolean) {
    const t = e.target as HTMLInputElement;
    const f = t.name as Field;
    if (!FIELDS.includes(f) || (onlyIfError && !errors[f])) return;
    setErrors((prev) => ({ ...prev, [f]: check(f, f === "consent" ? t.checked : t.value) }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = Object.fromEntries(fd) as Record<string, string>;
    const next: Errors = {};
    for (const f of FIELDS) { const m = check(f, f === "consent" ? Boolean(fd.get("consent")) : v[f] ?? ""); if (m) next[f] = m; }
    setErrors(next);

    const firstBad = FIELDS.find((f) => next[f]);
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
        body: JSON.stringify({ ...v, productId: product ? product.slug : "custom", locale, consent: true }),
      });
      if (res.status === 429) { setStatus({ kind: "error", text: d["e.rate"] }); return; }
      if (!res.ok) throw new Error(String(res.status));
      track("generate_lead", { kind: painting ? "painting" : custom ? "custom" : "product" });
      setDone(true);
      setTimeout(() => successRef.current?.focus(), 0);
    } catch {
      setStatus({ kind: "error", text: d["e.send"] });
    }
  }

  const err = (f: Field) => ({ "aria-invalid": Boolean(errors[f]) });

  return (
    <div className="modal is-open">
      <div className="modal__bg" onClick={onClose} />
      <div className="modal__box" role="dialog" aria-modal="true" aria-labelledby="order-title" ref={boxRef}>
        {/* sticky header: title + ✕ stay visible while the form scrolls (mobile) */}
        <div className="modal__head">
          {!done ? <h2 id="order-title">{painting ? d["pt.inq.title"] : custom ? d["co.title"] : d["o.title"]}</h2> : <span />}
          <button className="modal__close" type="button" aria-label={d.close} onClick={onClose}>
            <Icon name="close" size={22} />
          </button>
        </div>

        {!done ? (
          <div className="modal__body">
            {product ? (
              <div className="modal__item">
                <Placeholder tone={product.tone} image={product.images[0]} decorative sizes="64px" />
                <div>
                  <strong>{pick(product.name, locale)}</strong>
                  <span>
                    {product.price != null && <>{formatMoney(product.price, locale, d)} · </>}
                    {statusLabel(d, product.status)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="modal__item modal__item--custom">
                <span className="pillar__ico"><Icon name={painting ? "palette" : "yarn"} /></span>
                <div>
                  <strong>{painting ?? d["co.cardKicker"]}</strong>
                  <span>{painting ? d["pt.inq.kicker"] : d["co.cardHand"]}</span>
                </div>
              </div>
            )}
            <p className="modal__hint">{painting ? d["pt.inq.hint"] : custom ? d["co.hint"] : d["o.hint"]}</p>

            <form className="form" onSubmit={onSubmit} onBlur={(e) => liveCheck(e, false)} onInput={(e) => liveCheck(e, true)} noValidate>
              {custom && (
                <>
                  <div className="field field--full">
                    <label htmlFor="o-idea">{painting ? d["pt.inq.idea"] : d["co.idea"]} <span className="req" aria-hidden="true">*</span></label>
                    <textarea ref={ideaRef} id="o-idea" name="idea" rows={3} maxLength={1200}
                      defaultValue={painting ? `${d["pt.inq.prefill"]} «${painting.replace(/^[«"„“]+|[»"”“]+$/g, "")}». ` : undefined}
                      placeholder={painting ? d["pt.inq.ph"] : d["co.ideaPh"]} required aria-describedby="e-idea" {...err("idea")} />
                    <span className="err" id="e-idea">{errors.idea}</span>
                  </div>
                </>
              )}
              <div className="field">
                <label htmlFor="o-name">{d["o.name"]} <span className="req" aria-hidden="true">*</span></label>
                <input ref={nameRef} id="o-name" name="name" autoComplete="name" maxLength={80} required aria-describedby="e-name" {...err("name")} />
                <span className="err" id="e-name">{errors.name}</span>
              </div>
              <div className="field">
                <label htmlFor="o-phone">{d["o.phone"]} <span className="req" aria-hidden="true">*</span></label>
                <input id="o-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={22} placeholder="+380" required aria-describedby="e-phone" {...err("phone")} />
                <span className="err" id="e-phone">{errors.phone}</span>
              </div>
              <div className="field">
                <label htmlFor="o-email">Email</label>
                <input id="o-email" name="email" type="email" autoComplete="email" maxLength={120} aria-describedby="e-email" {...err("email")} />
                <span className="err" id="e-email">{errors.email}</span>
              </div>
              <div className="field">
                <label htmlFor="o-city">{d["o.city"]}</label>
                <input id="o-city" name="city" autoComplete="address-level2" maxLength={80} />
              </div>
              <div className="field">
                <label htmlFor="o-delivery">{d["o.delivery"]}</label>
                <select id="o-delivery" name="delivery" value={delivery} onChange={(e) => setDelivery(e.target.value)}>
                  <option value="nova">{d["o.d1"]}</option>
                  <option value="ukr">{d["o.d2"]}</option>
                  <option value="other">{d["o.d3"]}</option>
                </select>
              </div>
              {delivery !== "other" && (
                <div className="field">
                  <label htmlFor="o-branch">{d["o.branch"]}</label>
                  <input id="o-branch" name="branch" maxLength={160} />
                </div>
              )}
              {!custom && (
                <div className="field field--full">
                  <label htmlFor="o-comment">{d["o.comment"]}</label>
                  <textarea id="o-comment" name="comment" maxLength={800} placeholder={d["o.commentPh"]} />
                </div>
              )}
              {/* honeypot: real people never see or fill this */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />
              <label className="consent">
                <input type="checkbox" id="o-consent" name="consent" aria-describedby="e-consent" {...err("consent")} />
                <span>
                  {d["o.consent"]} <span className="req" aria-hidden="true">*</span>{" "}
                  <a href={`/${locale}/privacy#privacy`} target="_blank" rel="noopener noreferrer" className="consent__link">
                    {d["ft.privacy"]}
                  </a>
                  <span className="err" id="e-consent" style={{ display: "block" }}>{errors.consent}</span>
                </span>
              </label>
              <div className="form__actions">
                <button className="btn btn--primary" type="submit" disabled={status.kind === "sending"}>
                  {painting ? d["pt.inq.submit"] : custom ? d["co.submit"] : d["o.submit"]}
                </button>
                <p className={`form__status${status.kind === "error" ? " err" : ""}`} role="status">
                  {status.text}
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="success modal__body" ref={successRef} tabIndex={-1}>
            <Heart variant="double" size={64} />
            <h2 id="order-title">{d["o.okTitle"]}</h2>
            <p>{custom && !painting ? d["co.ok"] : d["o.ok"]}</p>
            <button className="btn btn--sage" type="button" onClick={onClose}>{d["o.done"]}</button>
          </div>
        )}
      </div>
    </div>
  );
}
