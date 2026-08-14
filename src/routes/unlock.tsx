import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "motion/react";
import { Lock, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { unlockTracker } from "@/lib/gate.functions";

export const Route = createFileRoute("/unlock")({
  validateSearch: (search: Record<string, unknown>): { next?: string } => {
    const raw = search["next"];
    return typeof raw === "string" && raw.startsWith("/") ? { next: raw } : {};
  },
  head: () => ({
    meta: [
      { title: "Private Access | Axcendra" },
      {
        name: "description",
        content: "Password protected access to the private Axcendra growth tracker workspace.",
      },
      { property: "og:title", content: "Private Access | Axcendra" },
      { property: "og:description", content: "Password protected Axcendra workspace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: UnlockPage,
});

function UnlockPage() {
  const router = useRouter();
  const { next } = Route.useSearch();
  const unlock = useServerFn(unlockTracker);
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = String(new FormData(e.currentTarget).get("password") ?? "");
    setBusy(true);
    setError(false);
    const res = await unlock({ data: { password } });
    setBusy(false);
    if (res.ok) {
      await router.navigate({ to: next ?? "/tracker" });
    } else {
      setError(true);
    }
  }

  return (
    <main className="relative flex min-h-[70vh] items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card w-full max-w-sm rounded-3xl p-7"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-gradient text-primary-foreground">
            <Lock className="h-5 w-5" />
          </span>
          <div>
            <h1 className="font-display text-xl text-foreground">Private workspace</h1>
            <p className="text-xs text-muted-foreground">Tracker access is owner only.</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            autoFocus
            placeholder="Enter password"
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-shadow focus:ring-2 focus:ring-primary/40"
          />
          {error && (
            <motion.p
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs text-destructive"
            >
              That password is not correct.
            </motion.p>
          )}
          <button
            type="submit"
            disabled={busy}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gradient px-4 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 disabled:opacity-70"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            Unlock tracker
          </button>
        </form>

        <p className="mt-4 text-center text-[11px] text-muted-foreground">
          Shortcut: press Ctrl + Shift + T anywhere on the site.
        </p>
      </motion.div>
    </main>
  );
}
