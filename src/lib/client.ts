// Browser-side helpers (safe to bundle: no Astro-only APIs).
import site from "../data/site.json";

const BN = "০১২৩৪৫৬৭৮৯";
export const bn = (n: string | number) => String(n).replace(/\d/g, (d) => BN[+d]);
export const money = (n: number) => bn(Math.round(n).toLocaleString("en-IN"));
export const waLink = (msg?: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg || site.whatsapp_default)}`;
