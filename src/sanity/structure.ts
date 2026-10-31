import type { StructureResolver } from "sanity/structure";

/**
 * What Galyna sees on the left in Studio.
 * Emoji icons come from the schema types (icon: …), so titles stay plain text —
 * otherwise every item shows the emoji twice.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Home Made Galyna")
    .items([
      S.listItem()
        .title("Головна сторінка")
        .id("homePage")
        .icon(() => "🏠")
        .child(S.document().schemaType("homePage").documentId("homePage").title("Головна сторінка")),
      S.divider(),
      S.documentTypeListItem("post").title("Щоденник"),
      S.documentTypeListItem("product").title("Вироби"),
      S.documentTypeListItem("painting").title("Малюнки"),
      S.documentTypeListItem("update").title("Оновлення"),
      S.listItem()
        .title("Підтримка")
        .id("support")
        .icon(() => "💰")
        .child(S.document().schemaType("support").documentId("support").title("Підтримка")),
      S.documentTypeListItem("transparencyDoc").title("Прозорість"),
    ]);
