import type { Metadata } from 'next'
import Link from 'next/link'
import { allRutinas } from '@/lib/contentlayer'

export const metadata: Metadata = {
  title: 'Rutinas'
}

export default function RutinasPage(): JSX.Element {
  const rutinasOrdenadas = [...allRutinas].sort((a, b) =>
    a.title.localeCompare(b.title)
  )

  return (
    <section>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Rutinas disponibles</h1>
      <p style={{ marginBottom: '1.5rem', color: '#4b5563' }}>
        Todas las rutinas se originan en <code>content/rutinas</code>. Edita el MDX y vuelve a
        desplegar para actualizar tu hub.
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '1rem' }}>
        {rutinasOrdenadas.map((rutina) => (
          <li
            key={rutina._id}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '0.75rem',
              padding: '1rem 1.25rem',
              border: '1px solid #e5e7eb'
            }}
          >
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
              <Link href={rutina.url} style={{ textDecoration: 'none', color: '#1d4ed8' }}>
                {rutina.title}
              </Link>
            </h2>
            <dl style={{ display: 'flex', gap: '1.5rem', margin: 0, flexWrap: 'wrap' }}>
              <div>
                <dt style={{ fontWeight: 600 }}>Semanas</dt>
                <dd style={{ margin: 0 }}>{rutina.semanas}</dd>
              </div>
              <div>
                <dt style={{ fontWeight: 600 }}>Días por semana</dt>
                <dd style={{ margin: 0 }}>{rutina.dias}</dd>
              </div>
              <div>
                <dt style={{ fontWeight: 600 }}>Objetivo</dt>
                <dd style={{ margin: 0 }}>{rutina.objetivo}</dd>
              </div>
              <div>
                <dt style={{ fontWeight: 600 }}>RPE objetivo</dt>
                <dd style={{ margin: 0 }}>{rutina.rpeObjetivo}</dd>
              </div>
              {rutina.deloadSemana ? (
                <div>
                  <dt style={{ fontWeight: 600 }}>Deload sugerido</dt>
                  <dd style={{ margin: 0 }}>Semana {rutina.deloadSemana}</dd>
                </div>
              ) : null}
            </dl>
          </li>
        ))}
      </ul>
    </section>
  )
}
