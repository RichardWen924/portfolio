import { useContext, useMemo } from 'react'
import { LanguageContext } from '../../i18n'
import type { Experience } from '../../data/types'
import FadeContent from './FadeContent'

interface ExperienceTimelineProps {
  experiences: Experience[]
}

function parseDate(dateStr: string): [number, number] {
  const [year, month] = dateStr.split(/[.-]/)
  return [parseInt(year, 10), parseInt(month, 10)]
}

function formatDate(dateStr: string): string {
  const [y, m] = parseDate(dateStr)
  return `${y}.${m}`
}

function formatRange(start: string, end: string | null): string {
  const startFormatted = formatDate(start)
  const endFormatted = end ? formatDate(end) : 'Present'
  return `${startFormatted} \u2014 ${endFormatted}`
}

function toSortKey(dateStr: string): number {
  const [y, m] = parseDate(dateStr)
  return y * 100 + m
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const { lang } = useContext(LanguageContext)

  const sorted = useMemo(() => {
    return [...experiences].sort((a, b) => toSortKey(b.startDate) - toSortKey(a.startDate))
  }, [experiences])

  return (
    <div className="relative border-l border-white/[0.08] ml-6 sm:ml-16 space-y-14 py-2">
      {sorted.map((exp) => (
        <FadeContent key={exp.id} blur={true} duration={600} threshold={0.3}>
          <div className="relative pl-8 sm:pl-12 group">
            {/* 左侧圆点 */}
            <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-zinc-800 bg-violet-400/60 group-hover:bg-violet-400 group-hover:shadow-[0_0_12px_rgba(167,139,250,0.4)] transition-all duration-300" />

            {/* 左侧日期 */}
            <span className="absolute -left-28 sm:-left-36 top-1.5 text-xs font-mono text-zinc-600 tracking-wide whitespace-nowrap hidden sm:block">
              {formatRange(exp.startDate, exp.endDate)}
            </span>

            {/* 内容 */}
            <div>
              {/* 日期（移动端） */}
              <span className="block sm:hidden text-xs font-mono text-zinc-600 tracking-wide mb-2">
                {formatRange(exp.startDate, exp.endDate)}
              </span>

              {/* 职位 */}
              <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-violet-300 transition-colors">
                {exp.role[lang]}
              </h3>

              {/* 公司 */}
              <span className="text-zinc-400 text-sm">{exp.company[lang]}</span>

              {/* 描述 */}
              <p className="mt-3 text-zinc-500 text-sm md:text-base leading-relaxed max-w-2xl">
                {exp.description[lang]}
              </p>
            </div>
          </div>
        </FadeContent>
      ))}
    </div>
  )
}
