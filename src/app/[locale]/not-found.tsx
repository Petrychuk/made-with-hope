import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap prose">
        <h1 className="sec-title page-title">Сторінку не знайдено · Page not found</h1>
        <p><Link className="link-more" href="/uk">На головну · Home</Link></p>
      </div>
    </section>
  );
}
