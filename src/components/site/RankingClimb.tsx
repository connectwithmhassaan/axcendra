import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Search, TrendingUp } from "lucide-react";

/**
 * Types out a property keyword, then climbs a ranking number from a low
 * position to a top position. Static for reduced motion users.
 */
export function RankingClimb({
  query = "3 bed apartment for sale near the marina",
  from = 47,
  to = 3,
  compact = false,
}: {
  query?: string;
  from?: number;
  to?: number;
  compact?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState(reduced ? query : "");
  const [rank, setRank] = useState(from);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setTyped(query);
      setRank(to);
      return;
    }
    let i = 0;
    const typing = setInterval(() => {
      i += 1;
      setTyped(query.slice(0, i));
      if (i >= query.length) {
        clearInterval(typing);
        const start = performance.now();
        const dur = 1400;
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          setRank(Math.round(from + (to - from) * eased));
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, 38);
    return () => clearInterval(typing);
  }, [inView, reduced, query, from, to]);

  return (
    <div ref={ref} className={`rounded-2xl border border-border bg-card/80 p-4 ${compact ? "" : "sm:p-5"}`}>
      <div className="flex items-center gap-2 rounded-xl border border-border bg-background/70 px-3 py-2">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <span className="truncate text-sm text-foreground">
          {typed}
          {!reduced && typed.length < query.length && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
              className="ml-0.5 inline-block"
            >
              |
            </motion.span>
          )}
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Search position</p>
          <p className="font-display text-4xl leading-none text-foreground">
            <motion.span
              key={rank <= to ? "done" : "climb"}
              className={rank <= to ? "text-success" : "text-foreground"}
            >
              {rank}
            </motion.span>
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1.5 text-xs font-medium text-success">
          <TrendingUp className="h-3.5 w-3.5" />
          {from - to} places
        </div>
      </div>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-brand-gradient"
          initial={{ width: "6%" }}
          animate={{ width: `${Math.max(6, ((from - rank) / Math.max(1, from - to)) * 100)}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
