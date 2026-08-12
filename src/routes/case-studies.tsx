import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, TrendingUp, Info } from "lucide-react";
import caseOne from "@/assets/case-study-1.jpg";
import caseTwo from "@/assets/case-study-2.jpg";
import caseThree from "@/assets/case-study-3.jpg";

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

type Metric = { label: string; before: string; after: string; delta: string };

type CaseStudy = {
  slug: string;
  client: string;
  sector: string;
  window: string;
  headline: string;
  challenge: string;
  work: string[];
  metrics: Metric[];
  outcome: string;
  image: string;
  imageAlt: string;
};

const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "organic-growth",
    client: "Regional property portal",
    sector: "Organic SEO",
    window: "12 month engagement",
    headline: "From a flat traffic line to a compounding organic channel",
    challenge:
      "Thin location pages, duplicated listing descriptions and no internal linking left the site invisible for high intent property searches.",
    work: [
      "Full technical audit and crawl budget cleanup",
      "Rebuilt 42 location landing pages with unique copy",
      "Keyword to page mapping across 380 target terms",
      "Monthly publishing plan with internal link paths",
    ],
    metrics: [
      { label: "Organic clicks per month", before: "2,300", after: "18,700", delta: "+712%" },
      { label: "Impressions per month", before: "178,000", after: "562,000", delta: "+215%" },
      { label: "Average CTR", before: "1.29%", after: "3.32%", delta: "+2.03 pts" },
      { label: "Average position", before: "46.7", after: "19.3", delta: "27.4 places" },
    ],
    outcome:
      "Organic became the largest acquisition channel and replaced a paid budget that was spending on the same terms.",
    image: caseOne,
    imageAlt:
      "Before and after search performance dashboard showing organic clicks rising from 2,300 to 18,700 per month",
  },
  {
    slug: "local-visibility",
    client: "Multi location service brand",
    sector: "Local SEO",
    window: "6 month engagement",
    headline: "Top three map pack positions across every core service term",
    challenge:
      "Profiles were incomplete, categories were wrong and the brand sat outside the top ten for every commercial map search in its city.",
    work: [
      "Rebuilt business profiles with correct categories and services",
      "Citation cleanup across 60 directories",
      "Service plus city landing pages with local proof",
      "Review generation flow wired into the booking journey",
    ],
    metrics: [
      { label: "Average map rank", before: "13.6", after: "2.1", delta: "11.5 places" },
      { label: "Top three keywords", before: "0", after: "5", delta: "+5 terms" },
      { label: "Local searches per month", before: "820", after: "1,200", delta: "+45%" },
      { label: "Direction requests", before: "191", after: "320", delta: "+67%" },
    ],
    outcome:
      "Map pack visibility now drives a steady walk in and call volume without any local ad spend.",
    image: caseTwo,
    imageAlt:
      "Before and after local map pack dashboard showing average rank moving from 13.6 to 2.1",
  },
  {
    slug: "lead-conversion",
    client: "Boutique brokerage",
    sector: "Lead generation",
    window: "4 month engagement",
    headline: "A funnel that turns the same traffic into far more qualified leads",
    challenge:
      "Traffic existed but the site had one generic enquiry form, vague copy and no follow up path, so almost nothing converted.",
    work: [
      "Rewrote the homepage and three landing pages around buyer intent",
      "Added a qualification form with progressive fields",
      "Built valuation and viewing request paths with clear next steps",
      "Set up conversion tracking and weekly reporting",
    ],
    metrics: [
      { label: "Monthly visitors", before: "4,129", after: "28,543", delta: "+591%" },
      { label: "Leads per month", before: "38", after: "1,256", delta: "+3,205%" },
      { label: "Conversions", before: "6", after: "328", delta: "+5,367%" },
      { label: "Conversion rate", before: "0.15%", after: "1.15%", delta: "+1.0 pt" },
    ],
    outcome:
      "The sales team moved from chasing cold lists to working an inbound pipeline that fills itself every week.",
    image: caseThree,
    imageAlt:
      "Before and after lead funnel dashboard showing monthly leads rising from 38 to 1,256",
  },
];

function CaseStudiesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Case studies</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
          Results we build toward, <span className="text-brand-gradient">measured properly</span>
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Every engagement is tracked against search console, map pack position and lead volume, then
          reviewed with you month by month.
        </p>
      </motion.header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="glass-card mt-8 flex items-start gap-3 rounded-2xl p-4"
      >
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="text-sm text-muted-foreground">
          Sample data. The studies below use illustrative figures and mockup dashboards to show how
          Axcendra reports on work. Live client numbers replace them once results are approved for
          sharing.
        </p>
      </motion.div>

      <div className="mt-14 space-y-20">
        {CASE_STUDIES.map((study, index) => (
          <motion.article
            key={study.slug}
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
              <img
                src={study.image}
                alt={study.imageAlt}
                loading={index === 0 ? "eager" : "lazy"}
                width={1280}
                height={720}
                className="w-full rounded-2xl"
              />
            </motion.div>

            <div className="mt-8 grid gap-6 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <h3 className="font-display text-lg text-foreground">The challenge</h3>
                <p className="mt-2 text-sm text-muted-foreground">{study.challenge}</p>

                <h3 className="mt-6 font-display text-lg text-foreground">What we did</h3>
                <ul className="mt-2 space-y-2">
                  {study.work.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
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
                      key={metric.label}
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
        <h2 className="font-display text-2xl sm:text-3xl">Want numbers like these on your site</h2>
        <p className="mt-3 max-w-xl text-sm opacity-90">
          Send your domain and we will map the fastest route to more rankings and more qualified
          enquiries.
        </p>
        <Link
          to="/contact"
          className="mt-6 inline-flex rounded-2xl bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary"
        >
          Request a growth plan
        </Link>
      </motion.div>
    </div>
  );
}
