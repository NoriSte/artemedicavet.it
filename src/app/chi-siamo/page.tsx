import { CompanyInfo } from '../components/companyInfo/CompanyInfo'
import { Footer } from '../components/footer/Footer'
import { FullNav } from '../components/fullNav/FullNav'
import { Header } from '../components/header/Header'

// ⚠️ Don't forget to add me to the sitemap.xml

export default function Home() {
  return (
    <>
      <Header currentPage={'/chi-siamo'} />
      <main>
        <h1>Chi siamo</h1>
        <section>
          <h2>I describe the contents of a child section</h2>
        </section>
      </main>
      <Footer>
        <FullNav currentPage={'/chi-siamo'} />
        Working hours?
        <CompanyInfo />
      </Footer>
    </>
  )
}
