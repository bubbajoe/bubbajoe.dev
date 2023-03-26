import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'

export default function Home({ allPostsData }) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Welcome to my website! please check out the <a target="_blank" href="https://github.com/BubbaJoe/bubbajoe.dev">source code</a>
        </p>
        <p>
          About me: ...
        </p>
        <p>
          Interests: ...
        </p>
        <p>
          <Link href="/blog">Tech Blog</Link>
        </p>
        <p>
          <Link href="/projects">Personal Projects</Link>
        </p>
        <p>
          <a target="_blank" href="https://github.com/BubbaJoe">Github</a>
        </p>
        <p>
          <a target="_blank" href="https://www.linkedin.com/in/bubbajoe">LinkedIn</a>
        </p>
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
