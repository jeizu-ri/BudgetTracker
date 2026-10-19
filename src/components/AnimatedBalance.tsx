import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion'
import { useEffect, useState } from 'react'
import { formatPeso } from '../lib/money'

export function AnimatedBalance({ value }: { value: number }) {
  const motionVal = useMotionValue(value)
  const [display, setDisplay] = useState(() => formatPeso(value))
  const reduce = useReducedMotion()

  useMotionValueEvent(motionVal, 'change', (v) => {
    setDisplay(formatPeso(Math.round(v)))
  })

  useEffect(() => {
    if (reduce) {
      motionVal.set(value)
      setDisplay(formatPeso(value))
      return
    }
    const controls = animate(motionVal, value, {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    })
    return () => controls.stop()
  }, [value, motionVal, reduce])

  return (
    <motion.span className="font-display text-[2.75rem] leading-none font-semibold tracking-tight text-white drop-shadow-sm">
      {display}
    </motion.span>
  )
}
