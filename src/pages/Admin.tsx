import { useState, useEffect, useCallback } from 'react'
import type { Experience, Education, Project, Service, AboutContent, ServicesContent } from '../data/types'
import { experiences as defaultExperiences, educations as defaultEducations } from '../data/experience'
import { projects as defaultProjects } from '../data/projects'
import { services as defaultServices } from '../data/services'
import { defaultAbout } from '../data/about'
import { defaultServicesContent } from '../data/services-content'
import { triggerSync } from '../data/loader'

type Tab = 'experiences' | 'educations' | 'projects' | 'services' | 'about' | 'servicesContent'

const STORAGE_KEY = 'admin-content-v2'

interface StoredData {
  experiences: Experience[]
  educations: Education[]
  projects: Project[]
  services: Service[]
  about: AboutContent
  servicesContent: ServicesContent
}

function isValidExperienceItem(item: unknown): item is Experience {
  if (!item || typeof item !== 'object') return false
  const e = item as Record<string, unknown>
  return typeof e.id === 'string' && typeof e.startDate === 'string' && (e.endDate === null || typeof e.endDate === 'string')
}

function isValidProjectItem(item: unknown): item is Project {
  if (!item || typeof item !== 'object') return false
  const e = item as Record<string, unknown>
  return typeof e.id === 'string' && 'highlights' in e && 'longDescription' in e && 'role' in e && 'client' in e
}

function normalizeDate(dateStr: string): string {
  // Convert 'YYYY-MM' to 'YYYY.M'
  const parts = dateStr.split(/[.-]/)
  return `${parts[0]}.${parseInt(parts[1], 10)}`
}

function migrateData(raw: StoredData): StoredData {
  if (Array.isArray(raw.experiences)) {
    raw.experiences = raw.experiences.filter(isValidExperienceItem).map(exp => ({
      ...exp,
      startDate: normalizeDate(exp.startDate),
      endDate: exp.endDate ? normalizeDate(exp.endDate) : null,
    }))
  } else {
    raw.experiences = defaultExperiences
  }
  if (!Array.isArray(raw.educations)) raw.educations = defaultEducations
  if (Array.isArray(raw.projects) && !raw.projects.every(isValidProjectItem)) {
    raw.projects = defaultProjects
  } else if (!Array.isArray(raw.projects)) {
    raw.projects = defaultProjects
  }
  if (!Array.isArray(raw.services)) raw.services = defaultServices
  if (!raw.about || typeof raw.about !== 'object' || typeof raw.about.heading !== 'object') raw.about = defaultAbout
  if (!raw.servicesContent || typeof raw.servicesContent !== 'object' || typeof raw.servicesContent.heading !== 'object') raw.servicesContent = defaultServicesContent
  return raw
}

function loadData(): StoredData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return migrateData(JSON.parse(saved))
  } catch { /* ignore */ }
  return {
    experiences: defaultExperiences,
    educations: defaultEducations,
    projects: defaultProjects,
    services: defaultServices,
    about: defaultAbout,
    servicesContent: defaultServicesContent,
  }
}

function saveData(data: StoredData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

const REPO = 'RichardWen924/portfolio'
const DATA_FILES: { key: keyof StoredData; path: string }[] = [
  { key: 'experiences', path: 'public/data/experiences.json' },
  { key: 'educations', path: 'public/data/educations.json' },
  { key: 'projects', path: 'public/data/projects.json' },
  { key: 'services', path: 'public/data/services.json' },
  { key: 'about', path: 'public/data/about.json' },
  { key: 'servicesContent', path: 'public/data/services-content.json' },
]

export default function Admin() {
  const [data, setData] = useState<StoredData>(loadData)
  const [tab, setTab] = useState<Tab>('experiences')
  const [editing, setEditing] = useState<Experience | Education | Project | Service | null>(null)
  const [adding, setAdding] = useState(false)
  const [copied, setCopied] = useState(false)
  const [token, setToken] = useState(() => sessionStorage.getItem('gh-token') || '')
  const [publishing, setPublishing] = useState(false)
  const [publishMsg, setPublishMsg] = useState('')
  const [toast, setToast] = useState('')

  const showToast = useCallback((msg: string) => {
    triggerSync()
    setToast(msg)
    setTimeout(() => setToast(''), 2000)
  }, [])

  useEffect(() => saveData(data), [data])

  const handleDelete = useCallback((type: Tab, id: string) => {
    if (type === 'about' || type === 'servicesContent') return
    setData(prev => {
      const next = { ...prev }
      if (type === 'experiences') next.experiences = prev.experiences.filter(e => e.id !== id)
      else if (type === 'educations') next.educations = prev.educations.filter(e => e.id !== id)
      else if (type === 'projects') next.projects = prev.projects.filter(p => p.id !== id)
      else next.services = prev.services.filter(s => s.id !== id)
      return next
    })
  }, [])

  const reset = useCallback(() => {
    if (!confirm('Reset all content to defaults? This cannot be undone.')) return
    const defaults: StoredData = {
      experiences: defaultExperiences,
      educations: defaultEducations,
      projects: defaultProjects,
      services: defaultServices,
      about: defaultAbout,
      servicesContent: defaultServicesContent,
    }
    setData(defaults)
    saveData(defaults)
  }, [])

  const handleExport = useCallback(() => {
    const filename = `${tab}.json`
    const items = data[tab]
    const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }, [data, tab])

  const handleCopy = useCallback(async () => {
    const items = data[tab]
    await navigator.clipboard.writeText(JSON.stringify(items, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [data, tab])

  const handlePublish = useCallback(async () => {
    if (!token.trim()) {
      setPublishMsg('Please enter a GitHub token first.')
      return
    }
    if (!confirm('Publish all changes to GitHub? This will update the live website in ~1-2 minutes.')) return

    setPublishing(true)
    setPublishMsg('Publishing...')

    const headers = {
      Authorization: `token ${token.trim()}`,
      'Content-Type': 'application/json',
    }

    try {
      for (const file of DATA_FILES) {
        const content = JSON.stringify(data[file.key], null, 2)
        const base64 = btoa(unescape(encodeURIComponent(content)))

        // Get current file SHA
        let sha = ''
        try {
          const getRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${file.path}`, { headers })
          if (getRes.ok) {
            const getData = await getRes.json()
            sha = getData.sha
          }
        } catch { /* file may not exist yet */ }

        // PUT new content
        const body: Record<string, string> = {
          message: `Update ${file.path} from Admin`,
          content: base64,
        }
        if (sha) body.sha = sha

        const putRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${file.path}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(body),
        })

        if (!putRes.ok) {
          const errData = await putRes.json().catch(() => ({}))
          throw new Error(`${file.path}: ${putRes.status} ${(errData as { message?: string }).message || ''}`)
        }
      }

      // Save token to sessionStorage
      sessionStorage.setItem('gh-token', token.trim())
      setPublishMsg('Published! The website will update in 1-2 minutes.')
    } catch (err) {
      setPublishMsg(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setPublishing(false)
    }
  }, [data, token])

  const [synced, setSynced] = useState(false)

  const handleSync = useCallback(() => {
    triggerSync()
    setSynced(true)
    setTimeout(() => setSynced(false), 2000)
  }, [])

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'experiences', label: 'Experiences', count: data.experiences.length },
    { key: 'educations', label: 'Educations', count: data.educations.length },
    { key: 'projects', label: 'Projects', count: data.projects.length },
    { key: 'services', label: 'Services', count: data.services.length },
    { key: 'about', label: 'About', count: 1 },
    { key: 'servicesContent', label: 'Services Header', count: 1 },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Content Admin</h1>
            <p className="text-zinc-500 text-sm mt-1">Manage portfolio content. Changes saved to localStorage.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={reset} className="px-3 py-1.5 text-xs text-red-400 hover:text-red-300 border border-red-400/20 hover:border-red-400/40 rounded transition-colors">
              Reset Defaults
            </button>
            <a href="#" className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded transition-colors">
              Exit Admin
            </a>
          </div>
        </div>

        {/* Token + Publish bar */}
        <div className="flex items-center gap-3 mb-6 p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg">
          <input
            type="password"
            value={token}
            onChange={e => setToken(e.target.value)}
            placeholder="GitHub Personal Access Token"
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 transition-colors font-mono"
          />
          <button
            onClick={handlePublish}
            disabled={publishing}
            className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-sm font-medium rounded-lg border border-emerald-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {publishing ? 'Publishing...' : 'Publish to GitHub'}
          </button>
        </div>
        {publishMsg && (
          <p className={`text-xs mb-4 ${publishMsg.startsWith('Error') ? 'text-red-400' : publishMsg.startsWith('Published') ? 'text-emerald-400' : 'text-zinc-400'}`}>
            {publishMsg}
          </p>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-white/[0.06]">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-[1px] ${
                tab === t.key
                  ? 'text-violet-400 border-violet-400'
                  : 'text-zinc-500 border-transparent hover:text-zinc-300'
              }`}
            >
              {t.label} <span className="text-xs text-zinc-600 ml-1">({t.count})</span>
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {tab !== 'about' && tab !== 'servicesContent' && (
              <button
                onClick={() => { setEditing(null); setAdding(true) }}
                className="px-4 py-2 bg-violet-500/10 hover:bg-violet-500/20 text-violet-400 text-sm font-medium rounded-lg border border-violet-500/20 transition-colors"
              >
                + Add New
              </button>
            )}
            <button
              onClick={handleSync}
              className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-sm font-medium rounded-lg border border-emerald-500/20 transition-colors"
            >
              {synced ? 'Synced!' : 'Sync to Site'}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleCopy} className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded transition-colors">
              {copied ? 'Copied!' : 'Copy JSON'}
            </button>
            <button onClick={handleExport} className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded transition-colors">
              Export JSON
            </button>
          </div>
        </div>

        {/* About tab: inline editor */}
        {tab === 'about' && (
          <AboutEditor
            data={data.about}
            onSave={(about) => {
              setData(prev => ({ ...prev, about }))
              showToast('About saved successfully')
            }}
          />
        )}

        {/* Services Header tab: inline editor */}
        {tab === 'servicesContent' && (
          <ServicesContentEditor
            data={data.servicesContent}
            onSave={(sc) => {
              setData(prev => ({ ...prev, servicesContent: sc }))
              showToast('Services header saved successfully')
            }}
          />
        )}

        {/* List (non-content tabs) */}
        {tab !== 'about' && tab !== 'servicesContent' && (
          <div className="space-y-2">
            {(data[tab] as (Experience | Education | Project | Service)[]).map((item, i) => (
              <div key={item.id} className="flex items-start gap-4 p-4 bg-white/[0.02] border border-white/[0.05] rounded-lg hover:border-white/[0.1] transition-colors group">
                <span className="font-mono text-xs text-zinc-600 pt-1">{String(i + 1).padStart(2, '0')}</span>
                <div className="flex-1 min-w-0">
                  {renderSummary(item, tab)}
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => { setEditing(item); setAdding(false) }}
                    className="px-2 py-1 text-xs text-zinc-400 hover:text-white hover:bg-white/[0.05] rounded transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => { if (confirm('Delete this item?')) handleDelete(tab, item.id) }}
                    className="px-2 py-1 text-xs text-red-400/70 hover:text-red-400 hover:bg-red-400/5 rounded transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {(data[tab] as unknown[]).length === 0 && (
              <p className="text-zinc-600 text-sm py-8 text-center">No items yet. Click "Add New" to create one.</p>
            )}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-3 bg-emerald-500/90 text-white text-sm font-medium rounded-lg shadow-lg animate-pulse">
          {toast}
        </div>
      )}

      {/* Modal */}
      {(editing || adding) && (
        <EditModal
          type={tab}
          item={editing}
          onSave={(item) => {
            setData(prev => {
              const next = { ...prev }
              const list = [...(next[tab] as unknown as typeof item[])]
              const idx = list.findIndex(x => x.id === item.id)
              if (idx >= 0) list[idx] = item
              else list.push(item)
              ;(next as Record<string, unknown>)[tab] = list
              return next
            })
            setEditing(null)
            setAdding(false)
            showToast(adding ? 'Item created successfully' : 'Item saved successfully')
          }}
          onClose={() => { setEditing(null); setAdding(false) }}
        />
      )}
    </div>
  )
}

function renderSummary(item: Experience | Education | Project | Service, _type: Tab) {
  const getTitle = (i: Experience | Education | Project | Service): string => {
    if ('role' in i) return i.role.en
    if ('school' in i) return i.school.en
    return i.title.en
  }
  const getSub = (i: Experience | Education | Project | Service): string => {
    const item = i as unknown as Record<string, unknown>
    if ('startDate' in item && item.startDate) {
      return `${item.startDate} \u2014 ${item.endDate || 'Present'}`
    }
    if ('company' in item && item.company) {
      return (item.company as { en: string }).en
    }
    if ('degree' in item && item.degree) {
      return (item.degree as { en: string }).en
    }
    if ('description' in item && item.description) {
      return (item.description as { en: string }).en.slice(0, 80) + '...'
    }
    return ''
  }

  return (
    <>
      <div className="font-medium text-white text-sm">{getTitle(item)}</div>
      <div className="text-zinc-500 text-xs mt-0.5">{getSub(item)}</div>
    </>
  )
}

function EditModal({
  type,
  item,
  onSave,
  onClose,
}: {
  type: Tab
  item: Experience | Education | Project | Service | null
  onSave: (item: Experience | Education | Project | Service) => void
  onClose: () => void
}) {
  const isNew = !item
  const [editLang, setEditLang] = useState<'all' | 'en' | 'zh'>('all')

  const [form, setForm] = useState(() => {
    if (item) return structuredClone(item)

    const id = generateId()
    if (type === 'experiences') {
      return { id, role: { en: '', zh: '' }, company: { en: '', zh: '' }, startDate: '', endDate: null, description: { en: '', zh: '' } } as Experience
    }
    if (type === 'educations') {
      return { id, school: { en: '', zh: '' }, degree: { en: '', zh: '' }, date: { en: '', zh: '' } } as Education
    }
    if (type === 'projects') {
      return { id, category: { en: '', zh: '' }, title: { en: '', zh: '' }, description: { en: '', zh: '' }, longDescription: { en: '', zh: '' }, role: { en: '', zh: '' }, client: { en: '', zh: '' }, attribution: { en: '', zh: '' }, tags: [] as string[], highlights: { en: [] as string[], zh: [] as string[] }, images: [] as string[], href: '' } as Project
    }
    return { id, title: { en: '', zh: '' }, description: { en: '', zh: '' }, tags: [] as string[] } as Service
  })

  const updateBilingual = (field: string, lang: 'en' | 'zh', value: string) => {
    setForm(prev => {
      const next = structuredClone(prev)
      const keys = field.split('.')
      let target: Record<string, unknown> = next as unknown as Record<string, unknown>
      for (let i = 0; i < keys.length - 1; i++) {
        target = target[keys[i]] as Record<string, unknown>
      }
      const last = keys[keys.length - 1]
      ;(target[last] as Record<string, string>)[lang] = value
      return next
    })
  }

  const updateString = (field: string, value: string) => {
    setForm(prev => {
      const next = structuredClone(prev)
      const keys = field.split('.')
      let target: Record<string, unknown> = next as unknown as Record<string, unknown>
      for (let i = 0; i < keys.length - 1; i++) {
        target = target[keys[i]] as Record<string, unknown>
      }
      ;(target as Record<string, string>)[keys[keys.length - 1]] = value
      return next
    })
  }

  const updateTags = (value: string) => {
    setForm(prev => ({ ...prev, tags: value.split(',').map(s => s.trim()).filter(Boolean) } as typeof prev))
  }

  const updateHighlights = (lang: 'en' | 'zh', value: string) => {
    setForm(prev => {
      const next = structuredClone(prev)
      const lines = value.split('\n').map(s => s.trim()).filter(Boolean)
      ;(next as Project).highlights = { ...(next as Project).highlights, [lang]: lines }
      return next
    })
  }

  const isBilingual = (field: string) => {
    return ['role', 'company', 'description', 'longDescription', 'school', 'degree', 'category', 'title', 'client', 'attribution'].includes(field)
  }

  const fields = getFields(type)

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4" onClick={onClose}>
      <div className="fixed inset-0 bg-black/60" />
      <div
        className="relative bg-zinc-900 border border-white/[0.08] rounded-xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">{isNew ? 'Add' : 'Edit'} {type.slice(0, -1)}</h2>
          <div className="flex items-center gap-1 bg-zinc-800 border border-zinc-700 rounded-lg p-0.5">
            {(['all', 'en', 'zh'] as const).map(l => (
              <button
                key={l}
                onClick={() => setEditLang(l)}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                  editLang === l ? 'bg-violet-500/30 text-violet-300' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {l === 'all' ? 'EN \u00b7 ZH' : l === 'en' ? 'EN' : 'ZH'}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          {fields.map(field => {
            if (field === 'tags') {
              const tagsVal = (form as Project | Service).tags?.join(', ') || ''
              return (
                <div key={field}>
                  <label className="block text-xs text-zinc-500 mb-1 font-mono">tags (comma-separated)</label>
                  <input
                    value={tagsVal}
                    onChange={e => updateTags(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
              )
            }
            if (field === 'href') {
              return (
                <div key={field}>
                  <label className="block text-xs text-zinc-500 mb-1 font-mono">href</label>
                  <input
                    value={(form as Project).href || ''}
                    onChange={e => updateString('href', e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
              )
            }
            if (field === 'startDate' || field === 'endDate') {
              const val = (form as Experience)[field as 'startDate' | 'endDate'] ?? ''
              return (
                <div key={field}>
                  <label className="block text-xs text-zinc-500 mb-1 font-mono">
                    {field} {field === 'endDate' ? '(empty = Present)' : '(YYYY.M)'}
                  </label>
                  <input
                    value={String(val)}
                    onChange={e => setForm(prev => {
                      const next = structuredClone(prev)
                      const v = e.target.value.trim()
                      ;(next as unknown as Record<string, unknown>)[field] = field === 'endDate' ? (v || null) : v
                      return next
                    })}
                    placeholder={field === 'startDate' ? '2022.7' : '2025.6'}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors font-mono"
                  />
                </div>
              )
            }
            if (field === 'images') {
              const imgs = (form as Project).images || []
              const updateImage = (index: number, value: string) => {
                setForm(prev => {
                  const next = structuredClone(prev)
                  const arr = [...((next as Project).images || [])]
                  arr[index] = value
                  ;(next as Project).images = arr
                  return next
                })
              }
              const addImage = () => {
                setForm(prev => {
                  const next = structuredClone(prev)
                  ;(next as Project).images = [...((next as Project).images || []), '']
                  return next
                })
              }
              const removeImage = (index: number) => {
                setForm(prev => {
                  const next = structuredClone(prev)
                  ;(next as Project).images = ((next as Project).images || []).filter((_, i) => i !== index)
                  return next
                })
              }
              const handleFileUpload = (index: number, file: File) => {
                const reader = new FileReader()
                reader.onload = () => updateImage(index, reader.result as string)
                reader.readAsDataURL(file)
              }
              return (
                <div key={field}>
                  <label className="block text-xs text-zinc-500 mb-2 font-mono">images (URL paste or file upload)</label>
                  <div className="space-y-2">
                    {imgs.map((img, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <input
                              value={img}
                              onChange={e => updateImage(i, e.target.value)}
                              placeholder="Paste URL or click upload..."
                              className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 transition-colors font-mono"
                            />
                            <label className="px-2 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded text-xs text-zinc-400 hover:text-white cursor-pointer transition-colors flex-shrink-0">
                              Upload
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={e => {
                                  const file = e.target.files?.[0]
                                  if (file) handleFileUpload(i, file)
                                  e.target.value = ''
                                }}
                              />
                            </label>
                            <button
                              onClick={() => removeImage(i)}
                              className="px-2 py-2 text-xs text-red-400/70 hover:text-red-400 hover:bg-red-400/5 rounded transition-colors flex-shrink-0"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                            </button>
                          </div>
                          {img && (
                            <img src={img} alt="" className="mt-2 h-20 rounded border border-white/[0.05] object-cover" />
                          )}
                        </div>
                      </div>
                    ))}
                    {imgs.length < 3 && (
                      <button
                        onClick={addImage}
                        className="px-3 py-1.5 text-xs text-violet-400 hover:text-violet-300 border border-violet-400/20 hover:border-violet-400/40 rounded transition-colors"
                      >
                        + Add Image
                      </button>
                    )}
                  </div>
                </div>
              )
            }
            if (field === 'highlights') {
              const hl = (form as Project).highlights || { en: [], zh: [] }
              const showEN = editLang === 'all' || editLang === 'en'
              const showZH = editLang === 'all' || editLang === 'zh'
              return (
                <div key={field}>
                  <label className="block text-xs text-zinc-500 mb-1 font-mono">highlights (one per line)</label>
                  <div className={`grid ${editLang === 'all' ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
                    {showEN && (
                      <div>
                        <span className="text-[10px] text-zinc-600">EN</span>
                        <textarea
                          value={hl.en.join('\n')}
                          onChange={e => updateHighlights('en', e.target.value)}
                          rows={4}
                          className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors resize-y"
                        />
                      </div>
                    )}
                    {showZH && (
                      <div>
                        <span className="text-[10px] text-zinc-600">ZH</span>
                        <textarea
                          value={hl.zh.join('\n')}
                          onChange={e => updateHighlights('zh', e.target.value)}
                          rows={4}
                          className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors resize-y"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )
            }
            if (isBilingual(field)) {
              const isTextarea = field === 'longDescription' || field === 'description'
              const showEN = editLang === 'all' || editLang === 'en'
              const showZH = editLang === 'all' || editLang === 'zh'
              return (
                <div key={field}>
                  <label className="block text-xs text-zinc-500 mb-1 font-mono">{field}</label>
                  <div className={`grid ${editLang === 'all' ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
                    {showEN && (
                      <div>
                        <span className="text-[10px] text-zinc-600">EN</span>
                        {isTextarea ? (
                          <textarea
                            value={getBilingual(form as unknown as Record<string, unknown>, field, 'en')}
                            onChange={e => updateBilingual(field, 'en', e.target.value)}
                            rows={4}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors resize-y"
                          />
                        ) : (
                          <input
                            value={getBilingual(form as unknown as Record<string, unknown>, field, 'en')}
                            onChange={e => updateBilingual(field, 'en', e.target.value)}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                          />
                        )}
                      </div>
                    )}
                    {showZH && (
                      <div>
                        <span className="text-[10px] text-zinc-600">ZH</span>
                        {isTextarea ? (
                          <textarea
                            value={getBilingual(form as unknown as Record<string, unknown>, field, 'zh')}
                            onChange={e => updateBilingual(field, 'zh', e.target.value)}
                            rows={4}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors resize-y"
                          />
                        ) : (
                          <input
                            value={getBilingual(form as unknown as Record<string, unknown>, field, 'zh')}
                            onChange={e => updateBilingual(field, 'zh', e.target.value)}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            }
            return null
          })}
        </div>

        <div className="flex items-center justify-end gap-3 mt-8">
          <button onClick={onClose} className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors">
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="px-4 py-2 bg-violet-500 hover:bg-violet-400 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {isNew ? 'Create' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}

function getBilingual(obj: Record<string, unknown>, field: string, lang: 'en' | 'zh'): string {
  const keys = field.split('.')
  let target: unknown = obj
  for (const k of keys) {
    if (target && typeof target === 'object') {
      target = (target as Record<string, unknown>)[k]
    } else {
      return ''
    }
  }
  if (target && typeof target === 'object') {
    return (target as Record<string, string>)[lang] || ''
  }
  return ''
}

function AboutEditor({ data, onSave }: { data: AboutContent; onSave: (a: AboutContent) => void }) {
  const [form, setForm] = useState(structuredClone(data))
  const [editLang, setEditLang] = useState<'all' | 'en' | 'zh'>('all')

  const update = (field: string, lang: 'en' | 'zh', value: string) => {
    setForm(prev => {
      const next = structuredClone(prev)
      const target = next as unknown as Record<string, Record<string, string>>
      target[field][lang] = value
      return next
    })
  }

  const updateNumber = (field: string, value: number) => {
    setForm(prev => {
      const next = structuredClone(prev)
      ;(next as unknown as Record<string, number>)[field] = value
      return next
    })
  }

  const bilingualFields: { key: string; label: string; textarea?: boolean }[] = [
    { key: 'label', label: 'Label' },
    { key: 'heading', label: 'Heading' },
    { key: 'bio1', label: 'Bio 1', textarea: true },
    { key: 'bio2', label: 'Bio 2', textarea: true },
    { key: 'bio3', label: 'Bio 3', textarea: true },
  ]

  return (
    <div className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">About Section</h2>
        <div className="flex items-center gap-1 bg-zinc-800 border border-zinc-700 rounded-lg p-0.5">
          {(['all', 'en', 'zh'] as const).map(l => (
            <button
              key={l}
              onClick={() => setEditLang(l)}
              className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                editLang === l ? 'bg-violet-500/30 text-violet-300' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {l === 'all' ? 'EN \u00b7 ZH' : l === 'en' ? 'EN' : 'ZH'}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        {bilingualFields.map(f => {
          const showEN = editLang === 'all' || editLang === 'en'
          const showZH = editLang === 'all' || editLang === 'zh'
          return (
            <div key={f.key}>
              <label className="block text-xs text-zinc-500 mb-1 font-mono">{f.label}</label>
              <div className={`grid ${editLang === 'all' ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
                {showEN && (
                  <div>
                    <span className="text-[10px] text-zinc-600">EN</span>
                    {f.textarea ? (
                      <textarea
                        value={(form as unknown as Record<string, Record<string, string>>)[f.key].en}
                        onChange={e => update(f.key, 'en', e.target.value)}
                        rows={3}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors resize-y"
                      />
                    ) : (
                      <input
                        value={(form as unknown as Record<string, Record<string, string>>)[f.key].en}
                        onChange={e => update(f.key, 'en', e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                      />
                    )}
                  </div>
                )}
                {showZH && (
                  <div>
                    <span className="text-[10px] text-zinc-600">ZH</span>
                    {f.textarea ? (
                      <textarea
                        value={(form as unknown as Record<string, Record<string, string>>)[f.key].zh}
                        onChange={e => update(f.key, 'zh', e.target.value)}
                        rows={3}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors resize-y"
                      />
                    ) : (
                      <input
                        value={(form as unknown as Record<string, Record<string, string>>)[f.key].zh}
                        onChange={e => update(f.key, 'zh', e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {/* Stats */}
        <div className="border-t border-white/[0.06] pt-5">
          <label className="block text-xs text-zinc-500 mb-3 font-mono">Stats</label>
          <div className="grid grid-cols-3 gap-4">
            {(['statYears', 'statProjects', 'statTech'] as const).map(key => (
              <div key={key}>
                <label className="block text-[10px] text-zinc-600 mb-1">{key}</label>
                <input
                  type="number"
                  value={(form as unknown as Record<string, number>)[key]}
                  onChange={e => updateNumber(key, parseInt(e.target.value, 10) || 0)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors font-mono"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 mt-8">
        <button
          onClick={() => onSave(form)}
          className="px-4 py-2 bg-violet-500 hover:bg-violet-400 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  )
}

function ServicesContentEditor({ data, onSave }: { data: ServicesContent; onSave: (s: ServicesContent) => void }) {
  const [form, setForm] = useState(structuredClone(data))
  const [editLang, setEditLang] = useState<'all' | 'en' | 'zh'>('all')

  const update = (field: string, lang: 'en' | 'zh', value: string) => {
    setForm(prev => {
      const next = structuredClone(prev)
      const target = next as unknown as Record<string, Record<string, string>>
      target[field][lang] = value
      return next
    })
  }

  const bilingualFields: { key: string; label: string; textarea?: boolean }[] = [
    { key: 'heading', label: 'Heading' },
    { key: 'subDescription', label: 'Sub Description', textarea: true },
  ]

  return (
    <div className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">Services Section Header</h2>
        <div className="flex items-center gap-1 bg-zinc-800 border border-zinc-700 rounded-lg p-0.5">
          {(['all', 'en', 'zh'] as const).map(l => (
            <button
              key={l}
              onClick={() => setEditLang(l)}
              className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                editLang === l ? 'bg-violet-500/30 text-violet-300' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {l === 'all' ? 'EN \u00b7 ZH' : l === 'en' ? 'EN' : 'ZH'}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        {bilingualFields.map(f => {
          const showEN = editLang === 'all' || editLang === 'en'
          const showZH = editLang === 'all' || editLang === 'zh'
          return (
            <div key={f.key}>
              <label className="block text-xs text-zinc-500 mb-1 font-mono">{f.label}</label>
              <div className={`grid ${editLang === 'all' ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
                {showEN && (
                  <div>
                    <span className="text-[10px] text-zinc-600">EN</span>
                    {f.textarea ? (
                      <textarea
                        value={(form as unknown as Record<string, Record<string, string>>)[f.key].en}
                        onChange={e => update(f.key, 'en', e.target.value)}
                        rows={3}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors resize-y"
                      />
                    ) : (
                      <input
                        value={(form as unknown as Record<string, Record<string, string>>)[f.key].en}
                        onChange={e => update(f.key, 'en', e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                      />
                    )}
                  </div>
                )}
                {showZH && (
                  <div>
                    <span className="text-[10px] text-zinc-600">ZH</span>
                    {f.textarea ? (
                      <textarea
                        value={(form as unknown as Record<string, Record<string, string>>)[f.key].zh}
                        onChange={e => update(f.key, 'zh', e.target.value)}
                        rows={3}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors resize-y"
                      />
                    ) : (
                      <input
                        value={(form as unknown as Record<string, Record<string, string>>)[f.key].zh}
                        onChange={e => update(f.key, 'zh', e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-end gap-3 mt-8">
        <button
          onClick={() => onSave(form)}
          className="px-4 py-2 bg-violet-500 hover:bg-violet-400 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  )
}

function getFields(type: Tab): string[] {
  switch (type) {
    case 'experiences':
      return ['role', 'company', 'startDate', 'endDate', 'description']
    case 'educations':
      return ['school', 'degree', 'date']
    case 'projects':
      return ['category', 'title', 'description', 'longDescription', 'role', 'client', 'attribution', 'highlights', 'tags', 'images', 'href']
    case 'services':
      return ['title', 'description', 'tags']
    case 'about':
    case 'servicesContent':
      return []
  }
}
