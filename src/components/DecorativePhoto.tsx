import { ImageOff } from 'lucide-react'
import { useState } from 'react'
import { cn } from '../lib/utils'

interface DecorativePhotoProps {
  src: string
  alt: string
  className?: string
}

export function DecorativePhoto({ src, alt, className }: DecorativePhotoProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={cn(
          'flex items-center justify-center rounded-2xl bg-[var(--color-chip)] text-[var(--color-muted)] dark:bg-[var(--color-chip-dark)] dark:text-[var(--color-muted-dark)]',
          className,
        )}
        role="img"
        aria-label={alt}
      >
        <ImageOff className="h-6 w-6 opacity-60" />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn('rounded-2xl object-cover', className)}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}
