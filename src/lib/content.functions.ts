import { createServerFn } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";
import { defaultContent, type SiteContent } from "@/content/site";
import { deepMerge } from "@/lib/deep-merge";

export const getSiteContent = createServerFn({ method: "GET" }).handler(async () => {
  const { readSiteContent } = await import("@/lib/content.server");
  return readSiteContent();
});

export const getAdminContent = createServerFn({ method: "GET" }).handler(async () => {
  const { isUnlocked } = await import("@/lib/session.server");
  if (!(await isUnlocked())) throw redirect({ to: "/unlock" });
  const { readSiteContent } = await import("@/lib/content.server");
  return readSiteContent();
});

export const saveSiteContent = createServerFn({ method: "POST" })
  .inputValidator((data: { content: unknown }) => data)
  .handler(async ({ data }) => {
    const { isUnlocked } = await import("@/lib/session.server");
    if (!(await isUnlocked())) throw redirect({ to: "/unlock" });

    const merged = deepMerge(defaultContent, data.content) as SiteContent;
    const { writeSiteContent } = await import("@/lib/content.server");
    await writeSiteContent(merged);
    return { ok: true as const, content: merged };
  });

export const resetSiteContent = createServerFn({ method: "POST" }).handler(async () => {
  const { isUnlocked } = await import("@/lib/session.server");
  if (!(await isUnlocked())) throw redirect({ to: "/unlock" });
  const { writeSiteContent } = await import("@/lib/content.server");
  await writeSiteContent(defaultContent);
  return { ok: true as const, content: defaultContent };
});

export const uploadSiteMedia = createServerFn({ method: "POST" })
  .inputValidator((data: { fileName: string; contentType: string; base64: string }) => {
    if (typeof data.base64 !== "string" || data.base64.length === 0) {
      throw new Error("File is empty");
    }
    if (data.base64.length > 40_000_000) {
      throw new Error("File is too large. Keep uploads under about 25 MB.");
    }
    if (!/^(image|video)\//.test(data.contentType)) {
      throw new Error("Only image or video files are allowed");
    }
    return data;
  })
  .handler(async ({ data }) => {
    const { isUnlocked } = await import("@/lib/session.server");
    if (!(await isUnlocked())) throw redirect({ to: "/unlock" });
    const { storeMedia } = await import("@/lib/content.server");
    return storeMedia(data);
  });
