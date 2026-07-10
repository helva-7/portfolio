import type { StaticImageData } from 'next/image';
import craftBackdrop from '../../public/images/craft.png';
import interstitialOrigin from '../assets/references/interstitial-origin.png';
import interstitialProjects from '../assets/references/interstitial-projects.png';
import interstitialStats from '../assets/references/interstitial-stats.png';
import trialBackdrop from '../../public/images/tiral.png';
import monogatariSigh from '../assets/references/monogatari-sigh.png';
import fahdPortraitPoster from '../assets/references/fahd-portrait-poster.png';

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  email: string;
  github: string;
  linkedin: string;
  openingQuote: string;
  coverSubQuote: string;
  finalQuote: string;
}

export interface Scene {
  id: string;
  chapterLabel: string;
  title: string;
  backgroundWord: string;
  quote: string;
  subQuote?: string;
  body: string;
  image: string;
  imageLabel: string;
  reverse?: boolean;
  broken?: boolean;
}

export interface Project {
  number: string;
  name: string;
  image: string;
  description: string;
  stack: string[];
  quote: string;
  longDescription: string;
}

export interface DeconstructionPage {
  id: string;
  kicker: string;
  keyword: string;
  fragments: string[];
  quote: string;
  aside?: string;
  referenceKind: 'paper' | 'columns' | 'dictionary';
  gloss: string;
  supportingTerms: string[];
  backgroundImage: StaticImageData;
  portraitImage?: StaticImageData;
  sceneHeight?: 'short' | 'tall';
  cutouts: Array<{
    label: string;
    note: string;
    tone: 'ink' | 'blue' | 'green' | 'paper';
    tilt: 'left' | 'right' | 'flat';
  }>;
}

export interface Skill {
  label: string;
  value: number;
  glitch?: boolean;
}

export interface NavLink {
  label: string;
  href: string;
}

export const profile: Profile = {
  name: 'Fahd Elhaloui',
  role: 'Junior DevOps & Cloud Security Engineer',
  tagline: 'THE EXCEPTION',
  email: 'fahd.elhaloui@uir.ac.ma',
  github: 'https://github.com/helva-7',
  linkedin: 'https://linkedin.com/in/fahd-elhaloui',
  openingQuote: 'READ THE SYSTEM. FIND THE BREAK.',
  coverSubQuote: 'to what heights can i not rise',
  finalQuote: 'THE SYSTEM EVOLVES. SO DO I.',
};

export const scenes: Scene[] = [
  {
    id: 'origin',
    chapterLabel: '001',
    title: 'I loved systems before I knew the word.',
    backgroundWord: 'ORIGIN',
    quote: 'I was reading systems before I knew their names.',
    body: 'Computers and video games introduced me to systems at 4 years old. Not as a career plan, just pure curiosity about how things work, what breaks them, and how to put them back together.',
    image: '/images/origin.png',
    imageLabel: 'Origin',
  },
  {
    id: 'first-builds',
    chapterLabel: '002',
    title: 'Small projects. Real spark.',
    backgroundWord: 'FIRST BUILDS',
    quote: 'Small builds. First proof. Real fire.',
    body: 'At 15, I jumped into web development. Simple projects, fun experiments. Nothing corporate yet. Just building because it felt right. The first time I made a browser do what I wanted, I was hooked.',
    image: '/images/profile.jpg',
    imageLabel: 'First builds',
  },
  {
    id: 'trial',
    chapterLabel: '003',
    title: 'The path broke. The mission adapted.',
    backgroundWord: 'TRIAL',
    quote: 'The path broke. The mission adapted.',
    subQuote: 'Whatever I do now I do it for that guy that used to be so mad it made him unkillable.',
    body: 'One year after BAC, I got lymphoma cancer. The same mindset I used in engineering also helped me through sickness: understand the problem, keep moving, adapt, and rebuild. Survival is not about avoiding the break — it is about becoming unkillable through it. After becoming cancer free, I joined International University of Rabat to sharpen my craft and become a stronger engineer.',
    image: '/images/me.png',
    imageLabel: 'Survival',
    broken: true,
  },
  {
    id: 'craft',
    chapterLabel: '004',
    title: 'Make it useful. Make it repeatable.',
    backgroundWord: 'CRAFT',
    quote: 'If it works once, understand it. If it matters, repeat it.',
    body: 'At university, I specialized in Cloud and DevOps — Docker, Azure, Linux, automation, security workflows. Systems that don\'t just work, they survive. Every internship across enterprise SOC, DevOps, financial systems, and tracking platforms built the same conviction: clean infrastructure is the foundation of everything.',
    image: '/images/stats.png',
    imageLabel: 'Craft',
  },
];

export const projects: Project[] = [
  {
    number: '01',
    name: 'Dokkaebi',
    image: '/images/project-1.jpg',
    description: 'Dockerized security scan orchestration platform with RBAC, queue dispatch, isolated execution, and reports.',
    longDescription: 'A platform that orchestrates security scans across Docker containers with role-based access control, script approval workflows, job queue dispatch, isolated execution environments, and comprehensive reporting.',
    stack: ['React', 'FastAPI', 'Celery', 'PostgreSQL', 'Redis', 'Docker'],
    quote: 'Security Scan Orchestration',
  },
  {
    number: '02',
    name: 'Real-Time Fraud Detection',
    image: '/images/project-2.jpg',
    description: 'Azure ML fraud detection pipeline with REST inference, Blob audit, and dashboards.',
    longDescription: 'End-to-end fraud detection pipeline on Azure ML with a transaction simulator, REST inference endpoint, Blob Storage audit layer, Streamlit dashboard, and Power BI analytics.',
    stack: ['Azure ML', 'Python', 'Streamlit', 'Blob Storage', 'Power BI'],
    quote: 'Fraud Detection Pipeline',
  },
  {
    number: '03',
    name: 'Smart Check-Up IoT',
    image: '/images/project-3.jpg',
    description: 'RFID + PIN attendance system with MariaDB logs and Node-RED dashboard.',
    longDescription: 'An RFID and PIN-based attendance and access control system with MariaDB audit logging and a Node-RED monitoring dashboard.',
    stack: ['Arduino', 'Node-RED', 'MariaDB', 'RFID'],
    quote: 'IoT Access Control',
  },
  {
    number: '04',
    name: 'AI Voice Agent',
    image: '/images/profile.jpg',
    description: 'Python voice assistant with speech recognition and system automation.',
    longDescription: 'A voice automation assistant built in Python with speech recognition, command routing, system actions, and external API automation capabilities.',
    stack: ['Python', 'Speech Recognition', 'Automation APIs'],
    quote: 'Voice Automation',
  },
];

export const skills: Skill[] = [
  { label: 'Cloud / DevOps', value: 92 },
  { label: 'Automation', value: 90 },
  { label: 'Problem Solving', value: 95 },
  { label: 'Backend', value: 86 },
  { label: 'Security', value: 88 },
  { label: 'Execution', value: 91 },
  { label: 'Resilience', value: 99, glitch: true },
];

export const navLinks: NavLink[] = [
  { label: 'Origin', href: '#origin' },
  { label: 'First Builds', href: '#first-builds' },
  { label: 'Trial', href: '#trial' },
  { label: 'Craft', href: '#craft' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stats', href: '#stats' },
  { label: 'Evolve', href: '#contact' },
];

export const cvSummary = `Final-year Computer Science student specializing in Cloud and DevOps with internships across enterprise SOC, DevOps, financial systems, and tracking platforms. Hands-on with Docker, Linux, Azure, FastAPI, React, PostgreSQL/Redis, Celery, Python, Nginx, GitHub Actions, and Power BI.`;

export const deconstructionPages: DeconstructionPage[] = [
  {
    id: 'interstitial-origin',
    kicker: 'PAGE 01',
    keyword: 'ORIGIN',
    fragments: ['OR', 'IG', 'IN'],
    quote: 'I was reading systems before I knew their names.',
    aside: 'Before the labels came the instinct.',
    referenceKind: 'paper',
    gloss: 'The first pattern appears before the vocabulary for it does.',
    supportingTerms: ['curiosity', 'systems', 'instinct'],
    backgroundImage: interstitialOrigin,
    portraitImage: fahdPortraitPoster,
    sceneHeight: 'tall',
    cutouts: [
      { label: 'Memory fragment', note: 'first contact', tone: 'blue', tilt: 'left' },
      { label: 'System trace', note: 'pattern before name', tone: 'paper', tilt: 'right' },
      { label: 'Source note', note: 'play -> structure', tone: 'ink', tilt: 'flat' },
    ],
  },
  {
    id: 'interstitial-first-builds',
    kicker: 'PAGE 02',
    keyword: 'FIRST BUILDS',
    fragments: ['FIRST', 'BU', 'ILDS'],
    quote: 'Small builds. First proof. Real fire.',
    aside: 'A browser obeyed once. That was enough.',
    referenceKind: 'dictionary',
    gloss: 'Prototype, proof, and obsession all begin in the same tiny experiment.',
    supportingTerms: ['spark', 'proof', 'repeat'],
    backgroundImage: monogatariSigh,
    sceneHeight: 'short',
    cutouts: [
      { label: 'Test build', note: 'browser response', tone: 'paper', tilt: 'left' },
      { label: 'Proof note', note: 'small builds matter', tone: 'blue', tilt: 'right' },
      { label: 'Impulse', note: 'keep building', tone: 'ink', tilt: 'flat' },
    ],
  },
  {
    id: 'interstitial-trial',
    kicker: 'PAGE 03',
    keyword: 'TRIAL',
    fragments: ['TRI', 'AL'],
    quote: 'The path broke. The mission adapted.',
    aside: 'Whatever I do now I do it for that guy that used to be so mad it made him unkillable.',
    referenceKind: 'columns',
    gloss: 'A broken route is still a route when the will to continue stays intact.',
    supportingTerms: ['break', 'adapt', 'rebuild'],
    backgroundImage: trialBackdrop,
    sceneHeight: 'tall',
    cutouts: [
      { label: 'Impact report', note: 'route interrupted', tone: 'green', tilt: 'left' },
      { label: 'Recovery log', note: 'adaptation required', tone: 'paper', tilt: 'right' },
      { label: 'Survival memo', note: 'continue anyway', tone: 'ink', tilt: 'flat' },
    ],
  },
  {
    id: 'interstitial-craft',
    kicker: 'PAGE 04',
    keyword: 'CRAFT',
    fragments: ['CR', 'AF', 'T'],
    quote: 'If it works once, understand it. If it matters, repeat it.',
    aside: 'Useful. Repeatable. Stable under pressure.',
    referenceKind: 'paper',
    gloss: 'Craft starts where one success becomes a system instead of an accident.',
    supportingTerms: ['useful', 'repeatable', 'stable'],
    backgroundImage: craftBackdrop,
    sceneHeight: 'short',
    cutouts: [
      { label: 'Workflow', note: 'understand the result', tone: 'paper', tilt: 'left' },
      { label: 'Discipline', note: 'repeat what matters', tone: 'blue', tilt: 'right' },
      { label: 'Rule set', note: 'stability first', tone: 'ink', tilt: 'flat' },
    ],
  },
  {
    id: 'interstitial-projects',
    kicker: 'PROJECT ARCHIVE',
    keyword: 'PROJECTS',
    fragments: ['PRO', 'JECT', 'S'],
    quote: 'READ THE SYSTEM. FIND THE BREAK.',
    aside: 'Case files pinned to the board.',
    referenceKind: 'columns',
    gloss: 'Each project is evidence: a problem observed, modeled, and pushed into form.',
    supportingTerms: ['case', 'scan', 'dispatch'],
    backgroundImage: interstitialProjects,
    sceneHeight: 'tall',
    cutouts: [
      { label: 'Case file', note: 'observed problem', tone: 'paper', tilt: 'left' },
      { label: 'Archive tag', note: 'model -> deploy', tone: 'green', tilt: 'right' },
      { label: 'Dispatch', note: 'board updated', tone: 'ink', tilt: 'flat' },
    ],
  },
  {
    id: 'interstitial-stats',
    kicker: 'STATUS REPORT',
    keyword: 'STATS',
    fragments: ['ST', 'AT', 'S'],
    quote: 'to what heights can i not rise',
    aside: 'Measured on paper. Felt in execution.',
    referenceKind: 'dictionary',
    gloss: 'Metrics are only shadows; the real measure is how far the work can keep climbing.',
    supportingTerms: ['measure', 'stress', 'execute'],
    backgroundImage: interstitialStats,
    sceneHeight: 'short',
    cutouts: [
      { label: 'Metric card', note: 'numbers are shadows', tone: 'blue', tilt: 'left' },
      { label: 'Stress note', note: 'capability in practice', tone: 'paper', tilt: 'right' },
      { label: 'Execution', note: 'climb anyway', tone: 'ink', tilt: 'flat' },
    ],
  },
  {
    id: 'interstitial-contact',
    kicker: 'FINAL PAGE',
    keyword: 'EVOLVE',
    fragments: ['EV', 'OL', 'VE'],
    quote: 'THE SYSTEM EVOLVES. SO DO I.',
    aside: 'One more chapter always follows.',
    referenceKind: 'paper',
    gloss: 'The last page is not an ending, only the cleanest handoff into the next version.',
    supportingTerms: ['answer', 'continue', 'evolve'],
    backgroundImage: fahdPortraitPoster,
    sceneHeight: 'tall',
    cutouts: [
      { label: 'Closing note', note: 'not the final page', tone: 'ink', tilt: 'left' },
      { label: 'Next state', note: 'continue forward', tone: 'blue', tilt: 'right' },
      { label: 'Versioning', note: 'system evolves', tone: 'paper', tilt: 'flat' },
    ],
  },
];
