import SectionWrapper from '../components/SectionWrapper'
import ProjectCard from '../components/ProjectCard'
import type { Project } from '../types/database'

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <SectionWrapper id="projects" kicker="Chapter IV" title="Featured Work">
      <div className="relative grid sm:grid-cols-2 gap-6">
        {[...projects]
          .sort((a, b) => a.display_order - b.display_order)
          .map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
      </div>
    </SectionWrapper>
  )
}
