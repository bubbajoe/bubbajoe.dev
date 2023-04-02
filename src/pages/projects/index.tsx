import Head from 'next/head'
import Layout, { siteTitle } from '@/components/Layout'
import utilStyles from '@/styles/utils.module.css'
import { getSortedProjectsData } from '@/lib/projects'
import Link from 'next/link'
import Date from '@/components/Date'

export default function Project({ allProjectsData }) {
  return (
    <Layout title="projects">
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Welcome to my projects page, please check out my projects below.
        </p>
        <p>
          I am creating this section to track the many projects I start. 
          Most of the projects here will be closed source most likely and 
          non-work related.
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allProjectsData.length === 0 ? (
            <li className={utilStyles.listItem} key="no-posts">
              <p>😔 No projects yet...</p>
            </li>
          ) : (
            allProjectsData.map(({ id, date, title, tags }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/projects/${id}`}>{title}</Link>
                <br />
                <small className={utilStyles.lightText}>
                  {tags?.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                  {tags?.length > 0 && " | "}
                  <Date dateString={date} />
                </small>
                <br />
                <small className={utilStyles.lightText}>
                </small>
              </li>
          )))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allProjectsData = getSortedProjectsData()
  return {
    props: {
      allProjectsData
    }
  }
}
