import '@/styles/global.css'

export default function App({ Component, pageProps }) {
  return <>
  <div className='container'>
        <main><Component {...pageProps} /></main>
    <footer>
      bubbajoe.dev © {new Date().getFullYear()}
    </footer>
  </div>
  </>;
}
