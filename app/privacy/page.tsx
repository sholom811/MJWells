import type { Metadata } from "next";
import { author, booking, privacy } from "@/content";
import { Footer } from "../ui";
import { Nav } from "../nav";

export const metadata: Metadata = {
  title: `${privacy.title} | ${author.name}`,
  description: `Privacy policy for ${author.name}'s website.`,
};

export default function PrivacyPage() {
  return (
    <>
      <main className="relative bg-page px-6 pb-24 pt-28 text-page-ink sm:px-10 lg:px-16">
        <Nav tone="onPage" />
        <article className="mx-auto max-w-2xl leading-relaxed">
          <h1 className="font-display text-4xl font-medium">{privacy.title}</h1>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-page-muted">
            Last updated: {privacy.updated}
          </p>
          <p className="mt-8">{privacy.intro}</p>

          {privacy.sections.map((s) => (
            <section key={s.heading} className="mt-10">
              <h2 className="font-display text-2xl font-medium">{s.heading}</h2>
              {s.paragraphs?.map((p) => (
                <p key={p} className="mt-3">
                  {p}
                </p>
              ))}
              {s.items && (
                <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-gold-deep">
                  {s.items.map((i) => (
                    <li key={i.text}>
                      {i.lead && <strong className="font-semibold">{i.lead} </strong>}
                      {i.text}
                    </li>
                  ))}
                </ul>
              )}
              {s.after && <p className="mt-3">{s.after}</p>}
            </section>
          ))}

          <section className="mt-10">
            <h2 className="font-display text-2xl font-medium">{privacy.contactHeading}</h2>
            <p className="mt-3">
              <a
                href={`mailto:${booking.contact.email}`}
                className="underline decoration-gold-deep underline-offset-4"
              >
                {booking.contact.email}
              </a>
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
