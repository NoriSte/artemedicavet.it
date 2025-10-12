import { isGooglePlace, type GooglePlace, type WorkingHoursData } from '@/types/googlePlaces'
import { REGULAR_HOURS } from '@/utils/workingHours'

/**
 * Google Places API (New) - Place Details endpoint
 * @see https://developers.google.com/maps/documentation/places/web-service/place-details
 */
const GOOGLE_PLACES_API_URL = 'https://places.googleapis.com/v1/places'

/**
 * Converts Google Places day number to Italian day name
 */
function getDayName(dayNumber: number): string {
  const days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']
  return days[dayNumber] || 'Unknown'
}

/**
 * Formats time as HH:MM
 */
function formatTime(hour?: number, minute?: number): string {
  if (hour === undefined || minute === undefined) return '00:00'
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}

/**
 * Transforms Google Places data to our simplified structure
 * TODO: write unit tests.
 */
function transformGooglePlaceData(place: GooglePlace): WorkingHoursData {
  const regularHours = place.regularOpeningHours || place.currentOpeningHours
  const currentHours = place.currentOpeningHours

  // Group periods by day
  const dayMap = new Map<number, { open: string; close: string }[]>()

  regularHours?.periods?.forEach((period) => {
    if (period.open?.day !== undefined) {
      const day = period.open.day
      const openTime = formatTime(period.open.hour, period.open.minute)
      const closeTime = formatTime(period.close?.hour, period.close?.minute)

      if (!dayMap.has(day)) {
        dayMap.set(day, [])
      }
      dayMap.get(day)!.push({ open: openTime, close: closeTime })
    }
  })

  // Convert to sorted array
  const regularHoursArray = Array.from(dayMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([day, periods]) => ({
      dayOfWeek: getDayName(day),
      periods,
    }))

  // Handle special days
  const specialDays = currentHours?.specialDays?.map((specialDay) => ({
    date: specialDay.date
      ? `${specialDay.date.year}-${String(specialDay.date.month).padStart(2, '0')}-${String(
          specialDay.date.day
        ).padStart(2, '0')}`
      : '',
    description: 'Orario speciale',
    closed: false,
  }))

  return {
    regularHours: regularHoursArray,
    specialDays,
    isOpenNow: currentHours?.openNow,
    lastUpdated: new Date().toISOString(),
  }
}

const GOOGLE_PLACE_ID = 'ChIJQ5NFVgwdhEcRa3g8N5gI2E4'
// https://www.google.com/maps/place/?q=place_id:ChIJQ5NFVgwdhEcRa3g8N5gI2E4

/**
 * Fetches business hours from Google Places API
 * This is designed to be called from React Server Components
 *
 * @returns WorkingHoursData or falls back to static hours if API fails
 */
export async function fetchBusinessHours(
  forcedGooglePlacesApiStub?: unknown
): Promise<WorkingHoursData> {
  try {
    if (typeof forcedGooglePlacesApiStub === 'string') {
      try {
        const stub = JSON.parse(forcedGooglePlacesApiStub)
        if (isGooglePlace(stub)) {
          return Promise.resolve(transformGooglePlaceData(stub))
        }
      } catch {}
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY

    // If credentials are missing, return fallback hours
    if (!apiKey) {
      // TODO: how can I be notified if this happens in production?
      console.warn('Missing GOOGLE_PLACES_API_KEY, using fallback hours')
      return REGULAR_HOURS
    }

    // Fetch place details from Google Places API
    const response = await fetch(`${GOOGLE_PLACES_API_URL}/${GOOGLE_PLACE_ID}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'id,displayName,regularOpeningHours,currentOpeningHours',
      },
      next: {
        revalidate: 3600, // Cache for 1 hour
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Google Places API error:', errorText)
      return REGULAR_HOURS
    }

    const placeResponse = await response.json()

    if (!isGooglePlace(placeResponse)) {
      // TODO: how can I be notified if this happens in production?
      console.error('The API response is no a valid Google Place')
      return REGULAR_HOURS
    }

    return transformGooglePlaceData(placeResponse)
  } catch (error) {
    console.error('Error fetching business hours:', error)
    return REGULAR_HOURS
  }
}
