'use client';

import { useEffect } from 'react';
import { initWhiteboardAdds, shouldDisableWhiteboardMotion } from '@/lib/board-motion';

export default function BoardMotion() {
  useEffect(() => {
    if (shouldDisableWhiteboardMotion()) {
      return;
    }

    let disposed = false;
    let cleanup = () => {};

    async function init() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);

      if (disposed || shouldDisableWhiteboardMotion()) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      cleanup = initWhiteboardAdds({ gsap, ScrollTrigger });

      if (disposed) {
        cleanup();
        return;
      }

      ScrollTrigger.refresh();
    }

    void init().catch(() => {});

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return null;
}
