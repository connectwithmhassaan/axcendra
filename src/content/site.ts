import caseOne from "@/assets/case-study-1.jpg";
import caseTwo from "@/assets/case-study-2.jpg";
import caseThree from "@/assets/case-study-3.jpg";

export type SiteContent = typeof defaultContent;

export const defaultContent = {
  brand: {
    name: "Axcendra",
    navCta: "Start a project",
    footerText: "SEO and real estate copywriting that turns listings into leads.",
  },
  home: {
    badge: "SEO and real estate copywriting studio",
    titleLead: "Property copy that",
    titleHighlight: "ranks, converts",
    titleTail: "and sells faster.",
    subtitle:
      "Axcendra helps agents, brokerages and developers win search results and turn quiet listings into a steady flow of qualified enquiries.",
    primaryCta: "Start a project",
    secondaryCta: "See the services",
    heroImageUrl: "",
    heroVideoUrl: "",
    stats: [
      { value: "30", label: "Day growth system" },
      { value: "4x", label: "Faster listing enquiries" },
      { value: "90", label: "Tasks in the playbook" },
    ],
    servicesTitle: "What Axcendra does",
    servicesSubtitle: "Four services that work together as one growth system for property brands.",
    services: [
      {
        title: "SEO strategy",
        text: "Keyword maps built around real buyer intent in your city, not vanity traffic.",
      },
      {
        title: "Listing copy",
        text: "Property descriptions that make a viewer picture the life, then book the viewing.",
      },
      {
        title: "Website copy",
        text: "Landing pages, service pages and lead magnets written to convert cold traffic.",
      },
      {
        title: "Content engine",
        text: "Monthly articles and social posts that build authority and compound rankings.",
      },
    ],
    ctaTitle: "The 30 day growth tracker",
    ctaText:
      "The same internal system Axcendra runs on, built as a live tracker. Four weeks, thirty days, ninety tasks, with autosave on every tick.",
    ctaButton: "Open the tracker",
  },
  services: {
    title: "Services built for",
    titleHighlight: "property growth",
    subtitle:
      "Pick a single project or run the full system. Everything is scoped upfront so you know exactly what lands and when.",
    packages: [
      {
        name: "SEO audit",
        price: "Starter",
        featured: false,
        text: "A full technical and content review of your property site with a prioritised fix list.",
        points: [
          "50 keyword opportunity map",
          "On page and content gaps",
          "Competitor comparison",
          "Loom walkthrough of findings",
        ],
      },
      {
        name: "Page and listing copy",
        price: "Most popular",
        featured: true,
        text: "Conversion focused copy for the pages that carry your pipeline.",
        points: [
          "Homepage or landing page copy",
          "Up to 10 listing descriptions",
          "Meta titles and descriptions",
          "Two revision rounds",
        ],
      },
      {
        name: "Content retainer",
        price: "Monthly",
        featured: false,
        text: "A steady publishing engine that compounds rankings month after month.",
        points: [
          "Four SEO articles a month",
          "Keyword and brief planning",
          "Internal linking strategy",
          "Monthly performance review",
        ],
      },
    ],
    buttonLabel: "Enquire now",
  },
  caseStudies: {
    eyebrow: "Case studies",
    title: "Results we build toward,",
    titleHighlight: "measured properly",
    subtitle:
      "Every engagement is tracked against search console, map pack position and lead volume, then reviewed with you month by month.",
    notice:
      "Sample data. The studies below use illustrative figures and mockup dashboards to show how Axcendra reports on work. Live client numbers replace them once results are approved for sharing.",
    studies: [
      {
        slug: "organic-seo",
        sector: "Residential brokerage",
        window: "8 month engagement",
        headline: "From invisible to 18,700 monthly organic clicks",
        client: "Regional brokerage, 240 active listings",
        imageUrl: caseOne,
        videoUrl: "",
        imageAlt:
          "Before and after organic traffic dashboard showing monthly clicks rising from 2,300 to 18,700",
        challenge:
          "The site ranked for the brand name and nothing else. Listing pages were thin, duplicated and never indexed properly.",
        work: [
          "Rebuilt the keyword map around buyer intent by neighbourhood",
          "Rewrote 240 listing descriptions with unique, indexable copy",
          "Fixed internal linking and templated meta data",
          "Published 32 area guides mapped to search demand",
        ],
        metrics: [
          { label: "Monthly organic clicks", before: "2,300", after: "18,700", delta: "+713%" },
          { label: "Indexed pages", before: "180", after: "1,940", delta: "+978%" },
          { label: "Top 3 keywords", before: "6", after: "184", delta: "+178" },
          { label: "Organic enquiries", before: "11", after: "146", delta: "+1,227%" },
        ],
        outcome:
          "Organic search became the largest source of viewing requests, ahead of paid portals for the first time.",
      },
      {
        slug: "local-seo",
        sector: "Independent agency",
        window: "5 month engagement",
        headline: "Map pack position 13.6 to 2.1 across nine suburbs",
        client: "Single office agency, three person sales team",
        imageUrl: caseTwo,
        videoUrl: "",
        imageAlt:
          "Before and after local ranking dashboard showing average map pack rank improving from 13.6 to 2.1",
        challenge:
          "The agency was invisible in the map pack outside its own street name, so walk in enquiries dried up.",
        work: [
          "Rebuilt the business profile with service and area categories",
          "Created nine suburb landing pages with local proof",
          "Ran a structured review request programme",
          "Cleaned up citations and duplicate listings",
        ],
        metrics: [
          { label: "Average map rank", before: "13.6", after: "2.1", delta: "11.5 places" },
          { label: "Profile calls", before: "24", after: "268", delta: "+1,016%" },
          { label: "Direction requests", before: "9", after: "141", delta: "+1,466%" },
          { label: "Reviews", before: "12", after: "97", delta: "+85" },
        ],
        outcome:
          "The agency now appears in the top three for every suburb it services, and phone enquiries doubled month on month.",
      },
      {
        slug: "lead-funnel",
        sector: "New build developer",
        window: "6 month engagement",
        headline: "38 to 1,256 qualified leads a month",
        client: "Developer with two active projects",
        imageUrl: caseThree,
        videoUrl: "",
        imageAlt:
          "Before and after lead funnel dashboard showing monthly leads rising from 38 to 1,256",
        challenge:
          "Traffic was arriving but the pages asked for a phone call on the first scroll, so almost nobody converted.",
        work: [
          "Rewrote both project landing pages around buyer objections",
          "Added a floor plan and price guide lead magnet",
          "Built a nurture sequence for early stage buyers",
          "Tested headlines and form placement monthly",
        ],
        metrics: [
          { label: "Monthly leads", before: "38", after: "1,256", delta: "+3,205%" },
          { label: "Conversion rate", before: "0.6%", after: "6.8%", delta: "+6.2 points" },
          { label: "Cost per lead", before: "$74", after: "$9", delta: "-88%" },
          { label: "Booked viewings", before: "14", after: "212", delta: "+1,414%" },
        ],
        outcome:
          "The sales team moved from chasing cold lists to working an inbound pipeline that fills itself every week.",
      },
    ],
    ctaTitle: "Want numbers like these on your site",
    ctaText:
      "Send your domain and we will map the fastest route to more rankings and more qualified enquiries.",
    ctaButton: "Request a growth plan",
  },
  about: {
    title: "About",
    titleHighlight: "Axcendra",
    imageUrl: "",
    videoUrl: "",
    lead:
      "Axcendra is a small studio built around one idea: property brands do not need more content, they need the right words in front of the right buyer at the right moment.",
    body:
      "The work sits where SEO strategy meets sharp real estate copywriting. Keyword research decides what gets written, conversion writing decides how it reads, and a strict 30 day operating cycle keeps everything shipping on time. That cycle is public, and you can walk through it inside the tracker.",
    ctaButton: "View the 30 day system",
    values: [
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
    ],
  },
  contact: {
    title: "Let us talk about your",
    titleHighlight: "pipeline",
    subtitle:
      "Share a little about the brand and the goal. You get a reply with a scoped plan, timeline and price within two working days.",
    email: "hello@axcendra.com",
    responseTitle: "Response time",
    responseText: "Replies land within two working days, usually sooner.",
    submitLabel: "Send enquiry",
  },
};
