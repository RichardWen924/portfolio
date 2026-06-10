import { useRef, useEffect, useCallback, useMemo } from 'react'
import './ProfileCard.css'

const DEFAULT_INNER_GRADIENT = 'linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)'

const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
  ENTER_TRANSITION_MS: 180,
}

const clamp = (v: number, min = 0, max = 100) => Math.min(Math.max(v, min), max)
const round = (v: number, precision = 3) => parseFloat(v.toFixed(precision))

interface ProfileCardProps {
  avatarUrl?: string
  iconUrl?: string
  grainUrl?: string
  innerGradient?: string
  behindGlowEnabled?: boolean
  behindGlowColor?: string
  behindGlowSize?: string
  name?: string
  title?: string
  handle?: string
  status?: string
  contactText?: string
  showUserInfo?: boolean
  enableTilt?: boolean
  enableMobileTilt?: boolean
  mobileTiltSensitivity?: number
  miniAvatarUrl?: string
  onContactClick?: () => void
  className?: string
}

export default function ProfileCard({
  avatarUrl = '',
  iconUrl = '',
  grainUrl = '',
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor,
  behindGlowSize,
  name = '',
  title = '',
  handle = '',
  status = 'Online',
  contactText = 'Contact',
  showUserInfo = true,
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  miniAvatarUrl,
  onContactClick,
  className = '',
}: ProfileCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const shellRef = useRef<HTMLDivElement>(null)
  const enterTimerRef = useRef<number | null>(null)
  const leaveRafRef = useRef<number | null>(null)
  const tiltRef = useRef<TiltEngine | null>(null)

  // Tilt engine
  class TiltEngine {
    rafId: number | null = null
    running = false
    lastTs = 0
    currentX = 0
    currentY = 0
    targetX = 0
    targetY = 0
    initialUntil = 0

    setVars(x: number, y: number) {
      const shell = shellRef.current
      const wrap = wrapRef.current
      if (!shell || !wrap) return

      const width = shell.clientWidth || 1
      const height = shell.clientHeight || 1
      const percentX = clamp((100 / width) * x)
      const percentY = clamp((100 / height) * y)
      const centerX = percentX - 50
      const centerY = percentY - 50

      wrap.style.setProperty('--pointer-x', `${percentX}%`)
      wrap.style.setProperty('--pointer-y', `${percentY}%`)
      wrap.style.setProperty('--background-x', `${35 + (percentX / 100) * 30}%`)
      wrap.style.setProperty('--background-y', `${35 + (percentY / 100) * 30}%`)
      wrap.style.setProperty('--pointer-from-center', `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`)
      wrap.style.setProperty('--pointer-from-top', `${percentY / 100}`)
      wrap.style.setProperty('--pointer-from-left', `${percentX / 100}`)
      wrap.style.setProperty('--rotate-x', `${round(-(centerX / 5))}deg`)
      wrap.style.setProperty('--rotate-y', `${round(centerY / 4)}deg`)
    }

    step = (ts: number) => {
      if (!this.running) return
      if (this.lastTs === 0) this.lastTs = ts
      const dt = (ts - this.lastTs) / 1000
      this.lastTs = ts

      const tau = ts < this.initialUntil ? 0.6 : 0.14
      const k = 1 - Math.exp(-dt / tau)

      this.currentX += (this.targetX - this.currentX) * k
      this.currentY += (this.targetY - this.currentY) * k

      this.setVars(this.currentX, this.currentY)

      const stillFar = Math.abs(this.targetX - this.currentX) > 0.05 || Math.abs(this.targetY - this.currentY) > 0.05

      if (stillFar || document.hasFocus()) {
        this.rafId = requestAnimationFrame(this.step)
      } else {
        this.running = false
        this.lastTs = 0
        if (this.rafId) { cancelAnimationFrame(this.rafId); this.rafId = null }
      }
    }

    start() {
      if (this.running) return
      this.running = true
      this.lastTs = 0
      this.rafId = requestAnimationFrame(this.step)
    }

    setImmediate(x: number, y: number) {
      this.currentX = x; this.currentY = y
      this.setVars(x, y)
    }

    setTarget(x: number, y: number) {
      this.targetX = x; this.targetY = y
      this.start()
    }

    toCenter() {
      const shell = shellRef.current
      if (!shell) return
      this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2)
    }

    beginInitial(durationMs: number) {
      this.initialUntil = performance.now() + durationMs
      this.start()
    }

    getCurrent() { return { x: this.currentX, y: this.currentY, tx: this.targetX, ty: this.targetY } }

    cancel() {
      if (this.rafId) cancelAnimationFrame(this.rafId)
      this.rafId = null; this.running = false; this.lastTs = 0
    }
  }

  const getOffsets = (evt: PointerEvent, el: HTMLElement) => {
    const rect = el.getBoundingClientRect()
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top }
  }

  const handlePointerMove = useCallback((event: PointerEvent) => {
    const shell = shellRef.current; const engine = tiltRef.current
    if (!shell || !engine) return
    const { x, y } = getOffsets(event, shell)
    engine.setTarget(x, y)
  }, [])

  const handlePointerEnter = useCallback((event: PointerEvent) => {
    const shell = shellRef.current; const engine = tiltRef.current
    if (!shell || !engine) return
    shell.classList.add('active', 'entering')
    if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current)
    enterTimerRef.current = window.setTimeout(() => shell.classList.remove('entering'), ANIMATION_CONFIG.ENTER_TRANSITION_MS)
    const { x, y } = getOffsets(event, shell)
    engine.setTarget(x, y)
  }, [])

  const handlePointerLeave = useCallback(() => {
    const shell = shellRef.current; const engine = tiltRef.current
    if (!shell || !engine) return
    engine.toCenter()
    const checkSettle = () => {
      const { x, y, tx, ty } = engine.getCurrent()
      if (Math.hypot(tx - x, ty - y) < 0.6) {
        shell.classList.remove('active')
        leaveRafRef.current = null
      } else {
        leaveRafRef.current = requestAnimationFrame(checkSettle)
      }
    }
    if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current)
    leaveRafRef.current = requestAnimationFrame(checkSettle)
  }, [])

  const handleDeviceOrientation = useCallback((event: DeviceOrientationEvent) => {
    const shell = shellRef.current; const engine = tiltRef.current
    if (!shell || !engine) return
    const { beta, gamma } = event
    if (beta == null || gamma == null) return
    const cx = shell.clientWidth / 2; const cy = shell.clientHeight / 2
    engine.setTarget(
      clamp(cx + gamma * mobileTiltSensitivity, 0, shell.clientWidth),
      clamp(cy + (beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET) * mobileTiltSensitivity, 0, shell.clientHeight),
    )
  }, [mobileTiltSensitivity])

  useEffect(() => {
    if (!enableTilt) return
    const engine = new TiltEngine()
    tiltRef.current = engine

    const shell = shellRef.current
    if (!shell) return

    shell.addEventListener('pointerenter', handlePointerEnter)
    shell.addEventListener('pointermove', handlePointerMove)
    shell.addEventListener('pointerleave', handlePointerLeave)

    const handleClick = () => {
      if (!enableMobileTilt || location.protocol !== 'https:') return
      if (typeof (DeviceMotionEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === 'function') {
        ;(DeviceMotionEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission()
          .then(state => { if (state === 'granted') window.addEventListener('deviceorientation', handleDeviceOrientation) })
          .catch(console.error)
      } else {
        window.addEventListener('deviceorientation', handleDeviceOrientation)
      }
    }
    shell.addEventListener('click', handleClick)

    const initialX = (shell.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET
    engine.setImmediate(initialX, initialY)
    engine.toCenter()
    engine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION)

    return () => {
      shell.removeEventListener('pointerenter', handlePointerEnter)
      shell.removeEventListener('pointermove', handlePointerMove)
      shell.removeEventListener('pointerleave', handlePointerLeave)
      shell.removeEventListener('click', handleClick)
      window.removeEventListener('deviceorientation', handleDeviceOrientation)
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current)
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current)
      engine.cancel()
      shell.classList.remove('entering')
    }
  }, [enableTilt, enableMobileTilt, handlePointerMove, handlePointerEnter, handlePointerLeave, handleDeviceOrientation])

  const cardStyle = useMemo(() => ({
    '--icon': iconUrl ? `url(${iconUrl})` : 'none',
    '--grain': grainUrl ? `url(${grainUrl})` : 'none',
    '--inner-gradient': innerGradient ?? DEFAULT_INNER_GRADIENT,
    '--behind-glow-color': behindGlowColor ?? 'rgba(167, 139, 250, 0.5)',
    '--behind-glow-size': behindGlowSize ?? '60%',
  } as React.CSSProperties), [iconUrl, grainUrl, innerGradient, behindGlowColor, behindGlowSize])

  const handleContactClick = useCallback(() => onContactClick?.(), [onContactClick])

  return (
    <div ref={wrapRef} className={`pc-card-wrapper ${className}`.trim()} style={cardStyle}>
      {behindGlowEnabled && <div className="pc-behind" />}
      <div ref={shellRef} className="pc-card-shell">
        <section className="pc-card">
          <div className="pc-inside">
            <div className="pc-shine" />
            <div className="pc-glare" />

            {/* Avatar + user info */}
            <div className="pc-content pc-avatar-content">
              <img
                className="avatar"
                src={avatarUrl || `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="88" height="88" viewBox="0 0 24 24" fill="none" stroke="%2371717a" stroke-width="1"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`)}`}
                alt={`${name || 'User'} avatar`}
                loading="lazy"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
              {showUserInfo && (
                <div className="pc-user-info">
                  <div className="pc-user-details">
                    <div className="pc-mini-avatar">
                      <img
                        src={miniAvatarUrl || avatarUrl}
                        alt=""
                        loading="lazy"
                        onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.5' }}
                      />
                    </div>
                    <div className="pc-user-text">
                      <div className="pc-handle">@{handle}</div>
                      <div className="pc-status">{status}</div>
                    </div>
                  </div>
                  <button
                    className="pc-contact-btn"
                    onClick={handleContactClick}
                    style={{ pointerEvents: 'auto' }}
                    type="button"
                  >
                    {contactText}
                  </button>
                </div>
              )}
            </div>

            {/* Name & title */}
            <div className="pc-content">
              <div className="pc-details">
                <h3>{name}</h3>
                <p>{title}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
