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

export default function App() {
  const isAdmin = window.location.hash === '#admin'

  return (
    <LanguageProvider>
      {isAdmin ? <Admin /> : <MainSite />}
    </LanguageProvider>
  )
}
