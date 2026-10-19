import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { EXPENSE_CATEGORIES, type ExpenseCategory } from '../types'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Sheet, SheetContent, SheetTitle } from './ui/sheet'

interface QuickAddSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (amount: number, category: ExpenseCategory) => void
  initialAmount?: string
  initialCategory?: ExpenseCategory
}

export function QuickAddSheet({
  open,
  onOpenChange,
  onAdd,
  initialAmount = '',
  initialCategory,
}: QuickAddSheetProps) {
  const [amount, setAmount] = useState(initialAmount)
  const [category, setCategory] = useState<ExpenseCategory | null>(
    initialCategory ?? null,
  )
  const reduce = useReducedMotion()

  const reset = () => {
    setAmount('')
    setCategory(null)
  }

  const handleAdd = () => {
    const n = Number(amount)
    if (!n || n <= 0 || !category) return
    onAdd(n, category)
    reset()
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        onOpenAutoFocus={(e) => {
          if (initialAmount) e.preventDefault()
        }}
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <SheetTitle>Log expense</SheetTitle>
          <p className="mt-1 text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
            Amount, category, add — that’s it.
          </p>

          <div className="mt-5 space-y-4">
            <Input
              inputMode="decimal"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ''))}
              className="text-2xl font-semibold"
              autoFocus
            />

            <div className="flex flex-wrap gap-2">
              {EXPENSE_CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`tap-highlight-none rounded-full px-4 py-2.5 text-sm font-semibold transition-all active:scale-[0.97] ${
                    category === c
                      ? 'bg-[var(--color-accent)] text-white dark:bg-[var(--color-accent-dark)] dark:text-[#1a1028]'
                      : 'bg-[var(--color-chip)] text-[var(--color-heading)] dark:bg-[var(--color-chip-dark)] dark:text-[var(--color-heading-dark)]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <Button
              size="lg"
              className="w-full"
              disabled={!amount || !category}
              onClick={handleAdd}
            >
              Add
            </Button>
          </div>
        </motion.div>
      </SheetContent>
    </Sheet>
  )
}
