import { createServerFn } from "@tanstack/react-start";
import { PLAN, TOTAL_DAYS, TOTAL_TASKS } from "@/data/plan";

export const getPlan = createServerFn({ method: "GET" }).handler(async () => {
  return { weeks: PLAN, totalDays: TOTAL_DAYS, totalTasks: TOTAL_TASKS };
});
