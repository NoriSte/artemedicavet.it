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

      <footer className={styles.footer}>Footer</footer>
    </>
  )
}
