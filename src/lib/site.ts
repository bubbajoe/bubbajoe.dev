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
  tagline: 'designs systems.',
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
  { id: 'ai', title: 'AI & agents', summary: 'LLM tooling, agentic robotics' },
  { id: 'infra', title: 'Distributed systems', summary: 'Raft, Paxos, k8s, Terraform' },
  { id: 'data', title: 'Data & video', summary: 'Pipelines, streaming, RTMP' },
]

export const FALLBACK_DOMAIN: Domain = { id: 'misc', title: 'Other', summary: 'Everything else' }

// Nodes that appear on the diagram but have no project page yet.
export const plannedNodes = [
  {
    id: 'robotics',
    name: 'Agentic robotics',
    summary: 'Very early. Nothing to show yet.',
    domain: 'ai',
    status: 'queued' as ProjectStatus,
  },
]

// Milestones that are not derivable from project frontmatter. Dates are YYYY-MM.
export const milestones = [
  { date: '2026-04', level: 'OK', subject: 'joe', text: 'left Indeed → M2W.ai full-time' },
  { date: '2018-12', level: 'OK', subject: 'joe', text: 'started in software, in Japan' },
  { date: '2014-05', level: 'INFO', subject: 'joe', text: 'joined GitHub' },
]

export const offHours = ['anime & manga', 'movies', 'podcasts', 'bbq', 'gym', 'robotics']
