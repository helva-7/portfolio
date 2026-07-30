import type { CSSProperties, ReactNode } from 'react';

interface ProjectUncrumpleShellProps {
  index: number;
  children: ReactNode;
  className?: string;
}

export default function ProjectUncrumpleShell({ index, children, className = '' }: ProjectUncrumpleShellProps) {
  return (
    <div
      className={`project-uncrumple-shell project-uncrumple-shell--sealed ${className}`.trim()}
      data-project-order={String(index + 1).padStart(2, '0')}
      style={{ '--project-index': index } as CSSProperties}
    >
      <span className="project-flow-node" aria-hidden>{String(index + 1).padStart(2, '0')}</span>
      {children}
    </div>
  );
}
