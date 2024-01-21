import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { processMarkdown } from './common'

export async function getIntroMarkdown()  {
  const fullPath = path.join(process.cwd(), 'md/intro.md')
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // convert markdown to html string
  const contentHtml = await processMarkdown(matterResult.content)

  // Combine the data with the id and contentHtml
  return {
    contentHtml,
    ...matterResult.data
  }
}
