'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface PinPaperProps {
  children: ReactNode;
  className?: string;
  rotate?: number;
  delay?: number;
  id?: string;
  noPin?: boolean;
  ball?: boolean;
}

export default function PinPaper({
  children,
  className,
  rotate = 0,
  delay = 0,
  id,
  noPin,
  ball = true,
}: PinPaperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'hidden' | 'ball' | 'unfold' | 'settled'>('hidden');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          obs.unobserve(el);
          if (ball) {
            setPhase('ball');
            const t1 = setTimeout(() => setPhase('unfold'), 600 + delay);
            const t2 = setTimeout(() => setPhase('settled'), 1100 + delay);
            return () => { clearTimeout(t1); clearTimeout(t2); };
          } else {
            setPhase('settled');
          }
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, ball]);

  if (!ball) {
    return (
      <div
        ref={ref}
        id={id}
        className={`${className || ''}`}
        style={{ opacity: phase === 'settled' ? 1 : 0, transition: 'opacity 0.7s ease-out', transitionDelay: `${delay}ms` }}
      >
        <div className="relative" style={{ transform: `rotate(${rotate}deg)` }}>
          {!noPin && (
            <span className="pin" aria-hidden>
              <span className="pin-needle" />
              <span className="pin-head" />
            </span>
          )}
          <div className="real-paper paper-shadow torn-edge p-5 md:p-7">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      id={id}
      className={`${className || ''}`}
    >
      <div className="relative" style={{ transform: `rotate(${rotate}deg)` }}>
        <div
          className={`paper-ball-container ${phase === 'ball' ? 'phase-ball' : ''} ${phase === 'unfold' ? 'phase-unfold' : ''} ${phase === 'settled' ? 'phase-settled' : ''}`}
        >
          <div className="paper-ball-inner">
            <div className="paper-ball-content">
              {!noPin && (
                <span className="pin" aria-hidden>
                  <span className="pin-needle" />
                  <span className="pin-head" />
                </span>
              )}
              <div className={`real-paper paper-shadow torn-edge p-5 md:p-7 ${phase === 'settled' ? 'content-visible' : 'content-hidden'}`}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
