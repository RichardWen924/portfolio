import { useState, useEffect } from 'react'
import { LanguageProvider } from './i18n'
import ClickSpark from './components/effects/ClickSpark'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import AboutSection from './components/sections/AboutSection'
import ExperienceSection from './components/sections/ExperienceSection'
import HeroSection from './components/sections/HeroSection'
import ProjectsSection from './components/sections/ProjectsSection'
import ServicesSection from './components/sections/ServicesSection'
import SkillsSection from './components/sections/SkillsSection'
import Admin from './pages/Admin'

const SNAP_MARGIN = 150   // only snap when within 150px of a section top
const SNAP_DELAY = 800    // ms idle before snapping
const NAV_OFFSET = 80     // navbar + breathing room

function useGentleSnap() {
  useEffect(() => {
    let idle: ReturnType<typeof setTimeout>

    const onScroll = () => {
      clearTimeout(idle)
      idle = setTimeout(() => {
        const sections = Array.from(document.querySelectorAll('section[id], footer[id]')) as HTMLElement[]
        const sy = window.scrollY
        let bestEl: HTMLElement | null = null
        let bestDist = Infinity

        for (const el of sections) {
          const top = el.getBoundingClientRect().top + sy
          const dist = Math.abs(sy - (top - NAV_OFFSET))
          if (dist < SNAP_MARGIN && dist < bestDist) {
            bestDist = dist
            bestEl = el
          }
        }

        if (bestEl) {
          const target = bestEl.getBoundingClientRect().top + sy - NAV_OFFSET
          window.scrollTo({ top: target, behavior: 'smooth' })
        }
      }, SNAP_DELAY)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(idle)
    }
  }, [])
}

function MainSite() {
  useGentleSnap()

  return (
    <ClickSpark
      sparkColor="#a78bfa"
      sparkSize={8}
      sparkRadius={20}
      sparkCount={6}
      duration={500}
    >
      <div className="min-h-screen bg-zinc-950 text-white">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <ServicesSection />
        <Footer />
      </div>
    </ClickSpark>
  )
}

function getIsAdmin() {
  return window.location.hash === '#admin'
}

export default function App() {
  const [isAdmin, setIsAdmin] = useState(getIsAdmin)

  useEffect(() => {
    const onHashChange = () => setIsAdmin(getIsAdmin())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return (
    <LanguageProvider>
      {isAdmin ? <Admin /> : <MainSite />}
    </LanguageProvider>
  )
}
