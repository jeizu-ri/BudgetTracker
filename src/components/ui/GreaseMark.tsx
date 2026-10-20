import { cn } from '../../lib/utils'

const PATHS = {
  // A loose loop whose end overshoots its start, the way a pencil closes a circle.
  loop: 'M 16 54 C 8 26, 40 6, 70 11 C 95 16, 99 46, 88 70 C 77 92, 38 98, 20 82 C 8 71, 10 44, 32 28',
  // A quick underline that lifts at the end.
  underline: 'M 2 7 C 22 2, 42 9, 62 4 S 92 6, 98 2',
} as const

export function GreaseMark({
  variant = 'loop',
  className,
}: {
  variant?: keyof typeof PATHS
  className?: string
}) {
  return (
    <svg
      viewBox={variant === 'loop' ? '0 0 100 100' : '0 0 100 10'}
      preserveAspectRatio="none"
      aria-hidden
      focusable="false"
      className={cn(
        'grease-svg pointer-events-none absolute overflow-visible',
        className,
      )}
    >
      <path className="grease" d={PATHS[variant]} />
    </svg>
  )
}
