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

const originalCards = [
  { className: 'c1', duration: 700, content: <div className="big-char">化</div> },
  { className: 'c2', duration: 620, content: <><h1>portfolio</h1><h2>loading sequence</h2></> },
  { className: 'c3', duration: 550, content: <div className="big-char">物</div> },
  { className: 'c4', duration: 480, content: <><h1>creative</h1><h2>developer</h2></> },
  { className: 'c5', duration: 420, content: <div className="big-char">語</div> },
  { className: 'c1', duration: 360, content: <><h1>frontend</h1><h2>ui / ux</h2></> },
  { className: 'c2', duration: 310, content: <div className="big-num">01</div> },
  { className: 'c3', duration: 260, content: <><h1>react</h1><h2>typescript</h2></> },
  { className: 'c4', duration: 220, content: <div className="big-num">02</div> },
  { className: 'c5', duration: 180, content: <><h1>design</h1><h2>motion</h2></> },
  { className: 'c1', duration: 150, content: <div className="big-char">怪</div> },
  { className: 'c2', duration: 120, content: <><h1>webgl</h1><h2>shaders</h2></> },
  { className: 'c3', duration: 95, content: <div className="big-num">03</div> },
  { className: 'c4', duration: 75, content: <h1>ready</h1> },
] as const;

const createLoaderCards = (imageOrder: readonly string[]) => [
  ...originalCards.flatMap((card, index) => [
    {
      ...card,
      kind: 'word' as const,
      image: null,
    },
    {
      className: card.className,
      duration: card.duration,
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
        <h1>welcome</h1>
        <p>your portfolio loads here</p>
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
 * The supplied Bakemonogatari-inspired loader, adapted to the portfolio's
 * visual system. Card order, copy, timing, progress, and controls are kept
 * identical to the source intro.
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
