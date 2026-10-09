import React, { useRef } from 'react';
import { ArrowDownRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { process } from '../data/portfolio';
import { SectionHeading } from './ui';

const spring = { stiffness: 100, damping: 30, mass: 0.6 };
const desktopPath = 'M486 180 C486 360 90 320 154 540 S550 720 486 900 S90 1080 154 1260';
const mobilePath = 'M16 160 C36 270 -4 370 16 480 S36 690 16 800 S-4 1010 16 1120';

// Keep text legible throughout the color transition, including its intermediate shades.
function readableInk(background: string) {
  const channels = background.startsWith('#')
    ? background.slice(1).match(/.{2}/g)!.map(channel => parseInt(channel, 16))
    : background.match(/[\d.]+/g)!.slice(0, 3).map(Number);
  const linear = channels.map(channel => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  const luminance = linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
  return luminance > 0.179 ? '#000000' : '#ffffff';
}

function ProcessStep({ item, index }: { item: typeof process[number]; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const reducedMotion = useReducedMotion();
  // Track the stationary row so the card's own movement never feeds back into scrolling.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'end 0.2'] });
  const progress = useSpring(scrollYProgress, spring);
  const stops = [0, 0.38, 0.66, 1];
  const shell = useTransform(progress, stops, ['#faf8f3', '#e95535', '#e95535', '#faf8f3']);
  const panel = useTransform(progress, stops, ['#eeebe4', '#b9341f', '#b9341f', '#eeebe4']);
  const color = useTransform(panel, readableInk);
  const shadow = useTransform(progress, stops, [
    '0px 14px 35px rgba(25,25,22,0.05)', '0px 22px 50px rgba(233,85,53,0.24)',
    '0px 22px 50px rgba(233,85,53,0.24)', '0px 14px 35px rgba(25,25,22,0.05)',
  ]);
  const tilt = index % 2 === 0 ? 5 : -4;
  const rotate = useTransform(progress, [0, 0.45, 1], [tilt - 3, tilt, tilt + 2]);
  const y = useTransform(progress, [0, 0.45, 1], [28, 0, -16]);
  const scale = useTransform(progress, [0, 0.45, 1], [0.96, 1, 0.98]);

  return <li ref={ref} className="process-step" data-process-step={item.number}>
    <motion.div className="process-card" style={reducedMotion ? undefined : {
      backgroundColor: shell, color, boxShadow: shadow, rotate, y, scale,
    }}>
      <span className="process-pin" aria-hidden="true" />
      <motion.div className="process-card-inner" style={reducedMotion ? undefined : { backgroundColor: panel }}>
        <span className="process-number">{item.number}</span>
        <h3>{item.title}</h3><p>{item.text}</p>
      </motion.div>
    </motion.div>
  </li>;
}

export function Process() {
  const journey = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: journey, offset: ['start 0.55', 'end 0.55'] });
  const progress = useSpring(scrollYProgress, spring);
  const clipPath = useTransform(progress, value => `inset(0 0 ${100 - value * 100}% 0)`);

  return <section id="how-i-work" className="section process-section light-section grid-texture" aria-labelledby="process-title">
    <div className="container process-layout">
      <div className="process-heading">
        <SectionHeading label="How I work" title={<span id="process-title">Good systems start<br />with good questions.</span>}>
          Product thinking, hands-on engineering, and a clear path from discovery to delivery.
        </SectionHeading>
        <ArrowDownRight size={72} strokeWidth={1.2} aria-hidden="true" />
      </div>
      <div ref={journey} className="process-journey">
        {(['desktop', 'mobile'] as const).map(layout => <svg key={layout} className={`process-route process-route-${layout}`}
          viewBox={layout === 'desktop' ? '0 0 640 1440' : '0 0 32 1280'} preserveAspectRatio="none" aria-hidden="true">
          <path d={layout === 'desktop' ? desktopPath : mobilePath} className="process-route-base" />
          <motion.g data-process-path style={reducedMotion ? undefined : { clipPath }}>
            <path d={layout === 'desktop' ? desktopPath : mobilePath} className="process-route-progress" />
          </motion.g>
        </svg>)}
        <ol className="process-steps">{process.map((item, index) => <ProcessStep key={item.number} item={item} index={index} />)}</ol>
      </div>
    </div>
  </section>;
}
