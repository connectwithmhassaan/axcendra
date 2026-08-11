import { motion, useReducedMotion, type MotionStyle } from "motion/react";

type Shape = {
  kind: "bubble" | "ring" | "triangle" | "blob";
  size: number;
  top: string;
  left: string;
  hue: "violet" | "green" | "mix";
  layer: "back" | "front";
  delay: number;
  duration: number;
  drift: [number, number];
  label?: string;
};

const SHAPES: Shape[] = [
  { kind: "blob", size: 380, top: "6%", left: "-8%", hue: "violet", layer: "back", delay: 0, duration: 15, drift: [90, -60] },
  { kind: "blob", size: 420, top: "40%", left: "70%", hue: "green", layer: "back", delay: 1.2, duration: 17, drift: [-80, -70] },
  { kind: "bubble", size: 300, top: "72%", left: "12%", hue: "violet", layer: "back", delay: 0.6, duration: 16, drift: [70, -80] },

  { kind: "bubble", size: 150, top: "18%", left: "22%", hue: "violet", layer: "front", delay: 0, duration: 8, drift: [120, -90], label: "SEO" },
  { kind: "ring", size: 120, top: "58%", left: "8%", hue: "green", layer: "front", delay: 0.5, duration: 9, drift: [140, -110], label: "Local SEO" },
  { kind: "bubble", size: 140, top: "80%", left: "48%", hue: "mix", layer: "front", delay: 1.1, duration: 7.5, drift: [110, -130], label: "On Page" },
  { kind: "ring", size: 110, top: "34%", left: "58%", hue: "violet", layer: "front", delay: 0.3, duration: 10, drift: [100, -95], label: "Backlinks" },
  { kind: "triangle", size: 84, top: "66%", left: "76%", hue: "green", layer: "front", delay: 1.6, duration: 8.5, drift: [90, -120], label: "Keywords" },
  { kind: "bubble", size: 132, top: "12%", left: "80%", hue: "green", layer: "front", delay: 0.9, duration: 9.5, drift: [80, -100], label: "Content" },
  { kind: "triangle", size: 76, top: "46%", left: "34%", hue: "mix", layer: "front", delay: 2, duration: 7, drift: [130, -85], label: "Analytics" },
  { kind: "ring", size: 100, top: "88%", left: "88%", hue: "violet", layer: "front", delay: 1.4, duration: 9, drift: [95, -140], label: "Copywriting" },
  { kind: "bubble", size: 118, top: "26%", left: "44%", hue: "violet", layer: "front", delay: 2.4, duration: 8.2, drift: [115, -105], label: "Leads" },
  { kind: "triangle", size: 70, top: "6%", left: "58%", hue: "green", layer: "front", delay: 1.8, duration: 7.8, drift: [105, -90], label: "Rankings" },
];

const HUE: Record<Shape["hue"], string> = {
  violet: "var(--gradient-orb-violet)",
  green: "var(--gradient-orb-green)",
  mix: "var(--gradient-orb-mix)",
};

function shapeStyle(s: Shape): MotionStyle {
  const base: MotionStyle = {
    width: s.size,
    height: s.size,
    top: s.top,
    left: s.left,
    backgroundImage: HUE[s.hue],
  };
  if (s.kind === "bubble")
    return {
      ...base,
      borderRadius: "9999px",
      filter: s.layer === "back" ? "blur(46px)" : "blur(18px)",
      opacity: s.layer === "back" ? 0.5 : 0.4,
    };
  if (s.kind === "blob")
    return {
      ...base,
      borderRadius: "58% 42% 63% 37% / 44% 56% 44% 56%",
      filter: "blur(52px)",
      opacity: 0.45,
    };
  if (s.kind === "triangle")
    return {
      ...base,
      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
      filter: "blur(12px)",
      opacity: 0.3,
    };
  return {
    ...base,
    borderRadius: "9999px",
    backgroundImage: "none",
    border: `${Math.round(s.size / 16)}px solid transparent`,
    background: `padding-box linear-gradient(transparent, transparent), border-box ${HUE[s.hue]}`,
    filter: "blur(1px)",
    opacity: 0.32,
  };
}

export function AnimatedBackground() {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-aurora" />
      {SHAPES.map((s, i) => (
        <motion.span
          key={i}
          className="absolute block will-change-transform"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
          animate={
            reduced
              ? { x: 0, y: 0 }
              : {
                  x: [0, s.drift[0], 0],
                  y: [0, s.drift[1], 0],
                }
          }
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.span
            className="absolute inset-0 block"
            style={shapeStyle({ ...s, top: "0", left: "0" })}
            animate={reduced ? { scale: 1 } : { scale: [1, 1.08, 1], rotate: s.kind === "triangle" ? [0, 18, 0] : 0 }}
            transition={{ duration: s.duration * 0.8, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
          />
          {s.label && (
            <span className="absolute inset-0 grid place-items-center">
              <span className="font-display text-[0.68rem] uppercase tracking-[0.22em] text-foreground/[0.12] sm:text-xs">
                {s.label}
              </span>
            </span>
          )}
        </motion.span>
      ))}
      <div className="absolute inset-0 bg-grain" />
    </div>
  );
}
