# CLAUDE.md

Project instructions for agents working on this repo. Read this before making changes.

## What this is

An author portfolio site for Michael J. Wells, pastor and author of *The Nehemiah Blueprint:
Redeeming Brokenness Through Visionary Leadership*. Two routes:

- `/` — hero, book + buy, about/bio, footer.
- `/book-the-author` (`app/book-the-author/page.tsx`) — speaking/booking page: intro + contact,
  a church-events section, a business-events section, then one shared Formbricks form section
  (`#request`). Added Sept 2026. See "Booking page" and "Formbricks embed" below.

- `/privacy` (`app/privacy/page.tsx`) — privacy policy; linked only (subtly) from the footer, not
  the nav. Copy in `content.ts` under `privacy`. Policy states the site has no analytics — keep
  that true or update the policy.

Nothing else — no blog, no CMS, no analytics. See "Growing this site" for the bar to add more.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind v4 (CSS-first config via `@theme` in
`app/globals.css`, `@tailwindcss/postcss`) · `next/font` for self-hosted Google Fonts (Fraunces,
Work Sans, IBM Plex Mono — no external font CDN, no runtime network calls).

## Static export — the load-bearing constraint

`next.config.ts` sets `output: 'export'` and `images.unoptimized: true`. This is deliberate and
load-bearing: the deploy target is **Cloudflare Pages serving the `out/` directory as static
files, with zero Cloudflare Functions and zero secrets.**

**Hard rule: do not add server-side code — API routes, server actions, middleware, `fetch` calls
to private APIs, anything that needs a runtime — without first stopping and re-discussing the
deploy target with whoever owns this project.** Static export cannot contain any of that; adding
it will silently break at build time or deploy time. If a feature seems to need a backend, the
right move is to surface that tradeoff, not to quietly add one.

Multiple static routes are fine (`/book-the-author` is one) — `output: 'export'` prerenders each
to its own `.html` in `out/`, no runtime involved. The line is server code, not extra pages.
Verify a build produces no `_worker.js` / `*.func` in `out/`.

## Checkout: Stripe hosted Payment Link, not the SDK

The buy button is a plain `<a>` tag to a Stripe-hosted Payment Link page, whose URL comes from
`NEXT_PUBLIC_STRIPE_CHECKOUT_URL`. Stripe owns card capture, tax, shipping, receipts, and PCI
compliance entirely on their hosted page. We never embed Stripe.js / Elements, never create
Checkout Sessions via API, never handle a card number. This is what makes the
static-export/no-backend constraint above actually work for a real e-commerce flow — don't
"upgrade" this to an embedded checkout without revisiting the deploy target.

The env var is `NEXT_PUBLIC_*` on purpose: it's inlined into the static HTML at build time, and
that's fine because a checkout link is meant to be public (it's the thing customers click). There
is no secret here.

**Empty-URL behavior:** if `NEXT_PUBLIC_STRIPE_CHECKOUT_URL` is unset or empty, the buy button
renders as a disabled "Coming soon" `<button>` instead of a dead link. See `BuyButton` in
`app/ui.tsx` — this is the one piece of branching logic in the whole page, and the only thing
here that's ever been worth a test.

## Booking page (`/book-the-author`)

Two sections — church events, business events — built from copy Michael supplied as
`church_booking.pdf` / `business_booking.pdf`. All of it (bios, speaking emphases, the
"what a visit looks like" cards, contact email/phone) lives in `content.ts` under `booking`.
Fee, honorarium/payee, and W-9 details from the PDFs are **deliberately not on the page** —
those get handled after a host reaches out; only a one-line "host covers travel & lodging;
speaking fee arranged in advance" summary is public.

Section components (`BookingSection`, `SettingCard`) are colocated in
`app/book-the-author/page.tsx`, same as the homepage's sections.

## Formbricks embed — approved exception to "no runtime network calls"

The `#request` section renders `<FormbricksEmbed>` (`app/formbricks-embed.tsx`) — a plain
`<iframe>` to one self-hosted Formbricks survey (`forms.nccvaldosta.com/s/<id>?embed=true`,
`?embed=true` strips its page chrome). One survey serves every context; the church and business
sections just link down to it. This is a deliberate, owner-approved exception to the "no
external runtime calls" stance — same reasoning as Stripe: Formbricks owns form capture,
validation, storage, and notifications. Still **no `"use client"`, no backend of ours, no
secret, no Cloudflare Function** — the iframe is just markup, deploy target unchanged.

The URL lives in `content.ts` as `booking.form.url`, with a working default and an optional
`NEXT_PUBLIC_FORMBRICKS_URL` override (public — it's an embed link, not a secret).

**Empty-URL behavior** (mirrors `BuyButton`): blank `src` ⇒ `FormbricksEmbed` renders a
"being finalized" placeholder box instead of the iframe.

## Where content lives

All copy — author name, book title/subtitle/blurb/price, bio paragraphs, image paths and alt
text — lives in `content.ts` at the repo root. **Never hardcode copy directly in JSX.** This is
the single place Michael (or an agent on his behalf) edits to change what the site says.

Fields marked `// TODO` in `content.ts` pending real input from Michael:
- `book.price` — currently `null`. The price line only renders when this is non-null.
- `book.blurb` — placeholder written from the title/subtitle. Replace with real back-cover copy.

`booking.form.url` is live (real self-hosted Formbricks survey). `content.ts` also holds `nav`
(link labels only — route paths live in `app/nav.tsx`) and
`booking` (everything on `/book-the-author`).

## Image pipeline

Source photos are large (multi-MB originals). Downscale with macOS-native `sips` — no image
library dependency:

```
sips -Z 2000 --setProperty formatOptions <quality> <source.jpg> --out public/<name>.jpg
```

Target under ~400 KB per image. Check with `du -h public/*.jpg` and lower `formatOptions` (JPEG
quality, 0–100) or the `-Z` max-dimension if a file lands over budget. The portrait
(`public/michael-wells.jpg`) is used uncropped — it's Michael and his wife, don't crop it for
layout convenience.

## Commands

```
npm run dev      # local dev server
npm run build    # static export to out/
npm run lint     # eslint, must be clean
npx serve out    # serve the built static output locally
```

## Deploy (Cloudflare) — Git-connected, static assets via Wrangler

Cloudflare’s current UI often requires a **Deploy command** and will otherwise run
`npx wrangler deploy`, which auto-detects Next.js and tries OpenNext/Workers — that path
breaks with `output: 'export'` (no standalone server bundle). This repo has a
`wrangler.jsonc` that only serves the static `out/` directory (no Worker script, no OpenNext).

Dashboard settings:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Build output directory: `out` (if the field is shown)
- Do **not** use an OpenNext / “full Next.js on Workers” preset
- Environment variables:
  - `NEXT_PUBLIC_STRIPE_CHECKOUT_URL` (real Stripe Payment Link)
  - `NEXT_PUBLIC_SITE_URL` (production origin, e.g. `https://example.com` — required so
    Open Graph / Twitter image URLs resolve absolutely via `metadataBase`)
  - `NEXT_PUBLIC_FORMBRICKS_URL` (optional — `content.ts` has a working default; set only to
    swap the embedded booking survey without a code edit. See "Formbricks embed")

## Social images (OG + favicon)

Static App Router metadata files (picked up automatically; works with `output: 'export'`):

- `app/opengraph-image.png` — 1200×630 share card (blueprint navy + gold, MJW mark)
- `app/icon.png` — favicon.

The MJW mark: `icon-source-2160.png` at the **repo root** is the 2160px original (kept out of
`public/` on purpose — see below; it's not served). Two derivatives are committed and used:

```
sips -Z 256 --setProperty formatOptions 85 icon-source-2160.png --out app/icon.png        # favicon
sips -Z 400 --setProperty formatOptions 90 icon-source-2160.png --out public/mjw-mark.png  # hero mark, left of the hero copy on both pages
```

**Never put the mark at `public/icon.png`** — that path collides with the `app/icon.png`
metadata route (`/icon.png` then 500s in dev; in a static export `public/` silently loses).
That's why the hero image is `public/mjw-mark.png`, not the favicon file.

The OG image was generated once via `ImageResponse` + curl, then committed as a PNG. To regenerate,
temporarily reintroduce `app/opengraph-image.tsx` / `app/icon.tsx` (`dynamic = "force-static"`
required under static export), `npm run dev`, curl the routes, replace the PNGs, remove the
`.tsx` files. Do not leave a runtime OG API route — that breaks the static-export deploy target.

## Growing this site

The second route (`/book-the-author`, Sept 2026) triggered the first split, done minimally:

- `app/ui.tsx` — the pieces both pages use: `BuyButton`, `CornerMark`, `Eyebrow`, `Footer`.
- `app/nav.tsx` — the shared nav (see "Motion").
- `app/formbricks-embed.tsx` — the form embed (see "Formbricks embed").
- Section components stay **colocated** in their page file: `Hero`/`BookSection`/`About` in
  `app/page.tsx`, `BookingSection`/`SettingCard`/`RequestSection` in `app/book-the-author/page.tsx`.

Still no `components/` directory — a flat `app/*.tsx` per shared piece is enough. Add one only
when the shared surface outgrows a handful of files. `content.ts` is still one file; revisit
per-section splitting if it keeps growing. Resist abstraction for its own sake.

## Motion

Pure CSS, zero JavaScript. All keyframes and motion utility classes live in `app/globals.css`;
page files only add class names — no structural changes, no `"use client"` anywhere in the app.

**Nav toggle** (`app/nav.tsx`, `.nav-*` in `globals.css`): the mobile hamburger is a hidden
`<input type="checkbox">` + `:checked` sibling selectors — no JS, no state, no `"use client"`.
Desktop shows the link list always (right edge of the hero); mobile shows a burger that
`:checked` slides a panel open. Same degradation discipline as the reveals: the only hidden
state is the mobile-closed panel, gated on an explicit `:not(:checked)`, so a CSS failure
leaves the menu **open**. Motion is plain `transition`s, already neutralised by the global
`transition-duration: 0.01ms` in the reduced-motion block.

Three layers of the ambient/scroll motion system:
- **Ambient** (always running): `.bg-blueprint` no longer self-animates — the two grid layers live
  on an oversized `::after` pseudo-element (`inset: -15%`, `pointer-events: none`) so the parallax
  below only ever animates `transform`, never `background-position` (which would repaint the whole
  section every scroll frame). Inside `@supports (animation-timeline: scroll())`, that pseudo gets
  a small symmetric `translate3d` drift (`grid-parallax` keyframe) tied to page scroll via
  `animation-timeline: scroll()` — the grid reads as a surface sitting slightly behind the content
  rather than a texture crawling on its own. Outside that `@supports` block (or with reduced
  motion) the pseudo just renders the grid statically, which is already the correct resting state.
  `.bg-blueprint` itself supplies `position: relative; overflow: hidden` to anchor and clip the
  oversized pseudo — **any real content placed inside a `.bg-blueprint` section must have its own
  `position: relative` and a `z-index` above `0`**, or it's non-positioned and paints *behind* the
  pseudo (see `.hero-glow-content` on the hero, and the `relative z-10` on About's content wrapper
  in `page.tsx`). The hero header additionally gets `.hero-glow`, a separate `::before`
  pseudo-element (not `::after` — the two can't share a slot) with a soft gold radial gradient that
  breathes/drifts on a 45s loop (`glow-drift`). Content inside `.hero-glow` needs the sibling
  `.hero-glow-content` class (`position: relative; z-index: 1`) so it paints above both pseudos.
- **Load entrance**: `.rise-in` (+ `.rise-in-2/3/4` for stagger) fades and lifts the hero's four
  elements in reading order, ~140ms apart, using the `rise-in` keyframe.
- **Scroll reveals**: `.reveal`, `.reveal-cover`, `.reveal-corner` (+ `-2/-3/-4` for the four
  corner marks), `.reveal-portrait`, and `.reveal-hairline`, all inside a single
  `@supports (animation-timeline: view())` block using native `animation-timeline: view()`. No
  IntersectionObserver, no scroll-jacking. `.reveal` reuses the exact same `rise-in` keyframe as
  the load entrance — one keyframe, two timelines. Ranges are scrubbed over a wide
  `animation-range` (`cover 45%`, `cover 35%`–`44%` for the staggered corners) so they resolve
  gradually across scroll rather than snapping in. Corner-mark stagger is done via
  `animation-range` offsets, not `animation-delay` (percentage delays on non-monotonic timelines
  are inconsistent across engines).

**The load-bearing safety rule:** no motion utility's base class ever sets `opacity: 0` or a
hiding `transform`. Hidden state exists *only* inside each `@keyframes … { from { ... } }` block.
Every element's resting/authored CSS is already its final visible state. This is what makes three
different degradation paths collapse to "fully visible" for free, with zero extra code:
- `@supports` miss (old Safari, etc.) → the scroll-reveal rules never apply → visible.
- `prefers-reduced-motion: reduce` → `animation: none !important` on every motion utility →
  visible (see the media query at the bottom of `globals.css`, which lists the utilities
  explicitly rather than blanket-overriding `animation-duration`, since a near-zero duration can
  strand a scroll-scrubbed element mid-keyframe).
- CSS fails to load / JS disabled → same story, static HTML is already the correct visible markup.

**Ken-burns note:** the portrait's slow zoom (`.reveal-portrait`, `portrait-kenburns` keyframe) is
applied to the `<Image>` itself, *not* to the `overflow-hidden` wrapper div around it. Scaling the
same element that owns the clip boundary scales the clip along with it (no visual crop/pan
happens); scaling only the image inside a static clipped frame gives a real ken-burns effect.

If you add a new scroll-revealed element, follow the same pattern: pick (or add) a keyframe with
only non-hiding properties in its base state, put the hidden/offset state in `from`/`0%`, add the
class inside the `@supports` block with an `animation-range`, and add the class to the reduced-
motion override list.

## Standing instruction: record durable knowledge

When you (an agent) learn something durable about this project — a gotcha, a decision and its
reasoning, a deploy quirk, anything a future agent would otherwise have to rediscover — append it
here, or create a new `docs/*.md` for a topic substantial enough to deserve its own file. If you
create a new `docs/*.md`, add a one-line pointer to it in `AGENTS.md`.
