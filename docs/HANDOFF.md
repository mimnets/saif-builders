# Handoff: Saif Builders website v2

Production: https://www.saifbuildersbd.com (Vercel, deploys `main`).
Staff guide (বাংলা): [ADMIN.md](ADMIN.md) · Developer notes: [../README.md](../README.md)

## What changed

| Area | Before | Now |
|---|---|---|
| Stack | Hand-written HTML + JS, prebuilt CSS (Tailwind source missing) | Astro 7 + Tailwind 4, static build on Vercel |
| Content | Hard-coded in `assets/js/*.js` and HTML | Markdown/JSON in `src/content` and `src/data`, edited at `/admin` (Sveltia CMS, no database) |
| URLs | `project.html?id=tvs` | `/projects/tvs/` (old links redirect) |
| Pages | Home, projects, project | + About (`/about/`), Upcoming (`/upcoming/`), 404 |
| Brand | Placeholder navy/brass logo | Official logo (black + gold `#CFB06D`), master file `brand/logo.jpg` |
| Type | Hind Siliguri | Noto Sans Bengali (body) + Anek Bangla (headings), 17px base, Bangla-tuned line heights |
| Theme | Fixed | Card colour / gold shade / footer selectable in the CMS |
| Content updates | — | Sizes 1000–1850 sq ft, prices 35–70 lakh, new office address, real Facebook + email |
| Project images | Missing on `main` (only on `gh-pages`) | Restored to `public/uploads/projects/` |

## Go-live checklist (repo owner)

Hosting is **Vercel** (www.saifbuildersbd.com), deploying `main` automatically.

1. Merge into `main` → Vercel builds and publishes (~1 min). Check https://www.saifbuildersbd.com.
2. **Editors:** add each person under GitHub → Settings → Collaborators (Write).
3. **Admin login** at https://www.saifbuildersbd.com/admin/ — either
   - quick: each editor creates a fine-grained token (repo `mimnets/saif-builders`, Contents: read & write) and uses "Sign in with Token", or
   - proper: deploy the Cloudflare auth worker and set `base_url` in `public/admin/config.yml` (steps in ADMIN.md → লগইন সেটআপ).
4. Test once in the admin: change a small text, Publish, confirm the site updates in ~1–2 minutes.
5. Optional clean-up: the old `gh-pages` branch and GitHub Pages setting are no longer used.

## Waiting on the client

- [ ] Mr. Milon to approve the About page text (mission, vision, his first-person message): CMS → সাইট সেটিংস → আমাদের কথা.
- [ ] Real project photos (currently 3D illustrations). Upload per project in the CMS; images auto-convert to WebP.
- [ ] Floor plans for sizes above 1500 sq ft (range now advertised up to 1850).
- [ ] Office hours (optional, shown on the FAQ help card when filled).
- [ ] Logo as vector (SVG/AI/PDF) if available; a plain professional portrait of Mr. Milon (current one is cropped from an Eid poster).
- [ ] Choose final colour theme (CMS → সাইট সেটিংস → যোগাযোগ ও সাধারণ তথ্য → রঙের থিম). Default: black.
- [ ] Google Maps share link for the office if the pin on "Mokter Bari Road, Auchpara, Tongi" isn't exact.
- [ ] Custom domain (optional): see README → Custom domain.

## Known limits

- Lead form sends via the visitor's WhatsApp; there is no server-side form inbox.
- Offer countdown only shows when an end date is set in the CMS.
- The admin works only against `main` on GitHub; local edits need a push to appear there.

Maintained by mimnets.com.
