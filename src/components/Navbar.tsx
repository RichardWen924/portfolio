import { useState, useEffect } from 'react'
import CountUp from './CountUp'
import { useVisitorCount } from '../hooks/useVisitorCount'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [active, setActive] = useState('Home')
  const [scrolled, setScrolled] = useState(false)
  const visitorCount = useVisitorCount()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = navItems.map(item => document.querySelector(item.href))
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
  }, [])

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-zinc-950/80 backdrop-blur-lg border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#home" className="text-lg font-semibold tracking-tight text-violet-400">
          Richardzzz
        </a>
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-zinc-500">
            <CountUp
              from={0}
              to={visitorCount}
              delay={0.5}
              duration={3}
              separator=","
              className="font-mono text-xs text-violet-400/80 tabular-nums"
            />
          </div>
          <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 backdrop-blur-sm">
            {navItems.map(item => (
              <a
                key={item.label}
                href={item.href}
                className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${
                  active === item.label
                    ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/25'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  )
}

function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-zinc-400 hover:text-white"
        aria-label="Toggle menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M3 12h18M3 6h18M3 18h18" />
          )}
        </svg>
      </button>
      {open && (
        <div className="absolute top-full right-4 mt-2 bg-zinc-900 border border-white/10 rounded-2xl p-2 shadow-2xl">
          {navItems.map(item => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-white/5"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </>
  )
}
