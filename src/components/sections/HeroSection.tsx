import { useT } from '../../i18n'
import FadeContent from '../effects/FadeContent'
import DotGrid from '../effects/DotGrid'
import ASCIIText from '../effects/ASCIIText'

export default function HeroSection() {
  const t = useT()

  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden">
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

      {/* Status badge - top left, below navbar */}
      <div className="absolute top-24 left-6 sm:left-16 z-10">
        <FadeContent blur={true} duration={800}>
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
              {t.hero.status}
            </span>
          </div>
        </FadeContent>
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 sm:px-16">
        {/* Tagline above ASCII */}
        <FadeContent blur={true} duration={800} delay={200}>
          <p className="font-mono text-xs uppercase tracking-widest text-violet-400/80 mb-6">
            {t.hero.tagline}
          </p>
        </FadeContent>

        {/* ASCII Text */}
        <div className="relative w-full max-w-2xl h-72 sm:h-80 md:h-96">
          <ASCIIText
            text="HELLO"
            asciiFontSize={10}
            textFontSize={200}
            textColor="#fdf9f3"
            planeBaseHeight={10}
            enableWaves={false}
          />
        </div>

        {/* Welcome text */}
        <FadeContent blur={true} duration={1000} delay={400}>
          <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 font-medium mt-6">
            Welcome to Richard's Portfolio!
          </p>
        </FadeContent>

        {/* CTAs below welcome */}
        <FadeContent blur={true} duration={800} delay={800}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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

        {/* Meta info */}
        <FadeContent blur={true} duration={800} delay={1000}>
          <div className="flex flex-col items-center gap-4 mt-8">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-500">
              <span className="font-mono text-xs uppercase tracking-wider">{t.hero.metaRole}</span>
              <span className="text-zinc-700">&middot;</span>
              <span>{t.hero.metaLocation}</span>
            </div>
            {/* Scroll-down arrow */}
            <div className="flex flex-col items-center gap-1 text-violet-400/60 animate-bounce">
              <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div>
        </FadeContent>
      </div>
    </section>
  )
}
