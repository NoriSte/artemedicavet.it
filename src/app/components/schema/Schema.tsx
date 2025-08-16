import type { VeterinaryCare } from 'schema-dts'

import type { WithContext } from 'schema-dts'

/**
 * See https://nextjs.org/docs/app/guides/json-ld
 */
export const schema: WithContext<VeterinaryCare> = {
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
  // TODO: fix the type
  // hoursAvailable: [
  //   {
  //     '@type': 'OpeningHoursSpecification',
  //     dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  //     opens: '10:00',
  //     closes: '12:30',
  //   },
  //   {
  //     '@type': 'OpeningHoursSpecification',
  //     dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  //     opens: '15:30',
  //     closes: '20:00',
  //   },
  //   {
  //     '@type': 'OpeningHoursSpecification',
  //     dayOfWeek: 'Saturday',
  //     opens: '10:00',
  //     closes: '18:30',
  //   },
  // ],
}

export default function Schema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
    />
  )
}
