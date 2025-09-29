'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { ChangeEvent, CSSProperties } from 'react'

export type Ejercicio = {
  nombre: string
  series: number
  reps: number
  intensidad: string
  tempo: string
  descanso: string
}

interface PlanTablaProps {
  ejercicios: Ejercicio[]
}

type EjercicioEstado = Ejercicio & { hecha: boolean }

type EjercicioCampo = keyof Ejercicio

function crearEstadoInicial(ejercicios: Ejercicio[]): EjercicioEstado[] {
  return ejercicios.map((item) => ({ ...item, hecha: false }))
}

export function PlanTabla({ ejercicios }: PlanTablaProps): JSX.Element {
  const initialRows = useRef<Ejercicio[]>([])
  const [datos, setDatos] = useState<EjercicioEstado[]>(() => {
    initialRows.current = ejercicios.map((item) => ({ ...item }))
    return crearEstadoInicial(initialRows.current)
  })

  useEffect(() => {
    initialRows.current = ejercicios.map((item) => ({ ...item }))
    setDatos(crearEstadoInicial(initialRows.current))
  }, [ejercicios])

  const headers = useMemo(
    () => ['Ejercicio', 'Series', 'Reps', 'Intensidad', 'Tempo', 'Descanso', 'Hecha'],
    []
  )

  const actualizarDato = (index: number, campo: EjercicioCampo, valor: string | number) => {
    setDatos((prev) =>
      prev.map((row, i) => {
        if (i !== index) return row

        if (typeof row[campo] === 'number') {
          const numeric = typeof valor === 'number' ? valor : Number(valor)
          return Number.isNaN(numeric) ? row : { ...row, [campo]: numeric }
        }

        return {
          ...row,
          [campo]: valor
        }
      })
    )
  }

  const manejarCambioNumero = (
    index: number,
    campo: Extract<EjercicioCampo, 'series' | 'reps'>
  ) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value
      const numeric = Number(value)
      actualizarDato(index, campo, Number.isNaN(numeric) ? 0 : numeric)
    }

  const alternarHecha = (index: number) => {
    setDatos((prev) =>
      prev.map((row, i) => (i === index ? { ...row, hecha: !row.hecha } : row))
    )
  }

  const resetear = () => {
    setDatos(crearEstadoInicial(initialRows.current))
  }

  const resumen = useMemo(
    () => ({
      ejercicios: datos.length,
      completadas: datos.filter((item) => item.hecha).length,
      seriesTotales: datos.reduce((total, item) => total + item.series, 0)
    }),
    [datos]
  )

  return (
    <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          minWidth: '640px'
        }}
      >
        <caption style={captionStyle}>
          Plan de entrenamiento editable — marca cada ejercicio cuando esté finalizado.
        </caption>
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                style={headerStyle}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datos.map((ejercicio, index) => (
            <tr key={ejercicio.nombre + index}>
              <td style={cellStyle}>
                <label style={labelStyle}>
                  <span style={srOnlyStyle}>Nombre del ejercicio</span>
                  <input
                    value={ejercicio.nombre}
                    onChange={(event) => actualizarDato(index, 'nombre', event.target.value)}
                    style={inputStyle}
                    aria-label={`Nombre del ejercicio ${index + 1}`}
                  />
                </label>
              </td>
              <td style={cellStyle}>
                <input
                  type="number"
                  min={1}
                  value={ejercicio.series}
                  onChange={manejarCambioNumero(index, 'series')}
                  style={inputStyle}
                  aria-label={`Series para ${ejercicio.nombre}`}
                />
              </td>
              <td style={cellStyle}>
                <input
                  type="number"
                  min={1}
                  value={ejercicio.reps}
                  onChange={manejarCambioNumero(index, 'reps')}
                  style={inputStyle}
                  aria-label={`Repeticiones para ${ejercicio.nombre}`}
                />
              </td>
              <td style={cellStyle}>
                <input
                  value={ejercicio.intensidad}
                  onChange={(event) => actualizarDato(index, 'intensidad', event.target.value)}
                  style={inputStyle}
                  aria-label={`Intensidad para ${ejercicio.nombre}`}
                />
              </td>
              <td style={cellStyle}>
                <input
                  value={ejercicio.tempo}
                  onChange={(event) => actualizarDato(index, 'tempo', event.target.value)}
                  style={inputStyle}
                  aria-label={`Tempo para ${ejercicio.nombre}`}
                />
              </td>
              <td style={cellStyle}>
                <input
                  value={ejercicio.descanso}
                  onChange={(event) => actualizarDato(index, 'descanso', event.target.value)}
                  style={inputStyle}
                  aria-label={`Descanso para ${ejercicio.nombre}`}
                />
              </td>
              <td style={{ ...cellStyle, textAlign: 'center' }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    checked={ejercicio.hecha}
                    onChange={() => alternarHecha(index)}
                    aria-label={`Marcar ${ejercicio.nombre} como hecha`}
                  />
                  {ejercicio.hecha ? '✔' : '—'}
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={footerStyle}>
        <div aria-live="polite" role="status">
          <strong>{resumen.completadas}</strong> de {resumen.ejercicios} ejercicios completados —{' '}
          <strong>{resumen.seriesTotales}</strong> series totales planificadas.
        </div>
        <button type="button" onClick={resetear} style={buttonStyle}>
          Restablecer tabla
        </button>
      </div>
    </div>
  )
}

const captionStyle: CSSProperties = {
  textAlign: 'left',
  padding: '0.5rem 0.75rem',
  fontWeight: 600,
  color: '#1f2937'
}

const headerStyle: CSSProperties = {
  textAlign: 'left',
  padding: '0.75rem',
  borderBottom: '2px solid #e5e7eb',
  fontSize: '0.875rem',
  textTransform: 'uppercase',
  letterSpacing: '0.05em'
}

const cellStyle: CSSProperties = {
  padding: '0.75rem',
  borderBottom: '1px solid #e5e7eb',
  backgroundColor: '#ffffff'
}

const labelStyle: CSSProperties = {
  display: 'flex'
}

const inputStyle: CSSProperties = {
  width: '100%',
  border: '1px solid #d1d5db',
  borderRadius: '0.375rem',
  padding: '0.35rem 0.5rem',
  fontSize: '0.9rem'
}

const footerStyle: CSSProperties = {
  marginTop: '0.75rem',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.75rem',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: '0.9rem'
}

const buttonStyle: CSSProperties = {
  border: '1px solid #1d4ed8',
  backgroundColor: '#1d4ed8',
  color: '#ffffff',
  padding: '0.4rem 0.9rem',
  borderRadius: '9999px',
  cursor: 'pointer',
  fontWeight: 600
}

const srOnlyStyle: CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0
}
