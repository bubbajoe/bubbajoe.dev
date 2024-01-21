import fs from 'fs'
import path from 'path'
import { getAllIds, getAllSortedData, getData } from './common'

const projectsDirectory = path.join(process.cwd(), 'md/projects')

export async function getSortedProjectsMetadata() {
  return getAllSortedData(projectsDirectory)
}

export function getAllProjectIds() {
  return getAllIds(projectsDirectory)
}

export async function getProjectData(id: string)  {
  return getData(projectsDirectory, id)
}