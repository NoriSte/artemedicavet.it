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
      <body>{children}</body>
    </html>
  )
}
