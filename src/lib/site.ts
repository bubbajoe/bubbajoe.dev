// Static site content used by the blueprint layout. Long-form content still lives in /md.

export const siteTitle = 'bubbajoe.dev'
export const siteDescription =
  'Joe Williams — software engineer and co-founder of M2W.ai, based in Tokyo. Projects, writing and notes on distributed systems.'

// Injected at build time (next.config.js) so server and client render the same value.
export const buildRev = process.env.NEXT_PUBLIC_BUILD_REV || ''
export const buildYear = buildRev.split('.')[0] || ''

// Home page hero. `lede` is markdown, rendered at build time.
export const hero = {
  eyebrow: '// engineer → founder',
  name: 'Joe Williams',
  // Typed in order by the hero cursor; the last one stays.
  phrases: ['designs systems', 'orchestrates agents', 'gets sh*t done'],
  lede:
    'Distributed-systems engineer, now co-founder of [M2W.ai](/projects/m2w-ai), an AI manga editor. ' +
    'Previously at **Indeed**. Writes mostly **Go** and **Rust**. Based in **Tokyo**.',
}

export const links = {
  github: 'https://github.com/BubbaJoe',
  linkedin: 'https://www.linkedin.com/in/bubbajoe',
  source: 'https://github.com/BubbaJoe/bubbajoe.dev',
  avatar: 'https://github.com/bubbajoe.png',
}

// Career start in Japan; drives the "~N yrs" figures (same anchor the old intro used).
const CAREER_START = new Date(2018, 11)

export function yearsOfExperience(now: Date = new Date()): string {
  const months =
    now.getMonth() - CAREER_START.getMonth() + 12 * (now.getFullYear() - CAREER_START.getFullYear())
  return (months / 12).toFixed(1)
}

export type ProjectStatus = 'running' | 'stable' | 'archived' | 'queued'

export type Domain = {
  id: string
  title: string
  summary: string
}

// Order here is the order on the diagram.
export const domains: Domain[] = [
  { id: 'ai', title: 'AI & agents', summary: 'Agents, LLM products, AI infra' },
  { id: 'infra', title: 'Distributed systems', summary: 'Raft, Paxos, k8s, Terraform' },
  { id: 'data', title: 'Data & video', summary: 'Pipelines, streaming, RTMP' },
]

export const FALLBACK_DOMAIN: Domain = { id: 'misc', title: 'Other', summary: 'Everything else' }

export type PlannedNode = {
  id: string
  name: string
  summary: string
  domain: string
  status: ProjectStatus
}

// Nodes that appear on the diagram but have no project page yet, e.g.
// { id: 'robotics', name: 'Agentic robotics', summary: 'Very early.', domain: 'ai', status: 'queued' }
export const plannedNodes: PlannedNode[] = []

// Milestones that are not derivable from project frontmatter. Dates are YYYY-MM.
export const milestones = [
  { date: '2026-04', level: 'OK', subject: 'joe', text: 'left Indeed → M2W.ai full-time' },
  { date: '2018-12', level: 'OK', subject: 'joe', text: 'started in software, in Japan' },
  { date: '2014-05', level: 'INFO', subject: 'joe', text: 'joined GitHub' },
]

// DEBUG lines in the event log: real-ish activity, redacted for privacy. Dates are deliberately
// approximate. `redacted` is the width of the redaction bar, in characters.
export const redactedLog = [
  { date: '2026-08', level: 'DEBUG', subject: 'redacted', text: 'PoC started', redacted: 7 },
  { date: '2026-01', level: 'DEBUG', subject: 'redacted', text: 'project done', redacted: 5 },
  { date: '2025-09', level: 'DEBUG', subject: 'redacted', text: 'client project started', redacted: 9 },
  { date: '2024-12', level: 'DEBUG', subject: 'redacted', text: 'migration done', redacted: 6 },
  { date: '2022-10', level: 'DEBUG', subject: 'redacted', text: 'side project started', redacted: 8 },
  { date: '2021-03', level: 'DEBUG', subject: 'redacted', text: 'project done', redacted: 7 },
]

export const offHours = ['anime & manga', 'movies', 'podcasts', 'bbq', 'gym', 'robotics']
