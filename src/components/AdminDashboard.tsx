import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { ContactMessage } from '../types/database'

type FieldType = 'text' | 'textarea' | 'number' | 'boolean' | 'lines' | 'date'

interface FieldDef {
  key: string
  label: string
  type: FieldType
  required?: boolean
}

interface EntityDef {
  table: string
  label: string
  titleKey: string
  fields: FieldDef[]
  /** Sort column for the list view (defaults to display_order). */
  orderBy?: string
}

/**
 * `lines` fields are edited one-item-per-line and stored as text[] in Postgres.
 */
const ENTITIES: EntityDef[] = [
  {
    table: 'projects',
    label: 'Projects',
    titleKey: 'title',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'slug', label: 'Slug', type: 'text', required: true },
      { key: 'short_description', label: 'Short description', type: 'textarea' },
      { key: 'long_description', label: 'Long description', type: 'textarea' },
      { key: 'tech_stack', label: 'Tech stack (one per line)', type: 'lines' },
      { key: 'impact_metrics', label: 'Impact metrics (one per line)', type: 'lines' },
      { key: 'image_url', label: 'Image URL', type: 'text' },
      { key: 'github_url', label: 'GitHub URL', type: 'text' },
      { key: 'live_url', label: 'Live URL', type: 'text' },
      { key: 'display_order', label: 'Display order', type: 'number' },
      { key: 'is_featured', label: 'Featured', type: 'boolean' },
    ],
  },
  {
    table: 'skills',
    label: 'Skills',
    titleKey: 'name',
    fields: [
      { key: 'category', label: 'Category', type: 'text', required: true },
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'icon_name', label: 'Icon name', type: 'text' },
      { key: 'proficiency_level', label: 'Proficiency (0–100)', type: 'number' },
      { key: 'display_order', label: 'Display order', type: 'number' },
      { key: 'is_featured', label: 'Featured', type: 'boolean' },
    ],
  },
  {
    table: 'experience',
    label: 'Experience',
    titleKey: 'company_name',
    fields: [
      { key: 'company_name', label: 'Company', type: 'text', required: true },
      { key: 'role_title', label: 'Role title', type: 'text', required: true },
      { key: 'location', label: 'Location', type: 'text' },
      { key: 'start_date', label: 'Start date', type: 'date' },
      { key: 'end_date', label: 'End date', type: 'date' },
      { key: 'is_current', label: 'Current role', type: 'boolean' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'achievements', label: 'Achievements (one per line)', type: 'lines' },
      { key: 'tech_stack', label: 'Tech stack (one per line)', type: 'lines' },
      { key: 'display_order', label: 'Display order', type: 'number' },
    ],
  },
  {
    table: 'education',
    label: 'Education',
    titleKey: 'institution',
    fields: [
      { key: 'institution', label: 'Institution', type: 'text', required: true },
      { key: 'degree', label: 'Degree', type: 'text' },
      { key: 'field', label: 'Field', type: 'text' },
      { key: 'location', label: 'Location', type: 'text' },
      { key: 'start_year', label: 'Start year', type: 'number' },
      { key: 'end_year', label: 'End year', type: 'number' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'display_order', label: 'Display order', type: 'number' },
    ],
  },
  {
    table: 'achievements',
    label: 'Achievements',
    titleKey: 'title',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'issuer', label: 'Issuer', type: 'text' },
      { key: 'achievement_date', label: 'Date', type: 'date' },
      { key: 'display_order', label: 'Display order', type: 'number' },
    ],
  },
  {
    table: 'certifications',
    label: 'Certifications',
    titleKey: 'title',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'issuer', label: 'Issuer', type: 'text' },
      { key: 'issue_date', label: 'Issue date', type: 'date' },
      { key: 'credential_url', label: 'Credential URL', type: 'text' },
      { key: 'display_order', label: 'Display order', type: 'number' },
    ],
  },
  // ── Travel Galaxy content ──────────────────────────────────────────────
  {
    table: 'travel_destinations',
    label: 'Destinations',
    titleKey: 'title',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'country', label: 'Country', type: 'text', required: true },
      { key: 'city', label: 'City', type: 'text' },
      { key: 'region', label: 'Region', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'cover_image_url', label: 'Cover image URL (Supabase Storage)', type: 'text' },
      { key: 'travel_date', label: 'Travel date', type: 'date' },
      { key: 'display_order', label: 'Display order', type: 'number' },
      { key: 'is_featured', label: 'Featured', type: 'boolean' },
    ],
  },
  {
    table: 'travel_media',
    label: 'Travel Media',
    titleKey: 'title',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'media_type', label: 'Media type (image | video)', type: 'text', required: true },
      { key: 'public_url', label: 'Public URL (travel-media bucket)', type: 'text', required: true },
      { key: 'thumbnail_url', label: 'Thumbnail URL (travel-thumbnails bucket)', type: 'text' },
      { key: 'storage_path', label: 'Storage path', type: 'text' },
      { key: 'caption', label: 'Caption', type: 'textarea' },
      { key: 'alt_text', label: 'Alt text', type: 'text' },
      { key: 'destination_id', label: 'Destination ID (uuid, optional)', type: 'text' },
      { key: 'location_name', label: 'Location name', type: 'text' },
      { key: 'country', label: 'Country', type: 'text' },
      { key: 'city', label: 'City', type: 'text' },
      { key: 'tags', label: 'Tags (one per line)', type: 'lines' },
      { key: 'display_order', label: 'Display order', type: 'number' },
      { key: 'is_featured', label: 'Featured', type: 'boolean' },
    ],
  },
  {
    table: 'travel_stories',
    label: 'Travel Stories',
    titleKey: 'title',
    orderBy: 'created_at',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'slug', label: 'Slug', type: 'text', required: true },
      { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
      { key: 'content', label: 'Content (blank line = new paragraph)', type: 'textarea' },
      { key: 'cover_image_url', label: 'Cover image URL (blog-covers bucket)', type: 'text' },
      { key: 'destination_id', label: 'Destination ID (uuid, optional)', type: 'text' },
      { key: 'tags', label: 'Tags (one per line)', type: 'lines' },
      { key: 'travel_date', label: 'Travel date', type: 'date' },
      { key: 'reading_time', label: 'Reading time (min)', type: 'number' },
      { key: 'is_featured', label: 'Featured', type: 'boolean' },
    ],
  },
  {
    table: 'travel_hacks',
    label: 'Travel Hacks',
    titleKey: 'title',
    orderBy: 'created_at',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'slug', label: 'Slug', type: 'text', required: true },
      { key: 'category', label: 'Category (e.g. Budget Travel, Flights)', type: 'text', required: true },
      { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
      { key: 'content', label: 'Content (blank line = new paragraph)', type: 'textarea' },
      { key: 'country', label: 'Country', type: 'text' },
      { key: 'city', label: 'City', type: 'text' },
      { key: 'difficulty_level', label: 'Difficulty (Easy | Medium | Advanced)', type: 'text' },
      { key: 'estimated_savings', label: 'Estimated savings (e.g. €50)', type: 'text' },
      { key: 'tags', label: 'Tags (one per line)', type: 'lines' },
      { key: 'cover_image_url', label: 'Cover image URL', type: 'text' },
      { key: 'is_featured', label: 'Featured', type: 'boolean' },
    ],
  },
  {
    table: 'personal_blog_posts',
    label: 'Blog Posts',
    titleKey: 'title',
    orderBy: 'published_at',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'slug', label: 'Slug', type: 'text', required: true },
      { key: 'category', label: 'Category (e.g. Life Abroad, Career)', type: 'text', required: true },
      { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
      { key: 'content', label: 'Content (blank line = new paragraph)', type: 'textarea' },
      { key: 'cover_image_url', label: 'Cover image URL (blog-covers bucket)', type: 'text' },
      { key: 'tags', label: 'Tags (one per line)', type: 'lines' },
      { key: 'reading_time', label: 'Reading time (min)', type: 'number' },
      { key: 'published_at', label: 'Published date', type: 'date' },
      { key: 'is_featured', label: 'Featured', type: 'boolean' },
    ],
  },
  {
    table: 'travel_highlights',
    label: 'Highlights',
    titleKey: 'title',
    fields: [
      { key: 'title', label: 'Title (short, e.g. city name)', type: 'text', required: true },
      { key: 'cover_image_url', label: 'Cover image URL (travel-thumbnails bucket)', type: 'text' },
      { key: 'destination_id', label: 'Destination ID (uuid, optional)', type: 'text' },
      { key: 'display_order', label: 'Display order', type: 'number' },
    ],
  },
]

type Row = Record<string, unknown>

function emptyRow(def: EntityDef): Row {
  const row: Row = {}
  for (const f of def.fields) {
    row[f.key] = f.type === 'boolean' ? false : f.type === 'lines' ? [] : f.type === 'number' ? 0 : ''
  }
  return row
}

function EntityEditor({ def }: { def: EntityDef }) {
  const [rows, setRows] = useState<Row[]>([])
  const [editing, setEditing] = useState<Row | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!supabase) return
    const { data, error: err } = await supabase
      .from(def.table)
      .select('*')
      .order(def.orderBy ?? 'display_order')
    if (err) setError(err.message)
    else setRows(data ?? [])
  }, [def.table, def.orderBy])

  useEffect(() => {
    void load()
  }, [load])

  async function save() {
    if (!supabase || !editing) return
    setBusy(true)
    setError(null)
    const payload: Row = { ...editing }
    // Normalize empty strings to null for optional date/url columns
    for (const f of def.fields) {
      if ((f.type === 'date' || f.type === 'text') && payload[f.key] === '') payload[f.key] = null
    }
    const isNew = !payload.id
    if (isNew) delete payload.id
    const query = isNew
      ? supabase.from(def.table).insert(payload)
      : supabase.from(def.table).update(payload).eq('id', payload.id as string)
    const { error: err } = await query
    setBusy(false)
    if (err) setError(err.message)
    else {
      setEditing(null)
      void load()
    }
  }

  async function remove(id: string) {
    if (!supabase) return
    if (!window.confirm('Delete this entry permanently?')) return
    const { error: err } = await supabase.from(def.table).delete().eq('id', id)
    if (err) setError(err.message)
    else void load()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl text-mist">{def.label}</h2>
        <button className="btn-ghost !px-4 !py-1.5 text-sm" onClick={() => setEditing(emptyRow(def))}>
          + Add
        </button>
      </div>
      {error && <p className="text-crimson text-sm" role="alert">{error}</p>}

      <ul className="space-y-2">
        {rows.map((row) => (
          <li key={String(row.id)} className="glass-panel px-4 py-3 flex items-center justify-between gap-3">
            <span className="text-sm text-mist truncate">{String(row[def.titleKey] ?? '(untitled)')}</span>
            <span className="flex gap-2 shrink-0">
              <button className="text-xs text-voltage hover:underline" onClick={() => setEditing({ ...row })}>
                Edit
              </button>
              <button className="text-xs text-crimson hover:underline" onClick={() => remove(String(row.id))}>
                Delete
              </button>
            </span>
          </li>
        ))}
        {rows.length === 0 && <li className="text-sm text-ash">No entries yet.</li>}
      </ul>

      {editing && (
        <div className="neon-border glass-panel p-5 space-y-4">
          <h3 className="text-mist font-semibold">{editing.id ? 'Edit' : 'New'} {def.label.replace(/s$/, '')}</h3>
          {def.fields.map((f) => (
            <div key={f.key}>
              <label htmlFor={`f-${f.key}`} className="block text-xs text-ash mb-1">{f.label}</label>
              {f.type === 'textarea' || f.type === 'lines' ? (
                <textarea
                  id={`f-${f.key}`}
                  rows={f.type === 'lines' ? 4 : 3}
                  className="w-full rounded-lg bg-charcoal/80 border border-white/10 px-3 py-2 text-sm text-mist focus:border-voltage outline-none"
                  value={
                    f.type === 'lines'
                      ? ((editing[f.key] as string[]) ?? []).join('\n')
                      : String(editing[f.key] ?? '')
                  }
                  onChange={(e) =>
                    setEditing((r) => ({
                      ...r!,
                      [f.key]: f.type === 'lines' ? e.target.value.split('\n').filter(Boolean) : e.target.value,
                    }))
                  }
                />
              ) : f.type === 'boolean' ? (
                <input
                  id={`f-${f.key}`}
                  type="checkbox"
                  checked={Boolean(editing[f.key])}
                  onChange={(e) => setEditing((r) => ({ ...r!, [f.key]: e.target.checked }))}
                />
              ) : (
                <input
                  id={`f-${f.key}`}
                  type={f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text'}
                  required={f.required}
                  className="w-full rounded-lg bg-charcoal/80 border border-white/10 px-3 py-2 text-sm text-mist focus:border-voltage outline-none"
                  value={String(editing[f.key] ?? '')}
                  onChange={(e) =>
                    setEditing((r) => ({
                      ...r!,
                      [f.key]: f.type === 'number' ? Number(e.target.value) : e.target.value,
                    }))
                  }
                />
              )}
            </div>
          ))}
          <div className="flex gap-3">
            <button className="btn-primary !px-5 !py-2 text-sm disabled:opacity-50" disabled={busy} onClick={save}>
              {busy ? 'Saving…' : 'Save'}
            </button>
            <button className="btn-ghost !px-5 !py-2 text-sm" onClick={() => setEditing(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function MessagesPanel() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!supabase) return
    const { data, error: err } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
    if (err) setError(err.message)
    else setMessages((data as ContactMessage[]) ?? [])
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  async function markRead(id: string, isRead: boolean) {
    if (!supabase) return
    await supabase.from('contact_messages').update({ is_read: isRead }).eq('id', id)
    void load()
  }

  async function remove(id: string) {
    if (!supabase) return
    if (!window.confirm('Delete this message?')) return
    await supabase.from('contact_messages').delete().eq('id', id)
    void load()
  }

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl text-mist">Contact Messages</h2>
      {error && <p className="text-crimson text-sm" role="alert">{error}</p>}
      {messages.length === 0 && <p className="text-sm text-ash">No messages yet.</p>}
      <ul className="space-y-3">
        {messages.map((m) => (
          <li key={m.id} className={`glass-panel p-5 ${m.is_read ? 'opacity-60' : ''}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
              <p className="text-mist font-semibold">
                {m.subject} {!m.is_read && <span className="text-ember text-xs ml-1">● new</span>}
              </p>
              <span className="text-xs text-ash font-mono">{new Date(m.created_at).toLocaleString()}</span>
            </div>
            <p className="text-sm text-voltage mb-2">
              {m.name} · <a className="hover:underline" href={`mailto:${m.email}`}>{m.email}</a>
            </p>
            <p className="text-sm text-ash whitespace-pre-wrap mb-3">{m.message}</p>
            <div className="flex gap-3">
              <button className="text-xs text-voltage hover:underline" onClick={() => markRead(m.id, !m.is_read)}>
                Mark as {m.is_read ? 'unread' : 'read'}
              </button>
              <button className="text-xs text-crimson hover:underline" onClick={() => remove(m.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<string>('messages')

  async function signOut() {
    await supabase?.auth.signOut()
    onLogout()
  }

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-5 sm:px-8 py-10">
      <header className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl text-mist">
          Portfolio <span className="gradient-text">Admin</span>
        </h1>
        <div className="flex gap-3">
          <a href="/" className="btn-ghost !px-4 !py-1.5 text-sm">View site</a>
          <button onClick={signOut} className="btn-ghost !px-4 !py-1.5 text-sm !border-crimson/40 !text-crimson hover:!bg-crimson/10">
            Sign out
          </button>
        </div>
      </header>

      <nav className="flex flex-wrap gap-2 mb-8" aria-label="Admin sections">
        {['messages', ...ENTITIES.map((e) => e.table)].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-lg text-sm capitalize transition-colors ${
              tab === t ? 'bg-gradient-to-r from-voltage/30 to-royal/30 text-mist border border-voltage/40' : 'text-ash hover:text-mist border border-white/10'
            }`}
          >
            {t.replace('_', ' ')}
          </button>
        ))}
      </nav>

      {tab === 'messages' ? (
        <MessagesPanel />
      ) : (
        <EntityEditor key={tab} def={ENTITIES.find((e) => e.table === tab)!} />
      )}
    </div>
  )
}
