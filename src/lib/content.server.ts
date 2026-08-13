import { defaultContent, type SiteContent } from "@/content/site";
import { deepMerge } from "@/lib/deep-merge";

const BUCKET = "site-media";
const ROW_ID = "site";

async function admin() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

export async function readSiteContent(): Promise<SiteContent> {
  try {
    const db = await admin();
    const { data } = await db.from("site_content").select("data").eq("id", ROW_ID).maybeSingle();
    return deepMerge(defaultContent, data?.data);
  } catch {
    return defaultContent;
  }
}

export async function writeSiteContent(content: SiteContent) {
  const db = await admin();
  const { error } = await db
    .from("site_content")
    .upsert({ id: ROW_ID, data: content as unknown as never, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
}

export async function storeMedia(input: {
  fileName: string;
  contentType: string;
  base64: string;
}) {
  const db = await admin();
  const safeName = input.fileName.replace(/[^a-zA-Z0-9._-]/g, "-").slice(-80);
  const path = `${Date.now()}-${safeName}`;
  const binary = Uint8Array.from(atob(input.base64), (c) => c.charCodeAt(0));

  const { error } = await db.storage
    .from(BUCKET)
    .upload(path, binary, { contentType: input.contentType, upsert: false });
  if (error) throw new Error(error.message);

  return { url: `/api/public/media/${path}` };
}

export async function readMedia(path: string) {
  const db = await admin();
  const { data, error } = await db.storage.from(BUCKET).download(path);
  if (error || !data) return null;
  return data;
}
