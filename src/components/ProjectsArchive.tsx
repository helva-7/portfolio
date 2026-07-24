'use client';

import { useEffect, useRef } from 'react';
import { toCanvas } from 'html-to-image';
import type { Project } from '@/data/portfolio';
import ProjectChapterCard from './ProjectChapterCard';

interface ProjectsArchiveProps {
  projects: Project[];
  summary: string;
}

type VideoWithFrameCallback = HTMLVideoElement & {
  requestVideoFrameCallback?: (
    callback: (now: number, metadata: { mediaTime: number }) => void,
  ) => number;
};

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const smoothstep = (from: number, to: number, value: number) => {
  const progress = clamp01((value - from) / (to - from));
  return progress * progress * (3 - 2 * progress);
};

export default function ProjectsArchive({ projects, summary }: ProjectsArchiveProps) {
  const archiveRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const archive = archiveRef.current;
    if (!archive) return;

    const folders = Array.from(
      archive.querySelectorAll<HTMLElement>('.project-uncrumple-shell'),
    );
    const stack = archive.querySelector<HTMLElement>('.project-stack');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cancelled = false;

    if (reduce) {
      stack?.classList.add('is-project-flow-live');
      folders.forEach((folder) =>
        folder.classList.add('is-scroll-open', 'is-fusion-complete'),
      );
      return;
    }

    const queue: HTMLElement[] = [];
    let revealing = false;
    const snapshots = new WeakMap<HTMLElement, Promise<HTMLCanvasElement>>();

    const prepareSnapshot = (folder: HTMLElement, card: HTMLElement) => {
      const prepared = snapshots.get(card);
      if (prepared) return prepared;

      const outputScale = Math.min(window.devicePixelRatio || 1, 1.25);
      folder.classList.add('is-snapshotting');
      const snapshot = toCanvas(card, {
          pixelRatio: outputScale,
          cacheBust: false,
          skipFonts: true,
          style: {
            visibility: 'visible',
            opacity: '1',
            transform: 'none',
            filter: 'none',
            animation: 'none',
          },
        })
        .finally(() => folder.classList.remove('is-snapshotting'));
      snapshots.set(card, snapshot);
      return snapshot;
    };

    // Prepare the printed project textures while the visitor is still above the
    // archive. The scroll-triggered animation can then start without freezing.
    const preloadSnapshots = () => {
      folders.reduce<Promise<void>>((chain, folder) => {
        const card = folder.querySelector<HTMLElement>('.project-file');
        if (!card) return chain;
        return chain.then(() => prepareSnapshot(folder, card).then(() => undefined));
      }, Promise.resolve()).catch((error) => {
        console.warn('[project snapshot preload]', error);
      });
    };
    const preloadTimer = window.setTimeout(preloadSnapshots, 120);

    const runFusion = async (folder: HTMLElement) => {
      const card = folder.querySelector<HTMLElement>('.project-file');
      const video = folder.querySelector<VideoWithFrameCallback>('[data-fusion-driver]');
      const fusion = folder.querySelector<HTMLCanvasElement>('[data-fusion-canvas]');
      if (!card || !video || !fusion) return;

      const cardRect = card.getBoundingClientRect();
      const shellRect = folder.getBoundingClientRect();
      const outputScale = Math.min(window.devicePixelRatio || 1, 1.25);
      const outputWidth = Math.max(1, Math.round(cardRect.width * outputScale));
      const outputHeight = Math.max(1, Math.round(cardRect.height * outputScale));

      fusion.width = outputWidth;
      fusion.height = outputHeight;
      fusion.style.left = `${cardRect.left - shellRect.left}px`;
      fusion.style.top = `${cardRect.top - shellRect.top}px`;
      fusion.style.width = `${cardRect.width}px`;
      fusion.style.height = `${cardRect.height}px`;

      folder.classList.add('is-scroll-open', 'is-fusing');

      // Usually already prepared during idle time. This is the texture that gets
      // printed onto every changing paper silhouette.
      const snapshot = await prepareSnapshot(folder, card);

      if (cancelled) return;

      const fusionContext = fusion.getContext('2d', { alpha: true });
      if (!fusionContext) return;

      // Video chroma-keying happens at a modest resolution. The extracted paper
      // is then scaled over the crisp project snapshot.
      const paper = document.createElement('canvas');
      paper.width = 360;
      paper.height = Math.max(180, Math.round(480 * (cardRect.height / cardRect.width)));
      const paperContext = paper.getContext('2d', {
        alpha: true,
        willReadFrequently: true,
      });
      if (!paperContext) return;

      let objectUrl = '';
      try {
        const source = video.dataset.src;
        if (!source) throw new Error('Paper fusion video source is missing');
        const response = await fetch(source);
        if (!response.ok) throw new Error('Paper fusion video could not be loaded');
        objectUrl = URL.createObjectURL(await response.blob());
        video.src = objectUrl;

        await new Promise<void>((resolve, reject) => {
          video.addEventListener('loadedmetadata', () => resolve(), { once: true });
          video.addEventListener('error', () => reject(new Error('Paper video failed')), {
            once: true,
          });
          video.load();
        });

        video.currentTime = 0;
        await video.play();
        // The source contains: uncrumple → crumple → uncrumple. Only its first
        // clean uncrumple is used, so the paper never closes again at handoff.
        const sourceDuration = video.duration || 2.98;
        const fusionDuration = Math.min(sourceDuration, 1.28);

        await new Promise<void>((resolve) => {
          let active = true;
          let fallback = 0;

          const finish = () => {
            if (!active) return;
            active = false;
            window.clearTimeout(fallback);
            resolve();
          };

          const renderPaperFrame = (
            _now: number,
            metadata: { mediaTime: number } | null,
          ) => {
            if (!active || cancelled) return;
            if (video.ended) {
              finish();
              return;
            }

            const progress = clamp01(
              (metadata?.mediaTime ?? video.currentTime) / fusionDuration,
            );
            const width = paper.width;
            const height = paper.height;
            let paperMinX = width;
            let paperMinY = height;
            let paperMaxX = 0;
            let paperMaxY = 0;

            paperContext.clearRect(0, 0, width, height);
            paperContext.save();
            paperContext.translate(width / 2, height / 2);
            paperContext.rotate(Math.PI / 2);
            const videoScale = Math.min(
              height / video.videoWidth,
              width / video.videoHeight,
            );
            paperContext.scale(videoScale, videoScale);
            paperContext.drawImage(
              video,
              -video.videoWidth / 2,
              -video.videoHeight / 2,
            );
            paperContext.restore();

            const pixels = paperContext.getImageData(0, 0, width, height);
            const data = pixels.data;
            for (let index = 0; index < data.length; index += 4) {
              const red = data[index];
              const green = data[index + 1];
              const blue = data[index + 2];
              const greenDominance = green - Math.max(red, blue);
              const brightness = Math.max(red, green, blue);
              const outsideGreen = clamp01((34 - greenDominance) / 26);
              const outsideLetterbox = clamp01((brightness - 28) / 42);
              const alpha = outsideGreen * outsideLetterbox;
              data[index + 3] = Math.round(alpha * 255);
              if (alpha > 0.18) {
                const pixel = index / 4;
                const x = pixel % width;
                const y = Math.floor(pixel / width);
                paperMinX = Math.min(paperMinX, x);
                paperMinY = Math.min(paperMinY, y);
                paperMaxX = Math.max(paperMaxX, x);
                paperMaxY = Math.max(paperMaxY, y);
              }
            }
            paperContext.putImageData(pixels, 0, 0);

            // 1. The actual paper frame establishes the changing silhouette.
            fusionContext.clearRect(0, 0, outputWidth, outputHeight);
            fusionContext.globalCompositeOperation = 'source-over';
            fusionContext.globalAlpha = 1;
            fusionContext.drawImage(paper, 0, 0, outputWidth, outputHeight);

            // 2. Fit the ENTIRE project into the paper's live bounds. When the
            // paper is a ball the whole dossier is compressed into that ball;
            // every video frame expands the same dossier with the sheet.
            const hasPaper = paperMaxX > paperMinX && paperMaxY > paperMinY;
            const destinationX = hasPaper
              ? (paperMinX / width) * outputWidth
              : outputWidth * 0.46;
            const destinationY = hasPaper
              ? (paperMinY / height) * outputHeight
              : outputHeight * 0.46;
            const destinationWidth = hasPaper
              ? ((paperMaxX - paperMinX + 1) / width) * outputWidth
              : outputWidth * 0.08;
            const destinationHeight = hasPaper
              ? ((paperMaxY - paperMinY + 1) / height) * outputHeight
              : outputHeight * 0.08;

            fusionContext.globalCompositeOperation = 'source-atop';
            fusionContext.globalAlpha = 0.84 + progress * 0.12;
            fusionContext.drawImage(
              snapshot,
              0,
              0,
              snapshot.width,
              snapshot.height,
              destinationX,
              destinationY,
              destinationWidth,
              destinationHeight,
            );

            // 3. Reapply paper texture so folds remain visible over the project.
            fusionContext.globalCompositeOperation = 'multiply';
            fusionContext.globalAlpha = 0.5 - progress * 0.22;
            fusionContext.drawImage(paper, 0, 0, outputWidth, outputHeight);

            // 4. Before handing control to the real DOM, this same canvas grows
            // into the exact final rectangle. The interactive card never overlaps
            // an empty paper layer or pops in over it.
            const finalCardAmount = smoothstep(0.76, 0.96, progress);
            if (finalCardAmount > 0) {
              fusionContext.globalCompositeOperation = 'source-over';
              fusionContext.globalAlpha = finalCardAmount;
              fusionContext.drawImage(snapshot, 0, 0, outputWidth, outputHeight);
            }
            fusionContext.globalCompositeOperation = 'source-over';
            fusionContext.globalAlpha = 1;
            folder.classList.add('has-paper-frame');

            if (progress >= 0.995) {
              finish();
            } else if (typeof video.requestVideoFrameCallback === 'function') {
                video.requestVideoFrameCallback(renderPaperFrame);
            } else {
              window.setTimeout(
                () => renderPaperFrame(performance.now(), null),
                1000 / 24,
              );
            }
          };

          fallback = window.setTimeout(finish, 1900);
          if (typeof video.requestVideoFrameCallback === 'function') {
            video.requestVideoFrameCallback(renderPaperFrame);
          } else {
            renderPaperFrame(performance.now(), null);
          }
        });
      } finally {
        video.pause();
        video.removeAttribute('src');
        video.load();
        if (objectUrl) URL.revokeObjectURL(objectUrl);
        fusion.style.opacity = '0';
        card.style.opacity = '1';
        folder.classList.remove('is-fusing', 'has-paper-frame');
        folder.classList.add('is-fusion-complete');
      }
    };

    const revealNext = async () => {
      if (revealing || queue.length === 0 || cancelled) return;
      revealing = true;
      const folder = queue.shift();
      if (!folder) return;
      stack?.classList.add('is-project-flow-live');

      try {
        await runFusion(folder);
      } catch (error) {
        folder.classList.add('is-scroll-open', 'is-fusion-complete');
        const card = folder.querySelector<HTMLElement>('.project-file');
        if (card) card.style.opacity = '1';
        console.warn('[project paper fusion]', error);
      } finally {
        revealing = false;
        revealNext();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.target.getBoundingClientRect().top -
              b.target.getBoundingClientRect().top,
          )
          .forEach((entry) => {
            const folder = entry.target as HTMLElement;
            if (!queue.includes(folder)) queue.push(folder);
            observer.unobserve(folder);
          });
        revealNext();
      },
      { threshold: 0.08, rootMargin: '4% 0px -7% 0px' },
    );

    folders.forEach((folder) => observer.observe(folder));

    return () => {
      cancelled = true;
      window.clearTimeout(preloadTimer);
      observer.disconnect();
      folders.forEach((folder) => {
        const video = folder.querySelector<HTMLVideoElement>('[data-fusion-driver]');
        video?.pause();
      });
    };
  }, []);

  return (
    <article
      ref={archiveRef}
      className="paper-archive board-note board-note--wide"
      data-board-note
      data-board-variant="archive"
    >
      <span className="paper-card__pin" aria-hidden />

      <div className="paper-card__shell paper-archive__shell">
        <div className="paper-card__wrinkles" aria-hidden />

        <div className="paper-card__header">
          <p className="paper-card__label">PROJECT ARCHIVE</p>
          <span className="paper-card__stamp">Case Board / Active</span>
        </div>

        <div className="paper-card__heading paper-archive__heading">
          <p className="section-oddity">ODDITY / ARCHIVE</p>
          <h2 className="paper-card__title">PROJECTS</h2>
          <p className="paper-card__subtitle">Observed systems, stress points, deployments, and fixes.</p>
          <p className="paper-archive__summary">{summary}</p>
          <p className="redacted-note mt-4">[REDACTED] repeated proof collected as deployable case evidence.</p>
        </div>

        <div className="paper-archive__body">
          <div className="project-stack">
            {projects.map((project, index) => (
              <ProjectChapterCard key={project.number} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
