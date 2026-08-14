import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import logo from "@/assets/axcendra-logo.png.asset.json";
import { useSiteContent } from "@/hooks/useSiteContent";

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

function AboutPage() {
  const { about } = useSiteContent();

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
          {about.title} <span className="text-brand-gradient">{about.titleHighlight}</span>
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="glass-card mt-10 rounded-3xl p-7 sm:p-9"
      >
        <p className="text-lg leading-relaxed text-foreground">{about.lead}</p>
        <p className="mt-4 leading-relaxed text-muted-foreground">{about.body}</p>

        {about.videoUrl ? (
          <video
            src={about.videoUrl}
            className="mt-6 w-full rounded-2xl"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : about.imageUrl ? (
          <img src={about.imageUrl} alt="Axcendra studio" className="mt-6 w-full rounded-2xl" />
        ) : null}

        <Link
          to="/tracker"
          className="mt-7 inline-flex rounded-2xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          {about.ctaButton}
        </Link>
      </motion.div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {about.values.map((v, i) => (
          <motion.div
            key={`${v.title}-${i}`}
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
