'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { navLinks } from '@/data/portfolio';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-ink shadow-manga' : 'bg-ink/90'
      }`}
    >
      <nav className="mx-auto flex max-w-page items-center justify-between px-4 py-2 md:px-6">
        <Link
          href="/"
          className="border-2 border-paper px-2 py-0.5 font-display text-lg tracking-widest text-paper"
        >
          FAHD
        </Link>
        <div className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-2.5 py-1 font-body text-[0.6rem] font-black uppercase tracking-[0.18em] text-paper/70 transition hover:bg-red hover:text-paper"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <button
          onClick={() => setMenuOpen((p) => !p)}
          className="flex h-8 w-8 items-center justify-center border border-paper/30 text-paper md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>
      {menuOpen && (
        <div className="border-t border-paper/20 bg-ink md:hidden">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block border-b border-paper/10 px-6 py-3 font-body text-xs font-black uppercase tracking-[0.15em] text-paper/80 transition hover:bg-red hover:text-paper"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
