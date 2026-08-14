import { useLoaderData } from "@tanstack/react-router";
import type { SiteContent } from "@/content/site";

export function useSiteContent(): SiteContent {
  return useLoaderData({ from: "__root__" }) as SiteContent;
}
