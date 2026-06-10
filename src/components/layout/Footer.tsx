import { useT } from '../../i18n'
import DecryptedText from '../effects/DecryptedText'
import CircularText from '../effects/CircularText'
import LetterGlitch from '../effects/LetterGlitch'

export default function Footer() {
  const t = useT()
  const currentYear = new Date().getFullYear()

  return (
    <footer
      id="contact"
      className="snap-section relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 border-t border-white/[0.04] overflow-hidden"
      style={{
        scrollSnapAlign: 'start',
      }}
    >
      <LetterGlitch
        glitchSpeed={50}
        centerVignette={true}
        outerVignette={false}
        smooth
        speed={10}
        colors={['#2b4539', '#61dca3', '#61b3dc']}
        showCenterVignette
        showOuterVignette={false}
      />

      <div className="relative z-10 flex flex-col items-center gap-12">
        {/* Section ID */}
        <span className="font-mono text-xs uppercase tracking-widest text-zinc-600">
          {t.footer.sectionId}
        </span>

        {/* Main heading - Decrypted Text */}
        <DecryptedText
          text="Work Together"
          speed={80}
          maxIterations={8}
          sequential={true}
          revealDirection="start"
          animateOn="view"
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white"
          encryptedClassName="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-zinc-700"
          parentClassName="text-center"
        />

        {/* Circular rotating text */}
        <div className="flex items-center justify-center">
          <CircularText
            text="CREATIVE  COOPERATIVE  CREATIVE  COOPERATIVE  "
            spinDuration={20}
            onHover="speedUp"
          />
        </div>

        {/* Sub description */}
        <p className="text-zinc-500 text-base md:text-lg max-w-md text-center leading-relaxed">
          {t.footer.subDescription}
        </p>

        {/* Contact links */}
        <div className="flex items-center justify-center gap-5">
          <a
            href="https://github.com/RichardWen924"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-4 bg-white/[0.03] hover:bg-violet-500/10 text-zinc-500 hover:text-violet-400 rounded-full transition-all duration-500 border border-white/[0.06] hover:border-violet-500/20"
            aria-label={t.footer.ariaGithub}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="mailto:Wen314016548@163.com"
            className="group relative p-4 bg-white/[0.03] hover:bg-violet-500/10 text-zinc-500 hover:text-violet-400 rounded-full transition-all duration-500 border border-white/[0.06] hover:border-violet-500/20"
            aria-label={t.footer.ariaEmail}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-zinc-700 text-xs">
          &copy; {currentYear} {t.footer.copyright}
        </p>
      </div>
    </footer>
  )
}
