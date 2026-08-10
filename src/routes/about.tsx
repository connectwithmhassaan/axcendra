import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import logo from "@/assets/axcendra-logo.png.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Axcendra | The Studio Behind the Copy" },
      {
        name: "description",
        content:
          "Axcendra is a freelance studio pairing SEO strategy with real estate copywriting, run on a disciplined 30 day growth system.",
      },
      { property: "og:title", content: "About Axcendra" },
      {
        property: "og:description",
        content:
          "A freelance studio pairing SEO strategy with real estate copywriting, run on a 30 day growth system.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  {
    title: "Search first, always",
    text: "Every sentence is written to answer a real query someone is typing today.",
  },
  {
    title: "Copy that respects the reader",
    text: "No filler, no hype. Just the details a buyer needs to say yes to a viewing.",
  },
  {
    title: "Systems over sprints",
    text: "Work runs on a documented 30 day cycle, so progress is visible and repeatable.",
  },
];

function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4"
      >
        <img src={logo.url} alt="Axcendra logo" className="h-14 w-14" />
        <h1 className="font-display text-4xl tracking-tight text-foreground sm:text-5xl">
          About <span className="text-brand-gradient">Axcendra</span>
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="glass-card mt-10 rounded-3xl p-7 sm:p-9"
      >
        <p className="text-lg leading-relaxed text-foreground">
          Axcendra is a small studio built around one idea: property brands do not need more
          content, they need the right words in front of the right buyer at the right moment.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          The work sits where SEO strategy meets sharp real estate copywriting. Keyword research
          decides what gets written, conversion writing decides how it reads, and a strict 30 day
          operating cycle keeps everything shipping on time. That cycle is public, and you can walk
          through it inside the tracker.
        </p>

        <Link
          to="/tracker"
          className="mt-7 inline-flex rounded-2xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          View the 30 day system
        </Link>
      </motion.div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {VALUES.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.09, duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="glass-card rounded-3xl p-6"
          >
            <h2 className="font-display text-lg text-foreground">{v.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
