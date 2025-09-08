import { test, expect } from '@playwright/test'
import {
  mobileNavDialogId,
  mobilePrimaryNavId,
} from './components/mobilePrimaryNav/mobilePrimaryNav'

// TODO: import the resolution from the page/files
const minDesktopWidth = 1024
test.setTimeout(2_000)

test.describe('Navigation, using chi-siamo page', async () => {
  test.describe('The aria labels are set on the server', async () => {
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

      await test.step('set desktop viewport', async () => {
        page.setViewportSize({ width: minDesktopWidth, height: 768 })
      })

      await test.step('openNavigationMenuButton is not visible', async () => {
        const openNavigationMenuButton = page.getByLabel('Apri menú di navigazione')
        await expect.soft(openNavigationMenuButton).not.toBeVisible()
      })

      await test.step('set mobile viewport', async () => {
        page.setViewportSize({ width: minDesktopWidth - 1, height: 768 })
      })

      await test.step('openNavigationMenuButton is visible', async () => {
        const openNavigationMenuButton = page.getByLabel('Apri menú di navigazione')
        await expect.soft(openNavigationMenuButton).toBeVisible()
      })
    })
  })

  test('Landmarks are correctly set', async ({ page }) => {
    await page.goto('/chi-siamo')

    await test.step('on desktop', async () => {
      page.setViewportSize({ width: minDesktopWidth, height: 768 })
    })

    await test.step('the primary nav is accessible', async () => {
      const nav = page.locator('header > nav')
      await expect.soft(nav).toBeVisible()
    })

    await test.step('the full nav is accessible', async () => {
      const nav = page.locator('footer > nav')
      await expect.soft(nav).toBeVisible()
    })

    await test.step('the primary mobile nav is not accessible', async () => {
      const nav = page.locator(`#${mobilePrimaryNavId}`)
      await expect.soft(nav).not.toBeVisible()
    })

    await test.step('on mobile', async () => {
      page.setViewportSize({ width: minDesktopWidth - 1, height: 768 })
    })

    await test.step('the primary nav is not accessible', async () => {
      const nav = page.locator('header > nav')
      await expect.soft(nav).not.toBeVisible()
    })

    await test.step('the full nav is accessible', async () => {
      const nav = page.locator('footer > nav')
      await expect.soft(nav).toBeVisible()
    })

    await test.step('the primary mobile nav is not accessible', async () => {
      const nav = page.locator(`#${mobilePrimaryNavId}`)
      await expect.soft(nav).not.toBeVisible()
    })
  })

  test('Toggling the nav menu updates the ARIA attributes correctly', async ({ page }) => {
    page.setViewportSize({ width: minDesktopWidth - 1, height: 768 })
    await page.goto('/chi-siamo')

    const navigationMenuToggle = page.getByLabel('Apri menú di navigazione')
    const primaryMobileNav = page.locator(`#${mobilePrimaryNavId}`)

    await test.step('click navigationMenuToggle', async () => {
      await expect.soft(navigationMenuToggle).toHaveAttribute('aria-haspopup', 'menu')
      await expect.soft(navigationMenuToggle).toHaveAttribute('aria-controls', mobileNavDialogId)
      await navigationMenuToggle.click()
    })

    await test.step('the navigation menu is accessible', async () => {
      await expect.soft(primaryMobileNav).toBeVisible()
      const closeNavigationMenu = page.getByLabel('Chiudi menú di navigazione')
      await expect.soft(closeNavigationMenu).toBeFocused()
    })

    await test.step('the full nav is inaccessible', async () => {
      const nav = page.locator('footer > nav')
      nav.focus()
      await expect.soft(nav).not.toBeFocused()
    })

    await test.step('pressing esc makes the navigation menu inaccessible', async () => {
      await page.keyboard.press('Escape')
      await expect.soft(primaryMobileNav).not.toBeVisible()
    })
  })

  test('The mobile nav menu is can be toggled with the keyboard', async ({ page }) => {
    page.setViewportSize({ width: minDesktopWidth - 1, height: 768 })
    await page.goto('/chi-siamo')

    const navigationMenuToggle = page.getByLabel('Apri menú di navigazione')
    const primaryMobileNav = page.locator(`#${mobilePrimaryNavId}`)

    await test.step('go to navigationMenuToggle', async () => {
      await page.keyboard.press('Tab')
      await expect(navigationMenuToggle).toBeFocused()
    })

    await test.step('by pressing space, the navigation menu becomes accessible', async () => {
      await page.keyboard.press('Space')
      await expect.soft(primaryMobileNav).toBeVisible()
    })

    await test.step('the focus is trapped inside the navigation menu', async () => {
      // This step checks the mobile navigation is a modal dialog, which makes the body inert by default
      // and the other navigation landmarks can't be navigated

      const mobileNavDialog = page.locator(`#${mobileNavDialogId}`)
      await expect(mobileNavDialog).toHaveAttribute('aria-modal', 'true')

      const isOpen = await mobileNavDialog.evaluate((el) => {
        if (!(el instanceof HTMLDialogElement)) throw new Error('the element is not an HTML Dialog')
        return el.open
      })
      expect(isOpen, `Check the dialog's open state`).toBe(true)

      const isModal = await page.evaluate((mobileNavDialogId) => {
        const mobileNavDialog = document.querySelector(`#${mobileNavDialogId}`)
        if (!mobileNavDialog) throw new Error(`#${mobileNavDialogId} is't a dialog`)
        return !!mobileNavDialog.matches(':modal') // true if opened via showModal()
      }, mobileNavDialogId)

      expect(isModal).toBe(true)
    })

    await test.step('pressing esc makes the navigation menu inaccessible', async () => {
      await page.keyboard.press('Escape')
      await expect.soft(primaryMobileNav).not.toBeVisible()
    })

    await test.step('the focus is restored on the navigationMenuToggle', async () => {
      await expect(navigationMenuToggle).toBeFocused()
    })

    await test.step('by pressing space, the navigation menu becomes accessible again', async () => {
      await page.keyboard.press('Space')
      await expect.soft(primaryMobileNav).toBeVisible()
    })

    await test.step('the navigation menu can be closed with the close button', async () => {
      const closeNavigationMenu = page.getByLabel('Chiudi menú di navigazione')
      await closeNavigationMenu.focus()
      await page.keyboard.press('Space')
      await expect.soft(primaryMobileNav).not.toBeVisible()
    })
  })
})
