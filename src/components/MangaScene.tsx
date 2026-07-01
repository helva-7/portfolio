import type { Scene } from '@/data/portfolio';
import ImagePanel from './ImagePanel';
import QuotePanel from './QuotePanel';

interface MangaSceneProps {
  scene: Scene;
}

export default function MangaScene({ scene }: MangaSceneProps) {
  return (
    <section
      id={scene.id}
      className="relative"
    >
      <span className="scene-bg-word right-2 top-2 -z-10 rotate-3 md:right-4 md:top-4">
        {scene.backgroundWord}
      </span>

      <div className={`flex flex-col gap-5 md:flex-row md:gap-8 ${scene.reverse ? 'md:flex-row-reverse' : ''}`}>
        <div className="flex-1">
          <span className="mb-2 inline-block border-[3px] border-ink bg-ink px-2.5 py-1 font-body text-[0.5rem] font-black uppercase tracking-[0.2em] text-paper">
            CHAPTER {scene.chapterLabel}
          </span>
          <h2 className="mt-3 font-display text-[clamp(1.8rem,5vw,3.5rem)] leading-[0.82] tracking-tight text-ink">
            {scene.title}
          </h2>
          <div className="mt-4">
            <QuotePanel text={scene.quote} />
          </div>
          <div className="mt-4 border-[4px] border-ink bg-paper px-4 py-3 font-body text-sm font-bold leading-6 text-ink/85">
            {scene.body}
          </div>
          {scene.subQuote && (
            <div className="mt-3">
              <QuotePanel text={scene.subQuote} dark />
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="relative">
            <ImagePanel
              src={scene.image}
              label={scene.imageLabel}
              className="aspect-[4/3] w-full"
              broken={scene.broken}
            />
            {scene.broken && (
              <>
                <div className="absolute -bottom-2 -right-2 z-20 h-1 w-3/4 bg-red" />
                <div className="absolute -top-2 -left-2 z-20 h-1 w-1/2 bg-ink" />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
