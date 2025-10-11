import type { WithContext } from 'schema-dts'
import type { WorkingHoursData } from '@/types/googlePlaces'
import { FALLBACK_HOURS } from '@/utils/workingHours'

/**
 * Fetches working hours from Google Places API
 */
async function fetchWorkingHours(): Promise<WorkingHoursData> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ''
    const response = await fetch(`${baseUrl}/api/business-hours`, {
      next: {
        revalidate: 3600, // Cache for 1 hour
      },
    })

    if (!response.ok) {
      return FALLBACK_HOURS
    }

    return await response.json()
  } catch {
    return FALLBACK_HOURS
  }
}

type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'

/**
 * Maps Italian day names to Schema.org day names
 */
function mapDayToSchemaDay(italianDay: string): DayOfWeek {
  const dayMap: Record<string, DayOfWeek> = {
    Domenica: 'Sunday',
    Lunedì: 'Monday',
    Martedì: 'Tuesday',
    Mercoledì: 'Wednesday',
    Giovedì: 'Thursday',
    Venerdì: 'Friday',
    Sabato: 'Saturday',
  }
  return dayMap[italianDay] || 'Monday'
}

interface OpeningHoursSpecification {
  '@type': 'OpeningHoursSpecification'
  dayOfWeek: DayOfWeek
  opens: string
  closes: string
}

/**
 * Converts WorkingHoursData to Schema.org OpeningHoursSpecification
 */
function convertToSchemaHours(
  workingHours: WorkingHoursData
): OpeningHoursSpecification[] {
  const specifications: OpeningHoursSpecification[] = []

  workingHours.regularHours.forEach((dayHours) => {
    const schemaDay = mapDayToSchemaDay(dayHours.dayOfWeek)

    dayHours.periods.forEach((period) => {
      specifications.push({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: schemaDay,
        opens: period.open,
        closes: period.close,
      })
    })
  })

  return specifications
}

/**
 * Schema.org structured data for the veterinary clinic
 * Dynamically fetches hours from Google Places API
 * See https://nextjs.org/docs/app/guides/json-ld
 */
export default async function Schema() {
  const workingHours = await fetchWorkingHours()
  const openingHoursSpecification = convertToSchemaHours(workingHours)

  const schema: WithContext<{
    '@type': 'VeterinaryCare'
    name: string
    address: {
      '@type': 'PostalAddress'
      streetAddress: string
      addressLocality: string
      addressRegion: string
      postalCode: string
      addressCountry: string
    }
    telephone: string
    email: string
    vatID: string
    openingHoursSpecification: OpeningHoursSpecification[]
  }> = {
    '@context': 'https://schema.org',
    '@type': 'VeterinaryCare',
    name: 'Clinica Veterinaria Artemedica',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Via Gavazzi 2',
      addressLocality: 'Valmadrera',
      addressRegion: 'LC',
      postalCode: '23868',
      addressCountry: 'IT',
    },
    telephone: '+390341203337',
    email: 'info@artemedicavet.it',
    vatID: 'IT03748770132',
    openingHoursSpecification,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
    />
  )
}
