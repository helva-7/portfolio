import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Bebas_Neue, Bangers, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

const bangers = Bangers({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-comic',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Fahd Elhaloui | THE EXCEPTION',
  description: 'Manga-style portfolio of Fahd Elhaloui — Junior DevOps & Cloud Security Engineer. Read the system. Fix the break.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${bebas.variable} ${bangers.variable} ${plexMono.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
