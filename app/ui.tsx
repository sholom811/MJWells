// Shared page primitives. Lifted out of page.tsx once book-the-author/ became a
// second consumer (see CLAUDE.md "Growing this site"). Section components stay
// colocated in their page files — only these small reused pieces live here.

import { author, book } from "@/content";

const year = new Date().getFullYear();

/** Buy CTA. Stripe is a plain hosted Payment Link — no SDK, no API route.
 *  If the env var is unset/empty, render a disabled "Coming soon" control
 *  instead of a dead link. This is the one bit of branching logic here. */
export function BuyButton({ className = "" }: { className?: string }) {
  const base =
    "inline-flex items-center gap-3 border-2 px-7 py-3.5 font-mono text-[0.8rem] font-medium uppercase tracking-[0.16em]";

  if (!book.checkoutUrl) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        className={`${base} cursor-not-allowed border-navy-line text-navy-line ${className}`}
      >
        Coming soon
      </button>
    );
  }

  return (
    <a
      href={book.checkoutUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} group border-gold bg-gold text-ink transition-colors duration-150 hover:border-[#a97b3f] hover:bg-[#a97b3f] ${className}`}
    >
      Buy the Book
      <span aria-hidden="true" className="buy-button-arrow">
        &rarr;
      </span>
    </a>
  );
}

/** Small architectural registration mark — corner-bracket motif lifted
 *  straight from the drafting marks printed on the cover art. Used to frame
 *  the cover so the page and the physical book read as one object. */
export function CornerMark({
  position,
  tone = "gold",
}: {
  position: "tl" | "tr" | "bl" | "br";
  tone?: "gold" | "gold-deep";
}) {
  const sides: Record<string, string> = {
    tl: "top-0 left-0 border-t-2 border-l-2",
    tr: "top-0 right-0 border-t-2 border-r-2",
    bl: "bottom-0 left-0 border-b-2 border-l-2",
    br: "bottom-0 right-0 border-b-2 border-r-2",
  };
  const toneClass = tone === "gold-deep" ? "border-gold-deep" : "border-gold";
  const revealClass: Record<string, string> = {
    tl: "reveal-corner",
    tr: "reveal-corner reveal-corner-2",
    bl: "reveal-corner reveal-corner-3",
    br: "reveal-corner reveal-corner-4",
  };
  return (
    <span
      aria-hidden="true"
      className={`absolute h-6 w-6 ${toneClass} ${sides[position]} ${revealClass[position]}`}
    />
  );
}

/** Small mono uppercase label. `tone="onPage"` swaps in the darkened gold so
 *  the label still clears 4.5:1 against the cream book section — the plain
 *  gold reads fine on navy but is too light against cream. */
export function Eyebrow({
  children,
  tone = "onNavy",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "onNavy" | "onPage";
  className?: string;
}) {
  const color = tone === "onPage" ? "text-gold-deep" : "text-gold";
  return (
    <p className={`font-mono text-xs font-medium uppercase tracking-[0.3em] ${color} ${className}`}>
      {children}
    </p>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink px-6 py-12 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 text-sm text-gold sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono uppercase tracking-[0.2em]">
          &copy; {year} {author.name}
        </p>
        {author.email && (
          <a
            href={`mailto:${author.email}`}
            className="font-mono uppercase tracking-[0.2em] text-gold hover:text-gold-pale"
          >
            {author.email}
          </a>
        )}
      </div>
    </footer>
  );
}
