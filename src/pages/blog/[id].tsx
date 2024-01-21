import Layout from '@/components/Layout'
import { getAllBlogIds, getBlogData } from '@/lib/blogs'
import Head from 'next/head'
import DateDisplayer from '@/components/DateDisplayer'
import utilStyles from '@/styles/utils.module.css'
import { useEffect } from 'react'
import mermaid from 'mermaid'

export default function BlogEntry({ blogData }) {
  useEffect(() => {
    mermaid.run({
      querySelector: '.language-mermaid',
    })
  }, [blogData])
  return (
    <Layout title="blog" backName="blog" backHref="/blog">
      <Head>
        <title>{blogData.title} | bubbajoe.dev</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{blogData.title}</h1>
        <div className={utilStyles.lightText}>
          <DateDisplayer label="created" dateString={blogData.created} />
          <DateDisplayer style={{float: 'right'}} label="updated" dateString={blogData.updated} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: blogData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const blogs = await getAllBlogIds()
  return {
    paths: blogs.map((blogData) => (
      { params: blogData }
    )),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const blogData = await getBlogData(params.id)
  return {
    props: {
      blogData
    }
  }
}
