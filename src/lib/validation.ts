export interface ContactFormValues {
  name: string
  email: string
  subject: string
  message: string
  honeypot: string
}

export type FieldErrors = Partial<Record<keyof ContactFormValues, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS_RE = new RegExp('[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F]', 'g')

/** Strip control characters and angle brackets to neutralize script injection. */
export function sanitize(value: string): string {
  return value.replace(/[<>]/g, '').replace(CONTROL_CHARS_RE, '').trim()
}

export function validateContactForm(values: ContactFormValues): FieldErrors {
  const errors: FieldErrors = {}
  const name = sanitize(values.name)
  const email = sanitize(values.email)
  const subject = sanitize(values.subject)
  const message = sanitize(values.message)

  if (name.length < 2) errors.name = 'Please enter your name (at least 2 characters).'
  if (name.length > 100) errors.name = 'Name must be under 100 characters.'
  if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.'
  if (email.length > 200) errors.email = 'Email must be under 200 characters.'
  if (subject.length < 3) errors.subject = 'Please add a short subject (at least 3 characters).'
  if (subject.length > 200) errors.subject = 'Subject must be under 200 characters.'
  if (message.length < 10) errors.message = 'Please write a message of at least 10 characters.'
  if (message.length > 5000) errors.message = 'Message must be under 5000 characters.'

  return errors
}
