import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'

import styles from './Layout.module.css'
import { buildRev, buildYear, links, siteDescription, siteTitle } from '@/lib/site'

type LayoutProps = {
  children: ReactNode
  /** Page title; the site name is appended automatically. */
  title?: string
  description?: string
  /** Breadcrumb shown after the brand, e.g. "system diagram" or "projects". */
  section?: string
  /** Drawing sheet label in the header, e.g. "1/3". */
  sheet?: string
}

const NAV = [
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
]

export default function Layout({ children, title, description = siteDescription, section, sheet = '1/1' }: LayoutProps) {
  const { pathname } = useRouter()
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={links.avatar} />
        <meta name="twitter:card" content="summary" />
      </Head>

      <a className={styles.skip} href="#content">Skip to content</a>

      <header className={styles.header}>
        <div className={styles.inner}>
          <Link href="/" className={styles.brand} aria-label={`${siteTitle} home`}>
            <i aria-hidden="true" />
            <span>{siteTitle}</span>
            {section && <span className={styles.crumb}>/ {section}</span>}
          </Link>
          <nav className={styles.nav} aria-label="Primary">
            {NAV.map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(`${href}/`)
              return (
                <Link key={href} href={href} aria-current={active ? 'page' : undefined}>
                  {label}
                </Link>
              )
            })}
            <a href={links.github} target="_blank" rel="noopener noreferrer">
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </nav>
          {buildRev && (
            <div className={styles.rev} aria-hidden="true">
              Rev {buildRev} · Sheet {sheet}
            </div>
          )}
        </div>
      </header>

      <main id="content" className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        <div className={styles.inner}>
          <span>
            © {buildYear} Joe Williams · <a href={links.source} target="_blank" rel="noopener noreferrer">source (MIT)</a>
          </span>
          <span className={styles.footNote}>scale 1:1 · all dimensions approximate</span>
        </div>
      </footer>
    </>
  )
}
