import React from 'react';
import { Award, GraduationCap, Trophy } from 'lucide-react';
import { certificates, awards } from '../data/credentials';
import { brandLogoPath } from '../lib/logos';
import { useSite } from './SiteContext';
import { SectionHeading } from './ui';

export function LearningRecognition() {
  const { asset } = useSite();
  return <section id="learning-recognition" className="section light-section grid-texture learning-recognition">
    <div className="container">
      <SectionHeading label="Learning & recognition" title={<>Keep learning.<br />Build together.</>} />

      <div className="academic-foundation" data-reveal>
        <div className="academic-heading"><GraduationCap size={30} strokeWidth={1.4} aria-hidden="true" /><h3>Academic foundation</h3></div>
        <p><strong>Master of Computer Applications</strong><span>Madurai Kamaraj University</span></p>
        <p><strong>Bachelor of Commerce in Computer Application</strong><span>Madurai Kamaraj University</span></p>
      </div>

      <section className="credentials-section" aria-labelledby="certificates-heading">
        <div className="credentials-heading"><div><span className="eyebrow">Curiosity, put into practice</span><h3 id="certificates-heading"><Award size={28} strokeWidth={1.4} aria-hidden="true" />Certificates</h3></div><span className="credentials-count" aria-label="7 certificates">07</span></div>
        <div className="certificate-grid">
          {certificates.map(certificate => <article className="certificate-card" key={certificate.title} data-reveal>
            <div className="certificate-issuer"><span className="issuer-logo" aria-hidden="true"><img src={asset(brandLogoPath(certificate.issuerLogo))} alt="" width="40" height="40" loading="lazy" decoding="async" /></span><span>{certificate.issuer}</span></div>
            <h4>{certificate.title}</h4>
            <time dateTime={certificate.issued}>Issued {certificate.date}</time>
          </article>)}
        </div>
      </section>

      <section className="credentials-section awards-section" aria-labelledby="awards-heading">
        <div className="credentials-heading"><div><span className="eyebrow">Good work, recognized</span><h3 id="awards-heading"><Trophy size={28} strokeWidth={1.4} aria-hidden="true" />Awards & Recognition</h3></div><span className="credentials-count" aria-label="4 awards">04</span></div>
        <div className="award-list">
          {awards.map((award, index) => <article className="award-row" key={award.title} data-reveal>
            <span className="award-mark" aria-hidden="true"><Trophy size={26} strokeWidth={1.3} /><span>0{index + 1}</span></span>
            <div><h4>{award.title}</h4><p>{award.issuer}</p></div>
            <time dateTime={award.issued}>Issued {award.date}</time>
          </article>)}
        </div>
      </section>
    </div>
  </section>;
}
