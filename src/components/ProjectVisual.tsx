import React from 'react';
import { Braces, Check, ScanLine, AudioLines, Workflow, Network, Code2, FileText, Database, Users, ArrowRight } from 'lucide-react';
import type { Project } from '../data/portfolio';
import { useSite } from './SiteContext';
import { AnimatedScene } from './AnimatedScene';

const graphNodes = [{ Icon: Code2, label: 'CODE' }, { Icon: Database, label: 'DATA' }, { Icon: FileText, label: 'DOCS' }, { Icon: Users, label: 'PEOPLE' }];

export function ProjectVisual({ type }: { type: Project['visual'] }) {
  const { asset } = useSite();
  if (type === 'graph') return <div className="project-visual visual-graph" aria-hidden="true">
    <span className="visual-label">CONTEXT → CONNECTION</span>
    <AnimatedScene className="knowledge-scene">
      <div className="knowledge-map">
        <svg className="knowledge-links" viewBox="0 0 400 240" fill="none"><g stroke="currentColor" strokeWidth="1.2" opacity=".3"><path d="M70 55Q145 55 200 120M70 185Q145 185 200 120M330 55Q255 55 200 120M330 185Q255 185 200 120" /><path d="M70 55V185M330 55V185" strokeDasharray="3 7" /></g><g className="knowledge-flow" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 140"><path d="M70 55Q145 55 200 120M70 185Q145 185 200 120M330 55Q255 55 200 120M330 185Q255 185 200 120" /></g></svg>
        <div className="knowledge-hub"><img src={asset('skills/logos/devicon-neo4j.svg')} alt="" width="46" height="46" /><span>Neo4j</span></div>
        {graphNodes.map(({ Icon, label }, index) => <div className={`knowledge-node node-${index}`} key={label}><Icon size={20} strokeWidth={1.4} /><span>{label}</span></div>)}
      </div>
      <span className="knowledge-caption">An enterprise knowledge graph</span>
    </AnimatedScene>
  </div>;
  if (type === 'network') return <div className="project-visual visual-network" aria-hidden="true">
    <span className="visual-label">VISIBILITY → INSIGHT</span>
    <svg viewBox="0 0 460 260"><g stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M230 130 85 62M230 130 85 203M230 130 375 62M230 130 375 203M85 62 85 203M375 62 375 203M85 62 375 62M85 203 375 203" /></g><g fill="var(--visual-node)" stroke="currentColor"><circle cx="230" cy="130" r="38" /><circle cx="85" cy="62" r="23" /><circle cx="85" cy="203" r="23" /><circle cx="375" cy="62" r="23" /><circle cx="375" cy="203" r="23" /></g><g fill="currentColor" fontFamily="monospace" textAnchor="middle" fontSize="11"><text x="230" y="134">SYSTEM</text><text x="85" y="66">CODE</text><text x="85" y="207">DATA</text><text x="375" y="66">API</text><text x="375" y="207">PEOPLE</text></g></svg>
  </div>;
  if (type === 'voice') return <div className="project-visual visual-voice" aria-hidden="true"><span className="visual-label">VOICE → KNOWLEDGE → ACTION</span><div className="waveform">{[18,30,48,34,70,102,74,43,89,130,90,54,80,102,57,33,67,86,45,25,40,18].map((height, index) => <span key={index} style={{ height: `${height}px`, animationDelay: `${index * 70}ms` }} />)}</div><div className="visual-bottom"><AudioLines size={18} /><span>Conversational systems</span><span className="signal-dot" /></div></div>;
  if (type === 'capture') return <div className="project-visual visual-capture" aria-hidden="true"><span className="visual-label">IMAGE → INSIGHT → SALESFORCE</span>
    <AnimatedScene className="capture-scene"><div className="capture-frame"><ScanLine size={34} strokeWidth={1.2} /><span className="capture-scan" /><span className="capture-field" /><span className="capture-field short" /></div>
      <div className="capture-route"><span>Capture</span><ArrowRight size={16} /><div className="capture-brand"><img src={asset('skills/logos/logos-aws.svg')} alt="" width="42" height="28" /><span>AWS / service bus</span></div><ArrowRight size={16} /><div className="capture-brand"><img src={asset('skills/logos/logos-salesforce.svg')} alt="" width="65" height="45" /><span>Salesforce</span></div></div>
    </AnimatedScene>
  </div>;
  const Icon = type === 'automation' ? Braces : type === 'agent' ? Workflow : Network;
  const labels = { automation: ['INSTRUCT', 'EXECUTE', 'VERIFY'], agent: ['QUESTION', 'RETRIEVE', 'RESPOND'], release: ['BUILD', 'TEST', 'RELEASE'] };
  const steps = labels[type as keyof typeof labels];
  return <div className={`project-visual visual-${type}`} aria-hidden="true"><span className="visual-label">{type === 'automation' ? 'INTENT → AUTOMATION' : 'IDEA → WORKING SOFTWARE'}</span><div className="visual-symbol"><Icon size={66} strokeWidth={1} /></div><div className="visual-steps">{steps.map((step, i) => <React.Fragment key={step}><span>{i === 2 && <Check size={12} />}{step}</span>{i < 2 && <i />}</React.Fragment>)}</div></div>;
}
