'use client';

import { animate, stagger } from 'animejs';
import { useEffect } from 'react';

/**
 * Global artistic touches that don't fit per-component hooks:
 *  - signs the section eyebrows ("PROJECT ARCHIVE", "ODDITY / ARCHIVE", etc.)
 *    with an ink-pen char-by-char reveal as they scroll in
 *  - draws the "stamps" (red/yellow/blue) with a tiny stamp-down motion
 *  - floats the portrait labels with a slow bob
 *
 * The component renders nothing — it just queries the DOM after mount.
 */
export default function ArtisticMotion() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Helper: sign an element's text content char-by-char
    function signText(el: HTMLElement) {
      if (el.dataset.inked === '1') return;
      const original = el.textContent ?? '';
      if (!original.trim()) return;
      el.dataset.inked = '1';
      el.textContent = '';
      el.classList.add('is-ink-signing');

      const chars = original.split('');
      const spans: HTMLSpanElement[] = [];
      chars.forEach((c) => {
        const s = document.createElement('span');
        s.className = 'ink-char';
        s.textContent = c === ' ' ? '\u00A0' : c;
        el.appendChild(s);
        spans.push(s);
      });

      animate(spans, {
        opacity: [0, 1],
        translateY: [6, 0],
        duration: 70,
        delay: stagger(22, { start: 60 }),
        ease: 'out(2)',
        onComplete: () => el.classList.add('is-ink-signed'),
      });
    }

    // 1) Sign section eyebrows when they enter the viewport
    const eyebrowTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.paper-card__label, .paper-card__stamp, .project-file__case-label, .scene-sheet__kicker',
      ),
    );

    const eyebrowObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            signText(entry.target as HTMLElement);
            eyebrowObserver.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.4 },
    );

    eyebrowTargets.forEach((el) => eyebrowObserver.observe(el));

    // 2) Animate the "stat sheet" number counters on first paint
    const counters = Array.from(document.querySelectorAll<HTMLElement>('[data-counter]'));
    const counterObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const end = parseFloat(el.dataset.counter || '0');
            const decimals = parseInt(el.dataset.decimals || '0', 10);
            const obj = { v: 0 };
            animate(obj, {
              v: end,
              duration: 1600,
              ease: 'out(3)',
              onUpdate: () => {
                el.textContent = obj.v.toFixed(decimals);
              },
            });
            counterObserver.unobserve(el);
          }
        }
      },
      { threshold: 0.5 },
    );
    counters.forEach((el) => counterObserver.observe(el));

    // 3) Slow bob for any element marked .art-bob
    const bobs = Array.from(document.querySelectorAll<HTMLElement>('.art-bob'));
    bobs.forEach((el, i) => {
      animate(el, {
        translateY: [
          { to: -6, duration: 2400, ease: 'inOut(2)' },
          { to: 0, duration: 2400, ease: 'inOut(2)' },
        ],
        delay: i * 180,
        loop: true,
      });
    });

    return () => {
      eyebrowObserver.disconnect();
      counterObserver.disconnect();
    };
  }, []);

  // The component renders nothing — it just queries the DOM after mount.
  return null;
}
