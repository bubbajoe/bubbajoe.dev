import Layout from '@/components/Layout'
import { getAllProjectIds, getProjectData } from '@/lib/projects'
import Head from 'next/head'
import DateDisplayer from '@/components/DateDisplayer'
import utilStyles from '@/styles/utils.module.css'
import { use, useEffect } from 'react'
import mermaid from 'mermaid'

export default function ProjectEntry({ projectData }) {
  useEffect(() => {
    mermaid.run({
      querySelector: '.language-mermaid',
    })
  }, [projectData])
  return (
    <Layout title="projects" backName="projects" backHref="/projects">
      <Head>
        <title>{projectData.title} | bubbajoe.dev</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{projectData.title}</h1>
        <div className={utilStyles.lightText}>
          <DateDisplayer label="created" dateString={projectData.created} />
          <DateDisplayer style={{float: 'right'}} label="updated" dateString={projectData.updated} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: projectData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const projects = await getAllProjectIds()
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
