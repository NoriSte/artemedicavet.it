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
