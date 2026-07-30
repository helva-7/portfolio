'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import PaperDropIntro from './PaperDropIntro';

const DeferredArtisticMotion = dynamic(() => import('./ArtisticMotion'), {
  ssr: false,
});

const DeferredBoardMotion = dynamic(() => import('./BoardMotion'), {
  ssr: false,
});

interface PortfolioExperienceProps {
  children: ReactNode;
}

export default function PortfolioExperience({ children }: PortfolioExperienceProps) {
  const [introComplete, setIntroComplete] = useState(false);
  const [motionReady, setMotionReady] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  useEffect(() => {
    if (!introComplete) return;

    const timer = window.setTimeout(() => setMotionReady(true), 300);
    return () => window.clearTimeout(timer);
  }, [introComplete]);

  return (
    <>
      <PaperDropIntro onComplete={handleIntroComplete} />
      {motionReady && (
        <>
          <DeferredArtisticMotion />
          <DeferredBoardMotion />
        </>
      )}
      {children}
    </>
  );
}
