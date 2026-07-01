import type { Project } from '@/data/portfolio';
import ImagePanel from './ImagePanel';
import Reveal from './Reveal';

interface ProjectChapterCardProps {
  project: Project;
  index: number;
}

export default function ProjectChapterCard({ project, index }: ProjectChapterCardProps) {
  return (
    <Reveal direction={index % 2 === 0 ? 'left' : 'right'} delay={index * 120}>
      <article
        className={`group relative border-[6px] border-ink bg-paper p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-manga-red md:p-6 ${
          index % 2 === 0 ? 'md:-rotate-1' : 'md:rotate-1'
        }`}
      >
        <div className="flex items-start gap-3 md:gap-6">
          <span className="shrink-0 font-display text-5xl leading-none text-ink/15 md:text-7xl">
            {project.number.padStart(2, '0')}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] leading-[0.82] tracking-tight text-ink transition-colors group-hover:text-red">
              {project.name}
            </h3>
            <p className="mt-1 border-l-4 border-red pl-3 font-body text-xs font-bold uppercase tracking-[0.12em] text-ink/60">
              {project.quote}
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1.2fr] md:gap-6">
          <ImagePanel
            src={project.image}
            label={`Replace: ${project.name} screenshot`}
            className="aspect-[4/3] w-full"
          />
          <div className="flex flex-col justify-between">
            <div>
              <p className="font-body text-sm font-bold leading-6 text-ink/80 md:text-base">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="border-[2px] border-ink px-2 py-0.5 font-body text-[0.55rem] font-black uppercase tracking-[0.1em] text-ink"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {index < 3 && (
          <div className="absolute -bottom-2 right-8 h-1 w-1/3 bg-ink/10" />
        )}
      </article>
    </Reveal>
  );
}
