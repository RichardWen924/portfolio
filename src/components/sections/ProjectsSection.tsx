import { useContext, useState } from 'react'
import { useT, LanguageContext } from '../../i18n'
import { useProjects } from '../../data/loader'
import type { Project } from '../../data/types'
import FadeContent from '../effects/FadeContent'
import ProjectDetail from '../effects/ProjectDetail'

export default function ProjectsSection() {
  const t = useT()
  const { lang } = useContext(LanguageContext)
  const projects = useProjects()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="projects" className="relative pt-6 pb-16 md:pt-8 md:pb-20 px-6 sm:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <FadeContent blur={true} duration={800}>
          <div className="flex items-center gap-4 mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-violet-400/60 flex-shrink-0">
              <circle cx="12" cy="12" r="3" fill="currentColor" />
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
              <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
            </svg>
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">{t.projects.sectionId}</span>
          </div>
        </FadeContent>

        {/* Section heading */}
        <FadeContent blur={true} duration={1000}>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2">
            {t.projects.heading}
          </h2>
          <p className="text-zinc-500 text-base md:text-lg max-w-xl mb-6">
            {t.projects.subDescription}
          </p>
        </FadeContent>

        {/* Flat project list */}
        <div>
          {projects.map((project, i) => (
            <FadeContent key={project.id} blur={true} duration={800} delay={200 + i * 150}>
              <button
                onClick={() => setSelectedProject(project)}
                className="group block w-full text-left py-6 border-t border-white/[0.06] hover:border-white/[0.12] transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-8">
                  {/* Number */}
                  <span className="font-mono text-xs text-zinc-600 tabular-nums pt-1 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Category */}
                    <span className="font-mono text-xs uppercase tracking-wider text-violet-400/80">
                      {project.category[lang]}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-white mt-2 mb-2 group-hover:text-violet-300 transition-colors">
                      {project.title[lang]}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-xl">
                      {project.description[lang]}
                    </p>

                    {/* Tags + CTA */}
                    <div className="flex flex-wrap items-center gap-3 mt-4">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-xs text-zinc-600"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 0 && (
                        <span className="text-zinc-700">&middot;</span>
                      )}
                      <span className="text-xs text-zinc-500">
                        {project.attribution[lang]}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-zinc-600 group-hover:text-violet-400/80 transition-colors ml-auto opacity-0 group-hover:opacity-100">
                        {t.projects.viewProject}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                          <path d="M7 17l9.2-9.2M17 17V7H7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </FadeContent>
          ))}
        </div>

        {/* Bottom divider */}
        <div className="border-t border-white/[0.06]" />
      </div>

      {/* Project detail overlay */}
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}
