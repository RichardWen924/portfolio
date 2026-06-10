import { useRef, useEffect } from 'react'

interface LetterGlitchProps {
  glitchSpeed?: number
  centerVignette?: boolean
  outerVignette?: boolean
  smooth?: boolean
  speed?: number
  colors?: string[]
  showCenterVignette?: boolean
  showOuterVignette?: boolean
}

export default function LetterGlitch({
  glitchSpeed = 50,
  centerVignette = true,
  outerVignette = false,
  smooth = false,
  speed = 10,
  colors = ['#2b4539', '#61dca3', '#61b3dc'],
}: LetterGlitchProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>?/\\|{}[]+=~^'
    const fontSize = 14
    let columns = 0
    let rows = 0
    let grid: { char: string; opacity: number; color: string; nextChange: number }[] = []

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      columns = Math.ceil(canvas.width / fontSize)
      rows = Math.ceil(canvas.height / fontSize)
      grid = Array.from({ length: columns * rows }, () => ({
        char: chars[Math.floor(Math.random() * chars.length)],
        opacity: Math.random() * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        nextChange: performance.now() + Math.random() * glitchSpeed * 10,
      }))
    }

    resize()
    window.addEventListener('resize', resize)

    let animId: number

    function draw(now: number) {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw grid
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          const i = row * columns + col
          const cell = grid[i]
          if (!cell) continue

          // Randomly change characters
          if (now >= cell.nextChange) {
            cell.char = chars[Math.floor(Math.random() * chars.length)]
            cell.opacity = 0.05 + Math.random() * 0.25
            cell.color = colors[Math.floor(Math.random() * colors.length)]
            cell.nextChange = now + (Math.random() * glitchSpeed * 20)
          }

          const x = col * fontSize
          const y = row * fontSize

          ctx.font = `${fontSize}px monospace`
          ctx.fillStyle = cell.color

          // Apply vignette
          let vignetteFactor = 1
          const cx = canvas.width / 2
          const cy = canvas.height / 2
          const maxDist = Math.sqrt(cx * cx + cy * cy)
          const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2)
          const nd = dist / maxDist

          if (centerVignette) {
            vignetteFactor = 1 - nd * 0.7
          }
          if (outerVignette) {
            vignetteFactor = nd * 0.7
          }

          ctx.globalAlpha = cell.opacity * vignetteFactor
          ctx.fillText(cell.char, x, y + fontSize * 0.8)
          ctx.globalAlpha = 1
        }
      }

      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [glitchSpeed, centerVignette, outerVignette, colors, speed, smooth])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}
