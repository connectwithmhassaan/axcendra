import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Search, Home, PenLine, LineChart } from "lucide-react";
import logo from "@/assets/axcendra-logo.png.asset.json";
import { useSiteContent } from "@/hooks/useSiteContent";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Axcendra | SEO and Real Estate Copywriting Studio" },
      {
        name: "description",
        content:
          "Axcendra writes SEO driven property copy that ranks, converts and sells listings faster. Strategy, copy and content for agents and developers.",
      },
      { property: "og:title", content: "Axcendra | SEO and Real Estate Copywriting" },
      {
        property: "og:description",
        content:
          "SEO driven property copy that ranks, converts and sells listings faster for agents, brokerages and developers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const ICONS = [Search, Home, PenLine, LineChart];

function HomePage() {
  const { home } = useSiteContent();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <section className="relative py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-8 flex w-fit items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-xl"
        >
          <img src={logo.url} alt="" className="h-4 w-4" />
          {home.badge}
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mx-auto max-w-3xl text-center font-display text-4xl leading-[1.08] tracking-tight text-foreground sm:text-6xl"
        >
          {home.titleLead} <span className="text-brand-gradient">{home.titleHighlight}</span>{" "}
          {home.titleTail}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mx-auto mt-6 max-w-xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {home.subtitle}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-2xl bg-brand-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lift transition-transform hover:-translate-y-0.5"
          >
            {home.primaryCta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/services"
            className="rounded-2xl border border-border bg-card/70 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-xl transition-colors hover:bg-card"
          >
            {home.secondaryCta}
          </Link>
        </motion.div>

        {(home.heroVideoUrl || home.heroImageUrl) && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="glass-card mx-auto mt-14 max-w-4xl overflow-hidden rounded-3xl p-2"
          >
            {home.heroVideoUrl ? (
              <video
                src={home.heroVideoUrl}
                className="w-full rounded-2xl"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img
                src={home.heroImageUrl}
                alt="Axcendra work sample"
                className="w-full rounded-2xl"
              />
            )}
          </motion.div>
        )}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={5}
          className="mx-auto mt-16 grid max-w-3xl gap-3 sm:grid-cols-3"
        >
          {home.stats.map((s) => (
            <div key={s.label} className="glass-card rounded-2xl px-4 py-5 text-center">
              <p className="font-display text-3xl text-brand-gradient">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="py-8">
        <h2 className="font-display text-3xl text-foreground">{home.servicesTitle}</h2>
        <p className="mt-2 max-w-lg text-muted-foreground">{home.servicesSubtitle}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {home.services.map((s, i) => {
            const Icon = ICONS[i % ICONS.length]!;
            return (
              <motion.article
                key={`${s.title}-${i}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                custom={i}
                whileHover={{ y: -4 }}
                className="glass-card group rounded-3xl p-6 transition-shadow hover:shadow-lift"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-gradient text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-xl text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-3xl bg-brand-gradient p-8 text-primary-foreground shadow-lift sm:p-12"
        >
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">{home.ctaTitle}</h2>
          <p className="mt-3 max-w-xl text-sm opacity-90 sm:text-base">{home.ctaText}</p>
          <Link
            to="/tracker"
            className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5"
          >
            {home.ctaButton}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
