import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ExperienceSection from './components/ExperienceSection'
import SkillsSection from './components/SkillsSection'
import ProjectsSection from './components/ProjectsSection'
import Footer from './components/Footer'
import ClickSpark from './components/ClickSpark'

export default function App() {
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
        <Footer />
      </div>
    </ClickSpark>
  )
}
