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
    image: '/images/origin.jpg',
    imageLabel: 'Replace: early age / first computer',
  },
  {
    id: 'first-builds',
    chapterLabel: '002',
    title: 'Small projects. Real spark.',
    backgroundWord: 'FIRST BUILDS',
    quote: 'Small builds. First proof. Real fire.',
    body: 'At 15, I jumped into web development. Simple projects, fun experiments. Nothing corporate yet. Just building because it felt right. The first time I made a browser do what I wanted, I was hooked.',
    image: '/images/profile.jpg',
    imageLabel: 'Replace: early code screenshot',
  },
  {
    id: 'trial',
    chapterLabel: '003',
    title: 'The path broke. The mission adapted.',
    backgroundWord: 'TRIAL',
    quote: 'The path broke. The mission adapted.',
    subQuote: 'Whatever I do now I do it for that guy that used to be so mad it made him unkillable.',
    body: 'One year after BAC, I got lymphoma cancer. The same mindset I used in engineering also helped me through sickness: understand the problem, keep moving, adapt, and rebuild. Survival is not about avoiding the break — it is about becoming unkillable through it. After becoming cancer free, I joined International University of Rabat to sharpen my craft and become a stronger engineer.',
    image: '/images/survival.jpg',
    imageLabel: 'Replace: symbolic / meaningful image',
    broken: true,
  },
  {
    id: 'craft',
    chapterLabel: '004',
    title: 'Make it useful. Make it repeatable.',
    backgroundWord: 'CRAFT',
    quote: 'If it works once, understand it. If it matters, repeat it.',
    body: 'At university, I specialized in Cloud and DevOps — Docker, Azure, Linux, automation, security workflows. Systems that don\'t just work, they survive. Every internship across enterprise SOC, DevOps, financial systems, and tracking platforms built the same conviction: clean infrastructure is the foundation of everything.',
    image: '/images/cloud.jpg',
    imageLabel: 'Replace: cloud / devops workspace',
  },
];

export const projects: Project[] = [
  {
    number: '01',
    name: 'Dokkaebi',
    image: '/images/project-dokkaebi.jpg',
    description: 'Dockerized security scan orchestration platform with RBAC, queue dispatch, isolated execution, and reports.',
    longDescription: 'A platform that orchestrates security scans across Docker containers with role-based access control, script approval workflows, job queue dispatch, isolated execution environments, and comprehensive reporting.',
    stack: ['React', 'FastAPI', 'Celery', 'PostgreSQL', 'Redis', 'Docker'],
    quote: 'Security Scan Orchestration',
  },
  {
    number: '02',
    name: 'Real-Time Fraud Detection',
    image: '/images/project-fraud.jpg',
    description: 'Azure ML fraud detection pipeline with REST inference, Blob audit, and dashboards.',
    longDescription: 'End-to-end fraud detection pipeline on Azure ML with a transaction simulator, REST inference endpoint, Blob Storage audit layer, Streamlit dashboard, and Power BI analytics.',
    stack: ['Azure ML', 'Python', 'Streamlit', 'Blob Storage', 'Power BI'],
    quote: 'Fraud Detection Pipeline',
  },
  {
    number: '03',
    name: 'Smart Check-Up IoT',
    image: '/images/project-iot.jpg',
    description: 'RFID + PIN attendance system with MariaDB logs and Node-RED dashboard.',
    longDescription: 'An RFID and PIN-based attendance and access control system with MariaDB audit logging and a Node-RED monitoring dashboard.',
    stack: ['Arduino', 'Node-RED', 'MariaDB', 'RFID'],
    quote: 'IoT Access Control',
  },
  {
    number: '04',
    name: 'AI Voice Agent',
    image: '/images/project-voice.jpg',
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
  { label: 'Contact', href: '#contact' },
];

export const cvSummary = `Final-year Computer Science student specializing in Cloud and DevOps with internships across enterprise SOC, DevOps, financial systems, and tracking platforms. Hands-on with Docker, Linux, Azure, FastAPI, React, PostgreSQL/Redis, Celery, Python, Nginx, GitHub Actions, and Power BI.`;
