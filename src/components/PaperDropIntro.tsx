'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { withBasePath } from '../lib/base-path';

const loaderImagePaths = [
  '/images/loader-standard/portfolio7.jpg',
  '/images/loader-standard/portfoliointro2.gif',
  '/images/loader-standard/portfolio4.jpg',
  '/images/loader-standard/portfolio11.jpg',
  '/images/loader-standard/portfolio_intro.jpg',
  '/images/loader-standard/portfolio9.jpg',
  '/images/loader-standard/portfolio3.jpg',
  '/images/loader-standard/portfolio13.jpg',
  '/images/loader-standard/portfolio6.jpg',
  '/images/loader-standard/portfolio12.jpg',
  '/images/loader-standard/portfolio5.jpg',
  '/images/loader-standard/portfoliointro2.jpg',
  '/images/loader-standard/portfolio10.jpg',
  '/images/loader-standard/portfolio8.jpg',
] as const;

const textCards = [
  {
    className: 'c1 loader-copy--word',
    duration: 620,
    content: <div className="big-char" lang="ar" dir="rtl">فكرة</div>,
  },
  {
    className: 'c2 loader-copy--horizontal loader-copy--left',
    duration: 920,
    content: (
      <div className="loader-copy" lang="en">
        <span className="loader-copy__index">01 / OBSERVE</span>
        <p className="loader-copy__sentence">Every interface begins with a question worth investigating.</p>
      </div>
    ),
  },
  {
    className: 'c3 loader-copy--vertical loader-copy--edge-right',
    duration: 780,
    content: <p className="loader-copy__vertical-sentence" lang="fr">Chaque détail raconte une histoire.</p>,
  },
  {
    className: 'c4 loader-copy--horizontal loader-copy--arabic',
    duration: 900,
    content: (
      <div className="loader-copy" lang="ar" dir="rtl">
        <span className="loader-copy__index">02 / اكتشاف</span>
        <p className="loader-copy__sentence">أحوّل الأفكار المعقّدة إلى تجارب رقمية واضحة وحيوية.</p>
      </div>
    ),
  },
  {
    className: 'c5 loader-copy--number',
    duration: 420,
    content: <div className="big-num">03</div>,
  },
  {
    className: 'c1 loader-copy--split',
    duration: 880,
    content: (
      <div className="loader-copy__split-grid">
        <p lang="fr">Je conçois avec intention.</p>
        <span aria-hidden>×</span>
        <p lang="en">I build with precision.</p>
      </div>
    ),
  },
  {
    className: 'c2 loader-copy--vertical loader-copy--edge-left',
    duration: 760,
    content: <p className="loader-copy__vertical-sentence" lang="en">Design the feeling, then engineer the system.</p>,
  },
  {
    className: 'c3 loader-copy--horizontal loader-copy--right',
    duration: 860,
    content: (
      <div className="loader-copy" lang="fr">
        <span className="loader-copy__index">04 / CONSTRUIRE</span>
        <p className="loader-copy__sentence">Le code devient matière, rythme et mouvement.</p>
      </div>
    ),
  },
  {
    className: 'c4 loader-copy--word',
    duration: 400,
    content: <div className="big-char" lang="en">MOTION</div>,
  },
  {
    className: 'c5 loader-copy--horizontal loader-copy--arabic loader-copy--left',
    duration: 900,
    content: (
      <div className="loader-copy" lang="ar" dir="rtl">
        <span className="loader-copy__index">05 / حركة</span>
        <p className="loader-copy__sentence">التفاصيل الصغيرة هي التي تمنح التجربة شخصيتها.</p>
      </div>
    ),
  },
  {
    className: 'c1 loader-copy--vertical loader-copy--center-line',
    duration: 740,
    content: <p className="loader-copy__vertical-sentence" lang="fr">Créer. Tester. Affiner. Recommencer.</p>,
  },
  {
    className: 'c2 loader-copy--horizontal',
    duration: 850,
    content: (
      <div className="loader-copy" lang="en">
        <span className="loader-copy__index">06 / DELIVER</span>
        <p className="loader-copy__sentence">Useful enough to trust. Distinct enough to remember.</p>
      </div>
    ),
  },
  {
    className: 'c3 loader-copy--word',
    duration: 430,
    content: <div className="big-char" lang="fr">PRÊT</div>,
  },
  {
    className: 'c4 loader-copy--trilingual',
    duration: 1100,
    content: (
      <div className="loader-copy__trilingual">
        <span lang="en">ENTER THE STORY</span>
        <span lang="fr">ENTREZ DANS L’HISTOIRE</span>
        <span lang="ar" dir="rtl">ادخل إلى الحكاية</span>
      </div>
    ),
  },
] as const;

const createLoaderCards = (imageOrder: readonly string[]) => [
  ...textCards.flatMap((card, index) => [
    {
      ...card,
      kind: 'word' as const,
      image: null,
    },
    {
      className: card.className,
      duration: Math.max(260, Math.min(480, Math.round(card.duration * 0.55))),
      kind: 'image' as const,
      image: imageOrder[index],
      content: null,
    },
  ]),
  {
    className: 'cw welcome-card',
    duration: 1800,
    kind: 'welcome' as const,
    image: null,
    content: (
      <>
        <h1>Welcome · Bienvenue · مرحباً</h1>
        <p>the portfolio is ready / le portfolio est prêt / الملف جاهز</p>
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
