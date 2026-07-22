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
  id: string;
  number: string;
  name: string;
  image: string;
  description: string;
  stack: string[];
  quote: string;
  longDescription: string;
  evidence: EvidenceItem[];
  dossier: ProjectDossier;
  architecture?: ProjectArchitectureDiagramData;
  relatedSkillIds?: SkillId[];
}

export type SkillId =
  | 'cloud-devops'
  | 'security'
  | 'automation'
  | 'backend'
  | 'data'
  | 'python'
  | 'problem-solving'
  | 'execution'
  | 'resilience';

export interface ProjectDossier {
  problem: string;
  constraints: string[];
  decisions: string[];
  outcome: string;
  nextImprovement: string;
}

export interface EvidenceItem {
  label: string;
  value: string;
  href?: string;
}

export interface ProjectArchitectureDiagramData {
  title: string;
  summary: string;
  nodes: Array<{
    id: string;
    label: string;
    detail: string;
    tone?: 'ink' | 'red' | 'blue' | 'yellow';
  }>;
  edges: Array<{
    from: string;
    to: string;
    label?: string;
  }>;
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
  id: SkillId;
  label: string;
  value: number;
  glitch?: boolean;
}

export interface SkillLoadout {
  id: SkillId;
  label: string;
  codename: string;
  summary: string;
  evidenceFocus: string;
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
    id: 'dokkaebi',
    number: '01',
    name: 'Dokkaebi',
    image: '/images/project-1.jpg',
    description: 'Dockerized security scan orchestration platform with RBAC, queue dispatch, isolated execution, and reports.',
    longDescription: 'A platform that orchestrates security scans across Docker containers with role-based access control, script approval workflows, job queue dispatch, isolated execution environments, and comprehensive reporting.',
    stack: ['React', 'FastAPI', 'Celery', 'PostgreSQL', 'Redis', 'Docker'],
    quote: 'Security Scan Orchestration',
    relatedSkillIds: ['security', 'backend', 'automation', 'cloud-devops'],
    evidence: [
      { label: 'Control', value: 'RBAC + script approval' },
      { label: 'Execution', value: 'Queued isolated scans' },
      { label: 'Output', value: 'Report-first workflow' },
    ],
    dossier: {
      problem: 'Security scripts are useful, but running them manually creates inconsistent results and risky execution habits.',
      constraints: ['Scan jobs needed isolation from the app server.', 'Users needed different permissions for approving and running scripts.', 'Reports had to stay traceable after jobs completed.'],
      decisions: ['Used FastAPI as the control plane and Celery for job dispatch.', 'Kept Redis as the queue layer so scan work could be retried and separated from requests.', 'Ran scans through Docker containers to make execution boundaries clearer.'],
      outcome: 'The project became a repeatable scan pipeline instead of a loose collection of scripts.',
      nextImprovement: 'Add stronger scan sandbox policies and signed script versions before treating it like a production security tool.',
    },
    architecture: {
      title: 'Dokkaebi scan pipeline',
      summary: 'A user-approved scan moves from the web app into a queue, runs in an isolated worker path, then returns a report.',
      nodes: [
        { id: 'ui', label: 'React UI', detail: 'Request + review', tone: 'yellow' },
        { id: 'api', label: 'FastAPI', detail: 'RBAC control plane', tone: 'ink' },
        { id: 'queue', label: 'Redis / Celery', detail: 'Dispatch jobs', tone: 'blue' },
        { id: 'worker', label: 'Docker worker', detail: 'Isolated scan run', tone: 'red' },
        { id: 'db', label: 'PostgreSQL', detail: 'Reports + audit trail', tone: 'ink' },
      ],
      edges: [
        { from: 'ui', to: 'api', label: 'submit' },
        { from: 'api', to: 'queue', label: 'approve' },
        { from: 'queue', to: 'worker', label: 'run' },
        { from: 'worker', to: 'db', label: 'store' },
      ],
    },
  },
  {
    id: 'fraud-detection',
    number: '02',
    name: 'Real-Time Fraud Detection',
    image: '/images/project-2.jpg',
    description: 'Azure ML fraud detection pipeline with REST inference, Blob audit, and dashboards.',
    longDescription: 'End-to-end fraud detection pipeline on Azure ML with a transaction simulator, REST inference endpoint, Blob Storage audit layer, Streamlit dashboard, and Power BI analytics.',
    stack: ['Azure ML', 'Python', 'Streamlit', 'Blob Storage', 'Power BI'],
    quote: 'Fraud Detection Pipeline',
    relatedSkillIds: ['cloud-devops', 'automation', 'data', 'python'],
    evidence: [
      { label: 'Cloud path', value: 'Azure ML endpoint' },
      { label: 'Audit', value: 'Blob-backed records' },
      { label: 'Visibility', value: 'Dashboard + BI layer' },
    ],
    dossier: {
      problem: 'Fraud signals are only useful if predictions, audit records, and analyst visibility stay connected.',
      constraints: ['The inference path needed to be callable through a REST-like workflow.', 'Audit data had to be retained outside the dashboard.', 'The demo needed clear business-facing visibility, not only model output.'],
      decisions: ['Used Azure ML for model serving to keep inference separate from presentation.', 'Stored transaction traces in Blob Storage so predictions could be reviewed later.', 'Split quick monitoring and reporting between Streamlit and Power BI.'],
      outcome: 'The project showed the full path from simulated transaction to prediction, audit trail, and readable dashboard.',
      nextImprovement: 'Add drift checks and alert thresholds so the pipeline can flag suspicious model behavior, not only suspicious transactions.',
    },
    architecture: {
      title: 'Fraud inference and audit flow',
      summary: 'Transactions pass through inference, are stored for audit, then become dashboard evidence.',
      nodes: [
        { id: 'sim', label: 'Simulator', detail: 'Transaction events', tone: 'yellow' },
        { id: 'ml', label: 'Azure ML', detail: 'Fraud score endpoint', tone: 'blue' },
        { id: 'blob', label: 'Blob Storage', detail: 'Prediction audit', tone: 'ink' },
        { id: 'dash', label: 'Streamlit', detail: 'Live review', tone: 'red' },
        { id: 'bi', label: 'Power BI', detail: 'Business view', tone: 'ink' },
      ],
      edges: [
        { from: 'sim', to: 'ml', label: 'score' },
        { from: 'ml', to: 'blob', label: 'log' },
        { from: 'blob', to: 'dash', label: 'inspect' },
        { from: 'blob', to: 'bi', label: 'report' },
      ],
    },
  },
  {
    id: 'smart-checkup-iot',
    number: '03',
    name: 'Smart Check-Up IoT',
    image: '/images/project-3.jpg',
    description: 'RFID + PIN attendance system with MariaDB logs and Node-RED dashboard.',
    longDescription: 'An RFID and PIN-based attendance and access control system with MariaDB audit logging and a Node-RED monitoring dashboard.',
    stack: ['Arduino', 'Node-RED', 'MariaDB', 'RFID'],
    quote: 'IoT Access Control',
    relatedSkillIds: ['automation', 'backend'],
    evidence: [
      { label: 'Input', value: 'RFID + PIN' },
      { label: 'Record', value: 'MariaDB event log' },
      { label: 'Monitor', value: 'Node-RED dashboard' },
    ],
    dossier: {
      problem: 'Access events needed to be captured reliably enough to review who entered and when.',
      constraints: ['Hardware input could be noisy or repeated.', 'The storage layer had to keep a simple audit history.', 'The dashboard needed to make status visible without a heavy frontend.'],
      decisions: ['Combined RFID with PIN checks to avoid relying on a single signal.', 'Logged events into MariaDB for straightforward querying and review.', 'Used Node-RED to build a fast operational dashboard around device events.'],
      outcome: 'The system connected physical access input to a visible audit trail with a small, understandable stack.',
      nextImprovement: 'Add clearer offline behavior so the device can queue events when the database is temporarily unavailable.',
    },
  },
  {
    id: 'ai-voice-agent',
    number: '04',
    name: 'AI Voice Agent',
    image: '/images/profile.jpg',
    description: 'Python voice assistant with speech recognition and system automation.',
    longDescription: 'A voice automation assistant built in Python with speech recognition, command routing, system actions, and external API automation capabilities.',
    stack: ['Python', 'Speech Recognition', 'Automation APIs'],
    quote: 'Voice Automation',
    relatedSkillIds: ['automation', 'python'],
    evidence: [
      { label: 'Input', value: 'Speech recognition' },
      { label: 'Routing', value: 'Command parser' },
      { label: 'Action', value: 'System/API tasks' },
    ],
    dossier: {
      problem: 'Repeated desktop and API tasks were slow to trigger manually and useful as an automation experiment.',
      constraints: ['Voice input can be ambiguous.', 'Commands needed guardrails so actions stayed predictable.', 'The system had to stay lightweight enough to run locally.'],
      decisions: ['Kept command routing explicit instead of pretending every phrase should be understood.', 'Separated recognition from action handlers so new commands could be added cleanly.', 'Used Python libraries and APIs that matched the local automation goal.'],
      outcome: 'The assistant became a practical experiment in turning spoken intent into controlled automation.',
      nextImprovement: 'Add confirmation steps for destructive commands and a small command history for debugging.',
    },
  },
];

export const skills: Skill[] = [
  { id: 'cloud-devops', label: 'Cloud / DevOps', value: 92 },
  { id: 'automation', label: 'Automation', value: 90 },
  { id: 'problem-solving', label: 'Problem Solving', value: 95 },
  { id: 'backend', label: 'Backend', value: 86 },
  { id: 'security', label: 'Security', value: 88 },
  { id: 'execution', label: 'Execution', value: 91 },
  { id: 'resilience', label: 'Resilience', value: 99, glitch: true },
];

export const skillLoadouts: SkillLoadout[] = [
  {
    id: 'cloud-devops',
    label: 'Cloud / DevOps',
    codename: 'DEPLOYMENT RITUAL',
    summary: 'Cloud services, containers, queues, and operational paths that make systems repeatable.',
    evidenceFocus: 'Look for Azure ML serving, Docker isolation, queue dispatch, and audit-friendly workflows.',
  },
  {
    id: 'security',
    label: 'Security',
    codename: 'THREAT INDEX',
    summary: 'Security work framed as controlled execution, permission boundaries, and traceable review.',
    evidenceFocus: 'Dokkaebi carries the strongest proof: RBAC, approval flow, isolated scans, and reports.',
  },
  {
    id: 'automation',
    label: 'Automation',
    codename: 'REPEAT ENGINE',
    summary: 'Turning manual steps into routed, observable, and safer workflows.',
    evidenceFocus: 'Evidence appears across queued scans, transaction simulation, device events, and voice commands.',
  },
  {
    id: 'backend',
    label: 'Backend',
    codename: 'CONTROL PLANE',
    summary: 'APIs, storage, command routing, and event records that keep the system understandable.',
    evidenceFocus: 'FastAPI, PostgreSQL, MariaDB, and event logs show the backend decisions behind the interface.',
  },
  {
    id: 'data',
    label: 'Data',
    codename: 'SIGNAL TRACE',
    summary: 'Data movement from input to inference, audit, dashboard, and business-readable output.',
    evidenceFocus: 'Fraud Detection is the clearest data proof: prediction, Blob audit, Streamlit review, Power BI reporting.',
  },
  {
    id: 'python',
    label: 'Python',
    codename: 'SCRIPT FAMILIAR',
    summary: 'Python used for inference glue, automation scripts, speech recognition, and local task routing.',
    evidenceFocus: 'Fraud Detection and AI Voice Agent show Python as practical automation infrastructure.',
  },
];

export const navLinks: NavLink[] = [
  { label: 'Origin', href: '#origin' },
  { label: 'First Builds', href: '#first-builds' },
  { label: 'Trial', href: '#trial' },
  { label: 'Craft', href: '#craft' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stats', href: '#stats' },
  { label: 'Build', href: '#site-build' },
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
