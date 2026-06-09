import { useT } from '../../i18n'
import BlurText from '../effects/BlurText'
import FadeContent from '../effects/FadeContent'
import DotGrid from '../effects/DotGrid'

export default function HeroSection() {
  const t = useT()

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* DotGrid background - interactive dots, only visible in hero */}
      <div className="absolute inset-0">
        <DotGrid
          dotSize={14}
          gap={28}
          baseColor="#3b1f6e"
          activeColor="#a78bfa"
          proximity={140}
          speedTrigger={80}
          shockRadius={220}
          shockStrength={4}
          returnDuration={1.5}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-zinc-950/60 to-zinc-950 pointer-events-none" />

      {/* Content - left aligned, generous spacing */}
      <div className="relative z-10 px-6 sm:px-16 max-w-4xl">
        {/* Status badge */}
        <FadeContent blur={true} duration={800} delay={200}>
          <div className="flex items-center gap-3 mb-12">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
              {t.hero.status}
            </span>
          </div>
        </FadeContent>

        {/* Tagline */}
        <FadeContent blur={true} duration={800} delay={400}>
          <p className="font-mono text-xs uppercase tracking-widest text-violet-400/80 mb-8">
            {t.hero.tagline}
          </p>
        </FadeContent>

        {/* Large name */}
        <div className="mb-6">
          <BlurText
            text="Richardzzz"
            delay={150}
            animateBy="letters"
            direction="top"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.9]"
          />
        </div>

        {/* Description with highlighted phrases */}
        <FadeContent blur={true} duration={1000} delay={1000}>
          <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 max-w-2xl leading-relaxed">
            {t.hero.description1}
            <span className="text-violet-400/80">{t.hero.description2}</span>
            <span className="text-white">{t.hero.description3}</span>
            <span className="text-zinc-500">{t.hero.description4}</span>
          </p>
        </FadeContent>

        {/* Meta info */}
        <FadeContent blur={true} duration={800} delay={1400}>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 text-sm text-zinc-500">
            <span className="font-mono text-xs uppercase tracking-wider">{t.hero.metaRole}</span>
            <span className="text-zinc-700">&middot;</span>
            <span>{t.hero.metaLocation}</span>
          </div>
        </FadeContent>

        {/* CTAs */}
        <FadeContent blur={true} duration={800} delay={1800}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="mailto:Wen314016548@163.com"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-zinc-900 rounded-full font-medium text-sm transition-all duration-300 hover:bg-violet-200 hover:gap-3"
            >
              {t.hero.ctaPrimary}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </a>
            <a
              href="#projects"
              className="px-6 py-3 text-zinc-400 hover:text-white rounded-full font-medium text-sm transition-all duration-300 border border-white/10 hover:border-white/20"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </FadeContent>
      </div>
    </section>
  )
}
