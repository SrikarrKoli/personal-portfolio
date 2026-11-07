/** Reviewable snapshot of public project documentation; no visitor-time GitHub calls. */
export interface Project {
  id: string;
  title: string;
  summary: string;
  category: string;
  status: string;
  role: string;
  stack: string[];
  problem: string;
  solution: string;
  howItWorks: string[];
  contribution: string;
  repo?: string;
  demo?: string;
  presentation?: string;
  source: string[];
  featured: boolean;
}

const github = 'https://github.com/SrikarrKoli';
export const projects: Project[] = [
  {
    id: 'transferpath', title: 'TransferPath', category: 'Education', status: 'Working web app', role: 'Builder & main contributor', featured: true,
    summary: 'I’m building a transfer planner for Texas community college students. It keeps course plans, university requirements, deadlines, and application tasks together.',
    stack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Three.js'],
    problem: 'Planning a transfer means checking prerequisites, deadlines, and application tasks across several sources.',
    solution: 'I’m building one place to plan courses, check requirements, and keep track of transfer applications.',
    howItWorks: ['Students choose their current school, target university, major, and transfer term during onboarding.', 'A timeline shows courses and milestones. When course information changes, the requirements and checklist update with it.', 'Supabase stores profiles, plans, deadlines, and essay drafts, with authentication and row-level access controls. A Three.js campus introduces the product areas.'],
    contribution: 'I build and maintain TransferPath as its main contributor, connecting the planning workflow with the application and data model.',
    repo: `${github}/transferpath`, demo: 'https://transferpath.vercel.app', source: [`${github}/transferpath/blob/main/README.md`],
  },
  {
    id: 'spots', title: 'Spots', category: 'Social AR', status: "Meta Ray-Ban track prototype", role: 'Hackathon team contributor', featured: true,
    summary: "We built a Meta Ray-Ban track prototype that recognizes physical objects through a camera and lets people leave notes and replies on them.",
    stack: ['React', 'TypeScript', 'FastAPI', 'OpenCV', 'SQLite', 'Ollama'],
    problem: 'Physical places and objects can spark a shared interest, but the conversation often ends when people leave.',
    solution: 'We built a prototype that recognizes objects and saves notes and replies attached to them. People can use the camera or voice to interact.',
    howItWorks: ['OpenCV matches camera views against enrolled reference images and tracks overlays between recognition checks.', 'A FastAPI backend saves object notes and replies in SQLite, so another browser can retrieve the same conversation.', 'Voice input is transcribed and sent to a local model through Ollama to answer questions or add notes. The browser includes Phone and Glasses views.'],
    contribution: "I worked on Spots with the hackathon team. My repository is a fork of our shared project. We built the prototype for the Meta Ray-Ban track; the current implementation runs in a browser.",
    repo: `${github}/spots-social-ar`, source: [`${github}/spots-social-ar/blob/main/README.md`, 'https://github.com/arnavvalvekar/meta-glasses-notes'],
  },
  {
    id: 'ecofin-carbon', title: 'EcoFin Carbon', category: 'Climate & finance', status: 'Hackathon MVP', role: 'Product Lead · team project', featured: false,
    summary: "We used transaction data to estimate the carbon impact of purchases and generate sustainability suggestions.",
    stack: ['TypeScript', 'Google Gemini', 'Capital One Nessie API'],
    problem: 'A transaction history shows what people spend, but makes the environmental impact of those purchases harder to understand.',
    solution: 'Our prototype estimates emissions from spending data and suggests ways to reduce them.',
    howItWorks: ['Capital One’s Nessie API supplies spending data for the demonstration.', 'Transaction information feeds carbon-footprint calculations and an emissions-tracking interface.', 'Gemini generates suggestions using that spending and emissions context.'],
    contribution: "I worked with the team on EcoFin Carbon at HackTX 2025. This repository is a fork of the team project.",
    repo: `${github}/HackTX-EcoFin-Carbon`, source: [`${github}/HackTX-EcoFin-Carbon/blob/main/README.md`, `${github}/About-ME`],
  },
  {
    id: 'goosechase', title: 'GooseChase', category: 'Running & AI', status: 'Hackathon prototype', role: 'Product & development contributor', featured: true,
    summary: 'We built a running coach that uses Strava activity history to generate coaching conversations, run debriefs, and training plans.',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Strava API', 'Claude'],
    problem: 'Generic training plans don’t adapt well to an individual runner’s pace, goals, or schedule.',
    solution: 'We built a running coach at HackHackGoose 2026 that uses a runner’s activity history to guide its responses.',
    howItWorks: ['Strava activity integration provides running history for the coaching experience.', 'Supabase stores application data and supports the account workflow.', 'The Next.js application uses Claude to generate coaching conversations, run debriefs, weekly challenges, and training plans from runner context.'],
    contribution: 'I worked on product and development with the hackathon team.',
    repo: `${github}/GooseChase-HackHackGoose2026`, demo: 'https://goosechase.vercel.app', source: [`${github}/GooseChase-HackHackGoose2026/blob/main/README.md`, `${github}/GooseChase-HackHackGoose2026/blob/main/PRESENTATION.md`],
  },
  {
    id: 'nba-player-advocacy', title: 'NBA Player Advocacy', category: 'Data analysis', status: 'Hackathon analysis', role: 'Data for Good project contributor', featured: false,
    summary: 'Our team analyzed NBA game data from 2000–2023 alongside travel, player health, and team performance indexes at JPMorgan Chase Data for Good.',
    stack: ['Statistical analysis'],
    problem: 'We wanted to compare travel demands, player health, and team performance across NBA seasons.',
    solution: 'We put together a research presentation for the JPMorgan Chase Data for Good NBPA hackathon, using those measures to compare patterns across seasons.',
    howItWorks: ['The team combined NBA game data from 2000–2023 with reusable travel, player-health, and team-performance indexes.', 'The analysis compares patterns across these measures and presents the work as a team research deck. It does not establish that travel causes a particular outcome.'],
    contribution: 'I worked with the NBA Player Advocacy team on this analysis at JPMorgan Chase Data for Good.',
    presentation: 'https://docs.google.com/presentation/d/1V7zivx1tSnfK4IgNJxUOGIXsl6cW0bWikrJV3MBA49g/edit?usp=drive_link',
    source: [`${github}/About-ME`],
  },
];
