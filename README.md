# Upliftas — Vertical Lift Platform Website

A production-ready Next.js 14 (App Router) marketing site for a vertical
lift platform / accessibility equipment company, built with an original
premium design system (Apple/Braun/Linear-inspired), not a clone of any
real company's branded assets, copy, or code. Swap in your own brand
name, copy, and photography before shipping.

## Tech stack

- **Next.js 14** (App Router, Server Components by default)
- **Tailwind CSS** with a custom design-token system (neutral surface,
  single confident-blue accent, generous whitespace, large display type)
- **Framer Motion** for scroll reveals, staggered grids, pinned
  horizontal scroll, magnetic buttons, and blur reveals
- **lucide-react** for icons
- **@emailjs/browser** for client-side email delivery on the contact form
- **next/image** with remote patterns configured for Unsplash (stock
  placeholders — replace with licensed/owned photography)

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Copy the env template and fill in your values
cp .env.example .env.local

# 3. Run the dev server
npm run dev
```

Visit `http://localhost:3000`.

## Contact form: EmailJS + Telegram

The contact form (`src/components/shared/ContactForm.jsx`) submits to
**both** destinations in parallel and succeeds if either one works:

**Email (EmailJS, client-side)**
1. Create a free account at [emailjs.com](https://www.emailjs.com).
2. Add an email service (Gmail, Outlook, etc.) and create a template
   with variables: `from_name`, `reply_to`, `phone`, `inquiry_type`,
   `message`.
3. Copy your Service ID, Template ID, and Public Key into `.env.local`:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
   ```

**Telegram (server-side, via `src/app/api/contact/route.js`)**
1. Message [@BotFather](https://t.me/BotFather) on Telegram, run
   `/newbot`, and copy the bot token.
2. Send your new bot any message, then visit
   `https://api.telegram.org/bot<TOKEN>/getUpdates` to find your chat ID.
3. Add both to `.env.local` (no `NEXT_PUBLIC_` prefix — these stay
   server-side and are never sent to the browser):
   ```
   TELEGRAM_BOT_TOKEN=...
   TELEGRAM_CHAT_ID=...
   ```

If either integration isn't configured yet, the form degrades
gracefully — it won't crash, it'll just report that the corresponding
channel didn't send.

## Project structure

```
src/
  app/
    page.js                     # Homepage
    api/contact/route.js        # Telegram delivery endpoint
    products/page.js            # Product listing (+ contact section)
    products/[slug]/page.js     # Product detail: video, tech specs,
                                 # Pick Solution steps, related cases,
                                 # contact form
    cases/, news/                # Listing + detail routes
    sitemap.js / robots.js
  components/
    ui/           Header, Footer, Button, Container, Magnetic,
                  CurvedFooterTransition
    home/         HeroCarousel, StatsBand, ProductGrid, CasesScrollSection,
                  NewsSection, LogoCloud, ContactSection
    products/     VideoShowcase, StepModelSelector, MagnifyImage,
                  RelatedCaseCard, PickSolutionSection
    shared/       Card, Section, MotionWrapper (FadeUp/Stagger/BlurReveal),
                  ContactForm
  lib/
    data/         products.js, cases.js, news.js, hero-slides.js
    site-config.js  Centralized brand name/contact/social info
    utils.js
```

## Editing content

All content lives in `src/lib/data/*.js` — no CMS required. Brand name,
tagline, and contact details are centralized in `src/lib/site-config.js`.

## Placeholder media

- **Product videos**: drop MP4 files into `public/assets/videos/` (see
  the README there for exact filenames) — the video player falls back
  to a poster image until a real file exists.
- **Product model photos**: drop images into `public/assets/images/`
  (see the README there) and update the `modelImagePreview` path in
  `products.js` to point at your new file. The magnify-lens hover effect
  on the technical specification section works on any image.

## Design tokens

Defined in `tailwind.config.js`:

- `primary` — a single confident blue accent (`#2954E5`), used sparingly
- `surface` / `surface.muted` — warm off-white backgrounds
- `secondary` — soft indigo tint for accent backgrounds
- `ink` / `ink-muted` — near-black text and muted gray
- `boxShadow.soft/card/cardHover` — layered, soft shadow system

Utility classes in `globals.css`: `.btn-primary/outline/white`,
`.section`, `.heading-xl/lg/md`, `.eyebrow`, `.glass` (glassmorphism).

## Motion primitives

`src/components/shared/MotionWrapper.jsx` and `src/components/ui/Magnetic.jsx`:

- `<FadeUp>` — fade + slide-up on scroll into view
- `<BlurReveal>` — blur + fade + rise, for hero/headline reveals
- `<StaggerGroup>` / `<StaggerItem>` — staggered grid reveals
- `<Magnetic>` — wraps a button/link with a subtle cursor-following pull

All motion respects `prefers-reduced-motion` globally (see `globals.css`).

## Accessibility

- `prefers-reduced-motion: reduce` disables/shortens animation and
  transition durations site-wide
- Visible `:focus-visible` outlines on all interactive elements
- The Pick Solution step cards reveal detail text on hover **and**
  keyboard focus (`group-focus-visible`), so the content isn't
  hover-only
- Semantic headings, alt text on all images, and labeled form fields

## SEO

- `src/lib/seo.js` centralizes metadata: `buildMetadata()` fills in
  title/description/canonical URL/Open Graph/Twitter card from a few
  inputs, used by every page's `metadata` (or `generateMetadata`) export.
  `organizationJsonLd()` and `productJsonLd()` render `<script
  type="application/ld+json">` structured data (Organization site-wide in
  `layout.js`, Product on each `/products/[slug]` page).
- DuoStep is the flagship product: it's first in `products.js` (so it
  leads the homepage product picker, `/products`, and the nav dropdown),
  first in the homepage hero rotation, and called out by name in the
  homepage/layout `<title>` and description.
- Auto-generated `sitemap.xml` / `robots.txt` (`src/app/sitemap.js`,
  `src/app/robots.js`) — pull every product/case/news slug automatically,
  no manual maintenance needed as content is added.
- Update `NEXT_PUBLIC_SITE_URL` in `.env.local` (and the fallback in
  `site-config.js`) to your real production domain before deploying —
  every canonical URL, OG tag, and sitemap entry is derived from it.

## Performance

- Product demo video is pre-compressed (H.264, CRF 28, 1280px wide,
  faststart) — re-run a similar `ffmpeg` pass on any new video you add;
  a raw phone/camera export at multiple Mbps will noticeably slow down
  every product page that embeds it.
- `next.config.js` sets `images.formats: [avif, webp]` and a 30-day
  optimizer cache, plus a 1-year immutable `Cache-Control` header on
  everything under `/assets/*`. If you replace a file's *contents* at the
  same path after deploying, rename it (or add a query string) — visitors
  who already cached the old file won't re-fetch within that window.
- `output: "standalone"` in `next.config.js` — see "Deploying to
  Hostinger" below.

## Build & deploy

```bash
npm run build
npm start
```

Deploys cleanly to Vercel, Netlify, or any Node host supporting Next 14.

### Deploying to Hostinger

This site uses a Next.js **API route** (`src/app/api/contact/route.js`,
for the Telegram integration) and `next/image`'s on-the-fly optimizer —
both require a **running Node.js process**, not static file hosting. On
Hostinger, use their **Node.js hosting / VPS** plan (not a plain shared
web-hosting plan meant for static files or PHP).

**Option A — plain build (simplest):**
```bash
npm install
npm run build
npm start          # listens on PORT (default 3000)
```
Point Hostinger's Node.js app config at `npm start` (or `next start`)
and set your environment variables (from `.env.example`) in its
dashboard rather than uploading `.env.local`.

**Option B — standalone output (smaller upload):**
`next.config.js` has `output: "standalone"` enabled, so
`.next/standalone/` already contains a self-contained `server.js` plus
only the `node_modules` it actually needs — no `npm install` required
on the server. To use it:
```bash
npm run build
# Then upload these three to the server, preserving this layout:
#   .next/standalone/**      → app root
#   .next/static/            → app root/.next/static
#   public/                  → app root/public
node server.js
```
This is the smaller, faster-to-deploy option if your Hostinger plan has
tight disk space or you'd rather not run `npm install` on the server.

Either way, set `NEXT_PUBLIC_SITE_URL` to your real domain in
Hostinger's environment variable settings before building/deploying.
