import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import { SiteHeader } from '@/components/SiteHeader'

export const metadata: Metadata = {
  title: 'Mini-Notion de Rutinas',
  description:
    'Mini-Notion Git-first para planificar rutinas personalizadas con Contentlayer y MDX.'
}

export default function RootLayout({
  children
}: {
  children: ReactNode
}): JSX.Element {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          fontFamily:
            "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          backgroundColor: '#f9fafb',
          color: '#111827'
        }}
      >
        <SiteHeader />
        <main
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            padding: '2rem 1rem 4rem',
            lineHeight: 1.7
          }}
        >
          {children}
        </main>
      </body>
    </html>
  )
}
