import type { GooglePlace } from '@/types/googlePlaces'

/**
 * Test fixtures for Google Places API responses
 * Use these to mock different scenarios in e2e tests
 */

export const normalHoursOpenNowMock: GooglePlace = {
  id: 'test-place-id',
  displayName: {
    text: 'Clinica Veterinaria Artemedica',
    languageCode: 'it',
  },
  regularOpeningHours: {
    periods: [
      // Monday - first period
      { open: { day: 1, hour: 10, minute: 0 }, close: { day: 1, hour: 13, minute: 0 } },
      // Monday - second period
      { open: { day: 1, hour: 14, minute: 30 }, close: { day: 1, hour: 19, minute: 0 } },
      // Tuesday
      { open: { day: 2, hour: 10, minute: 0 }, close: { day: 2, hour: 13, minute: 0 } },
      { open: { day: 2, hour: 14, minute: 30 }, close: { day: 2, hour: 19, minute: 0 } },
      // Wednesday
      { open: { day: 3, hour: 10, minute: 0 }, close: { day: 3, hour: 13, minute: 0 } },
      { open: { day: 3, hour: 14, minute: 30 }, close: { day: 3, hour: 19, minute: 0 } },
      // Thursday
      { open: { day: 4, hour: 10, minute: 0 }, close: { day: 4, hour: 13, minute: 0 } },
      { open: { day: 4, hour: 14, minute: 30 }, close: { day: 4, hour: 19, minute: 0 } },
      // Friday
      { open: { day: 5, hour: 10, minute: 0 }, close: { day: 5, hour: 13, minute: 0 } },
      { open: { day: 5, hour: 14, minute: 30 }, close: { day: 5, hour: 19, minute: 0 } },
      // Saturday
      { open: { day: 6, hour: 10, minute: 0 }, close: { day: 6, hour: 18, minute: 0 } },
    ],
  },
  currentOpeningHours: {
    openNow: true,
    periods: [
      { open: { day: 1, hour: 10, minute: 0 }, close: { day: 1, hour: 13, minute: 0 } },
      { open: { day: 1, hour: 14, minute: 30 }, close: { day: 1, hour: 19, minute: 0 } },
      { open: { day: 2, hour: 10, minute: 0 }, close: { day: 2, hour: 13, minute: 0 } },
      { open: { day: 2, hour: 14, minute: 30 }, close: { day: 2, hour: 19, minute: 0 } },
      { open: { day: 3, hour: 10, minute: 0 }, close: { day: 3, hour: 13, minute: 0 } },
      { open: { day: 3, hour: 14, minute: 30 }, close: { day: 3, hour: 19, minute: 0 } },
      { open: { day: 4, hour: 10, minute: 0 }, close: { day: 4, hour: 13, minute: 0 } },
      { open: { day: 4, hour: 14, minute: 30 }, close: { day: 4, hour: 19, minute: 0 } },
      { open: { day: 5, hour: 10, minute: 0 }, close: { day: 5, hour: 13, minute: 0 } },
      { open: { day: 5, hour: 14, minute: 30 }, close: { day: 5, hour: 19, minute: 0 } },
      { open: { day: 6, hour: 10, minute: 0 }, close: { day: 6, hour: 18, minute: 0 } },
    ],
  },
}

/**
 * Scenario 2: With special day (today)
 * Special hours for Dec 24th
 */
export const specialDayTodayMock: GooglePlace = {
  ...normalHoursOpenNowMock,
  currentOpeningHours: {
    ...normalHoursOpenNowMock.currentOpeningHours,
    openNow: true,
    periods: [
      { open: { day: 1, hour: 6, minute: 0 }, close: { day: 1, hour: 13, minute: 0 } },
      { open: { day: 2, hour: 6, minute: 0 }, close: { day: 2, hour: 13, minute: 0 } },
      { open: { day: 3, hour: 6, minute: 0 }, close: { day: 3, hour: 13, minute: 0 } },
      { open: { day: 4, hour: 6, minute: 0 }, close: { day: 4, hour: 13, minute: 0 } },
      { open: { day: 5, hour: 6, minute: 0 }, close: { day: 5, hour: 13, minute: 0 } },
      { open: { day: 6, hour: 6, minute: 0 }, close: { day: 6, hour: 18, minute: 0 } },
    ],
    specialDays: [
      {
        date: {
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
          day: new Date().getDate(),
        },
      },
    ],
  },
}

/**
 * Scenario 3: With special day (future)
 * Closed on Jan 1st
 */
export const specialDayFutureMock: GooglePlace = {
  ...normalHoursOpenNowMock,
  currentOpeningHours: {
    ...normalHoursOpenNowMock.currentOpeningHours,
    specialDays: [
      {
        date: {
          year: new Date().getFullYear() + 1,
          month: 1,
          day: 1,
        },
      },
    ],
  },
}

/**
 * Scenario 4: Currently closed
 */
export const currentlyClosedMock: GooglePlace = {
  ...normalHoursOpenNowMock,
  currentOpeningHours: {
    ...normalHoursOpenNowMock.currentOpeningHours,
    openNow: false,
  },
}

/**
 * Scenario 5: 24/7 operation
 */
export const twentyFourSevenMock: GooglePlace = {
  id: 'test-place-id',
  displayName: {
    text: 'Test Business',
    languageCode: 'it',
  },
  regularOpeningHours: {
    periods: [
      { open: { day: 0, hour: 0, minute: 0 }, close: { day: 0, hour: 23, minute: 59 } },
      { open: { day: 1, hour: 0, minute: 0 }, close: { day: 1, hour: 23, minute: 59 } },
      { open: { day: 2, hour: 0, minute: 0 }, close: { day: 2, hour: 23, minute: 59 } },
      { open: { day: 3, hour: 0, minute: 0 }, close: { day: 3, hour: 23, minute: 59 } },
      { open: { day: 4, hour: 0, minute: 0 }, close: { day: 4, hour: 23, minute: 59 } },
      { open: { day: 5, hour: 0, minute: 0 }, close: { day: 5, hour: 23, minute: 59 } },
      { open: { day: 6, hour: 0, minute: 0 }, close: { day: 6, hour: 23, minute: 59 } },
    ],
  },
  currentOpeningHours: {
    openNow: true,
    periods: [
      { open: { day: 0, hour: 0, minute: 0 }, close: { day: 0, hour: 23, minute: 59 } },
      { open: { day: 1, hour: 0, minute: 0 }, close: { day: 1, hour: 23, minute: 59 } },
      { open: { day: 2, hour: 0, minute: 0 }, close: { day: 2, hour: 23, minute: 59 } },
      { open: { day: 3, hour: 0, minute: 0 }, close: { day: 3, hour: 23, minute: 59 } },
      { open: { day: 4, hour: 0, minute: 0 }, close: { day: 4, hour: 23, minute: 59 } },
      { open: { day: 5, hour: 0, minute: 0 }, close: { day: 5, hour: 23, minute: 59 } },
      { open: { day: 6, hour: 0, minute: 0 }, close: { day: 6, hour: 23, minute: 59 } },
    ],
  },
}

/**
 * Scenario 6: Split days (different weekend hours)
 */
export const splitDaysMock: GooglePlace = {
  id: 'test-place-id',
  displayName: {
    text: 'Test Business',
    languageCode: 'it',
  },
  regularOpeningHours: {
    periods: [
      // Mon-Wed: 09:00-17:00
      { open: { day: 1, hour: 9, minute: 0 }, close: { day: 1, hour: 17, minute: 0 } },
      { open: { day: 2, hour: 9, minute: 0 }, close: { day: 2, hour: 17, minute: 0 } },
      { open: { day: 3, hour: 9, minute: 0 }, close: { day: 3, hour: 17, minute: 0 } },
      // Thu-Fri: 09:00-21:00
      { open: { day: 4, hour: 9, minute: 0 }, close: { day: 4, hour: 21, minute: 0 } },
      { open: { day: 5, hour: 9, minute: 0 }, close: { day: 5, hour: 21, minute: 0 } },
      // Sat: 10:00-14:00
      { open: { day: 6, hour: 10, minute: 0 }, close: { day: 6, hour: 14, minute: 0 } },
    ],
  },
  currentOpeningHours: {
    openNow: false,
    periods: [
      { open: { day: 1, hour: 9, minute: 0 }, close: { day: 1, hour: 17, minute: 0 } },
      { open: { day: 2, hour: 9, minute: 0 }, close: { day: 2, hour: 17, minute: 0 } },
      { open: { day: 3, hour: 9, minute: 0 }, close: { day: 3, hour: 17, minute: 0 } },
      { open: { day: 4, hour: 9, minute: 0 }, close: { day: 4, hour: 21, minute: 0 } },
      { open: { day: 5, hour: 9, minute: 0 }, close: { day: 5, hour: 21, minute: 0 } },
      { open: { day: 6, hour: 10, minute: 0 }, close: { day: 6, hour: 14, minute: 0 } },
    ],
  },
}

/**
 * Scenario 11: Irregular week schedule
 */
export const irregularScheduleMock: GooglePlace = {
  id: 'test-place-id',
  displayName: {
    text: 'Test Business',
    languageCode: 'it',
  },
  regularOpeningHours: {
    periods: [
      { open: { day: 1, hour: 10, minute: 0 }, close: { day: 1, hour: 18, minute: 0 } },
      { open: { day: 3, hour: 13, minute: 0 }, close: { day: 3, hour: 19, minute: 0 } },
      { open: { day: 4, hour: 10, minute: 0 }, close: { day: 4, hour: 18, minute: 0 } },
      { open: { day: 6, hour: 9, minute: 0 }, close: { day: 6, hour: 13, minute: 0 } },
    ],
  },
  currentOpeningHours: {
    openNow: false,
    periods: [
      { open: { day: 1, hour: 10, minute: 0 }, close: { day: 1, hour: 18, minute: 0 } },
      { open: { day: 3, hour: 13, minute: 0 }, close: { day: 3, hour: 19, minute: 0 } },
      { open: { day: 4, hour: 10, minute: 0 }, close: { day: 4, hour: 18, minute: 0 } },
      { open: { day: 6, hour: 9, minute: 0 }, close: { day: 6, hour: 13, minute: 0 } },
    ],
  },
}

/**
 * Scenario 13: Multiple special days
 */
export const multipleSpecialDaysMock: GooglePlace = {
  ...normalHoursOpenNowMock,
  currentOpeningHours: {
    ...normalHoursOpenNowMock.currentOpeningHours,
    specialDays: [
      { date: { year: 1924, month: 13, day: 24 } },
      { date: { year: 1924, month: 13, day: 25 } },
      { date: { year: 1924, month: 13, day: 26 } },
      { date: { year: 1925, month: 1, day: 1 } },
    ],
  },
}

/**
 * Scenario 14: Weekend only business
 */
export const weekendOnlyMock: GooglePlace = {
  id: 'test-place-id',
  displayName: {
    text: 'Test Business',
    languageCode: 'it',
  },
  regularOpeningHours: {
    periods: [
      { open: { day: 0, hour: 10, minute: 0 }, close: { day: 0, hour: 18, minute: 0 } },
      { open: { day: 6, hour: 10, minute: 0 }, close: { day: 6, hour: 18, minute: 0 } },
    ],
  },
  currentOpeningHours: {
    openNow: false,
    periods: [
      { open: { day: 0, hour: 10, minute: 0 }, close: { day: 0, hour: 18, minute: 0 } },
      { open: { day: 6, hour: 10, minute: 0 }, close: { day: 6, hour: 18, minute: 0 } },
    ],
  },
}

/**
 * Empty response (triggers fallback)
 */
export const emptyResponseMock: GooglePlace = {
  id: 'test-place-id',
  displayName: {
    text: 'Test Business',
    languageCode: 'it',
  },
}
