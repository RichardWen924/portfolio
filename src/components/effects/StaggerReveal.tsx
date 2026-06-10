import React, { useState, useEffect, useRef } from 'react'

interface StaggerRevealProps {
  children: React.ReactNode
  delayPerItem?: number
  className?: string
}

/**
 * Reveals children one by one with staggered CSS transitions
 * as soon as the container enters the viewport, regardless of
 * whether individual children are above/below the fold.
 */
export default function StaggerReveal({ children, delayPerItem = 150, className = '' }: StaggerRevealProps) {
  const [show, setShow] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true)
          io.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const items = React.Children.toArray(children)

  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <div
          key={i}
          style={{
            opacity: show ? 1 : 0,
            transform: show ? 'translateY(0)' : 'translateY(24px)',
            filter: show ? 'blur(0)' : 'blur(10px)',
            transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * delayPerItem}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * delayPerItem}ms, filter 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * delayPerItem}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
