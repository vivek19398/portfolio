import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import ScannerBorder from '../components/effects/ScannerBorder'
import { supabase } from '../lib/supabase'
import { sanitize, validateContactForm, type ContactFormValues, type FieldErrors } from '../lib/validation'
import type { Profile } from '../types/database'

const EMPTY: ContactFormValues = { name: '', email: '', subject: '', message: '', honeypot: '' }

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function ContactForm({ profile }: { profile: Profile }) {
  const [values, setValues] = useState<ContactFormValues>(EMPTY)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')

  const set = (field: keyof ContactFormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [field]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Honeypot: bots fill the hidden field — silently pretend success.
    if (values.honeypot) {
      setStatus('success')
      return
    }

    const errs = validateContactForm(values)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    if (!supabase) {
      setStatus('error')
      setErrors({ message: 'Contact backend is not configured yet. Email me directly instead.' })
      return
    }

    setStatus('sending')
    const { error } = await supabase.from('contact_messages').insert({
      name: sanitize(values.name),
      email: sanitize(values.email),
      subject: sanitize(values.subject),
      message: sanitize(values.message),
      source_page: window.location.pathname,
      user_agent: navigator.userAgent.slice(0, 300),
    })

    if (error) {
      setStatus('error')
    } else {
      setStatus('success')
      setValues(EMPTY)
      // Optional email notification hook (Resend / SendGrid / EmailJS).
      // See README — messages are always stored in Supabase regardless.
    }
  }

  const inputClass = (field: keyof FieldErrors) =>
    `w-full rounded-xl bg-charcoal/80 border px-4 py-3 text-mist placeholder:text-ash/50 transition-colors focus:border-voltage outline-none ${
      errors[field] ? 'border-crimson/70' : 'border-white/10'
    }`

  return (
    <SectionWrapper id="contact" kicker="Final Chapter" title="Summon Me">
      <div className="grid md:grid-cols-5 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="md:col-span-2 space-y-6"
        >
          <p className="text-ash leading-relaxed">
            Open to AI Engineer and Data Engineer opportunities. Whether it's a role, a collaboration,
            or a data problem worth solving — my inbox is open.
          </p>
          <div className="space-y-3 text-sm">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-mist hover:text-voltage transition-colors">
              <span className="text-voltage" aria-hidden="true">✉</span> {profile.email}
            </a>
            <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-mist hover:text-voltage transition-colors">
              <span className="text-voltage" aria-hidden="true">in</span> LinkedIn
            </a>
            <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-mist hover:text-voltage transition-colors">
              <span className="text-voltage" aria-hidden="true">⌥</span> GitHub
            </a>
            <p className="flex items-center gap-3 text-ash">
              <span className="text-voltage" aria-hidden="true">◎</span> {profile.location}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="md:col-span-3"
        >
        <ScannerBorder scanning={status !== 'success'} className="h-full">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="neon-border glass-panel p-6 sm:p-8 space-y-5 h-full"
        >
          <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-voltage flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-voltage animate-glow-pulse" aria-hidden="true" />
            Transmission Channel · Secure
          </p>
          {/* Honeypot — hidden from humans, attractive to bots */}
          <div className="absolute opacity-0 -z-10 h-0 overflow-hidden" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input id="company" type="text" tabIndex={-1} autoComplete="off" value={values.honeypot} onChange={set('honeypot')} />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-sm text-ash mb-1.5">Name</label>
              <input id="name" type="text" required maxLength={100} placeholder="Your name" className={inputClass('name')} value={values.name} onChange={set('name')} />
              {errors.name && <p className="text-crimson text-xs mt-1.5" role="alert">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-ash mb-1.5">Email</label>
              <input id="email" type="email" required maxLength={200} placeholder="you@example.com" className={inputClass('email')} value={values.email} onChange={set('email')} />
              {errors.email && <p className="text-crimson text-xs mt-1.5" role="alert">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm text-ash mb-1.5">Subject</label>
            <input id="subject" type="text" required maxLength={200} placeholder="What's this about?" className={inputClass('subject')} value={values.subject} onChange={set('subject')} />
            {errors.subject && <p className="text-crimson text-xs mt-1.5" role="alert">{errors.subject}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm text-ash mb-1.5">Message</label>
            <textarea id="message" required rows={5} maxLength={5000} placeholder="Tell me about the opportunity or idea…" className={inputClass('message')} value={values.message} onChange={set('message')} />
            {errors.message && <p className="text-crimson text-xs mt-1.5" role="alert">{errors.message}</p>}
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <button type="submit" disabled={status === 'sending'} className="btn-primary disabled:opacity-50 disabled:hover:scale-100">
              {status === 'sending' ? 'Sending…' : 'Send Message ⚔'}
            </button>

            <AnimatePresence mode="wait">
              {status === 'success' && (
                <motion.span key="ok" className="relative inline-flex items-center" role="status">
                  {/* Transmission-complete burst */}
                  <motion.span
                    aria-hidden="true"
                    className="absolute -left-3 -top-3 w-10 h-10 rounded-full border-2 border-voltage/70"
                    initial={{ scale: 0.3, opacity: 1 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                  />
                  <motion.p
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-voltage font-semibold drop-shadow-[0_0_10px_rgba(56,189,248,0.6)]"
                  >
                    ✦ Transmission received — I'll reply soon.
                  </motion.p>
                </motion.span>
              )}
              {status === 'error' && (
                <motion.p
                  key="err"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-crimson"
                  role="alert"
                >
                  Could not send right now — please email me directly at {profile.email}.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </form>
        </ScannerBorder>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
