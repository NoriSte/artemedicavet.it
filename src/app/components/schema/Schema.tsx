import { companyInfoSchema } from '../companyInfo/companyInfoSchema'
import { workingHoursSchema } from '../workingHours/workingHoursSchema'

export default function Schema() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'VeterinaryCare',
    ...companyInfoSchema,
    ...workingHoursSchema,
  } as const

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData).replace(/</g, '\\u003c') }}
    />
  )
}
