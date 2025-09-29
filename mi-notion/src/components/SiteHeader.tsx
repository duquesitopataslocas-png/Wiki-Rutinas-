'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/rutinas', label: 'Rutinas' },
  { href: '/docs', label: 'Docs' }
]

export function SiteHeader(): JSX.Element {
  const pathname = usePathname()

  return (
    <header
      style={{
        borderBottom: '1px solid #e5e7eb',
        padding: '1rem 0'
      }}
    >
      <nav
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          padding: '0 1rem'
        }}
      >
        <span style={{ fontWeight: 600 }}>Mini-Notion Coach</span>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'nav-link',
                pathname === link.href ? 'active' : undefined
              )}
              style={{
                color: pathname === link.href ? '#111827' : '#4b5563',
                fontWeight: pathname === link.href ? 600 : 500,
                textDecoration: 'none'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
