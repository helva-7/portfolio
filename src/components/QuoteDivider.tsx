'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { DeconstructionPage } from '@/data/portfolio';
import { animateIntertitleCut } from '@/lib/manga-anime';

type QuoteDividerProps = Pick<DeconstructionPage, 'id' | 'kicker' | 'keyword' | 'quote' | 'supportingTerms' | 'backgroundImage'>;

export default function QuoteDivider({ id, kicker, keyword, quote, supportingTerms, backgroundImage }: QuoteDividerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasCutIn, setHasCutIn] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHasCutIn(true);
      return;
    }

    const timeline = animateIntertitleCut(section);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasCutIn(true);
          timeline?.play();
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(section);

    return () => {
      timeline?.pause?.();
      timeline?.revert?.();
      observer.disconnect();
    };
  }, []);

  const fragmentPoint = Math.max(2, Math.ceil(keyword.length * 0.52));
  const firstFragment = keyword.slice(0, fragmentPoint);
  const secondFragment = keyword.slice(fragmentPoint);

  return (
    <section
      ref={sectionRef}
      className={`intertitle-trigger intertitle-trigger--${id} whiteboard-section ${hasCutIn ? 'is-cut-in' : ''}`}
      data-keyword={keyword}
    >
      <Image className="intertitle-trigger__image" src={backgroundImage} alt="" fill sizes="100vw" />
      <div className="intertitle-trigger__veil" aria-hidden />
      <div className="intertitle-trigger__fragments" aria-hidden>
        <span>{firstFragment}</span>
        {secondFragment ? <span>{secondFragment}</span> : null}
      </div>
      <div className="intertitle-trigger__content">
        <p className="intertitle-trigger__kicker">{kicker}</p>
        <h2 className="intertitle-trigger__keyword">{keyword}</h2>
        <p className="intertitle-trigger__quote">{quote}</p>
        <div className="intertitle-trigger__terms" aria-label="Chapter themes">
          {supportingTerms.slice(0, 3).map((term) => <span key={term}>{term}</span>)}
        </div>
      </div>
    </section>
  );
}
