import { useContext, useEffect } from 'react'
import { LanguageContext, useT } from '../../i18n'
import type { Project } from '../../data/types'
import TextType from '../effects/TextType'

interface ProjectDetailProps {
  project: Project
  onClose: () => void
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const { lang } = useContext(LanguageContext)
  const t = useT()

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const paragraphs = project.longDescription[lang].split('\n\n')

  return (
    <div className="fixed inset-0 z-40 bg-zinc-950 overflow-y-auto">
      {/* Close background */}
      <div className="fixed inset-0 bg-black/80" onClick={onClose} />

      <div className="relative">
        {/* Two-column hero area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[100vh]">
          {/* Left: Images */}
          <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col gap-4 p-4 lg:p-6">
            {/* Top image - largest */}
            <div className="flex-1 min-h-0 rounded-xl overflow-hidden bg-zinc-900 border border-white/[0.05]">
              <div className="w-full h-full bg-gradient-to-br from-violet-600/20 via-indigo-600/10 to-zinc-900 flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center opacity-15">
                  <div className="w-48 h-48 rounded-full border border-white/20" />
                  <div className="absolute w-36 h-36 rounded-full border border-white/10 rotate-45" />
                  <div className="absolute w-24 h-24 rounded-full bg-violet-500/30 blur-3xl" />
                </div>
              </div>
            </div>

            {/* Bottom two images - equal size, side by side */}
            <div className="grid grid-cols-2 gap-4 h-[30%] flex-shrink-0">
              <div className="rounded-xl overflow-hidden bg-zinc-900 border border-white/[0.05]">
                <div className="w-full h-full bg-gradient-to-br from-emerald-600/20 via-teal-600/10 to-zinc-900 flex items-center justify-center">
                  <div className="opacity-15">
                    <div className="w-20 h-20 rounded-full border border-white/20" />
                    <div className="absolute w-14 h-14 rounded-full bg-emerald-500/20 blur-2xl" />
                  </div>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden bg-zinc-900 border border-white/[0.05]">
                <div className="w-full h-full bg-gradient-to-br from-amber-600/20 via-orange-600/10 to-zinc-900 flex items-center justify-center">
                  <div className="opacity-15">
                    <div className="w-20 h-20 rounded-full border border-white/20" />
                    <div className="absolute w-14 h-14 rounded-full bg-amber-500/20 blur-2xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="px-6 sm:px-12 lg:px-16 pt-24 pb-12 lg:py-24 flex flex-col justify-center">
            {/* Return button */}
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 text-sm transition-colors mb-12 w-fit"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              {t.projects.backToProjects}
            </button>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8">
              {project.title[lang]}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs text-zinc-400 border border-white/10 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-2 gap-8 mb-12 pb-12 border-b border-white/[0.06]">
              <div>
                <span className="block text-xs text-zinc-600 font-mono uppercase tracking-wider mb-1">
                  {t.projects.roleLabel}
                </span>
                <span className="text-sm text-zinc-300">{project.role[lang]}</span>
              </div>
              <div>
                <span className="block text-xs text-zinc-600 font-mono uppercase tracking-wider mb-1">
                  {t.projects.clientLabel}
                </span>
                <span className="text-sm text-zinc-300">{project.client[lang]}</span>
              </div>
            </div>

            {/* Long description */}
            <div className="space-y-6">
              {paragraphs.map((para, i) => (
                <p key={i} className="text-zinc-400 text-base leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Highlights section */}
        <div className="border-t border-white/[0.06]">
          <div className="max-w-4xl mx-auto px-6 sm:px-16 py-24 md:py-32">
            <p className="font-mono text-xs uppercase tracking-widest text-violet-400/60 mb-16">
              {lang === 'zh' ? '优化亮点' : 'Highlights'}
            </p>
            <div className="space-y-12">
              {project.highlights[lang].map((highlight, i) => (
                <div key={i} className="flex items-start gap-6">
                  <span className="font-mono text-xs text-zinc-700 tabular-nums pt-1 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <TextType
                    text={highlight}
                    as="p"
                    typingSpeed={40}
                    initialDelay={i * 200}
                    pauseDuration={999999}
                    loop={false}
                    showCursor={false}
                    startOnVisible={true}
                    className="text-lg md:text-xl text-zinc-300 font-medium leading-relaxed"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
