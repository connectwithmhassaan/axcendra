import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { useState } from "react";
import type { Day } from "@/data/plan";
import { TAG_CLASS } from "@/data/plan";
import { cn } from "@/lib/utils";

export function DayCard({
  day,
  done,
  toggle,
  index,
}: {
  day: Day;
  done: Record<string, boolean>;
  toggle: (id: string) => void;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const completed = day.tasks.filter((t) => done[t.id]).length;
  const total = day.tasks.length;
  const isDone = completed === total;

  const onToggle = (id: string, e: React.MouseEvent) => {
    const wasDone = !!done[id];
    toggle(id);
    if (!wasDone && completed + 1 === total) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      confetti({
        particleCount: 70,
        spread: 65,
        startVelocity: 32,
        scalar: 0.8,
        colors: ["#7C3AED", "#A855F7", "#C084FC", "#22C55E"],
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
      });
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className={cn(
        "overflow-hidden rounded-2xl border bg-card shadow-soft transition-shadow hover:shadow-lift",
        isDone ? "border-success/40" : "border-border",
      )}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-4 px-5 py-4 text-left"
      >
        <span
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-semibold",
            isDone ? "bg-success text-success-foreground" : "bg-brand-soft text-primary",
          )}
        >
          {isDone ? <Check className="h-5 w-5" /> : day.day}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Day {day.day} &middot; {day.weekday}
          </span>
          <span className="block truncate font-display text-lg text-foreground">{day.title}</span>
        </span>
        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums",
            isDone ? "bg-success/15 text-success" : "bg-muted text-muted-foreground",
          )}
        >
          {completed}/{total}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="space-y-2 border-t border-border px-5 py-4">
              {day.tasks.map((task, i) => {
                const checked = !!done[task.id];
                return (
                  <motion.li
                    key={task.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <button
                      onClick={(e) => onToggle(task.id, e)}
                      className="group flex w-full items-start gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-muted/60"
                    >
                      <motion.span
                        whileTap={{ scale: 0.82 }}
                        className={cn(
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
                          checked
                            ? "border-success bg-success"
                            : "border-border group-hover:border-primary",
                        )}
                      >
                        <AnimatePresence>
                          {checked && (
                            <motion.span
                              initial={{ scale: 0, rotate: -30 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 14 }}
                            >
                              <Check className="h-3.5 w-3.5 text-success-foreground" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.span>
                      <motion.span
                        animate={{ opacity: checked ? 0.5 : 1 }}
                        className={cn(
                          "flex-1 text-sm leading-relaxed text-foreground",
                          checked && "line-through",
                        )}
                      >
                        {task.text}
                      </motion.span>
                      <span
                        className={cn(
                          "shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                          TAG_CLASS[task.tag],
                        )}
                      >
                        {task.tag}
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
