'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { navLinks } from '@/data/portfolio';

const oddityCodes: Record<string, string> = {
  '#origin': 'IDX-01 / ORIGIN',
  '#first-builds': 'IDX-02 / PROOF',
  '#trial': 'IDX-03 / INCIDENT',
  '#craft': 'IDX-04 / METHOD',
  '#projects': 'IDX-05 / ARCHIVE',
  '#stats': 'IDX-06 / RESULT',
  '#contact': 'IDX-07 / CONTRACT',
};

export default function ChapterNav() {
  const [activeHref, setActiveHref] = useState(navLinks[0]?.href ?? '');

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveHref(`#${visible.target.id}`);
        }
      },
      { rootMargin: '-28% 0px -58% 0px', threshold: [0.12, 0.28, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="chapter-rail" aria-label="Chapter navigation">
      <div className="chapter-rail__inner">
        <span className="chapter-rail__label">ODDITY INDEX</span>
        {navLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`chapter-rail__link ${activeHref === l.href ? 'chapter-rail__link--active' : ''}`}
            aria-current={activeHref === l.href ? 'location' : undefined}
            data-code={oddityCodes[l.href] ?? l.label}
          >
            <span className="chapter-rail__code">{oddityCodes[l.href] ?? l.label}</span>
            <span className="chapter-rail__name">{l.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
