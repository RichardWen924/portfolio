import { useContext, useEffect } from 'react'
import { LanguageContext, useT } from '../../i18n'
import type { Project } from '../../data/types'

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
          {/* Left: Hero image area */}
          <div className="relative h-[50vh] lg:h-auto lg:sticky lg:top-0">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 via-indigo-600/20 to-zinc-950" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-zinc-950" />
            {/* Abstract geometric decoration */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="w-64 h-64 rounded-full border border-white/10" />
              <div className="absolute w-48 h-48 rounded-full border border-white/10 rotate-45" />
              <div className="absolute w-32 h-32 rounded-full bg-violet-500/20 blur-3xl" />
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

        {/* Additional image placeholders */}
        <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-16 py-16 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-zinc-900 border border-white/[0.05]">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-teal-600/5 to-zinc-900" />
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <div className="w-40 h-40 rounded-full border border-white/20" />
                <div className="absolute w-28 h-28 rounded-full bg-emerald-500/20 blur-2xl" />
              </div>
            </div>
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-zinc-900 border border-white/[0.05]">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-orange-600/5 to-zinc-900" />
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <div className="w-40 h-40 rounded-full border border-white/20" />
                <div className="absolute w-28 h-28 rounded-full bg-amber-500/20 blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
