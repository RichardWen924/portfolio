import { useState, useEffect } from 'react'

const STORAGE_KEY = 'visitor_count'
const ADMIN_KEY = 'admin-content-v2'
const SESSION_KEY = 'visitor_session'

export function useVisitorCount(): number {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const alreadyVisited = sessionStorage.getItem(SESSION_KEY)
    const stored = localStorage.getItem(STORAGE_KEY)

    let current: number
    if (stored !== null) {
      current = parseInt(stored, 10) || 0
    } else {
      // Fallback: try to read from admin data store
      try {
        const admin = JSON.parse(localStorage.getItem(ADMIN_KEY) || '{}')
        current = typeof admin.visitorCount === 'number' ? admin.visitorCount : 0
      } catch {
        current = 0
      }
    }

    if (!alreadyVisited) {
      current += 1
      sessionStorage.setItem(SESSION_KEY, '1')
      localStorage.setItem(STORAGE_KEY, String(current))
      // Also update admin data store so it persists with publishes
      try {
        const admin = JSON.parse(localStorage.getItem(ADMIN_KEY) || '{}')
        admin.visitorCount = current
        localStorage.setItem(ADMIN_KEY, JSON.stringify(admin))
      } catch { /* ignore */ }
    }

    setCount(current)
  }, [])

  return count
}
