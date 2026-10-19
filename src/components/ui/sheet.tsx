import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import * as React from 'react'
import { cn } from '../../lib/utils'

export const Sheet = DialogPrimitive.Root
export const SheetTrigger = DialogPrimitive.Trigger
export const SheetClose = DialogPrimitive.Close

export const SheetPortal = DialogPrimitive.Portal

export const SheetOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-[#1a1028]/40 backdrop-blur-[2px]',
      className,
    )}
    {...props}
  />
))
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName

export const SheetContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 flex max-h-[92dvh] flex-col rounded-t-[var(--radius-card)] border border-white/40 bg-[var(--color-card)] p-5 shadow-[0_-16px_48px_-12px_rgba(91,33,182,0.18)] safe-pb outline-none dark:border-white/10 dark:bg-[var(--color-card-dark)]',
        className,
      )}
      {...props}
    >
      <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[var(--color-chip)] dark:bg-[var(--color-chip-dark)]" />
      {children}
      <DialogPrimitive.Close
        className="absolute right-4 top-4 rounded-xl p-2 text-[var(--color-muted)] hover:bg-[var(--color-chip)] dark:text-[var(--color-muted-dark)] dark:hover:bg-[var(--color-chip-dark)]"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = DialogPrimitive.Content.displayName

export const SheetTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'pr-10 text-lg font-semibold text-[var(--color-heading)] dark:text-[var(--color-heading-dark)]',
      className,
    )}
    {...props}
  />
))
SheetTitle.displayName = DialogPrimitive.Title.displayName
