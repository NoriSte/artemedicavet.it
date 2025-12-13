import { test, expect, type Page } from '@playwright/test'

export async function checkAriaCurrent({
  page,
  pageUrl,
  pageTitle,
}: {
  page: Page
  // @example '/chi-siamo'
  pageUrl: string
  // @example 'Chi siamo'
  pageTitle: string
}) {
  await page.goto(pageUrl)

  await test.step('All the elements with aria-current=page contain the name of the correct page', async () => {
    const currentPageEls = await page.locator('[aria-current="page"]').all()
    for (const el of currentPageEls) {
      expect.soft(el).toContainText(pageTitle)
    }
  })

  await test.step('All the links that point to the correct page have the aria-current=page attribute', async () => {
    const chiSiamoLinks = await page.locator(`a[href="${pageUrl}"]`).all()
    for (const link of chiSiamoLinks) {
      expect.soft(link).toHaveAttribute('aria-current', 'page')
    }
  })
}
