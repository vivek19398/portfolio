-- 007_travel_storage_buckets.sql
-- Storage: three public-read buckets, admin-only writes.
-- Upload compressed files only; keep within the free-tier limit.
-- The app stores only paths/URLs in the database — never blobs.

insert into storage.buckets (id, name, public)
values
  ('travel-media', 'travel-media', true),
  ('travel-thumbnails', 'travel-thumbnails', true),
  ('blog-covers', 'blog-covers', true)
on conflict (id) do nothing;

-- Public read of the three travel buckets
create policy "public read travel buckets" on storage.objects
  for select to anon, authenticated
  using (bucket_id in ('travel-media', 'travel-thumbnails', 'blog-covers'));

-- Only the authenticated admin uploads / updates / deletes
create policy "admin uploads travel media" on storage.objects
  for insert to authenticated
  with check (bucket_id in ('travel-media', 'travel-thumbnails', 'blog-covers'));

create policy "admin updates travel media" on storage.objects
  for update to authenticated
  using (bucket_id in ('travel-media', 'travel-thumbnails', 'blog-covers'))
  with check (bucket_id in ('travel-media', 'travel-thumbnails', 'blog-covers'));

create policy "admin deletes travel media" on storage.objects
  for delete to authenticated
  using (bucket_id in ('travel-media', 'travel-thumbnails', 'blog-covers'));
