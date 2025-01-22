import mermaid from 'mermaid';
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react';

import '@/styles/global.css'

mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'Nerd Font, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
  fontSize: 14,
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
    <div className='container'>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="preload" as="font" href="/fonts/JetBrainsMonoThinNerd.ttf"/>
        <link rel="preload" as="font" href="/fonts/JetBrainsMonoLightNerd.ttf"/>
      </Head>
      <main><Component {...pageProps} /></main>
      <Analytics />
      <footer>
        bubbajoe.dev © {new Date().getFullYear()}
      </footer>
    </div>
  </>;
}
