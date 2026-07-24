'use client';

import { useId, type ReactNode } from 'react';

interface ProjectUncrumpleShellProps {
  index: number;
  children: ReactNode;
  className?: string;
}

export default function ProjectUncrumpleShell({ index, children, className = '' }: ProjectUncrumpleShellProps) {
  const filterId = `case-paper-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <div className={`project-uncrumple-shell project-uncrumple-shell--sealed ${className}`.trim()}>
      <div className="project-crumple-prop" aria-hidden>
        <svg className="project-crumple-prop__defs" width="0" height="0" focusable="false">
          <defs>
            <filter id={filterId} x="-8%" y="-10%" width="116%" height="120%" colorInterpolationFilters="sRGB">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.018 0.026"
                numOctaves={3}
                seed={17 + index}
                result="paperNoise"
              />
              <feGaussianBlur in="paperNoise" stdDeviation="0.45" result="softNoise" />
              <feDisplacementMap
                in="SourceGraphic"
                in2="softNoise"
                scale={18}
                xChannelSelector="R"
                yChannelSelector="G"
                result="warpedPaper"
              />
              <feSpecularLighting
                in="softNoise"
                surfaceScale={3.5}
                specularConstant={0.42}
                specularExponent={16}
                lightingColor="#fffaf0"
                result="paperLight"
              >
                <feDistantLight azimuth={228} elevation={58} />
              </feSpecularLighting>
              <feComposite in="paperLight" in2="SourceAlpha" operator="in" result="clippedLight" />
              <feBlend in="warpedPaper" in2="clippedLight" mode="soft-light" />
            </filter>
          </defs>
        </svg>

        <span className="project-crumple-prop__shadow" />
        <div className="project-crumple-prop__paper" style={{ filter: `url(#${filterId})` }}>
          <span className="project-crumple-prop__face" />
          <span className="project-crumple-prop__fold project-crumple-prop__fold--one" />
          <span className="project-crumple-prop__fold project-crumple-prop__fold--two" />
          <span className="project-crumple-prop__fold project-crumple-prop__fold--three" />
          <span className="project-crumple-prop__crease project-crumple-prop__crease--one" />
          <span className="project-crumple-prop__crease project-crumple-prop__crease--two" />
          <span className="project-crumple-prop__stamp">CLOSED CASE / {String(index + 1).padStart(2, '0')}</span>
        </div>
      </div>
      {children}
    </div>
  );
}
