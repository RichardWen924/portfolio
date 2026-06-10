import { useT } from '../../i18n'
import FadeContent from '../effects/FadeContent'
import LogoLoop from '../effects/LogoLoop'
import {
  SiOpenjdk, SiSpringboot, SiPython, SiVuedotjs,
  SiMysql, SiPostgresql, SiMongodb, SiRedis,
  SiApachekafka, SiRabbitmq, SiDocker, SiNginx,
  SiGit, SiPostman, SiOllama, SiKibana,
} from 'react-icons/si'

const backendTech = [
  { node: <SiOpenjdk />, title: 'Java', href: 'https://www.java.com' },
  { node: <SiSpringboot />, title: 'Spring Boot', href: 'https://spring.io' },
  { node: <SiPython />, title: 'Python', href: 'https://www.python.org' },
  { node: <SiMysql />, title: 'MySQL', href: 'https://www.mysql.com' },
  { node: <SiPostgresql />, title: 'PostgreSQL', href: 'https://www.postgresql.org' },
  { node: <SiMongodb />, title: 'MongoDB', href: 'https://www.mongodb.com' },
  { node: <SiRedis />, title: 'Redis', href: 'https://redis.io' },
  { node: <SiApachekafka />, title: 'Kafka', href: 'https://kafka.apache.org' },
]

const devopsTech = [
  { node: <SiRabbitmq />, title: 'RabbitMQ', href: 'https://www.rabbitmq.com' },
  { node: <SiDocker />, title: 'Docker', href: 'https://www.docker.com' },
  { node: <SiNginx />, title: 'Nginx', href: 'https://nginx.org' },
  { node: <SiGit />, title: 'Git', href: 'https://git-scm.com' },
  { node: <SiPostman />, title: 'Postman', href: 'https://www.postman.com' },
  { node: <SiKibana />, title: 'Kibana', href: 'https://www.elastic.co/kibana' },
  { node: <SiOllama />, title: 'Ollama', href: 'https://ollama.com' },
  { node: <SiVuedotjs />, title: 'Vue.js', href: 'https://vuejs.org' },
]

export default function SkillsSection() {
  const t = useT()

  return (
    <section id="skills" className="relative pt-14 pb-16 md:pt-16 md:pb-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <FadeContent blur={true} duration={1000}>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-violet-400/60 flex-shrink-0">
                <circle cx="12" cy="12" r="3" fill="currentColor" />
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
              </svg>
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">{t.skills.sectionId}</span>
            </div>
            <p className="text-violet-400 text-sm font-medium tracking-wider mb-3">{t.skills.label}</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              {t.skills.heading}
            </h2>
          </div>
        </FadeContent>

        {/* Backend & Databases - fast loop */}
        <FadeContent blur={true} duration={1000} delay={200}>
          <div className="mb-6">
            <p className="text-zinc-500 text-xs font-medium tracking-wider mb-4 text-center">
              {t.skills.category1}
            </p>
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl py-6">
              <LogoLoop
                logos={backendTech}
                speed={60}
                direction="left"
                logoHeight={36}
                gap={56}
                hoverSpeed={0}
                fadeOut
                fadeOutColor="#09090b"
                scaleOnHover
                ariaLabel={t.skills.ariaLabel1}
              />
            </div>
          </div>
        </FadeContent>

        {/* DevOps & Tools - reverse direction */}
        <FadeContent blur={true} duration={1000} delay={400}>
          <div>
            <p className="text-zinc-500 text-xs font-medium tracking-wider mb-4 text-center">
              {t.skills.category2}
            </p>
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl py-6">
              <LogoLoop
                logos={devopsTech}
                speed={50}
                direction="right"
                logoHeight={36}
                gap={56}
                hoverSpeed={0}
                fadeOut
                fadeOutColor="#09090b"
                scaleOnHover
                ariaLabel={t.skills.ariaLabel2}
              />
            </div>
          </div>
        </FadeContent>
      </div>
    </section>
  )
}
