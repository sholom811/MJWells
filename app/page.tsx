import Image from "next/image";
import { author, bio, book } from "@/content";
import { BuyButton, CornerMark, Eyebrow, Footer } from "./ui";
import { Nav } from "./nav";

function Hero() {
  return (
    <header className="bg-blueprint hero-glow relative overflow-hidden px-6 pb-20 pt-28 sm:px-10 sm:pt-36 lg:px-16">
      <Nav />
      <div className="hero-glow-content mx-auto flex max-w-5xl flex-col items-start gap-6 sm:flex-row sm:items-start sm:gap-10">
        {/* Wordmark, repeated from the favicon — decorative, the name is in the copy.
            Sized and nudged down so it spans the two lines of the headline beside it
            (sm:mt clears the eyebrow + gap above the <h1>). */}
        <Image
          src="/mjw-mark.png"
          alt=""
          width={400}
          height={400}
          priority
          className="h-24 w-24 shrink-0 self-start sm:mt-[2.9rem] sm:h-[clamp(5.5rem,17vw,11.5rem)] sm:w-[clamp(5.5rem,17vw,11.5rem)]"
        />

        <div className="flex flex-col items-start gap-8">
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
