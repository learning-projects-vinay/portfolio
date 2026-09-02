'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  style?: React.CSSProperties;
}

const Reveal = ({ children, delay = 0, y = 28, style }: RevealProps) => {
  const reduceMotion = useReducedMotion();

  // Reduced motion removes the reveal rather than shortening it — a shortened
  // fade still leaves every section at `opacity: 0` until it scrolls into view,
  // which is the thing being opted out of.
  //
  // It has to stay the same element in both cases. Returning a plain <div> here
  // instead diverges from what the server prerendered (a motion.div carrying
  // `opacity:0`), and hydration leaves that stale inline style in place — the
  // section then stays invisible forever.
  return (
    <motion.div
      initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
