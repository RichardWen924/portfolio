import { useContext } from 'react'
import { useT, LanguageContext } from '../../i18n'
import { useServices, useServicesContent } from '../../data/loader'
import FadeContent from '../effects/FadeContent'

export default function ServicesSection() {
  const t = useT()
  const { lang } = useContext(LanguageContext)
  const services = useServices()
  const servicesContent = useServicesContent()

  return (
    <section id="services" className="relative pt-6 pb-40 md:pt-8 md:pb-48 px-6 sm:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <FadeContent blur={true} duration={800}>
          <div className="flex items-center gap-4 mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-violet-400/60 flex-shrink-0">
              <circle cx="12" cy="12" r="3" fill="currentColor" />
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
              <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
            </svg>
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              {t.services.sectionId}
            </span>
          </div>
        </FadeContent>

        {/* Subheader */}
        <FadeContent blur={true} duration={1000}>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2">
            {servicesContent.heading[lang]}
          </h2>
          <p className="text-zinc-500 text-base md:text-lg max-w-xl mb-6">
            {servicesContent.subDescription[lang]}
          </p>
        </FadeContent>

        {/* Flat service list */}
        <div>
          {services.map((svc, i) => (
            <FadeContent key={svc.id} blur={true} duration={800} delay={200 + i * 150}>
              <div className="group py-6 border-t border-white/[0.06] hover:border-white/[0.12] transition-colors">
                <div className="flex items-start gap-8">
                  {/* Number */}
                  <span className="font-mono text-xs text-zinc-600 tabular-nums pt-1 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">
                      {svc.title[lang]}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-xl mb-4">
                      {svc.description[lang]}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      {svc.tags.map((tag, j) => (
                        <span key={tag} className="text-xs text-zinc-600 whitespace-nowrap">
                          {tag}
                          {j < svc.tags.length - 1 && (
                            <span className="text-zinc-700 ml-2">&middot;</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeContent>
          ))}
        </div>

        {/* Bottom divider */}
        <div className="border-t border-white/[0.06]" />
      </div>
    </section>
  )
}
