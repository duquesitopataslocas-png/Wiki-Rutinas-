'use client'

import { useMemo, useState } from 'react'
import type { CSSProperties } from 'react'

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

export function PlanTabla({ ejercicios }: PlanTablaProps): JSX.Element {
  const [datos, setDatos] = useState<EjercicioEstado[]>(() =>
    ejercicios.map((item) => ({ ...item, hecha: false }))
  )

  const headers = useMemo(
    () => ['Ejercicio', 'Series', 'Reps', 'Intensidad', 'Tempo', 'Descanso', 'Hecha'],
    []
  )

  const actualizarDato = <K extends keyof Ejercicio>(
    index: number,
    campo: K,
    valor: Ejercicio[K]
  ) => {
    setDatos((prev) =>
      prev.map((row, i) =>
        i === index
          ? {
              ...row,
              [campo]: valor
            }
          : row
      )
    )
  }

  const alternarHecha = (index: number) => {
    setDatos((prev) =>
      prev.map((row, i) => (i === index ? { ...row, hecha: !row.hecha } : row))
    )
  }

  return (
    <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          minWidth: '640px'
        }}
      >
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                style={{
                  textAlign: 'left',
                  padding: '0.75rem',
                  borderBottom: '2px solid #e5e7eb',
                  fontSize: '0.875rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
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
                <input
                  value={ejercicio.nombre}
                  onChange={(event) =>
                    actualizarDato(index, 'nombre', event.target.value)
                  }
                  style={inputStyle}
                />
              </td>
              <td style={cellStyle}>
                <input
                  type="number"
                  value={ejercicio.series}
                  onChange={(event) =>
                    actualizarDato(index, 'series', Number(event.target.value))
                  }
                  style={inputStyle}
                  min={1}
                />
              </td>
              <td style={cellStyle}>
                <input
                  type="number"
                  value={ejercicio.reps}
                  onChange={(event) =>
                    actualizarDato(index, 'reps', Number(event.target.value))
                  }
                  style={inputStyle}
                  min={1}
                />
              </td>
              <td style={cellStyle}>
                <input
                  value={ejercicio.intensidad}
                  onChange={(event) =>
                    actualizarDato(index, 'intensidad', event.target.value)
                  }
                  style={inputStyle}
                />
              </td>
              <td style={cellStyle}>
                <input
                  value={ejercicio.tempo}
                  onChange={(event) =>
                    actualizarDato(index, 'tempo', event.target.value)
                  }
                  style={inputStyle}
                />
              </td>
              <td style={cellStyle}>
                <input
                  value={ejercicio.descanso}
                  onChange={(event) =>
                    actualizarDato(index, 'descanso', event.target.value)
                  }
                  style={inputStyle}
                />
              </td>
              <td style={{ ...cellStyle, textAlign: 'center' }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    checked={ejercicio.hecha}
                    onChange={() => alternarHecha(index)}
                  />
                  {ejercicio.hecha ? '✔' : '—'}
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const cellStyle: CSSProperties = {
  padding: '0.75rem',
  borderBottom: '1px solid #e5e7eb',
  backgroundColor: '#ffffff'
}

const inputStyle: CSSProperties = {
  width: '100%',
  border: '1px solid #d1d5db',
  borderRadius: '0.375rem',
  padding: '0.35rem 0.5rem',
  fontSize: '0.9rem'
}

