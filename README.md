# Vaani's Glamlook — website

One-page website for **Vaani's Glamlook Makeup Studio & Academy**, Dwarka City, Chhapraula, Noida (Google Maps: <https://maps.app.goo.gl/RJ8ps5ELwk1rpoWm9>).
Every business fact and its source are in [BUSINESS_RESEARCH.md](BUSINESS_RESEARCH.md).

**Stack:** Vite + TypeScript + Tailwind CSS, with components written in React syntax and running on **Preact** (`preact/compat`) to keep JS small. The page is **prerendered to static HTML at build time** and then hydrated in the browser.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check → client build → SSR build → prerender → dist/
npm run preview    # serves dist/ at http://localhost:4173
```

Requires Node 18+ (tested on Node 24.20).

## Where to change things

| What | File |
|---|---|
| Business facts: name, address, phones, hours, rating, WhatsApp, Place ID | `src/content/business.ts` |
| Services list and wording | `src/content/business.ts` → `services` |
| Instagram posts shown in the "Recent work" section | `src/content/business.ts` → `instagramPosts` (shortcode from the post URL) |
| Real photos (hero + gallery) | `src/content/business.ts` → `heroPhoto`, `galleryPhotos` (see below) |
| SEO title, description, structured data | `index.html` |
| Colours and fonts | `tailwind.config.ts`, `src/index.css` |
| Social preview image / touch icon | `scripts/brand-assets.html` → re-render with `chrome --headless=new --window-size=1200,630 --screenshot=public/og-image.png file:///…/scripts/brand-assets.html` (use `?icon` and 180×180 for `apple-touch-icon.png`) |

### Adding real photos (once the owner provides them)
1. Export each photo as WebP at two widths, e.g. `bride-01-480.webp` and `bride-01-960.webp`, at about 75–80% quality. Put them in `public/photos/`.
2. Add entries to `galleryPhotos` (and optionally `heroPhoto`) with `width`, `height` and descriptive `alt` text. The components already handle `srcset`, lazy loading and aspect ratios, and give the hero photo `fetchpriority="high"`.
3. Only use photos the owner has the rights to, and get client consent for photos of brides.

## Connecting the services

All variables are listed in `.env.example`. Never commit `.env`.

### Contact form
The form currently runs in **preview mode**: it validates input, then clearly tells the visitor that the enquiry was **not sent** and offers the phone number and Instagram instead.
To make it send enquiries, create a free form endpoint that accepts JSON (e.g. Formspree → New form → copy the `https://formspree.io/f/…` URL). Then set it at build time:
```
VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
```
The form posts `{ name, phone, occasion, date, message, _subject }`. It shows a loading state, then shows success only if the endpoint returns 2xx; otherwise it shows an error. This endpoint URL is public by design and is not a secret.

### Live Google rating + reviews (optional)
`api/google-reviews.ts` is a serverless function (Vercel `api/` convention) that calls the **Google Places API (New)** on the server.
1. In Google Cloud, enable **Places API (New)** and create an API key restricted to that API. Note that this is billed per request.
2. Find the Place ID (`ChIJ…`) with the [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id) by searching "Vaani's Glamlook Makeup Studio & Academy".
3. In the host's dashboard (not in code), set `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID`, then build with `VITE_REVIEWS_API=true`.
4. Also put the Place ID in `business.google.placeId` so that "Write a review" opens Google's review form directly.

The browser requests reviews only when the Reviews section scrolls near the viewport. If the API fails or isn't configured, the site falls back to the static rating below and shows no reviews, so nothing is invented.

### Static rating (no API)
Edit `business.google.rating`, `reviewCount` and `verifiedOn` in `src/content/business.ts`. The site shows the date, so it never implies a live value. **The review count is currently `null`**: it couldn't be verified (see the research document). In dev mode an amber note reminds you of this.

### Domain
Build with `SITE_URL=https://your-domain.in`. This sets the canonical URL, Open Graph URLs, JSON-LD URLs, `sitemap.xml` and `robots.txt`. Until then they use `https://www.example.com`.

## Deploying

### Preview mode (on by default)
Every build is a **pitch preview** unless `PREVIEW_MODE=false`. In preview mode:
- `<meta name="robots" content="noindex, nofollow, noimageindex">` is added to the page.
- `robots.txt` is `Disallow: /`.
- No `sitemap.xml` is generated.

This keeps the demo, and the Instagram photos used without permission yet, out of Google and Google Images. The link still works for anyone you send it to.

### Pitch preview on Vercel
```bash
npx vercel login          # once, with your own (free) Vercel account
npx vercel --prod         # first run asks a few setup questions; accept the defaults
```
- The site gets a URL like `https://vaanis-glamlook.vercel.app`.
- `SITE_URL` falls back to Vercel's production domain (`VERCEL_PROJECT_PRODUCTION_URL`), so canonical and WhatsApp/Open Graph previews are correct without extra setup.
- `vercel.json` sets one-year immutable caching for `/assets/*` and basic security headers. `.vercelignore` keeps `node_modules`, `dist` and `.env` from being uploaded.

### Going live (only after the owner approves)
1. Resolve the photo permissions (see the checklist).
2. Add the domain in Vercel → Project → Settings → Domains.
3. In Settings → Environment Variables, set:
   - `PREVIEW_MODE=false`
   - `SITE_URL=https://<domain>`
   - `VITE_FORM_ENDPOINT`
   - optionally the Places API variables
4. Redeploy. The build log line `Prerendered … · LIVE (indexable, sitemap written)` confirms it.

---

## Owner-confirmation checklist

- [ ] **Permission** to build and publish a website for the business, and the preferred domain.
- [ ] **Phone numbers:** 080763 12605 (Google) and 98702 07231 (Instagram poster only). Which is primary? Should both be shown?
- [ ] **WhatsApp:** which number, if any? Set `business.whatsapp` (e.g. `'918076312605'`) to enable the WhatsApp buttons.
- [ ] **Hours:** Google says "Open 24 hours". Confirm the real hours or "by appointment only", then update `business.hours` and `openingHours` in `index.html`.
- [ ] **Address wording** and any landmark to add for directions.
- [ ] **Name spelling:** "Vaani" (business) vs "Vani" (artist's Instagram name). The site uses Vaani for the brand and Vani Bhardwaj for the artist.
- [ ] **Academy details:** course names, duration, fees, batch timings, certificate. The site currently says "ask about current batches".
- [ ] **Affiliation** with "London Academy of Makeup Artistry" (linked from the Instagram bio). Not mentioned on the site unless confirmed.
- [ ] **Bio/story:** experience, training, signature style. The About section currently uses only verified facts.
- [ ] **⚠️ Photos currently on the site were taken from the studio's public Instagram for the pitch demo.** Get written permission to use them (and confirmation that the brides/models pictured consent) **before publishing**, or replace them with photos the owner supplies. A studio interior shot and a portrait of Vani would also help.
- [ ] **Google review count** (or Places API setup) and the **Place ID**.
- [ ] **Form inbox:** which email or WhatsApp should receive enquiries.
- [ ] **Logo:** the Instagram poster shows a crowned "VG" script logo. A vector file would replace the site's interim monogram.

---

## Delivery report (27 Oct 2026)

### Built
Single-page site with these sections:
- sticky header with an accessible mobile menu (Escape closes it; aria-expanded)
- hero with original arch/monogram artwork
- five services, each with an "Enquire" button that pre-selects the occasion and focuses the form
- Academy, About, and a "Portfolio" grid of 8 real photos (bridal, bridal glam, party) with a lightbox: arrows/keyboard navigation and a link to each original post. The hero shows a real bridal photo in a gold arch frame (pitch demo; see the checklist about permission)
- Google Reviews summary with "Read all" / "Write a review" links and an optional live API
- enquiry form with validation and loading/success/error/preview states
- address, hours and phones with click-to-call, a directions link, and a click-to-load Google Map
- footer, and a sticky Call / Directions / Book bar on mobile

SEO pieces: title, meta description, canonical, Open Graph and Twitter tags, `BeautySalon` JSON-LD (verified fields only; no `aggregateRating`), favicon, touch icon, manifest, generated `sitemap.xml` and `robots.txt`, semantic landmarks and headings.

### Tests that were actually run
- `npm run build`: type-check, client build, SSR build and prerender all pass. Output: **JS 20.1 KB gzip**, **CSS 6.7 KB gzip**, prerendered HTML.
- **Puppeteer QA** (headless Chrome 390×844 mobile emulation and 1440×900 desktop, production build), 22/22 pass:
  - no horizontal overflow, and no third-party requests on initial load
  - mobile menu opens and closes
  - "Enquire" prefills the occasion and moves focus
  - validation errors appear; preview-mode message says "not sent"
  - Instagram dialog loads the official embed and closes with Escape
  - map loads on click; all in-page anchors resolve
  - no first-party console errors
- **Form with a mocked endpoint** (dev server, request interception): loading state, JSON payload, success on 200 and error on 500 all verified.
- **Current version (photo-collage hero)**, Lighthouse mobile on 3 runs: Performance 81 / 98 / 98, with LCP 2.7 / 2.2 / 2.2 s (the hero photo, a 32 KB WebP) and CLS 0. Accessibility, Best Practices and SEO were 100 in every run. The 81 run had a 510 ms TBT spike on the first run after a build, which looks like local machine noise; the other runs had TBT of 10–20 ms. Desktop: Performance 98, Accessibility 100, LCP 0.7 s, CLS 0.027.
- **Lighthouse 12, before photos**, on the local production preview (`vite preview`, which serves files uncompressed):
  - Mobile: **Performance 97, Accessibility 100, Best Practices 100, SEO 100**. LCP 1.8 s, FCP 1.5 s, TBT 160 ms, CLS 0.012.
  - Desktop: **Performance 96, Accessibility 100, Best Practices 100, SEO 100**. LCP 1.0 s, TBT 0 ms, CLS 0.

These are lab results from one machine, not field Core Web Vitals. Re-test on the real host; CDN compression should improve them.

### Remaining bottlenecks
- The largest remaining main-thread cost is the **first style/layout pass**, inflated by Lighthouse's 4× CPU throttle. The decorative SVG arch is the main contributor.
- CLS 0.012 on mobile comes from web-font swapping. A `size-adjust` fallback font could remove it.
- Real photos will add weight. Use the WebP/srcset steps above and keep the hero photo under ~120 KB.

### Not done / limitations
- **Google review count and review texts were not verified.** The unauthenticated Maps view hides them and Google Search showed a CAPTCHA, which was not bypassed. No reviews are displayed.
- **No photos of the business are republished.** Instagram content appears only through Instagram's own embed, and Google Maps photos weren't used, pending the owner's permission.
- Nothing was deployed, no domain was registered, and the owner was not contacted.
