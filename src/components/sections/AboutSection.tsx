import { useContext } from 'react'
import { LanguageContext, useT } from '../../i18n'
import { useAbout } from '../../data/loader'
import FlipText from '../effects/FlipText'
import PixelTransition from '../effects/PixelTransition'
import CountUp from '../effects/CountUp'
import FadeContent from '../effects/FadeContent'

export default function AboutSection() {
  const t = useT()
  const { lang } = useContext(LanguageContext)
  const about = useAbout()

  const stats = [
    { value: about.statYears, label: t.about.statYears, suffix: '+' },
    { value: about.statProjects, label: t.about.statProjects, suffix: '+' },
    { value: about.statTech, label: t.about.statTech, suffix: '+' },
  ]

  return (
    <section id="about" className="snap-section relative min-h-screen pt-6 pb-40 md:pt-8 md:pb-48 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left column */}
          <div>
            {/* Section header — left-aligned */}
            <FadeContent blur={true} duration={1000}>
              <div className="mb-3">
                <div className="flex items-center gap-4 mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-violet-400/60 flex-shrink-0">
                    <circle cx="12" cy="12" r="3" fill="currentColor" />
                    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                    <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
                  </svg>
                  <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">{t.about.sectionId}</span>
                </div>
                <p className="text-violet-400 text-sm font-medium tracking-wider mb-3">{about.label[lang]}</p>
                <FlipText
                  text={about.heading[lang]}
                  delay={300}
                  charDuration={60}
                  trigger="view"
                  className="text-3xl md:text-5xl font-bold tracking-tight text-white"
                />
              </div>
            </FadeContent>

            {/* Bio */}
            <FadeContent blur={true} duration={1000} delay={200}>
              <div className="space-y-4 mb-10">
                <p className="text-zinc-400 text-lg leading-relaxed">
                  {about.bio1[lang]}
                </p>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  {about.bio2[lang]}
                </p>
                <p className="text-zinc-500 text-base leading-relaxed">
                  {about.bio3[lang]}
                </p>
              </div>
            </FadeContent>

            {/* Stats — below bio */}
            <FadeContent blur={true} duration={1000} delay={600}>
              <div className="grid grid-cols-3 gap-3 max-w-sm">
                {stats.map(stat => (
                  <div
                    key={stat.label}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-center hover:bg-white/[0.05] transition-colors"
                  >
                    <div className="text-violet-400 text-xl md:text-2xl font-bold tracking-tight mb-0.5">
                      <CountUp
                        from={0}
                        to={stat.value}
                        delay={0.5}
                        duration={1.5}
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

          {/* Right column — Pixel Transition Card */}
          <FadeContent blur={true} duration={1000} delay={400}>
            <div className="flex justify-end md:pt-4">
              <PixelTransition
                aspectRatio="139.3%"
                className="!rounded-[30px]"
                style={{
                  width: 'min(calc(80svh * 0.718), calc(540px * 0.718))',
                }}
                firstContent={
                  <div className="w-full h-full bg-zinc-800 relative overflow-hidden">
                    {about.avatarUrl ? (
                      <img
                        className="w-full h-full object-cover"
                        src={about.avatarUrl}
                        alt="Richard Wen"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-violet-400/40">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                    )}
                  </div>
                }
                secondContent={
                  <div className="w-full h-full flex items-center justify-center bg-[#222]">
                    <span className="text-5xl md:text-7xl font-black tracking-widest text-violet-400 select-none">
                      BOOM
                    </span>
                  </div>
                }
              />
            </div>
          </FadeContent>
        </div>
      </div>
    </section>
  )
}
