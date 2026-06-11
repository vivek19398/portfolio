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
    <SectionWrapper id="skills" kicker="Chapter 02" title="Arsenal of Skills">
      {/* Command-deck filter row */}
      <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filter skills by category">
        {['All', ...categories].map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={filter === c}
            onClick={() => setFilter(c)}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 border ${
              filter === c
                ? 'border-voltage/60 bg-voltage/15 text-voltage shadow-[0_0_14px_rgba(56,189,248,0.25)]'
                : 'border-white/10 text-ash hover:text-mist hover:border-white/25'
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
              className="relative glass-panel p-5 border-white/5"
            >
              <h3 className="font-mono text-sm uppercase tracking-[0.25em] text-ember mb-4 flex items-center gap-2">
                <span className="h-px w-6 bg-ember/60" aria-hidden="true" />
                {cat}
                <span className="ml-auto text-[10px] text-ash normal-case tracking-normal">
                  {skills.filter((s) => s.category === cat).length} modules
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
