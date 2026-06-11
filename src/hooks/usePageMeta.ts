import { useEffect } from 'react'

function setMeta(selector: string, attr: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    const [key, value] = attr.split('=')
    el.setAttribute(key, value)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * Per-route SEO: document title, meta description, and matching
 * Open Graph title/description. Restores nothing on unmount — the next
 * page sets its own values.
 */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    setMeta('meta[name="description"]', 'name=description', description)
    setMeta('meta[property="og:title"]', 'property=og:title', title)
    setMeta('meta[property="og:description"]', 'property=og:description', description)
  }, [title, description])
}
