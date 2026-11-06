import Article from '@/components/Article'
import { getAllBlogIds, getBlogData } from '@/lib/blogs'

export default function BlogEntry({ blogData }) {
  return <Article kind="blog" data={blogData} />
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
