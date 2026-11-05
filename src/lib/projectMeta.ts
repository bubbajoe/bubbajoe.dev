// Pure helpers (no fs) so they can be imported by client components.
import type { FileMetadata } from './common'
import { domains, FALLBACK_DOMAIN, milestones, plannedNodes, type Domain, type ProjectStatus } from './site'

export const STATUSES: ProjectStatus[] = ['running', 'stable', 'archived', 'queued']
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
  const s = String(p.status || '').trim().toLowerCase() as ProjectStatus
  if (STATUSES.includes(s)) return s
  return p.deprecated ? 'archived' : 'running'
}

export function normalizeDomain(domain?: string): string {
  const d = typeof domain === 'string' ? domain.trim().toLowerCase() : ''
  return d || FALLBACK_DOMAIN.id
}

/** Problems worth flagging at build time (typos would otherwise fall back silently). */
export function metadataWarnings(p: FileMetadata): string[] {
  const out: string[] = []
  if (p.domain !== undefined && !domains.some((d) => d.id === normalizeDomain(p.domain))) {
    out.push(`unknown domain "${p.domain}" (expected ${domains.map((d) => d.id).join(', ')}); shown under "${FALLBACK_DOMAIN.title}"`)
  }
  if (p.status !== undefined && !STATUSES.includes(String(p.status).trim().toLowerCase() as ProjectStatus)) {
    out.push(`unknown status "${p.status}" (expected ${STATUSES.join(', ')}); falling back to ${projectStatus({ deprecated: p.deprecated })}`)
  }
  return out
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
    domain: normalizeDomain(p.domain),
    href: `/projects/${p.id}`,
    featured: Boolean(p.featured),
    created: p.created || undefined,
    updated: p.updated || undefined,
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
        .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || STATUS_ORDER[a.status] - STATUS_ORDER[b.status]),
    }))
    .filter((g) => g.nodes.length > 0)
}

const byDateDesc = (a: LogEvent, b: LogEvent) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)

/** Milestones are always shown; project starts are capped to the most recent `maxProjectEvents`. */
export function buildEventLog(projects: FileMetadata[], maxProjectEvents = 6): LogEvent[] {
  const started: LogEvent[] = projects
    .filter((p) => yearMonth(p.created))
    .map((p) => ({ date: yearMonth(p.created), level: 'INFO', subject: p.id, text: 'project started' }))
    .sort(byDateDesc)
    .slice(0, maxProjectEvents)
  return [...milestones, ...started].sort(byDateDesc)
}
