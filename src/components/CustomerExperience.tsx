import React, { type CSSProperties } from 'react';
import { customers, type Customer } from '../data/customers';
import { useSite } from './SiteContext';
import { AnimatedScene } from './AnimatedScene';

function CustomerLogo({ customer }: { customer: Customer }) {
  const { asset } = useSite();
  const [x, y, width, height] = customer.bounds;
  // Percent sizing keeps the crop proportional on narrow screens.
  return <span className="customer-logo" style={{ width: customer.displayWidth, aspectRatio: `${width} / ${height}` }}>
    <img src={asset(`customers/${customer.file}.png`)} alt={customer.name} loading="lazy" decoding="async"
      width={customer.source[0]} height={customer.source[1]}
      className={customer.invert ? 'customer-logo-inverted' : undefined}
      style={{ width: `${customer.source[0] / width * 100}%`, height: `${customer.source[1] / height * 100}%`, left: `${-x / width * 100}%`, top: `${-y / height * 100}%` }} />
  </span>;
}

export function CustomerExperience() {
  return <section className="section customer-experience light-section" aria-labelledby="customers-heading" id="customers">
    <div className="container">
      <div className="customer-heading">
        <div data-reveal>
          <span className="eyebrow"><span className="eyebrow-dot" />Customer experience</span>
          <h2 id="customers-heading">Engineering across<br /><span className="accent-text">great companies.</span></h2>
        </div>
        <div className="customer-introduction" data-reveal>
          <span className="customer-count" aria-hidden="true">12<span>companies</span></span>
          <p>Customers I’ve worked with throughout my engineering journey. Different teams and challenges, with the same care for building useful software.</p>
        </div>
      </div>
      <ul className="customer-grid" aria-label="Customers I have worked with">
        {customers.map((customer, index) => <li key={customer.file} style={{ '--customer-delay': `${index % 4 * 75}ms` } as CSSProperties}>
          <AnimatedScene className="customer-reveal">
            <div className="customer-card">
              <span className="customer-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <div className="customer-mark"><CustomerLogo customer={customer} /></div>
              <span className="customer-name" aria-hidden="true">{customer.name}</span>
            </div>
          </AnimatedScene>
        </li>)}
      </ul>
      <div className="customer-footnote" aria-hidden="true"><span className="customer-line" /><span>Experience, connected.</span><span className="customer-line" /></div>
    </div>
  </section>;
}
