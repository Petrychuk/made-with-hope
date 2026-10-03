import type { Product } from "./types";

/** Demo content — used only while Sanity is not connected (see README). */

export const localProducts: Product[] = [
  {
    slug: "bunny", tone: "pink", price: 450, status: "available", featured: true, images: [],
    name: { uk: "В'язаний зайчик", en: "Knitted bunny" },
    description: { uk: "М'яка іграшка ручної роботи.", en: "A soft handmade toy." },
  },
  {
    slug: "bag", tone: "sand", price: 550, status: "available", featured: true, images: [],
    name: { uk: "Сумочка ручної роботи", en: "Handmade bag" },
    description: { uk: "В'язана сумочка з дерев'яними ручками.", en: "Knitted bag with wooden handles." },
  },
  {
    slug: "heart", tone: "sage", price: 300, status: "available", featured: true, images: [],
    name: { uk: "Декоративне серце", en: "Decorative heart" },
    description: { uk: "Підвіска-серце для дому.", en: "A heart hanging for your home." },
  },
  {
    slug: "basket", tone: "peach", price: 480, status: "made_to_order", featured: true, images: [],
    name: { uk: "В'язаний кошик", en: "Knitted basket" },
    description: { uk: "Кошик для дрібниць.", en: "A basket for little things." },
  },
  {
    slug: "hat", tone: "blue", price: 400, status: "sold", featured: false, images: [],
    name: { uk: "В'язана шапочка", en: "Knitted hat" },
    description: { uk: "Тепла дитяча шапочка.", en: "A warm children's hat." },
  },
];
