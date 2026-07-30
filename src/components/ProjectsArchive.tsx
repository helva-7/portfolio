'use client';

import { useEffect, useRef } from 'react';
import type { Project } from '@/data/portfolio';
import ProjectChapterCard from './ProjectChapterCard';

interface ProjectsArchiveProps {
  projects: Project[];
  summary: string;
}

export default function ProjectsArchive({ projects, summary }: ProjectsArchiveProps) {
  const archiveRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const archive = archiveRef.current;
    if (!archive) return;

    const folders = Array.from(
      archive.querySelectorAll<HTMLElement>('.project-uncrumple-shell'),
    );
    const stack = archive.querySelector<HTMLElement>('.project-stack');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timers: number[] = [];
    const cleanupAnimations: Array<() => void> = [];

    const finishReveal = (folder: HTMLElement) => {
      folder.classList.add('is-fusion-complete');
      folder.classList.remove('is-lightweight-reveal');
    };

    const reveal = (folder: HTMLElement) => {
      const card = folder.querySelector<HTMLElement>('.project-file');
      if (!card || folder.classList.contains('is-fusion-complete')) return;

      stack?.classList.add('is-project-flow-live');
      folder.classList.add('is-scroll-open', 'is-lightweight-reveal');

      const onAnimationEnd = (event: AnimationEvent) => {
        if (event.target !== card || event.animationName !== 'project-paper-reveal') return;
        card.removeEventListener('animationend', onAnimationEnd);
        finishReveal(folder);
      };

      card.addEventListener('animationend', onAnimationEnd);
      cleanupAnimations.push(() => card.removeEventListener('animationend', onAnimationEnd));
      timers.push(window.setTimeout(() => finishReveal(folder), 760));
    };

    if (reduce) {
      stack?.classList.add('is-project-flow-live');
      folders.forEach((folder) =>
        folder.classList.add('is-scroll-open', 'is-fusion-complete'),
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.target.getBoundingClientRect().top -
              b.target.getBoundingClientRect().top,
          )
          .forEach((entry, index) => {
            const folder = entry.target as HTMLElement;
            observer.unobserve(folder);
            timers.push(window.setTimeout(() => reveal(folder), index * 90));
          });
      },
      { threshold: 0.08, rootMargin: '6% 0px -8% 0px' },
    );

    folders.forEach((folder) => observer.observe(folder));

    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
      cleanupAnimations.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <article
      ref={archiveRef}
      className="paper-archive board-note board-note--wide"
      data-board-note
      data-board-variant="archive"
    >
      <span className="paper-card__pin" aria-hidden />

      <div className="paper-card__shell paper-archive__shell">
        <div className="paper-card__wrinkles" aria-hidden />

        <div className="paper-card__header">
          <p className="paper-card__label">PROJECT ARCHIVE</p>
          <span className="paper-card__stamp">Case Board / Active</span>
        </div>

        <div className="paper-card__heading paper-archive__heading">
          <p className="section-oddity">ODDITY / ARCHIVE</p>
          <h2 className="paper-card__title">PROJECTS</h2>
          <p className="paper-card__subtitle">Observed systems, stress points, deployments, and fixes.</p>
          <p className="paper-archive__summary">{summary}</p>
          <p className="redacted-note mt-4">[REDACTED] repeated proof collected as deployable case evidence.</p>
        </div>

        <div className="paper-archive__body">
          <div className="project-stack">
            {projects.map((project, index) => (
              <ProjectChapterCard key={project.number} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
