'use client';

import { useEffect, useRef, useState } from 'react';

interface QuotePanelProps {
  text: string;
  className?: string;
  animate?: boolean;
  dark?: boolean;
  big?: boolean;
}

export default function QuotePanel({ text, className, animate = true, dark, big }: QuotePanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!animate) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [animate]);

  const words = text.split(' ');

  return (
    <div ref={ref} className={`relative ${className || ''}`}>
      <div
        className={`relative inline-block ${
          dark ? 'bg-ink text-paper' : 'bg-paper text-ink'
        } ${big ? 'border-[6px] px-6 py-5 md:px-8 md:py-6' : 'border-[4px] px-4 py-3'} border-ink`}
      >
        <div className={`flex flex-wrap gap-x-2 ${big ? 'gap-y-1' : 'gap-y-0.5'}`}>
          {words.map((word, i) => (
            <span
              key={i}
              className={`inline-block ${
                big ? 'font-comic text-2xl leading-none md:text-4xl' : 'font-comic text-xl leading-none md:text-2xl'
              } ${dark ? 'text-paper' : 'text-ink'}`}
              style={
                visible
                  ? {
                      animation: 'word-pop 0.4s ease-out both',
                      animationDelay: `${i * 0.08}s`,
                    }
                  : { opacity: 0 }
              }
            >
              {word}
            </span>
          ))}
        </div>
        {dark ? (
          <span className="speech-tail" />
        ) : (
          <span className="speech-tail-white" />
        )}
      </div>
    </div>
  );
}
