# Vivek Ranjan — Dual-Universe Personal Site

A cinematic two-galaxy personal site: visitors land on a cosmic **gateway** (`/`) and choose between the **Work Universe** (`/work` — AI & Data Engineering portfolio) and the **Travel Galaxy** (`/travel` — Instagram-style travel blog, stories, hacks, and personal writing). Powered by **React + TypeScript + Tailwind + Framer Motion** and **Supabase** (PostgreSQL, Auth, Storage, RLS).

> Both universes render fully even **without** Supabase configured (clearly-marked local fallback content). Connect Supabase to make everything database-editable, enable the contact form, admin dashboard, and real travel media.

## Routes

| Route | Experience |
|---|---|
| `/` | Galaxy gateway — choose your universe |
| `/work` | Portfolio (hero, skills, experience, projects, contact) |
| `/travel` | Travel home (highlights, featured trips, gallery preview) |
| `/travel/gallery` | Masonry photo/video gallery with filters + lightbox |
| `/travel/stories`, `/travel/stories/:slug` | Travel stories |
| `/travel/hacks`, `/travel/hacks/:slug` | Searchable travel hacks |
| `/blog`, `/blog/:slug` | Personal blog |
| `/admin` | Admin dashboard (portfolio + travel content) |

---

## Quick start (local)

```bash
npm install
cp .env.example .env        # optional — site works without it
npm run dev                 # http://localhost:5173
```

Production build:

```bash
npm run build               # outputs to dist/
npm run preview             # serve the production build locally
```

---

## 1. Supabase setup

1. Create a free project at [supabase.com](https://supabase.com) (choose a region near your visitors, e.g. `eu-west-1`).
2. Open **SQL Editor** and run the seven migration files **in order**:
   1. `supabase/migrations/001_create_tables.sql` — portfolio schema
   2. `supabase/migrations/002_enable_rls.sql`
   3. `supabase/migrations/003_create_policies.sql`
   4. `supabase/migrations/004_seed_initial_data.sql` — resume seed data
   5. `supabase/migrations/005_create_travel_tables.sql` — travel blog schema
   6. `supabase/migrations/006_travel_rls_policies.sql`
   7. `supabase/migrations/007_travel_storage_buckets.sql` — storage buckets + policies
3. Create the **admin user**: **Authentication → Users → Add user** → enter your email + a strong password → check *Auto confirm user*.
4. **Disable public sign-ups** (critical — the RLS policies treat any authenticated user as admin):
   **Authentication → Sign In / Up → disable "Allow new users to sign up"**.
5. Copy credentials from **Project Settings → API**:
   - Project URL → `VITE_SUPABASE_URL`
   - `anon` `public` key → `VITE_SUPABASE_ANON_KEY`

   ⚠️ Never use the `service_role` key anywhere in this project — it bypasses RLS.

### Travel media workflow

1. **Compress first** (free-tier friendly): images ≤ ~300 KB (e.g. squoosh.app, WebP/AVIF ~1600px wide), thumbnails ≤ ~40 KB (~400px), videos short + H.264 ≤ ~5 MB.
2. Upload via Supabase dashboard → **Storage**: full media to `travel-media`, small previews to `travel-thumbnails`, story/blog covers to `blog-covers`. (Admin uploads via the dashboard are fine; the site never uploads.)
3. Copy each file's **public URL** (file → Get URL).
4. In `/admin` → **Travel Media**, add a row: media type, public URL, thumbnail URL, caption, location, tags, destination ID (copy the uuid from the Destinations list), and mark featured if it should appear on the travel home.
5. Add **Destinations** first, then **Highlights** (story circles), **Stories**, **Hacks**, and **Blog Posts** the same way. Sample placeholder content disappears automatically once real rows exist.

The grid always renders thumbnails; full-size media loads only inside the lightbox, gallery pages load 12 items at a time with infinite scroll, and videos never autoplay.

### Resume file

The resume is served as a static asset at `public/Vivek_Ranjan_Resume.pdf` (already included — zero queries, free, cached by the CDN). To serve it from Supabase Storage instead: create a **public bucket** `assets`, upload the PDF, copy its public URL, and update `resume_url` in the `profile` table via `/admin` or SQL.

---

## 2. Frontend deployment

### Option A — Vercel (recommended)

1. Push this repo to GitHub:
   ```bash
   git init && git add -A && git commit -m "Initial portfolio"
   git remote add origin https://github.com/my-profile/portfolio.git
   git push -u origin main
   ```
2. [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
   Vercel auto-detects Vite: build command `npm run build`, output `dist`.
3. **Environment Variables** (Project → Settings → Environment Variables):
   | Name | Value |
   |---|---|
   | `VITE_SUPABASE_URL` | `https://your-project-ref.supabase.co` |
   | `VITE_SUPABASE_ANON_KEY` | your anon key |
4. Deploy. SPA routing for `/admin` is handled by `vercel.json`.

### Option B — Netlify

Same flow at [netlify.com](https://netlify.com): build command `npm run build`, publish directory `dist`, add the two env vars. SPA routing is handled by `public/_redirects`.

### Option C — Cloudflare Pages

[pages.cloudflare.com](https://pages.cloudflare.com) → connect repo → framework preset **Vite** → add the two env vars (set them for Production *and* Preview). `_redirects` works here too.

> After changing env vars on any platform, **redeploy** — Vite inlines them at build time.

---

## 3. Custom domain + DNS

Using placeholders `mydomain.com` / `hello@mydomain.com` — replace with your real values.

### Connect the domain (Vercel example)

1. Vercel → Project → **Settings → Domains** → add `mydomain.com` and `www.mydomain.com`.
2. At your DNS provider add:

   | Type | Name | Value | Purpose |
   |---|---|---|---|
   | `A` | `@` | `76.76.21.21` | apex → Vercel |
   | `CNAME` | `www` | `cname.vercel-dns.com` | www → Vercel |

   (Netlify: `A @ 75.2.60.5` + `CNAME www your-site.netlify.app`. Cloudflare Pages: `CNAME` both to `your-project.pages.dev`.)
3. Wait for DNS propagation (minutes–48h). Vercel provisions HTTPS automatically.
4. Set `www` → apex redirect (or vice versa) in the Domains panel — pick one canonical form.

### Keep your domain email working

Your domain email (`hello@mydomain.com`) is **independent of the website** — it's controlled by `MX` records. Pointing `A`/`CNAME` records at Vercel does **not** affect email, as long as you don't delete these existing records:

| Type | Name | Keep as-is |
|---|---|---|
| `MX` | `@` | your mail provider's mail servers |
| `TXT` | `@` | SPF record (`v=spf1 …`) |
| `TXT` | `*._domainkey` | DKIM keys |
| `TXT` | `_dmarc` | DMARC policy |

After updating site DNS, send yourself a test email to confirm nothing broke.

### Update placeholders after the domain is live

- `index.html` — canonical/OG URLs
- `public/robots.txt`, `public/sitemap.xml`
- `profile` table (`email`, `linkedin_url`, `github_url`) via `/admin`

---

## 4. Contact form — behavior & testing

**Flow:** validate (length + email format) → sanitize (strips `<>` and control chars) → honeypot check → insert into `contact_messages` via the anon key (allowed by RLS insert policy) → cinematic success state. Database `CHECK` constraints enforce the same limits server-side.

**Email notifications (optional):** messages are *always* stored in Supabase. To also get an email per message, the clean path is a Supabase **Database Webhook** (Database → Webhooks → on `INSERT` into `contact_messages`) pointing at a Supabase Edge Function that calls [Resend](https://resend.com) (free tier: 100 emails/day) or SendGrid. Keep the API key in the Edge Function's secrets — never in the frontend. EmailJS is a frontend-only alternative if you prefer zero backend code.

### Test checklist

1. **Validation:** submit empty form → inline errors; bad email (`foo@bar`) → email error.
2. **Happy path:** valid submission → glowing "Message received" appears; Supabase → Table Editor → `contact_messages` shows the row with `is_read = false`.
3. **Privacy:** in an incognito tab, run in the browser console on your site:
   ```js
   const { data, error } = await window.__sb?.from?.('contact_messages').select('*')
   ```
   — or simpler: confirm in the dashboard that the `anon` role has no select policy. Public reads must return an empty result/error.
4. **Honeypot:** bots that fill the hidden "Company" field get a fake success and nothing is stored.
5. **Admin:** log into `/admin` → Messages tab → the message appears; mark read / delete.
6. **Unconfigured backend:** with no env vars the form shows a graceful "email me directly" error.

---

## 5. Admin dashboard (`/admin`)

1. Visit `https://mydomain.com/admin` → sign in with the Supabase user you created.
2. Tabs: **Messages** (read/unread/delete) and full add/edit/delete for **Projects, Skills, Experience, Education, Achievements, Certifications**.
3. List-type fields (tech stack, achievements, impact metrics) are edited **one item per line**.
4. Content changes are visible to visitors after their 10-minute cache expires (or immediately in a fresh tab).
5. Sign out with the button in the header. `/admin` is excluded from search engines via `robots.txt`.

---

## 6. Security model

- **RLS enabled on all 9 tables**; default-deny, opened only by explicit policies.
- Public role: `SELECT` on content tables, `INSERT`-only on `contact_messages` and `site_analytics_events`. No public read of messages/analytics, no public update/delete anywhere.
- Authenticated role = admin (sign-ups disabled) → full content CRUD.
- Anon key only in the browser; service key never. Env vars via platform settings, `.env` git-ignored.
- Input sanitization client-side **and** Postgres `CHECK` constraints server-side; React escapes output by default. Honeypot anti-spam.

## 7. Performance & SEO

- Below-the-fold sections lazy-loaded (`React.lazy`); vendor/motion/supabase split into separate chunks.
- One batched parallel fetch per visit, cached in `sessionStorage` for 10 min → minimal free-tier usage.
- Canvas particles capped (~70) and disabled-to-static under `prefers-reduced-motion`.
- Semantic HTML, labeled forms, keyboard-focus rings, accessible contrast.
- Meta description, Open Graph + Twitter cards, JSON-LD Person schema, `robots.txt`, `sitemap.xml`, favicon.

## 8. Troubleshooting

| Symptom | Fix |
|---|---|
| Site shows resume data but admin says "Supabase is not configured" | Env vars missing — set both `VITE_*` vars and **rebuild/redeploy** (they're baked in at build time). |
| `new row violates row-level security policy` on contact submit | `003_create_policies.sql` not run, or it ran before `002`. Re-run 002 then 003. |
| Admin login succeeds but every write fails | The "admin write" policies are missing — re-run `003_create_policies.sql`. |
| `/admin` gives 404 in production | SPA rewrite missing — ensure `vercel.json` (Vercel) or `public/_redirects` (Netlify/CF) deployed. |
| Anyone can sign up and edit content | Disable sign-ups: Supabase → Authentication → Sign In / Up. |
| Duplicate seed rows | You ran `004` twice. Truncate affected tables and re-run once: `truncate public.skills, public.projects, public.experience, public.education, public.achievements, public.profile cascade;` |
| Domain email stopped after DNS change | An `MX`/SPF `TXT` record was removed — restore your mail provider's records (section 3). |
| Stale content after editing in admin | 10-min `sessionStorage` cache — hard refresh or wait. |
| Fonts blocked / flash of unstyled text | Google Fonts is render-non-blocking by design; self-host fonts if you prefer (e.g. `@fontsource/cinzel`). |

## Project structure

```
src/
  components/   Navbar, ProjectCard, SkillCard, CursorGlow, AnimatedBackground, Admin*, …
  sections/     Hero, About, Skills, ExperienceTimeline, Projects, Achievements,
                Education, Certifications, ContactForm
  pages/        Home, Admin
  hooks/        usePortfolioData (batched + cached), useAnalytics
  lib/          supabase client, validation/sanitization
  data/         portfolioData.ts — resume-derived fallback + seed source
  types/        database.ts
  styles/       Tailwind entry + cinematic component classes
supabase/migrations/  001–004 SQL files
public/         resume PDF, favicon, robots.txt, sitemap.xml, _redirects
```
