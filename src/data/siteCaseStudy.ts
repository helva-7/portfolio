export interface SiteCaseStudyNode {
  id: string;
  label: string;
  detail: string;
  tone: 'ink' | 'red' | 'blue' | 'yellow';
}

export interface SiteCaseStudyData {
  eyebrow: string;
  title: string;
  summary: string;
  facts: Array<{ label: string; value: string }>;
  decisions: string[];
  validation: string[];
  architecture: {
    title: string;
    description: string;
    nodes: SiteCaseStudyNode[];
    edges: Array<{ from: string; to: string; label: string }>;
  };
}

export const siteCaseStudy: SiteCaseStudyData = {
  eyebrow: 'ODDITY / BUILD LOG',
  title: 'How this site is built',
  summary: 'A static Next.js portfolio shaped like a case-board interface: mostly server-rendered content, small client islands where interaction actually needs state.',
  facts: [
    { label: 'Hosting shape', value: 'Static export for GitHub Pages-style /portfolio hosting.' },
    { label: 'Pathing', value: 'basePath /portfolio and assetPrefix /portfolio/ keep routes and assets aligned.' },
    { label: 'Images', value: 'Next images are unoptimized because static export cannot use the image optimizer.' },
    { label: 'Motion', value: 'Video and scroll motion include reduced-motion guards and avoid heavy constant animation.' },
  ],
  decisions: [
    'Native details/summary keeps project dossiers keyboard-friendly without modal state.',
    'The command center is a single client island; the rest of the case-study content stays static.',
    'Project and skill evidence is modeled as typed data so UI can connect proof without hiding content.',
  ],
  validation: ['npm run lint', 'npm run build'],
  architecture: {
    title: 'Static case-board architecture',
    description: 'Static data flows into server sections, while focused client islands handle motion, command palette, and skill loadout state.',
    nodes: [
      { id: 'data', label: 'Typed data', detail: 'portfolio + site build records', tone: 'yellow' },
      { id: 'server', label: 'Server sections', detail: 'scenes, archive, build log, contact', tone: 'ink' },
      { id: 'client', label: 'Client islands', detail: 'command, loadout, motion guards', tone: 'red' },
      { id: 'export', label: 'Static export', detail: 'basePath + assetPrefix', tone: 'blue' },
      { id: 'pages', label: '/portfolio', detail: 'GitHub Pages-style delivery', tone: 'ink' },
    ],
    edges: [
      { from: 'data', to: 'server', label: 'render' },
      { from: 'server', to: 'client', label: 'enhance' },
      { from: 'client', to: 'export', label: 'guard' },
      { from: 'export', to: 'pages', label: 'ship' },
    ],
  },
};
