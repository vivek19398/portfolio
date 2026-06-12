import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionWrapper, { staggerContainer } from '../components/SectionWrapper'
import SkillCard from '../components/SkillCard'
import { SKILL_CATEGORIES } from '../data/portfolioData'
import type { Skill } from '../types/database'

/** Arsenal command dashboard: filterable categories in HUD panels. */
export default function Skills({ skills }: { skills: Skill[] }) {
  const [filter, setFilter] = useState<string>('All')

  const categories = [
    ...SKILL_CATEGORIES.filter((c) => skills.some((s) => s.category === c)),
    // DB-added categories not in the default list
    ...[...new Set(skills.map((s) => s.category))].filter(
      (c) => !(SKILL_CATEGORIES as readonly string[]).includes(c),
    ),
  ]
  const visible = filter === 'All' ? categories : categories.filter((c) => c === filter)

  return (
    <SectionWrapper id="skills" kicker="Chapter II" title="Command Arsenal">
      {/* Command-deck filter row */}
      <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filter skills by category">
        {['All', ...categories].map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={filter === c}
            onClick={() => setFilter(c)}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
              filter === c
                ? 'border-gold/60 bg-gold/10 text-gold-light shadow-[0_0_14px_rgba(201,168,76,0.2)]'
                : 'border-white/10 text-ash hover:text-parchment hover:border-gold/30'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {visible.map((cat) => (
            <motion.div
              key={cat}
              layout
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              exit={{ opacity: 0, scale: 0.92 }}
              viewport={{ once: true, margin: '-60px' }}
              className="relative glass-panel p-5 border-gold/10"
            >
              <h3 className="font-display text-sm uppercase tracking-[0.22em] text-gold mb-4 flex items-center gap-2.5">
                <span className="h-px w-6 bg-gold/50" aria-hidden="true" />
                {cat}
                <span className="ml-auto font-mono text-[10px] text-parchment/40 normal-case tracking-normal">
                  {skills.filter((s) => s.category === cat).length} units
                </span>
              </h3>
              <div className="space-y-2.5">
                {skills
                  .filter((s) => s.category === cat)
                  .sort((a, b) => a.display_order - b.display_order)
                  .map((s) => (
                    <SkillCard key={s.id} skill={s} />
                  ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  )
}
