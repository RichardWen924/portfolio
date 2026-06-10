import { useContext } from 'react'
import { useT, LanguageContext } from '../../i18n'
import { useExperiences, useEducations } from '../../data/loader'
import ExperienceTimeline from '../effects/ExperienceTimeline'
import StaggerReveal from '../effects/StaggerReveal'
import FadeContent from '../effects/FadeContent'

export default function ExperienceSection() {
  const t = useT()
  const { lang } = useContext(LanguageContext)
  const experiences = useExperiences()
  const educations = useEducations()

  return (
    <section id="experience" className="snap-section relative min-h-screen pt-6 pb-40 md:pt-8 md:pb-48 px-6 sm:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <FadeContent blur={true} duration={800}>
          <div className="flex items-center gap-4 mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-violet-400/60 flex-shrink-0">
              <circle cx="12" cy="12" r="3" fill="currentColor" />
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
              <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
            </svg>
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">{t.experience.sectionId}</span>
          </div>
        </FadeContent>

        {/* Section heading */}
        <FadeContent blur={true} duration={1000}>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2">
            {t.experience.heading}
          </h2>
          <p className="text-zinc-500 text-base md:text-lg max-w-xl mb-6">
            {t.experience.subDescription}
          </p>
        </FadeContent>

        {/* Education */}
        <FadeContent blur={true} duration={800} delay={200}>
          <p className="font-mono text-xs uppercase tracking-widest text-violet-400/60 mb-6">
            {t.experience.educationLabel}
          </p>
        </FadeContent>
        <StaggerReveal delayPerItem={200} className="relative border-l border-white/[0.08] ml-6 sm:ml-16 py-2 mb-16 space-y-10">
          {educations.map(edu => (
            <div key={edu.id} className="relative pl-8 sm:pl-12">
              <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-zinc-800 bg-emerald-400/60 transition-all duration-300" />
              <span className="absolute -left-28 sm:-left-36 top-0 text-xs font-mono text-zinc-600 tracking-wide whitespace-nowrap hidden sm:block">
                {edu.date[lang]}
              </span>
              <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                {edu.school[lang]}
              </h3>
              <div className="flex items-center gap-x-2">
                <span className="text-zinc-400 text-sm">{edu.degree[lang]}</span>
                <span className="block sm:hidden font-mono text-xs text-zinc-600">&middot; {edu.date[lang]}</span>
              </div>
            </div>
          ))}
        </StaggerReveal>

        {/* Career */}
        <FadeContent blur={true} duration={800} delay={400}>
          <p className="font-mono text-xs uppercase tracking-widest text-violet-400/60 mb-6">
            {t.experience.careerLabel}
          </p>
        </FadeContent>

        <StaggerReveal delayPerItem={250} className="relative border-l border-white/[0.08] ml-6 sm:ml-16 space-y-14 py-2">
          <ExperienceTimeline experiences={experiences} />
        </StaggerReveal>
      </div>
    </section>
  )
}
