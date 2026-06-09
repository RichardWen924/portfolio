import BlurText from './BlurText'
import FadeContent from './FadeContent'
import Waves from './Waves'

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated waves background */}
      <div className="absolute inset-0">
        <Waves
          lineColor="rgba(139, 92, 246, 0.07)"
          backgroundColor="#09090b"
          waveSpeedX={0.02}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          xGap={12}
          yGap={36}
          friction={0.925}
          tension={0.005}
          maxCursorMove={120}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/50 to-zinc-950 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <FadeContent blur={true} duration={1000} delay={300}>
          <p className="text-violet-400 text-sm md:text-base font-medium tracking-wider mb-6">
            HELLO, I&apos;M
          </p>
        </FadeContent>

        <BlurText
          text="Richardzzz"
          delay={150}
          animateBy="letters"
          direction="top"
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6"
        />

        <FadeContent blur={true} duration={1000} delay={1200}>
          <p className="text-zinc-400 text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed">
            Backend Developer Engineer &mdash; Java &amp; LLM
          </p>
        </FadeContent>

        <FadeContent blur={true} duration={1000} delay={1800}>
          <p className="text-zinc-500 text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed">
            Building robust microservice backends and exploring the frontier of LLM enterprise applications.
          </p>
        </FadeContent>

        <FadeContent blur={true} duration={1000} delay={2400}>
          <div className="mt-10 flex items-center justify-center gap-4">
            <a
              href="#projects"
              className="px-6 py-3 bg-violet-500 hover:bg-violet-400 text-white rounded-full font-medium transition-all duration-300 shadow-lg shadow-violet-500/25 hover:shadow-violet-400/30"
            >
              View Projects
            </a>
            <a
              href="#about"
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-zinc-300 rounded-full font-medium transition-all duration-300 border border-white/10"
            >
              About Me
            </a>
          </div>
        </FadeContent>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-600">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </div>
    </section>
  )
}
