/* Inline SVG sprite: hand-drawn hearts, botanical branch and UI icons.
   Rendered once in the layout; use <Icon name="..."/> everywhere else. */
const symbols = `
<symbol id="i-heart" viewBox="0 0 48 48"><path d="M24 41C18 36 6 28.5 5.2 18.4 4.6 11 10 6.6 15.6 7.2c4 .4 6.7 3.1 8.3 6.4 1.7-3.6 4.6-6.3 8.9-6.6 6-.4 10.8 4.6 9.9 11.6C41.4 28.8 30 36 24 41Z" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  <symbol id="i-heart-fill" viewBox="0 0 24 24"><path d="M12 20.5C9 18 3 14.3 2.6 9.2 2.3 5.5 5 3.3 7.8 3.6c2 .2 3.3 1.5 4.1 3.2.9-1.8 2.3-3.1 4.5-3.3 3-.2 5.4 2.3 5 5.8-.6 5.4-6.3 9-9.4 11.2Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></symbol>
  <symbol id="i-branch" viewBox="0 0 80 110"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M14 106C30 78 44 48 70 6"/><path d="M28 80c-12-2-20-9-22-18 10-1 19 5 22 18Z"/><path d="M35 66c12-1 22-7 26-16-10-2-21 4-26 16Z"/><path d="M42 52c-11-4-17-12-17-21 10 2 17 9 17 21Z"/><path d="M50 38c10-3 17-10 19-19-10 0-17 7-19 19Z"/><path d="M58 24c-7-5-10-12-9-19 8 3 11 10 9 19Z"/></g></symbol>
  <symbol id="i-camera" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M4 7.5h3.2L8.8 5h6.4l1.6 2.5H20a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8.5a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13" r="3.6"/></g></symbol>
  <symbol id="i-yarn" viewBox="0 0 40 40"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="20" cy="20" r="13"/><path d="M9 14c8 1 15 6 19 16M8 21c7 0 13 4 16 11M14 8.5c7 3 12 9 14 17M22 7.3c5 4 8 10 9 15M33 21c-5-1-12 1-18 9"/></g></symbol>
  <symbol id="i-book" viewBox="0 0 40 40"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"><path d="M20 11c-3-2.5-8-3.5-14-3v22c6-.5 11 .5 14 3 3-2.5 8-3.5 14-3V8c-6-.5-11 .5-14 3Z"/><path d="M20 11v22M10 14h6M10 19h6M10 24h6M24 14h6M24 19h6M24 24h6"/></g></symbol>
  <symbol id="i-family" viewBox="0 0 40 40"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13" cy="11" r="4"/><circle cx="27" cy="11" r="4"/><circle cx="20" cy="20" r="3.4"/><path d="M5 29c0-5 3.6-9 8-9 1.4 0 2.6.3 3.6 1M35 29c0-5-3.6-9-8-9-1.4 0-2.6.3-3.6 1M12 33c0-4 3.6-7 8-7s8 3 8 7Z"/></g></symbol>
  <symbol id="i-cart" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h2.2l2.2 10.2a1.5 1.5 0 0 0 1.5 1.2h8.3a1.5 1.5 0 0 0 1.4-1.1L20.5 8H6.3"/><circle cx="9.5" cy="19.5" r="1.3"/><circle cx="17" cy="19.5" r="1.3"/></g></symbol>
  <symbol id="i-med" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="6.5" width="17" height="13" rx="2"/><path d="M9 6.5V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.5M12 10v6M9 13h6"/></g></symbol>
  <symbol id="i-rehab" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2.2"/><path d="M6 10.5l6 1 6-1M12 11.5V16M12 16l-3.5 5M12 16l3.5 5"/></g></symbol>
  <symbol id="i-home" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11 12 4l8 7v8.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"/><path d="M12 17.5c-1.6-1.2-3-2.3-3-3.6 0-1 .8-1.7 1.6-1.7.6 0 1.1.4 1.4.9.3-.5.8-.9 1.4-.9.8 0 1.6.7 1.6 1.7 0 1.3-1.4 2.4-3 3.6Z"/></g></symbol>
  <symbol id="i-sun" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 18h16M7 18a5 5 0 0 1 10 0M12 7V4.5M6.3 9.8 4.6 8.1M17.7 9.8l1.7-1.7M3 14h1.5M19.5 14H21"/></g></symbol>
  <symbol id="i-check" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8 12.3 2.7 2.7L16.3 9.4"/></g></symbol>
  <symbol id="i-doc" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"><path d="M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M14 3v4h4M9 12h6M9 16h6"/></g></symbol>
  <symbol id="i-receipt" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"><path d="M6 3h12v18l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4L6 21Z"/><path d="M9 8h6M9 12h6M9 16h3"/></g></symbol>
  <symbol id="i-news" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"><path d="M4 5h13v14H6a2 2 0 0 1-2-2Z"/><path d="M17 9h3v8a2 2 0 0 1-2 2h-1M7.5 9h6M7.5 12.5h6M7.5 16h4"/></g></symbol>
  <symbol id="i-tg" viewBox="0 0 24 24"><path fill="currentColor" d="M20.7 4.2 3.3 10.9c-1.2.5-1.2 1.2-.2 1.5l4.5 1.4 1.7 5.3c.2.6.1.8.7.8.5 0 .7-.2 1-.5l2.2-2.1 4.6 3.4c.8.5 1.4.2 1.6-.8l3-14c.3-1.2-.5-1.8-1.3-1.4ZM8.6 13.5l9.6-6.1c.5-.3.9-.1.5.2l-8.2 7.4-.3 3.4Z"/></symbol>
  <symbol id="i-ig" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none"/></g></symbol>
  <symbol id="i-fb" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M13.2 21v-7.5h2.4l.4-2.8h-2.8V9c0-.8.3-1.4 1.4-1.4h1.5V5.1c-.3 0-1.2-.1-2.2-.1-2.2 0-3.6 1.3-3.6 3.7v2H8v2.8h2.3V21"/></g></symbol>
  <symbol id="i-mail" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/></g></symbol>
  <symbol id="i-leafbtn" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14Z"/><path d="M5 19 13 11"/></g></symbol>
  <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h13M13 6.5 18.5 12 13 17.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  <symbol id="i-ext" viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  <symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol>
  <symbol id="i-burger" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol>
`;

export function IconSprite() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute" }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: symbols }}
    />
  );
}
