import mermaid from 'mermaid';
import Head from 'next/head'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/react';

import '@/styles/global.css'

// IBM Plex (OFL, latin subset) is committed under src/fonts, so neither the build nor the
// browser talks to Google Fonts.
const plexSans = localFont({
  src: [
    { path: '../fonts/ibm-plex-sans-latin-300-normal.woff2', weight: '300', style: 'normal' },
    { path: '../fonts/ibm-plex-sans-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/ibm-plex-sans-latin-400-italic.woff2', weight: '400', style: 'italic' },
    { path: '../fonts/ibm-plex-sans-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/ibm-plex-sans-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: '../fonts/ibm-plex-sans-latin-600-italic.woff2', weight: '600', style: 'italic' },
    { path: '../fonts/ibm-plex-sans-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
})
const plexMono = localFont({
  src: [
    { path: '../fonts/ibm-plex-mono-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/ibm-plex-mono-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/ibm-plex-mono-latin-600-normal.woff2', weight: '600', style: 'normal' },
  ],
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
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" sizes="any"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </div>
  </>;
}
