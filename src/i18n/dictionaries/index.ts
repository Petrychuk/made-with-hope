import type { Locale } from "../config";
import uk, { type DictKey } from "./uk";
import en from "./en";

export type Dict = Record<DictKey, string>;
export type { DictKey };

const dictionaries: Record<Locale, Dict> = { uk, en };

export function getDictionary(locale: Locale): Dict {
  return dictionaries[locale];
}
