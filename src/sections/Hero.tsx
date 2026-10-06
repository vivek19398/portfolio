import type { Profile } from '../types/database'

export default function Hero({ profile }: { profile: Profile }) {
  return <section id="top" className="atlas-destination-hero">
    <p className="atlas-eyebrow">THE ATLAS DRIFTER · BEHIND THE BUILD</p>
    <h1>Behind<br /><em>the Build.</em></h1>
    <p className="atlas-tagline">Every idea has an origin story.</p>
    <p className="atlas-destination-description">{profile.short_tagline}</p>
    <div className="atlas-destination-actions"><a href="#projects">Explore the work ↓</a><a href={profile.resume_url} target="_blank" rel="noreferrer">View résumé ↗</a><a href="/">Back to the story</a></div>
    <span className="atlas-destination-credit">STARRING {profile.full_name.toUpperCase()} · {profile.location.toUpperCase()}</span>
  </section>
}
