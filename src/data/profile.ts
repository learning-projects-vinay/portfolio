export const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX || '';

export const withPrefix = (path: string) => `${assetPrefix}${path}`;

export const profile = {
  name: 'Vinay Panwar',
  role: 'Senior Software Engineer',
  focus: 'Node.js · Azure · AI Integration',
  company: 'Mindpath Tech',
  email: 'vinaypanwar280@gmail.com',
  location: 'Indore, India',
  timezone: 'IST (UTC+5:30)',
  availability: 'Open to roles & select client work',
  languages: 'English, Hindi',
  links: {
    linkedin: 'https://www.linkedin.com/in/vinay-panwar-vin/',
    github: 'https://github.com/vinay-panwar',
    source: 'https://github.com/learning-projects-vinay/portfolio',
  },
  resumePath: '/resume.pdf',
};

export const heroStats = [
  { value: '200+', label: 'REST APIs shipped' },
  { value: '50%', label: 'latency cut across products' },
  { value: '3×', label: 'faster releases via CI/CD' },
  { value: '2–4', label: 'engineers led & mentored' },
];

export const capabilities = [
  {
    title: 'Backend Systems',
    description:
      'REST APIs, WebSockets, and event-driven services in Node.js, Express, and NestJS — built on Azure Functions, Service Bus, and Cosmos DB for high-concurrency workloads.',
    metric: '200+ APIs · 50% latency cut',
  },
  {
    title: 'AI Engineering',
    description:
      'Agent design, LLM orchestration, and agentic workflows with N8N, the OpenAI API, and local models via Ollama — shipped into internal tools and client-facing products, not demos.',
    metric: 'in production, not demos',
  },
  {
    title: 'Cloud & DevOps',
    description:
      'Azure DevOps pipelines, Docker containerisation, and multi-environment deploy automation across every service the team ships.',
    metric: 'releases: 15–20 min → 5–8 min',
  },
];

export const stack = [
  { group: 'Languages', items: ['TypeScript', 'JavaScript', 'Python'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'NestJS', 'WebSocket', 'Event-Driven'] },
  { group: 'Data', items: ['MongoDB', 'MySQL', 'MS SQL', 'Cosmos DB', 'InfluxDB'] },
  { group: 'Cloud', items: ['Azure Functions', 'Service Bus', 'DevOps Pipelines', 'Docker', 'CI/CD'] },
  { group: 'AI', items: ['Ollama', 'OpenAI API', 'N8N', 'Agentic Flows', 'LLM Orchestration'] },
];

export interface Project {
  title: string;
  flagship?: boolean;
  problem: string;
  build: string;
  outcome: string;
  tech: string[];
  links: { label: string; href: string }[];
  privateNote?: string;
}

export const projects: Project[] = [
  {
    title: 'Multi-Agent AI Assistant',
    flagship: true,
    problem:
      'An always-on personal assistant is genuinely useful — but not if it means streaming your private data to a cloud provider.',
    build:
      'Three specialised agents — coding, personal assistant, and support — orchestrated over Discord, running entirely on local Ollama models with per-agent context-window management.',
    outcome:
      'Zero cloud data exposure, and a working reference for modular multi-agent architecture: orchestration, routing, and context management in production shape.',
    tech: ['Node.js', 'Ollama', 'Local LLMs', 'Discord API'],
    links: [],
    privateNote: 'Private build — ask me for a walkthrough',
  },
  {
    title: 'Express Architecture Enforcer',
    problem:
      'Every new service started from copy-pasted boilerplate, so conventions drifted and onboarding slowed the whole team down.',
    build:
      'A convention-enforcing modular-monolith template: linting, formatting, and a pre-configured Azure DevOps pipeline working out of the box.',
    outcome:
      'Adopted internally as the team standard — new projects start clean, setup time dropped, and onboarding became consistent.',
    tech: ['Express.js', 'ESLint', 'Prettier', 'Azure Pipelines'],
    links: [
      {
        label: 'View code',
        href: 'https://github.com/Nodejs-mindpath-workspace/nodejs-linter-template',
      },
    ],
  },
  {
    title: 'WebChat + Centralised Sessions',
    problem:
      'Real-time chat is easy on one server — until you scale out and session state stops being consistent.',
    build:
      'Room-based chat built end-to-end in TypeScript with WebSockets, backed by a centralised session manager persisting shared state in MongoDB.',
    outcome:
      'Persistent multi-user state with session consistency across multiple server instances.',
    tech: ['TypeScript', 'Express', 'WebSocket', 'MongoDB'],
    links: [
      { label: 'Chat repo', href: 'https://github.com/Nodejs-workspace/webchat' },
      {
        label: 'Sessions repo',
        href: 'https://github.com/Nodejs-mindpath-workspace/express-centralize-session',
      },
    ],
  },
];

export interface Role {
  title: string;
  company: string;
  start: string; // YYYY-MM
  end?: string; // YYYY-MM, absent = present
  summary: string;
  achievements: string[];
  tags: string[];
}

export const experience: Role[] = [
  {
    title: 'Senior Software Engineer',
    company: 'Mindpath Tech',
    start: '2025-12',
    summary: 'Leading a team of 2–4 engineers; owning architecture, CI/CD, and AI workflow design.',
    achievements: [
      'Lead a team of 2–4 engineers — weekly code reviews, architecture standards, and mentoring juniors to production-readiness.',
      'Introduced a modular-monolith pattern across Node.js/Express services, cutting cross-team integration issues.',
      'Drive AI-integrated workflow adoption: N8N, agentic-flow design, and chat-model orchestration across internal tools and client products.',
      'Own infrastructure decisions — Azure DevOps pipelines, Docker strategy, and multi-environment deploy automation.',
      'Work directly with clients to turn business requirements into specs, sprint goals, and delivery milestones.',
    ],
    tags: ['Leadership', 'Architecture', 'AI Workflows', 'Azure'],
  },
  {
    title: 'Software Developer',
    company: 'Mindpath Tech',
    start: '2023-07',
    end: '2025-12',
    summary: 'Shipped 200+ production APIs and the event-driven systems behind them.',
    achievements: [
      'Built and shipped 200+ REST APIs in Node.js, Express, and NestJS — cutting API response latency by 50% across client products.',
      'Built event-driven backends with Azure Functions, Service Bus, and Cosmos DB for high-concurrency workloads.',
      'Implemented Azure DevOps CI/CD automating build, test, and deploy — release time down from 15–20 minutes to 5–8.',
      'Delivered full-stack apps with React, Next.js, and EJS across MySQL, MS SQL, MongoDB, and InfluxDB in production.',
      'Worked directly with international clients on scoping, sprint planning, and live demos.',
    ],
    tags: ['Node.js', 'Azure', 'CI/CD', 'Event-Driven'],
  },
  {
    title: 'Software Developer Trainee',
    company: 'Mindpath Tech',
    start: '2022-12',
    end: '2023-07',
    summary: 'From fundamentals to production code in seven months.',
    achievements: [
      'Built and optimised REST APIs in Node.js/Express; integrated Azure Functions and Docker in a production environment.',
      'Developed client-facing web apps with EJS and modern JavaScript inside an Agile sprint workflow.',
    ],
    tags: ['Express.js', 'Docker', 'Git', 'Agile'],
  },
];

export const education = [
  {
    degree: 'B.Tech — Computer Science & Engineering',
    institution: 'Sage University, Indore',
    period: '2019 – 2023',
    grade: 'CGPA 8.63',
  },
  {
    degree: 'Higher Secondary (PCM)',
    institution: 'Govt. Model HSS, Manasa',
    period: '2018 – 2019',
    grade: '85.9%',
  },
];

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const parseYM = (ym: string) => {
  const [y, m] = ym.split('-').map(Number);
  return { y, m };
};

// Frozen at build time by next.config.ts. Using `new Date()` here instead would
// let the server-rendered HTML and the client render disagree once the build is
// older than the current month, which React reports as a hydration error.
const buildDate = new Date(process.env.NEXT_PUBLIC_BUILD_DATE || Date.now());

export const buildYear = buildDate.getFullYear();

const nowYM = () => ({ y: buildDate.getFullYear(), m: buildDate.getMonth() + 1 });

export const formatPeriod = (start: string, end?: string) => {
  const s = parseYM(start);
  const label = (p: { y: number; m: number }) => `${MONTHS[p.m - 1]} ${p.y}`;
  return `${label(s)} — ${end ? label(parseYM(end)) : 'Present'}`;
};

export const formatDuration = (start: string, end?: string) => {
  const s = parseYM(start);
  const e = end ? parseYM(end) : nowYM();
  const months = (e.y - s.y) * 12 + (e.m - s.m);
  if (months < 12) return `${months} mos`;
  const yrs = Math.floor(months / 12);
  const rem = months % 12;
  return rem === 0 ? `${yrs} yr${yrs > 1 ? 's' : ''}` : `${yrs} yr${yrs > 1 ? 's' : ''} ${rem} mos`;
};

export const totalExperienceYears = () => {
  const s = parseYM('2022-12');
  const now = nowYM();
  const months = (now.y - s.y) * 12 + (now.m - s.m);
  return `${Math.floor(months / 12)}+ years`;
};
