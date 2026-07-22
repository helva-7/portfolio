import { profile } from '@/data/portfolio';

export default function ContactFinal() {
  return (
    <section className="contact-finale relative z-10 mx-auto max-w-page">
      <div className="contact-finale__layout">
        <div className="contact-finale__heading">
          <p className="section-oddity">ODDITY / NEXT STATE</p>
          <span className="contact-finale__kicker border-[3px] border-ink bg-ink px-4 py-1.5 font-body text-[0.55rem] font-black uppercase tracking-[0.2em] text-paper">
            FINAL PAGE
          </span>
          <span className="contact-finale__status">NEXT ARC / OPEN</span>
        </div>

        <div className="contact-finale__quote-wrap relative mt-8 max-w-4xl">
          <div className="contact-finale__quote-plane pointer-events-none absolute -inset-4 -z-10" />
          <h2 className="contact-finale__quote font-comic text-[clamp(2.2rem,8vw,6rem)] leading-[0.85] tracking-wide text-ink">
            &ldquo;{profile.finalQuote}&rdquo;
          </h2>
        </div>

        <p className="contact-finale__body mt-8 max-w-lg font-body text-base font-bold leading-7 text-ink/70">
          {profile.role}. Based in Morocco. Open to remote and on-site opportunities.
        </p>
        <p className="redacted-note mt-4">[REDACTED] next deployment accepts remote, on-site, and difficult systems.</p>

        <div className="contact-finale__actions mt-10 flex flex-wrap gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="contact-finale__cta contact-finale__cta--primary inline-flex min-h-[48px] items-center px-7 py-3 font-body text-xs font-black uppercase tracking-[0.15em]"
          >
            Direct Email
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-finale__cta contact-finale__cta--secondary inline-flex min-h-[48px] items-center px-7 py-3 font-body text-xs font-black uppercase tracking-[0.15em]"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-finale__cta contact-finale__cta--secondary inline-flex min-h-[48px] items-center px-7 py-3 font-body text-xs font-black uppercase tracking-[0.15em]"
          >
            LinkedIn
          </a>
        </div>

        <div className="contract-seal" aria-hidden>
          <span>契約</span>
          <strong>NEXT ARC</strong>
          <em>ACCEPTED</em>
        </div>

        <div className="contact-finale__foot mt-16 border-t-4 border-ink/20 pt-8">
          <p className="font-body text-[0.5rem] font-black uppercase tracking-[0.25em] text-ink/40">
            One more chapter always follows.
          </p>
        </div>
      </div>
    </section>
  );
}
