import type { Metadata } from 'next'

import './globals.css'

import Schema from './components/schema/Schema'

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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'product.name',
    image: 'product.image',
    description: 'product.description',
  }
  return (
    <html lang="it">
      <title>Home | WidgetCo</title>
      <body>
        <Schema />
        {children}
      </body>
    </html>
  )
}
