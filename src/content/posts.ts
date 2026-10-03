import type { Post, PostCategory } from "./types";

export const categories: PostCategory[] = ["poetry", "thoughts", "life", "craft", "news"];

/** Demo content — used only while Sanity is not connected (see README). */
export const localPosts: Post[] = [
  {
    slug: "osinniy-ranok", category: "poetry", date: "2026-10-03", tone: "sun",
    title: { uk: "Осінній ранок", en: "Autumn Morning" },
    excerpt: { uk: "Сьогодні осінь тихо постукала у вікно…", en: "Today autumn quietly knocked on my window…" },
    body: {
      uk: `Сьогодні осінь тихо постукала у вікно,
Розсипала на підвіконня золото й тепло.
Я заварю для нас із сином чай,
І скажу йому: «Нічого, все минає».

Хай за вікном холодний вітер дме,
У нашому домі світло не мине.
Бо поки поруч рідна посмішка твоя —
Я знаю: в нас є завтра і є я.`,
      en: `Today autumn quietly knocked on my window,
Scattering gold and warmth across the sill.
I'll brew some tea for my son and me,
And tell him: "It's all right, this too will pass."

Let the cold wind blow outside,
The light in our home will not go out.
For while your dear smile is near —
I know we have tomorrow, and I have me.`,
    },
  },
  {
    slug: "mala-peremoha", category: "life", date: "2026-09-28", tone: "sage",
    title: { uk: "Маленька перемога", en: "A Small Victory" },
    excerpt: { uk: "Іноді щастя — у простих моментах…", en: "Sometimes happiness is in simple moments…" },
    body: {
      uk: "Іноді щастя — у простих моментах. Сьогодні після заняття з реабілітологом син сам дотягнувся до чашки і засміявся. Для когось це дрібниця, а для нас — свято.\n\nДякую всім, хто допомагає нам робити такі кроки.",
      en: "Sometimes happiness is in simple moments. Today, after a rehabilitation session, my son reached for his cup on his own and laughed. For some it is a small thing; for us it is a celebration.\n\nThank you to everyone who helps us take these steps.",
    },
  },
  {
    slug: "nova-robota", category: "craft", date: "2026-09-20", tone: "pink",
    title: { uk: "Нова робота", en: "New Creation" },
    excerpt: { uk: "Нова іграшка готова, зроблена з любов'ю…", en: "A new toy is ready, made with love…" },
    body: {
      uk: "Нова іграшка готова, зроблена з любов'ю. Рожевий зайчик з довгими вухами — в'язала його три вечори, поки син відпочивав.",
      en: "A new toy is ready, made with love. A pink bunny with long ears — I knitted it over three evenings while my son rested.",
    },
  },
  {
    slug: "vdyachnist", category: "thoughts", date: "2026-09-15", tone: "peach",
    title: { uk: "Вдячність", en: "Gratitude" },
    excerpt: { uk: "Дякую вам за підтримку і добрі слова…", en: "Thank you for your support and kind words…" },
    body: {
      uk: "Дякую вам за підтримку і добрі слова. Кожне повідомлення я читаю синові вголос. Ви навіть не уявляєте, скільки сил вони нам дають.",
      // en intentionally empty: shows how a post without translation is displayed
    },
  },
];
