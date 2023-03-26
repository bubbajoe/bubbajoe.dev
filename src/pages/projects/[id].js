import Layout from '~/components/layout'
import { getAllProjectIds, getProjectData } from '../../lib/projects'
import Head from 'next/head'
import Date from '~/components/date'
import utilStyles from '~/styles/utils.module.css'

export default function ProjectEntry({ projectData }) {
  return (
    <Layout title="projects" backName="projects" backHref="/projects">
      <Head>
        <title>{projectData.title} | bubbajoe.dev</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{projectData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={projectData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: projectData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const projects = getAllProjectIds()
  return {
    paths: projects.map((project) => (
      { params: project }
    )),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const projectData = await getProjectData(params.id)
  return {
    props: {
      projectData
    }
  }
}
