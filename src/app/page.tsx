import styles from './page.module.css'
import Link from 'next/link'

// TODO: metadata?
// TODO: customize 404 page
// Check all the existing and indexed pages
// style/show the text found in google?

export default function Home() {
  return (
    <>
      <header>
        <nav>
          <ul>
            {/* TODO: TS validation for routes? */}
            <Link href="/servizi">Servizi</Link>
            {/* TODO: aria-current="page" */}
            <Link href="/chi-siamo">Chi siamo</Link>
            <Link href="/dove-siamo">Dove siamo</Link>
            <Link href="/approfondimenti">Approfondimenti</Link>
            <Link href="/galleria">Galleria</Link>
            <Link href="/contatti">Contatti</Link>
          </ul>
        </nav>
      </header>
      <main>
        <h1>I describe the page’s primary topic</h1>
        <section>
          <h2>I describe the contents of a child section</h2>
        </section>
      </main>

      <footer className={styles.footer}>Footer</footer>
    </>
  )
}
