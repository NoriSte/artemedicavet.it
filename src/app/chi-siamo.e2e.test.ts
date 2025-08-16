import AxeBuilder from '@axe-core/playwright'
import { test, expect, type Page } from '@playwright/test'

test.describe('/chi-siamo', async () => {
  test.describe('is rendered on the server', async () => {
    test.use({ javaScriptEnabled: false })

    test('is rendered on the server', async ({ page }) => {
      await page.goto('/chi-siamo')

      await expect(page.getByRole('heading', { name: 'Chi siamo' })).toBeVisible()
      // TODO: check aria current page is set

      await page.screenshot({ fullPage: true, path: './src/app/chi-siamo.rsc.e2e.test.png' })
    })
  })

  test.describe('(serial tests)', async () => {
    test.describe.configure({ mode: 'serial' })

    let page: Page

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage()
    })

    test.afterAll(async () => {
      await page.close()
    })

    test('runs first', async () => {
      await page.goto('/', {
        // Ensure Next.js is not loading any component
        waitUntil: 'networkidle',
      })

      const errors: string[] = []

      // Listen to runtime errors on the page
      page.on('pageerror', (error) => errors.push(error.message))

      expect(errors, `Runtime errors found: ${errors.join('\n')}`).toEqual([])
    })

    test('runs second', async () => {
      expect(page.getByText('I describe the page’s primary topic')).toBeVisible()
    })
  })

  test.describe('(parallel tests)', async () => {
    test.describe.configure({ mode: 'default' })

    test('Does not contain a11y violations', async ({ page }) => {
      await page.goto('/', {
        // Ensure Next.js is not loading any component
        waitUntil: 'networkidle',
      })

      const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

      expect(accessibilityScanResults.violations).toEqual([])
    })
  })
})
