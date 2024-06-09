import type { Metadata } from 'next'
import { ReactNode } from 'react'
// eslint-disable-next-line camelcase
import { Work_Sans } from 'next/font/google'
import './globals.css'

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '700']
})

export const metadata: Metadata = {
  title: "Brahian's portfolio",
  description: 'My portfolio website'
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={workSans.className}>{children}</body>
    </html>
  )
}
