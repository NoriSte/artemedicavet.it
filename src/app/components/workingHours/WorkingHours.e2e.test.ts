import AxeBuilder from '@axe-core/playwright'
import { test, expect } from '@playwright/test'
import type { Route } from '@playwright/test'
import {
  normalHoursOpenNowMock,
  specialDayTodayMock,
  currentlyClosedMock,
  twentyFourSevenMock,
  splitDaysMock,
  irregularScheduleMock,
  multipleSpecialDaysMock,
  weekendOnlyMock,
  emptyResponseMock,
} from '@/app/components/workingHours/googlePlacesMocks'
import type { GooglePlace } from '@/types/googlePlaces'

/**
 * Helper to mock Google Places API responses
 */
async function mockGooglePlacesAPI(route: Route, mockData: GooglePlace) {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(mockData),
  })
}

/**
 * Helper to mock API error
 */
async function mockGooglePlacesAPIError(route: Route) {
  await route.fulfill({
    status: 500,
    contentType: 'application/json',
    body: JSON.stringify({ error: 'Internal Server Error' }),
  })
}

test.describe('WorkingHours Component', () => {
  test.describe('is rendered on the server', async () => {
    test.use({ javaScriptEnabled: false })

    test('shows the business hours', async ({ page }) => {
      await page.goto(`/?forcedGooglePlacesApiStub=${JSON.stringify(normalHoursOpenNowMock)}`)

      await expect(page.getByText('Lunedì – Venerdì')).toBeVisible()
      await expect(page.getByText('10:00 – 13:00 / 14:30 – 19:00')).toBeVisible()

      await expect(page.getByText('Sabato')).toBeVisible()
      await expect(page.getByText('10:00 – 18:00')).toBeVisible()

      await expect(page.getByText('Aperto ora')).toBeVisible()
    })
  })

  test('shows the regular business hours', async ({ page }) => {
    await page.goto(`/?forcedGooglePlacesApiStub=${JSON.stringify(normalHoursOpenNowMock)}`)

    await expect(page.getByText('Lunedì – Venerdì')).toBeVisible()
    await expect(page.getByText('10:00 – 13:00 / 14:30 – 19:00')).toBeVisible()

    await expect(page.getByText('Sabato')).toBeVisible()
    await expect(page.getByText('10:00 – 18:00')).toBeVisible()

    await expect(page.getByText('Aperto ora')).toBeVisible()
  })

  test.describe('Scenario 2: Special Day (Today)', () => {
    test('displays special day alert for today', async ({ page }) => {
      await page.goto(`/?forcedGooglePlacesApiStub=${JSON.stringify(specialDayTodayMock)}`)

      // Check special day alert box
      await expect(page.getByText('Attenzione - Orari speciali:')).toBeVisible()

      // Check "Oggi" label appears
      await expect(page.getByText('(Oggi)')).toBeVisible()

      // Regular hours should still be visible below
      await expect(page.getByText('Lunedì – Venerdì')).toBeVisible()
    })
  })

  test.describe.skip('Scenario 8: Currently Closed', () => {
    test('displays closed status', async ({ page }) => {
      await page.route('https://places.googleapis.com/v1/places/*', (route) =>
        mockGooglePlacesAPI(route, currentlyClosedMock)
      )

      await page.goto('/')

      await expect(page.getByText('Chiuso ora')).toBeVisible()
    })
  })

  test.describe.skip('Scenario 5: 24/7 Operation', () => {
    test('displays 24/7 hours correctly', async ({ page }) => {
      await page.route('https://places.googleapis.com/v1/places/*', (route) =>
        mockGooglePlacesAPI(route, twentyFourSevenMock)
      )

      await page.goto('/')

      // All days should be grouped together
      await expect(page.getByText('Domenica – Sabato')).toBeVisible()
      await expect(page.getByText('00:00 – 23:59')).toBeVisible()
      await expect(page.getByText('Aperto ora')).toBeVisible()
    })
  })

  test.describe.skip('Scenario 6: Split Days', () => {
    test('displays different hours for different day groups', async ({ page }) => {
      await page.route('https://places.googleapis.com/v1/places/*', (route) =>
        mockGooglePlacesAPI(route, splitDaysMock)
      )

      await page.goto('/')

      await expect(page.getByText('Lunedì – Mercoledì')).toBeVisible()
      await expect(page.getByText('09:00 – 17:00')).toBeVisible()

      await expect(page.getByText('Giovedì – Venerdì')).toBeVisible()
      await expect(page.getByText('09:00 – 21:00')).toBeVisible()

      await expect(page.getByText(/^Sabato$/)).toBeVisible()
      await expect(page.getByText('10:00 – 14:00')).toBeVisible()

      await expect(page.getByText(/^Domenica$/)).toBeVisible()
    })
  })

  test.describe.skip('Scenario 11: Irregular Schedule', () => {
    test('displays each day separately when no pattern exists', async ({ page }) => {
      await page.route('https://places.googleapis.com/v1/places/*', (route) =>
        mockGooglePlacesAPI(route, irregularScheduleMock)
      )

      await page.goto('/')

      // Days should NOT be grouped
      await expect(page.getByText(/^Lunedì$/)).toBeVisible()
      await expect(page.getByText('10:00 – 18:00')).toBeVisible()

      await expect(page.getByText(/^Martedì$/)).toBeVisible()
      await expect(page.getByText(/Martedì.*Chiuso/)).toBeVisible()

      await expect(page.getByText(/^Mercoledì$/)).toBeVisible()
      await expect(page.getByText('12:00 – 20:00')).toBeVisible()

      await expect(page.getByText(/^Giovedì$/)).toBeVisible()

      await expect(page.getByText(/^Sabato$/)).toBeVisible()
      await expect(page.getByText('09:00 – 13:00')).toBeVisible()
    })
  })

  test.describe.skip('Scenario 12: Multiple Special Days', () => {
    test('displays multiple upcoming special days', async ({ page }) => {
      await page.route('https://places.googleapis.com/v1/places/*', (route) =>
        mockGooglePlacesAPI(route, multipleSpecialDaysMock)
      )

      await page.goto('/')

      // Check alert box
      await expect(page.getByText('Attenzione - Orari speciali:')).toBeVisible()

      // Check that multiple special days are listed
      const specialDaysList = page.locator('ul').filter({ hasText: 'Orario speciale' })
      const listItems = specialDaysList.locator('li')

      // Should have 4 special days
      await expect(listItems).toHaveCount(4)
    })
  })

  test.describe.skip('Scenario 14: Weekend Only', () => {
    test('displays weekend-only hours', async ({ page }) => {
      await page.route('https://places.googleapis.com/v1/places/*', (route) =>
        mockGooglePlacesAPI(route, weekendOnlyMock)
      )

      await page.goto('/')

      // Weekdays should show closed
      await expect(page.getByText('Lunedì – Venerdì')).toBeVisible()
      await expect(page.getByText(/Lunedì – Venerdì.*Chiuso/)).toBeVisible()

      // Weekend should show hours
      await expect(page.getByText('Sabato – Domenica')).toBeVisible()
      await expect(page.getByText('10:00 – 18:00')).toBeVisible()
    })
  })

  test.describe.skip('Scenario 13: API Error / Fallback', () => {
    test('displays fallback hours when API fails', async ({ page }) => {
      // Mock API error
      await page.route('https://places.googleapis.com/v1/places/*', (route) =>
        mockGooglePlacesAPIError(route)
      )

      await page.goto('/')

      // Should display fallback static hours
      await expect(page.getByRole('heading', { name: 'Orari di apertura' })).toBeVisible()
      await expect(page.getByText('Lunedì – Venerdì')).toBeVisible()
      await expect(page.getByText('10:00 – 13:00 / 14:30 – 19:00')).toBeVisible()
    })

    test('displays fallback hours when response is empty', async ({ page }) => {
      await page.route('https://places.googleapis.com/v1/places/*', (route) =>
        mockGooglePlacesAPI(route, emptyResponseMock)
      )

      await page.goto('/')

      // Should display fallback hours
      await expect(page.getByRole('heading', { name: 'Orari di apertura' })).toBeVisible()
      await expect(page.getByText('Lunedì – Venerdì')).toBeVisible()
    })
  })

  test.describe.skip('Schema.org Integration', () => {
    test('generates correct structured data', async ({ page }) => {
      await page.route('https://places.googleapis.com/v1/places/*', (route) =>
        mockGooglePlacesAPI(route, normalHoursOpenNowMock)
      )

      await page.goto('/')

      // Find the JSON-LD script tag
      const schemaScript = await page.locator('script[type="application/ld+json"]').textContent()
      expect(schemaScript).toBeTruthy()

      const schemaData = JSON.parse(schemaScript!)

      // Verify basic structure
      expect(schemaData['@context']).toBe('https://schema.org')
      expect(schemaData['@type']).toBe('VeterinaryCare')
      expect(schemaData.name).toBe('Clinica Veterinaria Artemedica')

      // Verify opening hours are present
      expect(schemaData.openingHoursSpecification).toBeDefined()
      expect(Array.isArray(schemaData.openingHoursSpecification)).toBe(true)
      expect(schemaData.openingHoursSpecification.length).toBeGreaterThan(0)

      // Verify format
      const firstHour = schemaData.openingHoursSpecification[0]
      expect(firstHour['@type']).toBe('OpeningHoursSpecification')
      expect(firstHour.dayOfWeek).toBeDefined()
      expect(firstHour.opens).toBeDefined()
      expect(firstHour.closes).toBeDefined()
    })
  })

  test.describe.skip('Error Handling', () => {
    test('does not crash on network timeout', async ({ page }) => {
      // Mock network timeout
      await page.route('https://places.googleapis.com/v1/places/*', async (route) => {
        await new Promise((resolve) => setTimeout(resolve, 10000))
        await route.abort('timedout')
      })

      await page.goto('/')

      // Should still render with fallback
      await expect(page.getByRole('heading', { name: 'Orari di apertura' })).toBeVisible()
    })

    test('handles missing environment variables gracefully', async ({ page }) => {
      // When env vars are missing, service should return fallback
      await page.goto('/')

      // Should render something (either API data or fallback)
      await expect(page.getByRole('heading', { name: 'Orari di apertura' })).toBeVisible()
    })
  })
})
