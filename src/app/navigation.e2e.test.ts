import { test, expect } from '@playwright/test'

// TODO: import the resolution from the page/files
const minDesktopWidth = 1024
test.setTimeout(2_000)

test.describe('Navigation, using chi-siamo page', async () => {
  test.describe('the aria labels are set on the server', async () => {
    test.use({ javaScriptEnabled: false })

    test('aria-current is set to the current page', async ({ page }) => {
      await page.goto('/chi-siamo')

      await test.step('All the elements with aria-current=page contain the name of the correct page', async () => {
        const currentPageEls = await page.locator('[aria-current="page"]').all()
        for (const el of currentPageEls) {
          expect.soft(el).toContainText('Chi siamo')
        }
      })

      await test.step('All the links that point to the correct page have the aria-current=page attribute', async () => {
        const chiSiamoLinks = await page.locator('a[href="/chi-siamo"]').all()
        for (const link of chiSiamoLinks) {
          expect.soft(link).toHaveAttribute('aria-current', 'page')
        }
      })
    })

    test('the navigation toggle button is hidden on desktop and visible on mobile', async ({
      page,
    }) => {
      await page.goto('/chi-siamo')

      page.setViewportSize({ width: minDesktopWidth, height: 768 })

      await test.step('openNavigationMenuButton is not visible', async () => {
        const openNavigationMenuButton = page.getByLabel('Apri menú di navigazione')
        await expect.soft(openNavigationMenuButton).not.toBeVisible()
      })

      page.setViewportSize({ width: minDesktopWidth - 1, height: 768 })

      await test.step('openNavigationMenuButton is visible', async () => {
        const openNavigationMenuButton = page.getByLabel('Apri menú di navigazione')
        await expect.soft(openNavigationMenuButton).toBeVisible()
      })
    })
  })

  test('Toggling the nav menu updates the ARIA attributes correctly', async ({ page }) => {
    page.setViewportSize({ width: minDesktopWidth - 1, height: 768 })
    await page.goto('/chi-siamo')

    const navigationMenuToggle = page.getByLabel('Apri menú di navigazione')
    const primaryNav = page.locator('header > nav')

    await test.step('aria attributes are in the initial state', async () => {
      const primaryNavId = await primaryNav.getAttribute('id')
      if (!primaryNavId) throw new Error("primaryNav doesn't have an id")

      await expect.soft(navigationMenuToggle).toHaveAttribute('aria-expanded', 'false')
      await expect.soft(navigationMenuToggle).toHaveAttribute('aria-controls', primaryNavId)
      await expect.soft(primaryNav).not.toBeVisible()
    })

    await test.step('click navigationMenuToggle', async () => {
      await navigationMenuToggle.click()
    })

    await test.step('the navigation menu is visible', async () => {
      await expect.soft(navigationMenuToggle).toHaveAttribute('aria-expanded', 'true')
      await expect.soft(primaryNav).toBeVisible()
    })
  })
})
