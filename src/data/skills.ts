export type SkillSymbol = 'sparkles' | 'code' | 'layers' | 'network' | 'database' | 'cloud' | 'check' | 'people' | 'terminal' | 'audio' | 'file';
export interface Skill { id: string; name: string; logo?: string; symbol: SkillSymbol; aliases: string[] }
export interface SkillGroup { id: string; label: string; title: string; description: string; symbol: SkillSymbol; skills: Skill[] }

const skill = (name: string, logo?: string, symbol: SkillSymbol = 'code', aliases: string[] = []): Skill => ({
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), name, logo, symbol, aliases,
});
const practice = (name: string, symbol: SkillSymbol, aliases: string[] = []) => skill(name, undefined, symbol, aliases);

// Resume skill set, project technology stacks, and the existing portfolio's applied AI work.
// Historical tools are included without invented proficiency scores or endorsements.
export const skillGroups: SkillGroup[] = [
  { id: 'ai', label: 'AI & tools', title: 'AI, connected to real work.', symbol: 'sparkles',
    description: 'Development assistants, enterprise knowledge, and conversational experiences.', skills: [
      skill('Cursor', 'logos:cursor-icon'), skill('Claude', 'logos:claude-icon', 'sparkles', ['Anthropic', 'Anthropic Claude']),
      skill('GitHub Copilot', 'logos:github-copilot'), skill('Amazon Kiro', 'logos:kiro'),
      skill('Windsurf', 'simple:windsurf'), skill('OpenAI', 'logos:openai-icon'),
      skill('Jev', undefined, 'sparkles'), skill('Ollama', 'simple:ollama'),
      skill('Microsoft Copilot Studio', 'lobe:copilot-color', 'sparkles', ['agents', 'power platform']),
      skill('Amazon Nova Sonic', 'lobe:nova-color', 'audio', ['nova sonic 2', 'voice', 'AWS']),
      skill('Amazon Bedrock', 'lobe:bedrock-color', 'sparkles', ['AWS']),
      skill('Model Context Protocol', 'lobe:mcp', 'network', ['MCP', 'MCP servers', 'custom MCP', 'tool integration']),
      practice('Custom skills', 'sparkles', ['cursor skills', 'reusable AI workflows']), practice('Plugins', 'layers'),
      practice('AI-driven SDLC', 'code', ['AI-assisted workflows', 'AI automation']),
      practice('Retrieval-augmented generation', 'database', ['RAG', 'knowledge retrieval']),
      practice('AI agents', 'sparkles', ['agent behavior']), practice('Conversational AI', 'audio'),
      practice('Voice assistants', 'audio', ['voice AI']), practice('Image understanding', 'sparkles', ['image capture', 'image extraction']),
    ] },
  { id: 'backend', label: 'Languages & backend', title: 'The foundations behind the interface.', symbol: 'code',
    description: 'Languages, application frameworks, and the services that keep systems running.', skills: [
      skill('Java', 'logos:java'), skill('Python', 'logos:python'), skill('TypeScript', 'logos:typescript-icon'),
      skill('JavaScript', 'logos:javascript'), skill('Node.js', 'logos:nodejs-icon', 'code', ['node']),
      skill('Ruby', 'logos:ruby'), skill('Groovy', 'simple:apachegroovy'),
      skill('Spring', 'logos:spring-icon'), skill('Spring Boot', 'simple:springboot'), skill('Hibernate', 'logos:hibernate'),
      skill('MyBatis', undefined, 'database'), skill('iBatis', undefined, 'database'),
      skill('Enterprise JavaBeans', 'logos:java', 'code', ['EJB']), skill('Apache Struts', 'logos:struts'),
      skill('Quartz', undefined, 'terminal', ['scheduler']),
    ] },
  { id: 'web', label: 'Web & applications', title: 'Interfaces people can use.', symbol: 'layers',
    description: 'Responsive web applications, reusable components, and mobile experiences.', skills: [
      skill('React', 'logos:react', 'code', ['react.js', 'reactjs']), skill('AngularJS', 'logos:angular-icon', 'code', ['angular.js']),
      skill('HTML5', 'logos:html-5', 'code', ['HTML']), skill('CSS3', 'logos:css-3', 'code', ['CSS']),
      skill('Sass', 'logos:sass', 'code', ['SASS', 'SCSS']), skill('Bootstrap', 'logos:bootstrap'), skill('jQuery', 'logos:jquery'),
      skill('Kendo UI', undefined, 'layers'), skill('JavaServer Pages', 'logos:java', 'code', ['JSP']),
      skill('Java Swing', 'logos:java', 'layers', ['Swing']), skill('ExtJS', 'logos:sencha', 'layers', ['Ext JS']),
      skill('Dust.js', undefined, 'code', ['dustjs']), skill('Adobe Flex', undefined, 'layers'),
      skill('Android', 'logos:android-icon'), skill('iOS', 'simple:ios'), skill('XML', undefined, 'file'),
      skill('IBIS', undefined, 'code'), skill('Outbrain', undefined, 'layers'),
      skill('Omniture', undefined, 'layers', ['analytics']), skill('Visual Revenue', undefined, 'layers', ['analytics']),
      practice('Responsive application design', 'layers', ['responsive design', 'reusable components']),
    ] },
  { id: 'integration', label: 'Architecture & APIs', title: 'Make the pieces work together.', symbol: 'network',
    description: 'Service architecture, clear API contracts, and dependable enterprise integration.', skills: [
      practice('Microservices', 'network'), practice('Service-oriented architecture', 'network', ['SOA']),
      practice('RESTful APIs', 'network', ['REST', 'REST APIs']), skill('OpenAPI', 'logos:openapi-icon'), skill('RAML', 'logos:raml'),
      skill('Apache Kafka', 'simple:apachekafka'), skill('Apache Camel', undefined, 'network'),
      skill('Java Message Service', 'logos:java', 'network', ['JMS']), skill('ActiveMQ', undefined, 'network'),
      skill('Apache CXF', undefined, 'network', ['CXF']), skill('Apache Axis', undefined, 'network', ['Axis']),
      skill('Apache Axis2', undefined, 'network', ['Axis2']), skill('BlazeDS', undefined, 'network'),
      skill('Salesforce', 'logos:salesforce'), practice('Service bus integration', 'network'),
      practice('System integration', 'network', ['enterprise integration', 'EAI', 'CSI']),
    ] },
  { id: 'data', label: 'Data & knowledge', title: 'Information, with context.', symbol: 'database',
    description: 'Relational stores, graph relationships, and the knowledge behind better decisions.', skills: [
      skill('Neo4j', 'devicon:neo4j'), skill('Cypher', 'devicon:neo4j', 'database', ['Cypher queries']),
      skill('Oracle', 'devicon:oracle'), skill('MySQL', 'logos:mysql-icon'), skill('IBM DB2', 'logos:ibm', 'database', ['DB2']),
      skill('SQL Server', 'devicon:microsoftsqlserver', 'database', ['Microsoft SQL Server']),
      skill('MongoDB', 'logos:mongodb-icon'), skill('Vertica', undefined, 'database'), skill('Redis', 'logos:redis'),
      skill('CouchDB', 'logos:couchdb-icon'), skill('SQLite', 'logos:sqlite'),
      skill('Oracle Stellent', 'devicon:oracle', 'file'), skill('Jasper Reports', undefined, 'file'),
      skill('jBPM', undefined, 'network'), practice('Graph data modeling', 'network', ['knowledge modeling']),
      practice('Dependency analysis', 'network', ['impact analysis']), practice('Contextual retrieval', 'database', ['onboarding', 'enterprise knowledge']),
      practice('SQL & stored procedures', 'database', ['database integration', 'data models']),
    ] },
  { id: 'cloud', label: 'Cloud & platforms', title: 'Built to run in the real world.', symbol: 'cloud',
    description: 'Cloud connectivity, containers, application servers, and operating environments.', skills: [
      skill('AWS', 'logos:aws', 'cloud', ['Amazon Web Services']), skill('Docker', 'logos:docker-icon'),
      skill('Ansible', 'logos:ansible'), skill('Apache Tomcat', 'logos:tomcat'),
      skill('JBoss', undefined, 'cloud'), skill('Nginx', 'logos:nginx'), skill('Linux', 'logos:linux-tux'),
      skill('Unix', 'devicon:unix'), skill('Windows', 'logos:microsoft-windows-icon'), skill('macOS', 'logos:macos'),
      skill('AIX', 'logos:aix'), skill('Solaris', undefined, 'terminal'),
      practice('Deployment & production support', 'cloud', ['operational support', 'troubleshooting']),
    ] },
  { id: 'quality', label: 'Build & quality', title: 'Confidence in every release.', symbol: 'check',
    description: 'Build automation, repeatable tests, and practical release readiness.', skills: [
      skill('Jenkins', 'logos:jenkins'), skill('Git', 'logos:git-icon'), skill('GitHub', 'logos:github-icon'),
      skill('Apache Maven', 'simple:apachemaven', 'terminal', ['Maven']), skill('Apache Ant', 'simple:apacheant', 'terminal', ['Ant']),
      skill('Gulp', 'logos:gulp'), skill('Webpack', 'logos:webpack'), skill('Playwright', 'logos:playwright'),
      skill('JUnit', 'devicon:junit'), skill('TestNG', undefined, 'check'), skill('Cucumber', 'logos:cucumber'),
      practice('Gherkin', 'check'), practice('Build automation', 'terminal'),
      practice('Release readiness', 'check', ['release support', 'defect resolution']),
      practice('User acceptance testing', 'check', ['UAT']), practice('Code reviews', 'check'),
    ] },
  { id: 'delivery', label: 'Delivery & leadership', title: 'People, decisions, and delivery.', symbol: 'people',
    description: 'The practices that turn technical work into a shared, achievable outcome.', skills: [
      practice('Customer discovery', 'people', ['product discovery', 'business value']),
      practice('Requirements analysis', 'file', ['use cases', 'business requirements']),
      practice('Architecture documentation', 'layers', ['technical design', 'solution design']),
      practice('Technical specifications', 'file'), practice('Effort estimation', 'check', ['work breakdowns']),
      practice('Sprint planning', 'check'), practice('Agile methodologies', 'people'),
      practice('Proofs of concept', 'code', ['POC', 'prototypes', 'technical evaluation']),
      practice('Solution proposals', 'file', ['technical tradeoffs', 'solution demonstrations']),
      practice('Stakeholder collaboration', 'people', ['client communication', 'SME', 'product owners']),
      practice('Engineering mentorship', 'people', ['mentoring', 'technical leadership']),
      practice('End-to-end delivery', 'layers', ['prioritization', 'coordination']),
    ] },
];

export const allSkills = skillGroups.flatMap(group => group.skills);
export const skillCount = allSkills.length;
export const featuredSkills = ['React', 'Java', 'Neo4j', 'AWS', 'Claude', 'Python'].map(name => allSkills.find(item => item.name === name)!);
export function filterSkills(category: string, query: string) {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return skillGroups.filter(group => category === 'all' || group.id === category).map(group => ({ ...group,
    skills: group.skills.filter(item => {
      const text = [item.name, ...item.aliases, group.label, group.title].join(' ').toLocaleLowerCase();
      return terms.every(term => text.includes(term));
    }),
  })).filter(group => group.skills.length > 0);
}
