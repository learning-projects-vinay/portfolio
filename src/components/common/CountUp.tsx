'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

// The count runs on mount rather than on scroll. These metrics sit above the fold,
// and a scroll-triggered counter that never receives its trigger would be stuck
// displaying zero — a wrong number is worse than an unanimated one.
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

// "200+" and "50%" count; "2–4" is a range with no single number to animate, so it
// is rendered untouched.
const COUNTABLE = /^(\d+)([^\d]*)$/;

const CountUp = ({ value, duration = 700 }: { value: string; duration?: number }) => {
  const reduceMotion = useReducedMotion();
  const match = COUNTABLE.exec(value);
  const animatable = Boolean(match) && !reduceMotion;

  // Seeded with the final value so the server-rendered HTML — and any visit
  // without JavaScript — carries the real number.
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  // Zeroed before paint, so the final value never flashes ahead of the count.
  useIsomorphicLayoutEffect(() => {
    if (animatable && !started.current) setDisplay(`0${match![2]}`);
  }, [animatable, match]);

  useEffect(() => {
    if (!animatable || started.current) return;
    started.current = true;

    const target = Number(match![1]);
    const suffix = match![2];
    const start = performance.now();
    let frame = requestAnimationFrame(function step(now) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(`${Math.round(target * eased)}${suffix}`);
      if (progress < 1) frame = requestAnimationFrame(step);
    });

    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animatable, duration]);

  return <>{display}</>;
};

export default CountUp;
