import mermaid from 'mermaid';
import Head from 'next/head'
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';

import '@/styles/global.css'

// next/font downloads these at build time and serves them from this site (no runtime Google requests).
const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

mermaid.initialize({
  startOnLoad: true,
  theme: 'base',
  securityLevel: 'loose',
  fontFamily: plexMono.style.fontFamily,
  fontSize: 14,
  themeVariables: {
    background: 'transparent',
    primaryColor: '#0e2443',
    primaryTextColor: '#dce8ff',
    primaryBorderColor: '#7fd7ff',
    secondaryColor: '#0b1d36',
    tertiaryColor: '#0b1d36',
    lineColor: '#7fd7ff',
    textColor: '#dce8ff',
    noteBkgColor: '#0e2443',
    noteTextColor: '#dce8ff',
  },
})

if (typeof window !== 'undefined') {
  const logger = () => {
    const eid = crypto.randomUUID();
    const uid = localStorage.getItem('uid') || crypto.randomUUID();
    const sid = sessionStorage.getItem('sid') || crypto.randomUUID();
    localStorage.setItem('uid', uid);
    localStorage.setItem('sid', sid);
    window.navigator.sendBeacon(`https://events.dgate.cloud/log?etype=webeventv1&eid=${eid}`, JSON.stringify({
      event: 'pageview',
      event_id: eid,
      user_id: uid,
      session_id: sid,
      url: window.location.href,
      path: window.location.pathname,
      language: navigator.language,
      referrer: document.referrer,
      user_agent: navigator.userAgent,
      screen_width: window.screen.width,
      screen_height: window.screen.height,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timestamp: new Date().toISOString(),
    }));
  };

  if (window['navigation']) {
    window['navigation']?.addEventListener('navigate', logger)
  } else {
    window.addEventListener('load', logger);
  }
}

export default function App({ Component, pageProps }) {
  return <>
    <div className={`${plexSans.variable} ${plexMono.variable} app`}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="theme-color" content="#0b1d36"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </div>
  </>;
}
