'use client';

import { useId, useState } from 'react';
import type { Project } from '@/data/portfolio';
import ImagePanel from './ImagePanel';

interface ProjectChapterCardProps {
  project: Project;
  index: number;
}

export default function ProjectChapterCard({ project, index }: ProjectChapterCardProps) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();

  return (
    <article className={`project-file ${index % 2 === 0 ? 'project-file--left' : 'project-file--right'}`}>
      <div className="project-file__header">
        <span className="project-file__number">{project.number.padStart(2, '0')}</span>
        <div className="project-file__heading">
          <p className="project-file__case-label">CASE {project.number.padStart(2, '0')}</p>
          <h3 id={`${detailsId}-title`} className="project-file__title">
            {project.name}
          </h3>
          <p className="project-file__quote">{project.quote}</p>
        </div>
      </div>

      <div className="project-file__body">
        <div className="project-file__media">
          <ImagePanel src={project.image} label={`${project.name} visual`} className="aspect-[4/3] w-full" />
        </div>

        <div className="project-file__content">
          <p className="project-file__description">{project.description}</p>
          <div className="project-file__stack">
            {project.stack.map((tech) => (
              <span key={tech} className="project-file__tag">
                {tech}
              </span>
            ))}
          </div>
          <button
            type="button"
            className="project-file__cta"
            aria-expanded={expanded}
            aria-controls={detailsId}
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? 'Close file' : 'Open file'}
          </button>
        </div>
      </div>

      <div id={detailsId} className={`project-file__details ${expanded ? 'project-file__details--open' : ''}`}>
        <p className="project-file__long-copy">{project.longDescription}</p>
      </div>
    </article>
  );
}
