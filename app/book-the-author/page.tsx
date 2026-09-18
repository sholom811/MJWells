import type { Metadata } from "next";
import Image from "next/image";
import { author, booking } from "@/content";
import { Eyebrow, Footer } from "../ui";
import { Nav } from "../nav";
import { FormbricksEmbed } from "../formbricks-embed";

const description = `Book ${author.name} to speak at your church, conference, business, or leadership network.`;

export const metadata: Metadata = {
  title: `Book the Author | ${author.name}`,
  description,
  openGraph: { title: "Book the Author", description, type: "website" },
  twitter: { card: "summary_large_image", title: "Book the Author", description },
};

type Context = (typeof booking.church.settings)[number];

function SettingCard({ setting, tone }: { setting: Context; tone: "onNavy" | "onPage" }) {
  const border = tone === "onPage" ? "border-page-muted/25" : "border-navy-line/50";
  const fill = tone === "onNavy" ? "bg-ink/90" : "";
  const term = tone === "onPage" ? "text-page-muted" : "text-gold-pale/55";
  const body = tone === "onPage" ? "text-page-ink" : "text-gold-pale/90";
  const rows: [string, string][] = [
    ["Format", setting.format],
    ["Audience", setting.audience],
    ["Session length", setting.length],
    ["Add-ons", setting.addOns],
    ["Timeline", setting.timeline],
  ];
  return (
    <div
      className={`reveal row-span-6 grid grid-rows-subgrid gap-3 border p-4 sm:p-6 ${border} ${fill}`}
    >
      <h4 className="font-display text-xl font-medium">{setting.name}</h4>
      <dl className="contents text-sm leading-relaxed">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt className={`font-mono text-[0.7rem] uppercase tracking-[0.2em] ${term}`}>{k}</dt>
            <dd className={`mt-1 ${body}`}>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function BookingSection({
  id,
  data,
  tone,
}: {
  id: string;
  data: typeof booking.church | typeof booking.business;
  tone: "onNavy" | "onPage";
}) {
  const onPage = tone === "onPage";
  const sectionClass = onPage
    ? "bg-page text-page-ink"
    : "bg-blueprint text-gold-pale";
  const heading = onPage ? "text-page-ink" : "text-gold-pale";
  const muted = onPage ? "text-page-muted" : "text-gold-pale/85";
  const marker = onPage ? "marker:text-gold-deep" : "marker:text-gold";

  const frame = onPage ? "border-page-muted/25" : "border-navy-line/60";

  return (
    <section
      aria-labelledby={`${id}-events`}
      className={`${sectionClass} px-6 py-20 sm:px-10 sm:py-28 lg:px-16`}
    >
      <div className="relative z-10 mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-[minmax(0,260px)_1fr] lg:gap-16">
        <div className={`mx-auto w-full max-w-[260px] border p-2 lg:mx-0 ${frame}`}>
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src={data.portrait}
              alt={data.portraitAlt}
              fill
              sizes="(min-width: 1024px) 260px, 70vw"
              className="reveal-portrait object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <Eyebrow tone={tone} className="reveal">{data.eyebrow}</Eyebrow>
          <h2
            id={`${id}-events`}
            className={`reveal font-display text-4xl font-medium leading-tight sm:text-5xl ${heading}`}
          >
            {data.title}
          </h2>

          <p className={`reveal max-w-prose text-lg leading-relaxed ${muted}`}>{data.bio}</p>

        <div className="reveal flex flex-col gap-3">
          <h3 className={`font-mono text-xs font-medium uppercase tracking-[0.3em] ${onPage ? "text-gold-deep" : "text-gold"}`}>
            Speaking emphases
          </h3>
          <ul className={`flex max-w-prose list-disc flex-col gap-2 pl-5 text-lg leading-relaxed ${muted} ${marker}`}>
            {data.emphases.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className={`reveal font-mono text-xs font-medium uppercase tracking-[0.3em] ${onPage ? "text-gold-deep" : "text-gold"}`}>
            What a visit looks like
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {data.settings.map((s) => (
              <SettingCard key={s.name} setting={s} tone={tone} />
            ))}
          </div>
        </div>

        <div className="reveal flex max-w-prose flex-col gap-2 text-sm leading-relaxed">
          {booking.logistics.map((l) => (
            <p key={l.slice(0, 24)} className={muted}>
              {l}
            </p>
          ))}
          <p className={muted}>{booking.leadTime}</p>
        </div>

        <a
          href="#request"
          className={`reveal group mt-2 inline-flex self-start items-center gap-3 border-2 px-7 py-3.5 font-mono text-[0.8rem] font-medium uppercase tracking-[0.16em] transition-colors duration-150 ${
            onPage
              ? "border-gold-deep text-gold-deep hover:bg-gold-deep hover:text-page"
              : "border-gold text-gold hover:bg-gold hover:text-ink"
          }`}
        >
            Request a booking
            <span aria-hidden="true" className="buy-button-arrow">
              &rarr;
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function RequestSection() {
  return (
    <section
      id="request"
      aria-labelledby="request-heading"
      className="bg-page px-6 py-20 text-page-ink sm:px-10 sm:py-28 lg:px-16"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <Eyebrow tone="onPage" className="reveal">{booking.form.eyebrow}</Eyebrow>
        <h2
          id="request-heading"
          className="reveal font-display text-4xl font-medium leading-tight sm:text-5xl"
        >
          {booking.form.heading}
        </h2>
        <p className="reveal max-w-prose text-lg leading-relaxed text-page-muted">
          {booking.form.body}
        </p>
        <div className="reveal mt-2">
          <FormbricksEmbed src={booking.form.url} title="Booking request form" tone="onPage" />
        </div>
      </div>
    </section>
  );
}

export default function BookTheAuthorPage() {
  return (
    <>
      <header className="bg-blueprint hero-glow relative overflow-hidden px-6 pb-16 pt-28 sm:px-10 sm:pt-36 lg:px-16">
        <Nav />
        <div className="hero-glow-content mx-auto flex max-w-4xl flex-col items-start gap-6 sm:flex-row sm:items-start sm:gap-10">
          <Image
            src="/mjw-mark.png"
            alt=""
            width={400}
            height={400}
            priority
            className="h-24 w-24 shrink-0 self-start sm:mt-11 sm:h-[clamp(6rem,12vw,9.5rem)] sm:w-[clamp(6rem,12vw,9.5rem)]"
          />
          <div className="flex flex-col items-start gap-5">
            <Eyebrow className="rise-in">{booking.intro.eyebrow}</Eyebrow>
            <p className="rise-in rise-in-2 max-w-xl text-lg leading-relaxed text-gold-pale/80">
              {booking.intro.body}
            </p>
            <div className="rise-in rise-in-3 mt-1 flex flex-col gap-1.5 border-l-2 border-gold pl-4 font-mono text-base font-medium tracking-[0.08em] text-gold-pale">
              <a href={`mailto:${booking.contact.email}`} className="hover:text-gold">
                {booking.contact.email}
              </a>
              <a
                href={`tel:${booking.contact.phone.replace(/[^0-9+]/g, "")}`}
                className="hover:text-gold"
              >
                {booking.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        <BookingSection id="church" data={booking.church} tone="onPage" />
        <BookingSection id="business" data={booking.business} tone="onNavy" />
        <RequestSection />
      </main>

      <Footer />
    </>
  );
}
