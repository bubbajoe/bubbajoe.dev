import Head from 'next/head'
import Layout, { siteTitle } from '../../components/Layout'
import utilStyles from '../../styles/utils.module.css'
import { getSortedBlogsMetadata } from '../../lib/blogs'
import { displayTitle } from '..'

export default function Blog({ allBlogsData }) {
  return (
    <Layout title="blog">
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Welcome to my blog, please check out my blogs below.
        </p>
        <p>
          I decided to create a blog to track my progress as I learn new 
          technologies and to share my experiences with others.
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blogs</h2>
        <ul className={utilStyles.list}>
          {allBlogsData.length === 0 ? (
            <li className={utilStyles.listItem} key="no-blogs">
              <p>😔 No blogs yet...</p>
            </li>
          ) : (
            allBlogsData.map((matter: any) =>
              displayTitle('/blog', matter))
          )}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allBlogsData = await getSortedBlogsMetadata()
  return {
    props: {
      allBlogsData
    }
  }
}
