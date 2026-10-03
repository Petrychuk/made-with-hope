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

## Як змінювати контент без CMS (демо-режим)

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

## Декор: сердечка і гілочки

- **Сердечка** — `<Heart variant="main | tilt | small | soft | double" size={…} />` (`src/components/Heart.tsx`).
  Векторні, обведені з акварельного набору; колір задається CSS `color` (терракота за замовчуванням, `heart--sage` — зелене).
- **Гілочки** — `<Botanical name="eucalyptus" width={80} />` (`src/components/Botanical.tsx`), прозорі WebP у `src/assets/decor/`:
  `leaves-buds`, `gypsophila`, `peach-blossom`, `eucalyptus`, `pale-leaves`, `pink-buds`, `daisies`.
  `next/image` віддає їх у потрібному розмірі (зазвичай 5–20 КБ).

## CMS: Sanity Studio

Галина веде сайт сама — з телефона або комп'ютера — за адресою **/studio** (наприклад `https://site.ua/studio`).
Поки Sanity не підключено, сайт показує демо-контент із `src/content/`.

### Підключення (один раз)

1. Зареєструйтеся на https://www.sanity.io → **Create project** → назва «Home Made Galyna», dataset `production`.
2. Скопіюйте **Project ID** і впишіть у `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xy
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_REVALIDATE_SECRET=будь-який-довгий-випадковий-рядок
   ```
3. sanity.io/manage → проєкт → **API → CORS origins** → додайте `http://localhost:3000` (і пізніше домен сайту), галочка **Allow credentials**.
4. `npm install` → `npm run dev` → відкрийте http://localhost:3000/studio і увійдіть.
5. Заповніть «💰 Підтримка» і додайте перші вироби та записи.
6. **Members → Invite** → email Галини, роль **Editor**. На телефоні: відкрити `/studio` → «Додати на головний екран».
7. Після деплою: **API → Webhooks → Create**: URL `https://site.ua/api/revalidate`, Trigger on: Create, Update, Delete,
   Secret — той самий `SANITY_REVALIDATE_SECRET`. Тоді зміни з'являються на сайті одразу після «Опублікувати»
   (без вебхука — протягом 5 хвилин).

### Що бачить Галина

| Розділ | Що там |
|---|---|
| 📝 Щоденник | назва, категорія, фото, текст UA (+ переклад EN), дата. Переноси рядків у віршах зберігаються. |
| 🧶 Вироби | до 5 фото (перше — обкладинка), назва, опис, ціна, статус **В наявності / На замовлення / Продано**, «Показувати на головній». |
| ❤️ Оновлення | «Приклади ваших добрих справ»: що вдалося, фото, дата. |
| 💰 Підтримка | зібрано, мета, дата оновлення, посилання Monobank. |
| 📄 Прозорість | звіти та медичні документи (PDF або фото). Особисті дані приховувати перед завантаженням! |

- Статус **Продано** → на сайті бейдж «Продано», кнопки «Замовити» немає, замовлення через форму не приймаються.
- Фото з телефона можна завантажувати як є: Sanity зберігає оригінал, а сайт отримує стиснуту WebP-версію потрібного розміру.
- Адреса сторінки: кнопка «Згенерувати» робить її з назви латиницею («Осінній ранок» → `osinnii-ranok`).

### Сторінки

- `/uk/handmade` — усі вироби; `/uk/handmade/<адреса>` — сторінка виробу зі слайдером до 5 фото
  (свайп на телефоні, стрілки й мініатюри на комп'ютері, клавіші ← →).
- `/uk/transparency` — звіти та документи.

## Далі

- [ ] Реальні фото і тексти
- [ ] Реальні посилання Monobank / Telegram / Instagram
- [ ] OG-зображення `public/og.jpg`
- [ ] Деплой на Vercel + змінні середовища
