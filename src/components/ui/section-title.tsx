import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

/** Row label printed like a contact-sheet row: caps, then a ruled line to the edge. */
export function SectionTitle({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <h2
      className={cn(
        'edge flex items-center gap-3 text-[17px] leading-none text-ink',
        className,
      )}
    >
      {children}
      <span className="h-px flex-1 bg-rule" aria-hidden />
    </h2>
  )
}
