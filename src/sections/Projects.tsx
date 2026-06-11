import SectionWrapper from '../components/SectionWrapper'
import ProjectCard from '../components/ProjectCard'
import EnergyVortex from '../components/effects/EnergyVortex'
import type { Project } from '../types/database'

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <SectionWrapper id="projects" kicker="Chapter 04" title="Featured Work">
      {/* Faint vortex energy field behind the grid */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <EnergyVortex size={900} intensity={0.35} />
      </div>
      <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...projects]
          .sort((a, b) => a.display_order - b.display_order)
          .map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
      </div>
    </SectionWrapper>
  )
}
