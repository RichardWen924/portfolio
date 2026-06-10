import { useState, useEffect, useRef, useCallback } from 'react'

// Inject flipIn keyframes once at module level
if (typeof document !== 'undefined' && !document.getElementById('fliptext-keyframes')) {
  const style = document.createElement('style')
  style.id = 'fliptext-keyframes'
  style.textContent = `
    @keyframes flipIn {
      0% { transform: rotateX(90deg); opacity: 0; }
      100% { transform: rotateX(0deg); opacity: 1; }
    }
  `
  document.head.appendChild(style)
}

interface FlipTextProps {
  text: string
  delay?: number
  charDuration?: number
  className?: string
  trigger?: 'mount' | 'view'
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export default function FlipText({
  text,
  delay = 0,
  charDuration = 60,
  className = '',
  trigger = 'view',
}: FlipTextProps) {
  const [started, setStarted] = useState(trigger === 'mount')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (trigger !== 'view') return
    const el = containerRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [trigger])

  return (
    <div ref={containerRef} className={className} aria-label={text}>
      {text.split('').map((targetChar, i) => (
        <FlipChar
          key={i}
          targetChar={targetChar}
          delay={delay + i * charDuration}
          active={started}
        />
      ))}
    </div>
  )
}

function FlipChar({
  targetChar,
  delay,
  active,
}: {
  targetChar: string
  delay: number
  active: boolean
}) {
  const [currentChar, setCurrentChar] = useState(() =>
    active ? targetChar : CHARS[Math.floor(Math.random() * CHARS.length)]
  )
  const [flipping, setFlipping] = useState(false)
  const timerRef = useRef<number | null>(null)
  const hasArrived = useRef(false)

  const startFlipSequence = useCallback((finalChar: string) => {
    let steps = 0
    const maxSteps = 8 + Math.floor(Math.random() * 6)

    function tick() {
      if (steps >= maxSteps) {
        setCurrentChar(finalChar)
        setFlipping(false)
        timerRef.current = null
        return
      }
      setFlipping(true)
      if (steps < maxSteps - 2) {
        setCurrentChar(CHARS[Math.floor(Math.random() * CHARS.length)])
      } else {
        setCurrentChar(finalChar)
      }
      steps++
      timerRef.current = window.setTimeout(tick, 80 + steps * 20)
    }

    tick()
  }, [])

  useEffect(() => {
    if (!active) return
    if (hasArrived.current) return

    const timeout = setTimeout(() => {
      hasArrived.current = true
      startFlipSequence(targetChar)
    }, delay)

    return () => {
      clearTimeout(timeout)
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [active, delay, targetChar, startFlipSequence])

  if (targetChar === ' ') {
    return <span className="inline-block w-[0.3em]">&nbsp;</span>
  }

  return (
    <span
      className="inline-block"
      style={{
        perspective: '200px',
        verticalAlign: 'bottom',
      }}
    >
      <span
        className="inline-block"
        style={{
          animation: flipping ? 'flipIn 0.15s ease-out' : 'none',
        }}
      >
        {currentChar}
      </span>
    </span>
  )
}
