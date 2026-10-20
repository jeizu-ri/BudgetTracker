import type { ComponentPropsWithoutRef, ElementType } from 'react'
import { cn } from '../../lib/utils'

type SurfaceProps<T extends ElementType> = {
  as?: T
  className?: string
} & ComponentPropsWithoutRef<T>

/** A ruled section of the sheet. No box: a hairline above and room to breathe. */
export function Surface<T extends ElementType = 'section'>({
  as,
  className,
  ...props
}: SurfaceProps<T>) {
  const Comp = as ?? 'section'
  return (
    <Comp
      className={cn('border-t border-rule pt-5', className)}
      {...props}
    />
  )
}
