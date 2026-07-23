'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { animate, stagger } from 'animejs';
import type { Skill } from '@/data/portfolio';

interface StatSheetProps {
  skills: Skill[];
}

export default function StatSheet({ skills }: StatSheetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [animated, setAnimated] = useState(false);

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
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (visible && !animated) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setAnimated(true);
        return;
      }
      const root = ref.current;
      if (!root) return;
      setAnimated(true);
      const rows = root.querySelectorAll<HTMLElement>('[data-stat-row]');
      const meters = root.querySelectorAll<HTMLElement>('[data-stat-fill]');
      animate(rows, {
        opacity: [0, 1],
        translateX: (_, i) => [(i ?? 0) % 2 ? 80 : -80, 0],
        scale: [0.55, 1.08, 1],
        rotate: (_, i) => [(i ?? 0) % 2 ? 7 : -7, 0],
        duration: 900,
        delay: stagger(120),
        ease: 'outElastic(1, .55)',
      });
      animate(meters, {
        scaleX: [0, 1.08, 1],
        duration: 1100,
        delay: stagger(120, { start: 240 }),
        ease: 'outElastic(1, .45)',
      });
    }
  }, [visible, animated]);

  return (
    <div ref={ref} className="mx-auto max-w-2xl overflow-visible">
      <div className="-rotate-1 border-[8px] border-ink bg-paper p-5 shadow-manga md:p-8">
        <div className="result-screen__banner" aria-hidden>
          <span>RESULT</span>
          <strong>ARC CLEARED</strong>
          <span>EXP + SYSTEM SENSE</span>
        </div>
        <div className="mb-6 flex items-center justify-between border-b-4 border-ink pb-4">
          <div>
            <p className="section-oddity mb-3">ODDITY / MEASURE</p>
            <span className="border-[3px] border-ink bg-ink px-3 py-1 font-body text-[0.55rem] font-black uppercase tracking-[0.2em] text-paper">
              CHARACTER PROFILE
            </span>
            <h3 className="mt-2 font-display text-3xl leading-none tracking-tight text-ink md:text-4xl">
              FAHD ELHALOUI
            </h3>
          </div>
          <div className="hidden text-right md:block">
            <span className="font-display text-5xl leading-none text-ink/10">Lv.??</span>
          </div>
        </div>

        <div className="space-y-5">
          {skills.map((skill, i) =>
            skill.glitch ? (
              <div
                key={skill.label}
                className={`resilience-breakout stat-hyperbole stat-hyperbole--resilience ${animated ? 'is-animated' : ''}`}
                data-stat-row
                style={{ '--break-delay': `${i * 120}ms` } as CSSProperties}
              >
                <div className="resilience-breakout__row">
                  <span className="resilience-breakout__label">
                    {skill.label}
                  </span>
                  <div
                    className="resilience-breakout__meter"
                    role="progressbar"
                    aria-label={`${skill.label} score`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={animated ? skill.value : 0}
                  >
                    <div className="resilience-breakout__meter-track" />
                    <div
                      className="resilience-breakout__meter-fill"
                      data-stat-fill
                      style={{
                        width: animated ? `${skill.value}%` : '0%',
                        transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                        transitionDelay: `${i * 120}ms`,
                      }}
                    />
                  </div>
                  <strong className="resilience-breakout__score">
                    {animated ? skill.value : 0}
                  </strong>
                </div>
                <span className="resilience-breakout__seal" aria-hidden>LIMIT / REJECTED</span>
                <span className="resilience-breakout__shards" aria-hidden><i /><i /><i /></span>
              </div>
            ) : (
              <div
                key={skill.label}
                className={`stat-row stat-hyperbole stat-hyperbole--${i % 6} grid grid-cols-[1fr_1.5fr_auto] items-center gap-3 md:gap-4`}
                data-boost={`+${Math.max(1, Math.round(skill.value / 12))}`}
                data-stat-row
              >
                <span className="stat-hyperbole__impact" aria-hidden>{['爆', '雲', '速', '核', '盾', '斬'][i % 6]}</span>
                <span className="font-body text-xs font-black uppercase tracking-[0.12em] text-ink md:text-sm">
                  {skill.label}
                </span>
                <div className="relative h-5 border-[3px] border-ink bg-paper-dark">
                  <div
                    className="absolute inset-0 origin-left bg-ink transition-all duration-1000 ease-out"
                    data-stat-fill
                    style={{
                      width: animated ? `${skill.value}%` : '0%',
                      transitionDelay: `${i * 120}ms`,
                    }}
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 30% 50%, rgba(243,234,215,0.15) 0 1px, transparent 1px)',
                      backgroundSize: '4px 4px',
                    }}
                  />
                </div>
                <strong className="font-display text-3xl leading-none text-ink md:text-4xl">
                  {animated ? skill.value : 0}
                </strong>
              </div>
            )
          )}
        </div>

        <div className="mt-6 border-t-4 border-ink pt-4 text-center">
          <p className="font-body text-[0.55rem] font-black uppercase tracking-[0.2em] text-ink/50">
            Evaluation based on project portfolio and engineering experience
          </p>
          <p className="redacted-note mt-4 text-left md:text-center">[REDACTED] numbers are partial. pressure behavior remains the real benchmark.</p>
          <div className="result-screen__rank" aria-label="Result rank: S">
            <span>RANK</span>
            <strong>S</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
