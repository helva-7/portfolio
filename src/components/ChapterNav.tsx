import Link from 'next/link';
import { navLinks } from '@/data/portfolio';

export default function ChapterNav() {
  return (
    <nav className="chapter-rail" aria-label="Chapter navigation">
      <div className="chapter-rail__inner">
        <span className="chapter-rail__label">CONTENTS</span>
        {navLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="chapter-rail__link"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
