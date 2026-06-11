import { Suspense, lazy } from 'react'
import Navbar from '../components/Navbar'
import CosmicBackground from '../components/effects/CosmicBackground'
import CursorEnergyTrail from '../components/effects/CursorEnergyTrail'
import ScrollProgressBar from '../components/ScrollProgressBar'
import LoadingSkeleton from '../components/LoadingSkeleton'
import Hero from '../sections/Hero'
import Footer from '../components/Footer'
import { usePortfolioData } from '../hooks/usePortfolioData'
import { usePageView } from '../hooks/useAnalytics'
import { usePageMeta } from '../hooks/usePageMeta'

// Below-the-fold sections are lazy-loaded to keep the initial bundle lean.
const About = lazy(() => import('../sections/About'))
const Skills = lazy(() => import('../sections/Skills'))
const ExperienceTimeline = lazy(() => import('../sections/ExperienceTimeline'))
const Projects = lazy(() => import('../sections/Projects'))
const Achievements = lazy(() => import('../sections/Achievements'))
const Education = lazy(() => import('../sections/Education'))
const Certifications = lazy(() => import('../sections/Certifications'))
const ContactForm = lazy(() => import('../sections/ContactForm'))

function SectionFallback() {
  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
      <LoadingSkeleton lines={4} />
    </div>
  )
}

export default function Home() {
  const { data } = usePortfolioData()
  usePageView()
  usePageMeta(
    'Vivek Ranjan — AI & Data Engineer',
    'AI & Data Engineer with 4+ years building scalable data platforms, production RAG systems, and healthcare analytics on AWS. Python, PySpark, LangChain, Redshift, Snowflake.',
  )

  return (
    <>
      <ScrollProgressBar />
      <CosmicBackground />
      <CursorEnergyTrail />
      <Navbar resumeUrl={data.profile.resume_url} />

      <main id="main">
        <Hero profile={data.profile} />
        <Suspense fallback={<SectionFallback />}>
          <About profile={data.profile} />
          <Skills skills={data.skills} />
          <ExperienceTimeline experience={data.experience} />
          <Projects projects={data.projects} />
          <Achievements achievements={data.achievements} />
          <Education education={data.education} />
          <Certifications certifications={data.certifications} />
          <ContactForm profile={data.profile} />
        </Suspense>
      </main>

      <Footer profile={data.profile} />
    </>
  )
}
