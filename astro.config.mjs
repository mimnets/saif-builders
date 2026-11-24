// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Production: Vercel at https://www.saifbuildersbd.com (site served from the domain root).
// To serve from a sub-folder instead (e.g. GitHub Pages project site), set BASE_PATH=/folder-name.
const site = process.env.SITE_URL || "https://www.saifbuildersbd.com";
const base = process.env.BASE_PATH || "/";

export default defineConfig({
  site,
  base,
  trailingSlash: "ignore",
  build: { format: "directory" },
  vite: { plugins: [tailwindcss()] },
});
