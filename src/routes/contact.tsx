import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Mail, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Axcendra | Start an SEO or Copy Project" },
      {
        name: "description",
        content:
          "Tell Axcendra about your property brand and get a scoped plan for SEO, listing copy or a monthly content retainer.",
      },
      { property: "og:title", content: "Contact Axcendra" },
      {
        property: "og:description",
        content: "Start an SEO or real estate copywriting project with Axcendra.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const mailto = `mailto:hello@axcendra.com?subject=${encodeURIComponent(
    `Project enquiry from ${form.name || "a new client"}`,
  )}&body=${encodeURIComponent(`${form.message}\n\nReply to: ${form.email}`)}`;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-display text-4xl tracking-tight text-foreground sm:text-5xl">
          Let us talk about your <span className="text-brand-gradient">pipeline</span>
        </h1>
        <p className="mt-4 max-w-lg text-muted-foreground">
          Share a little about the brand and the goal. You get a reply with a scoped plan, timeline
          and price within two working days.
        </p>
      </motion.header>

      <div className="mt-10 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <motion.form
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            window.location.href = mailto;
          }}
          className="glass-card rounded-3xl p-7"
        >
          <label className="block text-sm font-medium text-foreground">
            Your name
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-border bg-background/70 px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
              placeholder="Ali Raza"
            />
          </label>

          <label className="mt-5 block text-sm font-medium text-foreground">
            Email
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-border bg-background/70 px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
              placeholder="you@company.com"
            />
          </label>

          <label className="mt-5 block text-sm font-medium text-foreground">
            What do you need
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-2 w-full resize-none rounded-2xl border border-border bg-background/70 px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
              placeholder="We have 40 listings and no organic traffic."
            />
          </label>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-brand-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft"
          >
            {sent ? <CheckCircle2 className="h-4 w-4" /> : <Send className="h-4 w-4" />}
            {sent ? "Opening your mail app" : "Send enquiry"}
          </motion.button>
        </motion.form>

        <motion.aside
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.6 }}
          className="space-y-4"
        >
          <div className="glass-card rounded-3xl p-6">
            <Mail className="h-5 w-5 text-primary" />
            <h2 className="mt-3 font-display text-lg text-foreground">Email</h2>
            <p className="mt-1 text-sm text-muted-foreground">hello@axcendra.com</p>
          </div>
          <div className="glass-card rounded-3xl p-6">
            <MessageCircle className="h-5 w-5 text-success" />
            <h2 className="mt-3 font-display text-lg text-foreground">Response time</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Replies land within two working days, usually sooner.
            </p>
          </div>
        </motion.aside>
      </div>
    </div>
  );
}
