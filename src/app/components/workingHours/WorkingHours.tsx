import type { WorkingHoursData } from '@/types/googlePlaces'
import { groupConsecutiveDays, FALLBACK_HOURS, isToday, formatDate } from '@/utils/workingHours'

type Props = {
  headingLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

/**
 * Fetches working hours from Google Places API
 * Falls back to static hours if API fails
 */
async function fetchWorkingHours(): Promise<WorkingHoursData> {
  try {
    // In production, use absolute URL. In development, relative URL works.
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ''
    const response = await fetch(`${baseUrl}/api/business-hours`, {
      next: {
        revalidate: 3600, // Cache for 1 hour
      },
    })

    if (!response.ok) {
      console.warn('Failed to fetch working hours, using fallback')
      return FALLBACK_HOURS
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching working hours:', error)
    return FALLBACK_HOURS
  }
}

/**
 * @attention Update the Schema.org file too
 *
 * This component fetches business hours from Google Places API.
 * Google Profile remains the single source of truth for:
 * - Regular weekly hours
 * - Special days (bank holidays, special hours like Dec 24th)
 * - Current open/closed status
 */
export async function WorkingHours(props: Props) {
  const { headingLevel: HeadingTag } = props
  const workingHours = await fetchWorkingHours()
  const groupedHours = groupConsecutiveDays(workingHours.regularHours)

  // Find special days that are relevant (today or future)
  const relevantSpecialDays = workingHours.specialDays?.filter((specialDay) => {
    const specialDate = new Date(specialDay.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return specialDate >= today
  })

  return (
    <>
      <HeadingTag>Orari di apertura</HeadingTag>

      {relevantSpecialDays && relevantSpecialDays.length > 0 && (
        <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
          <strong>Attenzione - Orari speciali:</strong>
          <ul style={{ marginTop: '0.5rem', marginBottom: 0 }}>
            {relevantSpecialDays.map((specialDay, index) => (
              <li key={index}>
                <strong>{formatDate(specialDay.date)}</strong>
                {specialDay.closed ? (
                  <span> - Chiuso</span>
                ) : specialDay.hours ? (
                  <span> - {specialDay.hours.map(h => `${h.open} – ${h.close}`).join(', ')}</span>
                ) : (
                  <span> - {specialDay.description}</span>
                )}
                {isToday(specialDay.date) && <strong> (Oggi)</strong>}
              </li>
            ))}
          </ul>
        </div>
      )}

      <dl>
        {groupedHours.map((day, index) => (
          <div key={index}>
            <dt>{day.label}</dt>
            <dd>{day.hours}</dd>
          </div>
        ))}
      </dl>

      {workingHours.isOpenNow !== undefined && (
        <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>
          {workingHours.isOpenNow ? 'Aperto ora' : 'Chiuso ora'}
        </p>
      )}
    </>
  )
}
