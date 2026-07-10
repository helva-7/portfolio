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
    gsap.set(notes, { opacity: 1, y: 0, clearProps: 'transform,opacity' });
    return () => {};
  }

  const triggers = notes.map((note, index) => {
    gsap.set(note, {
      opacity: 0,
      y: 42,
      transformOrigin: '50% 0%',
    });

    return ScrollTrigger.create({
      trigger: note,
      start: 'top 82%',
      once: true,
      onEnter: () => {
        gsap.to(note, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          delay: index * 0.04,
        });
      },
    });
  });

  return () => {
    triggers.forEach((trigger) => trigger?.kill?.());
    gsap.killTweensOf(notes);
    gsap.set(notes, { clearProps: 'transform,opacity' });
  };
}
