import { useContext, useEffect, useRef, useCallback, useState } from 'react'
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
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const highlightsRef = useRef<HTMLDivElement>(null)
  const targetScroll = useRef(0)
  const currentScroll = useRef(0)
  const rafId = useRef(0)

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Smooth scroll engine with damping
  const lerpScroll = useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return
    currentScroll.current += (targetScroll.current - currentScroll.current) * 0.12
    container.scrollTop = currentScroll.current
    if (Math.abs(targetScroll.current - currentScroll.current) > 0.5) {
      rafId.current = requestAnimationFrame(lerpScroll)
    }
  }, [])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const maxScroll = container.scrollHeight - container.clientHeight
      targetScroll.current = Math.max(0, Math.min(maxScroll, targetScroll.current + e.deltaY))
      currentScroll.current = container.scrollTop
      cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(lerpScroll)
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      container.removeEventListener('wheel', handleWheel)
      cancelAnimationFrame(rafId.current)
    }
  }, [lerpScroll])

  const scrollToHighlights = () => {
    const container = scrollContainerRef.current
    const target = highlightsRef.current
    if (!container || !target) return
    targetScroll.current = target.offsetTop
    currentScroll.current = container.scrollTop
    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(lerpScroll)
  }

  const paragraphs = project.longDescription?.[lang]?.split('\n\n') ?? []
  const images = project.images || []
  const [imageIndex, setImageIndex] = useState(0)

  const goNext = useCallback(() => {
    setImageIndex(prev => (prev < images.length - 1 ? prev + 1 : prev))
  }, [images.length])

  const goPrev = useCallback(() => {
    setImageIndex(prev => (prev > 0 ? prev - 1 : prev))
  }, [])

  // Keyboard: Escape to close, arrows to flip images
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, goPrev, goNext])

  return (
    <div ref={scrollContainerRef} className="fixed inset-0 z-40 bg-zinc-950 overflow-y-auto">
      {/* Close background */}
      <div className="fixed inset-0 bg-black/80" onClick={onClose} />

      <div className="relative">
        {/* Two-column hero area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[100vh]">
          {/* Left: Image Carousel */}
          <div className="lg:sticky lg:top-6 lg:h-screen flex flex-col items-center justify-center p-4 lg:p-6">
            {images.length === 0 ? (
              /* Placeholder when no images */
              <div className="w-full h-[60%] rounded-xl overflow-hidden bg-zinc-900 border border-white/[0.05]">
                <div className="w-full h-full bg-gradient-to-br from-violet-600/20 via-indigo-600/10 to-zinc-900 flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center opacity-15">
                    <div className="w-48 h-48 rounded-full border border-white/20" />
                    <div className="absolute w-36 h-36 rounded-full border border-white/10 rotate-45" />
                    <div className="absolute w-24 h-24 rounded-full bg-violet-500/30 blur-3xl" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-[60%] flex flex-col gap-3 min-h-0">
                {/* Image display */}
                <div className="flex-1 relative rounded-xl overflow-hidden bg-zinc-900 border border-white/[0.05] min-h-0">
                  <img
                    key={imageIndex}
                    src={images[imageIndex]}
                    alt=""
                    className="w-full h-full object-contain animate-in fade-in zoom-in-95 duration-300"
                  />

                  {/* Prev button */}
                  {images.length > 1 && imageIndex > 0 && (
                    <button
                      onClick={goPrev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white/70 hover:text-white transition-colors"
                      aria-label="Previous image"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>
                  )}

                  {/* Next button */}
                  {images.length > 1 && imageIndex < images.length - 1 && (
                    <button
                      onClick={goNext}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white/70 hover:text-white transition-colors"
                      aria-label="Next image"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Pagination dots */}
                {images.length > 1 && (
                  <div className="flex items-center justify-center gap-2">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImageIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          i === imageIndex
                            ? 'bg-violet-400 w-6'
                            : 'bg-zinc-600 hover:bg-zinc-500'
                        }`}
                        aria-label={`Image ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
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
                <span className="text-sm text-zinc-300">{project.role?.[lang]}</span>
              </div>
              <div>
                <span className="block text-xs text-zinc-600 font-mono uppercase tracking-wider mb-1">
                  {t.projects.clientLabel}
                </span>
                <span className="text-sm text-zinc-300">{project.client?.[lang]}</span>
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

        {/* Scroll-down indicator */}
        <div className="relative -mt-20 pb-8 flex justify-end px-6 sm:px-16 pointer-events-none">
          <button
            onClick={scrollToHighlights}
            className="pointer-events-auto group flex flex-col items-center gap-2 text-zinc-600 hover:text-violet-400 transition-colors duration-300"
            aria-label="Scroll to highlights"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest">
              {lang === 'zh' ? '查看亮点' : 'Highlights'}
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-bounce"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </button>
        </div>

        {/* Highlights section */}
        <div ref={highlightsRef} className="border-t border-white/[0.06]">
          <div className="max-w-4xl mx-auto px-6 sm:px-16 py-24 md:py-32">
            <p className="font-mono text-xs uppercase tracking-widest text-violet-400/60 mb-16">
              {lang === 'zh' ? '优化亮点' : 'Highlights'}
            </p>
            <div className="space-y-12">
              {project.highlights?.[lang]?.map((highlight, i) => (
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
