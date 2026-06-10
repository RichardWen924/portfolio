import { useState, useEffect } from 'react'

const STORAGE_KEY = 'visitor_count'
const ADMIN_KEY = 'admin-content-v2'
const SESSION_KEY = 'visitor_session'
const JSON_URL = import.meta.env.BASE_URL + 'data/visitor-count.json'

function getStoredCount(): number {
  const vc = localStorage.getItem(STORAGE_KEY)
  if (vc !== null) return parseInt(vc, 10) || 0
  return 0
}

function getAdminStoredCount(): number {
  try {
    const admin = JSON.parse(localStorage.getItem(ADMIN_KEY) || '{}')
    return typeof admin.visitorCount === 'number' ? admin.visitorCount : 0
  } catch {
    return 0
  }
}

export function useVisitorCount(): number {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const alreadyVisited = sessionStorage.getItem(SESSION_KEY)

    // 1. Get all local sources
    const stored = getStoredCount()
    const adminStored = getAdminStoredCount()
    let current = Math.max(stored, adminStored)

    if (!alreadyVisited) {
      current += 1
      sessionStorage.setItem(SESSION_KEY, '1')
    }

    setCount(current)

    // Update all local stores
    localStorage.setItem(STORAGE_KEY, String(current))
    try {
      const admin = JSON.parse(localStorage.getItem(ADMIN_KEY) || '{}')
      admin.visitorCount = current
      localStorage.setItem(ADMIN_KEY, JSON.stringify(admin))
    } catch { /* ignore */ }

    // 2. Also fetch from server JSON and merge (keep max)
    fetch(JSON_URL)
      .then(res => res.ok ? res.json() : null)
      .then(remoteCount => {
        if (typeof remoteCount === 'number' && remoteCount > current) {
          // Server has a higher count, use it
          setCount(remoteCount)
          localStorage.setItem(STORAGE_KEY, String(remoteCount))
          try {
            const admin = JSON.parse(localStorage.getItem(ADMIN_KEY) || '{}')
            admin.visitorCount = remoteCount
            localStorage.setItem(ADMIN_KEY, JSON.stringify(admin))
          } catch { /* ignore */ }
        }
      })
      .catch(() => {})
  }, [])

  return count
}
