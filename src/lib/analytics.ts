/** Google Analytics 4. Set NEXT_PUBLIC_GA_ID to change the measurement ID; set it empty to switch analytics off. */
export const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "G-7VC91T98YW";

type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

/** Key conversion only: an order / enquiry request was sent. Outbound clicks (Monobank) are counted by GA automatically. */
export function track(name: "generate_lead", params?: Record<string, unknown>) {
  (window as unknown as { gtag?: Gtag }).gtag?.("event", name, params);
}
