import styles from './page.module.css'
import { Header } from './components/header/Header'
import { Footer } from './components/footer/Footer'
import { WorkingHours } from './components/workingHours/WorkingHours'
import { CompanyInfo } from './components/companyInfo/CompanyInfo'
import { FullNav } from './components/fullNav/FullNav'

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
// orari
//   agosto e festivi: riportare direttamente gli orari nel footer e in cima alla pagina (oggi chiusi)
//   quando si avvicina la chiusura, dire "chiude tra poco, chiamare il numero fisso"
//   dove c'é scritto "riceve su appuntamento"
//   pagina dedicata agli orari?
//   fetchare gli orari da google? qui il partial prerendering potrebbe aiutare
// Scrivere che é vicino a lecco (e menzionare nella description delle pagine) con "ampio parcheggio"
// TODO: schema.json, come esprimere tutti https://schema.org/VeterinaryCare + come indicare gli orari?
// Accessibilioty: test with different zoom levels
// dependabot
// lint rules for import, for RSCs, for react

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

      <Footer>
        {/* TODO: maybe add the hours on top and bottom of the footer */}
        <FullNav currentPage={'/'}/>
        <WorkingHours headingLevel="h2" />
        <CompanyInfo />
      </Footer>
    </>
  )
}
