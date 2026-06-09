import { useContext } from 'react'
import { useT, LanguageContext } from '../../i18n'
import { experiences, educations } from '../../data/experience'
import FadeContent from '../effects/FadeContent'

export default function ExperienceSection() {
  const t = useT()
  const { lang } = useContext(LanguageContext)

  return (
    <section id="experience" className="relative py-24 md:py-32 px-6 sm:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <FadeContent blur={true} duration={800}>
          <div className="flex items-center gap-4 mb-16">
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
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            {t.experience.heading}
          </h2>
          <p className="text-zinc-500 text-base md:text-lg max-w-xl mb-16">
            {t.experience.subDescription}
          </p>
        </FadeContent>

        {/* Education */}
        <FadeContent blur={true} duration={800} delay={200}>
          <p className="font-mono text-xs uppercase tracking-widest text-violet-400/60 mb-6">
            {t.experience.educationLabel}
          </p>
          <div className="space-y-8 mb-16">
            {educations.map(edu => (
              <div key={edu.id}>
                <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                  {edu.school[lang]}
                </h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-zinc-400 text-sm">
                    {edu.degree[lang]}
                  </span>
                  <span className="text-zinc-700">&middot;</span>
                  <span className="font-mono text-xs text-zinc-500 tracking-wide">
                    {edu.date[lang]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </FadeContent>

        {/* Career */}
        <FadeContent blur={true} duration={800} delay={400}>
          <p className="font-mono text-xs uppercase tracking-widest text-violet-400/60 mb-6">
            {t.experience.careerLabel}
          </p>
        </FadeContent>

        <div className="space-y-10">
          {experiences.map((exp, i) => (
            <FadeContent key={exp.id} blur={true} duration={800} delay={500 + i * 150}>
              <div className="group">
                {/* Role */}
                <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                  {exp.role[lang]}
                </h3>

                {/* Company · Date */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
                  <span className="text-zinc-400 text-sm">
                    {exp.company[lang]}
                  </span>
                  <span className="text-zinc-700">&middot;</span>
                  <span className="font-mono text-xs text-zinc-500 tracking-wide">
                    {exp.date[lang]}
                  </span>
                </div>

                {/* Description */}
                <p className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-2xl">
                  {exp.description[lang]}
                </p>
              </div>
            </FadeContent>
          ))}
        </div>
      </div>
    </section>
  )
}
