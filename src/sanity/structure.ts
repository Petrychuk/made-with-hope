import type { StructureResolver } from "sanity/structure";

/** What Galyna sees on the left in Studio. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Home Made Galyna")
    .items([
      S.documentTypeListItem("post").title("📝 Щоденник"),
      S.documentTypeListItem("product").title("🧶 Вироби"),
      S.documentTypeListItem("update").title("❤️ Оновлення"),
      S.listItem()
        .title("💰 Підтримка")
        .id("support")
        .child(S.document().schemaType("support").documentId("support").title("Підтримка")),
      S.documentTypeListItem("transparencyDoc").title("📄 Прозорість"),
    ]);
