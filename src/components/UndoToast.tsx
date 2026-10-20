import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Undo2 } from 'lucide-react'

export function UndoToast({
  message,
  onUndo,
  onDismiss,
}: {
  message: string | null
  onUndo: () => void
  onDismiss: () => void
}) {
  const reduce = useReducedMotion()

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-4 z-50 mx-auto max-w-lg bottom-[calc(5.25rem+env(safe-area-inset-bottom))]"
        >
          <div
            className="flex items-center justify-between gap-3 rounded-frame bg-frame py-1.5 pl-4 pr-1.5"
            role="status"
          >
            <p className="text-sm font-medium text-frame-ink">{message}</p>
            <div className="flex shrink-0 items-center">
              <button
                type="button"
                onClick={onUndo}
                className="tap-highlight-none flex min-h-11 items-center gap-1.5 rounded-control px-3 text-sm font-bold text-frame-ink underline decoration-accent decoration-2 underline-offset-4"
              >
                <Undo2 className="h-4 w-4" strokeWidth={2} />
                Undo
              </button>
              <button
                type="button"
                onClick={onDismiss}
                className="tap-highlight-none min-h-11 rounded-control px-3 text-sm font-semibold text-frame-muted"
              >
                OK
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
