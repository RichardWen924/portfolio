import { useState, useEffect, useCallback } from 'react'
import type { Experience, Education, Project, Service, AboutContent, ServicesContent } from './types'
import { experiences as defaultExperiences, educations as defaultEducations } from './experience'
import { projects as defaultProjects } from './projects'
import { services as defaultServices } from './services'
import { defaultAbout } from './about'
import { defaultServicesContent } from './services-content'

const STORAGE_KEY = 'admin-content-v2'
const SYNC_EVENT = 'admin-sync'

function isValidExperience(val: unknown): val is Experience[] {
  if (!Array.isArray(val)) return false
  return val.every((item) => item && typeof item === 'object' && 'startDate' in item && 'endDate' in item)
}

function isValidProject(val: unknown): val is Project[] {
  if (!Array.isArray(val)) return false
  return val.every((item) => item && typeof item === 'object'
    && 'highlights' in item && 'longDescription' in item && 'role' in item && 'client' in item)
}

function readLocalStorage<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return fallback
    const parsed = JSON.parse(saved) as Record<string, unknown>
    const val = parsed[key] as T
    if (val === null || val === undefined) return fallback
    // Validate array data to prevent .map crashes
    if (Array.isArray(fallback) && !Array.isArray(val)) return fallback
    // Validate experiences have required startDate/endDate fields
    if (key === 'experiences' && !isValidExperience(val)) return fallback
    // Validate projects have required fields (highlights, longDescription, role, client)
    if (key === 'projects' && !isValidProject(val)) return fallback
    return val
  } catch {
    return fallback
  }
}

const BASE = import.meta.env.BASE_URL + 'data'

async function fetchJSON<T>(filename: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${BASE}/${filename}`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch {
    return fallback
  }
}

function loadData<T>(key: string, jsonFile: string, fallback: T): Promise<T> {
  // 1. localStorage first (from Admin edits)
  const local = readLocalStorage<T>(key, fallback)
  const isLocalEdited = local !== fallback && JSON.stringify(local) !== JSON.stringify(fallback)
  if (isLocalEdited) return Promise.resolve(local)
  // 2. public/data JSON (published data)
  return fetchJSON(jsonFile, fallback)
}

export function useExperiences(): Experience[] {
  const [data, setData] = useState(defaultExperiences)
  const refresh = useCallback(() => {
    loadData<Experience[]>('experiences', 'experiences.json', defaultExperiences).then(setData)
  }, [])
  useEffect(refresh, [refresh])
  useEffect(() => {
    const handler = () => refresh()
    window.addEventListener(SYNC_EVENT, handler)
    return () => window.removeEventListener(SYNC_EVENT, handler)
  }, [refresh])
  return data
}

export function useEducations(): Education[] {
  const [data, setData] = useState(defaultEducations)
  const refresh = useCallback(() => {
    loadData<Education[]>('educations', 'educations.json', defaultEducations).then(setData)
  }, [])
  useEffect(refresh, [refresh])
  useEffect(() => {
    const handler = () => refresh()
    window.addEventListener(SYNC_EVENT, handler)
    return () => window.removeEventListener(SYNC_EVENT, handler)
  }, [refresh])
  return data
}

export function useProjects(): Project[] {
  const [data, setData] = useState(defaultProjects)
  const refresh = useCallback(() => {
    loadData<Project[]>('projects', 'projects.json', defaultProjects).then(setData)
  }, [])
  useEffect(refresh, [refresh])
  useEffect(() => {
    const handler = () => refresh()
    window.addEventListener(SYNC_EVENT, handler)
    return () => window.removeEventListener(SYNC_EVENT, handler)
  }, [refresh])
  return data
}

export function useServices(): Service[] {
  const [data, setData] = useState(defaultServices)
  const refresh = useCallback(() => {
    loadData<Service[]>('services', 'services.json', defaultServices).then(setData)
  }, [])
  useEffect(refresh, [refresh])
  useEffect(() => {
    const handler = () => refresh()
    window.addEventListener(SYNC_EVENT, handler)
    return () => window.removeEventListener(SYNC_EVENT, handler)
  }, [refresh])
  return data
}

export function useAbout(): AboutContent {
  const [data, setData] = useState(defaultAbout)
  const refresh = useCallback(() => {
    loadData<AboutContent>('about', 'about.json', defaultAbout).then(setData)
  }, [])
  useEffect(refresh, [refresh])
  useEffect(() => {
    const handler = () => refresh()
    window.addEventListener(SYNC_EVENT, handler)
    return () => window.removeEventListener(SYNC_EVENT, handler)
  }, [refresh])
  return data
}

export function useServicesContent(): ServicesContent {
  const [data, setData] = useState(defaultServicesContent)
  const refresh = useCallback(() => {
    loadData<ServicesContent>('servicesContent', 'services-content.json', defaultServicesContent).then(setData)
  }, [])
  useEffect(refresh, [refresh])
  useEffect(() => {
    const handler = () => refresh()
    window.addEventListener(SYNC_EVENT, handler)
    return () => window.removeEventListener(SYNC_EVENT, handler)
  }, [refresh])
  return data
}

/** Call this to trigger all data hooks to re-read from localStorage */
export function triggerSync() {
  window.dispatchEvent(new CustomEvent(SYNC_EVENT))
}
