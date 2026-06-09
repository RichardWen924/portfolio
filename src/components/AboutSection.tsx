import FadeContent from './FadeContent'
import Counter from './Counter'

const stats = [
  { value: 5, label: 'Years Coding', suffix: '+' },
  { value: 30, label: 'Projects Built', suffix: '+' },
  { value: 10, label: 'Technologies', suffix: '+' },
]

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <FadeContent blur={true} duration={1000}>
          <div className="text-center mb-16">
            <p className="text-violet-400 text-sm font-medium tracking-wider mb-3">ABOUT</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Crafting Code That Matters
            </h2>
          </div>
        </FadeContent>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Bio */}
          <FadeContent blur={true} duration={1000} delay={200}>
            <div className="space-y-4">
              <p className="text-zinc-400 text-lg leading-relaxed">
                I&apos;m a backend developer passionate about designing scalable, high-performance
                systems. With deep expertise in Java ecosystem and Spring Boot, I build
                microservices that power modern enterprise applications.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Currently diving into the world of Large Language Models, exploring how AI agents
                can transform traditional backend architectures. I believe the future of software
                lies at the intersection of robust engineering and intelligent automation.
              </p>
              <p className="text-zinc-500 text-base leading-relaxed">
                Open to discussing microservice architecture, LLM applications, and all things
                backend. Let&apos;s build something great together.
              </p>
            </div>
          </FadeContent>

          {/* Stats */}
          <FadeContent blur={true} duration={1000} delay={400}>
            <div className="grid grid-cols-3 gap-4">
              {stats.map(stat => (
                <div
                  key={stat.label}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 text-center hover:bg-white/[0.05] transition-colors"
                >
                  <div className="text-violet-400 text-3xl md:text-4xl font-bold tracking-tight mb-1">
                    <Counter
                      value={stat.value}
                      fontSize={36}
                      padding={4}
                      textColor="#a78bfa"
                      fontWeight="700"
                      gradientFrom="rgba(9,9,11,1)"
                      gradientTo="rgba(9,9,11,0)"
                      gradientHeight={12}
                    />
                    <span className="text-violet-400">{stat.suffix}</span>
                  </div>
                  <p className="text-zinc-500 text-xs md:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeContent>
        </div>
      </div>
    </section>
  )
}
