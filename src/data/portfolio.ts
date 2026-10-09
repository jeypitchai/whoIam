export const profile = {
  name: 'Jeyakrishnan Pitchaikani',
  shortName: 'JK',
  role: 'Senior Solution Engineer',
  aiRole: 'AI Solution Builder',
  organization: 'Relevantz Technology Services',
  location: 'Georgia, USA',
  email: 'jkkanin@gmail.com',
  phone: '+1-470-658-4914',
  linkedin: 'https://www.linkedin.com/in/jeypitch',
  github: 'https://github.com/jeypitchai',
  resume: 'resume/JeyakrishnanPitchaikani_Resume.pdf',
  introduction: 'I connect business problems, software systems, and practical AI. From the first discovery conversation to the last production issue, I enjoy making complex things work together.',
};

export interface Project {
  id: string;
  number: string;
  title: string;
  category: 'Applied AI' | 'Enterprise' | 'Automation';
  stage: string;
  duration?: string;
  description: string;
  contribution: string[];
  technologies: string[];
  visual: 'graph' | 'voice' | 'automation' | 'capture' | 'agent' | 'release' | 'network';
}

export const projects: Project[] = [
  {
    id: 'digital-brain', number: '01', title: 'Digital Brain', category: 'Applied AI',
    stage: 'Discovery & proof of concept', duration: '6 weeks', visual: 'graph',
    description: 'Connecting code, documentation, and subject-matter knowledge into a contextual enterprise knowledge layer.',
    contribution: [
      'Analyzed codebases, documentation, and SME knowledge to identify onboarding, impact-analysis, operations, and audit use cases.',
      'Modeled application relationships and dependencies with Neo4j and Cypher.',
      'Created custom Cursor skills and MCP integrations for persona-specific knowledge retrieval, and supported stakeholder demonstrations.',
    ],
    technologies: ['Neo4j', 'Cypher', 'Cursor skills', 'MCP'],
  },
  {
    id: 'voice-ai', number: '02', title: 'Conversational Voice AI', category: 'Applied AI',
    stage: 'Proof of concept', duration: '10 weeks', visual: 'voice',
    description: 'Voice conversations informed by enterprise knowledge, connected to the workflows behind the conversation.',
    contribution: [
      'Developed conversational voice workflows using Amazon Nova Sonic 2.',
      'Integrated Amazon Bedrock knowledge sources and connected the agent to backend workflows through AWS services.',
      'Supported technical evaluation, solution demonstrations, and proposal preparation.',
    ],
    technologies: ['Nova Sonic 2', 'Amazon Bedrock', 'AWS', 'Voice AI'],
  },
  {
    id: 'ai-playwright', number: '04', title: 'AI Playwright', category: 'Automation',
    stage: 'Team hackathon project', visual: 'automation',
    description: 'An MCP Automation Director exploring how AI can direct browser testing and make engineering workflows more accessible.',
    contribution: [
      'Collaborated on AI-directed browser test automation with Playwright and Model Context Protocol.',
      'Explored connecting natural-language instructions to repeatable browser workflows.',
      'The team received a Judges Award and third place in People’s Choice at the Relevantz 2025 hackathon.',
    ],
    technologies: ['Playwright', 'MCP', 'AI automation'],
  },
  {
    id: 'image-to-record', number: '03', title: 'AI Image Capture and Salesforce Integration', category: 'Applied AI',
    stage: 'Proof of concept', duration: '2 weeks', visual: 'capture',
    description: 'A mobile image-capture workflow that extracts useful information and routes it into Salesforce.',
    contribution: [
      'Developed a proof of concept for mobile image capture and AI-based information extraction.',
      'Integrated extracted information with Salesforce through AWS services and service-bus messaging.',
      'Supported technical evaluation and demonstrations of the proposed workflow.',
    ],
    technologies: ['Image understanding', 'AWS', 'Salesforce', 'Service bus'],
  },
  {
    id: 'knowledge-agents', number: '05', title: 'Knowledge-grounded Agents', category: 'Applied AI',
    stage: 'Product discovery', duration: '4 weeks', visual: 'agent',
    description: 'Exploring conversational agents that answer questions with relevant knowledge and a clear business purpose.',
    contribution: [
      'Analyzed business requirements and identified conversational AI use cases.',
      'Defined agent behavior and knowledge sources for retrieval-augmented responses.',
      'Supported proof-of-concept demonstrations and solution proposals using Microsoft Copilot Studio.',
    ],
    technologies: ['Copilot Studio', 'AI agents', 'RAG'],
  },
  {
    id: 'release-support', number: '06', title: 'Critical Release Support', category: 'Enterprise',
    stage: 'Production development', duration: '6 weeks', visual: 'release',
    description: 'Hands-on React development during the final stage of a critical product release.',
    contribution: [
      'Supported feature completion and defect resolution in the final development stage.',
      'Collaborated with the delivery team to address application issues and release readiness.',
      'Brought practical implementation experience alongside discovery and solution design.',
    ],
    technologies: ['React', 'Release readiness', 'Full-stack engineering'],
  },
  {
    id: 'security-analytics', number: '07', title: 'Enterprise Security Analytics', category: 'Enterprise',
    stage: 'Technical leadership & delivery', visual: 'network',
    description: 'Engineering for network visibility, threat detection, incident investigation, and response.',
    contribution: [
      'Collaborated on requirements, technical design, estimation, and sprint planning.',
      'Developed reusable React components, backend services, and public APIs documented with OpenAPI and RAML.',
      'Created automated scenarios and supported beta deployments, defect resolution, and client-site troubleshooting.',
    ],
    technologies: ['Java', 'Spring Boot', 'React', 'Docker', 'OpenAPI'],
  },
];

const featuredProjectIds = new Set(['digital-brain', 'voice-ai', 'image-to-record']);
export const featuredProjects = projects.filter(project => featuredProjectIds.has(project.id));

export const expertise = [
  { id: 'ai', number: '01', title: 'AI & enterprise integration', icon: 'sparkles', description: 'Make AI useful inside the systems people already use. Connect assistants to enterprise tools, knowledge, and workflows.', tools: ['MCP servers', 'Custom skills & plugins', 'OpenAI', 'Claude', 'Amazon Nova Sonic', 'Copilot Studio'], example: 'Voice assistants, knowledge-grounded agents, and AI-assisted workflows.' },
  { id: 'architecture', number: '02', title: 'Architecture & backend', icon: 'layers', description: 'Design reliable services and the contracts between them, with the implementation and operational reality in view.', tools: ['Java', 'Python', 'Spring Boot', 'REST APIs', 'Microservices', 'SOA', 'Apache Camel', 'Kafka'], example: 'Enterprise integrations, service design, and technical proposals.' },
  { id: 'web', number: '03', title: 'Application engineering', icon: 'code', description: 'Build the interface and the services behind it. Reusable components, clear state, and practical full-stack delivery.', tools: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'HTML & CSS', 'SASS'], example: 'Reusable application components and critical release support.' },
  { id: 'knowledge', number: '04', title: 'Data & knowledge systems', icon: 'network', description: 'Model the relationships that make information useful, from relational data to contextual enterprise knowledge.', tools: ['Neo4j', 'Cypher', 'Oracle', 'MySQL', 'MongoDB', 'Redis', 'RAG'], example: 'Dependency analysis, contextual retrieval, and onboarding.' },
  { id: 'cloud', number: '05', title: 'Cloud & delivery', icon: 'cloud', description: 'Connect applications with cloud services and take solutions through integration, deployment, and production support.', tools: ['AWS', 'Docker', 'Ansible', 'Jenkins', 'Git', 'Linux'], example: 'AWS integrations, containerized delivery, and operational troubleshooting.' },
  { id: 'quality', number: '06', title: 'Quality & AI-driven SDLC', icon: 'check', description: 'Apply automation and AI across requirements, design, coding, testing, documentation, and operational workflows.', tools: ['Playwright', 'MCP', 'JUnit', 'TestNG', 'Cucumber', 'Cursor', 'GitHub Copilot', 'Amazon Kiro'], example: 'Test automation, reusable AI workflows, and engineering enablement.' },
] as const;

export const process = [
  { number: '01', title: 'Discover', text: 'Understand the people, business goals, existing systems, and constraints before proposing a solution.' },
  { number: '02', title: 'Architect', text: 'Shape the system, define its contracts, and explain the decisions and tradeoffs clearly.' },
  { number: '03', title: 'Build & validate', text: 'Get hands-on. Use prototypes, working software, and tests to turn assumptions into evidence.' },
  { number: '04', title: 'Deliver & improve', text: 'Support integration, deployment, and real-world use. Learn from the way the system operates.' },
];

export const experience = [
  { period: 'Jan 2023 — present', role: 'Senior Solution Engineer', organization: 'Relevantz Technology Services Inc', detail: 'Customer discovery, AI-enabled solution proposals, proofs of concept, enterprise integration, and hands-on engineering.' },
  { period: 'Jan 2017 — Dec 2022', role: 'Solution Engineer', organization: 'ObjectFrontier Inc', detail: 'Enterprise application engineering, solution design, and delivery across a long-term networking and security engagement.' },
  { period: 'Jun 2015 — Dec 2016', role: 'Software Programmer', organization: 'ObjectFrontier Inc' },
  { period: 'Nov 2014 — May 2015', role: 'Team Lead', organization: 'Object-Frontier Software Private Limited' },
  { period: 'Jan 2014 — Oct 2014', role: 'Software Programmer', organization: 'ObjectFrontier Inc' },
  { period: 'Apr 2013 — Dec 2013', role: 'Team Lead', organization: 'Object-Frontier Software Private Limited' },
  { period: 'Apr 2011 — Mar 2013', role: 'Senior Software Engineer', organization: 'Object-Frontier Software Private Limited' },
  { period: 'Oct 2009 — Mar 2011', role: 'Software Engineer', organization: 'Object-Frontier Software Private Limited' },
  { period: 'Dec 2007 — Sep 2009', role: 'Jr. Software Engineer', organization: 'Object-Frontier Software Private Limited' },
  { period: 'Jun 2007 — Nov 2007', role: 'Executive Trainee', organization: 'Object-Frontier Software Private Limited' },
];

export const domains = ['Network security', 'Telecommunications', 'Banking & finance', 'Healthcare', 'Media'];
