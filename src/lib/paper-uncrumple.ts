import { animate, createTimer, stagger, utils } from 'animejs';
import { useEffect, type RefObject } from 'react';

/**
 * Hook that gives a container of paper cards a "crumpled → smooth" uncrumple
 * effect. Each child element animates in with a randomized rotation, scale,
 * clipPath wipe and a brief shadow pop — like a hand unfolding a paper note.
 *
 * Usage:
 *   const ref = useRef<HTMLDivElement>(null);
 *   usePaperUncrumple<HTMLDivElement>({ selector: '.project-file' }, ref);
 *   <div ref={ref}>...</div>
 */
export function usePaperUncrumple<T extends HTMLElement>(
  options: {
    selector: string;
    threshold?: number;
    rootMargin?: string;
    /** delay between cards in ms (passed to stagger) */
    staggerMs?: number;
    /** per-card duration in ms */
    durationMs?: number;
    /** force the animation to play even on small screens / reduced motion */
    force?: boolean;
  },
  ref: RefObject<T | null>,
) {
  const {
    selector,
    threshold = 0.18,
    rootMargin = '0px 0px -8% 0px',
    staggerMs = 110,
    durationMs = 1100,
    force = false,
  } = options;

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // Respect user motion preferences
    if (
      !force &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      // Just make them visible
      const targets = container.querySelectorAll<HTMLElement>(selector);
      targets.forEach((el) => el.classList.add('is-uncrumpled'));
      return;
    }

    const targets = Array.from(container.querySelectorAll<HTMLElement>(selector));
    if (targets.length === 0) return;

    // Seed each card with a unique "crumple fingerprint" so they don't all
    // animate identically. We keep these on the element so the IntersectionObserver
    // entry knows which one is which.
    targets.forEach((el, i) => {
      el.style.setProperty('--uncrumple-rotate', `${(i % 2 === 0 ? -1 : 1) * (4 + Math.random() * 5)}deg`);
      el.style.setProperty('--uncrumple-scale', `${0.86 + Math.random() * 0.06}`);
      el.style.setProperty('--uncrumple-shift', `${(i % 2 === 0 ? -1 : 1) * (12 + Math.random() * 10)}px`);
      el.style.setProperty('--uncrumple-delay', `${(i * staggerMs) % 360}ms`);
    });

    let observer: IntersectionObserver | null = null;

    const uncrumpleOne = (el: HTMLElement) => {
      if (el.dataset.uncrumpled === '1') return;
      el.dataset.uncrumpled = '1';

      const rotate = parseFloat(el.style.getPropertyValue('--uncrumple-rotate'));
      const scale = parseFloat(el.style.getPropertyValue('--uncrumple-scale'));
      const shift = parseFloat(el.style.getPropertyValue('--uncrumple-shift'));

      // 1) Crumple appearance — slight tilt + scale + clipPath wedge
      utils.set(el, {
        rotate,
        scale,
        translateX: shift,
        translateY: shift * 0.4,
        opacity: 0,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      });

      // 2) Animate to flat. We use a stepped animation for the "fold lines"
      //    (clipPath via SVG-like polygon motion) and a smooth transform.
      animate(el, {
        opacity: [0, 1],
        translateX: [{ to: 0 }],
        translateY: [{ to: 0 }],
        rotate: [{ to: 0 }],
        scale: [{ to: 1 }],
        // "Uncrumple" feels best with a custom keyframed clipPath that
        // progressively exposes more of the paper — like pulling creases out.
        clipPath: [
          { to: 'polygon(8% 6%, 96% 4%, 100% 100%, 4% 96%)' },
          { to: 'polygon(2% 2%, 99% 3%, 100% 100%, 1% 99%)' },
          { to: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
        ],
        duration: durationMs,
        ease: 'out(4)',
        // "shadow pop" — we can't tween box-shadow directly in anime v4, so
        // we toggle a CSS class on completion which raises the shadow.
        onComplete: () => {
          // Clear the inline transform/opacity/clip-path so the original
          // CSS rules (.project-file--left/--right tilt, hover lift, etc.)
          // take over again. The `is-uncrumpled` class is what we keep.
          el.style.removeProperty('transform');
          el.style.removeProperty('opacity');
          el.style.removeProperty('clip-path');
          el.classList.add('is-uncrumpled');
        },
      });
    };

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            uncrumpleOne(entry.target as HTMLElement);
            observer?.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin },
    );

    targets.forEach((el) => observer!.observe(el));

    return () => {
      observer?.disconnect();
      utils.remove(targets);
    };
  }, [selector, threshold, rootMargin, staggerMs, durationMs, force]);

  return ref;
}

/**
 * Standalone helper: animate a single element with a "paper drop" effect —
 * falls in from above with a slight rotation, then settles flat. Useful for
 * the page-load intro.
 */
export function paperDropIn(el: HTMLElement, delay = 0) {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    utils.set(el, { opacity: 1, translateY: 0, rotate: 0 });
    return;
  }

  utils.set(el, {
    opacity: 0,
    translateY: -120,
    rotate: -6,
    scale: 0.96,
    transformOrigin: '50% 0%',
  });

  animate(el, {
    opacity: [0, 1],
    translateY: [-120, 8, 0],
    rotate: [-6, 1.4, 0],
    scale: [0.96, 1.005, 1],
    duration: 1100,
    delay,
    ease: 'out(3)',
  });
}

/**
 * Animates a "ticker tape" style handwritten signature — the stroke of an
 * ink pen drawing a word onto paper. Useful for section eyebrows like
 * "PROJECT ARCHIVE" being signed onto the page.
 */
export function drawInkSignature(el: HTMLElement, durationMs = 1400) {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const text = el.textContent ?? '';
  el.textContent = '';
  el.style.setProperty('--ink-signature-len', `${text.length}`);
  el.classList.add('is-ink-signing');

  // reveal chars one by one
  const chars = text.split('');
  chars.forEach((c, i) => {
    const span = document.createElement('span');
    span.className = 'ink-char';
    span.textContent = c;
    span.style.setProperty('--i', `${i}`);
    el.appendChild(span);
  });

  animate(el.querySelectorAll('.ink-char'), {
    opacity: [0, 1],
    translateY: [8, 0],
    duration: 60,
    delay: stagger(28, { start: 80 }),
    ease: 'out(2)',
  });

  createTimer({
    duration: durationMs,
    onComplete: () => el.classList.add('is-ink-signed'),
  });
}
