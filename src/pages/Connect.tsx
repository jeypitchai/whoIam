import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Mail, Phone, Linkedin, Github } from 'lucide-react';
import { profile } from '../data/portfolio';
import { ResumeLink, Star } from '../components/ui';

export function Connect() {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopyStatus('copied'); }
    catch { setCopyStatus('failed'); }
  };
  return <>
    <section className="connect-hero"><div className="container"><span className="eyebrow">The next good idea starts with a conversation</span><h1>Let’s<br /><span>connect.</span></h1><div className="connect-intro"><Star /><p>Have a complex problem worth solving? I enjoy conversations about enterprise architecture, applied AI, knowledge systems, and building software people can use.</p><span>{profile.role}<br />{profile.organization}<br />{profile.location}</span></div></div></section>
    <section className="section connect-options accent-section"><div className="container"><div className="contact-main"><div><span className="eyebrow">Reach me directly</span><h2>Say hello.</h2><a className="email-address" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight aria-hidden="true" /></a><div className="copy-email-row"><button className="copy-email" onClick={copyEmail}>{copyStatus === 'copied' ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}{copyStatus === 'copied' ? 'Email copied' : 'Copy email'}</button><span className="copy-status" role="status">{copyStatus === 'failed' ? 'Copy unavailable. You can select the email address above.' : copyStatus === 'copied' ? 'Copied to clipboard.' : ''}</span></div></div><div className="contact-links"><a href={`mailto:${profile.email}`}><Mail size={22} strokeWidth={1.5} aria-hidden="true" /><div><strong>Email</strong><span>Start a direct conversation</span></div><ArrowUpRight size={23} aria-hidden="true" /></a><a href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`}><Phone size={22} strokeWidth={1.5} aria-hidden="true" /><div><strong>Phone</strong><span>{profile.phone}</span></div><ArrowUpRight size={23} aria-hidden="true" /></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={22} strokeWidth={1.5} aria-hidden="true" /><div><strong>LinkedIn</strong><span>Connect professionally</span></div><ArrowUpRight size={23} aria-hidden="true" /></a><a href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={22} strokeWidth={1.5} aria-hidden="true" /><div><strong>GitHub</strong><span>Explore my repositories</span></div><ArrowUpRight size={23} aria-hidden="true" /></a></div></div></div></section>
    <section className="section connect-resume light-section"><div className="container"><div><span className="eyebrow">The full picture</span><h2>Experience, in detail.</h2><p>My background, technical skills, and project experience in one document.</p></div><ResumeLink variant="dark" /></div></section>
  </>;
}
