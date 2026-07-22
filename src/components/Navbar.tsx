'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { navLinks } from '@/data/portfolio';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolledRef = useRef(false);

  useEffect(() => {
    let frame = 0;

    const syncScrolled = () => {
      frame = 0;

      const nextScrolled = window.scrollY > 80;

      if (scrolledRef.current !== nextScrolled) {
        scrolledRef.current = nextScrolled;
        setScrolled(nextScrolled);
      }
    };

    const onScroll = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(syncScrolled);
    };

    syncScrolled();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-ink/92' : 'bg-ink/76'
      }`}
    >
      <nav className="mx-auto flex max-w-page items-center justify-between gap-4 px-4 py-2 md:px-6" aria-label="Main navigation">
        <Link
          href="/"
          className="border border-paper/40 px-2.5 py-1 font-display text-sm tracking-[0.22em] text-paper"
        >
          FAHD / 01
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-2 py-2 font-body text-[0.52rem] font-bold uppercase tracking-[0.12em] text-paper/70 transition-colors hover:text-paper focus-visible:bg-paper focus-visible:text-ink ${
                index === 4 ? 'ml-2 border-l border-paper/25 pl-4' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <button
          onClick={() => setMenuOpen((p) => !p)}
          className="flex h-8 w-8 items-center justify-center border border-paper/30 text-paper lg:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>
      {menuOpen && (
        <div className="border-t border-paper/20 bg-ink lg:hidden">
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
