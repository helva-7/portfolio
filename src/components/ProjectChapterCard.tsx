'use client';

import { useEffect, useRef, useState } from 'react';
import type { Project } from '@/data/portfolio';
import ImagePanel from './ImagePanel';

interface ProjectChapterCardProps {
  project: Project;
  index: number;
}

export default function ProjectChapterCard({ project, index }: ProjectChapterCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [decrumpled, setDecrumpled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDecrumpled(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const angle = index % 2 === 0 ? '-rotate-2' : 'rotate-2';

  return (
    <div
      ref={ref}
      className={`crumple-enter ${decrumpled ? 'decrumpled' : ''}`}
    >
      <div
        className={`crumple-shadow ${decrumpled ? 'decrumpled' : ''} torn-edge-sm transition-all duration-[1.2s] ease-out`}
      >
        <article
          className={`crumple-overlay paper-texture ${decrumpled ? 'decrumpled' : ''} group relative border-[6px] border-ink p-4 md:p-6 ${angle}`}
        >
          <div className="paper-slash" />

          <div className="flex items-start gap-3 md:gap-6">
            <span className="shrink-0 font-display text-5xl leading-none text-ink/15 md:text-7xl">
              {project.number.padStart(2, '0')}
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] leading-[0.82] tracking-tight text-ink transition-colors group-hover:text-red">
                {project.name}
              </h3>
              <p className="mt-1 border-l-4 border-red pl-3 font-body text-xs font-bold uppercase tracking-[0.12em] text-ink/60">
                {project.quote}
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1.2fr] md:gap-6">
            <ImagePanel
              src={project.image}
              label={`Replace: ${project.name} screenshot`}
              className="aspect-[4/3] w-full"
            />
            <div className="flex flex-col justify-between">
              <div>
                <p className="font-body text-sm font-bold leading-6 text-ink/80 md:text-base">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="border-[2px] border-ink px-2 py-0.5 font-body text-[0.55rem] font-black uppercase tracking-[0.1em] text-ink"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {index < 3 && (
            <div className="absolute -bottom-2 right-8 h-1 w-1/3 bg-ink/10" />
          )}
        </article>
      </div>
    </div>
  );
}
