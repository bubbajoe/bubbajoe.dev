import Head from 'next/head'
import Layout, { siteTitle } from '../../components/Layout'
import utilStyles from '../../styles/utils.module.css'
import { getSortedBlogsMetadata } from '../../lib/blogs'
import Link from 'next/link'
import DateDisplayer from '../../components/DateDisplayer'

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
            allBlogsData.map(({ id, created, updated, title, tags }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/blog/${id}`}>{title}</Link>
                <br />
                <small className={utilStyles.lightText}>
                  {tags?.map((tag: string) => (
                    <span key={tag}>{tag}</span>
                  ))}
                  {tags?.length > 0 && " | "}
                  <DateDisplayer label="created" dateString={created} />
                  {updated && " | "}
                  <DateDisplayer label="updated" dateString={updated} />
                </small>
                <br />
                <small className={utilStyles.lightText}>
                </small>
              </li>
          )))}
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
