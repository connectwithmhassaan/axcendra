import { createServerFn } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";
import { PLAN, TOTAL_DAYS, TOTAL_TASKS } from "@/data/plan";

export const unlockTracker = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => data)
  .handler(async ({ data }) => {
    const { createHash, timingSafeEqual } = await import("node:crypto");
    const expected = process.env["TRACKER_PASSWORD"];
    if (!expected) throw new Error("TRACKER_PASSWORD is not set");
    const a = createHash("sha256").update(data.password ?? "", "utf8").digest();
    const b = createHash("sha256").update(expected, "utf8").digest();
    if (!timingSafeEqual(a, b)) {
      return { ok: false as const };
    }
    const { getGateSession } = await import("@/lib/session.server");
    const session = await getGateSession();
    await session.update({ unlocked: true });
    return { ok: true as const };
  });

export const lockTracker = createServerFn({ method: "POST" }).handler(async () => {
  const { getGateSession } = await import("@/lib/session.server");
  const session = await getGateSession();
  await session.clear();
  return { ok: true as const };
});

export const getTrackerStatus = createServerFn({ method: "GET" }).handler(async () => {
  const { isUnlocked } = await import("@/lib/session.server");
  return { unlocked: await isUnlocked() };
});

export const getTrackerPlan = createServerFn({ method: "GET" }).handler(async () => {
  const { isUnlocked } = await import("@/lib/session.server");
  if (!(await isUnlocked())) throw redirect({ to: "/unlock" });
  return { weeks: PLAN, totalDays: TOTAL_DAYS, totalTasks: TOTAL_TASKS };
});
