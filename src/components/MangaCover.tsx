'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { profile } from '@/data/portfolio';
import { withBasePath } from '@/lib/base-path';
import MangaOccultSigil from './MangaOccultSigil';
export default function MangaCover() {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="cover-stage relative z-10 flex min-h-screen flex-col justify-center overflow-hidden">
      <div className="cover-stage__wash pointer-events-none absolute inset-0 z-0">
        <div className="cover-stage__plane cover-stage__plane--one" />
        <div className="cover-stage__plane cover-stage__plane--two" />
        <div className="cover-stage__plane cover-stage__plane--three" />
        <MangaOccultSigil className="cover-stage__sigil" label="VOLUME 01 / SIGIL" />
      </div>

      <div className="cover-stage__layout relative z-10 mx-auto flex w-full max-w-page flex-col gap-12 px-4 pt-28 pb-12 md:px-6 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div className="cover-stage__copy flex flex-col justify-center">
          <div className="cover-stage__headerline">
            <span className="cover-stage__kicker">VOLUME 01 / ODDITY LOG</span>
            <span className="cover-stage__status">MOROCCO / REMOTE</span>
          </div>

          <div className="cover-stage__title-wrap relative overflow-hidden">
            <span className="cover-stage__tagline">{profile.tagline}</span>
            <h1 className="font-display text-[clamp(4.75rem,17vw,12rem)] leading-[0.72] tracking-tight text-ink">
              <span className="block">FAHD</span>
              <span className="block text-[clamp(3.8rem,13vw,10rem)] tracking-tight text-ink/92">ELHALOUI</span>
            </h1>
          </div>

          <div className="cover-stage__subline">
            <p className="cover-stage__subquote">{profile.coverSubQuote}</p>
            <div className="cover-stage__role-band">
              <span>{profile.role}</span>
            </div>
          </div>

          <div className="cover-stage__signal mt-10">
            <div className="cover-stage__signal-card relative inline-block px-5 py-4">
              <p className="font-comic text-xl leading-tight text-paper md:text-2xl">
                {profile.openingQuote}
              </p>
              <span className="speech-tail" />
            </div>
          </div>

          <div className="cover-stage__meta mt-10">
            <span>JUNIOR ENGINEER</span>
            <span>CLOUD / DEVOPS / SECURITY</span>
            <span>READ. BREAK. REBUILD.</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#projects"
              className="cover-stage__cta cover-stage__cta--primary inline-flex min-h-[48px] items-center px-6 py-2 font-body text-xs font-black uppercase tracking-[0.15em]"
            >
              View Projects
            </Link>
            <Link
              href="#contact"
              className="cover-stage__cta cover-stage__cta--secondary inline-flex min-h-[48px] items-center px-6 py-2 font-body text-xs font-black uppercase tracking-[0.15em]"
            >
              Enter Final Page
            </Link>
          </div>
        </div>

        <div className="cover-stage__visual relative flex items-center justify-center lg:justify-end">
          <div className="cover-stage__shadow-echo" aria-hidden />
          <div className="cover-stage__portrait-frame relative w-full max-w-md">
            <div className="cover-stage__portrait-meta">
              <span>CASE 00</span>
              <span>PROFILE / STAGING</span>
            </div>
            {!imgError ? (
              <Image
                src={withBasePath('/images/me.png')}
                alt="Fahd Elhaloui profile"
                width={600}
                height={800}
                loading="eager"
                className="cover-stage__portrait w-full object-cover"
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
                    me.png
                  </p>
                </div>
              </div>
            )}
            <div className="cover-stage__portrait-ghost" aria-hidden>
              <span>EXCEPTION</span>
            </div>
            <span className="cover-stage__portrait-label">PROFILE</span>
          </div>
        </div>
      </div>

      <div className="cover-stage__footer relative z-10 mt-auto py-3">
        <div className="mx-auto flex max-w-page items-center justify-between gap-4 px-4 md:px-6">
          <p className="font-body text-[0.6rem] font-black uppercase tracking-[0.2em] text-paper/70">
            SYSTEMS / SECURITY / INFRASTRUCTURE
          </p>
          <p className="font-body text-[0.52rem] font-black uppercase tracking-[0.24em] text-paper/50">
            CHAPTERS FOLLOW BELOW
          </p>
        </div>
      </div>
    </section>
  );
}
