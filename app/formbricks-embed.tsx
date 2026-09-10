// Formbricks form embed — a plain <iframe> to a self-hosted Formbricks survey
// (forms.nccvaldosta.com). A deliberate, approved exception to CLAUDE.md's
// "no external runtime calls": same reasoning as Stripe — Formbricks owns form
// capture, validation, storage, and notifications. No backend of ours, no
// secret, no Cloudflare Function, no "use client" — it's just markup.
//
// Empty `src` ⇒ a "coming soon" placeholder, mirroring BuyButton's empty-URL branch.

type Props = {
  src: string;
  /** shown in the placeholder copy */
  title: string;
  tone?: "onNavy" | "onPage";
};

export function FormbricksEmbed({ src, title, tone = "onNavy" }: Props) {
  if (!src) {
    const body = tone === "onPage" ? "text-page-muted" : "text-gold-pale/80";
    const label = tone === "onPage" ? "text-gold-deep" : "text-gold";
    const frame =
      tone === "onPage" ? "border-page-muted/30 bg-page-muted/5" : "border-navy-line/60 bg-ink/20";
    return (
      <div className={`border px-6 py-10 text-center ${frame}`}>
        <p className={`font-mono text-xs font-medium uppercase tracking-[0.3em] ${label}`}>
          Booking form
        </p>
        <p className={`mt-3 ${body}`}>
          The {title.toLowerCase()} is being finalized. Check back shortly, or reach Michael with
          the contact details above.
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-[80dvh] overflow-auto bg-page">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        className="absolute left-0 top-0 h-full w-full border-0"
      />
    </div>
  );
}
