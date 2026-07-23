import { animate, createTimeline, onScroll, stagger, type JSAnimation, type Timeline } from 'animejs';

export const MANGA_EASE = {
  paperSettle: 'out(3)',
  panelSnap: 'outExpo',
  occultPulse: 'inOut(2)',
  inkReveal: 'out(4)',
} as const;

export const MANGA_DURATION = {
  quick: 420,
  panel: 680,
  uncrumple: 920,
  sequence: 2400,
} as const;

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function setReducedMotionFallback(elements: Element | Element[], className = 'is-motion-ready') {
  const list = Array.isArray(elements) ? elements : [elements];
  list.forEach((element) => element.classList.add(className));
}

type ScrollTriggerOptions = {
  target: HTMLElement;
  enter?: string;
  leave?: string;
  once?: boolean;
};

export function createMangaScrollTrigger({ target, enter = 'top 82%', leave = 'bottom top', once = true }: ScrollTriggerOptions) {
  return onScroll({
    target,
    enter,
    leave,
    repeat: !once,
  });
}

export function animatePaperUncrumple(
  element: HTMLElement,
  index: number,
  options?: { onComplete?: () => void },
): JSAnimation | null {
  const shell = element.closest<HTMLElement>('.project-uncrumple-shell');
  const prop = shell?.querySelector<HTMLElement>('.project-crumple-prop');
  const folds = shell?.querySelectorAll<HTMLElement>('.project-crumple-prop__fold');

  if (prefersReducedMotion()) {
    element.classList.add('is-uncrumpled');
    shell?.classList.remove('project-uncrumple-shell--sealed');
    shell?.classList.add('project-uncrumple-shell--open');
    options?.onComplete?.();
    return null;
  }

  const tilt = index % 2 === 0 ? -1.2 : 1;

  element.classList.add('project-file--crumpled');
  shell?.classList.remove('project-uncrumple-shell--sealed');
  shell?.classList.add('project-uncrumple-shell--unfolding');

  const timeline = createTimeline({ defaults: { ease: MANGA_EASE.paperSettle } });

  if (prop) {
    timeline.add(prop, {
      scale: [1, 1.025],
      rotate: [index % 2 ? 1.5 : -1.5, 0],
      translateY: [0, -8],
      duration: 280,
    });
  }
  if (folds?.length) {
    timeline.add(folds, {
      rotateX: [0, -128],
      translateY: [0, -22],
      opacity: [1, 0.18],
      duration: 620,
      delay: stagger(45),
      ease: 'inOut(3)',
    }, '-=120');
  }
  if (prop) {
    timeline.add(prop, {
      opacity: [1, 0],
      translateY: [-8, -72],
      scale: [1.025, 1.06],
      filter: ['blur(0px)', 'blur(2px)'],
      duration: 360,
    }, '-=260');
  }
  timeline.add(element, {
    opacity: [0, 1],
    scale: [0.94, 1.015, 1],
    scaleY: [0.82, 1.02, 1],
    rotate: [index % 2 ? 2.5 : -2.5, tilt],
    skewX: [index % 2 ? 2 : -2, 0],
    translateY: [34, -6, 0],
    filter: ['brightness(0.76) contrast(1.18) saturate(0.82)', 'brightness(1.03) contrast(1.06) saturate(0.96)', 'brightness(1) contrast(1) saturate(1)'],
    clipPath: [
      'inset(0% 3% 76% 3%)',
      'inset(0% 0% 0% 0%)',
      'inset(0% 0% 0% 0%)',
    ],
    boxShadow: ['4px 8px 8px rgba(23,26,36,.24)', '24px 30px 20px rgba(23,26,36,.18)', '14px 16px 0 rgba(23,26,36,.1)'],
    duration: 880,
    ease: 'out(4)',
    onComplete: () => {
      element.classList.remove('project-file--crumpled');
      element.classList.add('is-uncrumpled');
      shell?.classList.remove('project-uncrumple-shell--sealed');
      shell?.classList.remove('project-uncrumple-shell--unfolding');
      shell?.classList.add('project-uncrumple-shell--open');
      options?.onComplete?.();
    },
  }, '-=120');

  return timeline as unknown as JSAnimation;
}

export function animateOccultDictionary(element: HTMLElement): JSAnimation | null {
  if (prefersReducedMotion()) {
    element.classList.add('is-occult-revealed');
    return null;
  }

  const rule = element.querySelector<HTMLElement>('.dictionary-card__rule');
  const term = element.querySelector<HTMLElement>('.dictionary-card__term');

  const timeline = createTimeline({ defaults: { ease: MANGA_EASE.inkReveal } });

  timeline
    .add(element, {
      opacity: [0, 1],
      scale: [0.86, 1],
      rotate: [-6, -1.4],
      translateY: [-18, 0],
      duration: MANGA_DURATION.panel,
    })
    .add(
      element,
      {
        boxShadow: [
          '0 0 0 rgba(106, 70, 122, 0)',
          '0 0 28px rgba(106, 70, 122, 0.22)',
          '8px 8px 0 rgba(23, 26, 36, 0.1)',
        ],
        duration: 520,
      },
      '-=280',
    );

  if (rule) {
    timeline.add(
      rule,
      {
        scaleX: [0, 1],
        opacity: [0, 1],
        duration: 380,
        ease: MANGA_EASE.panelSnap,
      },
      '-=420',
    );
  }

  if (term) {
    timeline.add(
      term,
      {
        letterSpacing: ['0.28em', '0.02em'],
        opacity: [0, 1],
        duration: 480,
      },
      '-=360',
    );
  }

  timeline.then?.(() => element.classList.add('is-occult-revealed'));

  return timeline as unknown as JSAnimation;
}

export function animateIntertitleCut(section: HTMLElement): Timeline | null {
  if (prefersReducedMotion()) {
    section.classList.add('is-cut-in');
    return null;
  }

  const veil = section.querySelector<HTMLElement>('.intertitle-trigger__veil');
  const keyword = section.querySelector<HTMLElement>('.intertitle-trigger__keyword');
  const fragments = section.querySelectorAll<HTMLElement>('.intertitle-trigger__fragments span');
  const terms = section.querySelectorAll<HTMLElement>('.intertitle-trigger__terms span');

  const timeline = createTimeline({
    defaults: { ease: MANGA_EASE.inkReveal },
    autoplay: false,
  });

  if (veil) {
    timeline.add(veil, {
      translateX: ['-8%', '108%'],
      opacity: [0.92, 0],
      duration: MANGA_DURATION.panel,
    });
  }

  if (fragments.length) {
    timeline.add(
      fragments,
      {
        opacity: [0, 0.14],
        translateY: [24, 0],
        scale: [1.08, 1],
        duration: MANGA_DURATION.quick,
        delay: stagger(80),
      },
      '-=520',
    );
  }

  if (keyword) {
    timeline.add(
      keyword,
      {
        opacity: [0, 1],
        translateY: [36, 0],
        scale: [0.94, 1],
        duration: MANGA_DURATION.panel,
      },
      '-=380',
    );
  }

  if (terms.length) {
    timeline.add(
      terms,
      {
        opacity: [0, 1],
        translateX: [-12, 0],
        duration: MANGA_DURATION.quick,
        delay: stagger(60, { from: 'center' }),
      },
      '-=320',
    );
  }

  timeline.then?.(() => section.classList.add('is-cut-in'));

  return timeline;
}

export type MangaPanelData = {
  id: string;
  label: string;
  glyph: string;
  note: string;
};

export function createMangaPanelSequence(
  container: HTMLElement,
  panels: HTMLElement[],
): Timeline | null {
  if (!panels.length) return null;

  if (prefersReducedMotion()) {
    panels.forEach((panel) => panel.classList.add('is-panel-revealed'));
    return null;
  }

  const timeline = createTimeline({
    defaults: { ease: MANGA_EASE.panelSnap },
    autoplay: false,
  });

  panels.forEach((panel, index) => {
    const inkLine = panel.querySelector<HTMLElement>('.manga-panel-seq__ink');
    const caption = panel.querySelector<HTMLElement>('.manga-panel-seq__caption');

    timeline.add(
      panel,
      {
        opacity: [0, 1],
        translateX: [index % 2 === 0 ? -48 : 48, 0],
        translateY: [32 + index * 8, 0],
        rotate: [index % 2 === 0 ? -4 : 3, index % 2 === 0 ? -0.8 : 0.6],
        scale: [0.88, 1],
        duration: MANGA_DURATION.panel,
      },
      index === 0 ? 0 : '-=420',
    );

    if (inkLine) {
      timeline.add(
        inkLine,
        {
          scaleX: [0, 1],
          opacity: [0, 1],
          duration: 320,
        },
        '-=360',
      );
    }

    if (caption) {
      timeline.add(
        caption,
        {
          opacity: [0, 1],
          translateY: [8, 0],
          duration: 280,
        },
        '-=260',
      );
    }
  });

  timeline.then?.(() => container.classList.add('is-sequence-complete'));

  return timeline;
}

export function animateOccultSigil(root: HTMLElement): JSAnimation | null {
  if (prefersReducedMotion()) {
    root.classList.add('is-sigil-active');
    return null;
  }

  const rings = root.querySelectorAll<HTMLElement>('.occult-sigil__ring');
  const core = root.querySelector<HTMLElement>('.occult-sigil__core');
  const ticks = root.querySelectorAll<HTMLElement>('.occult-sigil__tick');

  const timeline = createTimeline({
    loop: true,
    alternate: true,
    defaults: { ease: MANGA_EASE.occultPulse },
  });

  if (rings.length) {
    timeline.add(
      rings,
      {
        rotate: [0, 360],
        duration: 18000,
        delay: stagger(1200),
      },
      0,
    );
  }

  if (core) {
    timeline.add(
      core,
      {
        scale: [1, 1.06, 1],
        opacity: [0.72, 1, 0.72],
        duration: 3200,
      },
      0,
    );
  }

  if (ticks.length) {
    timeline.add(
      ticks,
      {
        opacity: [0.25, 0.85, 0.25],
        duration: 2400,
        delay: stagger(180, { from: 'center' }),
      },
      0,
    );
  }

  root.classList.add('is-sigil-active');
  return timeline as unknown as JSAnimation;
}
