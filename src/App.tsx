import { Suspense, lazy } from 'react'
import { MotionConfig } from 'framer-motion'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Gateway from './pages/Gateway'
import Home from './pages/Home'
import LoadingSkeleton from './components/LoadingSkeleton'

// Travel universe + admin are lazy so the gateway and work universe
// never pay for them up front.
const Admin = lazy(() => import('./pages/Admin'))
const TravelLayout = lazy(() => import('./pages/travel/TravelLayout'))
const TravelHome = lazy(() => import('./pages/travel/TravelHome'))
const TravelGalleryPage = lazy(() => import('./pages/travel/TravelGalleryPage'))
const TravelStoriesPage = lazy(() => import('./pages/travel/TravelStoriesPage'))
const TravelStoryDetail = lazy(() => import('./pages/travel/TravelStoryDetail'))
const TravelHacksPage = lazy(() => import('./pages/travel/TravelHacksPage'))
const TravelHackDetail = lazy(() => import('./pages/travel/TravelHackDetail'))
const BlogPage = lazy(() => import('./pages/blog/BlogPage'))
const BlogPostDetail = lazy(() => import('./pages/blog/BlogPostDetail'))

function RouteFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center px-8">
      <LoadingSkeleton lines={4} className="w-full max-w-md" />
    </div>
  )
}

export default function App() {
  return (
    // reducedMotion="user" makes every Framer Motion animation respect
    // the OS prefers-reduced-motion setting (canvas/CSS effects have
    // their own guards).
    <MotionConfig reducedMotion="user">
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Gateway />} />
            <Route path="/work" element={<Home />} />
            <Route path="/admin" element={<Admin />} />

            <Route element={<TravelLayout />}>
              <Route path="/travel" element={<TravelHome />} />
              <Route path="/travel/gallery" element={<TravelGalleryPage />} />
              <Route path="/travel/stories" element={<TravelStoriesPage />} />
              <Route path="/travel/stories/:slug" element={<TravelStoryDetail />} />
              <Route path="/travel/hacks" element={<TravelHacksPage />} />
              <Route path="/travel/hacks/:slug" element={<TravelHackDetail />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostDetail />} />
            </Route>

            <Route path="*" element={<Gateway />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MotionConfig>
  )
}
