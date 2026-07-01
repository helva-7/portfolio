import type { Project } from '@/data/portfolio';
import ImagePanel from './ImagePanel';

interface ProjectChapterCardProps {
  project: Project;
  index: number;
}

export default function ProjectChapterCard({ project, index }: ProjectChapterCardProps) {
  return (
    <article className="group">
      <div className="flex items-start gap-3 md:gap-5">
        <span className="shrink-0 font-display text-4xl leading-none text-ink/15 md:text-5xl">
          {project.number.padStart(2, '0')}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-[clamp(1.4rem,3vw,2.2rem)] leading-[0.82] tracking-tight text-ink transition-colors group-hover:text-red">
            {project.name}
          </h3>
          <p className="mt-1 border-l-4 border-red pl-3 font-body text-[0.5rem] font-bold uppercase tracking-[0.12em] text-ink/60">
            {project.quote}
          </p>
        </div>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-[1fr_1.2fr] md:gap-5">
        <ImagePanel
          src={project.image}
          label={`Replace: ${project.name} screenshot`}
          className="aspect-[4/3] w-full"
        />
        <div>
          <p className="font-body text-sm font-bold leading-6 text-ink/80">
            {project.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="border-[2px] border-ink px-2 py-0.5 font-body text-[0.5rem] font-black uppercase tracking-[0.1em] text-ink"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
