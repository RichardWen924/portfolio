import { useState, useEffect, useRef } from 'react'

interface FlipTextProps {
  text: string
  /** Delay in ms before animation starts */
  delay?: number
  /** Duration per character in ms */
  charDuration?: number
  className?: string
  /** Animation trigger: 'mount' or 'view' */
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
  const flipRef = useRef<number | null>(null)
  const hasArrived = useRef(false)

  useEffect(() => {
    if (!active) return
    if (hasArrived.current) return

    const timeout = setTimeout(() => {
      hasArrived.current = true
      startFlipSequence()
    }, delay)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, delay])

  function startFlipSequence() {
    let steps = 0
    const maxSteps = 8 + Math.floor(Math.random() * 6)

    function tick() {
      if (steps >= maxSteps) {
        setCurrentChar(targetChar)
        setFlipping(false)
        return
      }
      setFlipping(true)
      // Pick a random char, but on the last few steps, bias toward revealing
      if (steps < maxSteps - 2) {
        setCurrentChar(CHARS[Math.floor(Math.random() * CHARS.length)])
      } else {
        setCurrentChar(targetChar)
      }
      steps++
      flipRef.current = window.setTimeout(tick, 80 + steps * 20)
    }

    tick()
  }

  const isSpace = targetChar === ' '

  if (isSpace) {
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
      <style>{`
        @keyframes flipIn {
          0% { transform: rotateX(90deg); opacity: 0; }
          100% { transform: rotateX(0deg); opacity: 1; }
        }
      `}</style>
    </span>
  )
}
