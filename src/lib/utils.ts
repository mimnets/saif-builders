import site from "../data/site.json";

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

export const waLink = (msg?: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg || site.whatsapp_default)}`;

export const telLink = () => `tel:${site.phone}`;

export const mapsLink = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
export const mapsEmbed = (q: string) => `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=15&output=embed`;

export const STATUS = {
  upcoming: { label: "আসন্ন", cls: "status-upcoming" },
  booking: { label: "বুকিং চলছে", cls: "status-booking" },
  ongoing: { label: "নির্মাণাধীন", cls: "status-ongoing" },
  ready: { label: "রেডি ফ্ল্যাট", cls: "status-ready" },
} as const;
export type Status = keyof typeof STATUS;

/** First letter of a Bangla name for avatar placeholders (keeps the vowel sign attached). */
export const initial = (name: string) => {
  const clean = name.replace(/^(জনাব|মিস্টার|মিসেস|ডা\.|ইঞ্জি\.)\s*/, "");
  return [...new Intl.Segmenter("bn", { granularity: "grapheme" }).segment(clean)][0]?.segment ?? "";
};
