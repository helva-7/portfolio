import type { CSSProperties, ReactNode } from 'react';
import { withBasePath } from '@/lib/base-path';

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

      <video
        className="project-fusion-driver"
        data-fusion-driver
        data-src={withBasePath('/images/paper.mp4')}
        muted
        playsInline
        preload="none"
      />
      <canvas
        className="project-fusion-canvas"
        data-fusion-canvas
        aria-hidden
      />
      {children}
    </div>
  );
}
