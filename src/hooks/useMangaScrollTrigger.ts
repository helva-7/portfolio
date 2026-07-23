'use client';

import { useEffect, useRef } from 'react';
import { animate, onScroll, type JSAnimation, type ScrollObserver } from 'animejs';
import { prefersReducedMotion } from '@/lib/manga-anime';

type MangaScrollAnimation = {
  from?: Record<string, string | number | (string | number)[]>;
  to: Record<string, string | number | (string | number)[]>;
  duration?: number;
  delay?: number;
  ease?: string;
};

type UseMangaScrollTriggerOptions = {
  animation: MangaScrollAnimation;
  enter?: string;
  leave?: string;
  once?: boolean;
  enabled?: boolean;
  onEnter?: () => void;
};

export function useMangaScrollTrigger<T extends HTMLElement>({
  animation,
  enter = 'top 82%',
  leave = 'bottom top',
  once = true,
  enabled = true,
  onEnter,
}: UseMangaScrollTriggerOptions) {
  const ref = useRef<T>(null);
  const animationRef = useRef<JSAnimation | null>(null);
  const observerRef = useRef<ScrollObserver | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;

    if (prefersReducedMotion()) {
      Object.entries(animation.to).forEach(([key, value]) => {
        const resolved = Array.isArray(value) ? value[value.length - 1] : value;
        if (key === 'opacity') {
          element.style.opacity = String(resolved);
        }
      });
      element.classList.add('is-motion-ready');
      onEnter?.();
      return;
    }

    if (animation.from) {
      animate(element, {
        ...animation.from,
        duration: 0,
      });
    }

    animationRef.current = animate(element, {
      ...animation.to,
      duration: animation.duration ?? 680,
      delay: animation.delay ?? 0,
      ease: animation.ease ?? 'out(3)',
      autoplay: false,
    });

    observerRef.current = onScroll({
      target: element,
      enter,
      leave,
      repeat: !once,
      onEnter: () => {
        animationRef.current?.play();
        onEnter?.();
      },
    });

    return () => {
      animationRef.current?.pause();
      animationRef.current?.revert?.();
      observerRef.current?.revert?.();
    };
  }, [animation, enabled, enter, leave, once, onEnter]);

  return ref;
}
