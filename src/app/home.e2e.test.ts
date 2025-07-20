import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('/', () => {
  test('does not have a11y violations', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })
  test('does not trigger JS errors at runtime', async ({ page }) => {
    const errors: string[] = []

    // Listen to runtime errors on the page
    page.on('pageerror', (error) => errors.push(error.message))

    await page.goto('/', { waitUntil: 'networkidle' })

    expect(page.getByText('This is the banner region.')).toBeVisible()

    expect(errors, `Runtime errors found: ${errors.join('\n')}`).toEqual([])
  })
})
