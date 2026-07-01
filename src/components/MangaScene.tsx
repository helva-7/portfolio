import type { Scene } from '@/data/portfolio';
import ImagePanel from './ImagePanel';
import QuotePanel from './QuotePanel';
import Reveal from './Reveal';

interface MangaSceneProps {
  scene: Scene;
}

export default function MangaScene({ scene }: MangaSceneProps) {
  const content = (
    <section
      id={scene.id}
      className="relative z-10 mx-auto grid min-h-screen max-w-page items-center gap-8 overflow-hidden px-4 py-24 md:px-6 lg:grid-cols-[1fr_0.9fr]"
    >
      <span className="scene-bg-word right-4 top-8 -z-10 rotate-3 animate-drift-slow lg:right-0">
        {scene.backgroundWord}
      </span>

      {scene.reverse ? (
        <>
          <Reveal direction="right" className="lg:order-2">
            <div className="relative">
              <ImagePanel
                src={scene.image}
                label={scene.imageLabel}
                className="aspect-[4/3] w-full"
                broken={scene.broken}
              />
              {scene.broken && (
                <div className="absolute -bottom-3 -right-3 z-20 h-1 w-3/4 bg-red" />
              )}
              {scene.broken && (
                <div className="absolute -top-3 -left-3 z-20 h-1 w-1/2 bg-ink" />
              )}
            </div>
          </Reveal>
          <Reveal direction="left" className="lg:order-1">
            <div className="max-w-xl">
              <span className="mb-3 inline-block border-[3px] border-ink bg-ink px-3 py-1 font-body text-[0.55rem] font-black uppercase tracking-[0.2em] text-paper">
                CHAPTER {scene.chapterLabel}
              </span>
              <h2 className="mt-4 font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.82] tracking-tight text-ink">
                {scene.title}
              </h2>
              <div className="mt-6">
                <QuotePanel text={scene.quote} />
              </div>
              <p className="mt-6 border-[4px] border-ink bg-paper px-5 py-4 font-body text-base font-bold leading-7 text-ink/85 shadow-manga">
                {scene.body}
              </p>
              {scene.subQuote && (
                <div className="mt-4">
                  <QuotePanel text={scene.subQuote} dark />
                </div>
              )}
            </div>
          </Reveal>
        </>
      ) : (
        <>
          <Reveal direction="left">
            <div className="max-w-xl">
              <span className="mb-3 inline-block border-[3px] border-ink bg-ink px-3 py-1 font-body text-[0.55rem] font-black uppercase tracking-[0.2em] text-paper">
                CHAPTER {scene.chapterLabel}
              </span>
              <h2 className="mt-4 font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.82] tracking-tight text-ink">
                {scene.title}
              </h2>
              <div className="mt-6">
                <QuotePanel text={scene.quote} />
              </div>
              <p className="mt-6 border-[4px] border-ink bg-paper px-5 py-4 font-body text-base font-bold leading-7 text-ink/85 shadow-manga">
                {scene.body}
              </p>
              {scene.subQuote && (
                <div className="mt-4">
                  <QuotePanel text={scene.subQuote} dark />
                </div>
              )}
            </div>
          </Reveal>
          <Reveal direction="right">
            <div className="relative">
              <ImagePanel
                src={scene.image}
                label={scene.imageLabel}
                className="aspect-[4/3] w-full"
                broken={scene.broken}
              />
              {scene.broken && (
                <div className="absolute -bottom-3 -right-3 z-20 h-1 w-3/4 bg-red" />
              )}
              {scene.broken && (
                <div className="absolute -top-3 -left-3 z-20 h-1 w-1/2 bg-ink" />
              )}
            </div>
          </Reveal>
        </>
      )}
    </section>
  );

  return (
    <div className="relative">
      {content}
      <div className="absolute inset-x-0 bottom-0 h-px bg-ink/10" />
    </div>
  );
}
