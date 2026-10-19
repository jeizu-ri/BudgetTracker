import { motion, useReducedMotion } from 'framer-motion'

export function ProgressBar({ percent }: { percent: number }) {
  const reduce = useReducedMotion()
  const clamped = Math.min(100, Math.max(0, percent))

  return (
    <div
      className="h-2.5 w-full overflow-hidden rounded-full bg-[var(--color-chip)] dark:bg-[var(--color-chip-dark)]"
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[#9333ea] dark:from-[var(--color-accent-dark)] dark:to-[#c4b5fd]"
        initial={false}
        animate={{ width: `${clamped}%` }}
        transition={
          reduce ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }
      />
    </div>
  )
}
