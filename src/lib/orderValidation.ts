/** Order form rules — shared by the browser form and /api/order so they never drift apart. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NAME_RE = /^\p{L}[\p{L}\p{M}'’ʼ.\- ]{1,79}$/u; // letters, spaces, ' - . (2–80 chars)
const PHONE_RE = /^\+?[\d\s().-]{9,22}$/;

export const isValidName = (s: string) => NAME_RE.test(s.trim());
export const isValidPhone = (s: string) => {
  const t = s.trim();
  const digits = t.replace(/\D/g, "").length;
  return PHONE_RE.test(t) && digits >= 9 && digits <= 15;
};
export const isValidEmail = (s: string) => !s.trim() || (s.trim().length <= 120 && EMAIL_RE.test(s.trim())); // optional
export const isValidIdea = (s: string) => s.trim().length >= 5 && s.trim().length <= 1200;
