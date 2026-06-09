import BlurText from './BlurText'
import FadeContent from './FadeContent'
import Waves from './Waves'

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Animated waves background - very subtle */}
      <div className="absolute inset-0">
        <Waves
          lineColor="rgba(139, 92, 246, 0.04)"
          backgroundColor="#09090b"
          waveSpeedX={0.015}
          waveSpeedY={0.008}
          waveAmpX={32}
          waveAmpY={16}
          xGap={14}
          yGap={40}
          friction={0.925}
          tension={0.005}
          maxCursorMove={80}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/30 to-zinc-950 pointer-events-none" />

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
              Available &middot; 2026
            </span>
          </div>
        </FadeContent>

        {/* Tagline */}
        <FadeContent blur={true} duration={800} delay={400}>
          <p className="font-mono text-xs uppercase tracking-widest text-violet-400/80 mb-8">
            Backend Developer Engineer
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
            I build robust microservice backends
            <span className="text-violet-400/80">_and explore the frontier of</span>
            <span className="text-white"> LLM enterprise applications</span>
            <span className="text-zinc-500">, with deep expertise in distributed systems and AI-driven architecture.</span>
          </p>
        </FadeContent>

        {/* Meta info */}
        <FadeContent blur={true} duration={800} delay={1400}>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 text-sm text-zinc-500">
            <span className="font-mono text-xs uppercase tracking-wider">Java &amp; LLM</span>
            <span className="text-zinc-700">&middot;</span>
            <span>Remote &middot; Open to opportunities</span>
          </div>
        </FadeContent>

        {/* CTAs */}
        <FadeContent blur={true} duration={800} delay={1800}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="mailto:Wen314016548@163.com"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-zinc-900 rounded-full font-medium text-sm transition-all duration-300 hover:bg-violet-200 hover:gap-3"
            >
              Start a project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </a>
            <a
              href="#projects"
              className="px-6 py-3 text-zinc-400 hover:text-white rounded-full font-medium text-sm transition-all duration-300 border border-white/10 hover:border-white/20"
            >
              See selected work &darr;
            </a>
          </div>
        </FadeContent>
      </div>
    </section>
  )
}
