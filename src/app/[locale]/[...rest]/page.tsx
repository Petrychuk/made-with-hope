import { notFound } from "next/navigation";

/** Any unknown address inside /uk/… or /en/… → the styled 404 (app/[locale]/not-found.tsx). */
export default function CatchAll() {
  notFound();
}
