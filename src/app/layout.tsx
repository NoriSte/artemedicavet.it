import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// })

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// })

export const metadata: Metadata = {
  title: 'Clinica Veterinaria Artemedica',
  description:
    'La Clinica Veterinaria Artemedica del dottor Marco Fossati e della dr.essa Valentina Menaballi si trova a Valmadrera (Lecco), in via Gavazzi, 2.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it">
      {/* <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body> */}

      {/* <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    "name": "Clinica Veterinaria Artemedica",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Via Gavazzi 2",
      "addressLocality": "Valmadrera",
      "addressRegion": "LC",
      "postalCode": "23868",
      "addressCountry": "IT"
    },
    "telephone": "+390341203337",
    "email": "info@artemedicavet.it",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
        ],
        "opens": "10:00",
        "closes": "12:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
        ],
        "opens": "15:30",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "18:30"
      }
    ],
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Partita IVA",
        "value": "03748770132"
      }
    ]
  }
  </script> */}

      <body>{children}</body>
    </html>
  )
}
