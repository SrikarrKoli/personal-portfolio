/** Owner-provided copy. Shared by the pages and the trail destination panels. */
export const profile = {
  name: 'Srikar Kolipaka',
  siteTitle: 'Explore Srikar’s trail',
  shortName: 'Srikar',
  introduction: 'Hi! I’m Srikar, an MIS student at UT Austin interested in product management and AI.',
  description: 'Srikar Kolipaka. MIS at UT Austin, product management, AI, and projects I’ve worked on.',
  education: 'Management Information Systems with a Computer Science minor at UT Austin',
  hometown: 'Dallas, Texas',
  email: 'srikarrkolipaka@gmail.com',
  github: 'https://github.com/SrikarrKoli',
  linkedin: 'https://linkedin.com/in/srikar-kolipaka',
  source: 'https://github.com/SrikarrKoli/About-ME',
  bio: "Hi! My name is Srikar. I’m an MIS student at UT Austin. Product management and AI appeal to me because I like figuring out how new technology can solve meaningful problems. I’m drawn to startups tackling those problems across industries like microelectronics, physical AI, and deep technology.",
  experience: "This past summer, I was a Summer Analyst at Goldman Sachs, exploring how AI can improve internal tools and workflows. Before that, I interned at Wipp as a product management intern. I got a lot of ownership, worked on go-to-market strategy, and owned a feature from end to end. At Texas A&M AgriLife, I created an agent-based model to study cattle growth. I’m also a TA for CS 303: Elements of Programming and Computing.",
  connect: 'If you want to talk about product, AI, or a project you’re working on, I’d love to hear from you.',
  personal: "I like going to the gym and going on walks near the hiking trails around me. I’m from Dallas, and I’m a big Dallas Cowboys and Dallas Mavericks fan. I like competing in university hackathons. I’ve taken part in HackTX in 2025 and 2026, JPMorgan Chase Data for Good, and HackHackGoose 2026.",
  nextTrails: "I’d love to visit Switzerland because the scenery there is insane. New Zealand is on my list too because the black sand beaches look really cool.",
  curiosity: 'I like trying out ideas and seeing whether people find them useful.',
};

export const destinations = {
  about: { label: 'About', title: 'Hi, I’m Srikar.', region: 'UT Austin tower', description: profile.bio, link: '/about', linkText: 'More about me', note: '' },
  projects: { label: 'Projects', title: 'Projects I’ve worked on', region: 'Lakeside workshop', description: 'I’ve worked on a transfer planner, a social AR prototype, a running coach, and a few other projects.', link: '/work', linkText: 'See all projects', note: '' },
  summit: { label: 'Next trails', title: 'Places I’d love to visit', region: 'The overlook', description: profile.nextTrails, link: '/hobbies', linkText: 'More about my travel plans', note: '' },
  contact: { label: 'Contact', title: 'Want to connect?', region: 'Base camp', description: 'Email me if you want to talk about product, AI, or a project you’re working on. You can also find me on LinkedIn.', link: '/contact', linkText: 'Get in touch', note: '' },
} as const;
