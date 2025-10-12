/**
 * Types for Google Places API (New) v1
 * @see https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places
 */

export interface GooglePlaceTimePoint {
  /** Day of the week (0 = Sunday, 6 = Saturday) */
  day?: number
  /** Hour in 24-hour format (0-23) */
  hour?: number
  /** Minute (0-59) */
  minute?: number
  /** The date in local timezone */
  date?: {
    year?: number
    month?: number
    day?: number
  }
  /** Whether the time was truncated */
  truncated?: boolean
}

export interface GooglePlacePeriod {
  /** Opening time */
  open: GooglePlaceTimePoint
  /** Closing time */
  close?: GooglePlaceTimePoint
}

export interface GooglePlaceSpecialDay {
  /** The date of the special day */
  date?: {
    year?: number
    month?: number
    day?: number
  }
}

export interface GooglePlaceOpeningHours {
  /** Localized descriptions for each day of the week */
  weekdayDescriptions?: string[]
  /** Structured opening periods */
  periods?: GooglePlacePeriod[]
  /** Whether the place is currently open */
  openNow?: boolean
  /** Special days that might impact hours */
  specialDays?: GooglePlaceSpecialDay[]
  /** Type of secondary hours (e.g., DRIVE_THROUGH, PICKUP) */
  secondaryHoursType?: string
}

export interface GooglePlace {
  /** The Place ID */
  id?: string
  /** The localized name of the place */
  displayName?: {
    text?: string
    languageCode?: string
  }
  /** Regular opening hours */
  regularOpeningHours?: GooglePlaceOpeningHours
  /** Current opening hours (may differ from regular due to special days) */
  currentOpeningHours?: GooglePlaceOpeningHours
}

/**
 * Simplified working hours structure for the application
 */
export interface WorkingHoursData {
  /** Regular weekly hours */
  regularHours: {
    dayOfWeek: string
    periods: {
      open: string
      close: string
    }[]
  }[]
  /** Special days (holidays, special hours) */
  specialDays?: {
    date: string
    description: string
    closed?: boolean
    hours?: {
      open: string
      close: string
    }[]
  }[]
  /** Whether currently open */
  isOpenNow?: boolean
  /** Last update timestamp */
  lastUpdated: string
}

/**
 * Type guard for GooglePlaceTimePoint date object
 */
function isGooglePlaceTimePointDate(value: unknown): value is { year?: number; month?: number; day?: number } {
  if (typeof value !== 'object' || value === null) return false
  const obj = value as Record<string, unknown>

  return (
    (obj.year === undefined || typeof obj.year === 'number') &&
    (obj.month === undefined || typeof obj.month === 'number') &&
    (obj.day === undefined || typeof obj.day === 'number')
  )
}

/**
 * Type guard for GooglePlaceTimePoint
 */
function isGooglePlaceTimePoint(value: unknown): value is GooglePlaceTimePoint {
  if (typeof value !== 'object' || value === null) return false
  const obj = value as Record<string, unknown>

  return (
    (obj.day === undefined || typeof obj.day === 'number') &&
    (obj.hour === undefined || typeof obj.hour === 'number') &&
    (obj.minute === undefined || typeof obj.minute === 'number') &&
    (obj.date === undefined || isGooglePlaceTimePointDate(obj.date)) &&
    (obj.truncated === undefined || typeof obj.truncated === 'boolean')
  )
}

/**
 * Type guard for GooglePlacePeriod
 */
function isGooglePlacePeriod(value: unknown): value is GooglePlacePeriod {
  if (typeof value !== 'object' || value === null) return false
  const obj = value as Record<string, unknown>

  return (
    isGooglePlaceTimePoint(obj.open) &&
    (obj.close === undefined || isGooglePlaceTimePoint(obj.close))
  )
}

/**
 * Type guard for GooglePlaceSpecialDay date object
 */
function isGooglePlaceSpecialDayDate(value: unknown): value is { year?: number; month?: number; day?: number } {
  if (typeof value !== 'object' || value === null) return false
  const obj = value as Record<string, unknown>

  return (
    (obj.year === undefined || typeof obj.year === 'number') &&
    (obj.month === undefined || typeof obj.month === 'number') &&
    (obj.day === undefined || typeof obj.day === 'number')
  )
}

/**
 * Type guard for GooglePlaceSpecialDay
 */
function isGooglePlaceSpecialDay(value: unknown): value is GooglePlaceSpecialDay {
  if (typeof value !== 'object' || value === null) return false
  const obj = value as Record<string, unknown>

  return obj.date === undefined || isGooglePlaceSpecialDayDate(obj.date)
}

/**
 * Type guard for GooglePlaceOpeningHours
 */
function isGooglePlaceOpeningHours(value: unknown): value is GooglePlaceOpeningHours {
  if (typeof value !== 'object' || value === null) return false
  const obj = value as Record<string, unknown>

  // Check weekdayDescriptions
  if (obj.weekdayDescriptions !== undefined) {
    if (!Array.isArray(obj.weekdayDescriptions)) return false
    if (!obj.weekdayDescriptions.every((desc) => typeof desc === 'string')) return false
  }

  // Check periods
  if (obj.periods !== undefined) {
    if (!Array.isArray(obj.periods)) return false
    if (!obj.periods.every(isGooglePlacePeriod)) return false
  }

  // Check openNow
  if (obj.openNow !== undefined && typeof obj.openNow !== 'boolean') return false

  // Check specialDays
  if (obj.specialDays !== undefined) {
    if (!Array.isArray(obj.specialDays)) return false
    if (!obj.specialDays.every(isGooglePlaceSpecialDay)) return false
  }

  // Check secondaryHoursType
  if (obj.secondaryHoursType !== undefined && typeof obj.secondaryHoursType !== 'string') return false

  return true
}

/**
 * Type guard for GooglePlace displayName object
 */
function isGooglePlaceDisplayName(value: unknown): value is { text?: string; languageCode?: string } {
  if (typeof value !== 'object' || value === null) return false
  const obj = value as Record<string, unknown>

  return (
    (obj.text === undefined || typeof obj.text === 'string') &&
    (obj.languageCode === undefined || typeof obj.languageCode === 'string')
  )
}

/**
 * Comprehensive type guard for GooglePlace
 * Validates the entire GooglePlace structure including all nested objects
 *
 * @param value - The value to check
 * @returns true if value is a valid GooglePlace object
 *
 * @example
 * ```typescript
 * const data = await fetchPlaceData()
 * if (isGooglePlace(data)) {
 *   // data is now typed as GooglePlace
 *   console.log(data.displayName?.text)
 * }
 * ```
 */
export function isGooglePlace(value: unknown): value is GooglePlace {
  if (typeof value !== 'object' || value === null) return false
  const obj = value as Record<string, unknown>

  // Check id
  if (obj.id !== undefined && typeof obj.id !== 'string') return false

  // Check displayName
  if (obj.displayName !== undefined && !isGooglePlaceDisplayName(obj.displayName)) return false

  // Check regularOpeningHours
  if (obj.regularOpeningHours !== undefined && !isGooglePlaceOpeningHours(obj.regularOpeningHours)) return false

  // Check currentOpeningHours
  if (obj.currentOpeningHours !== undefined && !isGooglePlaceOpeningHours(obj.currentOpeningHours)) return false

  return true
}
