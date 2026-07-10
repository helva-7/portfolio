import type { Project } from '@/data/portfolio';
import ProjectChapterCard from './ProjectChapterCard';

interface ProjectsArchiveProps {
  projects: Project[];
  summary: string;
}

export default function ProjectsArchive({ projects, summary }: ProjectsArchiveProps) {
  return (
    <article className="paper-archive board-note board-note--wide" data-board-note data-board-variant="archive">
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
