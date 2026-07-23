'use client';

import { useEffect, useRef } from 'react';
import { animateOccultSigil } from '@/lib/manga-anime';

interface MangaOccultSigilProps {
  className?: string;
  label?: string;
}

export default function MangaOccultSigil({ className = '', label = 'ODDITY / SIGIL' }: MangaOccultSigilProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const animation = animateOccultSigil(root);
    return () => {
      animation?.pause?.();
      animation?.revert?.();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`occult-sigil ${className}`}
      aria-hidden
      data-anime-sigil
    >
      <span className="occult-sigil__label">{label}</span>

      <svg className="occult-sigil__svg" viewBox="0 0 120 120" role="presentation">
        <circle className="occult-sigil__ring occult-sigil__ring--outer" cx="60" cy="60" r="54" />
        <circle className="occult-sigil__ring occult-sigil__ring--mid" cx="60" cy="60" r="38" />
        <circle className="occult-sigil__ring occult-sigil__ring--inner" cx="60" cy="60" r="22" />
        <polygon className="occult-sigil__core" points="60,28 82,72 38,72" />
        {Array.from({ length: 8 }).map((_, index) => {
          const angle = (index / 8) * Math.PI * 2;
          const x1 = 60 + Math.cos(angle) * 46;
          const y1 = 60 + Math.sin(angle) * 46;
          const x2 = 60 + Math.cos(angle) * 54;
          const y2 = 60 + Math.sin(angle) * 54;
          return (
            <line
              key={index}
              className="occult-sigil__tick"
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
            />
          );
        })}
      </svg>

      <span className="occult-sigil__caption">怪異 / OBSERVED</span>
    </div>
  );
}
