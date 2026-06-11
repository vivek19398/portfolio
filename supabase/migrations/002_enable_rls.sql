-- 002_enable_rls.sql
-- Enable Row Level Security on every table. With RLS on and no policies,
-- all access is denied by default — policies in 003 open exactly what's needed.

alter table public.profile enable row level security;
alter table public.skills enable row level security;
alter table public.projects enable row level security;
alter table public.experience enable row level security;
alter table public.education enable row level security;
alter table public.achievements enable row level security;
alter table public.certifications enable row level security;
alter table public.contact_messages enable row level security;
alter table public.site_analytics_events enable row level security;
