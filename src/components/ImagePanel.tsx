'use client';

import { useState } from 'react';
import Image from 'next/image';
import { withBasePath } from '@/lib/base-path';

interface ImagePanelProps {
  src: string;
  label: string;
  alt?: string;
  className?: string;
  imageClassName?: string;
  imageFit?: 'cover' | 'contain';
  mediaType?: 'image' | 'video';
  broken?: boolean;
}

export default function ImagePanel({ src, label, alt, className, imageClassName, imageFit = 'cover', mediaType = 'image', broken }: ImagePanelProps) {
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
      {!error && mediaType === 'video' ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label={alt || label}
          className={`h-full w-full ${imageFit === 'contain' ? 'bg-[#0d1117] object-contain' : 'object-cover'} ${imageClassName || ''}`}
          onError={() => setError(true)}
        >
          <source src={withBasePath(src)} type="video/mp4" />
        </video>
      ) : !error ? (
        <Image
          src={withBasePath(src)}
          alt={alt || label}
          width={800}
          height={600}
          className={`h-full w-full ${imageFit === 'contain' ? 'bg-[#0d1117] object-contain' : 'object-cover'} ${imageClassName || ''}`}
          onError={() => setError(true)}
        />
      ) : null}
      {error || !src ? (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-paper-dark p-6">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(17,17,17,0.06) 4px, rgba(17,17,17,0.06) 8px)',
            }}
          />
          <div className="relative z-10 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center border-[5px] border-ink/30 bg-paper">
              <span className="font-display text-3xl text-ink/20">?</span>
            </div>
            <p className="font-body text-xs font-bold uppercase tracking-wider text-ink/40">{label}</p>
            <span className="mt-3 inline-block border-2 border-ink/20 px-2 py-0.5 font-body text-[0.45rem] font-black uppercase tracking-[0.15em] text-ink/30">
              IMAGE PLACEHOLDER
            </span>
          </div>
        </div>
      ) : null}
      <figcaption className="absolute bottom-2 left-2 z-10 max-w-[80%] border-[3px] border-ink bg-paper px-2.5 py-1 font-body text-[0.55rem] font-black uppercase tracking-[0.12em] text-ink">
        {label}
      </figcaption>
      <div
        className="image-panel__texture pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 40%, rgba(17,17,17,0.08) 0 1px, transparent 1px), radial-gradient(circle at 70% 60%, rgba(17,17,17,0.05) 0 1px, transparent 1px)',
          backgroundSize: '8px 8px, 12px 12px',
        }}
      />
    </figure>
  );
}
