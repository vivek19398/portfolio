import { useEffect } from 'react'
import { supabase } from '../lib/supabase'

/**
 * Fire-and-forget analytics event stored in Supabase.
 * Silently no-ops when Supabase is not configured.
 */
export function trackEvent(eventType: string, metadata: Record<string, unknown> = {}) {
  if (!supabase) return
  void supabase
    .from('site_analytics_events')
    .insert({
      event_type: eventType,
      page_path: window.location.pathname,
      metadata,
    })
    .then(() => undefined)
}

export function usePageView() {
  useEffect(() => {
    trackEvent('page_view')
  }, [])
}
