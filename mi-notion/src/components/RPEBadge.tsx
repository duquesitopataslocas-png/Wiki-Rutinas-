import { cn } from '@/lib/utils'

interface RPEBadgeProps {
  valor: number | string
}

export function RPEBadge({ valor }: RPEBadgeProps): JSX.Element {
  const numeric = typeof valor === 'number' ? valor : Number(valor)
  const isValid = !Number.isNaN(numeric) && numeric >= 6 && numeric <= 10

  const displayValue = isValid ? valor : 'N/A'

  return (
    <span
      className={cn('rpe-badge')}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.25rem 0.5rem',
        borderRadius: '9999px',
        fontSize: '0.875rem',
        fontWeight: 600,
        backgroundColor: isValid ? '#dbeafe' : '#f3f4f6',
        color: isValid ? '#1d4ed8' : '#6b7280',
        border: '1px solid #bfdbfe'
      }}
    >
      RPE {displayValue}
    </span>
  )
}
