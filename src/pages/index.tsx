import Head from 'next/head'
import Layout, { siteTitle } from '@/components/Layout'
import utilStyles from '@/styles/utils.module.css'
import Link from 'next/link'
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai'
import { getIntroMarkdown } from '@/lib/intro'

const YOE = (monthDiff(new Date(2018, 11), new Date()) / 12.0).toFixed(1);

export default function Home({ introMd }) {
  const introMdHtml = introMd.contentHtml.replace("{{YOE}}", YOE)
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      { introMd.title ? <h1 style={{ textAlign: "center" }}>{introMd.title}</h1> : null }
      <section className={utilStyles.headingMd}>
        <div className={utilStyles.headingLinks}>
          <Link href="/blog">Blog</Link>
          <Link href="/projects">Projects</Link>
          <a target="_blank" href="https://github.com/BubbaJoe">
            Github&nbsp;<AiFillGithub style={{
              verticalAlign: "text-top",
            }} />
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/bubbajoe">
            Linkedin&nbsp;<AiFillLinkedin style={{
              verticalAlign: "text-top",
            }} />
          </a>
        </div>
        <div dangerouslySetInnerHTML={{ __html: introMdHtml }} />
      </section>
      {/* hidden sitemap link */}
      <a href="/sitemap.xml" style={{ display: "none" }}>_</a>
    </Layout>
  )
}

export async function getStaticProps() {
  const introMd = await getIntroMarkdown()
  return {
    props: {
      introMd
    }
  }
}

function monthDiff(dateFrom: Date, dateTo: Date): number {
  return dateTo.getMonth() - dateFrom.getMonth() + 
    (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
 }
 