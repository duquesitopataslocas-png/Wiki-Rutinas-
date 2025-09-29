'use client'

import { useMDXComponent } from 'next-contentlayer/hooks'
import type { MDXComponents } from 'mdx/types'
import { PlanTabla } from '@/components/PlanTabla'
import { RPEBadge } from '@/components/RPEBadge'

const components: MDXComponents = {
  PlanTabla,
  RPEBadge
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps): JSX.Element {
  const Component = useMDXComponent(code)

  return <Component components={components} />
}
