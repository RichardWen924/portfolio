import { useState, useEffect } from 'react'

const STORAGE_KEY = 'visitor_count'
const SESSION_KEY = 'visitor_session'
const BASE_COUNT = 1000

export function useVisitorCount(): number {
  const [count, setCount] = useState(BASE_COUNT)

  useEffect(() => {
    const alreadyVisited = sessionStorage.getItem(SESSION_KEY)
    const stored = localStorage.getItem(STORAGE_KEY)

    let current = stored ? parseInt(stored, 10) : BASE_COUNT

    if (!alreadyVisited) {
      current += 1
      sessionStorage.setItem(SESSION_KEY, '1')
      localStorage.setItem(STORAGE_KEY, String(current))
    }

    setCount(current)
  }, [])

  return count
}
