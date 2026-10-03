// Separate root layout: Studio has its own UI, no site header/footer/styles.
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
