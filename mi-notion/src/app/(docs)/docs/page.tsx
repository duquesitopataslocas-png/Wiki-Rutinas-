import type { Metadata } from 'next'
import Link from 'next/link'
import { RPEBadge } from '@/components/RPEBadge'
import { PlanTabla } from '@/components/PlanTabla'

const ejemplo = [
  {
    nombre: 'Peso muerto',
    series: 3,
    reps: 5,
    intensidad: '@RPE8',
    tempo: '2-0-1',
    descanso: '150s'
  }
]

export const metadata: Metadata = {
  title: 'Documentación'
}

export default function DocsPage(): JSX.Element {
  return (
    <article>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Documentación</h1>
      <p style={{ marginBottom: '1rem' }}>
        Escribe tus rutinas en <code>content/rutinas</code> usando MDX. Puedes combinar texto con
        componentes interactivos. Cada archivo genera automáticamente una página en la sección
        <Link href="/rutinas"> Rutinas</Link>.
      </p>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Insertar componentes</h2>
      <pre
        style={{
          backgroundColor: '#111827',
          color: '#f9fafb',
          padding: '1rem',
          borderRadius: '0.5rem',
          overflowX: 'auto',
          marginBottom: '1rem'
        }}
      >{`<RPEBadge valor={7} />

<PlanTabla
  ejercicios={[
    { nombre: 'Sentadilla', series: 4, reps: 6, intensidad: '75%', tempo: '3-0-1', descanso: '120s' }
  ]}
/>`}</pre>
      <p style={{ marginBottom: '1rem' }}>
        Vista previa en vivo de los componentes:
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <RPEBadge valor={7} />
        <PlanTabla ejercicios={ejemplo} />
      </div>
    </article>
  )
}
