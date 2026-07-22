'use client';

import { useMemo, useState } from 'react';
import type { Project, SkillLoadout as SkillLoadoutData, SkillId } from '@/data/portfolio';

interface SkillLoadoutProps {
  loadouts: SkillLoadoutData[];
  projects: Project[];
}

export default function SkillLoadout({ loadouts, projects }: SkillLoadoutProps) {
  const [activeId, setActiveId] = useState<SkillId>(loadouts[0]?.id ?? 'cloud-devops');
  const active = loadouts.find((loadout) => loadout.id === activeId) ?? loadouts[0];

  const relatedProjects = useMemo(
    () => projects.filter((project) => project.relatedSkillIds?.includes(activeId)),
    [activeId, projects]
  );

  if (!active) return null;

  return (
    <section className="skill-loadout" aria-labelledby="skill-loadout-title">
      <div className="skill-loadout__header">
        <p className="section-oddity">ODDITY / LOADOUT</p>
        <h3 id="skill-loadout-title">Evidence-backed skill loadout</h3>
        <p>Pick a capability. The panel below links it to project evidence instead of hiding or filtering the archive.</p>
      </div>

      <div className="skill-loadout__buttons" role="group" aria-label="Choose skill evidence loadout">
        {loadouts.map((loadout) => (
          <button
            key={loadout.id}
            type="button"
            className="skill-loadout__button"
            aria-pressed={activeId === loadout.id}
            onClick={() => setActiveId(loadout.id)}
          >
            <span>{loadout.codename}</span>
            <strong>{loadout.label}</strong>
          </button>
        ))}
      </div>

      <div className="skill-loadout__panel" aria-live="polite">
        <div className="skill-loadout__brief">
          <span>ACTIVE FILE / {active.codename}</span>
          <h4>{active.label}</h4>
          <p>{active.summary}</p>
          <p className="skill-loadout__focus">{active.evidenceFocus}</p>
        </div>

        <div className="skill-loadout__proof-list" aria-label={`${active.label} related project evidence`}>
          {relatedProjects.map((project) => (
            <article key={project.id} className="skill-loadout__proof-card">
              <a href={`#project-${project.id}`}>CASE {project.number.padStart(2, '0')} / {project.name}</a>
              <p>{project.quote}</p>
              <div className="skill-loadout__chips" aria-label={`${project.name} evidence chips`}>
                {project.evidence.slice(0, 3).map((item) => (
                  <span key={`${project.id}-${item.label}`}>{item.label}: {item.value}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
