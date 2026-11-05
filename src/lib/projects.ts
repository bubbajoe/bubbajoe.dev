import fs from 'fs'
import path from 'path'
import { getAllIds, getAllSortedData, getData } from './common'
import { metadataWarnings } from './projectMeta'

const projectsDirectory = path.join(process.cwd(), 'md/projects')

let warned = false

export async function getSortedProjectsMetadata() {
  const projects = await getAllSortedData(projectsDirectory)
  if (!warned) {
    warned = true
    for (const p of projects) {
      for (const w of metadataWarnings(p)) console.warn(`[md/projects/${p.id}.md] ${w}`)
    }
  }
  return projects
}

export function getAllProjectIds() {
  return getAllIds(projectsDirectory)
}

export async function getProjectData(id: string)  {
  return getData(projectsDirectory, id)
}