import Link from 'next/link'

import Layout from '@/components/Layout'
import SystemDiagram from '@/components/SystemDiagram'
import TokyoClock from '@/components/TokyoClock'
import s from '@/styles/sections.module.css'
import { processMarkdown, type FileMetadata } from '@/lib/common'
import { getIntroMarkdown } from '@/lib/intro'
import { getSortedProjectsMetadata } from '@/lib/projects'
import { getSortedBlogsMetadata } from '@/lib/blogs'
import { buildEventLog, groupByDomain } from '@/lib/projectMeta'
import { hero, links, offHours, yearsOfExperience } from '@/lib/site'

type HomeProps = {
  heroHtml: string
  introHtml: string
  projects: FileMetadata[]
  blogCount: number
  yoe: string
}

const LEVEL_CLASS: Record<string, string> = { OK: s.ok, INFO: s.info, WARN: s.warn }

export default function Home({ heroHtml, introHtml, projects, blogCount, yoe }: HomeProps) {
  const groups = groupByDomain(projects)
  const events = buildEventLog(projects)

  return (
    <Layout section="system diagram" sheet="1/3">
      <section className={s.hero}>
        <div>
          <p className={s.eyebrow}>{hero.eyebrow}</p>
          <h1 className={s.title}>
            <b>{hero.name}</b>
            <br />
            {hero.tagline}
          </h1>
          <div className={s.dimLine} aria-hidden="true">
            <span>~{yoe} yrs · software · Japan</span>
          </div>
        </div>
        <div className={s.lede} dangerouslySetInnerHTML={{ __html: heroHtml }} />
      </section>

      <SystemDiagram groups={groups} yoe={yoe} />

      <div className={s.lower}>
        <section className={s.box} aria-labelledby="readme">
          <h2 id="readme" className={s.boxHead}>
            <span>README.md</span>
            <a href={links.source} target="_blank" rel="noopener noreferrer">view source ↗</a>
          </h2>
          <div className={`prose ${s.readme}`} dangerouslySetInnerHTML={{ __html: introHtml }} />
        </section>

        <div className={s.stack}>
          <section className={s.box} aria-labelledby="event-log">
            <h2 id="event-log" className={s.boxHead}>
              <span>Event log</span>
              <span aria-hidden="true">tail -f</span>
            </h2>
            <ol className={s.log}>
              {events.map((e) => (
                <li key={`${e.date}-${e.subject}-${e.text}`}>
                  <time className={s.logDate}>{e.date}</time>
                  <span className={`${s.logLevel} ${LEVEL_CLASS[e.level] || ''}`}>{e.level}</span>
                  <span>
                    <b>{e.subject}</b>: {e.text}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section className={s.box} aria-labelledby="title-block">
            <h2 id="title-block" className={s.boxHead}>
              <span>Title block</span>
              <span>bubbajoe.dev</span>
            </h2>
            <table className={s.titleBlock}>
              <tbody>
                <tr><th scope="row">Drawn by</th><td>J. Williams</td></tr>
                <tr>
                  <th scope="row">Location</th>
                  <td>Tokyo · 35.68°N 139.69°E · <TokyoClock /> JST</td>
                </tr>
                <tr><th scope="row">Off-hours</th><td>{offHours.join(' · ')}</td></tr>
                <tr>
                  <th scope="row">Writing</th>
                  <td>
                    <Link href="/blog">/blog</Link>{' '}
                    — {blogCount > 0 ? `${blogCount} post${blogCount === 1 ? '' : 's'}` : 'first post in review'}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Contact</th>
                  <td>
                    <a href={links.github} target="_blank" rel="noopener noreferrer">github/BubbaJoe</a> ·{' '}
                    <a href={links.linkedin} target="_blank" rel="noopener noreferrer">linkedin/bubbajoe</a>
                  </td>
                </tr>
                <tr><th scope="row">Status</th><td><span className={s.stamp}>Approved for build</span></td></tr>
              </tbody>
            </table>
          </section>
        </div>
      </div>
      {/* hidden sitemap link */}
      <a href="/sitemap.xml" style={{ display: 'none' }}>_</a>
    </Layout>
  )
}

export async function getStaticProps() {
  const [introMd, projects, blogs, heroHtml] = await Promise.all([
    getIntroMarkdown(),
    getSortedProjectsMetadata(),
    getSortedBlogsMetadata(),
    processMarkdown(hero.lede),
  ])
  const yoe = yearsOfExperience()
  return {
    props: {
      heroHtml,
      introHtml: introMd.contentHtml.replace('{{YOE}}', yoe),
      projects,
      blogCount: blogs.length,
      yoe,
    },
  }
}
