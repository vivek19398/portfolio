import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import AdminLogin from '../components/AdminLogin'
import AdminDashboard from '../components/AdminDashboard'
import LoadingSkeleton from '../components/LoadingSkeleton'

export default function Admin() {
  const [authed, setAuthed] = useState<boolean | null>(null)

  useEffect(() => {
    if (!supabase) {
      setAuthed(false)
      return
    }
    supabase.auth.getSession().then(({ data }) => setAuthed(!!data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => setAuthed(!!session))
    return () => sub.subscription.unsubscribe()
  }, [])

  if (authed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center px-8">
        <LoadingSkeleton lines={3} className="w-full max-w-sm" />
      </div>
    )
  }

  return authed ? <AdminDashboard onLogout={() => setAuthed(false)} /> : <AdminLogin onLogin={() => setAuthed(true)} />
}
