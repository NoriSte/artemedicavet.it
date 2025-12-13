import AxeBuilder from '@axe-core/playwright'
import { test, expect } from '@playwright/test'
import { checkAriaCurrent } from './navigation.testutils'

// test.setTimeout(2_000) // quicker feedback loop

test.describe('/chi-siamo', async () => {
  test('The page look the same', async ({ page }) => {
    await page.goto('/chi-siamo', {
      // Ensure Next.js is not loading any component
      waitUntil: 'networkidle',
    })

    await page.screenshot({ fullPage: true, path: './src/app/chi-siamo.e2e.test.png' })
  })

  test('aria-current is set to the current page', async ({ page }) => {
    await checkAriaCurrent({
      page,
      pageUrl: '/chi-siamo',
      pageTitle: 'Chi siamo',
    })
  })

  test('There are no JS errors', async ({ page }) => {
    await page.goto('/chi-siamo', {
      // Ensure the page if fully loaded
      waitUntil: 'networkidle',
    })

    const errors: string[] = []

    // Listen to runtime errors on the page
    page.on('pageerror', (error) => errors.push(error.message))

    expect(errors, `Runtime errors found: ${errors.join('\n')}`).toEqual([])
  })

  test('The heading structure reflects the page contents', async ({ page }) => {
    await page.goto('/chi-siamo')

    const pageH1 = page.locator('h1')
    expect(pageH1).toBeVisible()
    expect(pageH1).toHaveText('Chi siamo')
  })

  test('Does not contain a11y violations', async ({ page }) => {
    await page.goto('/chi-siamo')

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    expect(accessibilityScanResults.violations).toEqual([])
  })
})
