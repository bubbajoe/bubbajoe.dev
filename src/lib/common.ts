import fs from 'fs/promises'
import path from 'path'
import {micromark} from 'micromark'
import {gfm, gfmHtml} from 'micromark-extension-gfm'
import matter from 'gray-matter'

export type FileMetadata = {
    id: string
    title?: string
    created?: string
    updated?: string
    tags?: string[]
}

export async function getAllSortedData(directory: string): Promise<FileMetadata[]> {
    const fileNames = await getAllIds(directory)
    const allData: FileMetadata[] = await Promise.all(fileNames.map(async ({fileName}) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '')

      // Read markdown file as string
      const fullPath = path.join(directory, fileName)
      const fileContents = await fs.readFile(fullPath, 'utf8')

      // Use gray-matter to parse the project metadata section
      const matterResult = matter(fileContents)

      // Combine the data with the id
      return {
        id,
        ...matterResult.data
      }
    }));
    // Sort projects by date
    return allData.sort((a, b) => {
      const aData = Date.parse(a.updated || a.created)
      const bData = Date.parse(b.updated || b.created)
      
      if (aData && bData) {
        if (aData === bData) {
          return a?.title < b?.title ? 1 : -1
        }
        return aData < bData ? 1 : -1
      } else if (!aData && !bData) {
        return a?.title < b?.title ? 1 : -1
      }
      return aData ? 1 : -1
    })
}

export async function getAllIds(directory: string) {
    const fileNames = await fs.readdir(directory)
    return fileNames
      .filter(fileNames => fileNames.endsWith('.md'))
      .filter(fileNames => !fileNames.startsWith('_'))
      .map(fileName => {
        return {
          id: fileName.replace(/\.md$/, ''),
          fileName,
        }
      })
}

export async function getData(directory: string, id: string)  {
  const fullPath = path.join(directory, `${id}.md`)
  const fileContents = await fs.readFile(fullPath, 'utf8')

  // Use gray-matter to parse the blog metadata section
  const matterResult = matter(fileContents)

  // convert markdown to html string
  const contentHtml = await processMarkdown(matterResult.content)

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}

export async function processMarkdown(markdown: string) {
  return micromark(markdown, {
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()]
  })
}