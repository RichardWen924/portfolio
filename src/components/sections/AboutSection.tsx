import { useContext } from 'react'
import { LanguageContext, useT } from '../../i18n'
import { useAbout } from '../../data/loader'
import FlipText from '../effects/FlipText'
import ProfileCard from '../effects/ProfileCard'
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

          {/* Right column — Profile Card */}
          <FadeContent blur={true} duration={1000} delay={400}>
            <div className="flex justify-end md:pt-4">
              <ProfileCard
                name="Richard Wen"
                title="Software Engineer"
                handle="RichardWen924"
                status="Open to Work"
                contactText="Contact Me"
                avatarUrl={about.avatarUrl}
                showUserInfo={false}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                behindGlowColor="rgba(167, 139, 250, 0.5)"
                behindGlowEnabled
                innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
              />
            </div>
          </FadeContent>
        </div>
      </div>
    </section>
  )
}
