import type { Metadata } from 'next'

import './globals.css'

import Schema from './components/schema/Schema'

export const metadata: Metadata = {
  title: 'Clinica Veterinaria Artemedica',
  description:
    'La Clinica Veterinaria Artemedica del dr. Marco Fossati e della dr.essa Valentina Menaballi si trova a tre minuti da Lecco e dispone di un ampio parcheggio.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it">
      <title>Clinica Vaterinaria Artemedica</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body>
        <Schema />
        {children}
      </body>
    </html>
  )
}
