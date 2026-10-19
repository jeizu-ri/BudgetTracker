import * as React from 'react'
import { cn } from '../../lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'flex h-12 w-full rounded-2xl border border-transparent bg-[var(--color-chip)] px-4 text-base text-[#2d1f3d] shadow-inner shadow-black/[0.03] transition-colors placeholder:text-[var(--color-muted)] focus-visible:border-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/25 dark:bg-[var(--color-chip-dark)] dark:text-[#f3eaf8] dark:placeholder:text-[var(--color-muted-dark)] dark:focus-visible:border-[var(--color-accent-dark)] dark:focus-visible:ring-[var(--color-accent-dark)]/30',
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
)
Input.displayName = 'Input'
