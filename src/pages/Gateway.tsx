import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import CosmicGatewayBackground from '../components/gateway/CosmicGatewayBackground'
import PortalCard from '../components/gateway/PortalCard'
import WormholeTransition from '../components/gateway/WormholeTransition'
import type { PortalVariant } from '../components/gateway/WormholePortal'
import { usePageMeta } from '../hooks/usePageMeta'
import { trackEvent } from '../hooks/useAnalytics'

/** GalaxyGateway: the cinematic two-universe entry screen at `/`. */
export default function Gateway() {
  usePageMeta(
    'Vivek Ranjan — Choose Your Universe',
    'Enter the Work Universe (AI & Data Engineering portfolio) or the Travel Galaxy (stories, photos, and travel hacks) of Vivek Ranjan.',
  )
  const navigate = useNavigate()
  const [jump, setJump] = useState<PortalVariant | null>(null)

  const enter = (variant: PortalVariant) => {
    trackEvent('gateway_enter', { universe: variant })
    setJump(variant)
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-5 py-16">
      <CosmicGatewayBackground />

      <motion.header
        initial={{ opacity: 0, y: -30, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-12 sm:mb-16"
      >
        <p className="font-mono text-xs sm:text-sm tracking-[0.45em] uppercase text-ash mb-4">
          Vivek Ranjan
        </p>
        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl text-mist tracking-wide">
          Choose Your <span className="gradient-text">Universe</span>
        </h1>
      </motion.header>

      <div className="relative z-10 flex flex-col md:flex-row items-stretch justify-center gap-8 sm:gap-12 w-full max-w-4xl">
        <PortalCard
          variant="work"
          subtitle="Universe 01 · Professional"
          title="Work Universe"
          hint="AI & Data Engineering — pipelines, GenAI systems, projects, and the engineering journey."
          onEnter={() => enter('work')}
          delay={0.25}
        />
        <PortalCard
          variant="travel"
          subtitle="Universe 02 · Explorer"
          title="Travel Galaxy"
          hint="Journeys, photo galleries, travel hacks, and personal writing from the road."
          onEnter={() => enter('travel')}
          delay={0.45}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="relative z-10 mt-12 text-xs text-ash font-mono tracking-widest"
      >
        TWO WORLDS · ONE TRAVELLER
      </motion.p>

      <AnimatePresence>
        {jump && (
          <WormholeTransition
            variant={jump}
            onComplete={() => navigate(jump === 'work' ? '/work' : '/travel')}
          />
        )}
      </AnimatePresence>
    </main>
  )
}
