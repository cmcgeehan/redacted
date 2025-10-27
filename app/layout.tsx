import type { Metadata } from 'next'
import { Orbitron, Share_Tech_Mono } from 'next/font/google'
import './globals.css'

const orbitron = Orbitron({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-orbitron',
})

const shareTechMono = Share_Tech_Mono({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-share-tech',
})

export const metadata: Metadata = {
  title: 'Mission: This Light to Conor',
  description: 'Your mission, should you choose to accept it...',
  robots: 'noindex, nofollow', // Keep it secret
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${shareTechMono.variable} ${orbitron.className}`}>
        {children}
      </body>
    </html>
  )
}
