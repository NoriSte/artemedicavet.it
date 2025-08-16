import { CompanyInfo } from '../components/companyInfo/CompanyInfo'
import { Footer } from '../components/footer/Footer'
import { Header } from '../components/header/Header'
import { PrimaryNav } from '../components/primaryNav/PrimaryNav'
import { WorkingHours } from '../components/workingHours/WorkingHours'

// ⚠️ Don't forget to add me to the sitemap.xml

export default function Home() {
  return (
    <>
      <Header>
        <PrimaryNav currentPage={'/chi-siamo'} />
      </Header>
      <main>
        <h1>Chi siamo</h1>
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
