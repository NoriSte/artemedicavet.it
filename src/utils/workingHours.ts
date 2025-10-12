import type { WorkingHoursData } from '@/types/googlePlaces'

/**
 * Groups consecutive days with the same hours together
 * e.g., "Lunedì – Venerdì: 10:00 – 13:00"
 * TODO: write unit tests
 */
export function groupConsecutiveDays(
  regularHours: WorkingHoursData['regularHours']
): { label: string; hours: string }[] {
  if (!regularHours || regularHours.length === 0) {
    return []
  }

  const result: { label: string; hours: string }[] = []
  let i = 0

  while (i < regularHours.length) {
    const currentDay = regularHours[i]
    const currentHours = formatPeriods(currentDay.periods)
    let endIndex = i

    // Look ahead to find consecutive days with same hours
    while (
      endIndex + 1 < regularHours.length &&
      formatPeriods(regularHours[endIndex + 1].periods) === currentHours
    ) {
      endIndex++
    }

    // Create label
    let label: string
    if (i === endIndex) {
      label = currentDay.dayOfWeek
    } else {
      label = `${currentDay.dayOfWeek} – ${regularHours[endIndex].dayOfWeek}`
    }

    result.push({ label, hours: currentHours })
    i = endIndex + 1
  }

  return result
}

/**
 * Formats periods into a readable string
 * e.g., "10:00 – 13:00 / 14:30 – 19:00"
 */
export function formatPeriods(periods: { open: string; close: string }[]): string {
  if (!periods || periods.length === 0) {
    return 'Chiuso'
  }

  return periods.map((period) => `${period.open} – ${period.close}`).join(' / ')
}

/**
 * Checks if a special day is today
 */
export function isToday(dateString: string): boolean {
  const today = new Date()
  const specialDate = new Date(dateString)

  return (
    today.getFullYear() === specialDate.getFullYear() &&
    today.getMonth() === specialDate.getMonth() &&
    today.getDate() === specialDate.getDate()
  )
}

/**
 * Formats a date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('it-IT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(date)
}

export const REGULAR_HOURS: WorkingHoursData = {
  regularHours: [
    {
      dayOfWeek: 'Lunedì',
      periods: [
        { open: '10:00', close: '13:00' },
        { open: '14:30', close: '19:00' },
      ],
    },
    {
      dayOfWeek: 'Martedì',
      periods: [
        { open: '10:00', close: '13:00' },
        { open: '14:30', close: '19:00' },
      ],
    },
    {
      dayOfWeek: 'Mercoledì',
      periods: [
        { open: '10:00', close: '13:00' },
        { open: '14:30', close: '19:00' },
      ],
    },
    {
      dayOfWeek: 'Giovedì',
      periods: [
        { open: '10:00', close: '13:00' },
        { open: '14:30', close: '19:00' },
      ],
    },
    {
      dayOfWeek: 'Venerdì',
      periods: [
        { open: '10:00', close: '13:00' },
        { open: '14:30', close: '19:00' },
      ],
    },
    {
      dayOfWeek: 'Sabato',
      periods: [{ open: '10:00', close: '18:00' }],
    },
    {
      dayOfWeek: 'Domenica',
      periods: [],
    },
  ],
  lastUpdated: '2025-10-12T12:34:58.549Z', // result of new Date().toISOString(),
}
