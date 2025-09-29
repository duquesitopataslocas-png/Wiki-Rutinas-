import Link from 'next/link'

export default function HomePage(): JSX.Element {
  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        Mini-Notion Git-first para rutinas personalizadas
      </h1>
      <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem', color: '#4b5563' }}>
        Construye, versiona y comparte tus rutinas como código. Utiliza MDX para mezclar
        contenido narrativo con componentes interactivos, y Contentlayer para generar tipos
        seguros.
      </p>
      <p style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>
        Explora las rutinas existentes o crea las tuyas en <code>content/rutinas</code>. Cada
        cambio queda registrado en Git y puede desplegarse en Vercel en cuestión de minutos.
      </p>
      <Link
        href="/rutinas"
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#2563eb',
          color: '#ffffff',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontWeight: 600
        }}
      >
        Ver rutinas
      </Link>
    </div>
  )
}
