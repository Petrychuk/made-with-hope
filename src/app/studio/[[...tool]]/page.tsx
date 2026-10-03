import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <main style={{ fontFamily: "system-ui, sans-serif", maxWidth: 560, margin: "64px auto", padding: 24, lineHeight: 1.6 }}>
        <h1>Sanity ще не підключено</h1>
        <p>
          Додайте <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> у файл <code>.env.local</code> і перезапустіть
          <code> npm run dev</code>. Покрокова інструкція — у README, розділ «CMS».
        </p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
