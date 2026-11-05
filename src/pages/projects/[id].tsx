import Article from '@/components/Article'
import { getAllProjectIds, getProjectData } from '@/lib/projects'

export default function ProjectEntry({ projectData }) {
  return <Article kind="projects" data={projectData} />
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
