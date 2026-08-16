import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Sparkles, RefreshCw } from "lucide-react";

/** Flips a plain listing description over to the rewritten Axcendra version. */
export function BeforeAfterCopy({
  before,
  after,
  beforeLabel = "Generic listing copy",
  afterLabel = "Axcendra rewrite",
}: {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [showAfter, setShowAfter] = useState(false);
  const reduced = useReducedMotion();

  return (
    <div className="rounded-2xl border border-gold/40 bg-gold-soft/40 p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.16em] text-gold-accent">
          <Sparkles className="h-3.5 w-3.5" />
          {showAfter ? afterLabel : beforeLabel}
        </span>
        <button
          type="button"
          onClick={() => setShowAfter((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          {showAfter ? "Show before" : "Show after"}
        </button>
      </div>

      <div className="relative mt-3 min-h-28">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={showAfter ? "after" : "before"}
            initial={reduced ? { opacity: 1 } : { opacity: 0, rotateX: -12, y: 10 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, rotateX: 12, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`text-sm leading-relaxed ${showAfter ? "text-foreground" : "text-muted-foreground"}`}
          >
            {showAfter ? after : before}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
