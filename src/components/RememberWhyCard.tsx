import { motion, useReducedMotion } from 'framer-motion'
import { useMemo } from 'react'
import { pickRememberCaption } from '../lib/captions'
import { DecorativePhoto } from './DecorativePhoto'

const SESSION_KEY = 'remember-caption'

export function RememberWhyCard() {
  const reduce = useReducedMotion()
  const caption = useMemo(() => {
    const existing = sessionStorage.getItem(SESSION_KEY)
    if (existing) return existing
    const next = pickRememberCaption()
    sessionStorage.setItem(SESSION_KEY, next)
    return next
  }, [])

  return (
    <motion.section
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[var(--radius-card)] bg-[var(--color-card)] p-4 shadow-[0_12px_40px_-20px_rgba(91,33,182,0.35)] dark:bg-[var(--color-card-dark)]"
    >
      <p className="mb-3 text-sm font-medium text-[var(--color-heading)] dark:text-[var(--color-heading-dark)]">
        Remember why
      </p>
      <div className="grid grid-cols-3 gap-2">
        <DecorativePhoto
          src="/assets/camera.jpg"
          alt="Fujifilm X-T5 camera with lens"
          className="aspect-[4/5] w-full"
        />
        <DecorativePhoto
          src="/assets/idol1.jpg"
          alt="Idol inspiration 1"
          className="aspect-[4/5] w-full"
        />
        <DecorativePhoto
          src="/assets/idol2.jpg"
          alt="Idol inspiration 2"
          className="aspect-[4/5] w-full"
        />
      </div>
      <p className="mt-3 text-[15px] leading-snug text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
        {caption}
      </p>
    </motion.section>
  )
}
