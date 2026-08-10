export type TagKind = "Learn" | "Build" | "Content" | "Outreach" | "Review";

export type Task = { id: string; text: string; tag: TagKind };
export type Day = {
  day: number;
  weekday: string;
  title: string;
  tasks: Task[];
};
export type Week = { week: number; title: string; subtitle: string; days: Day[] };

const wd = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function mk(
  day: number,
  title: string,
  tasks: [string, TagKind][],
): Day {
  return {
    day,
    weekday: wd[(day - 1) % 7] as string,
    title,
    tasks: tasks.map(([text, tag], i) => ({ id: `d${day}-t${i}`, text, tag })),
  };
}

export const PLAN: Week[] = [
  {
    week: 1,
    title: "Foundation",
    subtitle: "Positioning, skills and your base assets",
    days: [
      mk(1, "Define your niche", [
        ["Study 3 top real estate copywriters and note their positioning", "Learn"],
        ["Write a one-line positioning statement for Axcendra", "Build"],
        ["List 10 ideal client types (agents, brokerages, developers)", "Build"],
      ]),
      mk(2, "SEO fundamentals refresh", [
        ["Review on-page SEO checklist (title, meta, headings, internal links)", "Learn"],
        ["Audit one real estate site and note 5 SEO gaps", "Review"],
        ["Save the audit as a sample deliverable", "Build"],
      ]),
      mk(3, "Offer and pricing", [
        ["Design 3 packages: audit, page copy, monthly content", "Build"],
        ["Set prices and a minimum project value", "Build"],
        ["Write a short offer one-pager", "Content"],
      ]),
      mk(4, "Portfolio setup", [
        ["Create 2 spec samples: listing description + landing page", "Build"],
        ["Publish portfolio page with the samples", "Build"],
        ["Ask 1 past contact for a testimonial", "Outreach"],
      ]),
      mk(5, "Keyword research skills", [
        ["Learn keyword intent mapping for local real estate terms", "Learn"],
        ["Build a 50-keyword sheet for one target city", "Build"],
        ["Pick 5 money keywords to target in samples", "Review"],
      ]),
      mk(6, "Profiles and presence", [
        ["Optimise LinkedIn headline and about section", "Build"],
        ["Set up or refresh Upwork / Fiverr profile", "Build"],
        ["Write your 3-line cold pitch template", "Outreach"],
      ]),
      mk(7, "Week 1 review", [
        ["Review what shipped vs planned", "Review"],
        ["Note the single biggest bottleneck", "Review"],
        ["Plan Week 2 outreach targets", "Build"],
      ]),
    ],
  },
  {
    week: 2,
    title: "Visibility",
    subtitle: "Content engine and first outreach wave",
    days: [
      mk(8, "Content plan", [
        ["Choose 3 content pillars (SEO, real estate copy, conversions)", "Build"],
        ["Draft 12 post ideas from those pillars", "Content"],
        ["Set a posting schedule you can keep", "Build"],
      ]),
      mk(9, "First authority post", [
        ["Write a 700-word post on SEO mistakes agents make", "Content"],
        ["Publish it and share on LinkedIn", "Content"],
        ["Engage with 10 relevant posts", "Outreach"],
      ]),
      mk(10, "Cold outreach launch", [
        ["Build a list of 25 target agents / agencies", "Outreach"],
        ["Send 10 personalised pitches", "Outreach"],
        ["Log every send in a tracker sheet", "Review"],
      ]),
      mk(11, "Lead magnet", [
        ["Create a free 'Listing SEO checklist' PDF", "Build"],
        ["Add an email capture on your site", "Build"],
        ["Promote it in one post", "Content"],
      ]),
      mk(12, "Case-study format", [
        ["Write a before/after copy teardown of a real listing", "Content"],
        ["Turn it into a carousel or thread", "Content"],
        ["Send it to 5 warm prospects", "Outreach"],
      ]),
      mk(13, "Follow-ups", [
        ["Follow up with everyone from Day 10", "Outreach"],
        ["Send 10 new pitches", "Outreach"],
        ["Refine pitch based on replies", "Review"],
      ]),
      mk(14, "Week 2 review", [
        ["Count pitches sent, replies, calls booked", "Review"],
        ["Note which message got the best response", "Review"],
        ["Double down on that angle next week", "Build"],
      ]),
    ],
  },
  {
    week: 3,
    title: "Conversion",
    subtitle: "Turn conversations into paid work",
    days: [
      mk(15, "Discovery call script", [
        ["Write a 6-question discovery script", "Build"],
        ["Practise it out loud once", "Learn"],
        ["Book or confirm at least 1 call", "Outreach"],
      ]),
      mk(16, "Proposal template", [
        ["Build a reusable proposal with scope, price, timeline", "Build"],
        ["Add a clear next-step and payment terms", "Build"],
        ["Send one live proposal", "Outreach"],
      ]),
      mk(17, "Free mini-audit funnel", [
        ["Record a 3-minute loom audit for a target site", "Content"],
        ["Send it cold with no pitch attached", "Outreach"],
        ["Repeat for 3 more prospects", "Outreach"],
      ]),
      mk(18, "Objection handling", [
        ["List the 5 objections you hear most", "Review"],
        ["Write a one-paragraph answer for each", "Build"],
        ["Add the best two to your pitch", "Build"],
      ]),
      mk(19, "Client delivery system", [
        ["Create an onboarding checklist and intake form", "Build"],
        ["Set up a simple project folder template", "Build"],
        ["Define your revision policy", "Build"],
      ]),
      mk(20, "Second content push", [
        ["Publish a post on how SEO copy sells listings faster", "Content"],
        ["Repurpose it into 3 short posts", "Content"],
        ["DM 10 people who engaged", "Outreach"],
      ]),
      mk(21, "Week 3 review", [
        ["Review proposals sent vs closed", "Review"],
        ["Adjust pricing if close rate is above 50%", "Review"],
        ["Set a revenue target for Week 4", "Build"],
      ]),
    ],
  },
  {
    week: 4,
    title: "Scale",
    subtitle: "Systemise, raise prices, keep the pipeline full",
    days: [
      mk(22, "Deliver excellently", [
        ["Ship current client work a day early", "Build"],
        ["Ask for feedback on delivery", "Review"],
        ["Request a written testimonial", "Outreach"],
      ]),
      mk(23, "Retainer offer", [
        ["Design a monthly SEO content retainer", "Build"],
        ["Pitch it to every past and current client", "Outreach"],
        ["Add it to your offer page", "Content"],
      ]),
      mk(24, "Referral loop", [
        ["Write a short referral ask message", "Build"],
        ["Send it to 10 contacts", "Outreach"],
        ["Offer a clear incentive", "Build"],
      ]),
      mk(25, "Templates and speed", [
        ["Build 3 reusable copy frameworks", "Build"],
        ["Create a swipe file of strong headlines", "Learn"],
        ["Time yourself on one deliverable", "Review"],
      ]),
      mk(26, "Authority asset", [
        ["Write a long-form guide to real estate SEO", "Content"],
        ["Publish and add internal links", "Build"],
        ["Share it in 3 communities", "Outreach"],
      ]),
      mk(27, "Raise your rates", [
        ["Increase package prices by 20% for new clients", "Build"],
        ["Update the offer one-pager", "Content"],
        ["Send the new pricing in 5 pitches", "Outreach"],
      ]),
      mk(28, "Pipeline refill", [
        ["Add 25 new prospects to the list", "Outreach"],
        ["Send 15 pitches with the new angle", "Outreach"],
        ["Schedule follow-ups for next week", "Build"],
      ]),
      mk(29, "Systems audit", [
        ["Document your full client workflow", "Build"],
        ["Automate or template one repeated task", "Build"],
        ["Decide what to outsource first", "Review"],
      ]),
      mk(30, "30-day review", [
        ["Tally revenue, clients and content published", "Review"],
        ["List 3 things that worked and 2 that did not", "Review"],
        ["Write the plan for the next 30 days", "Build"],
      ]),
    ],
  },
];

export const TOTAL_DAYS = PLAN.reduce((a, w) => a + w.days.length, 0);
export const TOTAL_TASKS = PLAN.reduce(
  (a, w) => a + w.days.reduce((b, d) => b + d.tasks.length, 0),
  0,
);

export const TAG_CLASS: Record<TagKind, string> = {
  Learn: "bg-tag-learn text-tag-learn-foreground",
  Build: "bg-tag-build text-tag-build-foreground",
  Content: "bg-tag-content text-tag-content-foreground",
  Outreach: "bg-tag-outreach text-tag-outreach-foreground",
  Review: "bg-tag-review text-tag-review-foreground",
};
