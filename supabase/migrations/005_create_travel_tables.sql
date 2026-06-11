-- 005_create_travel_tables.sql
-- Travel blog schema. Existing portfolio tables are untouched.

create table if not exists public.travel_destinations (
  id uuid primary key default gen_random_uuid(),
  country text not null,
  city text not null default '',
  region text not null default '',
  title text not null,
  description text not null default '',
  cover_image_url text,
  travel_date date,
  display_order int not null default 0,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.travel_media (
  id uuid primary key default gen_random_uuid(),
  destination_id uuid references public.travel_destinations(id) on delete set null,
  media_type text not null default 'image' check (media_type in ('image', 'video')),
  title text not null default '',
  caption text not null default '',
  storage_path text not null default '',
  thumbnail_url text,
  public_url text not null,
  alt_text text not null default '',
  location_name text not null default '',
  country text not null default '',
  city text not null default '',
  tags text[] not null default '{}',
  display_order int not null default 0,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.travel_stories (
  id uuid primary key default gen_random_uuid(),
  destination_id uuid references public.travel_destinations(id) on delete set null,
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  content text not null default '',
  cover_image_url text,
  tags text[] not null default '{}',
  travel_date date,
  reading_time int not null default 3,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.travel_hacks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null default 'Budget Travel' check (category in (
    'Budget Travel','Visa & Documents','Flights','Hotels','Food',
    'Local Transport','Safety','Packing','Hidden Gems','Itinerary'
  )),
  excerpt text not null default '',
  content text not null default '',
  country text not null default '',
  city text not null default '',
  difficulty_level text not null default 'Easy' check (difficulty_level in ('Easy','Medium','Advanced')),
  estimated_savings text not null default '',
  tags text[] not null default '{}',
  cover_image_url text,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.personal_blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null default 'Personal Stories' check (category in (
    'Life Abroad','Student Life','Career','AI & Data',
    'Travel Reflections','Ireland Life','Personal Stories'
  )),
  excerpt text not null default '',
  content text not null default '',
  cover_image_url text,
  tags text[] not null default '{}',
  reading_time int not null default 4,
  is_featured boolean not null default false,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.travel_highlights (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  cover_image_url text,
  destination_id uuid references public.travel_destinations(id) on delete set null,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Comments: schema ready, UI deferred. Public inserts land unapproved.
create table if not exists public.travel_comments (
  id uuid primary key default gen_random_uuid(),
  post_type text not null check (post_type in ('story','hack','blog','media')),
  post_id uuid not null,
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) <= 200 and position('@' in email) > 1),
  comment text not null check (char_length(comment) between 2 and 2000),
  is_approved boolean not null default false,
  created_at timestamptz not null default now()
);

-- Reuse the shared updated_at trigger from 001.
drop trigger if exists trg_travel_destinations_touch on public.travel_destinations;
create trigger trg_travel_destinations_touch before update on public.travel_destinations
  for each row execute function public.touch_updated_at();

drop trigger if exists trg_travel_stories_touch on public.travel_stories;
create trigger trg_travel_stories_touch before update on public.travel_stories
  for each row execute function public.touch_updated_at();

drop trigger if exists trg_travel_hacks_touch on public.travel_hacks;
create trigger trg_travel_hacks_touch before update on public.travel_hacks
  for each row execute function public.touch_updated_at();

drop trigger if exists trg_personal_blog_posts_touch on public.personal_blog_posts;
create trigger trg_personal_blog_posts_touch before update on public.personal_blog_posts
  for each row execute function public.touch_updated_at();
