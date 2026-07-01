import Link from 'next/link';
import { navLinks } from '@/data/portfolio';

export default function ChapterNav() {
  return (
    <nav className="sticky top-12 z-40 border-y-[4px] border-ink bg-paper shadow-manga">
      <div className="mx-auto flex max-w-page items-center overflow-x-auto px-2 py-0 md:px-4">
        <span className="mr-3 hidden shrink-0 border-r-2 border-ink/30 pr-3 font-display text-sm tracking-widest text-ink/60 md:block">
          CONTENTS
        </span>
        {navLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="shrink-0 border-r border-ink/20 px-3 py-2.5 font-body text-[0.55rem] font-black uppercase tracking-[0.18em] text-ink/70 transition hover:bg-ink hover:text-paper"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
