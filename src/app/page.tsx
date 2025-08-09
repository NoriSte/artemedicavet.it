import styles from './page.module.css'
import { Header } from './components/Header'

// Next steps
// E2E tests without JS (RSC)
// Read ALL Next.js docs

// TODO: metadata?
// TODO: customize 404 page
// Check all the existing and indexed pages
// style/show the text found in google?
// eslint-plugin-jsx-a11y
// eslint import order
// oxlint
// vitest browser mode?
// axe
// llms.txt
// metafata +favicon

// ⚠️ Don't forget to add me to the sitemap.xml

export default function Home() {
  return (
    <>
      <Header currentPage={'/'} />
      <main>
        <h1>I describe the page’s primary topic</h1>
        <section>
          <h2>I describe the contents of a child section</h2>
        </section>
      </main>

      <footer className={styles.footer}>
        <dl>
          <dt>Partita IVA</dt>
          <dd>03748770132</dd>

          <dt>Indirizzo</dt>
          <dd>Via Gavazzi 2, Valmadrera (LC)</dd>

          <dt>Telefono</dt>
          <dd>
            <a href="tel:+390341203337">0341 203337</a>
          </dd>

          <dt>Necessità fuori orario</dt>
          <dd>
            <a href="tel:+393473706298">347 3706298</a> oppure
            <a href="tel:+393348346119">334 8346119</a>
          </dd>

          <dt>Email</dt>
          <dd>
            <a href="mailto:info@artemedicavet.it">info@artemedicavet.it</a>
          </dd>
        </dl>

        <h2 id="orari-apertura">Orari di apertura</h2>
        <dl>
          <dt>Lunedì – Venerdì</dt>
          <dd>10:00 – 12:30 / 15:30 – 20:00</dd>

          <dt>Sabato</dt>
          <dd>10:00 – 18:30</dd>

          <dt>Domenica</dt>
          <dd>Chiuso</dd>
        </dl>
      </footer>
    </>
  )
}
