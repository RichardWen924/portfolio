import FadeContent from './FadeContent'
import SpotlightCard from './SpotlightCard'

const projects = [
  {
    category: 'Backend & LLM',
    title: 'LLM Agent Platform',
    description: 'Enterprise-grade platform for building and deploying LLM-powered agents with seamless integration into existing microservice ecosystems.',
    attribution: 'Internal · Personal Project',
    tags: ['Java', 'Spring Boot', 'LLM', 'Kafka'],
    href: 'https://github.com/RichardWen924',
  },
  {
    category: 'Distributed Systems',
    title: 'Microservice Gateway',
    description: 'High-performance API gateway with intelligent routing, rate limiting, and circuit breaker patterns for distributed backend systems.',
    attribution: 'Internal · Personal Project',
    tags: ['Spring Cloud', 'Redis', 'Docker', 'Nginx'],
    href: 'https://github.com/RichardWen924',
  },
  {
    category: 'Data Engineering',
    title: 'Real-time Data Pipeline',
    description: 'Streaming data processing pipeline handling millions of events per day with exactly-once semantics and fault tolerance.',
    attribution: 'Internal · Personal Project',
    tags: ['Kafka', 'PostgreSQL', 'MongoDB', 'Python'],
    href: 'https://github.com/RichardWen924',
  },
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 md:py-32 px-6 sm:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Decorative divider */}
        <FadeContent blur={true} duration={800}>
          <div className="flex items-center gap-4 mb-12">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-violet-400/60">
              <circle cx="12" cy="12" r="3" fill="currentColor" />
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
              <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
            </svg>
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">02 / Selected Work</span>
          </div>
        </FadeContent>

        {/* Section heading */}
        <FadeContent blur={true} duration={1000}>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Things I&apos;ve built
          </h2>
          <p className="text-zinc-500 text-lg max-w-xl mb-16">
            A selection of projects showcasing backend architecture, distributed systems, and LLM integration.
          </p>
        </FadeContent>

        {/* Project cards - vertical stack with numbered badges */}
        <div className="space-y-6">
          {projects.map((project, i) => (
            <FadeContent key={project.title} blur={true} duration={800} delay={200 + i * 150}>
              <SpotlightCard
                className="group rounded-2xl"
                spotlightColor="rgba(139, 92, 246, 0.1)"
              >
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-white/[0.06] rounded-2xl hover:border-white/[0.12] transition-colors"
                >
                  <div className="flex gap-6 p-6 sm:p-8">
                    {/* Number badge */}
                    <div className="hidden sm:flex flex-shrink-0 w-12 h-12 items-center justify-center rounded-full bg-white/[0.03] border border-white/[0.06]">
                      <span className="font-mono text-xs text-zinc-500 tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Category + attribution */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3">
                        <span className="font-mono text-xs uppercase tracking-wider text-violet-400/80">
                          {project.category}
                        </span>
                        <span className="text-zinc-700 text-xs hidden sm:inline">&middot;</span>
                        <span className="text-zinc-600 text-xs hidden sm:inline">
                          {project.attribution}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-4 max-w-2xl">
                        {project.description}
                      </p>

                      {/* Tags + CTA */}
                      <div className="flex flex-wrap items-center gap-3">
                        {project.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-xs px-2.5 py-1 bg-white/[0.03] text-zinc-400 rounded-full border border-white/[0.06]"
                          >
                            {tag}
                          </span>
                        ))}
                        <span className="inline-flex items-center gap-1 text-xs text-zinc-600 group-hover:text-violet-400/80 transition-colors ml-auto">
                          View project
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                            <path d="M7 17l9.2-9.2M17 17V7H7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </SpotlightCard>
            </FadeContent>
          ))}
        </div>
      </div>
    </section>
  )
}
