import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | Axcendra SEO and Real Estate Copywriting" },
      {
        name: "description",
        content:
          "SEO audits, listing descriptions, website copy and monthly content retainers for property brands. Clear scope, clear pricing.",
      },
      { property: "og:title", content: "Services | Axcendra" },
      {
        property: "og:description",
        content:
          "SEO audits, listing copy, website copy and content retainers for agents, brokerages and developers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { services } = useSiteContent();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-display text-4xl tracking-tight text-foreground sm:text-5xl">
          {services.title} <span className="text-brand-gradient">{services.titleHighlight}</span>
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">{services.subtitle}</p>
      </motion.header>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {services.packages.map((p, i) => (
          <motion.div
            key={`${p.name}-${i}`}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.55 }}
            whileHover={{ y: -6 }}
            className={
              p.featured
                ? "rounded-3xl bg-brand-gradient p-7 text-primary-foreground shadow-lift"
                : "glass-card rounded-3xl p-7"
            }
          >
            <p
              className={
                p.featured
                  ? "text-xs font-semibold uppercase tracking-widest opacity-85"
                  : "text-xs font-semibold uppercase tracking-widest text-primary"
              }
            >
              {p.price}
            </p>
            <h2
              className={
                p.featured
                  ? "mt-2 font-display text-2xl"
                  : "mt-2 font-display text-2xl text-foreground"
              }
            >
              {p.name}
            </h2>
            <p className={p.featured ? "mt-3 text-sm opacity-90" : "mt-3 text-sm text-muted-foreground"}>
              {p.text}
            </p>
            <ul className="mt-6 space-y-2.5">
              {p.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2.5 text-sm">
                  <Check
                    className={
                      p.featured ? "mt-0.5 h-4 w-4 shrink-0" : "mt-0.5 h-4 w-4 shrink-0 text-success"
                    }
                  />
                  <span className={p.featured ? "opacity-95" : "text-foreground"}>{pt}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className={
                p.featured
                  ? "mt-7 inline-flex rounded-2xl bg-primary-foreground px-5 py-2.5 text-sm font-semibold text-primary"
                  : "mt-7 inline-flex rounded-2xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              }
            >
              {services.buttonLabel}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
