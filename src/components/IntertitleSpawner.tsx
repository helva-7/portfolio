'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { deconstructionPages } from '@/data/portfolio';

type ActiveSpawn = {
  id: string;
  progress: number;
  strength: number;
};

export default function IntertitleSpawner() {
  const [active, setActive] = useState<ActiveSpawn | null>(null);

  const pageMap = useMemo(() => new Map(deconstructionPages.map((page) => [page.id, page])), []);

  useEffect(() => {
    const triggerElements = Array.from(document.querySelectorAll<HTMLElement>('[data-intertitle-trigger]'));

    if (!triggerElements.length) {
      return;
    }

    const triggers = triggerElements
      .map((element) => ({
        element,
        id: element.getAttribute('data-intertitle-id') ?? '',
        top: 0,
        height: 0,
      }))
      .filter((trigger) => trigger.id);

    if (!triggers.length) {
      return;
    }

    let updateFrame = 0;
    let measureFrame = 0;

    const measureTriggers = () => {
      const scrollY = window.scrollY;

      triggers.forEach((trigger) => {
        const rect = trigger.element.getBoundingClientRect();
        trigger.top = rect.top + scrollY;
        trigger.height = rect.height;
      });
    };

    const update = () => {
      updateFrame = 0;

      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      let nextActive: ActiveSpawn | null = null;

      triggers.forEach((trigger) => {
        if (!trigger.height) {
          return;
        }

        const progress = (viewportHeight - (trigger.top - scrollY)) / (viewportHeight + trigger.height);

        if (progress <= 0 || progress >= 1) {
          return;
        }

        const strength = 1 - Math.min(Math.abs(progress - 0.5) / 0.5, 1);

        if (!nextActive || strength > nextActive.strength) {
          nextActive = { id: trigger.id, progress, strength };
        }
      });

      setActive((current) => {
        if (
          current &&
          nextActive &&
          current.id === nextActive.id &&
          Math.abs(current.progress - nextActive.progress) < 0.002 &&
          Math.abs(current.strength - nextActive.strength) < 0.002
        ) {
          return current;
        }

        if (!current && !nextActive) {
          return current;
        }

        return nextActive;
      });

    };

    const requestUpdate = () => {
      if (updateFrame) {
        return;
      }

      updateFrame = window.requestAnimationFrame(update);
    };

    const requestMeasure = () => {
      if (measureFrame) {
        return;
      }

      measureFrame = window.requestAnimationFrame(() => {
        measureFrame = 0;
        measureTriggers();
        requestUpdate();
      });
    };

    measureTriggers();
    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestMeasure);

    return () => {
      if (updateFrame) {
        window.cancelAnimationFrame(updateFrame);
      }

      if (measureFrame) {
        window.cancelAnimationFrame(measureFrame);
      }

      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestMeasure);
    };
  }, []);

  const page = active ? pageMap.get(active.id) : null;

  const opacity = active ? Math.min(active.strength / 0.62, 1) : 0;
  const imageScale = active ? 1.06 - active.strength * 0.04 : 1.06;
  const frameOffset = active ? (0.5 - active.progress) * 80 : 0;
  const wordOffset = active ? (0.5 - active.progress) * -140 : 0;

  return (
    <div className={`intertitle-spawn ${page ? 'is-active' : ''}`} aria-hidden={!page}>
      {page ? (
        <div className={`intertitle-spawn__stage intertitle-spawn__stage--${page.id}`} style={{ opacity }}>
          <Image
            src={page.backgroundImage}
            alt=""
            fill
            sizes="100vw"
            className="intertitle-spawn__image"
            priority={false}
            style={{ transform: `scale(${imageScale})` }}
          />
          <div className="intertitle-spawn__veil" />
          <div className="intertitle-spawn__grid" />

          <div className="intertitle-spawn__word" aria-hidden style={{ transform: `translate3d(0, ${wordOffset}px, 0)` }}>
            {page.keyword}
          </div>

          <div className="intertitle-spawn__frame" style={{ transform: `translate3d(0, ${frameOffset}px, 0)` }}>
            <p className="intertitle-spawn__kicker">{page.kicker}</p>
            <h2 className="intertitle-spawn__title">{page.keyword}</h2>
            <p className="intertitle-spawn__quote">{page.quote}</p>
            {page.aside ? <p className="intertitle-spawn__aside">{page.aside}</p> : null}
            <div className="intertitle-spawn__terms">
              {page.supportingTerms.map((term) => (
                <span key={term}>{term}</span>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
