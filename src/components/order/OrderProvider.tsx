"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import type { Product } from "@/content/types";
import { OrderModal } from "./OrderModal";

type Ctx = {
  /** order request for an existing product */
  openOrder: (productId: string, trigger?: HTMLElement | null) => void;
  /** «Замовити унікальне» — custom piece made to the visitor's idea */
  openCustom: (trigger?: HTMLElement | null) => void;
};
const OrderContext = createContext<Ctx | null>(null);

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used inside <OrderProvider>");
  return ctx;
}

type Open = { kind: "product"; product: Product } | { kind: "custom" } | null;

export function OrderProvider({
  children, products, locale, d,
}: { children: ReactNode; products: Product[]; locale: Locale; d: Dict }) {
  const [open, setOpen] = useState<Open>(null);
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);

  const openOrder = useCallback(
    (id: string, el?: HTMLElement | null) => {
      const product = products.find((p) => p.slug === id && p.status !== "sold");
      if (!product) return;
      setTrigger(el ?? null);
      setOpen({ kind: "product", product });
    },
    [products],
  );

  const openCustom = useCallback((el?: HTMLElement | null) => {
    setTrigger(el ?? null);
    setOpen({ kind: "custom" });
  }, []);

  return (
    <OrderContext.Provider value={{ openOrder, openCustom }}>
      {children}
      {open && (
        <OrderModal
          key={open.kind === "product" ? open.product.slug : "custom"}
          product={open.kind === "product" ? open.product : undefined}
          locale={locale}
          d={d}
          trigger={trigger}
          onClose={() => setOpen(null)}
        />
      )}
    </OrderContext.Provider>
  );
}
