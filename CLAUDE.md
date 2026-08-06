# CLAUDE.md

Project instructions for agents working on this repo. Read this before making changes.

## What this is

A one-page author portfolio site for Michael J. Wells, pastor and author of *The Nehemiah
Blueprint: Redeeming Brokenness Through Visionary Leadership*. Four sections on a single route:
hero, book + buy, about/bio, footer. Nothing else — no blog, no CMS, no analytics, no contact
form, no additional routes. See "Growing this site" below for when that's allowed to change.

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

## Checkout: Square hosted Payment Link, not the SDK

The buy button is a plain `<a>` tag to a Square-hosted payment page, whose URL comes from
`NEXT_PUBLIC_SQUARE_CHECKOUT_URL`. Square owns card capture, tax, shipping, receipts, and PCI
compliance entirely on their hosted page. We never embed the Square Web Payments SDK, never call
a Square API, never handle a card number. This is what makes the static-export/no-backend
constraint above actually work for a real e-commerce flow — don't "upgrade" this to an embedded
checkout without revisiting the deploy target.

The env var is `NEXT_PUBLIC_*` on purpose: it's inlined into the static HTML at build time, and
that's fine because a checkout link is meant to be public (it's the thing customers click). There
is no secret here.

**Empty-URL behavior:** if `NEXT_PUBLIC_SQUARE_CHECKOUT_URL` is unset or empty, the buy button
renders as a disabled "Coming soon" `<button>` instead of a dead link. See `BuyButton` in
`app/page.tsx` — this is the one piece of branching logic in the whole page, and the only thing
here that's ever been worth a test.

## Where content lives

All copy — author name, book title/subtitle/blurb/price, bio paragraphs, image paths and alt
text — lives in `content.ts` at the repo root. **Never hardcode copy directly in JSX.** This is
the single place Michael (or an agent on his behalf) edits to change what the site says.

Two fields are marked `// TODO` in `content.ts` pending real input from Michael:
- `book.price` — currently `null`. The price line only renders when this is non-null.
- `book.blurb` — currently a placeholder holding blurb written from the title/subtitle. Replace
  with Michael's real back-cover copy when he supplies it.

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

## Deploy (Cloudflare Pages) — documented, not automated

No deploy has been run or connected from this repo. When someone does connect it:

- Framework preset: **Next.js (Static HTML Export)**
- Build command: `npm run build`
- Build output directory: `out`
- Environment variables:
  - `NEXT_PUBLIC_SQUARE_CHECKOUT_URL` (real Square payment link)
  - `NEXT_PUBLIC_SITE_URL` (production origin, e.g. `https://example.com` — required so
    Open Graph / Twitter image URLs resolve absolutely via `metadataBase`)

## Social images (OG + favicon)

Static App Router metadata files (picked up automatically; works with `output: 'export'`):

- `app/opengraph-image.png` — 1200×630 share card (blueprint navy + gold, MJW mark)
- `app/icon.png` — circular MJW monogram favicon

These were generated once via `ImageResponse` + curl, then committed as PNGs. To regenerate,
temporarily reintroduce `app/opengraph-image.tsx` / `app/icon.tsx` (`dynamic = "force-static"`
required under static export), `npm run dev`, curl the routes, replace the PNGs, remove the
`.tsx` files. Do not leave a runtime OG API route — that breaks the static-export deploy target.

## Growing this site

Deliberately lazy right now: one `app/page.tsx` with section components (`Hero`, `BookSection`,
`About`, `Footer`, plus small helpers `BuyButton`, `CornerMark`, `Eyebrow`) colocated in that same
file, no `components/` directory. This is correct for a single page — don't split it into
`components/` preemptively.

Split it out when a second thing that needs those pieces actually shows up: a second page/route,
a second author, or a component reused in more than one place. At that point also reconsider
whether `content.ts` should become per-section files. Until then, resist adding abstraction for
its own sake.

## Motion

Pure CSS, zero JavaScript. All keyframes and motion utility classes live in `app/globals.css`;
`app/page.tsx` only adds class names — no structural changes, no `"use client"`.

Three layers:
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
