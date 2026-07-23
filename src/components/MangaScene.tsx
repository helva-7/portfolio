import type { Scene } from '@/data/portfolio';
import ImagePanel from './ImagePanel';
import MangaDictionaryReveal from './MangaDictionaryReveal';
import QuotePanel from './QuotePanel';
import Reveal from './Reveal';

interface MangaSceneProps {
  scene: Scene;
}

export default function MangaScene({ scene }: MangaSceneProps) {
  const sceneSignals: Record<string, { oddity: string; note: string; term: string; definition: string }> = {
    origin: {
      oddity: 'ODDITY / ORIGIN',
      note: '[REDACTED] curiosity became systems thinking before vocabulary caught up.',
      term: 'origin',
      definition: 'The first pattern, noticed before it had a name.',
    },
    'first-builds': {
      oddity: 'ODDITY / PROOF',
      note: '[REDACTED] first browser obedience triggered repeat-build behavior.',
      term: 'proof',
      definition: 'A small working thing that makes the next thing unavoidable.',
    },
    trial: {
      oddity: 'ODDITY / INCIDENT',
      note: '[REDACTED] failure was severe but not terminal. protocol continued.',
      term: 'incident',
      definition: 'A break that changes the system without ending it.',
    },
    craft: {
      oddity: 'ODDITY / METHOD',
      note: '[REDACTED] repeatability replaced luck. systems stabilized under pressure.',
      term: 'method',
      definition: 'Luck rewritten until it can be repeated under pressure.',
    },
  };

  const signal = sceneSignals[scene.id];

  const content = (
    <section
      id={scene.id}
      tabIndex={-1}
      className="scene-sheet relative z-10 grid items-center gap-8 overflow-visible p-6 md:p-8 lg:grid-cols-[1fr_0.9fr]"
    >
      <MangaDictionaryReveal aria-label={`${signal.term} definition`}>
        <span className="dictionary-card__index">怪異辞典 / {scene.chapterLabel}</span>
        <strong className="dictionary-card__term">{signal.term}</strong>
        <span className="dictionary-card__rule" />
        <p>{signal.definition}</p>
      </MangaDictionaryReveal>

      <span className="scene-bg-word right-0 top-0 -z-10 rotate-3">
        {scene.backgroundWord}
      </span>

      {scene.reverse ? (
        <>
          <Reveal direction="right" className="lg:order-2">
            <div className="scene-sheet__media relative">
              <ImagePanel
                src={scene.image}
                label={scene.imageLabel}
                alt={scene.imageAlt}
                imageClassName={scene.imageClassName}
                imageFit={scene.imageFit}
                className={`w-full ${scene.imagePanelClassName || 'aspect-[4/3]'}`}
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
            <div className="scene-sheet__copy max-w-xl">
              <p className="section-oddity">{signal.oddity}</p>
              <span className="scene-sheet__kicker mb-3 inline-block border-[3px] border-ink bg-ink px-3 py-1 font-body text-[0.55rem] font-black uppercase tracking-[0.2em] text-paper">
                CHAPTER {scene.chapterLabel}
              </span>
              <h2 className="scene-sheet__title mt-4 font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.82] tracking-tight text-ink">
                {scene.title}
              </h2>
              <div className="scene-sheet__quote mt-6">
                <QuotePanel text={scene.quote} />
              </div>
              <p className="scene-sheet__body mt-6 border-[4px] border-ink bg-paper/90 px-5 py-4 font-body text-base font-bold leading-7 text-ink/85 shadow-manga">
                {scene.body}
              </p>
              <p className="redacted-note mt-4">{signal.note}</p>
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
             <div className="scene-sheet__copy max-w-xl">
               <p className="section-oddity">{signal.oddity}</p>
               <span className="scene-sheet__kicker mb-3 inline-block border-[3px] border-ink bg-ink px-3 py-1 font-body text-[0.55rem] font-black uppercase tracking-[0.2em] text-paper">
                 CHAPTER {scene.chapterLabel}
               </span>
               <h2 className="scene-sheet__title mt-4 font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.82] tracking-tight text-ink">
                 {scene.title}
               </h2>
               <div className="scene-sheet__quote mt-6">
                 <QuotePanel text={scene.quote} />
               </div>
               <p className="scene-sheet__body mt-6 border-[4px] border-ink bg-paper/90 px-5 py-4 font-body text-base font-bold leading-7 text-ink/85 shadow-manga">
                 {scene.body}
               </p>
               <p className="redacted-note mt-4">{signal.note}</p>
               {scene.subQuote && (
                 <div className="mt-4">
                   <QuotePanel text={scene.subQuote} dark />
                </div>
              )}
            </div>
          </Reveal>
          <Reveal direction="right">
            <div className="scene-sheet__media relative">
              <ImagePanel
                src={scene.image}
                label={scene.imageLabel}
                alt={scene.imageAlt}
                imageClassName={scene.imageClassName}
                imageFit={scene.imageFit}
                className={`w-full ${scene.imagePanelClassName || 'aspect-[4/3]'}`}
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
