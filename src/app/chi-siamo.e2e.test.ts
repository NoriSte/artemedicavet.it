import AxeBuilder from '@axe-core/playwright'
import { test, expect, type Page } from '@playwright/test'
import { checkAriaCurrent } from './navigation.testutils'

// test.setTimeout(2_000) // quicker feedback loop

test.describe('/chi-siamo', async () => {
  test.describe('Static page checks', async () => {
    test.describe.configure({ mode: 'serial' })

    let page: Page
    const errors: string[] = []

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage()

      // Listen to runtime errors on the page
      page.on('pageerror', (error) => errors.push(error.message))

      await page.goto('/chi-siamo', {
        // Ensure the page if fully loaded
        waitUntil: 'networkidle',
      })
    })

    test.afterAll(async () => {
      await page.close()
    })

    test('aria-current is set to the current page', async () => {
      await checkAriaCurrent({
        page,
        pageUrl: '/chi-siamo',
        pageTitle: 'Chi siamo',
      })
    })

    test('There are no JS errors', async () => {
      expect(errors, `Runtime errors found: ${errors.join('\n')}`).toEqual([])
    })

    test('The heading structure reflects the page contents', async () => {
      const pageH1 = page.locator('h1')
      expect(pageH1).toBeVisible()
      expect(pageH1).toHaveText('Chi siamo')
    })

    test('The page look the same', async () => {
      await page.screenshot({ fullPage: true, path: './src/app/chi-siamo.e2e.test.png' })
    })
  })

  test('Does not contain a11y violations', async ({ page }) => {
    await page.goto('/chi-siamo', {
      // Ensure the page if fully loaded
      waitUntil: 'networkidle',
    })

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    expect(accessibilityScanResults.violations).toEqual([])
  })
})
