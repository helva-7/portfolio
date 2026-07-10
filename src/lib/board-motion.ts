type GsapModule = {
  gsap: any;
  ScrollTrigger: any;
};

function hasWindow() {
  return typeof window !== 'undefined';
}

function prefersReducedMotion() {
  return hasWindow() && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isSmallScreen() {
  return hasWindow() && window.matchMedia('(max-width: 1023px)').matches;
}

export function shouldDisableWhiteboardMotion() {
  return prefersReducedMotion() || isSmallScreen();
}

export function initWhiteboardAdds({ gsap, ScrollTrigger }: GsapModule) {
  const notes = Array.from(document.querySelectorAll<HTMLElement>('[data-board-note]'));

  if (!notes.length) {
    return () => {};
  }

  if (shouldDisableWhiteboardMotion()) {
    gsap.set(notes, { opacity: 1, y: 0, clearProps: 'transform,opacity,clipPath' });
    return () => {};
  }

  const variants: Record<string, any> = {
    origin: { opacity: 0, y: 46, x: -22, rotate: -1.6, clipPath: 'inset(0 18% 0 0)' },
    proof: { opacity: 0, y: 36, x: 28, rotate: 1.2, clipPath: 'inset(0 0 0 16%)' },
    incident: { opacity: 0, y: 18, x: -34, skewX: -3, clipPath: 'inset(14% 0 0 0)' },
    method: { opacity: 0, y: 54, scale: 0.975, clipPath: 'inset(0 0 20% 0)' },
    archive: { opacity: 0, y: 68, rotate: -0.8, clipPath: 'polygon(0 0, 82% 0, 100% 100%, 0 100%)' },
    stats: { opacity: 0, y: 28, scale: 0.96, rotate: 1.4 },
    contact: { opacity: 0, y: 52, x: 18, rotate: -1.1 },
    default: { opacity: 0, y: 42 },
  };

  const triggers = notes.map((note, index) => {
    const variant = note.dataset.boardVariant ?? 'default';
    const fromVars = variants[variant] ?? variants.default;

    gsap.set(note, {
      ...fromVars,
      transformOrigin: variant === 'archive' ? '20% 0%' : '50% 0%',
    });

    return ScrollTrigger.create({
      trigger: note,
      start: 'top 82%',
      once: true,
      onEnter: () => {
        note.classList.add('is-board-visible');
        gsap.to(note, {
          opacity: 1,
          y: 0,
          x: 0,
          rotate: 0,
          skewX: 0,
          scale: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.75,
          ease: variant === 'incident' ? 'steps(4)' : 'power3.out',
          delay: index * 0.04,
          clearProps: 'clipPath',
        });
      },
    });
  });

  return () => {
    triggers.forEach((trigger) => trigger?.kill?.());
    gsap.killTweensOf(notes);
    gsap.set(notes, { clearProps: 'transform,opacity,clipPath' });
  };
}
