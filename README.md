# made-with-hope · Home Made Galyna

Двомовний (UA/EN) сайт родини Галини: ручна робота, щоденник і вірші, підтримка родини.
Next.js 15 (App Router) + TypeScript, без бази даних.

## Запуск локально

```bash
npm install
cp .env.example .env.local   # можна залишити порожнім для локальної розробки
npm run dev
```

Відкрийте http://localhost:3000 — вас перекине на `/uk`.

Без Telegram-токена форма замовлення працює в dev-режимі: повідомлення,
яке отримала б Галина, друкується в терміналі, де запущено `npm run dev`.

## Telegram-бот для замовлень

1. У Telegram відкрийте **@BotFather** → `/newbot` → скопіюйте токен.
2. Галина пише своєму боту `/start`.
3. Відкрийте `https://api.telegram.org/bot<ТОКЕН>/getUpdates` і скопіюйте `chat.id`.
4. Впишіть у `.env.local`:
   ```
   TELEGRAM_BOT_TOKEN=...
   TELEGRAM_CHAT_ID=...
   ```
5. Перезапустіть `npm run dev`.

Токен використовується лише в `src/app/api/order/route.ts` (сервер) і ніколи не потрапляє в браузер.

## Структура

```
src/
  app/
    [locale]/            /uk/... та /en/...
      page.tsx           головна (landing)
      journal/           список записів + /journal/[slug]
      privacy/           політика конфіденційності (чернетка)
    api/order/route.ts   запит на замовлення → Telegram
    globals.css          усі стилі (токени кольорів на початку)
  components/            Header, Footer, картки, модалка замовлення, секції головної
  content/               ← КОНТЕНТ: вироби, записи щоденника, FAQ, сума збору
  i18n/                  словники uk/en
  middleware.ts          редірект "/" → "/uk" або "/en"
prototype/index.html     статичний прототип-еталон дизайну
```

## Як змінювати контент (поки без CMS)

- Вироби — `src/content/products.ts`
- Записи щоденника — `src/content/posts.ts` (оригінал `uk` завжди зберігається, `en` — окремий переклад)
- Сума збору, посилання Monobank, контакти — `src/content/site.ts`
- Фото: див. розділ «Фотографії» нижче.

## Фотографії (автоматична оптимізація)

1. Покладіть оригінал у `images-src/`, наприклад `images-src/handmade/bunny.jpg` (будь-який розмір, jpg/png/heic).
2. Запустіть `npm run dev` (або `npm run images`) — з'явиться `public/images/handmade/bunny.webp`:
   до 2000 px по довшій стороні, WebP, без EXIF/GPS. Зазвичай 3–5 МБ → 150–300 КБ.
3. У контенті вкажіть `image: "/images/handmade/bunny.webp"` — заглушка зміниться на фото.

Далі `next/image` сам віддає кожному пристрою потрібний розмір в AVIF/WebP і вантажить фото нижче екрана ліниво.
Оригінали з `images-src/` у Git не потрапляють.

Фон футера — `src/assets/footer/meadow-wide.webp` (desktop/tablet) і `meadow-tall.webp` (mobile).

## Далі

- [ ] Реальні фото і тексти
- [ ] Реальні посилання Monobank / Telegram / Instagram
- [ ] CMS для Галини (Decap CMS або Sanity) — щоденник і вироби з телефона
- [ ] OG-зображення `public/og.jpg`
- [ ] Деплой на Vercel + змінні середовища
