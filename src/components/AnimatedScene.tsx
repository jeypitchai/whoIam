import React, { useRef, type ReactNode } from 'react';
import { useInView } from 'motion/react';

// Artwork stays visible before hydration; entrance motion plays once when in view.
export function AnimatedScene({ className, children }: { className: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const entered = useInView(ref, { once: true, amount: 0.35 });
  return <div ref={ref} className={`${className}${entered ? ' has-entered' : ''}`}>{children}</div>;
}
