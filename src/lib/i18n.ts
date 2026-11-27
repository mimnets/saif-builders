// Two languages: Bangla (default, served at /) and English (served at /en/).
// CMS content lives in src/data/<name>.json (Bangla) and src/data/<name>.en.json (English).
// The English file only needs the translated text: anything missing there (images, numbers,
// phone, icons…) is taken from the Bangla file, so the two never drift apart.
import { UI } from "../i18n/ui";

export const LANGS = ["bn", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "bn";

export const asLang = (l?: string): Lang => (l === "en" ? "en" : "bn");

/** Language of a page from its URL: everything under /en/ is English. */
export function langOf(url: URL): Lang {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const p = url.pathname.startsWith(base) ? url.pathname.slice(base.length) : url.pathname;
  return /^\/en(\/|$)/.test(p) ? "en" : "bn";
}

const BN = "০১২৩৪৫৬৭৮৯";
/** Digits in the page's script: Bangla digits for bn, Latin digits for en. */
export const num = (lang: Lang, n: string | number) =>
  lang === "bn" ? String(n).replace(/\d/g, (d) => BN[+d]) : String(n);
/** Indian-style grouping (12,34,567). */
export const money = (lang: Lang, n: number) => num(lang, Math.round(n).toLocaleString("en-IN"));

const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);

/** Overlay a translation on the default-language value. Arrays follow the translation's length. */
export function merge<T>(base: T, over: unknown): T {
  if (over === undefined || over === null) return base;
  if (Array.isArray(over)) return over.map((v, i) => merge(Array.isArray(base) ? base[i] : undefined, v)) as T;
  if (isObj(over)) {
    const out: Record<string, unknown> = isObj(base) ? { ...base } : {};
    for (const [k, v] of Object.entries(over)) out[k] = merge(out[k], v);
    return out as T;
  }
  return over as T;
}

const files = import.meta.glob<{ default: Record<string, any> }>("../data/*.json", { eager: true });
const raw = (file: string) => files[`../data/${file}.json`]?.default;

import site from "../data/site.json";
import home from "../data/home.json";
import offers from "../data/offers.json";
import about from "../data/about.json";
import upcoming from "../data/upcoming.json";
const BASE = { site, home, offers, about, upcoming };
type DataName = keyof typeof BASE;

/** Content of src/data/<name>.json in the given language. */
export function data<N extends DataName>(name: N, lang: Lang): (typeof BASE)[N] {
  const base = BASE[name];
  return lang === DEFAULT_LANG ? base : merge(base, raw(`${name}.${lang}`));
}

export const t = (lang: Lang) => UI[lang];

/** Root-relative path → path in the given language, including the deploy base. */
export function href(lang: Lang, path = "/") {
  if (!path || /^(https?:|mailto:|tel:|#|data:)/.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : "/" + path;
  return base + (lang === DEFAULT_LANG ? p : `/${lang}${p === "/" ? "/" : p}`);
}

/** The same page in the other language (keeps the path, strips/adds the /en prefix). */
export function switchPath(pathname: string, to: Lang) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  let p = pathname.startsWith(base) ? pathname.slice(base.length) || "/" : pathname;
  p = p.replace(/^\/en(\/|$)/, "/");
  return href(to, p);
}
