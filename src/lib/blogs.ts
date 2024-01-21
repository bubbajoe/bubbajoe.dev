import path from 'path'
import { getAllIds, getAllSortedData, getData } from './common'

const blogsDirectory = path.join(process.cwd(), 'md/blogs')

export async function getSortedBlogsMetadata() {
  return getAllSortedData(blogsDirectory)
}

export function getAllBlogIds() {
  return getAllIds(blogsDirectory)
}

export async function getBlogData(id: string)  {
  return getData(blogsDirectory, id)
}
