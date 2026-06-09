import FadeContent from './FadeContent'
import SpotlightCard from './SpotlightCard'

const projects = [
  {
    title: 'LLM Agent Platform',
    description: 'An enterprise-grade platform for building and deploying LLM-powered agents with seamless integration into existing microservice ecosystems.',
    tags: ['Java', 'Spring Boot', 'LLM', 'Kafka'],
    href: 'https://github.com/RichardWen924',
  },
  {
    title: 'Microservice Gateway',
    description: 'High-performance API gateway with intelligent routing, rate limiting, and circuit breaker patterns for distributed backend systems.',
    tags: ['Spring Cloud', 'Redis', 'Docker', 'Nginx'],
    href: 'https://github.com/RichardWen924',
  },
  {
    title: 'Real-time Data Pipeline',
    description: 'Streaming data processing pipeline handling millions of events per day with exactly-once semantics and fault tolerance.',
    tags: ['Kafka', 'PostgreSQL', 'MongoDB', 'Python'],
    href: 'https://github.com/RichardWen924',
  },
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeContent blur={true} duration={1000}>
          <div className="text-center mb-16">
            <p className="text-violet-400 text-sm font-medium tracking-wider mb-3">PROJECTS</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Selected Work
            </h2>
          </div>
        </FadeContent>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <FadeContent key={project.title} blur={true} duration={1000} delay={200 + i * 200}>
              <SpotlightCard
                className="h-full rounded-2xl"
                spotlightColor="rgba(139, 92, 246, 0.15)"
              >
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 h-full hover:bg-white/[0.05] transition-colors"
                >
                  <h3 className="text-white text-lg font-semibold mb-3">{project.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 bg-violet-500/10 text-violet-400 rounded-full border border-violet-500/20"
                      >
                        {tag}
                      </span>
                    ))}
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
