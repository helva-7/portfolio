import type { ProjectArchitectureDiagramData } from '@/data/portfolio';

interface ProjectArchitectureDiagramProps {
  diagram: ProjectArchitectureDiagramData;
  projectNumber: string;
}

const nodePositions = [
  { x: 10, y: 28 },
  { x: 30, y: 28 },
  { x: 50, y: 28 },
  { x: 70, y: 28 },
  { x: 90, y: 28 },
];

export default function ProjectArchitectureDiagram({ diagram, projectNumber }: ProjectArchitectureDiagramProps) {
  const positions = new Map(diagram.nodes.map((node, index) => [node.id, nodePositions[index] ?? { x: 10 + index * 18, y: 28 }]));
  const titleId = `project-${projectNumber}-diagram-title`;
  const descId = `project-${projectNumber}-diagram-desc`;
  const isDokkaebiDiagram = projectNumber === '01';
  const isFraudDiagram = projectNumber === '02';
  const nodesById = new Map(diagram.nodes.map((node) => [node.id, node]));
  const edgeLabel = (from: string, to: string) => diagram.edges.find((edge) => edge.from === from && edge.to === to)?.label;

  const fraudNode = (id: string, position: string) => {
    const node = nodesById.get(id);
    if (!node) return null;

    return (
      <section className={`project-diagram__fraud-node project-diagram__fraud-node--${node.tone ?? 'ink'} project-diagram__fraud-node--${position}`} role="listitem">
        <span>NODE / {id.toUpperCase()}</span>
        <strong>{node.label}</strong>
        <p>{node.detail}</p>
      </section>
    );
  };

  const dokkaebiNode = (id: string, position: string) => {
    const node = nodesById.get(id);
    if (!node) return null;

    return (
      <section className={`project-diagram__dokkaebi-node project-diagram__dokkaebi-node--${node.tone ?? 'ink'} project-diagram__dokkaebi-node--${position}`} role="listitem">
        <span>MODULE / {id.toUpperCase()}</span>
        <strong>{node.label}</strong>
        <p>{node.detail}</p>
      </section>
    );
  };

  return (
    <figure className={`project-diagram ${isDokkaebiDiagram ? 'project-diagram--dokkaebi' : ''} ${isFraudDiagram ? 'project-diagram--fraud' : ''}`} aria-labelledby={titleId} aria-describedby={descId}>
      <figcaption>
        <span>ARCHITECTURE TRACE</span>
        <strong id={titleId}>{diagram.title}</strong>
        <p id={descId}>{diagram.summary}</p>
      </figcaption>

      {isFraudDiagram ? (
        <div className="project-diagram__fraud-stage">
          <span className="project-diagram__fraud-index" aria-hidden>TRACE / 02 / AUDIT PATH</span>
          <div className="project-diagram__fraud-main" role="list" aria-label="Fraud inference flow">
            {fraudNode('sim', 'sim')}
            <div className="project-diagram__fraud-connector project-diagram__fraud-connector--forward" aria-label={`Flow: ${edgeLabel('sim', 'ml') ?? 'score'}`}>
              <span>{edgeLabel('sim', 'ml') ?? 'score'}</span>
            </div>
            {fraudNode('ml', 'ml')}
            <div className="project-diagram__fraud-connector project-diagram__fraud-connector--forward" aria-label={`Flow: ${edgeLabel('ml', 'blob') ?? 'log'}`}>
              <span>{edgeLabel('ml', 'blob') ?? 'log'}</span>
            </div>
            {fraudNode('blob', 'blob')}
          </div>

          <div className="project-diagram__fraud-branch" role="list" aria-label="Fraud audit outputs">
            <div className="project-diagram__fraud-stem" aria-label={`Flow: ${edgeLabel('blob', 'bi') ?? 'report'}`}>
              <span>{edgeLabel('blob', 'bi') ?? 'report'}</span>
            </div>
            <div className="project-diagram__fraud-outputs">
              {fraudNode('dash', 'dash')}
              <div className="project-diagram__fraud-connector project-diagram__fraud-connector--reverse" aria-label={`Flow: ${edgeLabel('blob', 'dash') ?? 'inspect'}`}>
                <span>{edgeLabel('blob', 'dash') ?? 'inspect'}</span>
              </div>
              {fraudNode('bi', 'bi')}
            </div>
          </div>
          <p className="project-diagram__fraud-note">Scores become traceable audit records before they split into operational review and business reporting.</p>
        </div>
      ) : isDokkaebiDiagram ? (
        <div className="project-diagram__dokkaebi-stage">
          <span className="project-diagram__dokkaebi-index" aria-hidden>CASE / 01 / CONTAINMENT ROUTE</span>
          <div className="project-diagram__dokkaebi-grid" role="list" aria-label="Dokkaebi security scan containment route">
            {dokkaebiNode('ui', 'request')}
            <div className="project-diagram__dokkaebi-connector project-diagram__dokkaebi-connector--submit" aria-label={`Flow: ${edgeLabel('ui', 'api') ?? 'submit'}`}>
              <span>{edgeLabel('ui', 'api') ?? 'submit'}</span>
            </div>
            {dokkaebiNode('api', 'gate')}
            <div className="project-diagram__dokkaebi-connector project-diagram__dokkaebi-connector--approve" aria-label={`Flow: ${edgeLabel('api', 'queue') ?? 'approve'}`}>
              <span>{edgeLabel('api', 'queue') ?? 'approve'}</span>
            </div>
            {dokkaebiNode('queue', 'airlock')}
            <div className="project-diagram__dokkaebi-connector project-diagram__dokkaebi-connector--run" aria-label={`Flow: ${edgeLabel('queue', 'worker') ?? 'run'}`}>
              <span>{edgeLabel('queue', 'worker') ?? 'run'}</span>
            </div>
            {dokkaebiNode('worker', 'chamber')}
            <div className="project-diagram__dokkaebi-connector project-diagram__dokkaebi-connector--store" aria-label={`Flow: ${edgeLabel('worker', 'db') ?? 'store'}`}>
              <span>{edgeLabel('worker', 'db') ?? 'store'}</span>
            </div>
            {dokkaebiNode('db', 'vault')}
          </div>
          <p className="project-diagram__dokkaebi-note">Approval passes through an airlock before the scan enters its isolated chamber; only the resulting report returns to the evidence vault.</p>
        </div>
      ) : (
      <svg className="project-diagram__svg" viewBox="0 0 100 58" role="img" aria-labelledby={`${titleId} ${descId}`} preserveAspectRatio="none">
        <title>{diagram.title}</title>
        <desc>{diagram.summary}</desc>
        <defs>
          <marker id={`arrow-${projectNumber}`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" className="project-diagram__arrow" />
          </marker>
        </defs>

        {diagram.edges.map((edge) => {
          const from = positions.get(edge.from);
          const to = positions.get(edge.to);
          if (!from || !to) return null;

          return (
            <g key={`${edge.from}-${edge.to}`}>
              <line
                x1={from.x + 5}
                y1={from.y}
                x2={to.x - 5}
                y2={to.y}
                className="project-diagram__edge"
                markerEnd={`url(#arrow-${projectNumber})`}
              />
              {edge.label ? (
                <text x={(from.x + to.x) / 2} y={from.y - 8} className="project-diagram__edge-label" textAnchor="middle">
                  {edge.label}
                </text>
              ) : null}
            </g>
          );
        })}

        {diagram.nodes.map((node) => {
          const pos = positions.get(node.id);
          if (!pos) return null;

          return (
            <g key={node.id} className={`project-diagram__node project-diagram__node--${node.tone ?? 'ink'}`}>
              <rect x={pos.x - 7} y={pos.y - 7} width="14" height="14" rx="1" />
              <text x={pos.x} y={pos.y + 22} textAnchor="middle">
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
      )}

      {!isFraudDiagram && !isDokkaebiDiagram ? <ol className="project-diagram__text-path" aria-label="Diagram text path">
        {diagram.nodes.map((node) => (
          <li key={node.id}>
            <strong>{node.label}</strong>
            <span>{node.detail}</span>
          </li>
        ))}
      </ol>
      : null}
    </figure>
  );
}
