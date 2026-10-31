"use client";

import { useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import type { Locale } from "@/i18n/config";
import type { LegalDoc } from "@/content/legal";
import { formatDate } from "@/lib/format";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { Icon } from "./Icon";

/** Footer legal links → each document opens in a modal (also available as a page at /[locale]/privacy). */
export function LegalLinks({ docs, locale, closeLabel, updatedLabel }: {
  docs: LegalDoc[]; locale: Locale; closeLabel: string; updatedLabel: string;
}) {
  const [open, setOpen] = useState<LegalDoc | null>(null);
  const trigger = useRef<HTMLElement | null>(null);

  return (
    <>
      <ul className="footer__legal">
        {docs.map((doc) => (
          <li key={doc.id}>
            <a
              href={`/${locale}/privacy#${doc.id}`}
              onClick={(e) => { e.preventDefault(); trigger.current = e.currentTarget; setOpen(doc); }}
            >
              {doc.title}
            </a>
          </li>
        ))}
      </ul>
      {open && (
        <LegalModal doc={open} locale={locale} closeLabel={closeLabel} updatedLabel={updatedLabel}
          trigger={trigger} onClose={() => setOpen(null)} />
      )}
    </>
  );
}

function LegalModal({ doc, locale, closeLabel, updatedLabel, trigger, onClose }: {
  doc: LegalDoc; locale: Locale; closeLabel: string; updatedLabel: string;
  trigger: RefObject<HTMLElement | null>; onClose: () => void;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useFocusTrap(boxRef, true, onClose, trigger, closeRef);
  // portal to <body>: the footer is its own stacking context, so inside it the modal would sit under the sticky header
  return createPortal(
    <div className="modal is-open legal-modal">
      <div className="modal__bg" onClick={onClose} />
      <div className="modal__box" role="dialog" aria-modal="true" aria-labelledby="legal-title" ref={boxRef}>
        <div className="modal__head">
          <h2 id="legal-title">{doc.title}</h2>
          <button ref={closeRef} className="modal__close" type="button" aria-label={closeLabel} onClick={onClose}>
            <Icon name="close" size={22} />
          </button>
        </div>
        <div className="modal__body legal">
          <LegalBody doc={doc} locale={locale} updatedLabel={updatedLabel} />
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function LegalBody({ doc, locale, updatedLabel }: { doc: LegalDoc; locale: Locale; updatedLabel: string }) {
  return (
    <>
      <p className="legal__updated">{updatedLabel} {formatDate(doc.updated, locale)}</p>
      {doc.sections.map((s) => (
        <section key={s.h}>
          <h3>{s.h}</h3>
          {s.p.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
        </section>
      ))}
    </>
  );
}
