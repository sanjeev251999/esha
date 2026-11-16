# Esha Aesthetic Centre — Website

Promotional website for **Esha Aesthetic Centre** (Beauty | Skin | Hair | Body), Nagercoil — also known as Esha Beauty Paradise & Tattoo Academy. Built to turn visitors from Instagram and Facebook ads into WhatsApp enquiries.

- **Live site (now):** https://esha-ten.vercel.app
- **Planned domain:** https://www.eshabeautyparlour.com *(not registered yet — see [Custom domain](#custom-domain))*
- **Instagram:** https://www.instagram.com/esha_aesthetic_centre/
- **Phone / WhatsApp:** +91 82484 74624
- **Instagram ad landing page:** `/enquire`

No online payments, cart, logins or backend. Enquiries go straight to the centre's WhatsApp.

---

## Features

| Area | What it does |
| --- | --- |
| **Pages** | Home, About, Services, Gallery, Offers, Contact, and the `/enquire` landing page for ads |
| **WhatsApp** | Floating chat button on every page. The enquiry form opens WhatsApp with the customer's name, mobile, service, date and message already filled in |
| **Ad landing page** | `/enquire`: minimal header, tap-a-service picker, offers, form, gallery and a sticky "Enquire / WhatsApp" bar on mobile. `/book`, `/offer` and `/instagram` redirect to it |
| **Enquiry form** | Reactive form with validation for required fields, Indian mobile numbers, no past dates and a 500-character message limit. Shows an honest status: opened, blocked by the browser (with a manual button), or WhatsApp not set up yet |
| **SEO** | Every page is **prerendered to static HTML** at build time, with its own title, description, canonical URL, Open Graph and Twitter tags. Also includes `sitemap.xml`, `robots.txt`, schema.org `BeautySalon` data, favicon set and a 1200×630 share image |
| **Performance** | Lazy-loaded pages and images, WebP images (8–110 KB each), trimmed Bootstrap build, ~112 KB initial transfer |
| **Accessibility** | Semantic landmarks, skip link, labelled form fields with error messages read by screen readers, keyboard-friendly lightbox (native `<dialog>`), respects reduced-motion settings |

**Tech:** Angular 22 (standalone components, signals, zoneless), TypeScript, Reactive Forms, SCSS, Bootstrap 5.3 (Sass, only the parts used), static prerendering with `@angular/ssr`, hosted on Vercel.

---

## ✏️ Everyday changes (no coding knowledge needed)

All business content lives in **four small files**. Edit, commit and push to `main` — Vercel redeploys automatically within a couple of minutes.

### 1. WhatsApp number, phone, address, map, hours → `src/app/config/business.config.ts`

```ts
whatsappNumber: '919876543210',      // country code + number, digits only (no +, spaces or dashes)
phoneNumber: '+91 98765 43210',      // shown on the site and used for "Call"
address: { line1: 'Shop 12, ...', line2: '', city: 'Chennai', state: 'Tamil Nadu', pincode: '600001', country: 'India' },
googleMapsUrl: 'https://maps.app.goo.gl/...',                 // Google Maps → Share → Copy link
googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=...', // Share → Embed a map → copy only the src="..." value
workingHours: [
  { days: 'Monday – Saturday', hours: '10:00 AM – 8:00 PM' },
  { days: 'Sunday', hours: '10:00 AM – 2:00 PM' },
],
```

Anything left empty (`''`) is **hidden or shown as "To be updated"**. The site never displays made-up details.
Until `whatsappNumber` is set, chat buttons fall back to **Instagram Direct Messages**, and the form tells customers clearly that their enquiry was **not** sent.

### 2. Services and prices → `src/app/content/services.content.ts`

Each service has a `name`, `summary`, `description`, `highlights`, `image` and an optional `price`:

```ts
price: 'From ₹1,500',   // remove this line to show "Price on enquiry"
featured: true,         // featured services appear on the Home page
```

To add a service, copy an existing block and give it a new, unique `id` (lowercase-with-dashes).

### 3. Offers and packages → `src/app/content/offers.content.ts`

No discounts are shown until you add them:

```ts
highlight: '20% OFF',               // or '₹2,999' – leave out to show "Ask us for the current offer"
validity: 'Valid till 31 Dec 2026',
terms: 'Prior booking required',
active: true,                       // set to false to hide the offer
```

### 4. Gallery → `src/app/content/gallery.content.ts`

1. Copy your photos into `src/assets/images/gallery/`. JPG or WebP; about **1200 px wide** and **under 300 KB** is ideal. Use [squoosh.app](https://squoosh.app) to compress.
2. Add or edit entries:
   ```ts
   { src: 'assets/images/gallery/my-bride.jpg', alt: 'Bridal look with gold jewellery', category: 'Bridal', width: 1200, height: 1500 },
   ```
   `width`/`height` only need the right proportions (portrait 1200×1500, landscape 1200×800). `category` is one of `Bridal`, `Makeup`, `Skin`, `Hair`, `Salon`.

### Replacing other images

Replace a file in `src/assets/images/` **with the same name** (hero, about, services, offers folders). Keep similar proportions:

| Image | Size |
| --- | --- |
| Service cards | 800×600 (landscape) |
| Hero portrait | 720×900 (portrait) |
| About images | 720×900 (portrait) and 600×600 (square) |

The current photos are royalty-free placeholders — see [CREDITS.md](CREDITS.md).

---

## 📣 Instagram / Facebook ads

Use the landing page as the ad's website URL, with UTM tags so enquiries show where they came from:

```
https://esha-ten.vercel.app/enquire?utm_source=instagram&utm_medium=paid&utm_campaign=bridal-nov
```

After the custom domain is connected, use `https://www.eshabeautyparlour.com/enquire?...` instead.

- Add `&service=bridal-makeup` to pre-select a service in the form. Ids are listed in `services.content.ts`.
- The WhatsApp message ends with `(Sent from website – instagram)` when `utm_source` is present.
- Short links `/book`, `/offer` and `/instagram` all lead to `/enquire`.

---

## 🛠 Development

Requirements: **Node.js 22.12+** (tested with Node 24 LTS) and npm.

```bash
npm install          # install dependencies
npm start            # dev server at http://localhost:4200
npm run build        # production build + prerender → dist/esha/browser
npm run preview      # serve the production build at http://localhost:4300
```

`npm run build` first runs `scripts/generate-seo-files.mjs`, which writes `public/sitemap.xml` and `public/robots.txt` using `siteUrl` from `src/environments/environment.ts`. If the domain changes, update `siteUrl` there.

### Project structure

```
src/
├── app/
│   ├── config/business.config.ts     ← WhatsApp, phone, address, hours
│   ├── content/                      ← services, offers, gallery (editable content)
│   ├── core/services/                ← WhatsApp links, SEO tags, enquiry scroll/preselect
│   ├── models/                       ← TypeScript interfaces
│   ├── pages/                        ← home, about, services, gallery, offers, contact, landing, not-found
│   ├── shared/
│   │   ├── components/               ← header, footer, whatsapp-float, enquiry-form, gallery-grid,
│   │   │                               service-card, offer-card, contact-info, cta-band, page-hero, logo, icon
│   │   └── directives/               ← scroll reveal, "Enquire Now" link
│   ├── app.routes.ts                 ← routes + per-page SEO titles/descriptions
│   └── app.routes.server.ts          ← which routes are prerendered
├── assets/images/                    ← hero, about, services, offers, gallery
├── environments/                     ← siteUrl per environment
├── styles/_tokens.scss               ← brand colours, fonts, spacing
├── styles/_base.scss                 ← buttons, sections, typography
└── styles.scss                       ← Bootstrap (selected modules) + base styles
public/                               ← favicon, icons, og-image.jpg, manifest, robots/sitemap
vercel.json                           ← build settings, redirects, SPA fallback, caching headers
```

### Brand palette

| Token | Hex | Use |
| --- | --- | --- |
| Maroon | `#7D1F2C` | buttons, links, headings accents |
| Gold | `#B08A3E` | icons, lines, ornaments |
| Light gold | `#E8CF95` | accents on dark backgrounds |
| Cream | `#F3E6CF` | section backgrounds |
| Ivory | `#FFFCF5` | page background |
| Ink | `#2F1D1F` | text |

Fonts: **Cinzel** (logo wordmark), **Cormorant Garamond** (headings) and **Jost** (body), all from Google Fonts. Palette and logo follow the salon signboard.

---

## 🚀 Deployment (Vercel)

The repository is connected to Vercel. **Every push to `main` deploys automatically.**

Build settings are in `vercel.json`:

| Setting | Value |
| --- | --- |
| Install | `npm ci` |
| Build | `npm run build` |
| Output directory | `dist/esha/browser` |
| Routing | prerendered pages served as static HTML; unknown URLs get `404.html` (a copy of the app shell, made by `postbuild`) with a real 404 status, showing the in-app "Page not found" page |

Manual deploy from a computer:

```bash
npx vercel@latest --prod
```

### Custom domain

Target: **www.eshabeautyparlour.com** as the primary domain, with `eshabeautyparlour.com` redirecting to it.

1. Register `eshabeautyparlour.com` with any registrar.
2. In Vercel → Project → **Settings → Domains**, add `www.eshabeautyparlour.com` and `eshabeautyparlour.com`, and set the apex domain to **redirect to www**.
3. At the registrar, add the DNS records exactly as shown in Vercel's Domains screen. The usual values are:

   | Type | Name | Value |
   | --- | --- | --- |
   | A | `@` | `76.76.21.21` |
   | CNAME | `www` | `cname.vercel-dns.com` |

   *(Vercel may show project-specific values — always use what the Domains screen shows.)*
4. Vercel issues the HTTPS/SSL certificate automatically once DNS resolves. This usually takes minutes, but can take up to 48 hours.
5. Switch the site's own links to the new domain, then commit and push:
   - `src/environments/environment.ts` → `siteUrl: 'https://www.eshabeautyparlour.com'` (canonical URLs, link previews, sitemap, robots)
   - `src/index.html` → the two URLs in the `application/ld+json` block

---

## License

© Esha Aesthetic Centre. All rights reserved. Third-party assets: see [CREDITS.md](CREDITS.md).
