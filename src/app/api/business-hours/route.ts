import { NextResponse } from 'next/server'
import type { GooglePlace, WorkingHoursData } from '@/types/googlePlaces'

/**
 * Google Places API (New) - Place Details endpoint
 * @see https://developers.google.com/maps/documentation/places/web-service/place-details
 */
const GOOGLE_PLACES_API_URL = 'https://places.googleapis.com/v1/places'

// Cache duration in seconds (1 hour)
const CACHE_DURATION = 3600

export const revalidate = CACHE_DURATION

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
 */
function transformGooglePlaceData(place: GooglePlace): WorkingHoursData {
  const regularHours = place.regularOpeningHours || place.currentOpeningHours
  const currentHours = place.currentOpeningHours

  // Group periods by day
  const dayMap = new Map<
    number,
    { open: string; close: string }[]
  >()

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

/**
 * GET /api/business-hours
 * Fetches business hours from Google Places API
 */
export async function GET() {
  try {
    const placeId = process.env.GOOGLE_PLACE_ID
    const apiKey = process.env.GOOGLE_PLACES_API_KEY

    if (!placeId || !apiKey) {
      return NextResponse.json(
        {
          error: 'Missing required environment variables: GOOGLE_PLACE_ID and GOOGLE_PLACES_API_KEY',
        },
        { status: 500 }
      )
    }

    // Fetch place details from Google Places API
    const response = await fetch(`${GOOGLE_PLACES_API_URL}/${placeId}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask':
          'id,displayName,regularOpeningHours,currentOpeningHours',
      },
      next: {
        revalidate: CACHE_DURATION,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Google Places API error:', errorText)
      return NextResponse.json(
        { error: 'Failed to fetch business hours from Google Places API' },
        { status: response.status }
      )
    }

    const place: GooglePlace = await response.json()
    const workingHours = transformGooglePlaceData(place)

    return NextResponse.json(workingHours, {
      headers: {
        'Cache-Control': `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=${CACHE_DURATION * 2}`,
      },
    })
  } catch (error) {
    console.error('Error fetching business hours:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
