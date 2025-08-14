import { CompanyInfo } from '../components/companyInfo/CompanyInfo'
import { Footer } from '../components/footer/Footer'
import { Header } from '../components/Header'
import { WorkingHours } from '../components/workingHours/WorkingHours'

// ⚠️ Don't forget to add me to the sitemap.xml

export default function Home() {
  return (
    <>
      <Header currentPage={'/chi-siamo'} />
      <main>
        <h1>I describe the page’s primary topic</h1>
        <section>
          <h2>I describe the contents of a child section</h2>
        </section>
      </main>
      <Footer>
        <WorkingHours headingLevel="h2" />
        <CompanyInfo />
      </Footer>
    </>
  )
}
