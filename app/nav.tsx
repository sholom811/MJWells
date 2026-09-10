import Link from "next/link";
import { nav } from "@/content";

// First shared component. Flat file in app/ (no components/ dir until more than
// nav needs it) — see CLAUDE.md "Growing this site".
//
// Zero JavaScript: the open/close is a hidden checkbox + `:checked` sibling
// selectors, all styling/motion in globals.css (.nav-*). Degrades safely — if
// CSS never loads, the raw checkbox + label + list are all visible and usable.

const LINKS = [
  { href: "/", label: nav.home },
  { href: "/book-the-author", label: nav.booking },
];

export function Nav({ tone = "onNavy" }: { tone?: "onNavy" | "onPage" }) {
  const linkColor =
    tone === "onPage"
      ? "text-gold-deep hover:text-page-ink"
      : "text-gold-pale/85 hover:text-gold-pale";

  return (
    <nav
      aria-label="Primary"
      className="nav absolute right-6 top-6 z-20 sm:right-10 sm:top-8 lg:right-16"
    >
      <input
        type="checkbox"
        id="nav-toggle"
        className="nav-toggle peer sr-only"
        aria-label="Show navigation menu"
      />

      {/* Hamburger — mobile only. Wraps the checkbox label so Space/Enter and
          taps both toggle it; focus ring comes from the global :focus-visible. */}
      <label htmlFor="nav-toggle" className="nav-burger" aria-hidden="true">
        <span className="nav-burger-bar" />
        <span className="nav-burger-bar" />
        <span className="nav-burger-bar" />
      </label>

      <ul className="nav-list font-mono text-[0.8rem] font-medium uppercase tracking-[0.22em]">
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className={`block whitespace-nowrap py-1 transition-colors duration-150 ${linkColor}`}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
