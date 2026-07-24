'use client';

import type { CSSProperties } from 'react';
import type { Skill } from '@/data/portfolio';

interface StatSheetProps {
  skills: Skill[];
}

export default function StatSheet({ skills }: StatSheetProps) {
  const statsBootstrap = `
    (() => {
      const sheet = document.querySelector('[data-stat-sheet]');
      if (!sheet) return;
      const activate = () => {
        sheet.classList.add('is-stats-live');
        sheet.querySelector('.resilience-breakout')?.classList.add('is-animated');
      };
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        activate();
        return;
      }
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        activate();
        observer.disconnect();
      }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
      observer.observe(sheet);
    })();
  `;

  return (
    <div className="stat-sheet-root mx-auto max-w-2xl overflow-visible" data-stat-sheet>
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
                className="resilience-breakout stat-hyperbole stat-hyperbole--resilience"
                data-stat-row
                style={{
                  '--break-delay': `${i * 120}ms`,
                  '--stat-delay': `${i * 120}ms`,
                  '--stat-value': `${skill.value}%`,
                } as CSSProperties}
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
                    aria-valuenow={skill.value}
                  >
                    <div className="resilience-breakout__meter-track" />
                    <div
                      className="resilience-breakout__meter-fill"
                      data-stat-fill
                    />
                    <span className="resilience-breakout__fracture" aria-hidden />
                    <span className="resilience-breakout__overdrive" aria-hidden />
                  </div>
                  <strong className="resilience-breakout__score">
                    {skill.value}
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
                style={{
                  '--stat-delay': `${i * 120}ms`,
                  '--stat-value': `${skill.value}%`,
                } as CSSProperties}
              >
                <span className="font-body text-xs font-black uppercase tracking-[0.12em] text-ink md:text-sm">
                  {skill.label}
                </span>
                <div className="relative h-5 border-[3px] border-ink bg-paper-dark">
                  <div
                    className="absolute inset-0 origin-left bg-ink transition-all duration-1000 ease-out"
                    data-stat-fill
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
                  {skill.value}
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
      <script dangerouslySetInnerHTML={{ __html: statsBootstrap }} />
    </div>
  );
}
