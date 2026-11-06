import Link from 'next/link'

import Layout from '@/components/Layout'
import StatusBadge from '@/components/StatusBadge'
import s from '@/styles/sections.module.css'
import type { FileMetadata } from '@/lib/common'
import { getSortedProjectsMetadata } from '@/lib/projects'
import { dateSpan, toNode } from '@/lib/projectMeta'

export default function Projects({ allProjectsData }: { allProjectsData: FileMetadata[] }) {
  return (
    <Layout title="Projects" section="projects" sheet="2/3">
      <header className={s.pageHead}>
        <p className={s.eyebrow}>// sheet 2 — parts list</p>
        <h1 className={s.pageTitle}>Projects</h1>
        <p className={s.lede}>
          I use this page to track the many projects I start, but end up forgetting… Most of them are closed
          source unless marked <code>oss</code>.
        </p>
      </header>

      <section className={s.box} aria-label="Projects">
        <h2 className={s.boxHead}>
          <span>Parts list</span>
          <span>{allProjectsData.length} items</span>
        </h2>
        {allProjectsData.length === 0 ? (
          <p className={s.empty}>No projects yet.</p>
        ) : (
          <table className={s.parts}>
            <thead>
              <tr>
                <th scope="col">Part</th>
                <th scope="col">Status</th>
                <th scope="col">Span</th>
                <th scope="col">Tags</th>
              </tr>
            </thead>
            <tbody>
              {allProjectsData.map((p) => {
                const node = toNode(p)
                const tags = Array.isArray(p.tags) ? p.tags : []
                return (
                  <tr key={p.id} className={node.status === 'archived' ? s.archivedRow : undefined}>
                    <td className={s.partCell}>
                      <div className={s.part}>
                        <span className={s.partId}>
                          {node.domain}/{p.id}
                        </span>
                        <Link href={`/projects/${p.id}`} className={s.partName}>
                          {node.name}
                        </Link>
                        {node.summary && <span className={s.partSummary}>{node.summary}</span>}
                      </div>
                    </td>
                    <td><StatusBadge status={node.status} /></td>
                    <td className={s.mono}>{dateSpan(node)}</td>
                    <td className={s.tagCell}>
                      <div className={s.tags}>
                        {tags.map((t) => <span key={t}>{t}</span>)}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allProjectsData = await getSortedProjectsMetadata()
  return {
    props: {
      allProjectsData
    }
  }
}
