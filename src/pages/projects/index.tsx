import Head from 'next/head'
import Layout, { siteTitle } from '@/components/Layout'
import utilStyles from '@/styles/utils.module.css'
import { getSortedProjectsMetadata } from '@/lib/projects'
import { displayTitle } from '..'

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
          I am creating this section to track the many projects I start, but end up forgetting... 
          Most of the projects here will be closed source, unless otherwise specified. 
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Projects</h2>
        <ul className={utilStyles.list}>
          {allProjectsData.length === 0 ? (
            <li className={utilStyles.listItem} key="no-projects">
              <p>😔 No projects yet...</p>
            </li>
          ) : (
            allProjectsData.map((matter: any) =>
              displayTitle('/projects', matter))
          )}
        </ul>
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
