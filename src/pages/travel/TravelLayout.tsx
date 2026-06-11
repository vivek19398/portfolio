import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import CosmicBackground from '../../components/effects/CosmicBackground'
import ScrollProgressBar from '../../components/ScrollProgressBar'
import TravelNavbar from '../../components/travel/TravelNavbar'
import TravelFooter from '../../components/travel/TravelFooter'

/** Shared shell for every travel + blog route. */
export default function TravelLayout() {
  const { pathname } = useLocation()

  // New page → start at the top (browser keeps scroll on SPA navigations).
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <ScrollProgressBar />
      <CosmicBackground />
      <TravelNavbar />
      <main className="relative pt-16 min-h-screen">
        <Outlet />
      </main>
      <TravelFooter />
    </>
  )
}
