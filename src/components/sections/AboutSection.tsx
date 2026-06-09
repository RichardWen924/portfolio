import { useT } from '../../i18n'
import CountUp from '../effects/CountUp'
import FadeContent from '../effects/FadeContent'

export default function AboutSection() {
  const t = useT()

  const stats = [
    { value: 4, label: t.about.statYears, suffix: '+' },
    { value: 15, label: t.about.statProjects, suffix: '+' },
    { value: 10, label: t.about.statTech, suffix: '+' },
  ]

  return (
    <section id="about" className="relative py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <FadeContent blur={true} duration={1000}>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-violet-400/60 flex-shrink-0">
                <circle cx="12" cy="12" r="3" fill="currentColor" />
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
              </svg>
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">{t.about.sectionId}</span>
            </div>
            <p className="text-violet-400 text-sm font-medium tracking-wider mb-3">{t.about.label}</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              {t.about.heading}
            </h2>
          </div>
        </FadeContent>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Bio */}
          <FadeContent blur={true} duration={1000} delay={200}>
            <div className="space-y-4">
              <p className="text-zinc-400 text-lg leading-relaxed">
                {t.about.bio1}
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                {t.about.bio2}
              </p>
              <p className="text-zinc-500 text-base leading-relaxed">
                {t.about.bio3}
              </p>
            </div>
          </FadeContent>

          {/* Stats */}
          <FadeContent blur={true} duration={1000} delay={400}>
            <div className="grid grid-cols-3 gap-4">
              {stats.map(stat => (
                <div
                  key={stat.label}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 text-center hover:bg-white/[0.05] transition-colors"
                >
                  <div className="text-violet-400 text-3xl md:text-4xl font-bold tracking-tight mb-1">
                    <CountUp
                      from={0}
                      to={stat.value}
                      delay={0.5}
                      duration={3}
                      className="text-violet-400"
                    />
                    <span className="text-violet-400">{stat.suffix}</span>
                  </div>
                  <p className="text-zinc-500 text-xs md:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeContent>
        </div>
      </div>
    </section>
  )
}
