import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, TrendingUp, Info } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies | Axcendra SEO and Lead Growth Results" },
      {
        name: "description",
        content:
          "Sample Axcendra case studies showing organic traffic, local map pack and lead generation results with before and after dashboards.",
      },
      { property: "og:title", content: "Case Studies | Axcendra" },
      {
        property: "og:description",
        content:
          "Before and after dashboards, keyword movement and lead volume from Axcendra SEO and copywriting engagements.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://axcendra.lovable.app/case-studies" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://axcendra.lovable.app/case-studies" }],
  }),
  component: CaseStudiesPage,
});

function CaseStudiesPage() {
  const { caseStudies } = useSiteContent();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          {caseStudies.eyebrow}
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
          {caseStudies.title}{" "}
          <span className="text-brand-gradient">{caseStudies.titleHighlight}</span>
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">{caseStudies.subtitle}</p>
      </motion.header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="glass-card mt-8 flex items-start gap-3 rounded-2xl p-4"
      >
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="text-sm text-muted-foreground">{caseStudies.notice}</p>
      </motion.div>

      <div className="mt-14 space-y-20">
        {caseStudies.studies.map((study, index) => (
          <motion.article
            key={`${study.slug}-${index}`}
            id={study.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="scroll-mt-28"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-primary">
                {study.sector}
              </span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                {study.window}
              </span>
            </div>

            <h2 className="mt-4 font-display text-2xl text-foreground sm:text-3xl">
              {study.headline}
            </h2>
            <p className="mt-2 text-sm font-medium text-muted-foreground">{study.client}</p>

            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="glass-card mt-7 overflow-hidden rounded-3xl p-2"
            >
              {study.videoUrl ? (
                <video
                  src={study.videoUrl}
                  className="w-full rounded-2xl"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={study.imageUrl}
                  alt={study.imageAlt}
                  loading={index === 0 ? "eager" : "lazy"}
                  width={1280}
                  height={720}
                  className="w-full rounded-2xl"
                />
              )}
            </motion.div>

            <div className="mt-8 grid gap-6 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <h3 className="font-display text-lg text-foreground">The challenge</h3>
                <p className="mt-2 text-sm text-muted-foreground">{study.challenge}</p>

                <h3 className="mt-6 font-display text-lg text-foreground">What we did</h3>
                <ul className="mt-2 space-y-2">
                  {study.work.map((item, wi) => (
                    <li key={`${item}-${wi}`} className="flex items-start gap-2.5 text-sm text-foreground">
                      <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-3">
                <h3 className="font-display text-lg text-foreground">Before and after</h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {study.metrics.map((metric, i) => (
                    <motion.div
                      key={`${metric.label}-${i}`}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.45 }}
                      className="glass-card rounded-2xl p-4"
                    >
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        {metric.label}
                      </p>
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-sm text-muted-foreground line-through">
                          {metric.before}
                        </span>
                        <span className="text-muted-foreground">to</span>
                        <span className="font-display text-2xl text-foreground">{metric.after}</span>
                      </div>
                      <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                        {metric.delta}
                      </p>
                    </motion.div>
                  ))}
                </div>
                <p className="mt-4 rounded-2xl bg-brand-soft p-4 text-sm text-foreground">
                  {study.outcome}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="mt-20 rounded-3xl bg-brand-gradient p-8 text-primary-foreground shadow-lift sm:p-12"
      >
        <h2 className="font-display text-2xl sm:text-3xl">{caseStudies.ctaTitle}</h2>
        <p className="mt-3 max-w-xl text-sm opacity-90">{caseStudies.ctaText}</p>
        <Link
          to="/contact"
          className="mt-6 inline-flex rounded-2xl bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary"
        >
          {caseStudies.ctaButton}
        </Link>
      </motion.div>
    </div>
  );
}
