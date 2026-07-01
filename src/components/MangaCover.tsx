'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { profile } from '@/data/portfolio';
import ImagePanel from './ImagePanel';

export default function MangaCover() {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative z-10 flex min-h-screen flex-col justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-20 -right-20 h-[60vh] w-[50vw] rotate-12 bg-red/10" />
        <div className="absolute top-[30%] -left-10 h-40 w-40 -rotate-12 bg-yellow/20" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-page flex-col gap-8 px-4 pt-28 pb-8 md:px-6 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div className="flex flex-col justify-center">
          <div className="relative">
            <span className="mb-4 inline-block border-[3px] border-ink bg-ink px-3 py-1 font-body text-[0.55rem] font-black uppercase tracking-[0.25em] text-paper">
              VOLUME 01
            </span>
          </div>

          <div className="relative -mx-4 overflow-hidden md:-mx-6 lg:mx-0">
            <h1 className="font-display text-[clamp(4.5rem,16vw,12rem)] leading-[0.72] tracking-tight text-ink">
              <span className="block">FAHD</span>
              <span className="block text-[clamp(3.8rem,13vw,10rem)] tracking-tight">ELHALOUI</span>
            </h1>
          </div>

          <div className="relative mt-2">
            <div className="inline-block -rotate-1 border-[4px] border-ink bg-yellow px-4 py-2 shadow-manga">
              <span className="font-comic text-xl leading-none tracking-wide text-ink md:text-3xl">
                ★ {profile.tagline} ★
              </span>
            </div>
            <p className="mt-2 font-comic text-sm italic text-ink/60 md:text-lg">
              {profile.coverSubQuote}
            </p>
          </div>

          <div className="mt-8">
            <div className="relative inline-block border-[5px] border-ink bg-ink px-5 py-4 shadow-manga-red">
              <p className="font-comic text-xl leading-tight text-paper md:text-2xl">
                {profile.openingQuote}
              </p>
              <span className="speech-tail" />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#projects"
              className="inline-flex min-h-[44px] items-center border-[4px] border-ink bg-ink px-6 py-2 font-body text-xs font-black uppercase tracking-[0.15em] text-paper shadow-manga-red transition hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              View Projects
            </Link>
            <Link
              href="#contact"
              className="inline-flex min-h-[44px] items-center border-[4px] border-ink bg-paper px-6 py-2 font-body text-xs font-black uppercase tracking-[0.15em] text-ink shadow-manga transition hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="relative flex items-center justify-center lg:justify-end">
          <div className="relative w-full max-w-md">
            {!imgError ? (
              <Image
                src="/images/profile.jpg"
                alt="Fahd Elhaloui profile"
                width={600}
                height={800}
                className="w-full border-[8px] border-ink object-cover shadow-manga"
                style={{ filter: 'grayscale(1) contrast(1.3)' }}
                onError={() => setImgError(true)}
              />
            ) : (
              <div
                className="flex w-full items-center justify-center border-[8px] border-ink bg-paper-dark shadow-manga"
                style={{ aspectRatio: '3/4' }}
              >
                <div className="text-center p-6">
                  <div className="mx-auto mb-4 h-20 w-20 border-4 border-ink/30" />
                  <p className="font-body text-xs font-bold uppercase tracking-wider text-ink/50">
                    Replace: profile.jpg
                  </p>
                </div>
              </div>
            )}
            <div
              className="pointer-events-none absolute inset-0 mix-blend-multiply"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 40% 30%, rgba(17,17,17,0.06) 0 1px, transparent 1px)',
                backgroundSize: '6px 6px',
              }}
            />
            <span className="absolute -bottom-3 -left-3 border-[3px] border-ink bg-paper px-3 py-1 font-body text-[0.5rem] font-black uppercase tracking-[0.12em] text-ink">
              PROFILE
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-auto border-t-[6px] border-ink bg-ink py-3">
        <div className="mx-auto max-w-page px-4 md:px-6">
          <p className="font-body text-[0.6rem] font-black uppercase tracking-[0.2em] text-paper/60">
            {profile.role}
          </p>
        </div>
      </div>
    </section>
  );
}
