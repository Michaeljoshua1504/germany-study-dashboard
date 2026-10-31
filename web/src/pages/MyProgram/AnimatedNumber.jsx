import { useEffect, useRef, useState } from 'react';

// Counts up to `value` (ease-out) when it appears or changes. Non-numbers
// ("23d", "1h 30m") render as-is. Skips the animation for reduced-motion users.
export default function AnimatedNumber({ value, duration = 700 }) {
  const numeric = typeof value === 'number';
  const [shown, setShown] = useState(0);
  const from = useRef(0);

  useEffect(() => {
    if (!numeric) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = from.current;
    if (reduce || start === value) {
      from.current = value;
      const id = requestAnimationFrame(() => setShown(value));
      return () => cancelAnimationFrame(id);
    }
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - (1 - p) ** 3;
      setShown(Math.round(start + (value - start) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else from.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, numeric, duration]);

  return numeric ? shown : value;
}
