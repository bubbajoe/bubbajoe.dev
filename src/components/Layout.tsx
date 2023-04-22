import Head from 'next/head'
import Image from 'next/image'

import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

export const siteTitle = 'bubbajoe.dev'

export default function Layout({ children, title="home", backName="home", backHref="/" }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content="https://github.com/bubbajoe.png"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {(title === "home") ? (
            <Image
              priority
              src="https://github.com/bubbajoe.png"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt='bubbajoe.dev'
            />
        ) : (
          <div style={{
            display: 'flex',
            justifyContent: "space-between",
            width: "100%",
            marginBottom: "2rem"
          }}>
          <h2 className={utilStyles.headingLg}>
            <Link href={backHref} className={utilStyles.colorInherit}>
              {title} | bubbajoe.dev
            </Link>
          </h2>
            <Link href={"/"}>
              <Image
                priority
                src="https://github.com/bubbajoe.png"
                className={utilStyles.borderCircle}
                height={82}
                width={82}
                alt={backName}
              />
            </Link>
          </div>
        )}
      </header>
      <main>{children}</main>
      {title !== "home" && (
        <div className={styles.backToHome}>
          <Link href={backHref}>← Back to {backName}</Link>
        </div>
      )}
    </div>
  )
}
