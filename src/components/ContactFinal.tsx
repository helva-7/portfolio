import Link from 'next/link';
import { profile } from '@/data/portfolio';

export default function ContactFinal() {
  return (
    <section id="contact" className="relative z-10 mx-auto min-h-screen max-w-page px-4 py-24 md:px-6">
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <div className="mb-4">
          <span className="border-[3px] border-ink bg-ink px-4 py-1.5 font-body text-[0.55rem] font-black uppercase tracking-[0.2em] text-paper">
            FINAL PAGE
          </span>
        </div>

        <div className="relative mt-8 max-w-4xl">
          <div className="pointer-events-none absolute -inset-4 -z-10 bg-yellow/20" />
          <h2 className="font-comic text-[clamp(2.2rem,8vw,6rem)] leading-[0.85] tracking-wide text-ink">
            &ldquo;{profile.finalQuote}&rdquo;
          </h2>
        </div>

        <p className="mt-8 max-w-lg font-body text-base font-bold leading-7 text-ink/70">
          {profile.role}. Based in Morocco. Open to remote and on-site opportunities.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex min-h-[48px] items-center border-[4px] border-ink bg-ink px-7 py-3 font-body text-xs font-black uppercase tracking-[0.15em] text-paper shadow-manga-red transition hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            ✉ Email
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center border-[4px] border-ink bg-paper px-7 py-3 font-body text-xs font-black uppercase tracking-[0.15em] text-ink shadow-manga transition hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center border-[4px] border-ink bg-paper px-7 py-3 font-body text-xs font-black uppercase tracking-[0.15em] text-ink shadow-manga transition hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            LinkedIn
          </a>
        </div>

        <div className="mt-16 border-t-4 border-ink/20 pt-8">
          <p className="font-body text-[0.5rem] font-black uppercase tracking-[0.25em] text-ink/40">
            One more chapter always follows.
          </p>
        </div>
      </div>
    </section>
  );
}
