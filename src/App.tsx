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

function MainSite() {
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
