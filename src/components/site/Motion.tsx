import { motion, useReducedMotion, useInView } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/** Fade + slide up on scroll into view, with optional stagger index. */
export function Reveal({
  children,
  index = 0,
  className,
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: reduced ? 0 : index * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Counts a number up when it scrolls into view. Keeps any suffix like "x". */
export function StatCounter({ value, duration = 1000 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const [n, setN] = useState(match ? 0 : 0);

  useEffect(() => {
    if (!match) return;
    if (!inView) return;
    if (reduced) {
      setN(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setN(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, target, duration, match]);

  return <span ref={ref}>{match ? `${n}${suffix}` : value}</span>;
}

/** Wrapper that leans its child slightly toward the cursor. */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className ?? ""}`}
      onMouseMove={(e) => {
        if (reduced || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setPos({
          x: ((e.clientX - (r.left + r.width / 2)) / r.width) * 14,
          y: ((e.clientY - (r.top + r.height / 2)) / r.height) * 10,
        });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
    >
      {children}
    </motion.span>
  );
}
