// Pure helpers (no fs) so they can be imported by client components.
import type { FileMetadata } from './common'
import { domains, FALLBACK_DOMAIN, milestones, plannedNodes, type Domain, type ProjectStatus } from './site'

const STATUSES: ProjectStatus[] = ['running', 'stable', 'archived', 'queued']
const STATUS_ORDER: Record<ProjectStatus, number> = { running: 0, stable: 1, queued: 2, archived: 3 }

export type DiagramNode = {
  id: string
  name: string
  summary: string
  status: ProjectStatus
  domain: string
  href?: string
  featured?: boolean
  created?: string
  updated?: string
}

export type DomainGroup = { domain: Domain; nodes: DiagramNode[] }

export type LogEvent = { date: string; level: string; subject: string; text: string }

/** "M2W.ai - AI Manga Editor" → { name: "M2W.ai", tagline: "AI Manga Editor" } */
export function splitTitle(title = ''): { name: string; tagline: string } {
  const i = title.indexOf(' - ')
  if (i === -1) return { name: title.trim(), tagline: '' }
  return { name: title.slice(0, i).trim(), tagline: title.slice(i + 3).trim() }
}

export function projectStatus(p: Pick<FileMetadata, 'status' | 'deprecated'>): ProjectStatus {
  const s = (p.status || '').toLowerCase() as ProjectStatus
  if (STATUSES.includes(s)) return s
  return p.deprecated ? 'archived' : 'running'
}

/** "2025-05-29" → "2025-05"; tolerates missing/short values. */
export function yearMonth(date?: string): string {
  return typeof date === 'string' ? date.slice(0, 7) : ''
}

export function dateSpan(node: Pick<DiagramNode, 'created' | 'updated' | 'status'>): string {
  const from = yearMonth(node.created)
  if (!from) return '—'
  if (node.status === 'running') return `${from} →`
  const to = yearMonth(node.updated)
  return to && to !== from ? `${from} → ${to}` : from
}

export function toNode(p: FileMetadata): DiagramNode {
  const { name, tagline } = splitTitle(p.title || p.id)
  return {
    id: p.id,
    name,
    summary: p.summary || tagline,
    status: projectStatus(p),
    domain: p.domain || FALLBACK_DOMAIN.id,
    href: `/projects/${p.id}`,
    featured: Boolean(p.featured),
    created: p.created || null,
    updated: p.updated || null,
  }
}

/** Groups projects (plus planned nodes) under the configured domains; empty domains are dropped. */
export function groupByDomain(projects: FileMetadata[]): DomainGroup[] {
  const nodes: DiagramNode[] = [...projects.map(toNode), ...plannedNodes.map((n) => ({ ...n }))]
  const known = new Set(domains.map((d) => d.id))
  const all = [...domains, FALLBACK_DOMAIN]
  return all
    .map((domain) => ({
      domain,
      nodes: nodes
        .filter((n) => (known.has(n.domain) ? n.domain : FALLBACK_DOMAIN.id) === domain.id)
        // Array.prototype.sort is stable, so the incoming (date) order is kept within a status.
        .sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]),
    }))
    .filter((g) => g.nodes.length > 0)
}

export function buildEventLog(projects: FileMetadata[], limit = 8): LogEvent[] {
  const started: LogEvent[] = projects
    .filter((p) => yearMonth(p.created))
    .map((p) => ({ date: yearMonth(p.created), level: 'INFO', subject: p.id, text: 'project started' }))
  return [...milestones, ...started]
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
    .slice(0, limit)
}
