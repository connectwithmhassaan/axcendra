import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "motion/react";
import { Loader2, Save, RotateCcw, ShieldCheck, ExternalLink } from "lucide-react";
import { useState } from "react";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { getAdminContent, saveSiteContent, resetSiteContent } from "@/lib/content.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Content Admin | Axcendra" },
      {
        name: "description",
        content: "Private content editor for updating Axcendra site text, images and videos.",
      },
      { property: "og:title", content: "Content Admin | Axcendra" },
      { property: "og:description", content: "Private Axcendra content editor." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  loader: () => getAdminContent(),
  component: AdminPage,
});

function AdminPage() {
  const initial = Route.useLoaderData();
  const save = useServerFn(saveSiteContent);
  const reset = useServerFn(resetSiteContent);

  const [draft, setDraft] = useState<Record<string, unknown>>(
    initial as unknown as Record<string, unknown>,
  );
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSave() {
    setStatus("saving");
    try {
      const res = await save({ data: { content: draft } });
      setDraft(res.content as unknown as Record<string, unknown>);
      setStatus("saved");
      setMessage("Saved. The live site is updated.");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Could not save");
    }
  }

  async function onReset() {
    if (!window.confirm("Reset every page back to the original content?")) return;
    setStatus("saving");
    try {
      const res = await reset();
      setDraft(res.content as unknown as Record<string, unknown>);
      setStatus("saved");
      setMessage("Content reset to the original version.");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Could not reset");
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6">
      <motion.header
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card sticky top-24 z-30 rounded-3xl p-5 sm:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-gradient text-primary-foreground">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <h1 className="font-display text-xl text-foreground">Content admin</h1>
              <p className="text-xs text-muted-foreground">
                Edit any text, image or video across the public pages.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-foreground"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View site
            </Link>
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-muted-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
            <button
              type="button"
              onClick={onSave}
              disabled={status === "saving"}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft disabled:opacity-70"
            >
              {status === "saving" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save changes
            </button>
          </div>
        </div>

        {message && (
          <p
            className={
              status === "error" ? "mt-3 text-xs text-destructive" : "mt-3 text-xs text-success"
            }
          >
            {message}
          </p>
        )}
      </motion.header>

      <div className="mt-8">
        <ContentEditor value={draft} onChange={setDraft} />
      </div>
    </div>
  );
}
