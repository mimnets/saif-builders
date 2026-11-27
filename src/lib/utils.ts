import site from "../data/site.json";
import { data, type Lang } from "./i18n";

const BN = "০১২৩৪৫৬৭৮৯";
/** Convert Latin digits to Bangla digits. */
export const bn = (n: string | number) => String(n).replace(/\d/g, (d) => BN[+d]);
/** Format a number Indian-style (12,34,567) in Bangla digits. */
export const money = (n: number) => bn(Math.round(n).toLocaleString("en-IN"));

/** Prefix a root-relative path with the deploy base (/saif-builders). External URLs pass through. */
export const url = (path = "/") => {
  if (!path || /^(https?:|mailto:|tel:|#|data:)/.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return base + (path.startsWith("/") ? path : "/" + path);
};

export const waLink = (msg?: string, lang: Lang = "bn") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg || data("site", lang).whatsapp_default)}`;

export const telLink = () => `tel:${site.phone}`;

export const mapsLink = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
export const mapsEmbed = (q: string) => `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=15&output=embed`;

/** Status badge classes; labels are in src/i18n/ui.ts → status. */
export const STATUS = {
  upcoming: { cls: "status-upcoming" },
  booking: { cls: "status-booking" },
  ongoing: { cls: "status-ongoing" },
  ready: { cls: "status-ready" },
} as const;
export type Status = keyof typeof STATUS;

/** First letter of a name for avatar placeholders (keeps a Bangla vowel sign attached). */
export const initial = (name: string) => {
  const clean = name.replace(/^(জনাব|মিস্টার|মিসেস|ডা\.|ইঞ্জি\.|এস এম|Mr\.?|Mrs\.?|Ms\.?|Dr\.?|Engr\.?|S\.? ?M\.?)\s+/i, "");
  return [...new Intl.Segmenter("bn", { granularity: "grapheme" }).segment(clean)][0]?.segment ?? "";
};
