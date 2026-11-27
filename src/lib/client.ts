// Browser-side helpers (safe to bundle: no Astro-only APIs).
import site from "../data/site.json";

const BN = "০১২৩৪৫৬৭৮৯";
const isBn = () => document.documentElement.lang !== "en";
/** Digits in the page's script (Bangla digits on Bangla pages). */
export const bn = (n: string | number) => (isBn() ? String(n).replace(/\d/g, (d) => BN[+d]) : String(n));
export const money = (n: number) => bn(Math.round(n).toLocaleString("en-IN"));
export const waLink = (msg?: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg || site.whatsapp_default)}`;
/** Fill {name} placeholders in a template. */
export const fill = (tpl: string, vals: Record<string, string>) => tpl.replace(/\{(\w+)\}/g, (_, k) => vals[k] ?? "");
