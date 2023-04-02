import Head from 'next/head'
import Layout, { siteTitle } from '@/components/Layout'
import utilStyles from '@/styles/utils.module.css'
import { getSortedPostsData } from '@/lib/posts'
import Link from 'next/link'
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai'


export default function Home({ allPostsData }) {
  const numYears = (monthDiff(new Date(2018, 11), new Date()) / 12.0).toFixed(1);
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <div className={utilStyles.headingLinks}>
          <Link href="/blog">Blog</Link>
          <Link href="/projects">Projects</Link>
          <a target="_blank" href="https://github.com/BubbaJoe">
            Github&nbsp;<AiFillGithub style={{
              verticalAlign: "text-bottom",
            }} />
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/bubbajoe">
            Linkedin&nbsp;<AiFillLinkedin style={{
              verticalAlign: "text-bottom",
            }} />
          </a>
        </div>
        <p>
          Hello, my name is Joe Williams and welcome to my website! please check the source code <a target="_blank" href="https://github.com/BubbaJoe/bubbajoe.dev">here</a>.
        </p>
        <p>
          <strong>About me:</strong> I am a Software Engineer currently living in Japan. I have been working in the software industry and Japan for around ~{numYears} years.
          I have worked on many personal and work projects including: Back-end APIs in Node/Rust/Go to Data Pipelines using AirByte/Cloudquery/Debezium to Front-end using React/NextJS.
        </p>
        <p>
          <strong>Interests:</strong> Let me seprate my interests in 3 categories: Tech Concepts, Tech Positions, and Personal Interests.
          <br /><br />
          Tech Concepts -
          Live Streaming (RTMP, HLS, WebRTC),
          API Gateways (Kong, Traefik, etc.),
          Ditributed Systems & Consensus (Raft, Paxos, etc.),
          Database (Apache Arrow, )
          <br /><br />
          Tech Positions -
          Data Engineering (Data Pipelines, Data Warehousing, Data Lakes, Data Streaming),
          Back-end Development (APIs, Microservices, Serverless),
          Dev-ops (CI/CD, Infrastructure as Code, Kubernetes),
          Video Engineering * (Video Streaming, Video Transcoding, Video Analytics),
          AI/ML * (Recommender Systems, Online Learning, Time Series Analysis).
          <br /><br />
          Personal Interests -
          3D Printing (I have a Prusa SL1S),
          Video Games (Apex Legends and Valorant),
          Drama (Rick and Morty, Snowfall, Breaking Bad, etc.),
          Music (Rap, Lofi, Jazz, etc.),
          Food & Cooking!
          <br /><br />
          * - recently started learning about these topics.
        </p>
      </section>
      {/* hidden sitemap link */}
      <a href="/sitemap.xml" style={{ display: "none" }}>_</a>
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

function monthDiff(dateFrom: Date, dateTo: Date): number {
  return dateTo.getMonth() - dateFrom.getMonth() + 
    (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
 }
 