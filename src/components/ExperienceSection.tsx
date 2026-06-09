import FadeContent from './FadeContent'

const experiences = [
  {
    role: 'Backend Developer Engineer',
    company: 'Enterprise Applications',
    date: '2022 — Present',
    description:
      'Designing and developing scalable microservice architectures with Java and Spring Boot. Leading LLM integration initiatives for enterprise applications, building AI-powered Agent systems that transform traditional backend workflows.',
  },
  {
    role: 'Java Backend Developer',
    company: 'Distributed Systems',
    date: '2021 — 2022',
    description:
      'Built high-throughput data pipelines processing millions of daily events using Kafka and Redis. Implemented rate limiting, circuit breaker patterns, and intelligent routing for API gateway services.',
  },
  {
    role: 'Software Developer',
    company: 'Full-Stack Development',
    date: '2020 — 2021',
    description:
      'Developed full-stack web applications with Vue.js frontends and Spring Boot backends. Worked with MySQL, PostgreSQL, and MongoDB for data persistence across multiple projects.',
  },
]

const education = {
  school: 'Nanchang University',
  degree: 'B.E. Software Engineering',
  date: '2018 — 2022',
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 md:py-32 px-6 sm:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <FadeContent blur={true} duration={800}>
          <div className="flex items-center gap-4 mb-16">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-violet-400/60 flex-shrink-0">
              <circle cx="12" cy="12" r="3" fill="currentColor" />
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
              <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
            </svg>
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">03 / Experience</span>
          </div>
        </FadeContent>

        {/* Section heading */}
        <FadeContent blur={true} duration={1000}>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Where I&apos;ve worked
          </h2>
          <p className="text-zinc-500 text-base md:text-lg max-w-xl mb-16">
            Four years of experience building backend systems, from distributed microservices to LLM-powered enterprise applications.
          </p>
        </FadeContent>

        {/* Experience list */}
        <div className="space-y-10">
          {experiences.map((exp, i) => (
            <FadeContent key={i} blur={true} duration={800} delay={200 + i * 150}>
              <div className="group">
                {/* Role */}
                <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                  {exp.role}
                </h3>

                {/* Company · Date */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
                  <span className="text-zinc-400 text-sm">
                    {exp.company}
                  </span>
                  <span className="text-zinc-700">&middot;</span>
                  <span className="font-mono text-xs text-zinc-500 tracking-wide">
                    {exp.date}
                  </span>
                </div>

                {/* Description */}
                <p className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-2xl">
                  {exp.description}
                </p>
              </div>
            </FadeContent>
          ))}
        </div>

        {/* Education */}
        <FadeContent blur={true} duration={800} delay={800}>
          <div className="mt-16 pt-10 border-t border-white/[0.06]">
            <h3 className="text-lg md:text-xl font-bold text-white mb-1">
              {education.school}
            </h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-zinc-400 text-sm">
                {education.degree}
              </span>
              <span className="text-zinc-700">&middot;</span>
              <span className="font-mono text-xs text-zinc-500 tracking-wide">
                {education.date}
              </span>
            </div>
          </div>
        </FadeContent>
      </div>
    </section>
  )
}
