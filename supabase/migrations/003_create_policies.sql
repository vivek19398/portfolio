-- 003_create_policies.sql
-- Access model:
--   anon (public visitors): read-only on portfolio content,
--     insert-only on contact_messages and site_analytics_events.
--   authenticated (the admin — the only user you create): full CRUD on
--     content tables, read/update/delete on contact_messages.
--   Nobody but the service role bypasses RLS.

-- ── Public read access to portfolio content ─────────────────────────────
create policy "public read profile" on public.profile
  for select to anon, authenticated using (true);

create policy "public read skills" on public.skills
  for select to anon, authenticated using (true);

create policy "public read projects" on public.projects
  for select to anon, authenticated using (true);

create policy "public read experience" on public.experience
  for select to anon, authenticated using (true);

create policy "public read education" on public.education
  for select to anon, authenticated using (true);

create policy "public read achievements" on public.achievements
  for select to anon, authenticated using (true);

create policy "public read certifications" on public.certifications
  for select to anon, authenticated using (true);

-- ── Admin (any authenticated user) full write on content ────────────────
-- Sign-ups are disabled in the Supabase dashboard, so "authenticated"
-- means only the admin account you create manually.
create policy "admin write profile" on public.profile
  for all to authenticated using (true) with check (true);

create policy "admin write skills" on public.skills
  for all to authenticated using (true) with check (true);

create policy "admin write projects" on public.projects
  for all to authenticated using (true) with check (true);

create policy "admin write experience" on public.experience
  for all to authenticated using (true) with check (true);

create policy "admin write education" on public.education
  for all to authenticated using (true) with check (true);

create policy "admin write achievements" on public.achievements
  for all to authenticated using (true) with check (true);

create policy "admin write certifications" on public.certifications
  for all to authenticated using (true) with check (true);

-- ── Contact messages: write-only for the public ─────────────────────────
create policy "anyone can submit a message" on public.contact_messages
  for insert to anon, authenticated with check (true);

create policy "admin reads messages" on public.contact_messages
  for select to authenticated using (true);

create policy "admin updates messages" on public.contact_messages
  for update to authenticated using (true) with check (true);

create policy "admin deletes messages" on public.contact_messages
  for delete to authenticated using (true);

-- ── Analytics: insert-only for the public, read for admin ───────────────
create policy "anyone can log an event" on public.site_analytics_events
  for insert to anon, authenticated with check (true);

create policy "admin reads analytics" on public.site_analytics_events
  for select to authenticated using (true);
