'use client';

import { animate, createTimer, createScope, stagger, utils, type AnimeInstance, type EasingOptions } from 'animejs';

/**
 * =============================================================================
 * ANIME.JS MANGA-THEMED ANIMATION UTILITIES
 * =============================================================================
 * A collection of reusable animejs animations tailored for the manga/whiteboard
 * aesthetic: paper uncrumpling, ink signatures, halftone reveals, glitch counters,
 * speech bubbles, speed lines, and scroll-triggered sequences.
 *
 * All functions respect `prefers-reduced-motion` and clean up after themselves.
 * =============================================================================
 */

// -----------------------------------------------------------------------------
// Constants & Helpers
// -----------------------------------------------------------------------------

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches();

const isSmallScreen = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(max-width: 1023px)').matches();

/** Create a scoped animejs timeline that auto-cleans on scope completion */
export function createMangaScope() {
  return createScope({ sync: true });
}

/** Stagger helper with manga-friendly defaults */
export function mangaStagger(baseDelay = 40, options: { start?: number; direction?: 'normal' | 'reverse' } = {}) {
  return stagger(baseDelay, { start: options.start ?? 60, direction: options.direction ?? 'normal' });
}

/** Easing presets for manga feel */
export const MANGA_EASE = {
  snap: 'out(4)',           // Sharp paper snap
  bounce: 'out(2)',         // Soft settle
  elastic: 'outElastic(1, 0.5)', // Springy paper
  ink: 'out(3)',            // Ink flow
  glitch: 'steps(4)',       // Digital glitch
  smear: 'inOut(3)',        // Motion smear
} as const satisfies Record<string, EasingOptions>;

/** Random slight variation for organic feel */
export function jitter(base: number, range = 0.15) {
  return base * (1 + (Math.random() - 0.5) * 2 * range);
}

/** Set initial state without animation (respects reduced motion) */
export function setInitial(el: HTMLElement | HTMLElement[], props: Record<string, any>) {
  if (prefersReduced()) {
    utils.set(el, props);
    return;
  }
  utils.set(el, props);
}

/** Safe animate wrapper that respects reduced motion */
export function mangaAnimate(
  targets: HTMLElement | HTMLElement[],
  keyframes: Record<string, any>,
  options: {
    duration?: number;
    delay?: number | ((el: HTMLElement, i: number) => number);
    ease?: EasingOptions;
    onComplete?: () => void;
    onUpdate?: (progress: number) => void;
  } = {}
) {
  if (prefersReduced()) {
    const finalState = Object.fromEntries(
      Object.entries(keyframes).map(([k, v]) => [k, Array.isArray(v) ? v[v.length - 1] : v])
    );
    utils.set(targets, finalState);
    options.onComplete?.();
    return { pause: () => {}, play: () => {}, reverse: () => {}, restart: () => {} } as AnimeInstance;
  }

  return animate(targets, {
    ...keyframes,
    duration: options.duration ?? 1000,
    delay: options.delay ?? 0,
    ease: options.ease ?? MANGA_EASE.snap,
    onComplete: options.onComplete,
    onUpdate: options.onUpdate ? (anim) => options.onUpdate!(anim.progress) : undefined,
  });
}

// -----------------------------------------------------------------------------
// PAPER UNCRUMPLE - Enhanced "manga paper" version
// -----------------------------------------------------------------------------

export interface UncrumpleOptions {
  selector: string;
  container: HTMLElement | null;
  threshold?: number;
  rootMargin?: string;
  staggerMs?: number;
  durationMs?: number;
  /** Extra "crease lines" SVG overlay animation */
  creaseLines?: boolean;
  /** Shadow "pop" intensity */
  shadowPop?: number;
  force?: boolean;
}

interface CreaseLines {
  svg: SVGElement;
  paths: SVGPathElement[];
  cleanup: () => void;
}

/** Inject animated SVG crease lines over an element */
function injectCreaseLines(el: HTMLElement): CreaseLines {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.style.cssText = `
    position: absolute; inset: 0; pointer-events: none; z-index: 10;
    opacity: 0; stroke: #171a24; stroke-width: 0.5; fill: none;
    stroke-dasharray: 4 3; stroke-linecap: round;
  `;
  svg.classList.add('uncrumple-creases');

  // Generate 3-5 random crease lines
  const paths: SVGPathElement[] = [];
  for (let i = 0; i < 3 + Math.floor(Math.random() * 3); i++) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const x1 = 10 + Math.random() * 80;
    const y1 = 10 + Math.random() * 80;
    const angle = (Math.random() - 0.5) * Math.PI * 0.6; // ±54°
    const len = 30 + Math.random() * 40;
    const x2 = x1 + Math.cos(angle) * len;
    const y2 = y1 + Math.sin(angle) * len;
    path.setAttribute('d', `M${x1} ${y1} L${x2} ${y2}`);
    path.style.strokeDashoffset = `${len}`;
    path.style.strokeDasharray = `${len} ${len + 10}`;
    svg.appendChild(path);
    paths.push(path);
  }

  el.style.position = 'relative';
  el.appendChild(svg);

  return {
    svg,
    paths,
    cleanup: () => {
      svg.remove();
    },
  };
}

/** Animate crease lines fading out as paper smooths */
function animateCreasesOut(creases: CreaseLines, duration: number) {
  animate(creases.paths, {
    strokeDashoffset: 0,
    opacity: [1, 0],
    duration: duration * 0.7,
    ease: 'out(3)',
    onComplete: () => creases.cleanup(),
  });
  animate(creases.svg, {
    opacity: [0, 1, 0],
    duration,
    ease: 'out(2)',
  });
}

/**
 * Enhanced paper uncrumple with manga flair:
 * - Randomized crumple "fingerprint" per card
 * - Animated SVG crease lines that fade as paper flattens
 * - Shadow "pop" on settle
 * - Staggered reveal with intersection observer
 */
export function initMangaUncrumple(options: UncrumpleOptions): () => void {
  const {
    selector,
    container,
    threshold = 0.15,
    rootMargin = '0px 0px -10% 0px',
    staggerMs = 120,
    durationMs = 1200,
    creaseLines = true,
    shadowPop = 24,
    force = false,
  } = options;

  if (!container) return () => {};

  if (!force && prefersReduced()) {
    container.querySelectorAll<HTMLElement>(selector).forEach((el) => {
      el.classList.add('is-uncrumpled');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return () => {};
  }

  const targets = Array.from(container.querySelectorAll<HTMLElement>(selector));
  if (targets.length === 0) return () => {};

  // Assign unique crumple fingerprints
  targets.forEach((el, i) => {
    const side = i % 2 === 0 ? -1 : 1;
    const rotate = side * jitter(5, 0.4);      // ±5° with jitter
    const scale = jitter(0.88, 0.06);           // 0.82-0.94
    const shiftX = side * jitter(18, 0.3);      // ±18px with jitter
    const shiftY = jitter(8, 0.4);              // slight vertical offset
    const clipStart = `polygon(${8 + Math.random() * 4}% ${6 + Math.random() * 4}%, ${94 - Math.random() * 4}% ${4 + Math.random() * 3}%, 100% 100%, ${4 + Math.random() * 3}% 96%)`;
    const clipMid = `polygon(${3 + Math.random() * 2}% ${2 + Math.random() * 2}%, ${98 - Math.random() * 2}% ${1 + Math.random() * 2}%, 100% 100%, ${1 + Math.random() * 1}% 99%)`;

    el.dataset.ucRotate = String(rotate);
    el.dataset.ucScale = String(scale);
    el.dataset.ucShiftX = String(shiftX);
    el.dataset.ucShiftY = String(shiftY);
    el.dataset.ucClipStart = clipStart;
    el.dataset.ucClipMid = clipMid;
    el.dataset.ucDelay = String((i * staggerMs) % 400);

    // Initial crumpled state
    setInitial(el, {
      rotate,
      scale,
      translateX: shiftX,
      translateY: shiftY,
      opacity: 0,
      clipPath: clipStart,
    });
  });

  let observer: IntersectionObserver | null = null;

  const uncrumpleOne = (el: HTMLElement, index: number) => {
    if (el.dataset.uncrumpled === '1') return;
    el.dataset.uncrumpled = '1';

    const rotate = parseFloat(el.dataset.ucRotate ?? '0');
    const scale = parseFloat(el.dataset.ucScale ?? '1');
    const shiftX = parseFloat(el.dataset.ucShiftX ?? '0');
    const shiftY = parseFloat(el.dataset.ucShiftY ?? '0');
    const clipStart = el.dataset.ucClipStart ?? 'polygon(8% 6%, 96% 4%, 100% 100%, 4% 96%)';
    const clipMid = el.dataset.ucClipMid ?? 'polygon(3% 2%, 98% 1%, 100% 100%, 1% 99%)';
    const delay = parseFloat(el.dataset.ucDelay ?? '0');

    // Inject crease lines if enabled
    let creases: CreaseLines | null = null;
    if (creaseLines) {
      creases = injectCreaseLines(el);
    }

    // Main uncrumple animation
    const anim = mangaAnimate(el, {
      opacity: [0, 1],
      translateX: [{ to: 0, duration: durationMs * 0.6 }, { to: 0, duration: durationMs * 0.4 }],
      translateY: [{ to: 0, duration: durationMs * 0.6 }, { to: 0, duration: durationMs * 0.4 }],
      rotate: [{ to: 0, duration: durationMs * 0.7 }],
      scale: [{ to: 1, duration: durationMs }],
      clipPath: [
        { to: clipMid, duration: durationMs * 0.45, ease: MANGA_EASE.snap },
        { to: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: durationMs * 0.55, ease: MANGA_EASE.bounce },
      ],
      duration: durationMs,
      delay,
      ease: MANGA_EASE.snap,
      onComplete: () => {
        // Clean up inline styles so CSS hover/tilt takes over
        el.style.removeProperty('transform');
        el.style.removeProperty('opacity');
        el.style.removeProperty('clip-path');
        el.style.removeProperty('rotate');
        el.style.removeProperty('scale');
        el.style.removeProperty('translate-x');
        el.style.removeProperty('translate-y');
        el.classList.add('is-uncrumpled');

        // Shadow pop via class toggle
        el.style.boxShadow = `${shadowPop}px ${shadowPop}px 0 rgba(23, 26, 36, 0.18)`;
        createTimer({
          duration: 180,
          onComplete: () => {
            el.style.removeProperty('box-shadow');
          },
        });
      },
    });

    // Animate crease lines fading out
    if (creases) {
      animateCreasesOut(creases, durationMs);
    }
  };

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = targets.indexOf(entry.target as HTMLElement);
          uncrumpleOne(entry.target as HTMLElement, index);
          observer?.unobserve(entry.target);
        }
      });
    },
    { threshold, rootMargin }
  );

  targets.forEach((el) => observer!.observe(el));

  return () => {
    observer?.disconnect();
    utils.remove(targets);
    targets.forEach((el) => {
      el.style.removeProperty('transform');
      el.style.removeProperty('opacity');
      el.style.removeProperty('clip-path');
      el.style.removeProperty('rotate');
      el.style.removeProperty('scale');
      el.style.removeProperty('translate-x');
      el.style.removeProperty('translate-y');
      const svg = el.querySelector('.uncrumple-creases');
      svg?.remove();
    });
  };
}

// -----------------------------------------------------------------------------
// INK SIGNATURE / TYPEWRITER - Character-by-character "pen stroke"
// -----------------------------------------------------------------------------

export interface InkSignatureOptions {
  /** Duration per character (ms) */
  charDuration?: number;
  /** Stagger between characters (ms) */
  staggerMs?: number;
  /** Total sequence duration */
  totalDuration?: number;
  /** Class added during animation */
  signingClass?: string;
  /** Class added after completion */
  signedClass?: string;
  /** Callback when done */
  onComplete?: () => void;
}

/**
 * Animate text as if being signed with an ink pen.
 * Splits text into spans, animates each with opacity + translateY + slight rotation.
 */
export function inkSignature(el: HTMLElement, options: InkSignatureOptions = {}): () => void {
  const {
    charDuration = 70,
    staggerMs = 24,
    totalDuration = 1600,
    signingClass = 'is-ink-signing',
    signedClass = 'is-ink-signed',
    onComplete,
  } = options;

  if (prefersReduced() || el.dataset.inked === '1') {
    el.classList.add(signedClass);
    onComplete?.();
    return () => {};
  }

  const text = el.textContent?.trim() ?? '';
  if (!text) {
    onComplete?.();
    return () => {};
  }

  el.dataset.inked = '1';
  el.classList.add(signingClass);
  el.textContent = '';

  const spans: HTMLSpanElement[] = [];
  text.split('').forEach((char, i) => {
    const span = document.createElement('span');
    span.className = 'ink-char';
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.setProperty('--char-index', String(i));
    el.appendChild(span);
    spans.push(span);
  });

  const anim = mangaAnimate(spans, {
    opacity: [0, 1],
    translateY: [6, 0],
    rotate: [() => jitter(-2, 0.5), 0],
    duration: charDuration,
    delay: mangaStagger(staggerMs, { start: 50 }),
    ease: MANGA_EASE.ink,
    onComplete: () => {
      el.classList.remove(signingClass);
      el.classList.add(signedClass);
      // Clean up spans, restore text
      el.textContent = text;
      onComplete?.();
    },
  });

  // Safety timeout
  const timer = createTimer({
    duration: totalDuration,
    onComplete: () => {
      if (!el.classList.contains(signedClass)) {
        anim.pause();
        el.textContent = text;
        el.classList.remove(signingClass);
        el.classList.add(signedClass);
        onComplete?.();
      }
    },
  });

  return () => {
    anim.pause();
    timer.pause();
    el.classList.remove(signingClass, signedClass);
    delete el.dataset.inked;
    el.textContent = text;
  };
}

// -----------------------------------------------------------------------------
// GLITCH COUNTER - For "Resilience" stat (99 with glitch: true)
// -----------------------------------------------------------------------------

export interface GlitchCounterOptions {
  /** Target value */
  to: number;
  /** Animation duration (ms) */
  duration?: number;
  /** Easing */
  ease?: EasingOptions;
  /** Decimal places */
  decimals?: number;
  /** Prefix/suffix */
  prefix?: string;
  suffix?: string;
  /** Glitch intensity (0-1) */
  glitchIntensity?: number;
  /** Callback on each frame */
  onUpdate?: (value: number) => void;
  /** Callback on complete */
  onComplete?: () => void;
}

/**
 * Number counter with optional "glitch" effect - digits flicker/shift during count.
 * Perfect for the Resilience stat (value: 99, glitch: true).
 */
export function glitchCounter(el: HTMLElement, options: GlitchCounterOptions): () => void {
  const {
    to,
    duration = 2000,
    ease = 'out(3)',
    decimals = 0,
    prefix = '',
    suffix = '',
    glitchIntensity = 0.3,
    onUpdate,
    onComplete,
  } = options;

  if (prefersReduced()) {
    el.textContent = `${prefix}${to.toFixed(decimals)}${suffix}`;
    onComplete?.();
    return () => {};
  }

  const obj = { v: 0 };
  let glitchTimer: ReturnType<typeof createTimer> | null = null;
  let isGlitching = false;

  function applyGlitch() {
    if (isGlitching || prefersReduced()) return;
    isGlitching = true;

    const originalText = el.textContent ?? '';
    const glitchChars = '01█▓▒░▄▀';
    let glitchCount = 0;

    glitchTimer = createTimer({
      duration: 60,
      onUpdate: () => {
        if (glitchCount >= 3) {
          el.textContent = originalText;
          isGlitching = false;
          return;
        }
        const chars = originalText.split('');
        const idx = Math.floor(Math.random() * chars.length);
        if (chars[idx] && chars[idx] !== '.' && chars[idx] !== ',') {
          chars[idx] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }
        el.textContent = chars.join('');
        glitchCount++;
      },
      onComplete: () => {
        el.textContent = originalText;
        isGlitching = false;
      },
    });
  }

  const anim = animate(obj, {
    v: to,
    duration,
    ease,
    onUpdate: () => {
      const val = obj.v.toFixed(decimals);
      el.textContent = `${prefix}${val}${suffix}`;
      onUpdate?.(obj.v);

      // Randomly trigger glitch during count
      if (glitchIntensity > 0 && Math.random() < glitchIntensity * 0.02) {
        applyGlitch();
      }
    },
    onComplete: () => {
      glitchTimer?.pause();
      el.textContent = `${prefix}${to.toFixed(decimals)}${suffix}`;
      onComplete?.();
    },
  });

  return () => {
    anim.pause();
    glitchTimer?.pause();
  };
}

// -----------------------------------------------------------------------------
// SPEECH BUBBLE POP - Manga-style dialogue bubble entrance
// -----------------------------------------------------------------------------

export interface SpeechBubbleOptions {
  /** Tail direction */
  tail?: 'bottom' | 'top' | 'left' | 'right';
  /** Animation duration */
  duration?: number;
  /** Delay before start */
  delay?: number;
  /** Scale overshoot */
  overshoot?: number;
}

/**
 * Animate a speech bubble popping in with elastic scale + tail draw.
 * Expects element with .speech-bubble class and optional .speech-tail pseudo.
 */
export function speechBubblePop(el: HTMLElement, options: SpeechBubbleOptions = {}) {
  const { duration = 500, delay = 0, overshoot = 1.12, tail = 'bottom' } = options;

  if (prefersReduced()) {
    utils.set(el, { opacity: 1, scale: 1 });
    return;
  }

  // Find or create tail element
  let tailEl = el.querySelector<HTMLElement>('.speech-tail, [data-speech-tail]');
  if (!tailEl) {
    tailEl = document.createElement('span');
    tailEl.className = 'speech-tail';
    tailEl.style.cssText = `
      position: absolute; width: 0; height: 0;
      border-left: 12px solid transparent; border-right: 12px solid transparent;
      border-top: 18px solid var(--ink);
      bottom: -18px; left: 40px;
    `;
    el.appendChild(tailEl);
  }

  setInitial(el, { opacity: 0, scale: 0.6, transformOrigin: tail === 'bottom' ? 'center top' : 'center bottom' });
  setInitial(tailEl, { opacity: 0, scale: 0.3, transformOrigin: 'center top' });

  mangaAnimate(el, {
    opacity: [0, 1],
    scale: [0.6, overshoot, 1],
    duration,
    delay,
    ease: 'outElastic(1, 0.45)',
  });

  mangaAnimate(tailEl, {
    opacity: [0, 1],
    scale: [0.3, 1.2, 1],
    duration: duration * 0.7,
    delay: delay + duration * 0.3,
    ease: 'outElastic(1, 0.4)',
  });
}

// -----------------------------------------------------------------------------
// SPEED LINES - Manga action lines for emphasis/transitions
// -----------------------------------------------------------------------------

export interface SpeedLinesOptions {
  /** Container to inject lines into */
  container: HTMLElement;
  /** Direction of lines */
  direction?: 'horizontal' | 'vertical' | 'radial';
  /** Number of lines */
  count?: number;
  /** Line color */
  color?: string;
  /** Animation duration */
  duration?: number;
  /** Auto-remove after */
  autoRemove?: boolean;
}

/**
 * Inject and animate manga-style speed lines (concentration lines).
 * Great for scene transitions or emphasis on hover/focus.
 */
export function speedLines(options: SpeedLinesOptions): () => void {
  const {
    container,
    direction = 'horizontal',
    count = 12,
    color = '#171a24',
    duration = 600,
    autoRemove = true,
  } = options;

  if (prefersReduced()) return () => {};

  const lines: HTMLElement[] = [];
  const frag = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const line = document.createElement('div');
    line.style.cssText = `
      position: absolute;
      background: ${color};
      opacity: 0;
      pointer-events: none;
      z-index: 100;
    `;
    frag.appendChild(line);
    lines.push(line);
  }

  container.style.position = 'relative';
  container.appendChild(frag);

  const rect = container.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;

  lines.forEach((line, i) => {
    const progress = i / (count - 1);
    const thickness = 1 + Math.random() * 2;
    const length = direction === 'horizontal' ? w * (0.6 + Math.random() * 0.4) : h * (0.6 + Math.random() * 0.4);

    if (direction === 'horizontal') {
      line.style.width = `${length}px`;
      line.style.height = `${thickness}px`;
      line.style.left = `${(w - length) / 2}px`;
      line.style.top = `${progress * h}px`;
      line.style.transformOrigin = 'left center';
      setInitial(line, { scaleX: 0, opacity: 0.6 });
      mangaAnimate(line, {
        scaleX: [0, 1, 0],
        opacity: [0.6, 0.8, 0],
        duration: duration * (0.7 + Math.random() * 0.5),
        delay: i * (duration / count) * 0.5,
        ease: 'inOut(2)',
      });
    } else if (direction === 'vertical') {
      line.style.width = `${thickness}px`;
      line.style.height = `${length}px`;
      line.style.left = `${progress * w}px`;
      line.style.top = `${(h - length) / 2}px`;
      line.style.transformOrigin = 'center top';
      setInitial(line, { scaleY: 0, opacity: 0.6 });
      mangaAnimate(line, {
        scaleY: [0, 1, 0],
        opacity: [0.6, 0.8, 0],
        duration: duration * (0.7 + Math.random() * 0.5),
        delay: i * (duration / count) * 0.5,
        ease: 'inOut(2)',
      });
    } else { // radial
      const angle = (progress * Math.PI * 2);
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(w, h) * 0.6;
      line.style.width = `${r}px`;
      line.style.height = `${thickness}px`;
      line.style.left = `${cx}px`;
      line.style.top = `${cy}px`;
      line.style.transformOrigin = '0 50%';
      setInitial(line, { rotate: angle + 'rad', scaleX: 0, opacity: 0.6 });
      mangaAnimate(line, {
        scaleX: [0, 1, 0],
        opacity: [0.6, 0.8, 0],
        duration: duration * (0.7 + Math.random() * 0.5),
        delay: i * (duration / count) * 0.5,
        ease: 'inOut(2)',
      });
    }
  });

  const cleanup = () => {
    lines.forEach((l) => l.remove());
  };

  if (autoRemove) {
    createTimer({ duration: duration * 1.5, onComplete: cleanup });
  }

  return cleanup;
}

// -----------------------------------------------------------------------------
// HALFTONE REVEAL - Dots expanding to reveal content (manga screen tone style)
// -----------------------------------------------------------------------------

export interface HalftoneRevealOptions {
  /** Element to reveal */
  target: HTMLElement;
  /** Dot color */
  color?: string;
  /** Initial dot size (px) */
  dotSize?: number;
  /** Grid spacing (px) */
  spacing?: number;
  /** Animation duration */
  duration?: number;
  /** Easing */
  ease?: EasingOptions;
}

/**
 * Reveal an element by animating a halftone dot pattern from large to 0.
 * Creates a canvas overlay that animates dots shrinking.
 */
export function halftoneReveal(options: HalftoneRevealOptions): () => void {
  const {
    target,
    color = '#171a24',
    dotSize = 8,
    spacing = 12,
    duration = 800,
    ease = 'out(3)',
  } = options;

  if (prefersReduced()) {
    target.style.opacity = '1';
    return () => {};
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  canvas.style.cssText = `
    position: absolute; inset: 0; z-index: 10; pointer-events: none;
  `;

  const rect = target.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;
  ctx.scale(dpr, dpr);

  const cols = Math.ceil(rect.width / spacing) + 1;
  const rows = Math.ceil(rect.height / spacing) + 1;

  const dots: { x: number; y: number; r: number; delay: number }[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      dots.push({
        x: x * spacing + spacing / 2,
        y: y * spacing + spacing / 2,
        r: dotSize,
        delay: (Math.abs(x - cols / 2) + Math.abs(y - rows / 2)) * 12,
      });
    }
  }

  target.style.position = 'relative';
  target.appendChild(canvas);
  target.style.opacity = '0';

  let frame = 0;
  const maxFrames = 60;

  function draw(progress: number) {
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = color;

    dots.forEach((dot) => {
      const localProgress = Math.max(0, Math.min(1, (progress - dot.delay / 1000) / (duration / 1000)));
      if (localProgress <= 0) return;
      const r = dot.r * (1 - localProgress) * (1 - localProgress); // ease out quad
      if (r > 0.5) {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    if (progress < 1) {
      requestAnimationFrame(() => draw((frame++) / maxFrames));
    } else {
      target.style.opacity = '1';
      canvas.remove();
    }
  }

  requestAnimationFrame(() => draw(0));

  return () => {
    canvas.remove();
    target.style.opacity = '1';
  };
}

// -----------------------------------------------------------------------------
// SCROLL-TRIGGERED SEQUENCE - Coordinate multiple animations on scroll
// -----------------------------------------------------------------------------

export interface ScrollSequenceStep {
  /** Target element or selector */
  target: HTMLElement | string;
  /** Animation keyframes */
  keyframes: Record<string, any>;
  /** Options */
  options?: {
    duration?: number;
    delay?: number;
    ease?: EasingOptions;
    /** Trigger at this scroll progress (0-1) */
    trigger?: number;
  };
}

export interface ScrollSequenceOptions {
  /** Container to observe */
  container: HTMLElement;
  /** Steps in sequence */
  steps: ScrollSequenceStep[];
  /** Once per element or replay on re-enter */
  once?: boolean;
  /** Root margin for IntersectionObserver */
  rootMargin?: string;
  /** Threshold */
  threshold?: number;
}

/**
 * Orchestrate a sequence of animejs animations triggered by scroll.
 * Each step can target different elements with different timings.
 */
export function initScrollSequence(options: ScrollSequenceOptions): () => void {
  const {
    container,
    steps,
    once = true,
    rootMargin = '0px 0px -20% 0px',
    threshold = 0.1,
  } = options;

  if (prefersReduced()) {
    steps.forEach(({ target, keyframes }) => {
      const els = typeof target === 'string' ? container.querySelectorAll<HTMLElement>(target) : [target];
      els.forEach((el) => utils.set(el, Object.fromEntries(
        Object.entries(keyframes).map(([k, v]) => [k, Array.isArray(v) ? v[v.length - 1] : v])
      )));
    });
    return () => {};
  }

  const animated = new WeakSet<HTMLElement>();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;

        // Find steps targeting this element
        steps.forEach((step) => {
          const targets = typeof step.target === 'string'
            ? container.querySelectorAll<HTMLElement>(step.target)
            : [step.target];

          if (targets.includes(el) && (!once || !animated.has(el))) {
            animated.add(el);
            const { keyframes, options: stepOptions = {} } = step;
            mangaAnimate(el, keyframes, {
              duration: stepOptions.duration ?? 800,
              delay: stepOptions.delay ?? 0,
              ease: stepOptions.ease ?? MANGA_EASE.snap,
            });
          }
        });

        if (once) observer.unobserve(el);
      });
    },
    { rootMargin, threshold }
  );

  // Observe all unique targets
  const allTargets = new Set<HTMLElement>();
  steps.forEach((step) => {
    const targets = typeof step.target === 'string'
      ? container.querySelectorAll<HTMLElement>(step.target)
      : [step.target];
    targets.forEach((t) => allTargets.add(t));
  });

  allTargets.forEach((el) => observer.observe(el));

  return () => {
    observer.disconnect();
  };
}

// -----------------------------------------------------------------------------
// PAGE TURN / PANEL TRANSITION - Manga page flip between sections
// -----------------------------------------------------------------------------

export interface PageTurnOptions {
  /** Outgoing element */
  from: HTMLElement;
  /** Incoming element */
  to: HTMLElement;
  /** Direction */
  direction?: 'left' | 'right';
  /** Duration */
  duration?: number;
  /** Callback when halfway (swap content) */
  onMidpoint?: () => void;
  /** Callback when complete */
  onComplete?: () => void;
}

/**
 * Animate a manga-style page turn: from page curls away, to page reveals.
 * Uses clipPath for the curl effect.
 */
export function pageTurn(options: PageTurnOptions) {
  const { from, to, direction = 'right', duration = 1000, onMidpoint, onComplete } = options;

  if (prefersReduced()) {
    from.style.display = 'none';
    to.style.display = '';
    onMidpoint?.();
    onComplete?.();
    return;
  }

  const isRight = direction === 'right';
  const clipStart = isRight ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
  const clipMid = isRight
    ? 'polygon(0 0, 60% 0, 65% 50%, 60% 100%, 0 100%)'
    : 'polygon(40% 0, 100% 0, 100% 100%, 40% 100%)';
  const clipEnd = isRight ? 'polygon(0 0, 0 0, 0 50%, 0 100%, 0 100%)' : 'polygon(100% 0, 100% 0, 100% 50%, 100% 100%)';

  // Setup
  utils.set(from, { clipPath: clipStart, zIndex: 2 });
  utils.set(to, { clipPath: isRight ? 'polygon(100% 0, 100% 0, 100% 50%, 100% 100%)' : 'polygon(0 0, 0 0, 0 50%, 0 100%)', opacity: 1, zIndex: 1 });

  // Page curl animation
  mangaAnimate(from, {
    clipPath: [
      { to: clipMid, duration: duration * 0.5, ease: 'inOut(3)' },
      { to: clipEnd, duration: duration * 0.5, ease: 'in(3)' },
    ],
    duration,
    onUpdate: (anim) => {
      if (anim.progress > 0.5 && !from.dataset.midpointFired) {
        from.dataset.midpointFired = '1';
        onMidpoint?.();
      }
    },
    onComplete: () => {
      from.style.display = 'none';
      to.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
      onComplete?.();
    },
  });
}

// -----------------------------------------------------------------------------
// REACT HOOKS - Convenience hooks for common patterns
// -----------------------------------------------------------------------------

import { useEffect, useRef, useCallback } from 'react';

/** Hook for ink signature on mount */
export function useInkSignature(selector: string, options: InkSignatureOptions = {}) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = container.querySelectorAll<HTMLElement>(selector);
    const cleanups: (() => void)[] = [];

    targets.forEach((el) => {
      cleanups.push(inkSignature(el, options));
    });

    return () => cleanups.forEach((c) => c());
  }, [selector, options.charDuration, options.staggerMs, options.totalDuration]);

  return containerRef;
}

/** Hook for glitch counter on intersect */
export function useGlitchCounter(selector: string, options: GlitchCounterOptions) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = container.querySelectorAll<HTMLElement>(selector);
    const cleanups: (() => void)[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            if (el.dataset.glitchCounted === '1') return;
            el.dataset.glitchCounted = '1';
            cleanups.push(glitchCounter(el, options));
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5, rootMargin: '0px 0px -10% 0px' }
    );

    targets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      cleanups.forEach((c) => c());
    };
  }, [selector, options.to, options.duration]);

  return containerRef;
}

/** Hook for manga uncrumple on container */
export function useMangaUncrumple(selector: string, options: Omit<UncrumpleOptions, 'selector' | 'container'> = {}) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cleanup = initMangaUncrumple({ selector, container, ...options });
    return cleanup;
  }, [selector, options.threshold, options.rootMargin, options.staggerMs, options.durationMs, options.creaseLines, options.shadowPop, options.force]);

  return containerRef;
}

/** Hook for scroll sequence */
export function useScrollSequence(steps: ScrollSequenceStep[], options: Omit<ScrollSequenceOptions, 'container' | 'steps'> = {}) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cleanup = initScrollSequence({ container, steps, ...options });
    return cleanup;
  }, [steps, options.once, options.rootMargin, options.threshold]);

  return containerRef;
}