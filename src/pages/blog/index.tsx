import Link from 'next/link'

import Layout from '@/components/Layout'
import s from '@/styles/sections.module.css'
import type { FileMetadata } from '@/lib/common'
import { getSortedBlogsMetadata } from '@/lib/blogs'

export default function Blog({ allBlogsData }: { allBlogsData: FileMetadata[] }) {
  return (
    <Layout title="Blog" section="blog" sheet="3/3">
      <header className={s.pageHead}>
        <p className={s.eyebrow}>// sheet 3 — writing log</p>
        <h1 className={s.pageTitle}>Blog</h1>
        <p className={s.lede}>
          I decided to create a blog to track my progress as I learn new technologies and to share my experiences
          with others.
        </p>
      </header>

      <section className={s.box} aria-label="Posts">
        <h2 className={s.boxHead}>
          <span>Posts</span>
          <span>{allBlogsData.length} entries</span>
        </h2>
        {allBlogsData.length === 0 ? (
          <p className={s.empty}>
            <span className={s.warnText}>WARN</span> no posts yet — the first one is still in review.
          </p>
        ) : (
          <ol className={s.posts}>
            {allBlogsData.map((post) => (
              <li key={post.id}>
                <time className={s.mono} dateTime={post.updated || post.created}>
                  {post.updated || post.created || '—'}
                </time>
                <Link href={`/blog/${post.id}`} className={s.partName}>
                  {post.title || post.id}
                </Link>
                <span className={s.tags}>
                  {(Array.isArray(post.tags) ? post.tags : []).map((t) => <span key={t}>{t}</span>)}
                </span>
              </li>
            ))}
          </ol>
        )}
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allBlogsData = await getSortedBlogsMetadata()
  return {
    props: {
      allBlogsData
    }
  }
}
