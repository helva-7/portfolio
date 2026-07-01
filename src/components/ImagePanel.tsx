'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImagePanelProps {
  src: string;
  label: string;
  className?: string;
  broken?: boolean;
}

export default function ImagePanel({ src, label, className, broken }: ImagePanelProps) {
  const [error, setError] = useState(false);

  return (
    <figure
      className={`relative overflow-hidden border-[6px] border-ink bg-paper ${broken ? 'clip-path-broken' : ''} ${className || ''}`}
      style={
        broken
          ? {
              clipPath:
                'polygon(0% 0%, 92% 0%, 100% 4%, 100% 48%, 94% 52%, 100% 56%, 100% 100%, 0% 100%, 0% 96%, 6% 92%, 0% 86%)',
            }
          : undefined
      }
    >
      {!error ? (
        <Image
          src={src}
          alt={label}
          width={800}
          height={600}
          className="h-full w-full object-cover"
          onError={() => setError(true)}
        />
      ) : null}
      {error || !src ? (
        <div className="flex h-full w-full items-center justify-center bg-paper-dark p-6">
          <div className="text-center">
            <div className="mx-auto mb-3 h-16 w-16 border-4 border-ink/30" />
            <p className="font-body text-xs font-bold uppercase tracking-wider text-ink/50">{label}</p>
          </div>
        </div>
      ) : null}
      <figcaption className="absolute bottom-2 left-2 z-10 max-w-[80%] border-[3px] border-ink bg-paper px-2.5 py-1 font-body text-[0.55rem] font-black uppercase tracking-[0.12em] text-ink">
        {label}
      </figcaption>
      <div
        className="pointer-events-none absolute inset-0 mix-blend-multiply"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 40%, rgba(17,17,17,0.08) 0 1px, transparent 1px), radial-gradient(circle at 70% 60%, rgba(17,17,17,0.05) 0 1px, transparent 1px)',
          backgroundSize: '8px 8px, 12px 12px',
        }}
      />
    </figure>
  );
}
