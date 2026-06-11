-- 001_create_tables.sql
-- Core schema for the portfolio. Run first.

create extension if not exists "pgcrypto";

-- Single-row table holding the site owner's profile.
create table if not exists public.profile (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  headline text not null default '',
  short_tagline text not null default '',
  location text not null default '',
  email text not null default '',
  linkedin_url text not null default '',
  github_url text not null default '',
  resume_url text not null default '',
  about_text text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  name text not null,
  icon_name text,
  proficiency_level int not null default 70 check (proficiency_level between 0 and 100),
  display_order int not null default 0,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  short_description text not null default '',
  long_description text not null default '',
  tech_stack text[] not null default '{}',
  impact_metrics text[] not null default '{}',
  image_url text,
  github_url text,
  live_url text,
  display_order int not null default 0,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.experience (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  role_title text not null,
  location text not null default '',
  start_date date not null,
  end_date date,
  is_current boolean not null default false,
  description text not null default '',
  achievements text[] not null default '{}',
  tech_stack text[] not null default '{}',
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.education (
  id uuid primary key default gen_random_uuid(),
  institution text not null,
  degree text not null default '',
  field text not null default '',
  location text not null default '',
  start_year int,
  end_year int,
  description text not null default '',
  display_order int not null default 0
);

create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  issuer text not null default '',
  achievement_date date,
  display_order int not null default 0
);

create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text not null default '',
  issue_date date,
  credential_url text,
  display_order int not null default 0
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) <= 200 and position('@' in email) > 1),
  subject text not null check (char_length(subject) between 3 and 200),
  message text not null check (char_length(message) between 10 and 5000),
  source_page text,
  user_agent text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.site_analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null check (char_length(event_type) <= 60),
  page_path text,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

-- Keep updated_at fresh automatically.
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists trg_profile_touch on public.profile;
create trigger trg_profile_touch before update on public.profile
  for each row execute function public.touch_updated_at();

drop trigger if exists trg_projects_touch on public.projects;
create trigger trg_projects_touch before update on public.projects
  for each row execute function public.touch_updated_at();
