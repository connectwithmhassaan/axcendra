import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { RotateCcw, Sparkles, CheckCircle2 } from "lucide-react";
import logo from "@/assets/axcendra-logo.png.asset.json";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getPlan } from "@/lib/plan.functions";
import type { Week } from "@/data/plan";
import { useProgress } from "@/hooks/useProgress";
import { CountUp } from "@/components/tracker/CountUp";
import { ProgressBar } from "@/components/tracker/ProgressBar";
import { DayCard } from "@/components/tracker/DayCard";
import { cn } from "@/lib/utils";

const planQuery = queryOptions({ queryKey: ["plan"], queryFn: () => getPlan() });

export const Route = createFileRoute("/tracker")({
  loader: ({ context }) => context.queryClient.ensureQueryData(planQuery),
  head: () => ({
    meta: [
      { title: "30-Day Growth Tracker | Axcendra" },
      {
        name: "description",
        content:
          "An animated 30-day growth tracker for a freelance SEO and real estate copywriting business. Check off daily tasks, watch progress, autosaved on every tap.",
      },
      { property: "og:title", content: "Axcendra 30-Day Growth Tracker" },
      {
        property: "og:description",
        content:
          "Track 30 days of SEO and real estate copywriting growth tasks with animated progress and autosave.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Tracker,
});

function Tracker() {
  const { data } = useSuspenseQuery(planQuery);
  const PLAN = data.weeks;
  const TOTAL_DAYS = data.totalDays;
  const TOTAL_TASKS = data.totalTasks;
  const { done, toggle, reset, savedAt } = useProgress();
  const [week, setWeek] = useState(1);
  const [confirmReset, setConfirmReset] = useState(false);

  const stats = useMemo(() => {
    let tasksDone = 0;
    let daysDone = 0;
    for (const w of PLAN)
      for (const d of w.days) {
        const c = d.tasks.filter((t) => done[t.id]).length;
        tasksDone += c;
        if (c === d.tasks.length) daysDone += 1;
      }
    return { tasksDone, daysDone, pct: (tasksDone / TOTAL_TASKS) * 100 };
  }, [done, PLAN, TOTAL_TASKS]);

  const current = PLAN.find((w) => w.week === week)!;

  return (
    <main className="relative min-h-screen">

      <div className="relative mx-auto w-full max-w-3xl px-4 pb-24 pt-8 sm:px-6">
        <motion.header
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-3xl bg-brand-gradient p-6 text-primary-foreground shadow-lift sm:p-8"
        >
          <div className="flex items-center gap-3">
            <motion.img
              src={logo.url}
              alt="Axcendra logo"
              className="h-11 w-11 rounded-xl bg-primary-foreground/90 p-1"
              initial={{ scale: 0.6, rotate: -12, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.1 }}
            />
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] opacity-80">Axcendra</p>
              <h1 className="font-display text-2xl leading-tight sm:text-3xl">
                30-Day Growth Tracker
              </h1>
            </div>
          </div>

          <p className="mt-3 max-w-lg text-sm opacity-90">
            Freelance SEO &amp; real estate copywriting. One day at a time, every tick saved
            automatically.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Stat label="Days completed" value={stats.daysDone} total={TOTAL_DAYS} />
            <Stat label="Tasks completed" value={stats.tasksDone} total={TOTAL_TASKS} />
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-xs font-medium opacity-90">
              <span>Overall progress</span>
              <span className="tabular-nums">{Math.round(stats.pct)}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-primary-foreground/25">
              <motion.div
                className="h-full rounded-full bg-primary-foreground"
                initial={{ width: 0 }}
                animate={{ width: `${stats.pct}%` }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </motion.header>

        <motion.nav
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-6 flex gap-2 overflow-x-auto rounded-2xl border border-border bg-card p-1.5 shadow-soft"
        >
          {PLAN.map((w) => (
            <button
              key={w.week}
              onClick={() => setWeek(w.week)}
              className={cn(
                "relative flex-1 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                week === w.week ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {week === w.week && (
                <motion.span
                  layoutId="week-pill"
                  className="absolute inset-0 rounded-xl bg-brand-gradient"
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                />
              )}
              <span className="relative">Week {w.week}</span>
            </button>
          ))}
        </motion.nav>

        <AnimatePresence mode="wait">
          <motion.section
            key={week}
            initial={{ opacity: 0, x: 26 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -26 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6"
          >
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h2 className="font-display text-xl text-foreground">{current.title}</h2>
              <span className="text-sm text-muted-foreground">{current.subtitle}</span>
            </div>

            <WeekProgress weeks={PLAN} week={week} done={done} />

            <div className="mt-4 space-y-3">
              {current.days.map((d, i) => (
                <DayCard key={d.day} day={d} done={done} toggle={toggle} index={i} />
              ))}
            </div>
          </motion.section>
        </AnimatePresence>

        <div className="mt-12 flex justify-center">
          {confirmReset ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 text-center shadow-soft"
            >
              <p className="text-sm text-foreground">
                Clear all progress? This cannot be undone.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    reset();
                    setConfirmReset(false);
                  }}
                  className="rounded-xl bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground"
                >
                  Yes, clear it
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          ) : (
            <button
              onClick={() => setConfirmReset(true)}
              className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-destructive"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset progress
            </button>
          )}
        </div>
      </div>

      <SavedToast savedAt={savedAt} />
    </main>
  );
}

function Stat({ label, value, total }: { label: string; value: number; total: number }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-2xl bg-primary-foreground/15 px-4 py-3 backdrop-blur-sm"
    >
      <p className="text-xs opacity-85">{label}</p>
      <p className="font-display text-2xl tabular-nums">
        <CountUp value={value} />
        <span className="text-base opacity-70"> / {total}</span>
      </p>
    </motion.div>
  );
}

function WeekProgress({
  weeks,
  week,
  done,
}: {
  weeks: Week[];
  week: number;
  done: Record<string, boolean>;
}) {
  const w = weeks.find((x) => x.week === week)!;
  const all = w.days.flatMap((d) => d.tasks);
  const c = all.filter((t) => done[t.id]).length;
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
        <span>Week progress</span>
        <span className="tabular-nums">
          {c}/{all.length}
        </span>
      </div>
      <ProgressBar value={(c / all.length) * 100} />
    </div>
  );
}

function SavedToast({ savedAt }: { savedAt: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!savedAt) return;
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 1500);
    return () => clearTimeout(t);
  }, [savedAt]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={savedAt}
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-foreground shadow-lift"
        >
          <CheckCircle2 className="h-4 w-4 text-success" />
          Saved
        </motion.div>
      )}
    </AnimatePresence>
  );
}

