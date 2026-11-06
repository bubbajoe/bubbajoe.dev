import Link from 'next/link'
import { useEffect } from 'react'
import mermaid from 'mermaid'

import Layout from './Layout'
import StatusBadge from './StatusBadge'
import s from '@/styles/sections.module.css'
import type { FileMetadata } from '@/lib/common'
import { projectStatus, splitTitle } from '@/lib/projectMeta'

type ArticleProps = {
  kind: 'projects' | 'blog'
  data: FileMetadata & { contentHtml: string }
}

/** Long-form page shared by project pages and blog posts. */
export default function Article({ kind, data }: ArticleProps) {
  useEffect(() => {
    mermaid.run({ querySelector: '.language-mermaid' }).catch(() => {
      /* leave the source visible if a diagram fails to render */
    })
  }, [data.id])

  const { name, tagline } = splitTitle(data.title || data.id)
  const isProject = kind === 'projects'
  const tags = Array.isArray(data.tags) ? data.tags : []

  return (
    <Layout title={name} description={data.summary || tagline || undefined} section={kind} sheet={isProject ? '2/3' : '3/3'}>
      <div className={s.article}>
        <header className={s.articleHead}>
          <p className={s.eyebrow}>
            <Link href={`/${kind}`}>{kind}</Link> / {data.id}
          </p>
          <h1 className={s.pageTitle}>{name}</h1>
          {tagline && <p className={s.tagline}>{tagline}</p>}
        </header>

        <aside className={s.aside} aria-label="Details">
          <dl className={s.specList}>
            {isProject && (
              <>
                <dt>Status</dt>
                <dd><StatusBadge status={projectStatus(data)} /></dd>
              </>
            )}
            {data.domain && (
              <>
                <dt>Domain</dt>
                <dd>{data.domain}/</dd>
              </>
            )}
            {data.created && (
              <>
                <dt>Created</dt>
                <dd><time dateTime={data.created}>{data.created}</time></dd>
              </>
            )}
            {data.updated && (
              <>
                <dt>Updated</dt>
                <dd><time dateTime={data.updated}>{data.updated}</time></dd>
              </>
            )}
            {tags.length > 0 && (
              <>
                <dt>Tags</dt>
                <dd className={s.tags}>
                  {tags.map((t) => <span key={t}>{t}</span>)}
                </dd>
              </>
            )}
          </dl>
          <Link href={`/${kind}`} className={s.back}>← All {kind}</Link>
        </aside>

        <div className={`prose ${s.body}`} dangerouslySetInnerHTML={{ __html: data.contentHtml }} />
      </div>
    </Layout>
  )
}
