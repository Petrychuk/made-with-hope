import type { Product } from "./types";

export const products: Product[] = [
  {
    id: "bunny", tone: "pink", price: 450, available: true, featured: true, published: true,
    name: { uk: "В'язаний зайчик", en: "Knitted bunny" },
    description: { uk: "М'яка іграшка ручної роботи.", en: "A soft handmade toy." },
  },
  {
    id: "bag", tone: "sand", price: 550, available: true, featured: true, published: true,
    name: { uk: "Сумочка ручної роботи", en: "Handmade bag" },
    description: { uk: "В'язана сумочка з дерев'яними ручками.", en: "Knitted bag with wooden handles." },
  },
  {
    id: "heart", tone: "sage", price: 300, available: true, featured: true, published: true,
    name: { uk: "Декоративне серце", en: "Decorative heart" },
    description: { uk: "Підвіска-серце для дому.", en: "A heart hanging for your home." },
  },
  {
    id: "basket", tone: "peach", price: 480, available: false, featured: true, published: true,
    name: { uk: "В'язаний кошик", en: "Knitted basket" },
    description: { uk: "Кошик для дрібниць.", en: "A basket for little things." },
  },
];

export const publishedProducts = () => products.filter((p) => p.published);
export const findProduct = (id: string) => products.find((p) => p.id === id && p.published);
