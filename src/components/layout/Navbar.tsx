import { useState, useEffect, useContext } from 'react'
import CountUp from '../effects/CountUp'
import { useVisitorCount } from '../../hooks/useVisitorCount'
import { useT, LanguageContext } from '../../i18n'

const navHrefs = ['#about', '#experience', '#skills', '#projects', '#contact']

export default function Navbar() {
  const t = useT()
  const { lang, toggleLang } = useContext(LanguageContext)
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const visitorCount = useVisitorCount()

  const navItems = [
    { label: t.nav.about, href: navHrefs[0] },
    { label: t.nav.experience, href: navHrefs[1] },
    { label: t.nav.skills, href: navHrefs[2] },
    { label: t.nav.projects, href: navHrefs[3] },
    { label: t.nav.contact, href: navHrefs[4] },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = navHrefs.map(href => document.querySelector(href))
      const scrollPos = window.scrollY + 100
      sections.forEach((section, i) => {
        if (section) {
          const top = (section as HTMLElement).offsetTop
          const bottom = top + (section as HTMLElement).offsetHeight
          if (scrollPos >= top && scrollPos < bottom) {
            setActive(navItems[i].label)
          }
        }
      })
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [navItems])

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-950/80 backdrop-blur-lg border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-16 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="text-base font-semibold tracking-tight text-white hover:text-violet-400 transition-colors"
        >
          Richardzzz
        </a>

        {/* Nav links - minimal text style */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <a
              key={item.label}
              href={item.href}
              className={`text-xs uppercase tracking-widest transition-colors duration-300 ${
                active === item.label
                  ? 'text-violet-400'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {item.label}
            </a>
          ))}

          {/* Visitor count */}
          <span className="text-zinc-700 select-none">&middot;</span>
          <CountUp
            from={0}
            to={visitorCount}
            delay={0.5}
            duration={3}
            separator=","
            className="font-mono text-xs text-zinc-600 tabular-nums"
          />

          {/* Language toggle */}
          <span className="text-zinc-700 select-none">&middot;</span>
          <button
            onClick={toggleLang}
            className="font-mono text-xs text-zinc-500 hover:text-violet-400 transition-colors"
          >
            {lang === 'en' ? '中文' : 'EN'}
          </button>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <MobileMenu active={active} navItems={navItems} t={t} />
        </div>
      </div>
    </nav>
  )
}

function MobileMenu({ active, navItems, t }: { active: string; navItems: { label: string; href: string }[]; t: ReturnType<typeof useT> }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-zinc-400 hover:text-white"
        aria-label={t.nav.toggleMenu}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M3 4h18M3 12h18M3 20h18" />
          )}
        </svg>
      </button>
      {open && (
        <div className="absolute top-full right-6 mt-2 bg-zinc-900 border border-white/[0.06] py-3 px-5 shadow-2xl">
          {navItems.map(item => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block py-2 text-xs uppercase tracking-widest transition-colors ${
                active === item.label
                  ? 'text-violet-400'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </>
  )
}
