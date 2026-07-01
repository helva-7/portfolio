'use client';

import { useEffect, useRef, useState } from 'react';
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
      const timer = setTimeout(() => setAnimated(true), 400);
      return () => clearTimeout(timer);
    }
  }, [visible, animated]);

  return (
    <div ref={ref} className="mx-auto max-w-2xl overflow-visible">
      <div className="-rotate-1 border-[8px] border-ink bg-paper p-5 shadow-manga md:p-8">
        <div className="mb-6 flex items-center justify-between border-b-4 border-ink pb-4">
          <div>
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
              <div key={skill.label} className="relative overflow-visible" style={{ zIndex: 30 }}>
                <div className="flex items-center gap-3 md:gap-4">
                  <span className="shrink-0 font-body text-xs font-black uppercase tracking-[0.12em] text-ink md:text-sm">
                    {skill.label}
                  </span>
                  <div className="relative flex-1 overflow-visible" style={{ height: 28 }}>
                    <div className="absolute inset-0 border-[3px] border-ink bg-paper-dark" />
                    <div
                      className="glitch-bar absolute top-0 left-0 h-full origin-left bg-ink"
                      style={{
                        width: animated ? '100vw' : '0%',
                        transition: 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
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
                    <div
                      className="pointer-events-none absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(226,59,46,0.15) 2px, rgba(226,59,46,0.15) 3px)',
                      }}
                    />
                  </div>
                  <strong className="glitch-text shrink-0 font-display text-3xl leading-none text-red md:text-4xl">
                    ???
                  </strong>
                </div>
              </div>
            ) : (
              <div key={skill.label} className="grid grid-cols-[1fr_1.5fr_auto] items-center gap-3 md:gap-4">
                <span className="font-body text-xs font-black uppercase tracking-[0.12em] text-ink md:text-sm">
                  {skill.label}
                </span>
                <div className="relative h-5 border-[3px] border-ink bg-paper-dark">
                  <div
                    className="absolute inset-0 origin-left bg-ink transition-all duration-1000 ease-out"
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
        </div>
      </div>
    </div>
  );
}
