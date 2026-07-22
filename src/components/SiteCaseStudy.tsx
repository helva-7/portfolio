import { Fragment } from 'react';
import { siteCaseStudy } from '@/data/siteCaseStudy';

export default function SiteCaseStudy() {
  return (
    <article className="site-case board-note board-note--wide" data-board-note data-board-variant="build">
      <div className="site-case__header">
        <p className="section-oddity">{siteCaseStudy.eyebrow}</p>
        <span className="site-case__stamp">STATIC FILE / VERIFIED LOCALLY</span>
        <h2>{siteCaseStudy.title}</h2>
        <p>{siteCaseStudy.summary}</p>
      </div>

      <div className="site-case__facts" aria-label="Build facts">
        {siteCaseStudy.facts.map((fact) => (
          <div key={fact.label} className="site-case__fact">
            <span>{fact.label}</span>
            <p>{fact.value}</p>
          </div>
        ))}
      </div>

      <div className="site-case__body">
        <section className="site-case__panel">
          <h3>Build decisions</h3>
          <ul>
            {siteCaseStudy.decisions.map((decision) => (
              <li key={decision}>{decision}</li>
            ))}
          </ul>
        </section>

        <section className="site-case__panel site-case__panel--validation">
          <h3>Validation commands</h3>
          <div className="site-case__commands">
            {siteCaseStudy.validation.map((command) => (
              <code key={command}>{command}</code>
            ))}
          </div>
        </section>
      </div>

      <figure className="site-case__diagram" aria-labelledby="site-case-diagram-title" aria-describedby="site-case-diagram-desc">
        <figcaption>
          <div className="site-case__diagram-meta">
            <span>ARCHITECTURE TRACE</span>
            <small>READ / LEFT → RIGHT</small>
          </div>
          <strong id="site-case-diagram-title">{siteCaseStudy.architecture.title}</strong>
          <p id="site-case-diagram-desc">{siteCaseStudy.architecture.description}</p>
        </figcaption>

        <div className="site-case__diagram-stage">
          <span className="site-case__diagram-index" aria-hidden>01—05 / STATIC PATH</span>
          <div className="site-case__flow" role="list" aria-label="Architecture flow">
            {siteCaseStudy.architecture.nodes.map((node, index) => {
              const edge = siteCaseStudy.architecture.edges[index];

              return (
                <Fragment key={node.id}>
                  <section className={`site-case__flow-node site-case__flow-node--${node.tone}`} role="listitem">
                    <span className="site-case__flow-index">0{index + 1}</span>
                    <strong>{node.label}</strong>
                    <p>{node.detail}</p>
                  </section>
                  {edge ? (
                    <div className="site-case__flow-connector" aria-label={`Flow: ${edge.label}`}>
                      <span>{edge.label}</span>
                    </div>
                  ) : null}
                </Fragment>
              );
            })}
          </div>
          <p className="site-case__diagram-note">Typed records enter the page, focused client state enhances it, and static export carries the case file to delivery.</p>
        </div>
      </figure>
    </article>
  );
}
