import { useState, useEffect, useCallback } from 'react'
import type { Experience, Education, Project, Service } from '../data/types'
import { experiences as defaultExperiences, educations as defaultEducations } from '../data/experience'
import { projects as defaultProjects } from '../data/projects'
import { services as defaultServices } from '../data/services'

type Tab = 'experiences' | 'educations' | 'projects' | 'services'

const STORAGE_KEY = 'admin-content'

interface StoredData {
  experiences: Experience[]
  educations: Education[]
  projects: Project[]
  services: Service[]
}

function loadData(): StoredData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch { /* ignore */ }
  return {
    experiences: defaultExperiences,
    educations: defaultEducations,
    projects: defaultProjects,
    services: defaultServices,
  }
}

function saveData(data: StoredData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

export default function Admin() {
  const [data, setData] = useState<StoredData>(loadData)
  const [tab, setTab] = useState<Tab>('experiences')
  const [editing, setEditing] = useState<Experience | Education | Project | Service | null>(null)
  const [adding, setAdding] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => saveData(data), [data])

  const handleDelete = useCallback((type: Tab, id: string) => {
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

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'experiences', label: 'Experiences', count: data.experiences.length },
    { key: 'educations', label: 'Educations', count: data.educations.length },
    { key: 'projects', label: 'Projects', count: data.projects.length },
    { key: 'services', label: 'Services', count: data.services.length },
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
          <button
            onClick={() => { setEditing(null); setAdding(true) }}
            className="px-4 py-2 bg-violet-500/10 hover:bg-violet-500/20 text-violet-400 text-sm font-medium rounded-lg border border-violet-500/20 transition-colors"
          >
            + Add New
          </button>
          <div className="flex items-center gap-2">
            <button onClick={handleCopy} className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded transition-colors">
              {copied ? 'Copied!' : 'Copy JSON'}
            </button>
            <button onClick={handleExport} className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded transition-colors">
              Export JSON
            </button>
          </div>
        </div>

        {/* List */}
        <div className="space-y-2">
          {data[tab].map((item, i) => (
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
          {data[tab].length === 0 && (
            <p className="text-zinc-600 text-sm py-8 text-center">No items yet. Click "Add New" to create one.</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {(editing || adding) && (
        <EditModal
          type={tab}
          item={editing}
          onSave={(item) => {
            setData(prev => {
              const next = { ...prev }
              const list = [...next[tab]] as typeof item[]
              const idx = list.findIndex(x => x.id === item.id)
              if (idx >= 0) list[idx] = item
              else list.push(item)
              ;(next as Record<string, unknown>)[tab] = list
              return next
            })
            setEditing(null)
            setAdding(false)
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
    if ('company' in i) return i.company.en
    if ('degree' in i) return i.degree.en
    if ('description' in i) return i.description.en.slice(0, 80) + '...'
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

  const [form, setForm] = useState(() => {
    if (item) return structuredClone(item)

    const id = generateId()
    if (type === 'experiences') {
      return { id, role: { en: '', zh: '' }, company: { en: '', zh: '' }, date: { en: '', zh: '' }, description: { en: '', zh: '' } } as Experience
    }
    if (type === 'educations') {
      return { id, school: { en: '', zh: '' }, degree: { en: '', zh: '' }, date: { en: '', zh: '' } } as Education
    }
    if (type === 'projects') {
      return { id, category: { en: '', zh: '' }, title: { en: '', zh: '' }, description: { en: '', zh: '' }, longDescription: { en: '', zh: '' }, role: { en: '', zh: '' }, client: { en: '', zh: '' }, attribution: { en: '', zh: '' }, tags: [] as string[], href: '' } as Project
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

  const isBilingual = (field: string) => {
    return ['role', 'company', 'date', 'description', 'longDescription', 'school', 'degree', 'category', 'title', 'client', 'attribution'].includes(field)
  }

  const fields = getFields(type)

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4" onClick={onClose}>
      <div className="fixed inset-0 bg-black/60" />
      <div
        className="relative bg-zinc-900 border border-white/[0.08] rounded-xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-6">{isNew ? 'Add' : 'Edit'} {type.slice(0, -1)}</h2>

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
            if (isBilingual(field)) {
              const isTextarea = field === 'longDescription' || field === 'description'
              return (
                <div key={field}>
                  <label className="block text-xs text-zinc-500 mb-1 font-mono">{field}</label>
                  <div className="grid grid-cols-2 gap-3">
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

function getFields(type: Tab): string[] {
  switch (type) {
    case 'experiences':
      return ['role', 'company', 'date', 'description']
    case 'educations':
      return ['school', 'degree', 'date']
    case 'projects':
      return ['category', 'title', 'description', 'longDescription', 'role', 'client', 'attribution', 'tags', 'href']
    case 'services':
      return ['title', 'description', 'tags']
  }
}
