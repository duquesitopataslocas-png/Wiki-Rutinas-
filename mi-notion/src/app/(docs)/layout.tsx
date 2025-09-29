import type { ReactNode } from 'react'

export default function DocsLayout({
  children
}: {
  children: ReactNode
}): JSX.Element {
  return <section>{children}</section>
}
