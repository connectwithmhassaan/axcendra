# Background polish + agency-level review

## What changes

**1. Calmer base gradient**
The aurora mesh behind everything gets dialed down so it reads as a background, not a feature: lower the three radial gradient opacities roughly in half, and soften the grain overlay. Result: the page feels like a premium SaaS site, content stays the hero.

**2. Faster, more purposeful motion**
Right now shapes drift slowly at random. New behaviour:
- Cycle durations drop from 18-28s to roughly 7-13s, so movement is clearly visible.
- Motion gets direction instead of wandering: shapes travel on a consistent upward-right diagonal ("growth / rising traffic" read), which fits an SEO and marketing agency.
- Two layers of depth: large soft blobs move slowly and blurred far behind; small rings and triangles move fast in the foreground. This parallax reads as intentional rather than busy.
- Slight opacity pulse on the fast shapes so they feel alive without competing with text.
- Respect `prefers-reduced-motion`: motion pauses for users who ask for it.

## My honest read on agency level

Current state is good but sits at "nice template" rather than "agency that charges premium rates". What is missing:

- **No proof.** No case studies, client results, before/after ranking numbers, or testimonials. This is the single biggest gap for an SEO agency: buyers buy evidence.
- **Hero says what you are, not what you fix.** A sharper promise plus one concrete result number would convert far better.
- **No process section.** Audit, strategy, execution, report. Buyers want to know what the engagement looks like.
- **Pricing is vague.** Even ranges or "starting at" builds trust.
- **Contact form does not go anywhere persistent.** For a real lead flow it should store submissions and notify you.
- **Only one visual register.** Every section is a glass card on gradient. Alternating section treatments (dark band, image band, oversized numbers) would make it feel designed rather than generated.

## Suggested next steps after this change

In priority order: case study / results section, process timeline, testimonials, pricing tiers, working contact form with stored leads.

## Technical notes

- `src/styles.css`: reduce alpha in the `bg-aurora` radials and the `bg-grain` opacity.
- `src/components/AnimatedBackground.tsx`: rework the `SHAPES` table with a `layer` field (back/front), shorter durations, diagonal drift vectors, opacity keyframes, and a reduced-motion guard.
- No backend or tracker logic touched.
