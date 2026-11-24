// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages project site: https://mimnets.github.io/saif-builders/
// With a custom domain (e.g. saifbuilders.com) set SITE_URL=https://saifbuilders.com and BASE_PATH=/
// in .github/workflows/deploy.yml.
const site = process.env.SITE_URL || "https://mimnets.github.io";
const base = process.env.BASE_PATH || "/saif-builders";

export default defineConfig({
  site,
  base,
  trailingSlash: "ignore",
  build: { format: "directory" },
  vite: { plugins: [tailwindcss()] },
});
