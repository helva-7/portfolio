'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { animateOccultDictionary } from '@/lib/manga-anime';

interface MangaDictionaryRevealProps {
  children: ReactNode;
  className?: string;
  'aria-label'?: string;
}

export default function MangaDictionaryReveal({
  children,
  className = '',
  'aria-label': ariaLabel,
}: MangaDictionaryRevealProps) {
  const cardRef = useRef<HTMLElement>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || hasPlayedRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasPlayedRef.current) return;

        hasPlayedRef.current = true;
        animateOccultDictionary(card);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <aside ref={cardRef} className={`dictionary-card ${className}`.trim()} aria-label={ariaLabel}>
      {children}
    </aside>
  );
}
