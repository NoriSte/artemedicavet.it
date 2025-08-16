import { test, expect } from '@playwright/test'

test.describe('Navigation, using chi-siamo page', async () => {
  test.describe('the aria labels are set on the server', async () => {
    test.use({ javaScriptEnabled: false })

    test('aria-current is set to the current page', async ({ page }) => {
      await page.goto('/chi-siamo')

      await test.step('aria-current is correctly set', async () => {
        const element = page.locator('[aria-current="page"]')
        await expect(element).toHaveAccessibleName('Chi siamo')
      })
      await test.step('navigationMenuToggle is not visible', async () => {
        const element = page.getByLabel('Menú di navigazione')
        await expect(element).not.toBeVisible()
        await expect(element).toHaveAttribute('aria-expanded', 'false')
      })
    })
  })

  test.describe('users interactions contains accessible data', async () => {
    // TODO: mobile interactions
  })
})
