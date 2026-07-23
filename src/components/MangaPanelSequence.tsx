'use client';

import { useEffect, useRef } from 'react';
import { createMangaPanelSequence, type MangaPanelData } from '@/lib/manga-anime';

const DEFAULT_PANELS: MangaPanelData[] = [
  {
    id: 'observe',
    label: '01 / READ THE SYSTEM',
    glyph: '観',
    note: 'I map the users, signals, constraints, and failure points before touching the stack.',
  },
  {
    id: 'trace',
    label: '02 / FIND THE BREAK',
    glyph: '痕',
    note: 'I reproduce the failure and follow its evidence until the actual weak point appears.',
  },
  {
    id: 'unseal',
    label: '03 / REBUILD THE PATH',
    glyph: '封',
    note: 'I turn the fix into a repeatable flow: guarded, observable, and understandable.',
  },
  {
    id: 'archive',
    label: '04 / SHIP THE PROOF',
    glyph: '異',
    note: 'The result is deployed, measured, documented, and preserved below as project evidence.',
  },
];

interface MangaPanelSequenceProps {
  panels?: MangaPanelData[];
  kicker?: string;
  title?: string;
}

export default function MangaPanelSequence({
  panels = DEFAULT_PANELS,
  kicker = 'METHOD / FOUR PANELS',
  title = 'HOW I WORK',
}: MangaPanelSequenceProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const panelElements = Array.from(container.querySelectorAll<HTMLElement>('[data-manga-panel]'));
    const timeline = createMangaPanelSequence(container, panelElements);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        container.classList.add('is-sequence-active');
        timeline?.play();
        observer.disconnect();
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      timeline?.pause?.();
      timeline?.revert?.();
    };
  }, [panels]);

  return (
    <section
      ref={containerRef}
      className="manga-panel-seq whiteboard-section"
      aria-label="Scroll-triggered manga panel sequence"
      data-anime-panel-sequence
    >
      <div className="manga-panel-seq__header">
        <p className="section-oddity">{kicker}</p>
        <h2 className="manga-panel-seq__title">{title}</h2>
        <p className="manga-panel-seq__hint">One engineering loop — from ambiguity to evidence</p>
      </div>

      <div className="manga-panel-seq__grid">
        {panels.map((panel, index) => (
          <article
            key={panel.id}
            className={`manga-panel-seq__panel manga-panel-seq__panel--${panel.id}`}
            data-manga-panel
            data-panel-index={index}
          >
            <span className="manga-panel-seq__glyph" aria-hidden>
              {panel.glyph}
            </span>
            <span className="manga-panel-seq__ink" aria-hidden />
            <div className="manga-panel-seq__body">
              <p className="manga-panel-seq__label">{panel.label}</p>
              <p className="manga-panel-seq__caption">{panel.note}</p>
            </div>
            <span className="manga-panel-seq__seal" aria-hidden>
              [REDACTED]
            </span>
          </article>
        ))}
      </div>

      <p className="redacted-note manga-panel-seq__footer">The project archive below shows this loop under real constraints.</p>
    </section>
  );
}
