import { motion, type MotionStyle } from "motion/react";

type Shape = {
  kind: "bubble" | "ring" | "triangle" | "blob";
  size: number;
  top: string;
  left: string;
  hue: "violet" | "green" | "mix";
  delay: number;
  duration: number;
  drift: [number, number];
};

const SHAPES: Shape[] = [
  { kind: "bubble", size: 320, top: "-6%", left: "-8%", hue: "violet", delay: 0, duration: 22, drift: [60, 40] },
  { kind: "blob", size: 380, top: "8%", left: "72%", hue: "green", delay: 1.5, duration: 26, drift: [-70, 50] },
  { kind: "ring", size: 180, top: "30%", left: "10%", hue: "mix", delay: 0.8, duration: 18, drift: [40, -60] },
  { kind: "triangle", size: 120, top: "22%", left: "55%", hue: "violet", delay: 2.2, duration: 20, drift: [-40, 60] },
  { kind: "bubble", size: 240, top: "58%", left: "80%", hue: "violet", delay: 1.1, duration: 24, drift: [-50, -45] },
  { kind: "blob", size: 300, top: "70%", left: "-6%", hue: "green", delay: 0.4, duration: 28, drift: [70, -40] },
  { kind: "ring", size: 140, top: "84%", left: "45%", hue: "green", delay: 2.6, duration: 19, drift: [-35, -55] },
  { kind: "triangle", size: 90, top: "48%", left: "35%", hue: "mix", delay: 1.9, duration: 23, drift: [55, 35] },
  { kind: "bubble", size: 160, top: "6%", left: "38%", hue: "green", delay: 3, duration: 21, drift: [30, 70] },
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
  if (s.kind === "bubble") return { ...base, borderRadius: "9999px", filter: "blur(28px)" };
  if (s.kind === "blob")
    return {
      ...base,
      borderRadius: "58% 42% 63% 37% / 44% 56% 44% 56%",
      filter: "blur(34px)",
    };
  if (s.kind === "triangle")
    return {
      ...base,
      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
      filter: "blur(16px)",
      opacity: 0.55,
    };
  return {
    ...base,
    borderRadius: "9999px",
    backgroundImage: "none",
    border: `${Math.round(s.size / 14)}px solid transparent`,
    background: `padding-box linear-gradient(transparent, transparent), border-box ${HUE[s.hue]}`,
    filter: "blur(1px)",
    opacity: 0.5,
  };
}

export function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-aurora" />
      {SHAPES.map((s, i) => (
        <motion.span
          key={i}
          className="absolute block will-change-transform"
          style={shapeStyle(s)}
          animate={{
            x: [0, s.drift[0], 0],
            y: [0, s.drift[1], 0],
            rotate: s.kind === "triangle" || s.kind === "blob" ? [0, 25, 0] : 0,
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-grain" />
    </div>
  );
}
