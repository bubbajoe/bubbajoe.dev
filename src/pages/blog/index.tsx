import Head from 'next/head'
import Layout, { siteTitle } from '../../components/Layout'
import utilStyles from '../../styles/utils.module.css'
import { getSortedPostsData } from '../../lib/posts'
import Link from 'next/link'
import Date from '../../components/Date'

export default function Blog({ allPostsData }) {
  return (
    <Layout title="blog">
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Welcome to my blog, please check out my posts below.
        </p>
        <p>
          I decided to create a blog to track my progress as I learn new 
          technologies and to share my experiences with others.
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.length === 0 ? (
            <li className={utilStyles.listItem} key="no-posts">
              <p>😔 No blogs yet...</p>
            </li>
          ) : (
            allPostsData.map(({ id, date, title, tags }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/blog/${id}`}>{title}</Link>
                <br />
                <small className={utilStyles.lightText}>
                  {tags?.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                  {tags?.length > 0 && " | "}
                  <Date dateString={date} />
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
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
