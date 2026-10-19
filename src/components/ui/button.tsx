import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'tap-highlight-none inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-[15px] font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 active:scale-[0.97] dark:focus-visible:ring-[var(--color-accent-dark)] dark:focus-visible:ring-offset-[var(--color-bg-dark)]',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--color-accent)] text-white shadow-[0_8px_24px_-8px_rgba(124,58,237,0.55)] hover:brightness-105 dark:bg-[var(--color-accent-dark)] dark:text-[#1a1028] dark:shadow-[0_8px_24px_-8px_rgba(167,139,250,0.45)]',
        secondary:
          'bg-[var(--color-chip)] text-[var(--color-heading)] hover:brightness-[0.98] dark:bg-[var(--color-chip-dark)] dark:text-[var(--color-heading-dark)]',
        ghost:
          'bg-transparent text-[var(--color-heading)] hover:bg-[var(--color-chip)]/80 dark:text-[var(--color-heading-dark)] dark:hover:bg-[var(--color-chip-dark)]',
        outline:
          'border border-[var(--color-chip)] bg-transparent text-[var(--color-heading)] dark:border-[var(--color-chip-dark)] dark:text-[var(--color-heading-dark)]',
        rose:
          'bg-[#fce8ec] text-[var(--color-rose-text)] dark:bg-[#3a2430] dark:text-[#f0b8c0]',
      },
      size: {
        default: 'h-12 px-5',
        sm: 'h-10 rounded-xl px-4 text-sm',
        lg: 'h-14 rounded-2xl px-6 text-base',
        icon: 'h-11 w-11 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'
