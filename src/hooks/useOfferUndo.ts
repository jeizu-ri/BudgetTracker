import { useCallback, useEffect, useState } from 'react'

export function useOfferUndo(removeEntry: (id: string) => Promise<void>) {
  const [undo, setUndo] = useState<{ id: string; message: string } | null>(
    null,
  )

  useEffect(() => {
    if (!undo) return
    const timer = window.setTimeout(() => setUndo(null), 12_000)
    return () => window.clearTimeout(timer)
  }, [undo])

  const offerUndo = useCallback(
    async (id: string | undefined, message: string) => {
      if (id) setUndo({ id, message })
    },
    [],
  )

  const dismissUndo = useCallback(() => setUndo(null), [])

  const performUndo = useCallback(async () => {
    if (!undo) return
    await removeEntry(undo.id)
    setUndo(null)
  }, [undo, removeEntry])

  return { undoMessage: undo?.message ?? null, offerUndo, dismissUndo, performUndo }
}
