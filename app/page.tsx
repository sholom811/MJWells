import Image from "next/image";
import { author, bio, book } from "@/content";

const year = new Date().getFullYear();

/** Buy CTA. Square is a plain hosted payment link — no SDK, no API route.
 *  If the env var is unset/empty, render a disabled "Coming soon" control
 *  instead of a dead link. This is the one bit of branching logic here. */
function BuyButton({ className = "" }: { className?: string }) {
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
function CornerMark({
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
function Eyebrow({
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

function Hero() {
  return (
    <header className="bg-blueprint hero-glow relative overflow-hidden px-6 pb-20 pt-28 sm:px-10 sm:pt-36 lg:px-16">
      <div className="hero-glow-content mx-auto flex max-w-3xl flex-col items-start gap-8">
        <Eyebrow className="rise-in">A New Book by {author.name}</Eyebrow>

        <h1 className="rise-in rise-in-2 font-display text-[clamp(2.75rem,9vw,6rem)] font-medium leading-[0.96] tracking-tight text-gold-pale">
          {book.title}
        </h1>

        <p className="rise-in rise-in-3 font-display max-w-xl text-xl italic leading-relaxed text-gold-pale/80 sm:text-2xl">
          {book.subtitle}
        </p>

        <div className="rise-in rise-in-4 pt-4">
          <BuyButton />
        </div>
      </div>
    </header>
  );
}

function BookSection() {
  return (
    <section
      aria-labelledby="the-book"
      className="bg-page px-6 py-20 text-page-ink sm:px-10 sm:py-28 lg:px-16"
    >
      <div className="mx-auto grid max-w-5xl gap-14 lg:grid-cols-[minmax(0,320px)_1fr] lg:items-center lg:gap-20">
        <figure className="mx-auto w-full max-w-[320px]">
          <div className="relative">
            <Image
              src={book.cover}
              alt={book.coverAlt}
              width={933}
              height={1400}
              sizes="(min-width: 1024px) 320px, 70vw"
              className="reveal-cover w-full"
              priority
            />
            <CornerMark position="tl" tone="gold-deep" />
            <CornerMark position="tr" tone="gold-deep" />
            <CornerMark position="bl" tone="gold-deep" />
            <CornerMark position="br" tone="gold-deep" />
          </div>
          <figcaption className="mt-4 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-page-muted">
            <span aria-hidden="true" className="reveal-hairline h-px flex-1 bg-page-muted/30" />
            Fig. 01 — First Edition
            <span aria-hidden="true" className="reveal-hairline h-px flex-1 bg-page-muted/30" />
          </figcaption>
        </figure>

        <div className="flex flex-col items-start gap-6">
          <Eyebrow tone="onPage" className="reveal">The Book</Eyebrow>
          <h2 id="the-book" className="reveal font-display text-4xl font-medium leading-tight sm:text-5xl">
            {book.title}
          </h2>
          <p className="reveal max-w-prose text-lg leading-relaxed text-page-muted">
            {book.blurb}
          </p>
          {book.price !== null && (
            <p className="reveal font-mono text-sm uppercase tracking-[0.2em] text-page-ink">
              ${book.price}
            </p>
          )}
          <BuyButton />
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      aria-labelledby="about-michael"
      className="bg-blueprint px-6 py-20 sm:px-10 sm:py-28 lg:px-16"
    >
      <div className="relative z-10 mx-auto grid max-w-5xl gap-14 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-20">
        <div className="mx-auto w-full max-w-[300px] border border-navy-line/60 p-2 lg:mx-0 lg:h-full lg:max-w-none">
          <div className="relative aspect-[2/3] h-full w-full overflow-hidden lg:aspect-auto lg:min-h-[28rem]">
            <Image
              src={bio.portrait}
              alt={bio.portraitAlt}
              fill
              sizes="(min-width: 1024px) 300px, 80vw"
              className="reveal-portrait object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col items-start gap-6">
          <Eyebrow className="reveal">Montana &rarr; Georgia, since 1997</Eyebrow>
          <h2 id="about-michael" className="reveal font-display text-4xl font-medium leading-tight text-gold-pale sm:text-5xl">
            About {author.name}
          </h2>
          <div className="reveal flex max-w-prose flex-col gap-5 text-lg leading-relaxed text-gold-pale/85">
            {bio.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
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

export default function Page() {
  return (
    <>
      <Hero />
      <main>
        <BookSection />
        <About />
      </main>
      <Footer />
    </>
  );
}
