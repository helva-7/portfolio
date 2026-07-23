'use client';

import type { ReactNode } from 'react';

interface ProjectUncrumpleShellProps {
  index: number;
  children: ReactNode;
  className?: string;
}

export default function ProjectUncrumpleShell({ index, children, className = '' }: ProjectUncrumpleShellProps) {
  return (
    <div className={`project-uncrumple-shell project-uncrumple-shell--sealed ${className}`.trim()}>
      <div className="project-crumple-prop" aria-hidden>
        <span className="project-crumple-prop__face" />
        <span className="project-crumple-prop__fold project-crumple-prop__fold--one" />
        <span className="project-crumple-prop__fold project-crumple-prop__fold--two" />
        <span className="project-crumple-prop__fold project-crumple-prop__fold--three" />
        <span className="project-crumple-prop__stamp">CLOSED CASE / {String(index + 1).padStart(2, '0')}</span>
      </div>
      {children}
    </div>
  );
}
