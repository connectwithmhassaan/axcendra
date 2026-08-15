-- Explicit deny for direct API writes to site_content (all writes go through trusted server code)
CREATE POLICY "No direct inserts to site_content" ON public.site_content FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "No direct updates to site_content" ON public.site_content FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "No direct deletes from site_content" ON public.site_content FOR DELETE TO anon, authenticated USING (false);
REVOKE INSERT, UPDATE, DELETE ON public.site_content FROM anon, authenticated;

-- Storage: explicitly deny all direct access to objects in the private site-media bucket
CREATE POLICY "site-media no public read" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id <> 'site-media' AND false);
CREATE POLICY "site-media no public insert" ON storage.objects FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "site-media no public update" ON storage.objects FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "site-media no public delete" ON storage.objects FOR DELETE TO anon, authenticated USING (false);