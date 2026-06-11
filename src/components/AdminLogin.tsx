import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'

export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!supabase) {
      setError('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
      return
    }
    setLoading(true)
    setError(null)
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (err) setError('Invalid credentials.')
    else onLogin()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="neon-border glass-panel p-8 w-full max-w-sm space-y-5"
      >
        <h1 className="font-display text-2xl text-mist text-center">
          Admin <span className="gradient-text">Access</span>
        </h1>
        <div>
          <label htmlFor="admin-email" className="block text-sm text-ash mb-1.5">Email</label>
          <input
            id="admin-email"
            type="email"
            required
            autoComplete="username"
            className="w-full rounded-xl bg-charcoal/80 border border-white/10 px-4 py-3 text-mist focus:border-voltage outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="admin-password" className="block text-sm text-ash mb-1.5">Password</label>
          <input
            id="admin-password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full rounded-xl bg-charcoal/80 border border-white/10 px-4 py-3 text-mist focus:border-voltage outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-crimson text-sm" role="alert">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
        <a href="/" className="block text-center text-xs text-ash hover:text-mist transition-colors">
          ← Back to portfolio
        </a>
      </motion.form>
    </div>
  )
}
