import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'tap-highlight-none inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-control text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-40 active:opacity-85',
  {
    variants: {
      variant: {
        default: 'bg-accent text-on-accent hover:brightness-110',
        secondary: 'border border-rule bg-chip text-ink hover:border-ink/40',
        ghost: 'bg-transparent text-ink underline-offset-4 hover:underline',
        outline: 'border border-ink/70 bg-transparent text-ink hover:bg-chip',
        warn: 'bg-chip text-warn',
      },
      size: {
        default: 'h-12 px-4',
        sm: 'h-9 px-3 text-sm',
        lg: 'h-14 px-5 text-base',
        icon: 'h-11 w-11',
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
