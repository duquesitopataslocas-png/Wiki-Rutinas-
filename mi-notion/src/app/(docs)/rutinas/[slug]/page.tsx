import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Mdx } from '@/components/Mdx'
import { allRutinas } from '@/lib/contentlayer'
import type { Rutina } from '@/lib/contentlayer'

interface RutinaPageProps {
  params: { slug: string }
}

const findRutina = (slug: string): Rutina | undefined =>
  allRutinas.find((item) => item._raw.flattenedPath === slug)

export function generateStaticParams(): Array<RutinaPageProps['params']> {
  return allRutinas.map((rutina) => ({ slug: rutina._raw.flattenedPath }))
}

export function generateMetadata({ params }: RutinaPageProps): Metadata {
  const rutina = findRutina(params.slug)

  if (!rutina) {
    return { title: 'Rutina no encontrada' }
  }

  return {
    title: rutina.title,
    description: `Rutina ${rutina.title} orientada a ${rutina.objetivo}.`
  }
}

export default function RutinaDetallePage({ params }: RutinaPageProps): JSX.Element {
  const rutina = findRutina(params.slug)

  if (!rutina) {
    notFound()
    return <></>
  }

  return (
    <article>
      <header style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{rutina.title}</h1>
        <p style={{ color: '#4b5563', marginBottom: '0.5rem' }}>
          Objetivo: <strong>{rutina.objetivo}</strong> — {rutina.semanas} semanas, {rutina.dias} días
          por semana. RPE objetivo: {rutina.rpeObjetivo}.
        </p>
        {rutina.deloadSemana ? (
          <p style={{ color: '#4b5563', margin: 0 }}>
            Deload recomendado en la semana {rutina.deloadSemana}.
          </p>
        ) : null}
      </header>
      <Mdx code={rutina.body.code} />
    </article>
  )
}
