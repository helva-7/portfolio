import type { Project } from '@/data/portfolio';
import EvidenceTape from './EvidenceTape';
import ProjectArchitectureDiagram from './ProjectArchitectureDiagram';

interface ProjectDossierPanelProps {
  project: Project;
}

export default function ProjectDossierPanel({ project }: ProjectDossierPanelProps) {
  const dossier = project.dossier;

  return (
    <div className="project-dossier" aria-label={`${project.name} dossier`}>
      <EvidenceTape items={project.evidence} />

      <div className="project-dossier__grid">
        <section className="project-dossier__block project-dossier__block--problem">
          <p className="project-dossier__eyebrow">Problem</p>
          <p>{dossier.problem}</p>
        </section>

        <section className="project-dossier__block">
          <p className="project-dossier__eyebrow">Constraints</p>
          <ul>
            {dossier.constraints.map((constraint) => (
              <li key={constraint}>{constraint}</li>
            ))}
          </ul>
        </section>

        <section className="project-dossier__block">
          <p className="project-dossier__eyebrow">Decisions</p>
          <ul>
            {dossier.decisions.map((decision) => (
              <li key={decision}>{decision}</li>
            ))}
          </ul>
        </section>

        <section className="project-dossier__block project-dossier__block--outcome">
          <p className="project-dossier__eyebrow">Outcome</p>
          <p>{dossier.outcome}</p>
        </section>

        <section className="project-dossier__block project-dossier__block--next">
          <p className="project-dossier__eyebrow">Next improvement</p>
          <p>{dossier.nextImprovement}</p>
        </section>
      </div>

      {project.architecture ? <ProjectArchitectureDiagram diagram={project.architecture} projectNumber={project.number} /> : null}
    </div>
  );
}
