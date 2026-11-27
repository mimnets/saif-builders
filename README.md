# সাইফ বিল্ডার্স ওয়েবসাইট

Astro + Tailwind CSS static site, content edited with **Sveltia CMS** at `/admin`.
No database: all content lives in this GitHub repo and every CMS "Publish" is a commit.
Vercel builds and deploys every push to `main` (preview deployments for other branches).

- Live: https://www.saifbuildersbd.com
- Admin: https://www.saifbuildersbd.com/admin/
- Staff guide (বাংলা): [docs/ADMIN.md](docs/ADMIN.md)
- Handoff & go-live checklist: [docs/HANDOFF.md](docs/HANDOFF.md)

## Where things live

| What | File / folder | Edited in CMS as |
|---|---|---|
| Phone, WhatsApp, address, logo, SEO | `src/data/site.json` | সাইট সেটিংস → যোগাযোগ ও সাধারণ তথ্য |
| Homepage sections (hero, features, FAQ, reviews…) | `src/data/home.json` | সাইট সেটিংস → হোম পেজ |
| Offers | `src/data/offers.json` | সাইট সেটিংস → অফার |
| About page (`/about/`) | `src/data/about.json` | সাইট সেটিংস → আমাদের কথা (পেজ) |
| Upcoming page (`/upcoming/`) | `src/data/upcoming.json` + projects with status `upcoming` | সাইট সেটিংস → আসন্ন প্রজেক্ট (পেজ) |
| Projects (one file each) | `src/content/projects/<id>.md` | প্রজেক্ট |
| Uploaded photos | `public/uploads/…` (projects in `public/uploads/projects/<id>/`) | Media / image fields |
| Logo, favicon, share image | `public/img/` | logo + og_image fields in site settings |
| Brand colors & fonts | `src/styles/global.css` (`@theme`) | (code only) |
| CMS fields | `public/admin/config.yml` | (code only) |

## English version

Every page exists in Bangla (`/…`) and English (`/en/…`). The header has a language button ("English" / "বাংলা")
that opens the same page in the other language; it is also in the mobile menu and the footer.

- English content sits next to the Bangla file: `src/data/<name>.en.json`, `src/content/projects/<id>.en.md`.
  It only needs the translated text: images, numbers, phone, status, order etc. are always taken from the Bangla file.
- In the CMS every text field has a Bangla/English switch (Sveltia i18n, see `i18n:` in `public/admin/config.yml`).
- Fixed interface text (buttons, labels, form messages) is in `src/i18n/ui.ts` for both languages.
- Pages are written once in `src/views/`; `src/pages/` and `src/pages/en/` only route to them.

Project URL = file name: `src/content/projects/tvs.md` → `/projects/tvs/`.
Old links `project.html?id=tvs` redirect automatically.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321/
npm run build      # → dist/
```

Requires Node 22.23+.

## Hosting (Vercel)

- Project is connected to this repo; `vercel.json` pins framework **Astro**, build `npm run build`, output `dist`, Node 22.
- Push to `main` → production (www.saifbuildersbd.com). Push to any other branch → preview URL.
- The site is served from the domain root. To host under a sub-folder, set env `BASE_PATH=/folder` (and `SITE_URL`).
- Admin login: see "লগইন সেটআপ" in [docs/ADMIN.md](docs/ADMIN.md).

## Design notes

- Brand tokens come from the official logo (`public/img/logo.png`): black, gold `#CFB06D`, grey `#6D6E72`.
  Master file: `brand/logo.jpg`; web versions (round PNG, favicons, `og.png`) are generated from it.
  `brass-d #866521` is used for brass-coloured *text* so it passes WCAG AA on light backgrounds.
- **Switchable theme** (CMS: সাইট সেটিংস → যোগাযোগ ও সাধারণ তথ্য → রঙের থিম, stored in `site.json → theme`).
  Rendered as `data-surface` / `data-accent` / `data-footer` on `<html>`; dark cards and sections use the
  `surface` class plus `text-on-night*` / `bg-night-2` / `text-night-accent` tokens, so new dark blocks follow the theme.
- Fonts (self-hosted via Fontsource): **Noto Sans Bengali** for body (reading comfort, correct conjuncts),
  **Anek Bangla** for headings. Base size 17px, body line-height 1.8, no letter-spacing on Bangla text.
