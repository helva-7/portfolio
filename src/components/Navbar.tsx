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
      <nav className="mx-auto flex max-w-page items-center justify-between px-4 py-2 md:px-6">
        <Link
          href="/"
          className="border border-paper/40 px-2.5 py-1 font-display text-sm tracking-[0.22em] text-paper"
        >
          FAHD / 01
        </Link>
        <div className="hidden items-center gap-4 md:flex">
          <span className="font-body text-[0.55rem] font-black uppercase tracking-[0.24em] text-paper/55">
            Junior DevOps &amp; Cloud Security Engineer
          </span>
          <Link
            href="#contact"
            className="border border-paper/35 px-3 py-1.5 font-body text-[0.55rem] font-black uppercase tracking-[0.18em] text-paper transition hover:border-[#e2a33a] hover:bg-[#8e2747]"
          >
            Contact
          </Link>
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
