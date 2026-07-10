'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { withBasePath } from '@/lib/base-path';

const VIDEO_POOL = ['/assets/video/paper-uncrumple.mp4'];

function shouldDisableAmbientVideo() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const connection = (navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
    deviceMemory?: number;
    hardwareConcurrency?: number;
  }).connection;
  const nav = navigator as Navigator & { deviceMemory?: number; hardwareConcurrency?: number };
  const verySlowConnection = connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g';
  const smallScreen = window.innerWidth < 1024;
  const lowMemory = typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4;
  const lowCpu = typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 4;

  return reducedMotion || Boolean(connection?.saveData) || verySlowConnection || smallScreen || lowMemory || lowCpu;
}

export default function BackgroundVideoLayer() {
  const [enabled, setEnabled] = useState(false);
  const [errored, setErrored] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const startedRef = useRef(false);

  const selectedVideo = useMemo(() => {
    const index = Math.floor(Math.random() * VIDEO_POOL.length);
    return VIDEO_POOL[index];
  }, []);

  useEffect(() => {
    if (shouldDisableAmbientVideo()) {
      return;
    }

    let startTimer = 0;

    const scheduleStart = () => {
      if (startedRef.current || startTimer || document.visibilityState !== 'visible') {
        return;
      }

      startTimer = window.setTimeout(() => {
        startTimer = 0;

        if (document.visibilityState === 'visible' && !shouldDisableAmbientVideo()) {
          startedRef.current = true;
          setEnabled(true);
        }
      }, 350);
    };

    const syncVisibility = () => {
      if (document.visibilityState === 'visible') {
        scheduleStart();
      } else if (startTimer) {
        window.clearTimeout(startTimer);
        startTimer = 0;
      }
    };

    syncVisibility();
    document.addEventListener('visibilitychange', syncVisibility);

    return () => {
      document.removeEventListener('visibilitychange', syncVisibility);

      if (startTimer) {
        window.clearTimeout(startTimer);
      }
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !enabled || errored) {
      return;
    }

    const syncPlayback = () => {
      if (document.hidden) {
        video.pause();
        return;
      }

      void video.play().catch(() => setErrored(true));
    };

    syncPlayback();
    document.addEventListener('visibilitychange', syncPlayback);

    return () => {
      document.removeEventListener('visibilitychange', syncPlayback);
    };
  }, [enabled, errored]);

  return (
    <div className="background-video-layer" aria-hidden>
      {enabled && !errored ? (
        <video
          key={selectedVideo}
          ref={videoRef}
          className="background-video-layer__video"
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          poster={withBasePath('/assets/img/paper-poster.svg')}
          onError={() => setErrored(true)}
        >
          <source src={withBasePath(selectedVideo)} type="video/mp4" />
        </video>
      ) : null}
      <div className="background-video-layer__inkwash" />
      <div className="background-video-layer__grid" />
    </div>
  );
}
