'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { withBasePath } from '../lib/base-path';

const loaderImagePaths = [
  '/images/loader/portfolio7.jpg',
  '/images/loader/portfoliointro2.gif',
  '/images/loader/portfolio4.jpg',
  '/images/loader/portfolio11.jpg',
  '/images/loader/portfolio_intro.jpg',
  '/images/loader/portfolio9.jpg',
  '/images/loader/portfolio3.jpg',
  '/images/loader/portfolioreplace.gif',
  '/images/loader/portfolio6.jpg',
  '/images/loader/portfolio5.jpg',
  '/images/loader/portfoliointro2.jpg',
  '/images/loader/portfolio8.jpg',
  '/images/loader/portfolioreplace.jpg',
  '/images/loader/portfolioreplace2.jpg',
  '/images/loader/portfolioreplace3.jpg',
] as const;

const textCards = [
  {
    className: 'c1 loader-copy--word',
    duration: 1400,
    imageDuration: 1200,
    content: <div className="big-char" lang="ar" dir="rtl">فكرة</div>,
  },
  {
    className: 'c2 loader-copy--field loader-copy--field-horizontal',
    duration: 1050,
    imageDuration: 900,
    content: (
      <div className="loader-copy__field" lang="en">
        <p>Observe the system.</p>
        <p>Find the friction.</p>
        <p>Shape a response worth remembering.</p>
      </div>
    ),
  },
  {
    className: 'c3 loader-copy--field loader-copy--field-vertical',
    duration: 780,
    imageDuration: 680,
    content: (
      <div className="loader-copy__field" lang="fr">
        <p>Chaque détail raconte une histoire.</p>
        <p>Chaque mouvement guide le regard.</p>
        <p>Chaque choix construit le rythme.</p>
      </div>
    ),
  },
  {
    className: 'c4 loader-copy--word',
    duration: 580,
    imageDuration: 500,
    content: <div className="big-char" lang="ar" dir="rtl">اكتشاف</div>,
  },
  {
    className: 'c5 loader-copy--number',
    duration: 430,
    imageDuration: 370,
    content: <div className="big-num">03</div>,
  },
  {
    className: 'c1 loader-copy--field loader-copy--field-horizontal',
    duration: 320,
    imageDuration: 280,
    content: (
      <div className="loader-copy__field">
        <p lang="fr">Je conçois avec intention.</p>
        <p lang="en">I build with precision.</p>
        <p lang="fr">Le résultat doit sembler évident.</p>
      </div>
    ),
  },
  {
    className: 'c2 loader-copy--field loader-copy--field-vertical loader-copy--field-vertical-reverse',
    duration: 245,
    imageDuration: 215,
    content: (
      <div className="loader-copy__field" lang="en">
        <p>Design the feeling.</p>
        <p>Engineer the system.</p>
        <p>Refine every transition.</p>
      </div>
    ),
  },
  {
    className: 'c3 loader-copy--field loader-copy--field-horizontal',
    duration: 185,
    imageDuration: 160,
    content: (
      <div className="loader-copy__field" lang="fr">
        <p>Le code devient matière.</p>
        <p>Le rythme devient mouvement.</p>
        <p>L’interface devient expérience.</p>
      </div>
    ),
  },
  {
    className: 'c4 loader-copy--word',
    duration: 140,
    imageDuration: 125,
    content: <div className="big-char" lang="en">MOTION</div>,
  },
  {
    className: 'c5 loader-copy--word',
    duration: 110,
    imageDuration: 98,
    content: <div className="big-char" lang="ar" dir="rtl">حركة</div>,
  },
  {
    className: 'c1 loader-copy--field loader-copy--field-vertical',
    duration: 88,
    imageDuration: 80,
    content: (
      <div className="loader-copy__field" lang="fr">
        <p>Créer avec curiosité.</p>
        <p>Tester avec honnêteté.</p>
        <p>Affiner avec patience.</p>
        <p>Recommencer avec intention.</p>
      </div>
    ),
  },
  {
    className: 'c2 loader-copy--field loader-copy--field-horizontal',
    duration: 74,
    imageDuration: 68,
    content: (
      <div className="loader-copy__field" lang="en">
        <p>Useful enough to trust.</p>
        <p>Distinct enough to remember.</p>
      </div>
    ),
  },
  {
    className: 'c3 loader-copy--word',
    duration: 64,
    imageDuration: 60,
    content: <div className="big-char" lang="fr">PRÊT</div>,
  },
  {
    className: 'c4 loader-copy--field loader-copy--field-horizontal loader-copy--field-final',
    duration: 58,
    imageDuration: 56,
    content: (
      <div className="loader-copy__field">
        <p lang="en">Enter the story.</p>
        <p lang="fr">Entrez dans l’histoire.</p>
        <p lang="ar" dir="rtl">ابدأ</p>
      </div>
    ),
  },
  {
    className: 'c5 loader-copy--number',
    duration: 54,
    imageDuration: 52,
    content: <div className="big-num">07</div>,
  },
] as const;

const paceClass = (index: number) => {
  if (index < 3) return 'portfolio-loader__card--slow';
  if (index < 7) return 'portfolio-loader__card--ramp';
  return 'portfolio-loader__card--rapid';
};

const createLoaderCards = (imageOrder: readonly string[]) => [
  ...textCards.flatMap((card, index) => {
    const cadence = paceClass(index);

    return [
      {
        ...card,
        className: `${card.className} ${cadence}`,
        kind: 'word' as const,
        image: null,
      },
      {
        className: `${card.className} ${cadence}`,
        duration: card.imageDuration,
        kind: 'image' as const,
        image: imageOrder[index],
        content: null,
      },
    ];
  }),
  {
    className: 'cw welcome-card',
    duration: 1800,
    kind: 'welcome' as const,
    image: null,
    content: (
      <>
        <h1>Welcome · Bienvenue · مرحباً</h1>
        <p>the portfolio is ready / le portfolio est prêt / جاهز</p>
      </>
    ),
  },
] as const;

function shuffleImages(images: readonly string[]) {
  const shuffled = [...images];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

/**
 * A Bakemonogatari-inspired multilingual loader adapted to the portfolio's
 * visual system, alternating editorial text compositions and project imagery.
 */
export default function PaperDropIntro() {
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const [imageOrder, setImageOrder] = useState<readonly string[]>(loaderImagePaths);
  const [isOpen, setIsOpen] = useState(true);
  const loaderCards = createLoaderCards(imageOrder);

  const clearAll = useCallback(() => {
    timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    timeoutsRef.current = [];
  }, []);

  const showCard = useCallback((index: number) => {
    const stage = stageRef.current;
    const progress = progressRef.current;
    if (!stage || !progress) return;

    const cards = stage.querySelectorAll<HTMLElement>('.portfolio-loader__card');
    cards.forEach((card) => card.classList.remove('active'));
    if (index >= cards.length) return;

    const card = cards[index];
    card.classList.add('active');

    const duration = Number(card.dataset.duration) || 300;
    const doesBump = card.dataset.bump === 'true';

    progress.style.transition = 'none';
    progress.style.width = '0%';
    progress.style.color = window.getComputedStyle(card).color;
    void progress.offsetWidth;

    if (duration > 0 && !doesBump) {
      progress.style.transition = `width ${duration}ms linear`;
      progress.style.width = '100%';
    }

    if (index < cards.length - 1) {
      const timeout = setTimeout(() => showCard(index + 1), duration);
      timeoutsRef.current.push(timeout);
    }
  }, []);

  const restartSequence = useCallback(() => {
    clearAll();
    const progress = progressRef.current;
    if (progress) {
      progress.style.transition = 'none';
      progress.style.width = '0%';
    }
    showCard(0);
  }, [clearAll, showCard]);

  const skipSequence = useCallback(() => {
    clearAll();
    const stage = stageRef.current;
    const progress = progressRef.current;
    if (!stage || !progress) return;

    const cards = stage.querySelectorAll<HTMLElement>('.portfolio-loader__card');
    cards.forEach((card) => card.classList.remove('active'));
    cards[cards.length - 1]?.classList.add('active');
    progress.style.width = '0%';
    progress.style.transition = 'none';
  }, [clearAll]);

  const enterSite = useCallback(() => {
    clearAll();
    setIsOpen(false);
  }, [clearAll]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsOpen(false);
      return;
    }

    loaderImagePaths.forEach((path) => {
      const image = new window.Image();
      image.src = withBasePath(path);
    });
    setImageOrder(shuffleImages(loaderImagePaths));

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    restartSequence();

    return () => {
      clearAll();
      document.body.style.overflow = previousOverflow;
    };
  }, [clearAll, restartSequence]);

  useEffect(() => {
    if (!isOpen) document.body.style.overflow = '';
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div ref={stageRef} className="portfolio-loader" role="dialog" aria-label="Portfolio loading sequence">
      {loaderCards.map((card, index) => (
        <div
          key={index}
          className={`portfolio-loader__card ${card.className}${card.kind === 'image' ? ' portfolio-loader__image-card' : ''}${index === 0 ? ' active' : ''}`}
          data-duration={card.duration}
          data-bump={card.kind === 'welcome' ? 'true' : undefined}
        >
          {card.kind === 'image' && card.image ? (
            <img
              className="portfolio-loader__image"
              src={withBasePath(card.image)}
              alt=""
              draggable={false}
            />
          ) : card.content}
          {card.kind === 'welcome' && (
            <button type="button" className="portfolio-loader__enter" onClick={enterSite}>
              enter
            </button>
          )}
        </div>
      ))}

      <div ref={progressRef} className="portfolio-loader__progress" aria-hidden="true" />

      <div className="portfolio-loader__controls">
        <button type="button" onClick={restartSequence}>replay</button>
        <button type="button" onClick={skipSequence}>skip</button>
      </div>
    </div>
  );
}
