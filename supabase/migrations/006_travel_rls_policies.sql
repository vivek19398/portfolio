-- 006_travel_rls_policies.sql
-- RLS for travel tables. Same model as the portfolio:
-- public reads content, only the authenticated admin writes.
-- contact_messages and all portfolio tables are unchanged.

alter table public.travel_destinations enable row level security;
alter table public.travel_media enable row level security;
alter table public.travel_stories enable row level security;
alter table public.travel_hacks enable row level security;
alter table public.personal_blog_posts enable row level security;
alter table public.travel_highlights enable row level security;
alter table public.travel_comments enable row level security;

-- ── Public read on travel content ────────────────────────────────────────
create policy "public read travel_destinations" on public.travel_destinations
  for select to anon, authenticated using (true);

create policy "public read travel_media" on public.travel_media
  for select to anon, authenticated using (true);

create policy "public read travel_stories" on public.travel_stories
  for select to anon, authenticated using (true);

create policy "public read travel_hacks" on public.travel_hacks
  for select to anon, authenticated using (true);

create policy "public read personal_blog_posts" on public.personal_blog_posts
  for select to anon, authenticated using (true);

create policy "public read travel_highlights" on public.travel_highlights
  for select to anon, authenticated using (true);

-- ── Admin full write on travel content ───────────────────────────────────
create policy "admin write travel_destinations" on public.travel_destinations
  for all to authenticated using (true) with check (true);

create policy "admin write travel_media" on public.travel_media
  for all to authenticated using (true) with check (true);

create policy "admin write travel_stories" on public.travel_stories
  for all to authenticated using (true) with check (true);

create policy "admin write travel_hacks" on public.travel_hacks
  for all to authenticated using (true) with check (true);

create policy "admin write personal_blog_posts" on public.personal_blog_posts
  for all to authenticated using (true) with check (true);

create policy "admin write travel_highlights" on public.travel_highlights
  for all to authenticated using (true) with check (true);

-- ── Comments: insert-only for public (always unapproved), read approved ──
create policy "anyone can submit a comment" on public.travel_comments
  for insert to anon, authenticated with check (is_approved = false);

create policy "public reads approved comments" on public.travel_comments
  for select to anon using (is_approved = true);

create policy "admin reads all comments" on public.travel_comments
  for select to authenticated using (true);

create policy "admin moderates comments" on public.travel_comments
  for update to authenticated using (true) with check (true);

create policy "admin deletes comments" on public.travel_comments
  for delete to authenticated using (true);
