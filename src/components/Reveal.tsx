'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
}

export default function Reveal({ children, className, delay = 0, direction = 'up' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dirClass =
    direction === 'up'
      ? 'translate-y-12'
      : direction === 'left'
        ? '-translate-x-16'
        : direction === 'right'
          ? 'translate-x-16'
          : '';

  return (
    <div
      ref={ref}
      className={`${className || ''} transition-all duration-700 ease-out will-change-transform ${
        revealed ? 'translate-x-0 translate-y-0 opacity-100' : `${dirClass} opacity-0`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
