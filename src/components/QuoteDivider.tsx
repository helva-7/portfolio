'use client';

import { useEffect, useRef, useState } from 'react';

interface QuoteDividerProps {
  text: string;
  kicker?: string;
}

export default function QuoteDivider({ text, kicker }: QuoteDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
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
  }, []);

  return (
    <section ref={ref} className="relative z-10 mx-auto flex min-h-[60vh] max-w-page items-center justify-center overflow-hidden px-4 py-20 md:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-ink/10" />
      <div className={`text-center transition-all duration-1000 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        {kicker && (
          <span className="mb-4 inline-block border-[3px] border-ink bg-ink px-3 py-1 font-body text-[0.55rem] font-black uppercase tracking-[0.2em] text-paper">
            {kicker}
          </span>
        )}
        <h2 className="max-w-4xl font-comic text-[clamp(2rem,7vw,5rem)] leading-[0.88] tracking-wide text-ink">
          &ldquo;{text}&rdquo;
        </h2>
      </div>
    </section>
  );
}
