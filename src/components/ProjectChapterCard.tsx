import type { Project } from '@/data/portfolio';
import ImagePanel from './ImagePanel';
import ProjectDossierPanel from './ProjectDossierPanel';

interface ProjectChapterCardProps {
  project: Project;
  index: number;
}

export default function ProjectChapterCard({ project, index }: ProjectChapterCardProps) {
  const evidence = ['DEPLOYED', 'PATCHED', 'OBSERVED', 'SURVIVED'][index % 4];
  const titleId = `project-${project.number}-title`;

  return (
    <article
      id={`project-${project.id}`}
      className={`project-file project-file--${project.id} ${index % 2 === 0 ? 'project-file--left' : 'project-file--right'}`}
      data-evidence={evidence}
      data-project={project.id}
      aria-label={`${project.name}. Evidence status: ${evidence.toLowerCase()}`}
    >
      <span className="project-file__evidence-stamp" aria-hidden>{evidence}</span>
      <div className="project-file__header">
        <span className="project-file__number">{project.number.padStart(2, '0')}</span>
        <div className="project-file__heading">
          <p className="project-file__case-label">CASE {project.number.padStart(2, '0')}</p>
          <h3 id={titleId} className="project-file__title">
            {project.name}
          </h3>
          <p className="project-file__quote">{project.quote}</p>
        </div>
      </div>

      <div className="project-file__body">
        <div className="project-file__media">
          <ImagePanel
            src={project.image}
            label={`${project.name} visual`}
            alt={project.imageAlt}
            imageClassName={project.imageClassName}
            imageFit={project.imageFit}
            mediaType={project.mediaType}
            className={`project-file__image w-full ${project.imagePanelClassName || 'aspect-[4/3]'}`}
          />
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
        </div>
      </div>

      <details className="project-file__details">
        <summary className="project-file__summary" aria-describedby={titleId}>
          <span className="project-file__summary-open">Open case dossier</span>
          <span className="project-file__summary-close">Close case dossier</span>
        </summary>
        <ProjectDossierPanel project={project} />
      </details>
    </article>
  );
}
